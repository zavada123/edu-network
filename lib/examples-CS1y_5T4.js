// src/engine/scheduler.ts
var Scheduler = class {
	now = 0;
	seq = 0;
	queue = [];
	schedule(delay, fn) {
		const ev = {
			t: this.now + Math.max(0, delay),
			seq: this.seq++,
			fn
		};
		let lo = 0;
		let hi = this.queue.length;
		while (lo < hi) {
			const mid = lo + hi >> 1;
			const e = this.queue[mid];
			if (e.t < ev.t || e.t === ev.t && e.seq < ev.seq) lo = mid + 1;
			else hi = mid;
		}
		this.queue.splice(lo, 0, ev);
		return ev;
	}
	cancel(ev) {
		const i = this.queue.indexOf(ev);
		if (i >= 0) this.queue.splice(i, 1);
	}
	advanceTo(t) {
		while (this.queue.length && this.queue[0].t <= t) {
			const ev = this.queue.shift();
			this.now = ev.t;
			ev.fn();
		}
		if (t > this.now) this.now = t;
	}
	get pending() {
		return this.queue.length;
	}
};
// src/engine/device.ts
var NetInterface = class {
	device;
	name;
	mac;
	link = null;
	up = true;
	ip = null;
	constructor(device, name, mac) {
		this.device = device;
		this.name = name;
		this.mac = mac;
	}
	send(frame) {
		if (this.up && this.link) this.link.transmit(this, frame);
	}
};
var Device = class {
	network;
	id;
	name;
	interfaces = [];
	constructor(network, id, name) {
		this.network = network;
		this.id = id;
		this.name = name;
	}
	addInterfaces(prefix, count) {
		for (let i = 0; i < count; i++) this.interfaces.push(new NetInterface(this, `${prefix}${i}`, this.network.nextMac()));
	}
	getInterface(name) {
		return this.interfaces.find((i) => i.name === name) ?? null;
	}
	freeInterface() {
		return this.interfaces.find((i) => !i.link) ?? null;
	}
};
var Link = class {
	network;
	id;
	a;
	b;
	latency;
	constructor(network, id, a, b, latency = 80) {
		this.network = network;
		this.id = id;
		this.a = a;
		this.b = b;
		this.latency = latency;
		a.link = this;
		b.link = this;
	}
	other(i) {
		return i === this.a ? this.b : this.a;
	}
	transmit(from, frame) {
		const to = this.other(from);
		this.network.emitWire(this, from.device, to.device, frame);
		this.network.scheduler.schedule(this.latency, () => {
			if (to.up) to.device.receiveFrame(to, frame);
		});
	}
	detach() {
		this.a.link = null;
		this.b.link = null;
	}
};
// src/engine/network.ts
var NAME_PREFIX = {
	host: "pc",
	switch: "sw",
	router: "r",
	firewall: "fw",
	server: "srv",
	ap: "ap"
};
var Network = class {
	scheduler = new Scheduler();
	devices = /* @__PURE__ */ new Map();
	links = /* @__PURE__ */ new Map();
	onWireTransfer = null;
	onFwDrop = null;
	macCounter = 0;
	wireCounter = 0;
	idCounter = 0;
	get now() {
		return this.scheduler.now;
	}
	nextMac() {
		const n = ++this.macCounter;
		return `02:00:00:00:${(n >> 8 & 255).toString(16).padStart(2, "0")}:${(n & 255).toString(16).padStart(2, "0")}`;
	}
	allocId(prefix) {
		let id;
		do
			id = `${prefix}${++this.idCounter}`;
		while (this.devices.has(id) || this.links.has(id));
		return id;
	}
	allocName(kind) {
		const used = new Set([...this.devices.values()].map((d) => d.name));
		let n = 0;
		let name;
		do
			name = `${NAME_PREFIX[kind]}${++n}`;
		while (used.has(name));
		return name;
	}
	register(device) {
		this.devices.set(device.id, device);
	}
	removeDevice(id) {
		const d = this.devices.get(id);
		if (!d) return [];
		const removedLinks = [];
		for (const iface of d.interfaces) if (iface.link) {
			removedLinks.push(iface.link.id);
			this.disconnect(iface.link.id);
		}
		this.devices.delete(id);
		return removedLinks;
	}
	connect(aId, bId, opts = {}) {
		const a = this.devices.get(aId);
		const b = this.devices.get(bId);
		if (!a || !b) throw new Error("unknown device");
		if (aId === bId) throw new Error("cannot connect a device to itself");
		const ia = opts.aIface ? a.getInterface(opts.aIface) : a.freeInterface();
		const ib = opts.bIface ? b.getInterface(opts.bIface) : b.freeInterface();
		if (!ia) throw new Error(`${a.name}: no free interface`);
		if (!ib) throw new Error(`${b.name}: no free interface`);
		if (ia.link || ib.link) throw new Error("interface already connected");
		const link = new Link(this, opts.id ?? this.allocId("link-"), ia, ib);
		this.links.set(link.id, link);
		return link;
	}
	disconnect(linkId) {
		const l = this.links.get(linkId);
		if (!l) return;
		l.detach();
		this.links.delete(linkId);
	}
	interfaceOwner(iface) {
		return iface.device;
	}
	emitWire(link, from, to, frame) {
		if (!this.onWireTransfer) return;
		this.onWireTransfer({
			id: ++this.wireCounter,
			linkId: link.id,
			fromDeviceId: from.id,
			toDeviceId: to.id,
			kind: frame.payload.kind === "arp" ? "arp" : frame.payload.l4.kind,
			start: this.scheduler.now,
			end: this.scheduler.now + link.latency
		});
	}
};
// src/engine/ip.ts
var BROADCAST_MAC = "ff:ff:ff:ff:ff:ff";
var BROADCAST_IP = 4294967295;
function parseIp(s) {
	const m = s.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
	if (!m) return null;
	const parts = m.slice(1).map(Number);
	if (parts.some((p) => p > 255)) return null;
	return (parts[0] << 24 | parts[1] << 16 | parts[2] << 8 | parts[3]) >>> 0;
}
function ipToString(ip) {
	return [
		ip >>> 24,
		ip >>> 16 & 255,
		ip >>> 8 & 255,
		ip & 255
	].join(".");
}
function parseCidr(s) {
	const i = s.indexOf("/");
	if (i < 0) return null;
	const addr = parseIp(s.slice(0, i));
	const prefixStr = s.slice(i + 1);
	const prefix = Number(prefixStr);
	if (addr === null || prefixStr === "" || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) return null;
	return {
		addr,
		prefix
	};
}
function maskOf(prefix) {
	return prefix === 0 ? 0 : 4294967295 << 32 - prefix >>> 0;
}
function networkOf(addr, prefix) {
	return (addr & maskOf(prefix)) >>> 0;
}
function cidrToString(addr, prefix) {
	return `${ipToString(addr)}/${prefix}`;
}
// src/engine/firewall.ts
function pktProto(pkt) {
	return pkt.l4.kind === "icmp" ? "icmp" : pkt.l4.kind;
}
function pktPorts(pkt) {
	const l4 = pkt.l4;
	if (l4.kind === "tcp" || l4.kind === "udp") return {
		sport: l4.srcPort,
		dport: l4.dstPort
	};
	return {
		sport: null,
		dport: null
	};
}
function inRange(p, r) {
	return p !== null && p >= r.from && p <= r.to;
}
function matchesRule(m, pkt, ctx) {
	if (m.srcNet && networkOf(pkt.src, m.srcNet.prefix) !== networkOf(m.srcNet.addr, m.srcNet.prefix)) return false;
	if (m.dstNet && networkOf(pkt.dst, m.dstNet.prefix) !== networkOf(m.dstNet.addr, m.dstNet.prefix)) return false;
	if (m.proto && pktProto(pkt) !== m.proto) return false;
	const ports = pktPorts(pkt);
	if (m.sport && !inRange(ports.sport, m.sport)) return false;
	if (m.dport && !inRange(ports.dport, m.dport)) return false;
	if (m.icmpType) {
		if (pkt.l4.kind !== "icmp" || pkt.l4.msg.type !== m.icmpType) return false;
	}
	if (m.ctStates && !m.ctStates.includes(ctx.ctState)) return false;
	if (m.iif && m.iif !== ctx.iif) return false;
	if (m.oif && m.oif !== ctx.oif) return false;
	return true;
}
function emptyFilterChain(name) {
	return {
		declared: false,
		name,
		policy: "accept",
		rules: []
	};
}
function emptyNatChain(name) {
	return {
		declared: false,
		name,
		rules: []
	};
}
var FirewallModel = class {
	handleSeq = 0;
	tables = {
		filter: false,
		nat: false
	};
	filter = {
		input: emptyFilterChain("input"),
		forward: emptyFilterChain("forward"),
		output: emptyFilterChain("output")
	};
	nat = {
		prerouting: emptyNatChain("prerouting"),
		postrouting: emptyNatChain("postrouting")
	};
	active() {
		return Object.values(this.filter).some((c) => c.declared) || Object.values(this.nat).some((c) => c.declared);
	}
	declareFilter(hook, name, policy) {
		const c = this.filter[hook];
		c.declared = true;
		c.name = name;
		if (policy) c.policy = policy;
	}
	declareNat(hook, name) {
		const c = this.nat[hook];
		c.declared = true;
		c.name = name;
	}
	ensureIptablesTable(table) {
		this.tables[table] = true;
		if (table === "filter") {
			for (const hook of [
				"input",
				"forward",
				"output"
			]) if (!this.filter[hook].declared) this.declareFilter(hook, hook);
		} else for (const hook of ["prerouting", "postrouting"]) if (!this.nat[hook].declared) this.declareNat(hook, hook);
	}
	chainByName(table, name) {
		const lower = name.toLowerCase();
		if (table === "filter") {
			for (const hook of Object.keys(this.filter)) if (this.filter[hook].declared && this.filter[hook].name.toLowerCase() === lower) return {
				kind: "filter",
				hook
			};
		} else for (const hook of Object.keys(this.nat)) if (this.nat[hook].declared && this.nat[hook].name.toLowerCase() === lower) return {
			kind: "nat",
			hook
		};
		return null;
	}
	addFilterRule(hook, match, verdict, atHead = false) {
		const rule = {
			handle: ++this.handleSeq,
			match,
			verdict
		};
		const rules = this.filter[hook].rules;
		if (atHead) rules.unshift(rule);
		else rules.push(rule);
		return rule.handle;
	}
	addNatRule(hook, match, action, atHead = false) {
		const rule = {
			handle: ++this.handleSeq,
			match,
			action
		};
		const rules = this.nat[hook].rules;
		if (atHead) rules.unshift(rule);
		else rules.push(rule);
		return rule.handle;
	}
	deleteHandle(handle) {
		for (const c of Object.values(this.filter)) {
			const i = c.rules.findIndex((r) => r.handle === handle);
			if (i >= 0) {
				c.rules.splice(i, 1);
				return true;
			}
		}
		for (const c of Object.values(this.nat)) {
			const i = c.rules.findIndex((r) => r.handle === handle);
			if (i >= 0) {
				c.rules.splice(i, 1);
				return true;
			}
		}
		return false;
	}
	flush() {
		this.tables = {
			filter: false,
			nat: false
		};
		this.filter = {
			input: emptyFilterChain("input"),
			forward: emptyFilterChain("forward"),
			output: emptyFilterChain("output")
		};
		this.nat = {
			prerouting: emptyNatChain("prerouting"),
			postrouting: emptyNatChain("postrouting")
		};
	}
	evaluate(hook, pkt, ctx) {
		const c = this.filter[hook];
		if (!c.declared) return {
			verdict: "accept",
			rule: null,
			policy: false,
			filtered: false,
			hook
		};
		for (const r of c.rules) if (matchesRule(r.match, pkt, ctx)) return {
			verdict: r.verdict,
			rule: r,
			policy: false,
			filtered: true,
			hook
		};
		return {
			verdict: c.policy,
			rule: null,
			policy: true,
			filtered: true,
			hook
		};
	}
	evalNat(hook, pkt, ctx) {
		const c = this.nat[hook];
		if (!c.declared) return null;
		for (const r of c.rules) if (matchesRule(r.match, pkt, ctx)) return r;
		return null;
	}
};
function matchToJSON(m) {
	const j = {};
	if (m.srcNet) j.src = cidrToString(m.srcNet.addr, m.srcNet.prefix);
	if (m.dstNet) j.dst = cidrToString(m.dstNet.addr, m.dstNet.prefix);
	if (m.proto) j.proto = m.proto;
	if (m.sport) j.sport = [m.sport.from, m.sport.to];
	if (m.dport) j.dport = [m.dport.from, m.dport.to];
	if (m.icmpType) j.icmpType = m.icmpType;
	if (m.ctStates) j.ct = m.ctStates;
	if (m.iif) j.iif = m.iif;
	if (m.oif) j.oif = m.oif;
	return j;
}
function matchFromJSON(j) {
	const m = {};
	if (j.src) {
		const c = parseCidr(j.src);
		if (c) m.srcNet = c;
	}
	if (j.dst) {
		const c = parseCidr(j.dst);
		if (c) m.dstNet = c;
	}
	if (j.proto) m.proto = j.proto;
	if (j.sport) m.sport = {
		from: j.sport[0],
		to: j.sport[1]
	};
	if (j.dport) m.dport = {
		from: j.dport[0],
		to: j.dport[1]
	};
	if (j.icmpType) m.icmpType = j.icmpType;
	if (j.ct) m.ctStates = j.ct;
	if (j.iif) m.iif = j.iif;
	if (j.oif) m.oif = j.oif;
	return m;
}
function firewallToJSON(fw) {
	if (!fw.active() && !fw.tables.filter && !fw.tables.nat) return null;
	const j = {
		tables: { ...fw.tables },
		filter: {},
		nat: {}
	};
	for (const hook of Object.keys(fw.filter)) {
		const c = fw.filter[hook];
		if (!c.declared) continue;
		j.filter[hook] = {
			name: c.name,
			policy: c.policy,
			rules: c.rules.map((r) => ({
				match: matchToJSON(r.match),
				verdict: r.verdict
			}))
		};
	}
	for (const hook of Object.keys(fw.nat)) {
		const c = fw.nat[hook];
		if (!c.declared) continue;
		j.nat[hook] = {
			name: c.name,
			rules: c.rules.map((r) => ({
				match: matchToJSON(r.match),
				action: r.action.type === "masquerade" ? { type: "masquerade" } : r.action.type === "snat" ? {
					type: "snat",
					addr: ipToString(r.action.addr)
				} : {
					type: "dnat",
					addr: ipToString(r.action.addr),
					port: r.action.port
				}
			}))
		};
	}
	return j;
}
function firewallFromJSON(fw, j) {
	fw.flush();
	fw.tables = {
		filter: !!j.tables?.filter,
		nat: !!j.tables?.nat
	};
	for (const hook of Object.keys(j.filter ?? {})) {
		const c = j.filter[hook];
		if (!c) continue;
		fw.declareFilter(hook, c.name, c.policy);
		for (const r of c.rules) fw.addFilterRule(hook, matchFromJSON(r.match), r.verdict);
	}
	for (const hook of Object.keys(j.nat ?? {})) {
		const c = j.nat[hook];
		if (!c) continue;
		fw.declareNat(hook, c.name);
		for (const r of c.rules) {
			const a = r.action;
			const action = a.type === "masquerade" ? { type: "masquerade" } : a.type === "snat" ? {
				type: "snat",
				addr: parseIp(a.addr) ?? 0
			} : {
				type: "dnat",
				addr: parseIp(a.addr) ?? 0,
				port: a.port
			};
			fw.addNatRule(hook, matchFromJSON(r.match), action);
		}
	}
}
// src/engine/conntrack.ts
var TIMEOUT_MS = 12e4;
function tupleOf(pkt) {
	const l4 = pkt.l4;
	if (l4.kind === "tcp" || l4.kind === "udp") return {
		proto: l4.kind,
		srcIp: pkt.src,
		srcPort: l4.srcPort,
		dstIp: pkt.dst,
		dstPort: l4.dstPort
	};
	if (l4.msg.type === "echo-request" || l4.msg.type === "echo-reply") return {
		proto: "icmp",
		srcIp: pkt.src,
		srcPort: l4.msg.id,
		dstIp: pkt.dst,
		dstPort: l4.msg.id
	};
	return null;
}
function reverseTuple(t) {
	return {
		proto: t.proto,
		srcIp: t.dstIp,
		srcPort: t.dstPort,
		dstIp: t.srcIp,
		dstPort: t.srcPort
	};
}
function key(t) {
	return `${t.proto}|${t.srcIp}|${t.srcPort}|${t.dstIp}|${t.dstPort}`;
}
function rewriteTo(pkt, t) {
	const l4 = pkt.l4;
	if (l4.kind === "tcp" || l4.kind === "udp") return {
		...pkt,
		src: t.srcIp,
		dst: t.dstIp,
		l4: {
			...l4,
			srcPort: t.srcPort,
			dstPort: t.dstPort
		}
	};
	return {
		...pkt,
		src: t.srcIp,
		dst: t.dstIp
	};
}
var ConnTrack = class {
	byOrig = /* @__PURE__ */ new Map();
	byReply = /* @__PURE__ */ new Map();
	process(pkt, now) {
		const l4 = pkt.l4;
		if (l4.kind === "icmp" && (l4.msg.type === "time-exceeded" || l4.msg.type === "dest-unreachable")) {
			const o = l4.msg.original;
			const ot = {
				proto: o.proto,
				srcIp: o.src,
				srcPort: o.srcPort ?? o.icmpId ?? 0,
				dstIp: o.dst,
				dstPort: o.dstPort ?? o.icmpId ?? 0
			};
			const e = this.lookup(this.byOrig, ot, now) ?? this.lookup(this.byReply, ot, now);
			return {
				pkt,
				state: e ? "related" : "new",
				entry: e,
				dir: "none"
			};
		}
		const t = tupleOf(pkt);
		if (!t) return {
			pkt,
			state: "new",
			entry: null,
			dir: "none"
		};
		const icmpReply = l4.kind === "icmp" && l4.msg.type === "echo-reply";
		const icmpRequest = l4.kind === "icmp" && l4.msg.type === "echo-request";
		const orig = icmpReply ? null : this.lookup(this.byOrig, t, now);
		if (orig) {
			orig.lastSeen = now;
			return {
				pkt: rewriteTo(pkt, orig.trans),
				state: orig.state === "established" ? "established" : "new",
				entry: orig,
				dir: "orig"
			};
		}
		const reply = icmpRequest ? null : this.lookup(this.byReply, t, now);
		if (reply) {
			reply.lastSeen = now;
			reply.state = "established";
			return {
				pkt: rewriteTo(pkt, reverseTuple(reply.orig)),
				state: "established",
				entry: reply,
				dir: "reply"
			};
		}
		return {
			pkt,
			state: "new",
			entry: null,
			dir: "none"
		};
	}
	confirm(orig, trans, now) {
		const existing = this.byOrig.get(key(orig));
		if (existing) {
			existing.lastSeen = now;
			return;
		}
		const entry = {
			orig,
			trans,
			state: "new",
			lastSeen: now
		};
		this.byOrig.set(key(orig), entry);
		this.byReply.set(key(reverseTuple(trans)), entry);
	}
	list(now) {
		const out = [];
		for (const [k, e] of this.byOrig) {
			if (now - e.lastSeen > TIMEOUT_MS) {
				this.byOrig.delete(k);
				this.byReply.delete(key(reverseTuple(e.trans)));
				continue;
			}
			out.push(e);
		}
		return out;
	}
	lookup(map, t, now) {
		const e = map.get(key(t));
		if (!e) return null;
		if (now - e.lastSeen > TIMEOUT_MS) {
			this.byOrig.delete(key(e.orig));
			this.byReply.delete(key(reverseTuple(e.trans)));
			return null;
		}
		return e;
	}
};
// src/engine/firewall-fmt.ts
function portText(r) {
	return r.from === r.to ? `${r.from}` : `${r.from}-${r.to}`;
}
function matchToNft(m) {
	const parts = [];
	if (m.iif) parts.push(`iifname "${m.iif}"`);
	if (m.oif) parts.push(`oifname "${m.oif}"`);
	if (m.srcNet) parts.push(`ip saddr ${m.srcNet.prefix === 32 ? ipToString(m.srcNet.addr) : cidrToString(m.srcNet.addr, m.srcNet.prefix)}`);
	if (m.dstNet) parts.push(`ip daddr ${m.dstNet.prefix === 32 ? ipToString(m.dstNet.addr) : cidrToString(m.dstNet.addr, m.dstNet.prefix)}`);
	if (m.icmpType) parts.push(`icmp type ${m.icmpType}`);
	if (m.sport) parts.push(`${m.proto ?? "tcp"} sport ${portText(m.sport)}`);
	if (m.dport) parts.push(`${m.proto ?? "tcp"} dport ${portText(m.dport)}`);
	if (m.proto && !m.sport && !m.dport && !m.icmpType) parts.push(`ip protocol ${m.proto}`);
	if (m.ctStates) parts.push(`ct state ${m.ctStates.join(",")}`);
	return parts.join(" ");
}
function filterRuleText(r) {
	const m = matchToNft(r.match);
	return m ? `${m} ${r.verdict}` : r.verdict;
}
function natRuleText(r) {
	const m = matchToNft(r.match);
	const a = r.action;
	const action = a.type === "masquerade" ? "masquerade" : a.type === "snat" ? `snat to ${ipToString(a.addr)}` : `dnat to ${ipToString(a.addr)}${a.port !== void 0 ? `:${a.port}` : ""}`;
	return m ? `${m} ${action}` : action;
}
var FILTER_PRIO = {
	input: "0",
	forward: "0",
	output: "0"
};
var NAT_PRIO = {
	prerouting: "-100",
	postrouting: "100"
};
function listRuleset(fw, opts = {}) {
	let s = "";
	const h = (handle) => opts.handles ? ` # handle ${handle}` : "";
	if (fw.tables.filter) {
		s += "table ip filter {\n";
		for (const hook of [
			"input",
			"forward",
			"output"
		]) {
			const c = fw.filter[hook];
			if (!c.declared) continue;
			s += `\tchain ${c.name} {\n`;
			s += `\t\ttype filter hook ${hook} priority ${FILTER_PRIO[hook]}; policy ${c.policy};\n`;
			for (const r of c.rules) s += `\t\t${filterRuleText(r)}${h(r.handle)}\n`;
			s += "	}\n";
		}
		s += "}\n";
	}
	if (fw.tables.nat) {
		s += "table ip nat {\n";
		for (const hook of ["prerouting", "postrouting"]) {
			const c = fw.nat[hook];
			if (!c.declared) continue;
			s += `\tchain ${c.name} {\n`;
			s += `\t\ttype nat hook ${hook} priority ${NAT_PRIO[hook]};\n`;
			for (const r of c.rules) s += `\t\t${natRuleText(r)}${h(r.handle)}\n`;
			s += "	}\n";
		}
		s += "}\n";
	}
	return s || "(empty ruleset — try: nft add table ip filter)\n";
}
var IPT_CHAIN = {
	input: "INPUT",
	forward: "FORWARD",
	output: "OUTPUT",
	prerouting: "PREROUTING",
	postrouting: "POSTROUTING"
};
function matchToIptables(m) {
	const parts = [];
	if (m.srcNet) parts.push(`-s ${cidrToString(m.srcNet.addr, m.srcNet.prefix)}`);
	if (m.dstNet) parts.push(`-d ${cidrToString(m.dstNet.addr, m.dstNet.prefix)}`);
	if (m.iif) parts.push(`-i ${m.iif}`);
	if (m.oif) parts.push(`-o ${m.oif}`);
	if (m.proto) parts.push(`-p ${m.proto}`);
	if (m.icmpType) parts.push(`--icmp-type ${m.icmpType}`);
	if (m.sport) parts.push(`--sport ${m.sport.from === m.sport.to ? m.sport.from : `${m.sport.from}:${m.sport.to}`}`);
	if (m.dport) parts.push(`--dport ${m.dport.from === m.dport.to ? m.dport.from : `${m.dport.from}:${m.dport.to}`}`);
	if (m.ctStates) parts.push(`-m conntrack --ctstate ${m.ctStates.map((s) => s.toUpperCase()).join(",")}`);
	return parts.join(" ");
}
function iptTarget(r) {
	return r.verdict.toUpperCase();
}
function iptNatTarget(r) {
	const a = r.action;
	if (a.type === "masquerade") return "MASQUERADE";
	if (a.type === "snat") return `SNAT --to-source ${ipToString(a.addr)}`;
	return `DNAT --to-destination ${ipToString(a.addr)}${a.port !== void 0 ? `:${a.port}` : ""}`;
}
function iptablesSave(fw, table) {
	let s = "";
	if (table === "filter") {
		if (!fw.tables.filter) return "iptables: table filter is empty (no chains declared yet).\n";
		for (const hook of [
			"input",
			"forward",
			"output"
		]) {
			const c = fw.filter[hook];
			if (c.declared) s += `-P ${IPT_CHAIN[hook]} ${c.policy.toUpperCase()}\n`;
		}
		for (const hook of [
			"input",
			"forward",
			"output"
		]) {
			const c = fw.filter[hook];
			if (!c.declared) continue;
			for (const r of c.rules) {
				const m = matchToIptables(r.match);
				s += `-A ${IPT_CHAIN[hook]}${m ? " " + m : ""} -j ${iptTarget(r)}\n`;
			}
		}
	} else {
		if (!fw.tables.nat) return "iptables: table nat is empty (no chains declared yet).\n";
		for (const hook of ["prerouting", "postrouting"]) if (fw.nat[hook].declared) s += `-P ${IPT_CHAIN[hook]} ACCEPT\n`;
		for (const hook of ["prerouting", "postrouting"]) {
			const c = fw.nat[hook];
			if (!c.declared) continue;
			for (const r of c.rules) {
				const m = matchToIptables(r.match);
				s += `-A ${IPT_CHAIN[hook]}${m ? " " + m : ""} -j ${iptNatTarget(r)}\n`;
			}
		}
	}
	return s;
}
function iptablesListing(fw, table, opts = {}) {
	let s = "";
	const renderFilter = (hook) => {
		const c = fw.filter[hook];
		if (!c.declared) return;
		s += `Chain ${IPT_CHAIN[hook]} (policy ${c.policy.toUpperCase()})\n`;
		s += (opts.lineNumbers ? "num  " : "") + "target     prot  source               destination\n";
		c.rules.forEach((r, i) => {
			const num = opts.lineNumbers ? `${i + 1}`.padEnd(5) : "";
			const src = r.match.srcNet ? cidrToString(r.match.srcNet.addr, r.match.srcNet.prefix) : "anywhere";
			const dst = r.match.dstNet ? cidrToString(r.match.dstNet.addr, r.match.dstNet.prefix) : "anywhere";
			const extras = [];
			if (r.match.dport) extras.push(`dpt:${iptPortText(r.match.dport)}`);
			if (r.match.sport) extras.push(`spt:${iptPortText(r.match.sport)}`);
			if (r.match.ctStates) extras.push(`ctstate ${r.match.ctStates.map((x) => x.toUpperCase()).join(",")}`);
			if (r.match.icmpType) extras.push(r.match.icmpType);
			s += `${num}${iptTarget(r).padEnd(11)}${(r.match.proto ?? "all").padEnd(6)}${src.padEnd(21)}${dst.padEnd(21)}${extras.join(" ")}\n`;
		});
		s += "\n";
	};
	const renderNat = (hook) => {
		const c = fw.nat[hook];
		if (!c.declared) return;
		s += `Chain ${IPT_CHAIN[hook]} (policy ACCEPT)\n`;
		s += (opts.lineNumbers ? "num  " : "") + "target     prot  source               destination\n";
		c.rules.forEach((r, i) => {
			const num = opts.lineNumbers ? `${i + 1}`.padEnd(5) : "";
			const src = r.match.srcNet ? cidrToString(r.match.srcNet.addr, r.match.srcNet.prefix) : "anywhere";
			const dst = r.match.dstNet ? cidrToString(r.match.dstNet.addr, r.match.dstNet.prefix) : "anywhere";
			s += `${num}${iptNatTarget(r).split(" ")[0].padEnd(11)}${(r.match.proto ?? "all").padEnd(6)}${src.padEnd(21)}${dst.padEnd(21)}${iptNatTarget(r).split(" ").slice(1).join(" ")}\n`;
		});
		s += "\n";
	};
	if (table === "filter") {
		if (!fw.tables.filter) return "Chain INPUT (policy ACCEPT)\nChain FORWARD (policy ACCEPT)\nChain OUTPUT (policy ACCEPT)\n";
		[
			"input",
			"forward",
			"output"
		].forEach(renderFilter);
	} else {
		if (!fw.tables.nat) return "Chain PREROUTING (policy ACCEPT)\nChain POSTROUTING (policy ACCEPT)\n";
		["prerouting", "postrouting"].forEach(renderNat);
	}
	return s;
}
function iptPortText(r) {
	return r.from === r.to ? `${r.from}` : `${r.from}:${r.to}`;
}
var ARP_RETRY_MS = 500;
var ARP_MAX_TRIES = 3;
var FW_LOG_MAX = 80;
var DNS_TIMEOUT_MS = 2500;
var RIP_INTERVAL_MS = 1e4;
var RIP_TIMEOUT_MS = 45e3;
var RIP_INFINITY = 16;
function normalizeName(name) {
	return name.toLowerCase().replace(/\.$/, "");
}
function refOf(pkt) {
	const l4 = pkt.l4;
	if (l4.kind === "tcp" || l4.kind === "udp") return {
		src: pkt.src,
		dst: pkt.dst,
		proto: l4.kind,
		icmpId: null,
		icmpSeq: null,
		srcPort: l4.srcPort,
		dstPort: l4.dstPort
	};
	const msg = l4.msg;
	const hasIds = msg.type === "echo-request" || msg.type === "echo-reply";
	return {
		src: pkt.src,
		dst: pkt.dst,
		proto: "icmp",
		icmpId: hasIds ? msg.id : null,
		icmpSeq: hasIds ? msg.seq : null,
		srcPort: null,
		dstPort: null
	};
}
function isIcmpError(pkt) {
	return pkt.l4.kind === "icmp" && (pkt.l4.msg.type === "time-exceeded" || pkt.l4.msg.type === "dest-unreachable");
}
function summarizePacket(pkt) {
	const l4 = pkt.l4;
	if (l4.kind === "tcp") {
		const flags = [
			l4.syn && "SYN",
			l4.ack && "ACK",
			l4.rst && "RST",
			l4.fin && "FIN"
		].filter(Boolean).join(",");
		return `tcp ${ipToString(pkt.src)}:${l4.srcPort} > ${ipToString(pkt.dst)}:${l4.dstPort}${flags ? ` [${flags}]` : ""}`;
	}
	if (l4.kind === "udp") return `udp ${ipToString(pkt.src)}:${l4.srcPort} > ${ipToString(pkt.dst)}:${l4.dstPort}`;
	return `icmp ${l4.msg.type} ${ipToString(pkt.src)} > ${ipToString(pkt.dst)}`;
}
var IpDevice = class extends Device {
	forwarding = false;
	arpTable = /* @__PURE__ */ new Map();
	staticRoutes = [];
	fw = new FirewallModel();
	ct = new ConnTrack();
	fwLog = [];
	services = {
		tcp: /* @__PURE__ */ new Set(),
		udp: /* @__PURE__ */ new Set()
	};
	ncTcp = /* @__PURE__ */ new Map();
	ncUdp = /* @__PURE__ */ new Map();
	nameserver = null;
	dhcpServer = null;
	dnsServer = null;
	httpServer = null;
	dhcpListeners = /* @__PURE__ */ new Set();
	ripEnabled = false;
	ripRoutes = [];
	ripScheduled = false;
	pendingArp = /* @__PURE__ */ new Map();
	icmpListeners = /* @__PURE__ */ new Map();
	icmpIdSeq = 0;
	tcpSessions = /* @__PURE__ */ new Map();
	udpSessions = /* @__PURE__ */ new Map();
	dnsPending = /* @__PURE__ */ new Map();
	ephemeralPort = 39999;
	dnsQidSeq = 0;
	dhcpXidSeq = 0;
	allocIcmpId() {
		return ++this.icmpIdSeq;
	}
	nextDhcpXid() {
		return ++this.dhcpXidSeq;
	}
	onIcmp(id, fn) {
		this.icmpListeners.set(id, fn);
	}
	offIcmp(id) {
		this.icmpListeners.delete(id);
	}
	myIps() {
		return this.interfaces.filter((i) => i.ip).map((i) => i.ip.addr);
	}
	hasIp(ip) {
		return this.interfaces.some((i) => i.ip && i.ip.addr === ip);
	}
	routes() {
		const rs = [];
		for (const i of this.interfaces) if (i.up && i.ip) rs.push({
			dest: networkOf(i.ip.addr, i.ip.prefix),
			prefix: i.ip.prefix,
			via: null,
			ifaceName: i.name,
			kind: "connected"
		});
		rs.push(...this.staticRoutes);
		for (const r of this.freshRipRoutes()) rs.push({
			dest: r.dest,
			prefix: r.prefix,
			via: r.via,
			ifaceName: r.ifaceName,
			kind: "rip",
			metric: r.metric
		});
		return rs;
	}
	freshRipRoutes() {
		const now = this.network.now;
		this.ripRoutes = this.ripRoutes.filter((r) => now - r.learnedAt < RIP_TIMEOUT_MS);
		return this.ripRoutes;
	}
	enableRip(on) {
		this.ripEnabled = on;
		if (on && !this.ripScheduled) this.ripTick();
		if (!on) this.ripRoutes = [];
	}
	ripTick() {
		if (!this.ripEnabled) {
			this.ripScheduled = false;
			return;
		}
		this.ripScheduled = true;
		for (const iface of this.interfaces) if (iface.up && iface.link && iface.ip) this.advertiseRip(iface);
		this.network.scheduler.schedule(RIP_INTERVAL_MS, () => this.ripTick());
	}
	advertiseRip(iface) {
		const entries = [];
		for (const i of this.interfaces) {
			if (i === iface || !i.up || !i.ip) continue;
			entries.push({
				dest: networkOf(i.ip.addr, i.ip.prefix),
				prefix: i.ip.prefix,
				metric: 1
			});
		}
		for (const r of this.freshRipRoutes()) {
			if (r.ifaceName === iface.name) continue;
			entries.push({
				dest: r.dest,
				prefix: r.prefix,
				metric: r.metric
			});
		}
		if (!entries.length) return;
		this.sendBroadcastUdp(iface, iface.ip.addr, 520, 520, {
			kind: "rip",
			routes: entries
		});
	}
	handleRip(app, iif, from) {
		const now = this.network.now;
		for (const e of app.routes) {
			const metric = Math.min(e.metric + 1, RIP_INFINITY);
			const isConnected = this.interfaces.some((i) => i.up && i.ip && networkOf(i.ip.addr, i.ip.prefix) === e.dest && i.ip.prefix === e.prefix);
			const isStatic = this.staticRoutes.some((r) => r.dest === e.dest && r.prefix === e.prefix);
			if (isConnected || isStatic) continue;
			const existing = this.freshRipRoutes().find((r) => r.dest === e.dest && r.prefix === e.prefix);
			if (metric >= RIP_INFINITY) {
				if (existing && existing.via === from) this.ripRoutes = this.ripRoutes.filter((r) => r !== existing);
				continue;
			}
			if (!existing) this.ripRoutes.push({
				dest: e.dest,
				prefix: e.prefix,
				via: from,
				ifaceName: iif,
				metric,
				learnedAt: now
			});
			else if (existing.via === from || metric < existing.metric) {
				existing.via = from;
				existing.ifaceName = iif;
				existing.metric = metric;
				existing.learnedAt = now;
			}
		}
	}
	lookupRoute(dst) {
		let best = null;
		for (const r of this.routes()) {
			if (networkOf(dst, r.prefix) !== r.dest) continue;
			const iface = this.getInterface(r.ifaceName);
			if (!iface || !iface.up || !iface.link) continue;
			if (!best || r.prefix > best.prefix) best = r;
		}
		return best;
	}
	addIp(ifaceName, addr, prefix) {
		const iface = this.getInterface(ifaceName);
		if (!iface) return `Cannot find device "${ifaceName}"`;
		if (iface.ip && iface.ip.addr === addr && iface.ip.prefix === prefix) return "RTNETLINK answers: File exists";
		if (iface.ip) return `netsim: one address per interface in phase 1 — "ip address del ${ifaceName}'s current address" first`;
		iface.ip = {
			addr,
			prefix
		};
		return null;
	}
	delIp(ifaceName, addr, prefix) {
		const iface = this.getInterface(ifaceName);
		if (!iface) return `Cannot find device "${ifaceName}"`;
		if (!iface.ip || iface.ip.addr !== addr || iface.ip.prefix !== prefix) return "RTNETLINK answers: Cannot assign requested address";
		iface.ip = null;
		return null;
	}
	addRoute(dest, prefix, via, dev) {
		let ifaceName = dev ?? null;
		if (ifaceName && !this.getInterface(ifaceName)) return `Cannot find device "${ifaceName}"`;
		if (!ifaceName) {
			if (via === null) return "Error: either \"via\" or \"dev\" is required.";
			const r = this.lookupRoute(via);
			if (!r || r.kind !== "connected") return "Error: Nexthop has invalid gateway.";
			ifaceName = r.ifaceName;
		}
		if (this.staticRoutes.some((r) => r.dest === dest && r.prefix === prefix)) return "RTNETLINK answers: File exists";
		this.staticRoutes.push({
			dest: networkOf(dest, prefix),
			prefix,
			via,
			ifaceName,
			kind: "static"
		});
		return null;
	}
	delRoute(dest, prefix) {
		const i = this.staticRoutes.findIndex((r) => r.dest === networkOf(dest, prefix) && r.prefix === prefix);
		if (i < 0) return "RTNETLINK answers: No such process";
		this.staticRoutes.splice(i, 1);
		return null;
	}
	sendEcho(dst, id, seq, ttl = 64) {
		return this.sendL4(dst, {
			kind: "icmp",
			msg: {
				type: "echo-request",
				id,
				seq
			}
		}, { ttl });
	}
	sendIcmp(dst, msg, opts = {}) {
		return this.sendL4(dst, {
			kind: "icmp",
			msg
		}, opts);
	}
	sendL4(dst, l4, opts = {}) {
		if (this.hasIp(dst)) {
			const pkt = {
				kind: "ipv4",
				src: opts.srcOverride ?? dst,
				dst,
				ttl: opts.ttl ?? 64,
				l4
			};
			this.network.scheduler.schedule(1, () => this.deliverLocal(pkt));
			return null;
		}
		const route = this.lookupRoute(dst);
		if (!route) return "Network is unreachable";
		const iface = this.getInterface(route.ifaceName);
		const src = opts.srcOverride ?? iface.ip?.addr;
		if (src === void 0) return "Network is unreachable";
		let pkt = {
			kind: "ipv4",
			src,
			dst,
			ttl: opts.ttl ?? 64,
			l4
		};
		const now = this.network.now;
		const proc = this.ct.process(pkt, now);
		pkt = proc.pkt;
		const res = this.fw.evaluate("output", pkt, {
			oif: route.ifaceName,
			ctState: proc.state
		});
		this.logFw(res, pkt);
		if (res.verdict !== "accept") return "Operation not permitted";
		if (proc.dir === "none" && proc.state === "new") {
			const origTuple = tupleOf(pkt);
			const nr = this.fw.evalNat("postrouting", pkt, {
				oif: route.ifaceName,
				ctState: "new"
			});
			if (nr) pkt = this.applySnat(pkt, nr.action, iface);
			const trans = tupleOf(pkt);
			if (origTuple && trans) this.ct.confirm(origTuple, trans, now);
		}
		this.routePacket(pkt, route);
		return null;
	}
	sendBroadcastUdp(iface, srcIp, srcPort, dstPort, app) {
		if (!iface.up || !iface.link) return false;
		const pkt = {
			kind: "ipv4",
			src: srcIp,
			dst: BROADCAST_IP,
			ttl: 64,
			l4: {
				kind: "udp",
				srcPort,
				dstPort,
				app
			}
		};
		const res = this.fw.evaluate("output", pkt, {
			oif: iface.name,
			ctState: "new"
		});
		this.logFw(res, pkt);
		if (res.verdict !== "accept") return false;
		iface.send({
			srcMac: iface.mac,
			dstMac: BROADCAST_MAC,
			payload: pkt
		});
		return true;
	}
	sendDhcpClient(iface, app) {
		return this.sendBroadcastUdp(iface, 0, 68, 67, app);
	}
	tcpListening(port) {
		return this.services.tcp.has(port) || this.ncTcp.has(port) || this.httpServer?.enabled === true && this.httpServer.port === port;
	}
	udpListening(port) {
		return this.services.udp.has(port) || this.ncUdp.has(port) || port === 53 && this.dnsServer?.enabled === true || port === 520 && this.ripEnabled;
	}
	openTcp(dst, port, onEvent) {
		const srcPort = ++this.ephemeralPort;
		const key = `${srcPort}|${dst}|${port}`;
		this.tcpSessions.set(key, onEvent);
		const close = () => this.tcpSessions.delete(key);
		const err = this.sendL4(dst, {
			kind: "tcp",
			srcPort,
			dstPort: port,
			syn: true,
			ack: false,
			rst: false,
			fin: false
		});
		if (err) {
			close();
			return {
				srcPort,
				close,
				error: err
			};
		}
		return {
			srcPort,
			close,
			error: null
		};
	}
	connectTcp(dst, port, timeoutMs, cb) {
		let finished = false;
		const finish = (r) => {
			if (finished) return;
			finished = true;
			conn.close();
			cb(r);
		};
		const conn = this.openTcp(dst, port, (ev) => {
			if (ev.type === "open") finish("open");
			else if (ev.type === "refused") finish("refused");
			else if (ev.type === "unreachable") finish("unreachable");
		});
		if (conn.error) return conn.error;
		this.network.scheduler.schedule(timeoutMs, () => finish("timeout"));
		return null;
	}
	probeUdp(dst, port, timeoutMs, cb) {
		const srcPort = ++this.ephemeralPort;
		const key = `${srcPort}|${dst}|${port}`;
		let finished = false;
		const finish = (r) => {
			if (finished) return;
			finished = true;
			this.udpSessions.delete(key);
			cb(r);
		};
		this.udpSessions.set(key, finish);
		const err = this.sendL4(dst, {
			kind: "udp",
			srcPort,
			dstPort: port
		});
		if (err) {
			this.udpSessions.delete(key);
			return err;
		}
		this.network.scheduler.schedule(timeoutMs, () => finish("open"));
		return null;
	}
	httpGet(dst, port, path, host, timeoutMs, cb, onConnect) {
		let finished = false;
		let connected = false;
		const finish = (res) => {
			if (finished) return;
			finished = true;
			conn.close();
			cb(res);
		};
		const conn = this.openTcp(dst, port, (ev) => {
			if (ev.type === "open") {
				connected = true;
				onConnect?.();
				this.sendL4(dst, {
					kind: "tcp",
					srcPort: conn.srcPort,
					dstPort: port,
					syn: false,
					ack: true,
					rst: false,
					fin: false,
					app: {
						kind: "http-request",
						method: "GET",
						path,
						host
					}
				});
			} else if (ev.type === "data" && ev.app.kind === "http-response") finish({
				ok: true,
				status: ev.app.status,
				reason: ev.app.reason,
				body: ev.app.body
			});
			else if (ev.type === "refused") finish({
				ok: false,
				error: "refused"
			});
			else if (ev.type === "unreachable") finish({
				ok: false,
				error: "unreachable"
			});
		});
		if (conn.error) return conn.error;
		this.network.scheduler.schedule(timeoutMs, () => finish({
			ok: false,
			error: connected ? "empty" : "timeout"
		}));
		return null;
	}
	resolveDns(name, server, cb) {
		const qid = ++this.dnsQidSeq;
		const srcPort = ++this.ephemeralPort;
		const sessKey = `${srcPort}|${server}|53`;
		let finished = false;
		const finish = (r) => {
			if (finished) return;
			finished = true;
			this.dnsPending.delete(qid);
			this.udpSessions.delete(sessKey);
			cb(r);
		};
		this.dnsPending.set(qid, { finish });
		this.udpSessions.set(sessKey, (r) => finish(r === "refused" ? "refused" : "timeout"));
		if (this.sendL4(server, {
			kind: "udp",
			srcPort,
			dstPort: 53,
			app: {
				kind: "dns-query",
				qid,
				qname: normalizeName(name)
			}
		})) {
			finish("timeout");
			return;
		}
		this.network.scheduler.schedule(DNS_TIMEOUT_MS, () => finish("timeout"));
	}
	receiveFrame(iface, frame) {
		if (frame.payload.kind === "arp") {
			this.handleArp(iface, frame.payload);
			return;
		}
		if (frame.dstMac !== iface.mac && frame.dstMac !== "ff:ff:ff:ff:ff:ff") return;
		this.handleIp(frame.payload, iface.name);
	}
	handleIp(pktIn, iif) {
		if (pktIn.dst === 4294967295) {
			const res = this.fw.evaluate("input", pktIn, {
				iif,
				ctState: "new"
			});
			this.logFw(res, pktIn);
			if (res.verdict !== "accept") return;
			this.deliverBroadcast(pktIn, iif);
			return;
		}
		const now = this.network.now;
		const proc = this.ct.process(pktIn, now);
		let pkt = proc.pkt;
		const ctState = proc.state;
		const origTuple = proc.dir === "none" ? tupleOf(pkt) : null;
		if (proc.dir === "none" && ctState === "new") {
			const nr = this.fw.evalNat("prerouting", pkt, {
				iif,
				ctState
			});
			if (nr && nr.action.type === "dnat") pkt = this.applyDnat(pkt, nr.action.addr, nr.action.port);
		}
		if (this.hasIp(pkt.dst)) {
			const res = this.fw.evaluate("input", pkt, {
				iif,
				ctState
			});
			this.logFw(res, pkt);
			if (res.verdict === "drop") return;
			if (res.verdict === "reject") {
				this.rejectPacket(pkt);
				return;
			}
			if (origTuple) {
				const t = tupleOf(pkt);
				if (t) this.ct.confirm(origTuple, t, now);
			}
			this.deliverLocal(pkt);
			return;
		}
		if (!this.forwarding) return;
		const ttl = pkt.ttl - 1;
		if (ttl <= 0) {
			if (!isIcmpError(pkt)) this.sendIcmp(pkt.src, {
				type: "time-exceeded",
				original: refOf(pkt)
			});
			return;
		}
		pkt = {
			...pkt,
			ttl
		};
		const route = this.lookupRoute(pkt.dst);
		if (!route) {
			if (!isIcmpError(pkt)) this.sendIcmp(pkt.src, {
				type: "dest-unreachable",
				code: "net",
				original: refOf(pkt)
			});
			return;
		}
		const res = this.fw.evaluate("forward", pkt, {
			iif,
			oif: route.ifaceName,
			ctState
		});
		this.logFw(res, pkt);
		if (res.verdict === "drop") return;
		if (res.verdict === "reject") {
			this.rejectPacket(pkt);
			return;
		}
		if (proc.dir === "none" && ctState === "new") {
			const nr = this.fw.evalNat("postrouting", pkt, {
				iif,
				oif: route.ifaceName,
				ctState
			});
			if (nr) pkt = this.applySnat(pkt, nr.action, this.getInterface(route.ifaceName));
			const trans = tupleOf(pkt);
			if (origTuple && trans) this.ct.confirm(origTuple, trans, now);
		}
		this.routePacket(pkt, route);
	}
	deliverBroadcast(pkt, iif) {
		const l4 = pkt.l4;
		if (l4.kind !== "udp" || !l4.app) return;
		if (l4.app.kind === "dhcp") {
			if (l4.dstPort === 67) this.handleDhcpServer(l4.app, iif);
			else if (l4.dstPort === 68) for (const h of [...this.dhcpListeners]) h(l4.app);
			return;
		}
		if (l4.app.kind === "rip" && l4.dstPort === 520 && this.ripEnabled) this.handleRip(l4.app, iif, pkt.src);
	}
	handleDhcpServer(app, iif) {
		const cfg = this.dhcpServer;
		if (!cfg?.enabled) return;
		const iface = this.getInterface(iif);
		if (!iface?.ip) return;
		if (app.op === "discover") {
			const lease = this.allocLease(cfg, app.clientMac);
			if (lease === null) return;
			this.sendBroadcastUdp(iface, iface.ip.addr, 67, 68, {
				kind: "dhcp",
				op: "offer",
				xid: app.xid,
				clientMac: app.clientMac,
				yourIp: lease,
				prefix: iface.ip.prefix,
				router: cfg.router,
				dns: cfg.dns,
				serverIp: iface.ip.addr
			});
		} else if (app.op === "request" && app.yourIp !== void 0) {
			cfg.leases.set(app.clientMac, app.yourIp);
			this.sendBroadcastUdp(iface, iface.ip.addr, 67, 68, {
				kind: "dhcp",
				op: "ack",
				xid: app.xid,
				clientMac: app.clientMac,
				yourIp: app.yourIp,
				prefix: iface.ip.prefix,
				router: cfg.router,
				dns: cfg.dns,
				serverIp: iface.ip.addr
			});
		}
	}
	allocLease(cfg, mac) {
		const existing = cfg.leases.get(mac);
		if (existing !== void 0) return existing;
		const taken = /* @__PURE__ */ new Set([...cfg.leases.values(), ...this.myIps()]);
		for (let ip = cfg.rangeStart; ip <= cfg.rangeEnd; ip++) if (!taken.has(ip >>> 0)) return ip >>> 0;
		return null;
	}
	applyDnat(pkt, addr, port) {
		const l4 = pkt.l4;
		if ((l4.kind === "tcp" || l4.kind === "udp") && port !== void 0) return {
			...pkt,
			dst: addr,
			l4: {
				...l4,
				dstPort: port
			}
		};
		return {
			...pkt,
			dst: addr
		};
	}
	applySnat(pkt, action, oiface) {
		if (action.type === "dnat") return pkt;
		const newSrc = action.type === "masquerade" ? oiface.ip?.addr : action.addr;
		if (newSrc === void 0) return pkt;
		return {
			...pkt,
			src: newSrc
		};
	}
	rejectPacket(pkt) {
		if (isIcmpError(pkt)) return;
		this.sendIcmp(pkt.src, {
			type: "dest-unreachable",
			code: "port",
			original: refOf(pkt)
		});
	}
	logFw(res, pkt) {
		if (!res.filtered) return;
		this.fwLog.unshift({
			t: this.network.now,
			hook: res.hook,
			verdict: res.verdict,
			rule: res.rule ? filterRuleText(res.rule) : `policy ${res.verdict}`,
			pkt: summarizePacket(pkt)
		});
		if (this.fwLog.length > FW_LOG_MAX) this.fwLog.length = FW_LOG_MAX;
		if (res.verdict !== "accept") this.network.onFwDrop?.(this.id);
	}
	routePacket(pkt, route) {
		const iface = this.getInterface(route.ifaceName);
		const nextHop = route.via ?? pkt.dst;
		this.resolveAndSend(iface, nextHop, pkt);
	}
	resolveAndSend(iface, nextHop, pkt) {
		const cached = this.arpTable.get(nextHop);
		if (cached) {
			iface.send({
				srcMac: iface.mac,
				dstMac: cached.mac,
				payload: pkt
			});
			return;
		}
		const pending = this.pendingArp.get(nextHop);
		if (pending) {
			pending.queue.push(pkt);
			return;
		}
		const entry = {
			iface,
			queue: [pkt],
			tries: 1,
			timer: null
		};
		this.pendingArp.set(nextHop, entry);
		this.sendArpRequest(iface, nextHop);
		entry.timer = this.network.scheduler.schedule(ARP_RETRY_MS, () => this.arpRetry(nextHop, entry));
	}
	arpRetry(nextHop, entry) {
		if (entry.tries >= ARP_MAX_TRIES) {
			this.pendingArp.delete(nextHop);
			for (const pkt of entry.queue) this.failDelivery(pkt);
			return;
		}
		entry.tries++;
		this.sendArpRequest(entry.iface, nextHop);
		entry.timer = this.network.scheduler.schedule(ARP_RETRY_MS, () => this.arpRetry(nextHop, entry));
	}
	failDelivery(pkt) {
		if (this.hasIp(pkt.src)) {
			const ref = refOf(pkt);
			if (ref.icmpId !== null) this.icmpListeners.get(ref.icmpId)?.({
				type: "send-error",
				seq: ref.icmpSeq,
				message: "Destination Host Unreachable"
			});
			else if (ref.proto === "tcp" || ref.proto === "udp") this.notifySocket(ref, "unreachable");
		} else if (!isIcmpError(pkt)) this.sendIcmp(pkt.src, {
			type: "dest-unreachable",
			code: "host",
			original: refOf(pkt)
		});
	}
	sendArpRequest(iface, targetIp) {
		if (!iface.ip) return;
		iface.send({
			srcMac: iface.mac,
			dstMac: BROADCAST_MAC,
			payload: {
				kind: "arp",
				op: "request",
				senderIp: iface.ip.addr,
				senderMac: iface.mac,
				targetIp,
				targetMac: null
			}
		});
	}
	handleArp(iface, arp) {
		if (arp.op === "request") {
			if (iface.ip && arp.targetIp === iface.ip.addr) {
				this.arpTable.set(arp.senderIp, {
					mac: arp.senderMac,
					ifaceName: iface.name,
					at: this.network.now
				});
				iface.send({
					srcMac: iface.mac,
					dstMac: arp.senderMac,
					payload: {
						kind: "arp",
						op: "reply",
						senderIp: iface.ip.addr,
						senderMac: iface.mac,
						targetIp: arp.senderIp,
						targetMac: arp.senderMac
					}
				});
			}
			return;
		}
		this.arpTable.set(arp.senderIp, {
			mac: arp.senderMac,
			ifaceName: iface.name,
			at: this.network.now
		});
		const pending = this.pendingArp.get(arp.senderIp);
		if (pending) {
			if (pending.timer) this.network.scheduler.cancel(pending.timer);
			this.pendingArp.delete(arp.senderIp);
			for (const pkt of pending.queue) pending.iface.send({
				srcMac: pending.iface.mac,
				dstMac: arp.senderMac,
				payload: pkt
			});
		}
	}
	deliverLocal(pkt) {
		const l4 = pkt.l4;
		if (l4.kind === "tcp") {
			this.handleTcp(pkt, l4);
			return;
		}
		if (l4.kind === "udp") {
			this.handleUdp(pkt, l4);
			return;
		}
		const msg = l4.msg;
		switch (msg.type) {
			case "echo-request":
				this.sendIcmp(pkt.src, {
					type: "echo-reply",
					id: msg.id,
					seq: msg.seq
				}, { srcOverride: this.hasIp(pkt.dst) ? pkt.dst : void 0 });
				break;
			case "echo-reply":
				this.icmpListeners.get(msg.id)?.({
					type: "reply",
					from: pkt.src,
					seq: msg.seq,
					ttl: pkt.ttl
				});
				break;
			case "time-exceeded":
				if (msg.original.icmpId !== null) this.icmpListeners.get(msg.original.icmpId)?.({
					type: "time-exceeded",
					from: pkt.src,
					seq: msg.original.icmpSeq
				});
				break;
			case "dest-unreachable": if (msg.original.proto === "icmp" && msg.original.icmpId !== null) this.icmpListeners.get(msg.original.icmpId)?.({
				type: "unreachable",
				from: pkt.src,
				seq: msg.original.icmpSeq,
				code: msg.code
			});
			else if (msg.original.proto === "tcp" || msg.original.proto === "udp") this.notifySocket(msg.original, msg.code === "port" ? "refused" : "unreachable");
		}
	}
	handleUdp(pkt, dgram) {
		const app = dgram.app;
		if (app?.kind === "dns-query" && dgram.dstPort === 53 && this.dnsServer?.enabled) {
			const addr = this.dnsServer.records.get(normalizeName(app.qname)) ?? null;
			this.sendL4(pkt.src, {
				kind: "udp",
				srcPort: 53,
				dstPort: dgram.srcPort,
				app: {
					kind: "dns-answer",
					qid: app.qid,
					qname: app.qname,
					addr
				}
			}, { srcOverride: this.hasIp(pkt.dst) ? pkt.dst : void 0 });
			return;
		}
		if (app?.kind === "dns-answer") {
			const pending = this.dnsPending.get(app.qid);
			if (pending) {
				pending.finish(app.addr);
				return;
			}
		}
		if (this.udpListening(dgram.dstPort)) {
			this.ncUdp.get(dgram.dstPort)?.(`Received UDP datagram from ${ipToString(pkt.src)}:${dgram.srcPort}`);
			return;
		}
		this.sendIcmp(pkt.src, {
			type: "dest-unreachable",
			code: "port",
			original: refOf(pkt)
		});
	}
	handleTcp(pkt, seg) {
		const sessionKey = `${seg.dstPort}|${pkt.src}|${seg.srcPort}`;
		if (seg.app) {
			const session = this.tcpSessions.get(sessionKey);
			if (session) {
				session({
					type: "data",
					app: seg.app
				});
				return;
			}
			this.handleServerTcpData(pkt, seg);
			return;
		}
		const reply = (flags) => {
			this.sendL4(pkt.src, {
				kind: "tcp",
				srcPort: seg.dstPort,
				dstPort: seg.srcPort,
				syn: false,
				ack: false,
				rst: false,
				fin: false,
				...flags
			}, { srcOverride: this.hasIp(pkt.dst) ? pkt.dst : void 0 });
		};
		if (seg.syn && !seg.ack) {
			if (this.tcpListening(seg.dstPort)) {
				this.ncTcp.get(seg.dstPort)?.(`Connection received from ${ipToString(pkt.src)}:${seg.srcPort}`);
				reply({
					syn: true,
					ack: true
				});
			} else reply({
				rst: true,
				ack: true
			});
			return;
		}
		if (seg.syn && seg.ack) {
			reply({ ack: true });
			this.tcpSessions.get(sessionKey)?.({ type: "open" });
			return;
		}
		if (seg.rst) this.tcpSessions.get(sessionKey)?.({ type: "refused" });
	}
	handleServerTcpData(pkt, seg) {
		if (seg.app.kind === "http-request" && this.httpServer?.enabled && seg.dstPort === this.httpServer.port) this.sendL4(pkt.src, {
			kind: "tcp",
			srcPort: seg.dstPort,
			dstPort: seg.srcPort,
			syn: false,
			ack: true,
			rst: false,
			fin: false,
			app: {
				kind: "http-response",
				status: 200,
				reason: "OK",
				body: this.httpServer.body
			}
		}, { srcOverride: this.hasIp(pkt.dst) ? pkt.dst : void 0 });
	}
	notifySocket(ref, result) {
		if (ref.srcPort === null || ref.dstPort === null) return;
		const key = `${ref.srcPort}|${ref.dst}|${ref.dstPort}`;
		if (ref.proto === "tcp") this.tcpSessions.get(key)?.(result === "refused" ? { type: "refused" } : { type: "unreachable" });
		else this.udpSessions.get(key)?.(result);
	}
};
var Host = class extends IpDevice {
	kind = "host";
	constructor(network, id, name) {
		super(network, id, name);
		this.addInterfaces("eth", 1);
	}
};
var ServerDevice = class extends IpDevice {
	kind = "server";
	constructor(network, id, name) {
		super(network, id, name);
		this.addInterfaces("eth", 1);
	}
};
var RouterDevice = class extends IpDevice {
	kind = "router";
	constructor(network, id, name) {
		super(network, id, name);
		this.forwarding = true;
		this.addInterfaces("eth", 4);
	}
};
var FirewallDevice = class extends IpDevice {
	kind = "firewall";
	constructor(network, id, name) {
		super(network, id, name);
		this.forwarding = true;
		this.addInterfaces("eth", 4);
		this.fw.tables.filter = true;
		this.fw.declareFilter("input", "input", "accept");
		this.fw.declareFilter("forward", "forward", "accept");
		this.fw.declareFilter("output", "output", "accept");
	}
};
// src/engine/switch.ts
var SwitchDevice = class extends Device {
	kind;
	macTable = /* @__PURE__ */ new Map();
	vlans = /* @__PURE__ */ new Map();
	constructor(network, id, name, kind = "switch", ports = 8) {
		super(network, id, name);
		this.kind = kind;
		this.addInterfaces("eth", ports);
	}
	vlanOf(portName) {
		return this.vlans.get(portName) ?? 1;
	}
	receiveFrame(iface, frame) {
		const vlan = this.vlanOf(iface.name);
		this.macTable.set(`${vlan}|${frame.srcMac}`, iface);
		if (frame.dstMac === "ff:ff:ff:ff:ff:ff") {
			this.flood(vlan, iface, frame);
			return;
		}
		const out = this.macTable.get(`${vlan}|${frame.dstMac}`);
		if (out && this.vlanOf(out.name) === vlan) {
			if (out !== iface) out.send(frame);
		} else this.flood(vlan, iface, frame);
	}
	flood(vlan, except, frame) {
		for (const p of this.interfaces) if (p !== except && p.link && this.vlanOf(p.name) === vlan) p.send(frame);
	}
};
var ApDevice = class extends SwitchDevice {
	ssid = "netsim-wifi";
	constructor(network, id, name, ports = 8) {
		super(network, id, name, "ap", ports);
	}
};
// src/engine/factory.ts
function createDevice(net, kind, opts = {}) {
	const id = opts.id ?? net.allocId("dev-");
	const name = opts.name ?? net.allocName(kind);
	let d;
	if (kind === "host") d = new Host(net, id, name);
	else if (kind === "server") d = new ServerDevice(net, id, name);
	else if (kind === "router") d = new RouterDevice(net, id, name);
	else if (kind === "firewall") d = new FirewallDevice(net, id, name);
	else if (kind === "ap") d = new ApDevice(net, id, name);
	else d = new SwitchDevice(net, id, name);
	net.register(d);
	return d;
}
// src/engine/serialize.ts
function serializeNetwork(net, positions) {
	return {
		app: "netsim",
		version: 1,
		devices: [...net.devices.values()].map((d) => {
			const pos = positions[d.id] ?? {
				x: 0,
				y: 0
			};
			const ipd = d instanceof IpDevice ? d : null;
			const saved = {
				id: d.id,
				kind: d.kind,
				name: d.name,
				x: pos.x,
				y: pos.y,
				forwarding: ipd?.forwarding ?? false,
				ifaces: d.interfaces.map((i) => ({
					name: i.name,
					ip: i.ip ? cidrToString(i.ip.addr, i.ip.prefix) : null,
					up: i.up
				})),
				routes: (ipd?.staticRoutes ?? []).map((r) => ({
					dest: cidrToString(r.dest, r.prefix),
					via: r.via !== null ? ipToString(r.via) : null,
					dev: r.ifaceName
				}))
			};
			if (ipd) {
				if (ipd.services.tcp.size || ipd.services.udp.size) saved.services = {
					tcp: [...ipd.services.tcp],
					udp: [...ipd.services.udp]
				};
				const fwj = firewallToJSON(ipd.fw);
				if (fwj) saved.firewall = fwj;
				if (ipd.nameserver !== null) saved.nameserver = ipToString(ipd.nameserver);
				if (ipd.dhcpServer) saved.dhcpServer = {
					enabled: ipd.dhcpServer.enabled,
					rangeStart: ipToString(ipd.dhcpServer.rangeStart),
					rangeEnd: ipToString(ipd.dhcpServer.rangeEnd),
					router: ipd.dhcpServer.router !== null ? ipToString(ipd.dhcpServer.router) : null,
					dns: ipd.dhcpServer.dns !== null ? ipToString(ipd.dhcpServer.dns) : null
				};
				if (ipd.dnsServer) saved.dnsServer = {
					enabled: ipd.dnsServer.enabled,
					records: [...ipd.dnsServer.records.entries()].map(([n, a]) => [n, ipToString(a)])
				};
				if (ipd.httpServer) saved.httpServer = {
					enabled: ipd.httpServer.enabled,
					port: ipd.httpServer.port,
					body: ipd.httpServer.body
				};
				if (ipd.ripEnabled) saved.ripEnabled = true;
			}
			if (d instanceof SwitchDevice) {
				const vlans = {};
				for (const [port, vlan] of d.vlans) if (vlan !== 1) vlans[port] = vlan;
				if (Object.keys(vlans).length) saved.vlans = vlans;
				if (d instanceof ApDevice) saved.ssid = d.ssid;
			}
			return saved;
		}),
		links: [...net.links.values()].map((l) => ({
			id: l.id,
			a: [l.a.device.id, l.a.name],
			b: [l.b.device.id, l.b.name]
		}))
	};
}
function restoreNetwork(data) {
	if (data.app !== "netsim" || data.version !== 1) throw new Error("not a NetSim v1 topology file");
	const net = new Network();
	for (const sd of data.devices) {
		const d = createDevice(net, sd.kind, {
			id: sd.id,
			name: sd.name
		});
		for (const si of sd.ifaces) {
			const iface = d.getInterface(si.name);
			if (!iface) continue;
			iface.up = si.up;
			if (si.ip) {
				const cidr = parseCidr(si.ip);
				if (cidr) iface.ip = cidr;
			}
		}
		if (d instanceof IpDevice) {
			d.forwarding = sd.forwarding;
			if (sd.services) {
				d.services.tcp = new Set(sd.services.tcp);
				d.services.udp = new Set(sd.services.udp);
			}
			if (sd.firewall) firewallFromJSON(d.fw, sd.firewall);
			if (sd.nameserver) d.nameserver = parseIp(sd.nameserver);
			if (sd.dhcpServer) {
				const start = parseIp(sd.dhcpServer.rangeStart);
				const end = parseIp(sd.dhcpServer.rangeEnd);
				if (start !== null && end !== null) d.dhcpServer = {
					enabled: sd.dhcpServer.enabled,
					rangeStart: start,
					rangeEnd: end,
					router: sd.dhcpServer.router !== null ? parseIp(sd.dhcpServer.router) : null,
					dns: sd.dhcpServer.dns !== null ? parseIp(sd.dhcpServer.dns) : null,
					leases: /* @__PURE__ */ new Map()
				};
			}
			if (sd.dnsServer) {
				const records = /* @__PURE__ */ new Map();
				for (const [name, addr] of sd.dnsServer.records) {
					const ip = parseIp(addr);
					if (ip !== null) records.set(name.toLowerCase(), ip);
				}
				d.dnsServer = {
					enabled: sd.dnsServer.enabled,
					records
				};
			}
			if (sd.httpServer) d.httpServer = { ...sd.httpServer };
			for (const sr of sd.routes) {
				const dest = parseCidr(sr.dest);
				const via = sr.via !== null ? parseIp(sr.via) : null;
				if (!dest || !d.getInterface(sr.dev)) continue;
				d.staticRoutes.push({
					dest: networkOf(dest.addr, dest.prefix),
					prefix: dest.prefix,
					via,
					ifaceName: sr.dev,
					kind: "static"
				});
			}
		}
		if (d instanceof SwitchDevice) {
			if (sd.vlans) for (const [port, vlan] of Object.entries(sd.vlans)) d.vlans.set(port, vlan);
			if (d instanceof ApDevice && sd.ssid) d.ssid = sd.ssid;
		}
	}
	for (const sl of data.links) try {
		net.connect(sl.a[0], sl.b[0], {
			id: sl.id,
			aIface: sl.a[1],
			bIface: sl.b[1]
		});
	} catch {}
	for (const sd of data.devices) {
		if (!sd.ripEnabled) continue;
		const d = net.devices.get(sd.id);
		if (d instanceof IpDevice) d.enableRip(true);
	}
	return net;
}
// src/labs/checker.ts
var PING_TIMEOUT_MS = 3500;
var TCP_TIMEOUT_MS = 3e3;
var HTTP_TIMEOUT_MS = 4e3;
function findDevice(net, name) {
	for (const d of net.devices.values()) if (d.name === name && d instanceof IpDevice) return d;
	return null;
}
function targetAddr(net, toDevice, toAddr) {
	if (toAddr) return parseIp(toAddr);
	if (toDevice) return (findDevice(net, toDevice)?.interfaces.find((i) => i.ip))?.ip?.addr ?? null;
	return null;
}
function runOne(net, check, done) {
	switch (check.type) {
		case "iface-ip": {
			const d = findDevice(net, check.device);
			const iface = d?.getInterface(check.iface);
			if (!d || !iface) return done(false, `no device/interface ${check.device}/${check.iface}`);
			if (!iface.ip) return done(false, `${check.iface} has no address yet`);
			const got = cidrToString(iface.ip.addr, iface.ip.prefix);
			if (check.cidr) return done(got === check.cidr, `${check.iface} is ${got}`);
			if (check.inSubnet) {
				const net_ = parseCidr(check.inSubnet);
				if (!net_) return done(false, "bad subnet in lab definition");
				return done(networkOf(iface.ip.addr, net_.prefix) === networkOf(net_.addr, net_.prefix) && iface.ip.prefix === net_.prefix, `${check.iface} is ${got}`);
			}
			return done(true, `${check.iface} is ${got}`);
		}
		case "default-route": {
			const d = findDevice(net, check.device);
			if (!d) return done(false, `no device ${check.device}`);
			const def = d.routes().find((r) => r.prefix === 0);
			if (!def) return done(false, "no default route");
			if (check.via) {
				const via = parseIp(check.via);
				return done(def.via === via, `default via ${def.via !== null ? ipToString(def.via) : "(direct)"}`);
			}
			return done(true, "default route present");
		}
		case "forwarding": {
			const d = findDevice(net, check.device);
			if (!d) return done(false, `no device ${check.device}`);
			return done(d.forwarding === check.expect, `ip_forward = ${d.forwarding ? 1 : 0}`);
		}
		case "fw-policy": {
			const d = findDevice(net, check.device);
			if (!d) return done(false, `no device ${check.device}`);
			const chain = d.fw.filter[check.hook];
			if (!chain.declared) return done(false, `${check.hook} chain not declared`);
			return done(chain.policy === check.policy, `${check.hook} policy is ${chain.policy}`);
		}
		case "ping": {
			const from = findDevice(net, check.from);
			if (!from) return done(false, `no device ${check.from}`);
			const target = targetAddr(net, check.toDevice, check.toAddr);
			if (target === null) return done(false, "target has no address");
			const wantSuccess = check.expect === "success";
			const id = from.allocIcmpId();
			let finished = false;
			const finish = (gotReply, note) => {
				if (finished) return;
				finished = true;
				from.offIcmp(id);
				done(gotReply === wantSuccess, note);
			};
			from.onIcmp(id, (ev) => {
				if (ev.type === "reply") finish(true, `reply from ${ipToString(ev.from)}`);
				else if (ev.type === "unreachable") finish(false, `unreachable (from ${ipToString(ev.from)})`);
				else if (ev.type === "send-error") finish(false, ev.message);
			});
			const err = from.sendEcho(target, id, 1);
			if (err) return finish(false, err);
			net.scheduler.schedule(PING_TIMEOUT_MS, () => finish(false, "no reply (timed out)"));
			return;
		}
		case "tcp": {
			const from = findDevice(net, check.from);
			if (!from) return done(false, `no device ${check.from}`);
			const target = targetAddr(net, check.toDevice, check.toAddr);
			if (target === null) return done(false, "target has no address");
			const err = from.connectTcp(target, check.port, TCP_TIMEOUT_MS, (r) => {
				const observed = r === "open" ? "open" : r === "refused" ? "refused" : "filtered";
				done(observed === check.expect, `port ${check.port} is ${observed}`);
			});
			if (err) done(check.expect === "filtered", err);
			return;
		}
		case "dns": {
			const from = findDevice(net, check.from);
			if (!from) return done(false, `no device ${check.from}`);
			if (from.nameserver === null) return done(false, "no nameserver configured");
			from.resolveDns(check.name, from.nameserver, (r) => {
				if (typeof r === "number") {
					if (check.expect !== "resolves") return done(false, `resolved to ${ipToString(r)}`);
					if (check.addr) return done(ipToString(r) === check.addr, `resolved to ${ipToString(r)}`);
					return done(true, `resolved to ${ipToString(r)}`);
				}
				if (r === null) return done(check.expect === "nxdomain", "NXDOMAIN");
				return done(false, `lookup failed (${r})`);
			});
			return;
		}
		case "http": {
			const from = findDevice(net, check.from);
			if (!from) return done(false, `no device ${check.from}`);
			let rest = check.url.startsWith("http://") ? check.url.slice(7) : check.url;
			const slash = rest.indexOf("/");
			const hostPort = slash < 0 ? rest : rest.slice(0, slash);
			const path = slash < 0 ? "/" : rest.slice(slash);
			const colon = hostPort.indexOf(":");
			const host = colon < 0 ? hostPort : hostPort.slice(0, colon);
			const port = colon < 0 ? 80 : Number(hostPort.slice(colon + 1));
			const wantOk = check.expect === "ok";
			const withIp = (ip) => {
				const err = from.httpGet(ip, port, path, host, HTTP_TIMEOUT_MS, (r) => {
					if (r.ok) {
						if (!wantOk) return done(false, `got HTTP ${r.status}`);
						if (check.contains && !r.body.includes(check.contains)) return done(false, "page is missing the expected content");
						return done(true, `HTTP ${r.status} ${r.reason}`);
					}
					return done(!wantOk, `fetch failed (${r.error})`);
				});
				if (err) done(!wantOk, err);
			};
			const literal = parseIp(host);
			if (literal !== null) return withIp(literal);
			if (from.nameserver === null) return done(!wantOk, "cannot resolve host (no nameserver)");
			from.resolveDns(host, from.nameserver, (r) => {
				if (typeof r === "number") withIp(r);
				else done(!wantOk, `cannot resolve ${host}`);
			});
			return;
		}
	}
}
function runChecks(net, objectives, onResult, onDone) {
	let i = 0;
	const next = () => {
		if (i >= objectives.length) {
			onDone();
			return;
		}
		const obj = objectives[i++];
		runOne(net, obj.check, (pass, detail) => {
			onResult({
				id: obj.id,
				pass,
				detail
			});
			net.scheduler.schedule(150, next);
		});
	};
	next();
}
// src/labs/library.ts
function dev$1(kind, name, x, y, extra = {}) {
	return {
		id: name,
		kind,
		name,
		x,
		y,
		forwarding: kind === "router" || kind === "firewall",
		ifaces: [],
		routes: [],
		...extra
	};
}
function link$1(a, ai, b, bi) {
	return {
		id: `${a}.${ai}-${b}.${bi}`,
		a: [a, ai],
		b: [b, bi]
	};
}
var LABS = [
	{
		app: "netsim",
		version: 1,
		devices: [
			dev$1("host", "pc1", 80, 140),
			dev$1("host", "pc2", 80, 320),
			dev$1("switch", "sw1", 330, 230)
		],
		links: [link$1("pc1", "eth0", "sw1", "eth0"), link$1("pc2", "eth0", "sw1", "eth1")],
		lab: {
			id: "static-addressing",
			title: "Lab 1 — Static addressing & ARP",
			blurb: "Give two hosts addresses, make them talk, and watch ARP do its work.",
			steps: [{
				title: "Assign addresses",
				body: "pc1 and pc2 share a switch but have no IP addresses yet. Open each terminal (double-click the device) and assign one address per host from 192.168.1.0/24, e.g. `ip addr add 192.168.1.10/24 dev eth0` on pc1 and `.20` on pc2. Check your work with `ip addr`.",
				objectives: [{
					id: "l1-ip1",
					label: "pc1 has an address in 192.168.1.0/24",
					check: {
						type: "iface-ip",
						device: "pc1",
						iface: "eth0",
						inSubnet: "192.168.1.0/24"
					}
				}, {
					id: "l1-ip2",
					label: "pc2 has an address in 192.168.1.0/24",
					check: {
						type: "iface-ip",
						device: "pc2",
						iface: "eth0",
						inSubnet: "192.168.1.0/24"
					}
				}]
			}, {
				title: "Reachability & ARP",
				body: "From pc1, `ping -c 3 <pc2 address>`. The first reply is slower than the rest — watch the amber packets: that is ARP resolving the MAC address before ICMP can travel. Inspect the result with `ip neigh` and the switch’s MAC table (click sw1).",
				objectives: [{
					id: "l1-ping",
					label: "pc1 can ping pc2",
					check: {
						type: "ping",
						from: "pc1",
						toDevice: "pc2",
						expect: "success"
					}
				}, {
					id: "l1-ping2",
					label: "pc2 can ping pc1",
					check: {
						type: "ping",
						from: "pc2",
						toDevice: "pc1",
						expect: "success"
					}
				}],
				quiz: [{
					q: "Which protocol discovers the MAC address that belongs to an IP address?",
					options: [
						"DHCP",
						"ARP",
						"DNS",
						"ICMP"
					],
					answer: 1
				}, {
					q: "Why was the first ping slower than the others?",
					options: [
						"The switch was still booting",
						"ARP resolution had to happen before the first ICMP packet could be delivered",
						"The first packet is always sent twice",
						"DNS lookup delayed it"
					],
					answer: 1
				}]
			}]
		}
	},
	{
		app: "netsim",
		version: 1,
		devices: [
			dev$1("host", "pc1", 70, 220, { ifaces: [{
				name: "eth0",
				ip: "192.168.1.10/24",
				up: true
			}] }),
			dev$1("router", "r1", 330, 220),
			dev$1("host", "pc2", 590, 220, { ifaces: [{
				name: "eth0",
				ip: "10.0.0.20/24",
				up: true
			}] })
		],
		links: [link$1("pc1", "eth0", "r1", "eth0"), link$1("r1", "eth1", "pc2", "eth0")],
		lab: {
			id: "static-routing",
			title: "Lab 2 — Routing between networks",
			blurb: "Two subnets, one router: configure the gateway and the routes that cross it.",
			steps: [{
				title: "Configure the router",
				body: "pc1 (192.168.1.10/24) and pc2 (10.0.0.20/24) live in different networks, joined by r1. Give r1 an address on each side: `ip addr add 192.168.1.1/24 dev eth0` and `ip addr add 10.0.0.1/24 dev eth1`. Confirm with `ip addr` and try `ping 192.168.1.1` from pc1.",
				objectives: [{
					id: "l2-r-eth0",
					label: "r1 eth0 has an address in 192.168.1.0/24",
					check: {
						type: "iface-ip",
						device: "r1",
						iface: "eth0",
						inSubnet: "192.168.1.0/24"
					}
				}, {
					id: "l2-r-eth1",
					label: "r1 eth1 has an address in 10.0.0.0/24",
					check: {
						type: "iface-ip",
						device: "r1",
						iface: "eth1",
						inSubnet: "10.0.0.0/24"
					}
				}]
			}, {
				title: "Default routes",
				body: "The hosts still don’t know where \"everywhere else\" is. On each host add a default route via its side of the router: `ip route add default via 192.168.1.1` (pc1) and `ip route add default via 10.0.0.1` (pc2). Then `ping` across and run `traceroute <pc2 address>` — note the router hop, and that replies come back with ttl=63.",
				objectives: [
					{
						id: "l2-def1",
						label: "pc1 has a default route via 192.168.1.1",
						check: {
							type: "default-route",
							device: "pc1",
							via: "192.168.1.1"
						}
					},
					{
						id: "l2-def2",
						label: "pc2 has a default route via 10.0.0.1",
						check: {
							type: "default-route",
							device: "pc2",
							via: "10.0.0.1"
						}
					},
					{
						id: "l2-ping",
						label: "pc1 can reach pc2 across the router",
						check: {
							type: "ping",
							from: "pc1",
							toDevice: "pc2",
							expect: "success"
						}
					}
				],
				quiz: [{
					q: "What does a router do to the TTL field of every packet it forwards?",
					options: [
						"Nothing — TTL only changes at the destination",
						"Sets it back to 64",
						"Decrements it by 1, discarding the packet (and sending ICMP time-exceeded) at 0",
						"Doubles it"
					],
					answer: 2
				}]
			}]
		}
	},
	{
		app: "netsim",
		version: 1,
		devices: [
			dev$1("host", "pc1", 70, 220, {
				ifaces: [{
					name: "eth0",
					ip: "192.168.1.10/24",
					up: true
				}],
				routes: [{
					dest: "0.0.0.0/0",
					via: "192.168.1.1",
					dev: "eth0"
				}]
			}),
			dev$1("firewall", "fw1", 330, 220, { ifaces: [{
				name: "eth0",
				ip: "192.168.1.1/24",
				up: true
			}, {
				name: "eth1",
				ip: "203.0.113.1/24",
				up: true
			}] }),
			dev$1("server", "srv1", 590, 220, {
				ifaces: [{
					name: "eth0",
					ip: "203.0.113.80/24",
					up: true
				}],
				routes: [{
					dest: "0.0.0.0/0",
					via: "203.0.113.1",
					dev: "eth0"
				}],
				services: {
					tcp: [22],
					udp: []
				},
				httpServer: {
					enabled: true,
					port: 80,
					body: "<h1>public web server</h1>"
				}
			})
		],
		links: [link$1("pc1", "eth0", "fw1", "eth0"), link$1("fw1", "eth1", "srv1", "eth0")],
		lab: {
			id: "stateful-firewall",
			title: "Lab 3 — Build a stateful firewall",
			blurb: "Default-deny the WAN, keep the LAN working — the classic conntrack ruleset.",
			steps: [
				{
					title: "Look around (everything is open)",
					body: "pc1 is your LAN machine; srv1 plays \"the internet\" (it runs a web server and sshd). Right now fw1 forwards everything: from pc1 try `ping 203.0.113.80`, `curl http://203.0.113.80/` and `nc -z 203.0.113.80 22`. Now the uncomfortable part: from srv1, `ping 192.168.1.10` also works. The internet can reach your LAN.",
					objectives: [{
						id: "l3-web",
						label: "pc1 can fetch the web page (tcp/80 open)",
						check: {
							type: "tcp",
							from: "pc1",
							toDevice: "srv1",
							port: 80,
							expect: "open"
						}
					}, {
						id: "l3-open",
						label: "srv1 can (for now) ping pc1 — verify the problem exists",
						check: {
							type: "ping",
							from: "srv1",
							toDevice: "pc1",
							expect: "success"
						}
					}]
				},
				{
					title: "Default deny",
					body: "On fw1 flip the FORWARD chain to default-deny: `iptables -P FORWARD DROP` (or `nft` — check `nft list ruleset` to see both dialects agree). Test again from pc1: everything is dead, and the firewall log in the inspector names the policy that killed each packet.",
					objectives: [{
						id: "l3-policy",
						label: "fw1 FORWARD policy is drop",
						check: {
							type: "fw-policy",
							device: "fw1",
							hook: "forward",
							policy: "drop"
						}
					}, {
						id: "l3-dead",
						label: "nothing crosses: pc1 can no longer ping srv1",
						check: {
							type: "ping",
							from: "pc1",
							toDevice: "srv1",
							expect: "fail"
						}
					}]
				},
				{
					title: "Allow outbound, keep state",
					body: "Now allow exactly two things on fw1: reply traffic, and new connections from the LAN:\n`iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`\n`iptables -A FORWARD -s 192.168.1.0/24 -m conntrack --ctstate NEW -j ACCEPT`\npc1 gets the whole internet back; the internet gets nothing. Verify with `conntrack -L` on fw1.",
					objectives: [
						{
							id: "l3-out",
							label: "pc1 can ping srv1 again",
							check: {
								type: "ping",
								from: "pc1",
								toDevice: "srv1",
								expect: "success"
							}
						},
						{
							id: "l3-web2",
							label: "pc1 can still reach the web server",
							check: {
								type: "tcp",
								from: "pc1",
								toDevice: "srv1",
								port: 80,
								expect: "open"
							}
						},
						{
							id: "l3-blocked",
							label: "srv1 can no longer ping pc1",
							check: {
								type: "ping",
								from: "srv1",
								toDevice: "pc1",
								expect: "fail"
							}
						},
						{
							id: "l3-filtered",
							label: "inbound connections from srv1 are silently filtered",
							check: {
								type: "tcp",
								from: "srv1",
								toDevice: "pc1",
								port: 22,
								expect: "filtered"
							}
						}
					],
					quiz: [{
						q: "pc1 pings srv1 and the reply gets back through a default-deny FORWARD chain. Why?",
						options: [
							"ICMP is never filtered",
							"Conntrack marked the flow ESTABLISHED when the reply matched the outbound request, so the first rule accepted it",
							"The reply uses the OUTPUT chain instead",
							"Replies are broadcast"
						],
						answer: 1
					}, {
						q: "What does the sender see when a packet is DROPped, compared to REJECTed?",
						options: [
							"DROP: connection refused; REJECT: timeout",
							"Both look identical",
							"DROP: silence (timeout); REJECT: an ICMP error comes back immediately",
							"Both return ICMP errors"
						],
						answer: 2
					}]
				}
			]
		}
	},
	{
		app: "netsim",
		version: 1,
		devices: [
			dev$1("host", "pc1", 60, 120, {
				ifaces: [{
					name: "eth0",
					ip: "192.168.1.10/24",
					up: true
				}],
				routes: [{
					dest: "0.0.0.0/0",
					via: "192.168.1.1",
					dev: "eth0"
				}],
				nameserver: "10.0.0.20"
			}),
			dev$1("host", "pc2", 60, 320),
			dev$1("switch", "sw1", 290, 220),
			dev$1("router", "r1", 510, 220, {
				ifaces: [{
					name: "eth0",
					ip: "192.168.1.1/24",
					up: true
				}, {
					name: "eth1",
					ip: "10.0.0.1/24",
					up: true
				}],
				dhcpServer: {
					enabled: true,
					rangeStart: "192.168.1.100",
					rangeEnd: "192.168.1.150",
					router: "192.168.1.1",
					dns: "10.0.0.20"
				}
			}),
			dev$1("server", "srv1", 730, 220, {
				ifaces: [{
					name: "eth0",
					ip: "10.0.0.20/24",
					up: true
				}],
				routes: [{
					dest: "0.0.0.0/0",
					via: "10.0.0.1",
					dev: "eth0"
				}],
				dnsServer: {
					enabled: true,
					records: [["web.lan", "10.0.0.20"], ["pc1.lan", "192.168.1.10"]]
				},
				httpServer: {
					enabled: true,
					port: 80,
					body: "<h1>It works!</h1>"
				}
			})
		],
		links: [
			link$1("pc1", "eth0", "sw1", "eth0"),
			link$1("pc2", "eth0", "sw1", "eth1"),
			link$1("sw1", "eth2", "r1", "eth0"),
			link$1("r1", "eth1", "srv1", "eth0")
		],
		lab: {
			id: "network-services",
			title: "Lab 4 — DHCP, DNS & the web",
			blurb: "Plug in a blank machine and follow it all the way to a working web page.",
			steps: [{
				title: "Get an address (DHCP)",
				body: "pc2 has no configuration at all. On pc2 run `dhclient eth0` and watch the four broadcast packets: DISCOVER, OFFER, REQUEST, ACK (r1 is the DHCP server — see its lease table in the inspector). Then check what arrived: `ip addr`, `ip route`.",
				objectives: [{
					id: "l4-ip",
					label: "pc2 got an address in 192.168.1.0/24",
					check: {
						type: "iface-ip",
						device: "pc2",
						iface: "eth0",
						inSubnet: "192.168.1.0/24"
					}
				}, {
					id: "l4-route",
					label: "pc2 got a default route via 192.168.1.1",
					check: {
						type: "default-route",
						device: "pc2",
						via: "192.168.1.1"
					}
				}]
			}, {
				title: "Names and pages (DNS + HTTP)",
				body: "DHCP also delivered a nameserver (srv1). On pc2 try `dig web.lan`, then `curl -v http://web.lan/` and read the whole exchange: the purple DNS query, the green TCP handshake, the request and the 200 response.",
				objectives: [{
					id: "l4-dns",
					label: "pc2 resolves web.lan to 10.0.0.20",
					check: {
						type: "dns",
						from: "pc2",
						name: "web.lan",
						expect: "resolves",
						addr: "10.0.0.20"
					}
				}, {
					id: "l4-http",
					label: "pc2 can fetch http://web.lan/",
					check: {
						type: "http",
						from: "pc2",
						url: "http://web.lan/",
						expect: "ok",
						contains: "It works"
					}
				}],
				quiz: [{
					q: "Which packet starts the DHCP exchange, and how is it addressed?",
					options: [
						"DHCPOFFER, unicast to the client",
						"DHCPDISCOVER, broadcast to 255.255.255.255 — the client has no address yet",
						"DHCPACK, broadcast",
						"ARP request for the server"
					],
					answer: 1
				}, {
					q: "dig web.lan works but curl http://web.lan/ hangs. Which is the most likely culprit?",
					options: [
						"DNS is broken",
						"The default route is missing",
						"Something is dropping tcp/80 between pc2 and the server",
						"ARP failed"
					],
					answer: 2
				}]
			}]
		}
	},
	{
		app: "netsim",
		version: 1,
		devices: [
			dev$1("host", "pc1", 60, 120, {
				ifaces: [{
					name: "eth0",
					ip: "192.168.1.10/24",
					up: true
				}],
				routes: [{
					dest: "0.0.0.0/0",
					via: "192.168.1.1",
					dev: "eth0"
				}]
			}),
			dev$1("server", "srv1", 60, 320, {
				ifaces: [{
					name: "eth0",
					ip: "192.168.1.20/24",
					up: true
				}],
				routes: [{
					dest: "0.0.0.0/0",
					via: "192.168.1.1",
					dev: "eth0"
				}],
				services: {
					tcp: [22],
					udp: []
				},
				httpServer: {
					enabled: true,
					port: 80,
					body: "<h1>company web</h1>"
				}
			}),
			dev$1("switch", "sw1", 280, 220),
			dev$1("firewall", "fw1", 500, 220, { ifaces: [{
				name: "eth0",
				ip: "192.168.1.1/24",
				up: true
			}, {
				name: "eth1",
				ip: "203.0.113.1/24",
				up: true
			}] }),
			dev$1("host", "inet1", 720, 220, {
				ifaces: [{
					name: "eth0",
					ip: "203.0.113.66/24",
					up: true
				}],
				routes: [{
					dest: "0.0.0.0/0",
					via: "203.0.113.1",
					dev: "eth0"
				}]
			})
		],
		links: [
			link$1("pc1", "eth0", "sw1", "eth0"),
			link$1("srv1", "eth0", "sw1", "eth1"),
			link$1("sw1", "eth2", "fw1", "eth0"),
			link$1("fw1", "eth1", "inet1", "eth0")
		],
		lab: {
			id: "harden-network",
			title: "Lab 5 — Harden a vulnerable network",
			blurb: "You inherit an open network. Audit the exposure, then lock it down without breaking the business.",
			steps: [{
				title: "Audit the exposure",
				body: "fw1 sits between the company (pc1, srv1) and the internet (inet1) — but it forwards everything. Play attacker from inet1: `ping 192.168.1.10`, `nc -z -w 2 192.168.1.20 22`, `nc -z -w 2 192.168.1.20 80`. All of it works. The objectives below *confirm* the vulnerabilities — they should all pass before you fix anything.",
				objectives: [{
					id: "l5-audit-ping",
					label: "Confirmed: the internet can ping the workstation (bad!)",
					check: {
						type: "ping",
						from: "inet1",
						toDevice: "pc1",
						expect: "success"
					}
				}, {
					id: "l5-audit-ssh",
					label: "Confirmed: SSH on srv1 is open to the internet (bad!)",
					check: {
						type: "tcp",
						from: "inet1",
						toDevice: "srv1",
						port: 22,
						expect: "open"
					}
				}],
				quiz: [{
					q: "Which of these is NOT one of this network’s design problems?",
					options: [
						"The firewall forwards everything by default",
						"The server sits on the same segment as the workstations",
						"Management services (SSH) are reachable from the internet",
						"The workstation uses a private RFC1918 address"
					],
					answer: 3
				}]
			}, {
				title: "Harden the perimeter",
				body: "Business requirements: the web site must stay reachable from the internet; staff must still be able to reach out; everything else inbound dies. On fw1:\n`iptables -P FORWARD DROP`\n`iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`\n`iptables -A FORWARD -s 192.168.1.0/24 -m conntrack --ctstate NEW -j ACCEPT`\n`iptables -A FORWARD -d 192.168.1.20 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT`\nRe-run your attacks from inet1 and read fw1’s firewall log: every drop names the rule that killed it.",
				objectives: [
					{
						id: "l5-policy",
						label: "FORWARD policy is drop (default deny)",
						check: {
							type: "fw-policy",
							device: "fw1",
							hook: "forward",
							policy: "drop"
						}
					},
					{
						id: "l5-web",
						label: "The public web site still works from the internet",
						check: {
							type: "tcp",
							from: "inet1",
							toDevice: "srv1",
							port: 80,
							expect: "open"
						}
					},
					{
						id: "l5-ssh",
						label: "SSH is now silently filtered from the internet",
						check: {
							type: "tcp",
							from: "inet1",
							toDevice: "srv1",
							port: 22,
							expect: "filtered"
						}
					},
					{
						id: "l5-ping",
						label: "The internet can no longer ping the workstation",
						check: {
							type: "ping",
							from: "inet1",
							toDevice: "pc1",
							expect: "fail"
						}
					},
					{
						id: "l5-out",
						label: "Staff can still reach the internet (stateful return traffic)",
						check: {
							type: "ping",
							from: "pc1",
							toDevice: "inet1",
							expect: "success"
						}
					}
				],
				quiz: [{
					q: "SSH shows as \"filtered\" rather than \"refused\" to the attacker. Why is that usually preferable?",
					options: [
						"It is faster for the attacker",
						"A silent drop reveals nothing — a refusal confirms a live host and a real, reachable port",
						"REJECT would crash the firewall",
						"It is not preferable; they are identical"
					],
					answer: 1
				}, {
					q: "What further improvement would most reduce the blast radius if srv1 were compromised?",
					options: [
						"A stronger root password on srv1",
						"Moving srv1 to its own DMZ segment so it cannot reach the workstations directly",
						"Changing SSH to port 2222",
						"Enabling RIP on fw1"
					],
					answer: 1
				}]
			}]
		}
	}
];
// src/labs/examples.ts
function dev(kind, name, x, y, extra = {}) {
	return {
		id: name,
		kind,
		name,
		x,
		y,
		forwarding: kind === "router" || kind === "firewall",
		ifaces: [],
		routes: [],
		...extra
	};
}
function link(a, ai, b, bi) {
	return {
		id: `${a}.${ai}-${b}.${bi}`,
		a: [a, ai],
		b: [b, bi]
	};
}
var goodNetwork = {
	app: "netsim",
	version: 1,
	devices: [
		dev("host", "pc1", 60, 120, {
			ifaces: [{
				name: "eth0",
				ip: "192.168.1.10/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "192.168.1.1",
				dev: "eth0"
			}],
			nameserver: "10.10.10.80"
		}),
		dev("host", "pc2", 60, 320, {
			ifaces: [{
				name: "eth0",
				ip: "192.168.1.11/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "192.168.1.1",
				dev: "eth0"
			}],
			nameserver: "10.10.10.80"
		}),
		dev("switch", "sw1", 280, 220),
		dev("firewall", "fw1", 500, 220, {
			ifaces: [
				{
					name: "eth0",
					ip: "192.168.1.1/24",
					up: true
				},
				{
					name: "eth1",
					ip: "203.0.113.1/24",
					up: true
				},
				{
					name: "eth2",
					ip: "10.10.10.1/24",
					up: true
				}
			],
			firewall: {
				tables: {
					filter: true,
					nat: true
				},
				filter: {
					input: {
						name: "input",
						policy: "accept",
						rules: []
					},
					forward: {
						name: "forward",
						policy: "drop",
						rules: [
							{
								match: { ct: ["established", "related"] },
								verdict: "accept"
							},
							{
								match: {
									src: "192.168.1.0/24",
									ct: ["new"]
								},
								verdict: "accept"
							},
							{
								match: {
									dst: "10.10.10.80/32",
									proto: "tcp",
									dport: [80, 80],
									ct: ["new"]
								},
								verdict: "accept"
							}
						]
					},
					output: {
						name: "output",
						policy: "accept",
						rules: []
					}
				},
				nat: {
					prerouting: {
						name: "prerouting",
						rules: [{
							match: {
								iif: "eth1",
								proto: "tcp",
								dport: [80, 80]
							},
							action: {
								type: "dnat",
								addr: "10.10.10.80"
							}
						}]
					},
					postrouting: {
						name: "postrouting",
						rules: [{
							match: { oif: "eth1" },
							action: { type: "masquerade" }
						}]
					}
				}
			}
		}),
		dev("server", "srv1", 720, 340, {
			ifaces: [{
				name: "eth0",
				ip: "10.10.10.80/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "10.10.10.1",
				dev: "eth0"
			}],
			dnsServer: {
				enabled: true,
				records: [["web.corp", "10.10.10.80"]]
			},
			httpServer: {
				enabled: true,
				port: 80,
				body: "<h1>Corporate web — served from the DMZ</h1>"
			}
		}),
		dev("host", "inet1", 720, 100, {
			ifaces: [{
				name: "eth0",
				ip: "203.0.113.66/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "203.0.113.1",
				dev: "eth0"
			}]
		})
	],
	links: [
		link("pc1", "eth0", "sw1", "eth0"),
		link("pc2", "eth0", "sw1", "eth1"),
		link("sw1", "eth2", "fw1", "eth0"),
		link("fw1", "eth1", "inet1", "eth0"),
		link("fw1", "eth2", "srv1", "eth0")
	]
};
var badNetwork = {
	app: "netsim",
	version: 1,
	devices: [
		dev("host", "pc1", 60, 120, {
			ifaces: [{
				name: "eth0",
				ip: "192.168.1.10/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "192.168.1.1",
				dev: "eth0"
			}]
		}),
		dev("host", "pc2", 60, 320, {
			ifaces: [{
				name: "eth0",
				ip: "192.168.1.11/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "192.168.1.1",
				dev: "eth0"
			}]
		}),
		dev("server", "srv1", 280, 400, {
			ifaces: [{
				name: "eth0",
				ip: "192.168.1.20/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "192.168.1.1",
				dev: "eth0"
			}],
			services: {
				tcp: [22, 23],
				udp: []
			},
			httpServer: {
				enabled: true,
				port: 80,
				body: "<h1>intranet — also visible to the whole internet</h1>"
			}
		}),
		dev("switch", "sw1", 280, 220),
		dev("router", "r1", 500, 220, { ifaces: [{
			name: "eth0",
			ip: "192.168.1.1/24",
			up: true
		}, {
			name: "eth1",
			ip: "203.0.113.1/24",
			up: true
		}] }),
		dev("host", "inet1", 720, 220, {
			ifaces: [{
				name: "eth0",
				ip: "203.0.113.66/24",
				up: true
			}],
			routes: [{
				dest: "0.0.0.0/0",
				via: "203.0.113.1",
				dev: "eth0"
			}]
		})
	],
	links: [
		link("pc1", "eth0", "sw1", "eth0"),
		link("pc2", "eth0", "sw1", "eth1"),
		link("srv1", "eth0", "sw1", "eth2"),
		link("sw1", "eth3", "r1", "eth0"),
		link("r1", "eth1", "inet1", "eth0")
	]
};
var EXAMPLES = [{
	title: "Example — segmented network (good practice)",
	blurb: "LAN + DMZ behind a stateful firewall, masquerade out, only tcp/80 published in.",
	file: goodNetwork
}, {
	title: "Example — flat open network (what not to do)",
	blurb: "Everything on one segment, no rules, telnet to the world. Count the problems.",
	file: badNetwork
}];
export { networkOf as _, serializeNetwork as a, Network as b, SwitchDevice as c, iptablesListing as d, iptablesSave as f, ipToString as g, cidrToString as h, restoreNetwork as i, IpDevice as l, natRuleText as m, LABS as n, createDevice as o, listRuleset as p, runChecks as r, ApDevice as s, EXAMPLES as t, filterRuleText as u, parseCidr as v, parseIp as y };
