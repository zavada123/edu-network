import { A as Network, C as listRuleset, D as networkOf, E as ipToString, O as parseCidr, S as iptablesSave, T as cidrToString, _ as ApDevice, b as filterRuleText, c as startNetwork, d as EXAMPLES, f as LABS, g as createDevice, h as serializeNetwork, i as parseNetwork, k as parseIp, l as explainFailure, m as restoreNetwork, p as runChecks, u as KIDS_LABS, v as SwitchDevice, w as natRuleText, x as iptablesListing, y as IpDevice } from "./scenarios-D2y6td2v.js";
import { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { Background, BaseEdge, ConnectionMode, Controls, Handle, MiniMap, Position, ReactFlow, ReactFlowProvider, applyEdgeChanges, applyNodeChanges, getStraightPath, useInternalNode, useReactFlow, useViewport } from "@xyflow/react";
import { create } from "zustand";
import LZString from "lz-string";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { strToU8, zipSync } from "fflate";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
// src/commands/ip-cmd.ts
var UNSUPPORTED_HINT = "Supported (phase 1): ip address [add|del], ip link [set], ip route [add|del], ip neigh\nNetSim never fakes syntax it does not implement.\n";
function expandObject(word) {
	for (const o of [
		"address",
		"link",
		"route",
		"neighbour"
	]) if (o.startsWith(word) && word.length > 0) return o;
	return null;
}
function runIp(device, args, out) {
	switch (expandObject(args[0] ?? "")) {
		case "address":
			ipAddress(device, args.slice(1), out);
			return;
		case "link":
			ipLink(device, args.slice(1), out);
			return;
		case "route":
			ipRoute(device, args.slice(1), out);
			return;
		case "neighbour":
			out(formatNeigh(device));
			return;
		default: out(`netsim: "ip ${args.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
	}
}
function ipAddress(device, a, out) {
	const sub = a[0] ?? "show";
	if (sub === "show" || sub === "s") {
		out(formatAddresses(device));
		return;
	}
	if (sub === "add" || sub === "del" || sub === "delete") {
		const cidr = parseCidr(a[1] ?? "");
		if (!cidr) {
			out(`Error: inet prefix is expected rather than "${a[1] ?? ""}".\n`);
			return;
		}
		if (a[2] !== "dev" || !a[3]) {
			out("Error: Not enough information: \"dev\" argument is required.\n");
			return;
		}
		const err = sub === "add" ? device.addIp(a[3], cidr.addr, cidr.prefix) : device.delIp(a[3], cidr.addr, cidr.prefix);
		if (err) out(err + "\n");
		return;
	}
	out(`netsim: "ip address ${a.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
}
function ipLink(device, a, out) {
	const sub = a[0] ?? "show";
	if (sub === "show" || sub === "s") {
		out(formatAddresses(device, { linkOnly: true }));
		return;
	}
	if (sub === "set") {
		let rest = a.slice(1);
		if (rest[0] === "dev") rest = rest.slice(1);
		const iface = device.getInterface(rest[0] ?? "");
		if (!iface) {
			out(`Cannot find device "${rest[0] ?? ""}"\n`);
			return;
		}
		if (rest[1] === "up") iface.up = true;
		else if (rest[1] === "down") iface.up = false;
		else out(`netsim: "ip link set ${a.slice(1).join(" ")}" is not supported (use up|down).\n`);
		return;
	}
	out(`netsim: "ip link ${a.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
}
function parseRouteTarget(word) {
	if (word === "default") return {
		addr: 0,
		prefix: 0
	};
	const cidr = parseCidr(word);
	if (cidr) return cidr;
	const ip = parseIp(word);
	if (ip !== null) return {
		addr: ip,
		prefix: 32
	};
	return null;
}
function ipRoute(device, a, out) {
	const sub = a[0] ?? "show";
	if (sub === "show" || sub === "s") {
		out(formatRoutes(device));
		return;
	}
	if (sub === "add" || sub === "del" || sub === "delete") {
		const target = parseRouteTarget(a[1] ?? "");
		if (!target) {
			out(`Error: inet prefix is expected rather than "${a[1] ?? ""}".\n`);
			return;
		}
		if (sub !== "add") {
			const err = device.delRoute(target.addr, target.prefix);
			if (err) out(err + "\n");
			return;
		}
		let via = null;
		let dev;
		for (let i = 2; i < a.length; i += 2) if (a[i] === "via") {
			via = parseIp(a[i + 1] ?? "");
			if (via === null) {
				out(`Error: inet address is expected rather than "${a[i + 1] ?? ""}".\n`);
				return;
			}
		} else if (a[i] === "dev") dev = a[i + 1];
		else {
			out(`Error: either "to" is duplicate, or "${a[i]}" is a garbage.\n`);
			return;
		}
		const err = device.addRoute(target.addr, target.prefix, via, dev);
		if (err) out(err + "\n");
		return;
	}
	out(`netsim: "ip route ${a.join(" ")}" is not supported.\n${UNSUPPORTED_HINT}`);
}
function formatAddresses(device, opts = {}) {
	let s = "";
	device.interfaces.forEach((i, idx) => {
		const flags = i.up ? "BROADCAST,MULTICAST,UP,LOWER_UP" : "BROADCAST,MULTICAST";
		const state = !i.up ? "DOWN" : i.link ? "UP" : "DOWN";
		s += `${idx + 1}: ${i.name}: <${flags}> mtu 1500 state ${state}\n`;
		s += `    link/ether ${i.mac} brd ff:ff:ff:ff:ff:ff\n`;
		if (!opts.linkOnly && i.ip) s += `    inet ${cidrToString(i.ip.addr, i.ip.prefix)} scope global ${i.name}\n`;
	});
	return s;
}
function formatRoutes(device) {
	const rs = device.routes();
	const defaults = rs.filter((r) => r.prefix === 0);
	const rest = rs.filter((r) => r.prefix !== 0);
	let s = "";
	for (const r of [...defaults, ...rest]) {
		const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
		if (r.kind === "connected") {
			const iface = device.getInterface(r.ifaceName);
			const src = iface?.ip ? ` src ${ipToString(iface.ip.addr)}` : "";
			s += `${dest} dev ${r.ifaceName} proto kernel scope link${src}\n`;
		} else if (r.kind === "rip" && r.via !== null) s += `${dest} via ${ipToString(r.via)} dev ${r.ifaceName} proto rip metric ${r.metric ?? 1}\n`;
		else if (r.via !== null) s += `${dest} via ${ipToString(r.via)} dev ${r.ifaceName}\n`;
		else s += `${dest} dev ${r.ifaceName} scope link\n`;
	}
	return s;
}
function formatNeigh(device) {
	let s = "";
	for (const [ip, e] of device.arpTable) s += `${ipToString(ip)} dev ${e.ifaceName} lladdr ${e.mac} REACHABLE\n`;
	return s;
}
function formatArpClassic(device) {
	let s = "Address                  HWtype  HWaddress           Flags Mask            Iface\n";
	for (const [ip, e] of device.arpTable) s += `${ipToString(ip).padEnd(25)}ether   ${e.mac.padEnd(20)}C                     ${e.ifaceName}\n`;
	return s;
}
// src/commands/resolve.ts
function resolveHost(device, target, cb) {
	const literal = parseIp(target);
	if (literal !== null) {
		cb({ ip: literal });
		return { cancel: () => {} };
	}
	if (device.nameserver === null) {
		cb({ error: `${target}: Temporary failure in name resolution` });
		return { cancel: () => {} };
	}
	let cancelled = false;
	device.resolveDns(target, device.nameserver, (r) => {
		if (cancelled) return;
		if (typeof r === "number") cb({ ip: r });
		else if (r === null) cb({ error: `${target}: Name or service not known` });
		else cb({ error: `${target}: Temporary failure in name resolution` });
	});
	return { cancel: () => {
		cancelled = true;
	} };
}
// src/commands/ping.ts
var INTERVAL_MS = 1e3;
var TIMEOUT_MS$1 = 2e3;
function runPing(device, args, write, done) {
	let count = null;
	let target = null;
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === "-c") {
			count = Number(args[++i]);
			if (!Number.isInteger(count) || count <= 0) {
				write("ping: invalid count\n");
				done();
				return null;
			}
		} else if (a.startsWith("-")) {
			write(`ping: netsim supports only: ping [-c count] <host>  (got "${a}")\n`);
			done();
			return null;
		} else target = a;
	}
	if (!target) {
		write("usage: ping [-c count] <destination>\n");
		done();
		return null;
	}
	let cancelFn;
	const resolver = resolveHost(device, target, (res) => {
		if ("error" in res) {
			write(`ping: ${res.error}\n`);
			done();
			return;
		}
		cancelFn = start(res.ip);
	});
	if (!cancelFn) cancelFn = () => {
		resolver.cancel();
		done();
	};
	return { cancel: () => cancelFn() };
	function start(ip) {
		const sched = device.network.scheduler;
		const id = device.allocIcmpId();
		const startedAt = sched.now;
		const sendTimes = /* @__PURE__ */ new Map();
		const answered = /* @__PURE__ */ new Set();
		const rtts = [];
		let sent = 0;
		let received = 0;
		let finished = false;
		write(`PING ${target} (${ipToString(ip)}) 56(84) bytes of data.\n`);
		const finish = () => {
			if (finished) return;
			finished = true;
			device.offIcmp(id);
			const loss = sent ? Math.round((sent - received) / sent * 100) : 0;
			write(`\n--- ${target} ping statistics ---\n`);
			write(`${sent} packets transmitted, ${received} received, ${loss}% packet loss, time ${Math.round(sched.now - startedAt)}ms\n`);
			if (rtts.length) {
				const min = Math.min(...rtts);
				const max = Math.max(...rtts);
				const avg = rtts.reduce((a, b) => a + b, 0) / rtts.length;
				write(`rtt min/avg/max = ${min.toFixed(1)}/${avg.toFixed(1)}/${max.toFixed(1)} ms\n`);
			}
			done();
		};
		const maybeFinish = (seq) => {
			if (count !== null && seq >= count) finish();
		};
		device.onIcmp(id, (ev) => {
			if (finished) return;
			switch (ev.type) {
				case "reply": {
					if (answered.has(ev.seq)) break;
					answered.add(ev.seq);
					received++;
					const rtt = sched.now - (sendTimes.get(ev.seq) ?? sched.now);
					rtts.push(rtt);
					write(`64 bytes from ${ipToString(ev.from)}: icmp_seq=${ev.seq} ttl=${ev.ttl} time=${rtt.toFixed(1)} ms\n`);
					maybeFinish(ev.seq);
					break;
				}
				case "time-exceeded": {
					const seq = ev.seq ?? 0;
					answered.add(seq);
					write(`From ${ipToString(ev.from)} icmp_seq=${seq} Time to live exceeded\n`);
					maybeFinish(seq);
					break;
				}
				case "unreachable": {
					const seq = ev.seq ?? 0;
					answered.add(seq);
					const what = ev.code === "net" ? "Net" : ev.code === "host" ? "Host" : "Port";
					write(`From ${ipToString(ev.from)} icmp_seq=${seq} Destination ${what} Unreachable\n`);
					maybeFinish(seq);
					break;
				}
				case "send-error": {
					const seq = ev.seq ?? 0;
					answered.add(seq);
					write(`From ${device.name} icmp_seq=${seq} ${ev.message}\n`);
					maybeFinish(seq);
					break;
				}
			}
		});
		const sendOne = () => {
			if (finished) return;
			const seq = ++sent;
			sendTimes.set(seq, sched.now);
			const err = device.sendEcho(ip, id, seq);
			if (err) {
				sent--;
				if (err === "Operation not permitted") write(`ping: sendmsg: ${err}\n`);
				else write(`ping: connect: ${err}\n`);
				finish();
				return;
			}
			sched.schedule(TIMEOUT_MS$1, () => {
				if (finished || answered.has(seq)) return;
				answered.add(seq);
				write(`no answer yet for icmp_seq=${seq}\n`);
				maybeFinish(seq);
			});
			if (count === null || sent < count) sched.schedule(INTERVAL_MS, sendOne);
		};
		sendOne();
		return finish;
	}
}
// src/commands/traceroute.ts
var PROBES_PER_HOP = 3;
var PROBE_TIMEOUT_MS = 1500;
function runTraceroute(device, args, write, done) {
	let maxHops = 30;
	let target = null;
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === "-m") {
			maxHops = Number(args[++i]);
			if (!Number.isInteger(maxHops) || maxHops <= 0) {
				write("traceroute: invalid max hops\n");
				done();
				return null;
			}
		} else if (a.startsWith("-")) {
			write(`traceroute: netsim supports only: traceroute [-m max_hops] <host>  (got "${a}")\n`);
			done();
			return null;
		} else target = a;
	}
	if (!target) {
		write("usage: traceroute [-m max_hops] <destination>\n");
		done();
		return null;
	}
	let cancelFn;
	const resolver = resolveHost(device, target, (res) => {
		if ("error" in res) {
			write(`traceroute: ${res.error}\n`);
			done();
			return;
		}
		cancelFn = start(res.ip);
	});
	if (!cancelFn) cancelFn = () => {
		resolver.cancel();
		done();
	};
	return { cancel: () => cancelFn() };
	function start(ip) {
		const sched = device.network.scheduler;
		const id = device.allocIcmpId();
		let finished = false;
		let ttl = 1;
		let probe = 0;
		let seqCounter = 0;
		let pendingSeq = null;
		let pendingTimer = null;
		let hopFrom = null;
		let hopRtts = [];
		let hopReached = false;
		let sendTime = 0;
		write(`traceroute to ${target} (${ipToString(ip)}), ${maxHops} hops max, 60 byte packets\n`);
		const cleanup = () => {
			if (finished) return;
			finished = true;
			if (pendingTimer) sched.cancel(pendingTimer);
			device.offIcmp(id);
			done();
		};
		const flushHopLine = () => {
			const fromStr = hopFrom !== null ? ipToString(hopFrom) : "*";
			const rttStr = hopRtts.map((r) => r === null ? "*" : `${r.toFixed(1)} ms`).join("  ");
			write(`${String(ttl).padStart(2)}  ${fromStr}  ${rttStr}\n`);
		};
		const nextStep = () => {
			if (finished) return;
			if (probe < PROBES_PER_HOP) {
				sendProbe();
				return;
			}
			flushHopLine();
			if (hopReached || ttl >= maxHops) {
				cleanup();
				return;
			}
			ttl++;
			probe = 0;
			hopFrom = null;
			hopRtts = [];
			sendProbe();
		};
		const onProbeResult = (from, rtt, reached) => {
			if (pendingTimer) sched.cancel(pendingTimer);
			pendingTimer = null;
			pendingSeq = null;
			if (from !== null) hopFrom = from;
			hopRtts.push(rtt);
			if (reached) hopReached = true;
			probe++;
			nextStep();
		};
		device.onIcmp(id, (ev) => {
			if (finished) return;
			const seq = ev.type === "reply" || ev.type === "time-exceeded" || ev.type === "unreachable" || ev.type === "send-error" ? ev.seq : null;
			if (seq === null || seq !== pendingSeq) return;
			const rtt = sched.now - sendTime;
			switch (ev.type) {
				case "reply":
					onProbeResult(ev.from, rtt, true);
					break;
				case "time-exceeded":
					onProbeResult(ev.from, rtt, false);
					break;
				case "unreachable":
					onProbeResult(ev.from, rtt, true);
					break;
				case "send-error": onProbeResult(null, null, false);
			}
		});
		const sendProbe = () => {
			if (finished) return;
			const seq = ++seqCounter;
			pendingSeq = seq;
			sendTime = sched.now;
			const err = device.sendEcho(ip, id, seq, ttl);
			if (err) {
				write(`connect: ${err}\n`);
				cleanup();
				return;
			}
			pendingTimer = sched.schedule(PROBE_TIMEOUT_MS, () => {
				pendingTimer = null;
				pendingSeq = null;
				hopRtts.push(null);
				probe++;
				nextStep();
			});
		};
		sendProbe();
		return cleanup;
	}
}
// src/commands/nft.ts
var SUBSET_HINT$1 = "Supported nft subset: list ruleset [-a] · flush ruleset · add table ip filter|nat ·\nadd chain ip <table> <name> { type filter|nat hook <hook> priority <n> ; [policy accept|drop ;] } ·\nadd|insert rule ip <table> <chain> [matches] accept|drop|reject|masquerade|snat to <ip>|dnat to <ip>[:port] ·\ndelete rule ip <table> <chain> handle <n>\nMatches: ip saddr/daddr <cidr>, tcp|udp sport/dport <port|a-b>, icmp type <echo-request|echo-reply>,\nct state <list>, iifname/oifname \"<if>\"\n";
var CT_STATES = [
	"new",
	"established",
	"related",
	"invalid"
];
var FILTER_HOOKS = [
	"input",
	"forward",
	"output"
];
var NAT_HOOKS = ["prerouting", "postrouting"];
function lex(raw) {
	return raw.replace(/['"]/g, "").replace(/([{};,])/g, " $1 ").trim().split(/\s+/).filter(Boolean);
}
function parsePort(tok) {
	const range = tok.match(/^(\d+)-(\d+)$/);
	if (range) {
		const from = Number(range[1]);
		const to = Number(range[2]);
		if (from >= 1 && to <= 65535 && from <= to) return {
			from,
			to
		};
		return null;
	}
	const p = Number(tok);
	if (Number.isInteger(p) && p >= 1 && p <= 65535) return {
		from: p,
		to: p
	};
	return null;
}
function parseNetToken(tok) {
	const cidr = parseCidr(tok);
	if (cidr) return cidr;
	const ip = parseIp(tok);
	if (ip !== null) return {
		addr: ip,
		prefix: 32
	};
	return null;
}
var Parser = class {
	t;
	i = 0;
	constructor(t) {
		this.t = t;
	}
	peek() {
		return this.t[this.i];
	}
	next() {
		return this.t[this.i++];
	}
	expect(tok) {
		if (this.peek() === tok) {
			this.i++;
			return true;
		}
		return false;
	}
};
function parseExpressions(p) {
	const match = {};
	let verdict;
	let nat;
	while (p.peek() !== void 0) {
		const tok = p.next();
		if (tok === "ip") {
			const what = p.next();
			if (what === "saddr" || what === "daddr") {
				const net = parseNetToken(p.next() ?? "");
				if (!net) return {
					match,
					error: `Error: syntax error, invalid address after "ip ${what}"`
				};
				if (what === "saddr") match.srcNet = net;
				else match.dstNet = net;
			} else if (what === "protocol") {
				const proto = p.next();
				if (proto !== "tcp" && proto !== "udp" && proto !== "icmp") return {
					match,
					error: `Error: syntax error, unexpected protocol "${proto ?? ""}"`
				};
				match.proto = proto;
			} else return {
				match,
				error: `Error: syntax error, unexpected "ip ${what ?? ""}"`
			};
		} else if (tok === "tcp" || tok === "udp") {
			if (match.proto && match.proto !== tok) return {
				match,
				error: "Error: conflicting protocols specified"
			};
			match.proto = tok;
			const what = p.next();
			if (what !== "sport" && what !== "dport") return {
				match,
				error: `Error: syntax error, unexpected "${tok} ${what ?? ""}"`
			};
			const port = parsePort(p.next() ?? "");
			if (!port) return {
				match,
				error: `Error: syntax error, invalid port after "${tok} ${what}"`
			};
			if (what === "sport") match.sport = port;
			else match.dport = port;
		} else if (tok === "icmp") {
			if (match.proto && match.proto !== "icmp") return {
				match,
				error: "Error: conflicting protocols specified"
			};
			match.proto = "icmp";
			if (p.next() !== "type") return {
				match,
				error: "Error: syntax error after \"icmp\""
			};
			const t = p.next();
			if (t !== "echo-request" && t !== "echo-reply") return {
				match,
				error: `netsim: icmp type "${t ?? ""}" not in phase-2 subset (echo-request, echo-reply)`
			};
			match.icmpType = t;
		} else if (tok === "ct") {
			if (p.next() !== "state") return {
				match,
				error: "Error: syntax error after \"ct\""
			};
			const states = [];
			const braced = p.expect("{");
			for (;;) {
				const s = p.peek();
				if (s === void 0) break;
				if (s === ",") {
					p.next();
					continue;
				}
				if (s === "}") {
					p.next();
					break;
				}
				if (CT_STATES.includes(s)) {
					states.push(s);
					p.next();
					if (!braced && p.peek() !== ",") break;
					continue;
				}
				break;
			}
			if (!states.length) return {
				match,
				error: "Error: syntax error, expected ct states"
			};
			match.ctStates = states;
		} else if (tok === "iifname" || tok === "oifname") {
			const name = p.next();
			if (!name) return {
				match,
				error: `Error: syntax error, expected interface after "${tok}"`
			};
			if (tok === "iifname") match.iif = name;
			else match.oif = name;
		} else if (tok === "counter") {} else if (tok === "accept" || tok === "drop" || tok === "reject") {
			verdict = tok;
			break;
		} else if (tok === "masquerade") {
			nat = { type: "masquerade" };
			break;
		} else if (tok === "snat" || tok === "dnat") {
			if (p.next() !== "to") return {
				match,
				error: `Error: syntax error, expected "to" after "${tok}"`
			};
			const target = p.next() ?? "";
			if (tok === "snat") {
				const addr = parseIp(target);
				if (addr === null) return {
					match,
					error: "Error: syntax error, invalid snat address"
				};
				nat = {
					type: "snat",
					addr
				};
			} else {
				const [ipPart, portPart] = target.split(":");
				const addr = parseIp(ipPart);
				if (addr === null) return {
					match,
					error: "Error: syntax error, invalid dnat address"
				};
				const port = portPart !== void 0 ? Number(portPart) : void 0;
				if (port !== void 0 && (!Number.isInteger(port) || port < 1 || port > 65535)) return {
					match,
					error: "Error: syntax error, invalid dnat port"
				};
				nat = {
					type: "dnat",
					addr,
					port
				};
			}
			break;
		} else return {
			match,
			error: `Error: syntax error, unexpected "${tok}"`
		};
	}
	if (p.peek() !== void 0) return {
		match,
		error: `Error: trailing tokens after verdict: "${p.peek()}"`
	};
	return {
		match,
		verdict,
		nat
	};
}
function runNft(device, raw, out) {
	const fw = device.fw;
	const t = lex(raw);
	let handles = false;
	while (t[0] === "-a" || t[0] === "--handle") {
		handles = true;
		t.shift();
	}
	const cmd = t[0];
	if (cmd === "list") {
		if (t[1] === "ruleset") {
			out(listRuleset(fw, { handles }));
			return;
		}
		out(`netsim: "nft ${raw.trim()}" is not supported — use "nft list ruleset".\n`);
		return;
	}
	if (cmd === "flush" && t[1] === "ruleset") {
		fw.flush();
		return;
	}
	if (cmd === "delete" && t[1] === "rule") {
		const handle = Number(t[t.length - 1]);
		if (t[t.length - 2] !== "handle" || !Number.isInteger(handle)) {
			out("Error: syntax error — delete rule ip <table> <chain> handle <n>\n");
			return;
		}
		if (!fw.deleteHandle(handle)) out("Error: Could not process rule: No such file or directory\n");
		return;
	}
	if (cmd === "add" || cmd === "insert" || cmd === "create") {
		const obj = t[1];
		if (obj === "table") {
			if (t[2] !== "ip" || t[3] !== "filter" && t[3] !== "nat") {
				out(`netsim: only "ip filter" and "ip nat" tables are in the phase-2 subset.\n`);
				return;
			}
			fw.tables[t[3]] = true;
			return;
		}
		if (obj === "chain") {
			addChain(device, t.slice(2), out);
			return;
		}
		if (obj === "rule") {
			addRule(device, t.slice(2), cmd === "insert", out);
			return;
		}
	}
	out(`netsim: "nft ${raw.trim()}" is not supported.\n${SUBSET_HINT$1}`);
}
function addChain(device, t, out) {
	const fw = device.fw;
	if (t[0] !== "ip") {
		out("netsim: only the \"ip\" family is in the phase-2 subset.\n");
		return;
	}
	const table = t[1];
	const name = t[2];
	if (table !== "filter" && table !== "nat" || !name) {
		out("Error: syntax error — add chain ip <filter|nat> <name> { ... }\n");
		return;
	}
	if (!fw.tables[table]) {
		out("Error: Could not process rule: No such file or directory\n");
		return;
	}
	const p = new Parser(t.slice(3));
	if (!p.expect("{")) {
		out("netsim: regular (non-base) chains are not in the phase-2 subset — declare a hook block: { type ... hook ... priority 0 ; }\n");
		return;
	}
	let hook;
	let policy;
	let chainType;
	for (;;) {
		const tok = p.next();
		if (tok === void 0 || tok === "}") break;
		if (tok === ";") continue;
		if (tok === "type") chainType = p.next();
		else if (tok === "hook") hook = p.next();
		else if (tok === "priority") p.next();
		else if (tok === "policy") {
			const pol = p.next();
			if (pol === "accept" || pol === "drop") policy = pol;
			else {
				out(`Error: syntax error, unexpected policy "${pol ?? ""}"\n`);
				return;
			}
		} else {
			out(`Error: syntax error, unexpected "${tok}"\n`);
			return;
		}
	}
	if (table === "filter") {
		if (chainType !== "filter" || !FILTER_HOOKS.includes(hook)) {
			out("Error: syntax error — filter chains need: type filter hook input|forward|output priority 0 ;\n");
			return;
		}
		fw.declareFilter(hook, name, policy);
	} else {
		if (chainType !== "nat" || !NAT_HOOKS.includes(hook)) {
			out("Error: syntax error — nat chains need: type nat hook prerouting|postrouting priority <n> ;\n");
			return;
		}
		if (policy === "drop") {
			out("netsim: drop policies on nat chains are not in the phase-2 subset.\n");
			return;
		}
		fw.declareNat(hook, name);
	}
}
function addRule(device, t, atHead, out) {
	const fw = device.fw;
	if (t[0] !== "ip") {
		out("netsim: only the \"ip\" family is in the phase-2 subset.\n");
		return;
	}
	const table = t[1];
	const chainName = t[2];
	if (table !== "filter" && table !== "nat" || !chainName) {
		out("Error: syntax error — add rule ip <table> <chain> <expressions> <verdict>\n");
		return;
	}
	const slot = fw.tables[table] ? fw.chainByName(table, chainName) : null;
	if (!slot) {
		out("Error: Could not process rule: No such file or directory\n");
		return;
	}
	const parsed = parseExpressions(new Parser(t.slice(3)));
	if (parsed.error) {
		out(parsed.error + "\nSupported nft subset: list ruleset [-a] · flush ruleset · add table ip filter|nat ·\nadd chain ip <table> <name> { type filter|nat hook <hook> priority <n> ; [policy accept|drop ;] } ·\nadd|insert rule ip <table> <chain> [matches] accept|drop|reject|masquerade|snat to <ip>|dnat to <ip>[:port] ·\ndelete rule ip <table> <chain> handle <n>\nMatches: ip saddr/daddr <cidr>, tcp|udp sport/dport <port|a-b>, icmp type <echo-request|echo-reply>,\nct state <list>, iifname/oifname \"<if>\"\n");
		return;
	}
	if (slot.kind === "filter") {
		if (!parsed.verdict) {
			out(parsed.nat ? "Error: nat actions (masquerade/snat/dnat) belong in nat chains, not filter chains.\n" : "Error: rule needs a verdict: accept, drop or reject\n");
			return;
		}
		fw.addFilterRule(slot.hook, parsed.match, parsed.verdict, atHead);
		return;
	}
	if (!parsed.nat) {
		out("Error: nat chain rules need masquerade, snat to <ip>, or dnat to <ip>[:port]\n");
		return;
	}
	if (parsed.nat.type === "dnat" && slot.hook !== "prerouting") {
		out("Error: dnat is only valid in the prerouting hook\n");
		return;
	}
	if ((parsed.nat.type === "masquerade" || parsed.nat.type === "snat") && slot.hook !== "postrouting") {
		out(`Error: ${parsed.nat.type} is only valid in the postrouting hook\n`);
		return;
	}
	fw.addNatRule(slot.hook, parsed.match, parsed.nat, atHead);
}
// src/commands/iptables-util.ts
function matchesRuleEquality(a, b) {
	const norm = (m) => JSON.stringify({
		s: m.srcNet ?? null,
		d: m.dstNet ?? null,
		p: m.proto ?? null,
		sp: m.sport ?? null,
		dp: m.dport ?? null,
		it: m.icmpType ?? null,
		ct: m.ctStates ? [...m.ctStates].sort() : null,
		i: m.iif ?? null,
		o: m.oif ?? null
	});
	return norm(a) === norm(b);
}
// src/commands/iptables.ts
var SUBSET_HINT = "Supported iptables subset: -t filter|nat, -A/-I/-D <chain>, -F [chain], -P <chain> ACCEPT|DROP,\n-L [--line-numbers], -S, matches: -s/-d <cidr>, -i/-o <if>, -p tcp|udp|icmp, --sport/--dport <p[:p]>,\n--icmp-type <type>, -m conntrack --ctstate <LIST> (also -m state --state),\ntargets: ACCEPT DROP REJECT MASQUERADE SNAT --to-source <ip>, DNAT --to-destination <ip>[:port]\n";
var FILTER_CHAINS = {
	INPUT: "input",
	FORWARD: "forward",
	OUTPUT: "output"
};
var NAT_CHAINS = {
	PREROUTING: "prerouting",
	POSTROUTING: "postrouting"
};
function parseIptPort(tok) {
	const range = tok.match(/^(\d+):(\d+)$/);
	if (range) {
		const from = Number(range[1]);
		const to = Number(range[2]);
		if (from >= 1 && to <= 65535 && from <= to) return {
			from,
			to
		};
		return null;
	}
	const p = Number(tok);
	if (Number.isInteger(p) && p >= 1 && p <= 65535) return {
		from: p,
		to: p
	};
	return null;
}
function parseNet(tok) {
	const cidr = parseCidr(tok);
	if (cidr) return cidr;
	const ip = parseIp(tok);
	if (ip !== null) return {
		addr: ip,
		prefix: 32
	};
	return null;
}
var ICMP_TYPES = {
	"echo-request": "echo-request",
	"8": "echo-request",
	"echo-reply": "echo-reply",
	"0": "echo-reply"
};
function runIptables(device, args, out) {
	const fw = device.fw;
	let table = "filter";
	let op = null;
	let deleteNum = null;
	let flushChain;
	let policyOp = null;
	let list = false;
	let save = false;
	let lineNumbers = false;
	const match = {};
	let target = null;
	let natTo = null;
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		const next = () => args[++i];
		switch (a) {
			case "-t": {
				const tname = next();
				if (tname !== "filter" && tname !== "nat") {
					out(`iptables: table "${tname ?? ""}" is not in the phase-2 subset (filter, nat).\n`);
					return;
				}
				table = tname;
				break;
			}
			case "-A":
				op = {
					type: "append",
					chain: next() ?? ""
				};
				break;
			case "-I":
				op = {
					type: "insert",
					chain: next() ?? ""
				};
				if (/^\d+$/.test(args[i + 1] ?? "")) {
					if (args[++i] !== "1") {
						out("netsim: -I with a rule number other than 1 is not in the phase-2 subset.\n");
						return;
					}
				}
				break;
			case "-D":
				op = {
					type: "delete",
					chain: next() ?? ""
				};
				if (/^\d+$/.test(args[i + 1] ?? "")) deleteNum = Number(args[++i]);
				break;
			case "-F":
				flushChain = /^[A-Z]+$/.test(args[i + 1] ?? "") ? args[++i] : null;
				break;
			case "-P":
				policyOp = {
					chain: next() ?? "",
					target: next() ?? ""
				};
				break;
			case "-L":
				list = true;
				break;
			case "-S":
				save = true;
				break;
			case "--line-numbers":
				lineNumbers = true;
				break;
			case "-n":
			case "-v": break;
			case "-s": {
				const net = parseNet(next() ?? "");
				if (!net) {
					out("iptables: bad source address\n");
					return;
				}
				match.srcNet = net;
				break;
			}
			case "-d": {
				const net = parseNet(next() ?? "");
				if (!net) {
					out("iptables: bad destination address\n");
					return;
				}
				match.dstNet = net;
				break;
			}
			case "-i":
				match.iif = next();
				break;
			case "-o":
				match.oif = next();
				break;
			case "-p": {
				const proto = next();
				if (proto !== "tcp" && proto !== "udp" && proto !== "icmp") {
					out(`iptables: protocol "${proto ?? ""}" is not in the phase-2 subset (tcp, udp, icmp).\n`);
					return;
				}
				match.proto = proto;
				break;
			}
			case "--dport":
			case "--sport": {
				if (match.proto !== "tcp" && match.proto !== "udp") {
					out(`iptables: unknown option "${a}" — specify -p tcp or -p udp first, like real iptables.\n`);
					return;
				}
				const port = parseIptPort(next() ?? "");
				if (!port) {
					out("iptables: invalid port/service\n");
					return;
				}
				if (a === "--dport") match.dport = port;
				else match.sport = port;
				break;
			}
			case "--icmp-type": {
				if (match.proto !== "icmp") {
					out("iptables: unknown option \"--icmp-type\" — specify -p icmp first.\n");
					return;
				}
				const t = ICMP_TYPES[next() ?? ""];
				if (!t) {
					out("netsim: only echo-request (8) and echo-reply (0) icmp types are in the phase-2 subset.\n");
					return;
				}
				match.icmpType = t;
				break;
			}
			case "-m": {
				const mod = next();
				if (mod !== "conntrack" && mod !== "state") {
					out(`netsim: match extension "-m ${mod ?? ""}" is not in the phase-2 subset (conntrack, state).\n`);
					return;
				}
				break;
			}
			case "--ctstate":
			case "--state": {
				const states = [];
				for (const s of (next() ?? "").split(",")) {
					const lower = s.toLowerCase();
					if (![
						"new",
						"established",
						"related",
						"invalid"
					].includes(lower)) {
						out(`iptables: unknown state "${s}"\n`);
						return;
					}
					states.push(lower);
				}
				if (!states.length) {
					out("iptables: --ctstate needs at least one state\n");
					return;
				}
				match.ctStates = states;
				break;
			}
			case "-j":
				target = next() ?? null;
				break;
			case "--to-destination":
			case "--to-source":
				natTo = next() ?? null;
				break;
			case "--reject-with":
				next();
				break;
			default:
				out(`netsim: iptables option "${a}" is not supported.\n${SUBSET_HINT}`);
				return;
		}
	}
	fw.ensureIptablesTable(table);
	if (save) {
		out(iptablesSave(fw, table));
		return;
	}
	if (list) {
		out(iptablesListing(fw, table, { lineNumbers }));
		return;
	}
	if (policyOp) {
		const hook = FILTER_CHAINS[policyOp.chain];
		if (table !== "filter" || !hook) {
			out("iptables: policies are supported on filter INPUT/FORWARD/OUTPUT only.\n");
			return;
		}
		const pol = policyOp.target.toLowerCase();
		if (pol !== "accept" && pol !== "drop") {
			out("iptables: Bad policy name. Run `iptables -h' or iptables-restore -h' for more information.\n");
			return;
		}
		fw.filter[hook].policy = pol;
		return;
	}
	if (flushChain !== void 0) {
		if (table === "filter") {
			const hooks = flushChain ? [FILTER_CHAINS[flushChain]] : Object.values(FILTER_CHAINS);
			if (hooks.some((h) => !h)) {
				out("iptables: No chain/target/match by that name.\n");
				return;
			}
			for (const h of hooks) fw.filter[h].rules = [];
		} else {
			const hooks = flushChain ? [NAT_CHAINS[flushChain]] : Object.values(NAT_CHAINS);
			if (hooks.some((h) => !h)) {
				out("iptables: No chain/target/match by that name.\n");
				return;
			}
			for (const h of hooks) fw.nat[h].rules = [];
		}
		return;
	}
	if (!op) {
		out(`netsim: nothing to do — give one of -A/-I/-D/-F/-P/-L/-S.\n${SUBSET_HINT}`);
		return;
	}
	if (table === "filter") {
		const hook = FILTER_CHAINS[op.chain];
		if (!hook) {
			out("iptables: No chain/target/match by that name.\n");
			return;
		}
		if (op.type === "delete") {
			const rules = fw.filter[hook].rules;
			if (deleteNum !== null) {
				if (deleteNum < 1 || deleteNum > rules.length) {
					out("iptables: Index of deletion too big.\n");
					return;
				}
				rules.splice(deleteNum - 1, 1);
				return;
			}
			const verdict = (target ?? "").toLowerCase();
			const idx = rules.findIndex((r) => r.verdict === verdict && matchesRuleEquality(r.match, match));
			if (idx < 0) {
				out("iptables: Bad rule (does a matching rule exist in that chain?).\n");
				return;
			}
			rules.splice(idx, 1);
			return;
		}
		const verdict = (target ?? "").toLowerCase();
		if (verdict !== "accept" && verdict !== "drop" && verdict !== "reject") {
			out(`iptables: filter target must be ACCEPT, DROP or REJECT (got "${target ?? ""}").\n`);
			return;
		}
		fw.addFilterRule(hook, match, verdict, op.type === "insert");
		return;
	}
	const hook = NAT_CHAINS[op.chain];
	if (!hook) {
		out("iptables: No chain/target/match by that name.\n");
		return;
	}
	if (op.type === "delete") {
		const rules = fw.nat[hook].rules;
		if (deleteNum === null || deleteNum < 1 || deleteNum > rules.length) {
			out("netsim: delete nat rules by number: iptables -t nat -D <chain> <num>\n");
			return;
		}
		rules.splice(deleteNum - 1, 1);
		return;
	}
	let action;
	if (target === "MASQUERADE") {
		if (hook !== "postrouting") {
			out("iptables: MASQUERADE is only valid in POSTROUTING.\n");
			return;
		}
		action = { type: "masquerade" };
	} else if (target === "SNAT") {
		const addr = parseIp(natTo ?? "");
		if (hook !== "postrouting" || addr === null) {
			out("iptables: SNAT needs POSTROUTING and --to-source <ip>.\n");
			return;
		}
		action = {
			type: "snat",
			addr
		};
	} else if (target === "DNAT") {
		const [ipPart, portPart] = (natTo ?? "").split(":");
		const addr = parseIp(ipPart ?? "");
		const port = portPart !== void 0 ? Number(portPart) : void 0;
		if (hook !== "prerouting" || addr === null || port !== void 0 && !Number.isInteger(port)) {
			out("iptables: DNAT needs PREROUTING and --to-destination <ip>[:port].\n");
			return;
		}
		action = {
			type: "dnat",
			addr,
			port
		};
	} else {
		out(`iptables: nat target must be MASQUERADE, SNAT or DNAT (got "${target ?? ""}").\n`);
		return;
	}
	fw.addNatRule(hook, match, action, op.type === "insert");
}
// src/commands/nc.ts
var DEFAULT_TIMEOUT_S = 3;
function runNc(device, args, write, done) {
	let listen = false;
	let udp = false;
	let timeoutS = DEFAULT_TIMEOUT_S;
	const positional = [];
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === "-l") listen = true;
		else if (a === "-u") udp = true;
		else if (a === "-z" || a === "-v" || a === "-k") {} else if (a === "-w") {
			timeoutS = Number(args[++i]);
			if (!Number.isFinite(timeoutS) || timeoutS <= 0) {
				write("nc: invalid timeout\n");
				done();
				return null;
			}
		} else if (a === "-p") positional.push(args[++i] ?? "");
		else if (a.startsWith("-")) {
			write(`nc: netsim supports only: nc [-u] [-z] [-w secs] <ip> <port>  |  nc -l [-u] <port>  (got "${a}")\n`);
			done();
			return null;
		} else positional.push(a);
	}
	const proto = udp ? "udp" : "tcp";
	if (listen) {
		const port = Number(positional[0]);
		if (!Number.isInteger(port) || port < 1 || port > 65535) {
			write("usage: nc -l [-u] <port>\n");
			done();
			return null;
		}
		const registry = udp ? device.ncUdp : device.ncTcp;
		if (registry.has(port) || (udp ? device.services.udp : device.services.tcp).has(port)) {
			write(`nc: Address already in use\n`);
			done();
			return null;
		}
		registry.set(port, (msg) => write(msg + "\n"));
		write(`Listening on 0.0.0.0 ${port} (${proto})\n`);
		return { cancel: () => {
			registry.delete(port);
			done();
		} };
	}
	const host = positional[0];
	const port = Number(positional[1]);
	if (!host || !Number.isInteger(port) || port < 1 || port > 65535) {
		write("usage: nc [-u] [-z] [-w secs] <host> <port>\n");
		done();
		return null;
	}
	let cancelled = false;
	const report = (r) => {
		if (cancelled) return;
		switch (r) {
			case "open":
				write(`Connection to ${host} ${port} port [${proto}/*] succeeded!\n`);
				break;
			case "refused":
				write(`nc: connect to ${host} port ${port} (${proto}) failed: Connection refused\n`);
				break;
			case "timeout":
				write(`nc: connect to ${host} port ${port} (${proto}) failed: Operation timed out\n`);
				break;
			case "unreachable": write(`nc: connect to ${host} port ${port} (${proto}) failed: No route to host\n`);
		}
		done();
	};
	const resolver = resolveHost(device, host, (res) => {
		if (cancelled) return;
		if ("error" in res) {
			write(`nc: getaddrinfo for host "${host}" port ${port}: Name or service not known\n`);
			done();
			return;
		}
		const err = udp ? device.probeUdp(res.ip, port, timeoutS * 1e3, report) : device.connectTcp(res.ip, port, timeoutS * 1e3, report);
		if (err) {
			write(`nc: connect to ${host} port ${port} (${proto}) failed: ${err}\n`);
			done();
		}
	});
	return { cancel: () => {
		cancelled = true;
		resolver.cancel();
		done();
	} };
}
// src/commands/dig.ts
function runDig(device, args, write, done) {
	let server = null;
	let short = false;
	let name = null;
	for (const a of args) if (a.startsWith("@")) {
		server = parseIp(a.slice(1));
		if (server === null) {
			write(`dig: couldn't get address for '${a.slice(1)}': not found\n`);
			done();
			return null;
		}
	} else if (a === "+short") short = true;
	else if (a.startsWith("+") || a.startsWith("-")) {
		write(`dig: netsim supports only: dig [@server] <name> [+short]  (got "${a}")\n`);
		done();
		return null;
	} else name = a;
	if (!name) {
		write("usage: dig [@server] <name> [+short]\n");
		done();
		return null;
	}
	const ns = server ?? device.nameserver;
	if (ns === null) {
		write(";; error: no nameserver configured — use dig @<server> <name> or set DNS in the inspector\n");
		done();
		return null;
	}
	const sched = device.network.scheduler;
	const started = sched.now;
	let cancelled = false;
	device.resolveDns(name, ns, (r) => {
		if (cancelled) return;
		const elapsed = Math.round(sched.now - started);
		if (typeof r === "number") {
			if (short) write(ipToString(r) + "\n");
			else {
				write(`; <<>> NetSim dig <<>> ${name}\n`);
				write(`;; ->>HEADER<<- opcode: QUERY, status: NOERROR\n\n`);
				write(`;; QUESTION SECTION:\n;${name}.\t\t\tIN\tA\n\n`);
				write(`;; ANSWER SECTION:\n${name}.\t\t0\tIN\tA\t${ipToString(r)}\n\n`);
				write(`;; Query time: ${elapsed} msec\n;; SERVER: ${ipToString(ns)}#53\n`);
			}
		} else if (r === null) {
			if (short) {} else {
				write(`; <<>> NetSim dig <<>> ${name}\n`);
				write(`;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN\n\n`);
				write(`;; QUESTION SECTION:\n;${name}.\t\t\tIN\tA\n\n`);
				write(`;; Query time: ${elapsed} msec\n;; SERVER: ${ipToString(ns)}#53\n`);
			}
		} else if (r === "refused") write(`;; communications error to ${ipToString(ns)}#53: connection refused\n`);
		else write(";; connection timed out; no servers could be reached\n");
		done();
	});
	return { cancel: () => {
		cancelled = true;
		done();
	} };
}
// src/commands/curl.ts
var TIMEOUT_MS = 4e3;
function parseUrl(raw) {
	let rest = raw;
	if (rest.startsWith("https://")) return { error: "netsim: https is not simulated — use http://" };
	if (rest.startsWith("http://")) rest = rest.slice(7);
	if (!rest) return { error: "curl: no URL specified!" };
	const slash = rest.indexOf("/");
	const hostPort = slash < 0 ? rest : rest.slice(0, slash);
	const path = slash < 0 ? "/" : rest.slice(slash);
	const colon = hostPort.indexOf(":");
	const host = colon < 0 ? hostPort : hostPort.slice(0, colon);
	const port = colon < 0 ? 80 : Number(hostPort.slice(colon + 1));
	if (!host || !Number.isInteger(port) || port < 1 || port > 65535) return { error: `curl: (3) URL rejected: ${raw}` };
	return {
		host,
		port,
		path
	};
}
function runCurl(device, args, write, done) {
	let verbose = false;
	let url = null;
	for (const a of args) if (a === "-v" || a === "--verbose") verbose = true;
	else if (a.startsWith("-")) {
		write(`curl: netsim supports only: curl [-v] <url>  (got "${a}")\n`);
		done();
		return null;
	} else url = a;
	if (!url) {
		write("curl: no URL specified!\n");
		done();
		return null;
	}
	const parsed = parseUrl(url);
	if ("error" in parsed) {
		write(parsed.error + "\n");
		done();
		return null;
	}
	const { host, port, path } = parsed;
	let finished = false;
	const finish = () => {
		if (finished) return;
		finished = true;
		done();
	};
	const resolver = resolveHost(device, host, (res) => {
		if (finished) return;
		if ("error" in res) {
			write(`curl: (6) Could not resolve host: ${host}\n`);
			finish();
			return;
		}
		const ip = res.ip;
		if (verbose) write(`*   Trying ${ipToString(ip)}:${port}...\n`);
		const err = device.httpGet(ip, port, path, host, TIMEOUT_MS, (r) => {
			if (finished) return;
			if (r.ok) {
				if (verbose) {
					write(`> GET ${path} HTTP/1.1\n> Host: ${host}\n>\n`);
					write(`< HTTP/1.1 ${r.status} ${r.reason}\n< Content-Length: ${r.body.length}\n<\n`);
				}
				write(r.body.endsWith("\n") ? r.body : r.body + "\n");
			} else if (r.error === "refused") write(`curl: (7) Failed to connect to ${host} port ${port}: Connection refused\n`);
			else if (r.error === "timeout") write(`curl: (28) Failed to connect to ${host} port ${port}: Timeout was reached\n`);
			else if (r.error === "unreachable") write(`curl: (7) Failed to connect to ${host} port ${port}: No route to host\n`);
			else if (r.error === "empty") write("curl: (52) Empty reply from server\n");
			else write(`curl: (7) Failed to connect to ${host} port ${port}: ${r.error}\n`);
			finish();
		}, verbose ? () => write(`* Connected to ${host} (${ipToString(ip)}) port ${port}\n`) : void 0);
		if (err) {
			write(`curl: (7) Failed to connect to ${host} port ${port}: ${err}\n`);
			finish();
		}
	});
	return { cancel: () => {
		resolver.cancel();
		finish();
	} };
}
// src/commands/dhclient.ts
var DISCOVER_TRIES = 3;
var STEP_TIMEOUT_MS = 2e3;
function runDhclient(device, args, write, done) {
	const ifname = args.find((a) => !a.startsWith("-")) ?? "eth0";
	const iface = device.getInterface(ifname);
	if (!iface) {
		write(`Cannot find device "${ifname}"\n`);
		done();
		return null;
	}
	const sched = device.network.scheduler;
	const xid = device.nextDhcpXid();
	let state = "discover";
	let tries = 0;
	let timer = null;
	const cleanup = () => {
		device.dhcpListeners.delete(onDhcp);
		if (timer) sched.cancel(timer);
		timer = null;
	};
	const fail = (msg) => {
		if (state === "done") return;
		state = "done";
		cleanup();
		write(msg);
		done();
	};
	const sendDiscover = () => {
		if (state !== "discover") return;
		if (tries >= DISCOVER_TRIES) {
			fail("No DHCPOFFERS received.\nNo working leases in persistent database - sleeping.\n");
			return;
		}
		tries++;
		write(`DHCPDISCOVER on ${ifname} to 255.255.255.255 port 67 interval ${STEP_TIMEOUT_MS / 1e3}\n`);
		device.sendDhcpClient(iface, {
			kind: "dhcp",
			op: "discover",
			xid,
			clientMac: iface.mac
		});
		timer = sched.schedule(STEP_TIMEOUT_MS, sendDiscover);
	};
	const onDhcp = (app) => {
		if (state === "done" || app.clientMac !== iface.mac || app.xid !== xid) return;
		if (state === "discover" && app.op === "offer" && app.yourIp !== void 0) {
			state = "request";
			if (timer) sched.cancel(timer);
			write(`DHCPOFFER of ${ipToString(app.yourIp)} from ${ipToString(app.serverIp ?? 0)}\n`);
			write(`DHCPREQUEST for ${ipToString(app.yourIp)} on ${ifname} to 255.255.255.255 port 67\n`);
			device.sendDhcpClient(iface, {
				kind: "dhcp",
				op: "request",
				xid,
				clientMac: iface.mac,
				yourIp: app.yourIp
			});
			timer = sched.schedule(STEP_TIMEOUT_MS, () => fail("No DHCPACK received - giving up.\n"));
			return;
		}
		if (state === "request" && app.op === "ack" && app.yourIp !== void 0) {
			state = "done";
			cleanup();
			write(`DHCPACK of ${ipToString(app.yourIp)} from ${ipToString(app.serverIp ?? 0)}\n`);
			iface.ip = {
				addr: app.yourIp,
				prefix: app.prefix ?? 24
			};
			if (app.router !== null && app.router !== void 0) {
				device.staticRoutes = device.staticRoutes.filter((r) => !(r.dest === 0 && r.prefix === 0));
				device.addRoute(0, 0, app.router);
			}
			if (app.dns !== null && app.dns !== void 0) device.nameserver = app.dns;
			write(`bound to ${ipToString(app.yourIp)} -- renewal in 43200 seconds.\n`);
			done();
		}
	};
	device.dhcpListeners.add(onDhcp);
	sendDiscover();
	return { cancel: () => {
		if (state === "done") return;
		state = "done";
		cleanup();
		done();
	} };
}
// src/commands/shell.ts
var HELP = `NetSim commands (real Linux syntax, curated subset):
  ip address [show | add <cidr> dev <if> | del <cidr> dev <if>]
  ip link    [show | set <if> up|down]
  ip route   [show | add <cidr>|default via <gw> [dev <if>] | del <cidr>|default]
  ip neigh / arp           neighbour (ARP) cache
  ping [-c N] <host>       ICMP echo (Ctrl-C to stop)
  traceroute [-m max] <host>  trace the route packets take
  dhclient [<if>]          acquire an address over DHCP
  dig [@server] <name> [+short]   DNS lookup
  curl [-v] http://<host>[:port][/path]   fetch a web page
  nft <...>                nftables firewall (try: nft list ruleset)
  iptables <...>           iptables front-end onto the same ruleset
  nc [-u] [-z] [-w s] <host> <port> test a port; nc -l [-u] <port> to listen
  conntrack -L             connection tracking table
  ss -tlnu                 listening sockets
  sysctl [-w] net.ipv4.ip_forward[=0|1]
  hostname | help | clear
Anything else errors loudly — NetSim never fakes syntax it doesn't implement.
`;
function runSysctl(device, args, write) {
	const KEY = "net.ipv4.ip_forward";
	let rest = args;
	let writeMode = false;
	if (rest[0] === "-w") {
		writeMode = true;
		rest = rest.slice(1);
	}
	const arg = rest[0] ?? "";
	if (writeMode || arg.includes("=")) {
		const [key, value] = arg.split("=");
		if (key !== KEY || value !== "0" && value !== "1") {
			write(`sysctl: netsim supports only: sysctl -w ${KEY}=0|1\n`);
			return;
		}
		device.forwarding = value === "1";
		write(`${KEY} = ${value}\n`);
		return;
	}
	if (arg === KEY || arg === "") {
		write(`${KEY} = ${device.forwarding ? 1 : 0}\n`);
		return;
	}
	write(`sysctl: cannot stat /proc/sys/${arg.replace(/\./g, "/")}: No such file or directory\n`);
}
function formatConntrack(device) {
	const entries = device.ct.list(device.network.now);
	let s = "";
	for (const e of entries) {
		const o = e.orig;
		const state = e.state === "established" ? "ESTABLISHED" : "NEW";
		const natNote = e.trans.srcIp !== o.srcIp || e.trans.dstIp !== o.dstIp || e.trans.srcPort !== o.srcPort || e.trans.dstPort !== o.dstPort ? ` [nat: ${ipToString(e.trans.srcIp)}:${e.trans.srcPort} > ${ipToString(e.trans.dstIp)}:${e.trans.dstPort}]` : "";
		s += `${o.proto.padEnd(8)}src=${ipToString(o.srcIp)} dst=${ipToString(o.dstIp)} sport=${o.srcPort} dport=${o.dstPort} state=${state}${natNote}\n`;
	}
	s += `conntrack: ${entries.length} flow entries have been shown.\n`;
	return s;
}
function formatSockets(device) {
	const s = "Netid  State   Local Address:Port   Process\n";
	const tcp = /* @__PURE__ */ new Map();
	const udp = /* @__PURE__ */ new Map();
	for (const p of device.services.tcp) tcp.set(p, "");
	for (const p of device.ncTcp.keys()) tcp.set(p, "nc");
	if (device.httpServer?.enabled) tcp.set(device.httpServer.port, "httpd");
	for (const p of device.services.udp) udp.set(p, "");
	for (const p of device.ncUdp.keys()) udp.set(p, "nc");
	if (device.dnsServer?.enabled) udp.set(53, "dnsmasq");
	if (device.dhcpServer?.enabled) udp.set(67, "dnsmasq");
	const rows = [];
	for (const [p, proc] of [...tcp.entries()].sort((a, b) => a[0] - b[0])) rows.push(`tcp    LISTEN  0.0.0.0:${String(p).padEnd(14)}${proc}\n`);
	for (const [p, proc] of [...udp.entries()].sort((a, b) => a[0] - b[0])) rows.push(`udp    UNCONN  0.0.0.0:${String(p).padEnd(14)}${proc}\n`);
	return s + rows.join("");
}
var Shell = class {
	device;
	constructor(device) {
		this.device = device;
	}
	exec(line, io, done) {
		const trimmed = line.trim();
		const argv = trimmed.split(/\s+/).filter(Boolean);
		if (argv.length === 0) {
			done();
			return null;
		}
		const [cmd, ...args] = argv;
		const rawRest = trimmed.slice(cmd.length).trim();
		switch (cmd) {
			case "help":
				io.write(HELP);
				break;
			case "hostname":
				io.write(this.device.name + "\n");
				break;
			case "ip":
				runIp(this.device, args, io.write.bind(io));
				break;
			case "arp":
				io.write(formatArpClassic(this.device));
				break;
			case "sysctl":
				runSysctl(this.device, args, io.write.bind(io));
				break;
			case "nft":
				runNft(this.device, rawRest, io.write.bind(io));
				break;
			case "iptables":
				runIptables(this.device, args, io.write.bind(io));
				break;
			case "conntrack":
				if (args[0] === "-L" || args.length === 0) io.write(formatConntrack(this.device));
				else io.write("conntrack: netsim supports only: conntrack -L\n");
				break;
			case "ss":
				io.write(formatSockets(this.device));
				break;
			case "ping": return runPing(this.device, args, io.write.bind(io), done);
			case "traceroute": return runTraceroute(this.device, args, io.write.bind(io), done);
			case "nc": return runNc(this.device, args, io.write.bind(io), done);
			case "dig": return runDig(this.device, args, io.write.bind(io), done);
			case "curl": return runCurl(this.device, args, io.write.bind(io), done);
			case "dhclient": return runDhclient(this.device, args, io.write.bind(io), done);
			default: io.write(`${cmd}: command not found (try 'help')\n`);
		}
		done();
		return null;
	}
};
// src/terminals.ts
var sessions = /* @__PURE__ */ new Map();
function getSession(device, opts = {}) {
	const existing = sessions.get(device.id);
	if (existing) return existing;
	const term = new Terminal({
		cursorBlink: true,
		fontSize: 13,
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
		scrollback: 2e3,
		theme: {
			background: "#0b1220",
			foreground: "#d6e2f0",
			cursor: "#7dd3fc",
			selectionBackground: "#274867"
		}
	});
	const fit = new FitAddon();
	term.loadAddon(fit);
	const shell = new Shell(device);
	const promptStr = () => `\x1b[1;32m${device.name}\x1b[0m:\x1b[1;34m~\x1b[0m$ `;
	const writeOut = (s) => term.write(s.replace(/\n/g, "\r\n"));
	let buf = "";
	let running = null;
	const history = [];
	let hIdx = 0;
	const redrawLine = (next) => {
		term.write(`\x1b[2K\r${promptStr()}${next}`);
		buf = next;
	};
	const submit = () => {
		const line = buf;
		buf = "";
		term.write("\r\n");
		const trimmed = line.trim();
		if (!trimmed) {
			term.write(promptStr());
			return;
		}
		history.push(line);
		hIdx = history.length;
		if (trimmed === "clear") {
			term.write("\x1B[2J\x1B[H");
			term.write(promptStr());
			return;
		}
		running = shell.exec(line, { write: writeOut }, () => {
			running = null;
			opts.onAfterCommand?.();
			term.write(promptStr());
		});
	};
	term.onData((data) => {
		if (running) {
			if (data === "") {
				term.write("^C\r\n");
				running.cancel();
			}
			return;
		}
		if (data === "\x1B[A") {
			if (history.length && hIdx > 0) redrawLine(history[--hIdx]);
			return;
		}
		if (data === "\x1B[B") {
			if (hIdx < history.length - 1) redrawLine(history[++hIdx]);
			else {
				hIdx = history.length;
				redrawLine("");
			}
			return;
		}
		for (const ch of data) if (ch === "\r") submit();
		else if (ch === "") {
			if (buf.length) {
				buf = buf.slice(0, -1);
				term.write("\b \b");
			}
		} else if (ch === "") {
			term.write("^C\r\n");
			buf = "";
			term.write(promptStr());
		} else if (ch >= " " && ch <= "~") {
			buf += ch;
			term.write(ch);
		}
	});
	term.writeln(`\x1b[90mNetSim — ${device.name} (${device.kind}). Type 'help' for commands.\x1b[0m`);
	term.write(promptStr());
	const session = {
		term,
		fit,
		opened: false
	};
	sessions.set(device.id, session);
	return session;
}
function disposeSession(deviceId) {
	const s = sessions.get(deviceId);
	if (!s) return;
	s.term.dispose();
	sessions.delete(deviceId);
}
function disposeAllSessions() {
	for (const id of [...sessions.keys()]) disposeSession(id);
}
// src/sim.ts
var sim = { net: new Network() };
// src/export/configs.ts
function setupScript(d) {
	const lines = [
		"#!/bin/sh",
		`# NetSim generated configuration for ${d.name} (${d.kind})`,
		"# Apply on a Linux machine with iproute2, as root. Interface names on",
		"# real hardware will differ — adjust eth0/eth1/... accordingly.",
		""
	];
	for (const i of d.interfaces) {
		if (i.ip) lines.push(`ip addr add ${cidrToString(i.ip.addr, i.ip.prefix)} dev ${i.name}`);
		if (i.ip || i.link) lines.push(`ip link set ${i.name} ${i.up ? "up" : "down"}`);
	}
	for (const r of d.staticRoutes) {
		const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
		const via = r.via !== null ? ` via ${ipToString(r.via)}` : "";
		lines.push(`ip route add ${dest}${via} dev ${r.ifaceName}`);
	}
	if (d.nameserver !== null) lines.push(`printf 'nameserver ${ipToString(d.nameserver)}\\n' > /etc/resolv.conf`);
	if (d.forwarding) lines.push("sysctl -w net.ipv4.ip_forward=1");
	if (d.fw.active()) lines.push("nft -f ./nftables.conf");
	if (d.dhcpServer?.enabled || d.dnsServer?.enabled) lines.push("# start DHCP/DNS: dnsmasq --conf-file=./dnsmasq.conf --no-daemon");
	if (d.httpServer?.enabled) lines.push(`# serve the web page: busybox httpd -f -p ${d.httpServer.port} -h . (index.html exported alongside)`);
	lines.push("");
	return lines.join("\n");
}
function nftablesConf(d) {
	if (!d.fw.active()) return null;
	return `#!/usr/sbin/nft -f\n# NetSim generated ruleset for ${d.name}\nflush ruleset\n\n${listRuleset(d.fw)}`;
}
function dnsmasqConf(d) {
	const dhcp = d.dhcpServer?.enabled ? d.dhcpServer : null;
	const dns = d.dnsServer?.enabled ? d.dnsServer : null;
	if (!dhcp && !dns) return null;
	const lines = [`# NetSim generated dnsmasq.conf for ${d.name}`];
	for (const i of d.interfaces) if (i.ip) lines.push(`interface=${i.name}`);
	if (!dns) lines.push("port=0  # DHCP only, no DNS");
	else {
		lines.push("no-resolv");
		for (const [name, addr] of dns.records) lines.push(`host-record=${name},${ipToString(addr)}`);
	}
	if (dhcp) {
		lines.push(`dhcp-range=${ipToString(dhcp.rangeStart)},${ipToString(dhcp.rangeEnd)},12h`);
		if (dhcp.router !== null) lines.push(`dhcp-option=option:router,${ipToString(dhcp.router)}`);
		if (dhcp.dns !== null) lines.push(`dhcp-option=option:dns-server,${ipToString(dhcp.dns)}`);
	}
	lines.push("");
	return lines.join("\n");
}
function sanitizeName(name) {
	return name.replace(/[^\w.-]/g, "_");
}
function configBundle(net) {
	const files = [];
	const devices = [...net.devices.values()].filter((d) => d instanceof IpDevice);
	const readme = [
		"# NetSim configuration bundle",
		"",
		"One directory per device, containing genuine Linux configuration derived",
		"from the simulated design. Interface names map 1:1 to the simulation;",
		"real hardware will differ.",
		"",
		"| Device | Kind | Files |",
		"|---|---|---|"
	];
	for (const d of devices) {
		const dir = sanitizeName(d.name);
		const names = ["setup.sh"];
		files.push({
			path: `${dir}/setup.sh`,
			content: setupScript(d)
		});
		const nft = nftablesConf(d);
		if (nft) {
			files.push({
				path: `${dir}/nftables.conf`,
				content: nft
			});
			names.push("nftables.conf");
		}
		const dnsmasq = dnsmasqConf(d);
		if (dnsmasq) {
			files.push({
				path: `${dir}/dnsmasq.conf`,
				content: dnsmasq
			});
			names.push("dnsmasq.conf");
		}
		if (d.httpServer?.enabled) {
			files.push({
				path: `${dir}/index.html`,
				content: d.httpServer.body + "\n"
			});
			names.push("index.html");
		}
		readme.push(`| ${d.name} | ${d.kind} | ${names.join(", ")} |`);
	}
	readme.push("");
	files.unshift({
		path: "README.md",
		content: readme.join("\n")
	});
	return files;
}
// src/export/containerlab.ts
var IMAGE$1 = "ghcr.io/hellt/network-multitool";
function clabIface(simName) {
	const n = Number(simName.replace(/^eth/, ""));
	return `eth${Number.isInteger(n) ? n + 1 : simName}`;
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
function nftExecCommands(d) {
	const fw = d.fw;
	const cmds = [];
	if (fw.tables.filter) {
		cmds.push("nft add table ip filter");
		for (const hook of [
			"input",
			"forward",
			"output"
		]) {
			const c = fw.filter[hook];
			if (!c.declared) continue;
			cmds.push(`nft 'add chain ip filter ${c.name} { type filter hook ${hook} priority ${FILTER_PRIO[hook]} ; policy ${c.policy} ; }'`);
			for (const r of c.rules) cmds.push(`nft 'add rule ip filter ${c.name} ${filterRuleText(r)}'`);
		}
	}
	if (fw.tables.nat) {
		cmds.push("nft add table ip nat");
		for (const hook of ["prerouting", "postrouting"]) {
			const c = fw.nat[hook];
			if (!c.declared) continue;
			cmds.push(`nft 'add chain ip nat ${c.name} { type nat hook ${hook} priority ${NAT_PRIO[hook]} ; }'`);
			for (const r of c.rules) cmds.push(`nft 'add rule ip nat ${c.name} ${natRuleText(r)}'`);
		}
	}
	return cmds.map((c) => c.replace(/(iifname|oifname) "eth(\d+)"/g, (_m, kw, n) => `${kw} "eth${Number(n) + 1}"`));
}
function containerlabYaml(net, labName = "netsim") {
	const lines = [
		"# Generated by NetSim — deploy with: containerlab deploy -t <this file>",
		"# NOTE: containerlab reserves eth0 for management; simulated ethN is eth(N+1) here.",
		"# DHCP/DNS/web services are exported separately in the configs bundle (dnsmasq.conf etc).",
		`name: ${sanitizeName(labName)}`,
		"topology:",
		"  nodes:"
	];
	for (const d of net.devices.values()) {
		const name = sanitizeName(d.name);
		lines.push(`    ${name}:`);
		lines.push("      kind: linux");
		lines.push(`      image: ${IMAGE$1}`);
		const exec = [];
		if (d instanceof SwitchDevice) {
			exec.push("ip link add br0 type bridge", "ip link set br0 up");
			for (const i of d.interfaces) if (i.link) exec.push(`ip link set ${clabIface(i.name)} master br0`);
		} else if (d instanceof IpDevice) {
			for (const i of d.interfaces) if (i.ip) exec.push(`ip addr add ${cidrToString(i.ip.addr, i.ip.prefix)} dev ${clabIface(i.name)}`);
			for (const r of d.staticRoutes) {
				const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
				const via = r.via !== null ? ` via ${ipToString(r.via)}` : "";
				exec.push(`ip route replace ${dest}${via} dev ${clabIface(r.ifaceName)}`);
			}
			if (d.forwarding) exec.push("sysctl -w net.ipv4.ip_forward=1");
			exec.push(...nftExecCommands(d));
		}
		if (exec.length) {
			lines.push("      exec:");
			for (const c of exec) lines.push(`        - "${c.replace(/"/g, "\\\"")}"`);
		}
	}
	lines.push("  links:");
	for (const l of net.links.values()) lines.push(`    - endpoints: ["${sanitizeName(l.a.device.name)}:${clabIface(l.a.name)}", "${sanitizeName(l.b.device.name)}:${clabIface(l.b.name)}"]`);
	lines.push("");
	return lines.join("\n");
}
// src/export/compose.ts
var IMAGE = "nicolaka/netshoot";
function computeSegments(net) {
	const segments = [];
	const seenSwitches = /* @__PURE__ */ new Set();
	const attachmentsOf = (switches) => {
		const out = [];
		for (const sw of switches) for (const port of sw.interfaces) {
			if (!port.link) continue;
			const other = port.link.other(port);
			if (other.device instanceof IpDevice) out.push({
				device: other.device,
				iface: other
			});
		}
		return out;
	};
	for (const d of net.devices.values()) {
		if (!(d instanceof SwitchDevice) || seenSwitches.has(d.id)) continue;
		const group = /* @__PURE__ */ new Set();
		const queue = [d];
		while (queue.length) {
			const sw = queue.pop();
			if (group.has(sw)) continue;
			group.add(sw);
			seenSwitches.add(sw.id);
			for (const port of sw.interfaces) {
				if (!port.link) continue;
				const other = port.link.other(port).device;
				if (other instanceof SwitchDevice && !group.has(other)) queue.push(other);
			}
		}
		segments.push({
			name: sanitizeName(d.name),
			attachments: attachmentsOf(group),
			subnet: null
		});
	}
	for (const l of net.links.values()) if (l.a.device instanceof IpDevice && l.b.device instanceof IpDevice) segments.push({
		name: `p2p_${sanitizeName(l.a.device.name)}_${sanitizeName(l.b.device.name)}`,
		attachments: [{
			device: l.a.device,
			iface: l.a
		}, {
			device: l.b.device,
			iface: l.b
		}],
		subnet: null
	});
	for (const seg of segments) {
		const withIp = seg.attachments.find((a) => a.iface.ip);
		if (withIp?.iface.ip) {
			const { addr, prefix } = withIp.iface.ip;
			seg.subnet = cidrToString(networkOf(addr, prefix), prefix);
		}
	}
	return segments;
}
function composeYaml(net) {
	const segments = computeSegments(net);
	const lines = [
		"# Generated by NetSim.",
		"# NOTE: compose bridges add a host gateway + NAT, so this is an approximation",
		"# of the simulated L2 topology — use the containerlab export for fidelity.",
		"services:"
	];
	const devices = [...net.devices.values()].filter((d) => d instanceof IpDevice);
	for (const d of devices) {
		const name = sanitizeName(d.name);
		lines.push(`  ${name}:`);
		lines.push(`    image: ${IMAGE}`);
		lines.push(`    container_name: ${name}`);
		lines.push("    cap_add: [NET_ADMIN]");
		const cmds = [];
		for (const r of d.staticRoutes) {
			const dest = r.prefix === 0 ? "default" : cidrToString(r.dest, r.prefix);
			const via = r.via !== null ? ` via ${ipToString(r.via)}` : "";
			cmds.push(`ip route replace ${dest}${via}`);
		}
		if (d.forwarding) cmds.push("sysctl -w net.ipv4.ip_forward=1");
		cmds.push(...nftExecCommands(d).map((c) => c.replace(/eth(\d+)/g, (_m, n) => `eth${Number(n) - 1}`)));
		cmds.push("sleep infinity");
		lines.push(`    command: sh -c "${cmds.join(" && ").replace(/"/g, "\\\"")}"`);
		const segs = segments.filter((s) => s.attachments.some((a) => a.device === d));
		if (segs.length) {
			lines.push("    networks:");
			for (const s of segs) {
				const att = s.attachments.find((a) => a.device === d);
				if (att.iface.ip) {
					lines.push(`      ${s.name}:`);
					lines.push(`        ipv4_address: ${ipToString(att.iface.ip.addr)}`);
				} else lines.push(`      ${s.name}: {}`);
			}
		}
	}
	lines.push("networks:");
	for (const s of segments) {
		lines.push(`  ${s.name}:`);
		lines.push("    driver: bridge");
		if (s.subnet) {
			lines.push("    ipam:");
			lines.push("      config:");
			lines.push(`        - subnet: ${s.subnet}`);
		}
	}
	lines.push("");
	return lines.join("\n");
}
// src/export/diagram.ts
var W = 150;
var BASE_H = 58;
var LINE_H = 15;
var KIND_COLOR = {
	host: "#0284c7",
	server: "#0d9488",
	switch: "#7c3aed",
	router: "#059669",
	firewall: "#ea580c"
};
function esc$1(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function topologySvg(net, positions, title = "NetSim topology") {
	const pos = new Map(positions.map((p) => [p.id, p]));
	const boxes = /* @__PURE__ */ new Map();
	for (const d of net.devices.values()) {
		const p = pos.get(d.id);
		if (!p) continue;
		const ips = d instanceof IpDevice ? d.interfaces.filter((i) => i.ip).map((i) => `${i.name} ${cidrToString(i.ip.addr, i.ip.prefix)}`) : [];
		boxes.set(d.id, {
			x: p.x,
			y: p.y,
			h: BASE_H + ips.length * LINE_H,
			name: d.name,
			kind: d.kind,
			ips
		});
	}
	if (boxes.size === 0) return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80"><text x="12" y="40">empty topology</text></svg>`;
	const minX = Math.min(...[...boxes.values()].map((b) => b.x)) - 40;
	const minY = Math.min(...[...boxes.values()].map((b) => b.y)) - 60;
	const maxX = Math.max(...[...boxes.values()].map((b) => b.x + W)) + 40;
	const maxY = Math.max(...[...boxes.values()].map((b) => b.y + b.h)) + 40;
	const width = maxX - minX;
	const height = maxY - minY;
	const parts = [];
	parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}" font-family="Helvetica, Arial, sans-serif">`);
	parts.push(`<rect x="${minX}" y="${minY}" width="${width}" height="${height}" fill="#ffffff"/>`);
	parts.push(`<text x="${minX + 20}" y="${minY + 32}" font-size="16" font-weight="bold" fill="#0f172a">${esc$1(title)}</text>`);
	for (const l of net.links.values()) {
		const a = boxes.get(l.a.device.id);
		const b = boxes.get(l.b.device.id);
		if (!a || !b) continue;
		const ax = a.x + W / 2;
		const ay = a.y + a.h / 2;
		const bx = b.x + W / 2;
		const by = b.y + b.h / 2;
		parts.push(`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#94a3b8" stroke-width="2"/>`);
		const lx = (x1, y1, x2, y2, t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
		const [alx, aly] = lx(ax, ay, bx, by, .22);
		const [blx, bly] = lx(ax, ay, bx, by, .78);
		parts.push(`<text x="${alx}" y="${aly - 4}" font-size="9" fill="#64748b" text-anchor="middle">${esc$1(l.a.name)}</text>`);
		parts.push(`<text x="${blx}" y="${bly - 4}" font-size="9" fill="#64748b" text-anchor="middle">${esc$1(l.b.name)}</text>`);
	}
	for (const b of boxes.values()) {
		const color = KIND_COLOR[b.kind] ?? "#334155";
		parts.push(`<rect x="${b.x}" y="${b.y}" width="${W}" height="${b.h}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`);
		parts.push(`<rect x="${b.x}" y="${b.y}" width="5" height="${b.h}" rx="2.5" fill="${color}"/>`);
		parts.push(`<text x="${b.x + 16}" y="${b.y + 22}" font-size="13" font-weight="bold" fill="#0f172a">${esc$1(b.name)}</text>`);
		parts.push(`<text x="${b.x + 16}" y="${b.y + 38}" font-size="10" fill="${color}" style="text-transform:uppercase">${esc$1(b.kind)}</text>`);
		b.ips.forEach((ip, i) => {
			parts.push(`<text x="${b.x + 16}" y="${b.y + 54 + i * LINE_H}" font-size="10" fill="#334155" font-family="monospace">${esc$1(ip)}</text>`);
		});
	}
	parts.push("</svg>");
	return parts.join("\n");
}
function svgToPngBlob(svg, scale = 2) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width * scale;
			canvas.height = img.height * scale;
			const ctx = canvas.getContext("2d");
			ctx.scale(scale, scale);
			ctx.drawImage(img, 0, 0);
			URL.revokeObjectURL(url);
			canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("PNG export failed")), "image/png");
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("SVG rendering failed"));
		};
		img.src = url;
	});
}
// src/export/report.ts
function esc(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function networkReport(net, positions, generatedAt) {
	const devices = [...net.devices.values()];
	const parts = [];
	parts.push(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<title>NetSim network report</title>
<style>
  body { font-family: Helvetica, Arial, sans-serif; color: #0f172a; max-width: 900px; margin: 32px auto; padding: 0 20px; }
  h1 { font-size: 24px; } h2 { font-size: 18px; margin-top: 32px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  h3 { font-size: 15px; margin-bottom: 6px; }
  .meta { color: #64748b; font-size: 12px; }
  table { border-collapse: collapse; width: 100%; font-size: 13px; margin: 8px 0 16px; }
  th, td { border: 1px solid #e2e8f0; padding: 6px 10px; text-align: left; vertical-align: top; }
  th { background: #f8fafc; }
  pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; font-size: 12px; overflow-x: auto; }
  .kind { text-transform: uppercase; font-size: 11px; color: #64748b; letter-spacing: 1px; }
  .diagram { margin: 16px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: auto; }
  @media print { .diagram { border: none; } }
</style></head><body>`);
	parts.push("<h1>Network design report</h1>");
	parts.push(`<p class="meta">Generated by NetSim on ${esc(generatedAt)} · ${devices.length} devices · ${net.links.size} links</p>`);
	parts.push("<h2>Topology</h2>");
	parts.push(`<div class="diagram">${topologySvg(net, positions, "")}</div>`);
	parts.push("<h2>Device inventory</h2>");
	parts.push("<table><tr><th>Device</th><th>Kind</th><th>Addresses</th><th>Services</th></tr>");
	for (const d of devices) {
		const ips = d instanceof IpDevice ? d.interfaces.filter((i) => i.ip).map((i) => `${i.name}: ${cidrToString(i.ip.addr, i.ip.prefix)}`).join("<br/>") : "—";
		const services = [];
		if (d instanceof IpDevice) {
			if (d.forwarding) services.push("IP forwarding");
			if (d.fw.active()) services.push("firewall");
			if (d.dhcpServer?.enabled) services.push("DHCP server");
			if (d.dnsServer?.enabled) services.push("DNS server");
			if (d.httpServer?.enabled) services.push(`web (:${d.httpServer.port})`);
			if (d.services.tcp.size) services.push(`tcp ports ${[...d.services.tcp].join(",")}`);
			if (d.services.udp.size) services.push(`udp ports ${[...d.services.udp].join(",")}`);
			if (d.nameserver !== null) services.push(`resolver → ${ipToString(d.nameserver)}`);
		}
		parts.push(`<tr><td><strong>${esc(d.name)}</strong></td><td class="kind">${d.kind}</td><td><code>${ips || "—"}</code></td><td>${services.map(esc).join("; ") || "—"}</td></tr>`);
	}
	parts.push("</table>");
	parts.push("<h2>Cabling</h2>");
	parts.push("<table><tr><th>From</th><th>Interface</th><th>To</th><th>Interface</th></tr>");
	for (const l of net.links.values()) parts.push(`<tr><td>${esc(l.a.device.name)}</td><td><code>${esc(l.a.name)}</code></td><td>${esc(l.b.device.name)}</td><td><code>${esc(l.b.name)}</code></td></tr>`);
	parts.push("</table>");
	for (const d of devices) {
		if (!(d instanceof IpDevice)) continue;
		const hasRoutes = d.routes().length > 0;
		const hasFw = d.fw.active();
		const dnsRecords = d.dnsServer?.enabled ? [...d.dnsServer.records.entries()] : [];
		if (!hasRoutes && !hasFw && !dnsRecords.length && !d.dhcpServer?.enabled) continue;
		parts.push(`<h2>${esc(d.name)} <span class="kind">${d.kind}</span></h2>`);
		if (hasRoutes) {
			parts.push("<h3>Routing table</h3>");
			parts.push(`<pre>${esc(formatRoutes(d))}</pre>`);
		}
		if (d.dhcpServer?.enabled) {
			const c = d.dhcpServer;
			parts.push("<h3>DHCP server</h3>");
			parts.push(`<pre>range ${ipToString(c.rangeStart)} – ${ipToString(c.rangeEnd)}\nrouter ${c.router !== null ? ipToString(c.router) : "—"}\ndns    ${c.dns !== null ? ipToString(c.dns) : "—"}</pre>`);
		}
		if (dnsRecords.length) {
			parts.push("<h3>DNS records</h3>");
			parts.push(`<pre>${esc(dnsRecords.map(([n, a]) => `${ipToString(a)}  ${n}`).join("\n"))}</pre>`);
		}
		if (hasFw) {
			parts.push("<h3>Firewall ruleset (nftables)</h3>");
			parts.push(`<pre>${esc(listRuleset(d.fw))}</pre>`);
		}
	}
	for (const d of devices) if (d instanceof SwitchDevice && d.macTable.size) {
		parts.push(`<h2>${esc(d.name)} <span class="kind">switch</span></h2>`);
		parts.push("<h3>MAC address table (live)</h3>");
		parts.push(`<pre>${esc([...d.macTable.entries()].map(([mac, p]) => `${mac}  ${p.name}`).join("\n"))}</pre>`);
	}
	parts.push("</body></html>");
	return parts.join("\n");
}
// src/store.ts
var autosaveKey = "edu-network:kids:v1";
var embed = null;
function deviceNode(id, kind, label, x, y) {
	return {
		id,
		type: "device",
		position: {
			x,
			y
		},
		data: {
			kind,
			label,
			ips: []
		}
	};
}
function edgesFromEngine() {
	return [...sim.net.links.values()].map((l) => {
		const kinds = [l.a.device.kind, l.b.device.kind];
		const wireless = kinds.includes("ap") && kinds.some((k) => k === "host" || k === "server");
		return {
			id: l.id,
			source: l.a.device.id,
			target: l.b.device.id,
			type: "floating",
			...wireless ? { style: { strokeDasharray: "7 5" } } : {}
		};
	});
}
function deviceIps(id) {
	const d = sim.net.devices.get(id);
	if (!d) return [];
	return d.interfaces.filter((i) => i.ip).map((i) => cidrToString(i.ip.addr, i.ip.prefix));
}
function connectError(e) {
	const m = e instanceof Error ? e.message : String(e);
	if (m.includes("no free interface")) return `${m.split(":")[0]}: немає вільного порту для кабелю`;
	if (m.includes("itself")) return "Пристрій не можна з’єднати сам із собою";
	if (m.includes("already connected")) return "Цей порт уже зайнятий";
	return m;
}
var saveTimer = null;
var noticeTimer = null;
var lastPulse = 0;
var useStore = create()((set, get) => {
	let flashSeq = 0;
	const wireNet = (net) => {
		net.onWireTransfer = (t) => {
			const packets = get().packets;
			set({ packets: [...packets.slice(-149), t] });
		};
		net.onFwDrop = (deviceId) => {
			const now = net.scheduler.now;
			set({ dropFlashes: [...get().dropFlashes.slice(-19), {
				id: ++flashSeq,
				deviceId,
				start: now,
				until: now + 700
			}] });
		};
	};
	wireNet(sim.net);
	const positionsNow = () => {
		const positions = {};
		for (const n of get().nodes) positions[n.id] = {
			x: n.position.x,
			y: n.position.y
		};
		return positions;
	};
	let embedStart = null;
	const currentSave = () => {
		const save = serializeNetwork(sim.net, positionsNow());
		const lab = get().lab;
		if (lab) {
			save.lab = lab;
			save.labProgress = {
				step: get().labStep,
				results: get().labResults,
				quiz: get().quizAnswers
			};
		}
		return save;
	};
	const download = (filename, blob) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};
	const currentSvg = () => topologySvg(sim.net, get().nodes.map((n) => ({
		id: n.id,
		x: n.position.x,
		y: n.position.y
	})));
	const saveSoon = () => {
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = setTimeout(() => {
			if (embed) {
				embed.onChange?.(serializeNetwork(sim.net, positionsNow()));
				return;
			}
			try {
				localStorage.setItem(autosaveKey, JSON.stringify(currentSave()));
			} catch {}
		}, 500);
	};
	const adoptSave = (data) => {
		disposeAllSessions();
		sim.net = restoreNetwork(data);
		wireNet(sim.net);
		set({
			nodes: data.devices.map((d) => deviceNode(d.id, d.kind, d.name, d.x, d.y)),
			edges: edgesFromEngine(),
			packets: [],
			dropFlashes: [],
			selected: null,
			terminals: [],
			activeTerminal: null,
			connTest: null,
			loadSeq: get().loadSeq + 1,
			lab: data.lab ?? null,
			labStep: data.labProgress?.step ?? 0,
			labResults: data.labProgress?.results ?? {},
			labChecking: false,
			quizAnswers: data.labProgress?.quiz ?? {}
		});
		get().refresh();
	};
	return {
		nodes: [],
		edges: [],
		packets: [],
		dropFlashes: [],
		clock: 0,
		uiPulse: 0,
		selected: null,
		terminals: [],
		activeTerminal: null,
		paused: false,
		speed: 1,
		notice: null,
		mode: "kids",
		loadSeq: 0,
		embedded: false,
		selfCheck: true,
		onNext: null,
		connTest: null,
		lab: null,
		labStep: 0,
		labResults: {},
		labChecking: false,
		quizAnswers: {},
		addDeviceAt(kind, pos) {
			const d = createDevice(sim.net, kind);
			set({ nodes: [...get().nodes, deviceNode(d.id, kind, d.name, pos.x, pos.y)] });
			saveSoon();
		},
		onNodesChange(changes) {
			for (const ch of changes) if (ch.type === "remove") {
				disposeSession(ch.id);
				sim.net.removeDevice(ch.id);
			}
			const removed = changes.some((c) => c.type === "remove");
			set({
				nodes: applyNodeChanges(changes, get().nodes),
				...removed ? {
					edges: edgesFromEngine(),
					terminals: get().terminals.filter((t) => sim.net.devices.has(t)),
					activeTerminal: get().activeTerminal && sim.net.devices.has(get().activeTerminal) ? get().activeTerminal : null,
					selected: get().selected && sim.net.devices.has(get().selected) ? get().selected : null
				} : {}
			});
			if (removed || changes.some((c) => c.type === "position" && !c.dragging)) saveSoon();
		},
		onEdgesChange(changes) {
			for (const ch of changes) if (ch.type === "remove") sim.net.disconnect(ch.id);
			set({ edges: applyEdgeChanges(changes, get().edges) });
			if (changes.some((c) => c.type === "remove")) saveSoon();
		},
		onConnect(c) {
			if (!c.source || !c.target) return;
			try {
				sim.net.connect(c.source, c.target);
				set({ edges: edgesFromEngine() });
				saveSoon();
			} catch (e) {
				get().setNotice(connectError(e));
			}
		},
		select(id) {
			set({ selected: id });
		},
		deleteDevice(id) {
			disposeSession(id);
			sim.net.removeDevice(id);
			set({
				nodes: get().nodes.filter((n) => n.id !== id),
				edges: edgesFromEngine(),
				terminals: get().terminals.filter((t) => t !== id),
				activeTerminal: get().activeTerminal === id ? null : get().activeTerminal,
				selected: get().selected === id ? null : get().selected
			});
			saveSoon();
		},
		renameDevice(id, name) {
			const d = sim.net.devices.get(id);
			if (!d || !name.trim()) return;
			d.name = name.trim();
			get().refresh();
			saveSoon();
		},
		setIfaceIp(deviceId, ifaceName, value) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return "це не IP-пристрій";
			const iface = d.getInterface(ifaceName);
			if (!iface) return "немає такого порту";
			const trimmed = value.trim();
			if (trimmed === "") iface.ip = null;
			else {
				const cidr = parseCidr(trimmed);
				if (!cidr) return "впиши адресу так: 192.168.1.10/24";
				iface.ip = cidr;
			}
			get().refresh();
			saveSoon();
			return null;
		},
		toggleIface(deviceId, ifaceName) {
			const iface = sim.net.devices.get(deviceId)?.getInterface(ifaceName);
			if (!iface) return;
			iface.up = !iface.up;
			get().refresh();
			saveSoon();
		},
		setServices(deviceId, proto, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return "це не IP-пристрій";
			const ports = /* @__PURE__ */ new Set();
			for (const part of text.split(",").map((p) => p.trim()).filter(Boolean)) {
				const n = Number(part);
				if (!Number.isInteger(n) || n < 1 || n > 65535) return `неправильний порт «${part}»`;
				ports.add(n);
			}
			d.services[proto] = ports;
			get().refresh();
			saveSoon();
			return null;
		},
		copyDeviceConfig(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			const text = listRuleset(d.fw);
			navigator.clipboard.writeText(text).then(() => get().setNotice(`Налаштування nftables для ${d.name} скопійовано, встав у /etc/nftables.conf`)).catch(() => get().setNotice("Немає доступу до буфера обміну"));
		},
		setNameserver(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return "це не IP-пристрій";
			const trimmed = text.trim();
			if (trimmed === "") d.nameserver = null;
			else {
				const ip = parseIp(trimmed);
				if (ip === null) return "неправильна адреса DNS-сервера";
				d.nameserver = ip;
			}
			get().refresh();
			saveSoon();
			return null;
		},
		toggleDhcpServer(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			if (!d.dhcpServer) {
				const iface = d.interfaces.find((i) => i.ip);
				const base = iface?.ip ? (iface.ip.addr & 4294967040) >>> 0 : parseIp("192.168.0.0");
				d.dhcpServer = {
					enabled: true,
					rangeStart: (base | 100) >>> 0,
					rangeEnd: (base | 150) >>> 0,
					router: iface?.ip?.addr ?? null,
					dns: d.nameserver,
					leases: /* @__PURE__ */ new Map()
				};
			} else d.dhcpServer.enabled = !d.dhcpServer.enabled;
			get().refresh();
			saveSoon();
		},
		setDhcpField(deviceId, field, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.dhcpServer) return "DHCP-сервер вимкнено";
			const trimmed = text.trim();
			if (field === "router" || field === "dns") {
				if (trimmed === "") d.dhcpServer[field] = null;
				else {
					const ip = parseIp(trimmed);
					if (ip === null) return "неправильна адреса";
					d.dhcpServer[field] = ip;
				}
			} else {
				const ip = parseIp(trimmed);
				if (ip === null) return "неправильна адреса";
				d.dhcpServer[field] = ip;
			}
			get().refresh();
			saveSoon();
			return null;
		},
		toggleDnsServer(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			if (!d.dnsServer) d.dnsServer = {
				enabled: true,
				records: /* @__PURE__ */ new Map()
			};
			else d.dnsServer.enabled = !d.dnsServer.enabled;
			get().refresh();
			saveSoon();
		},
		setDnsRecords(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.dnsServer) return "DNS-сервер вимкнено";
			const records = /* @__PURE__ */ new Map();
			for (const line of text.split("\n")) {
				const trimmed = line.trim();
				if (!trimmed || trimmed.startsWith("#")) continue;
				const [addr, name] = trimmed.split(/\s+/);
				const ip = parseIp(addr ?? "");
				if (ip === null || !name) return `неправильний рядок «${trimmed}» (формат: <ip> <ім’я>)`;
				records.set(name.toLowerCase(), ip);
			}
			d.dnsServer.records = records;
			get().refresh();
			saveSoon();
			return null;
		},
		toggleHttpServer(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			if (!d.httpServer) d.httpServer = {
				enabled: true,
				port: 80,
				body: `<html><body><h1>Hello from ${d.name}</h1></body></html>`
			};
			else d.httpServer.enabled = !d.httpServer.enabled;
			get().refresh();
			saveSoon();
		},
		setHttpPort(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.httpServer) return "вебсервер вимкнено";
			const port = Number(text.trim());
			if (!Number.isInteger(port) || port < 1 || port > 65535) return "неправильний порт";
			d.httpServer.port = port;
			get().refresh();
			saveSoon();
			return null;
		},
		setHttpBody(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice) || !d.httpServer) return;
			d.httpServer.body = text;
			saveSoon();
		},
		toggleRip(deviceId) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return;
			d.enableRip(!d.ripEnabled);
			get().refresh();
			saveSoon();
		},
		setPortVlan(deviceId, port, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof SwitchDevice)) return "це не світч";
			const vlan = Number(text.trim());
			if (!Number.isInteger(vlan) || vlan < 1 || vlan > 4094) return "VLAN має бути від 1 до 4094";
			if (vlan === 1) d.vlans.delete(port);
			else d.vlans.set(port, vlan);
			get().refresh();
			saveSoon();
			return null;
		},
		setSsid(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof ApDevice)) return "це не точка доступу";
			if (!text.trim()) return "SSID не може бути порожнім";
			d.ssid = text.trim();
			get().refresh();
			saveSoon();
			return null;
		},
		openTerminal(id) {
			const d = sim.net.devices.get(id);
			if (!d || !(d instanceof IpDevice)) return;
			set({
				terminals: get().terminals.includes(id) ? get().terminals : [...get().terminals, id],
				activeTerminal: id
			});
		},
		closeTerminal(id) {
			disposeSession(id);
			const terminals = get().terminals.filter((t) => t !== id);
			set({
				terminals,
				activeTerminal: get().activeTerminal === id ? terminals.length ? terminals[terminals.length - 1] : null : get().activeTerminal
			});
		},
		setActiveTerminal(id) {
			set({ activeTerminal: id });
		},
		refresh() {
			set({ nodes: get().nodes.map((n) => {
				const d = sim.net.devices.get(n.id);
				if (!d) return n;
				const fw = d instanceof IpDevice ? d.fw.active() : false;
				return {
					...n,
					data: {
						...n.data,
						label: d.name,
						ips: deviceIps(n.id),
						fw
					}
				};
			}) });
		},
		tick(dtMs) {
			if (get().paused) return;
			const dt = Math.min(dtMs, 100) * get().speed;
			sim.net.scheduler.advanceTo(sim.net.scheduler.now + dt);
			const now = sim.net.scheduler.now;
			const packets = get().packets;
			const alive = packets.filter((p) => p.end > now - 120);
			const flashes = get().dropFlashes;
			const aliveFlashes = flashes.filter((f) => f.until > now);
			const pulse = Math.floor(now / 400);
			set({
				clock: now,
				...alive.length !== packets.length ? { packets: alive } : {},
				...aliveFlashes.length !== flashes.length ? { dropFlashes: aliveFlashes } : {},
				...pulse !== lastPulse ? { uiPulse: pulse } : {}
			});
			lastPulse = pulse;
		},
		setPaused(p) {
			set({ paused: p });
		},
		setSpeed(s) {
			set({ speed: s });
		},
		setNotice(msg) {
			if (noticeTimer) clearTimeout(noticeTimer);
			set({ notice: msg });
			if (msg) noticeTimer = setTimeout(() => set({ notice: null }), 4e3);
		},
		newTopology() {
			disposeAllSessions();
			sim.net = new Network();
			wireNet(sim.net);
			set({
				nodes: [],
				edges: [],
				packets: [],
				dropFlashes: [],
				selected: null,
				terminals: [],
				activeTerminal: null,
				connTest: null,
				lab: null,
				labStep: 0,
				labResults: {},
				labChecking: false,
				quizAnswers: {}
			});
			saveSoon();
		},
		loadDemo() {
			get().newTopology();
			const net = sim.net;
			const pc1 = createDevice(net, "host");
			const pc2 = createDevice(net, "host");
			const sw1 = createDevice(net, "switch");
			const r1 = createDevice(net, "router");
			const srv1 = createDevice(net, "server");
			net.connect(pc1.id, sw1.id);
			net.connect(pc2.id, sw1.id);
			net.connect(sw1.id, r1.id);
			net.connect(r1.id, srv1.id);
			pc1.getInterface("eth0").ip = parseCidr("192.168.1.10/24");
			r1.getInterface("eth0").ip = parseCidr("192.168.1.1/24");
			r1.getInterface("eth1").ip = parseCidr("10.0.0.1/24");
			srv1.getInterface("eth0").ip = parseCidr("10.0.0.20/24");
			pc1.addRoute(0, 0, parseIp("192.168.1.1"));
			srv1.addRoute(0, 0, parseIp("10.0.0.1"));
			pc1.nameserver = parseIp("10.0.0.20");
			r1.dhcpServer = {
				enabled: true,
				rangeStart: parseIp("192.168.1.100"),
				rangeEnd: parseIp("192.168.1.150"),
				router: parseIp("192.168.1.1"),
				dns: parseIp("10.0.0.20"),
				leases: /* @__PURE__ */ new Map()
			};
			srv1.dnsServer = {
				enabled: true,
				records: /* @__PURE__ */ new Map([["web.lan", parseIp("10.0.0.20")], ["pc1.lan", parseIp("192.168.1.10")]])
			};
			srv1.httpServer = {
				enabled: true,
				port: 80,
				body: "<html><body><h1>It works!</h1><p>Served by srv1 over simulated TCP.</p></body></html>"
			};
			set({
				nodes: [
					deviceNode(pc1.id, "host", pc1.name, 60, 120),
					deviceNode(pc2.id, "host", pc2.name, 60, 320),
					deviceNode(sw1.id, "switch", sw1.name, 290, 220),
					deviceNode(r1.id, "router", r1.name, 510, 220),
					deviceNode(srv1.id, "server", srv1.name, 730, 220)
				],
				edges: edgesFromEngine()
			});
			get().refresh();
			saveSoon();
		},
		exportJson() {
			download("netsim-topology.json", new Blob([JSON.stringify(currentSave(), null, 2)], { type: "application/json" }));
		},
		exportConfigs() {
			const files = configBundle(sim.net);
			const entries = {};
			for (const f of files) entries[`netsim-configs/${f.path}`] = strToU8(f.content);
			const zipped = zipSync(entries);
			download("netsim-configs.zip", new Blob([zipped.slice().buffer], { type: "application/zip" }));
			get().setNotice("Налаштування пристроїв вивантажено: справжні файли iproute2, nftables, dnsmasq");
		},
		exportContainerlab() {
			download("netsim.clab.yml", new Blob([containerlabYaml(sim.net)], { type: "text/yaml" }));
			get().setNotice("Схему для containerlab вивантажено, запуск: containerlab deploy -t netsim.clab.yml");
		},
		exportCompose() {
			download("docker-compose.yml", new Blob([composeYaml(sim.net)], { type: "text/yaml" }));
			get().setNotice("docker-compose вивантажено (L2 приблизно, див. примітку у файлі)");
		},
		exportSvg() {
			download("netsim-topology.svg", new Blob([currentSvg()], { type: "image/svg+xml" }));
		},
		exportPng() {
			svgToPngBlob(currentSvg()).then((blob) => download("netsim-topology.png", blob)).catch(() => get().setNotice("Цей браузер не зміг зберегти PNG, спробуй SVG"));
		},
		exportReport() {
			const positions = get().nodes.map((n) => ({
				id: n.id,
				x: n.position.x,
				y: n.position.y
			}));
			const html = networkReport(sim.net, positions, (/* @__PURE__ */ new Date()).toLocaleString());
			download("netsim-report.html", new Blob([html], { type: "text/html" }));
		},
		importJson(text) {
			try {
				const data = JSON.parse(text);
				adoptSave(data);
				saveSoon();
				return null;
			} catch (e) {
				return e instanceof Error ? e.message : "неправильний файл";
			}
		},
		shareUrl() {
			const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(currentSave()));
			const url = `${location.origin}${location.pathname}#t=${compressed}`;
			navigator.clipboard.writeText(url).then(() => get().setNotice("Посилання скопійовано")).catch(() => get().setNotice("Немає доступу до буфера обміну, скопіюй адресу з рядка браузера"));
			history.replaceState(null, "", `#t=${compressed}`);
		},
		boot(mode) {
			if (mode) {
				set({ mode });
				autosaveKey = `edu-network:${mode}:v1`;
			}
			if (location.hash.startsWith("#t=")) {
				const json = LZString.decompressFromEncodedURIComponent(location.hash.slice(3));
				if (json) try {
					adoptSave(JSON.parse(json));
					history.replaceState(null, "", location.pathname);
					return;
				} catch {
					get().setNotice("Не вдалося відкрити схему з посилання");
				}
			}
			const saved = localStorage.getItem(autosaveKey);
			if (saved) try {
				adoptSave(JSON.parse(saved));
				return;
			} catch {}
			if (get().mode === "kids") get().loadKidsLab(0);
			else get().loadDemo();
		},
		loadBundledLab(index) {
			const lab = LABS[index];
			if (!lab) return;
			adoptSave(JSON.parse(JSON.stringify(lab)));
			saveSoon();
		},
		embedLab(file, start, hooks) {
			embed = hooks;
			embedStart = start;
			set({
				mode: "kids",
				embedded: true
			});
			adoptSave(JSON.parse(JSON.stringify(file)));
		},
		resetLab() {
			if (!embedStart) return;
			adoptSave(JSON.parse(JSON.stringify(embedStart)));
			saveSoon();
		},
		setEmbedOptions(o) {
			embed = o.hooks;
			set({
				selfCheck: o.selfCheck,
				onNext: o.onNext
			});
		},
		loadKidsLab(index) {
			const lab = KIDS_LABS[index];
			if (!lab) return;
			adoptSave(JSON.parse(JSON.stringify(lab)));
			saveSoon();
		},
		setGateway(deviceId, text) {
			const d = sim.net.devices.get(deviceId);
			if (!(d instanceof IpDevice)) return "це не IP-пристрій";
			const trimmed = text.trim();
			const via = trimmed === "" ? null : parseIp(trimmed);
			if (trimmed !== "" && via === null) return "шлюз — це адреса з чотирьох чисел, наприклад 192.168.1.1";
			const old = d.staticRoutes.find((r) => r.prefix === 0);
			if (old) d.delRoute(0, 0);
			if (via !== null) {
				if (d.addRoute(0, 0, via)) {
					if (old) d.staticRoutes.push(old);
					return "шлюз має бути в тій самій мережі, що й адреса пристрою";
				}
			}
			get().refresh();
			saveSoon();
			return null;
		},
		testConnection(fromId, toName) {
			const from = sim.net.devices.get(fromId);
			if (!from || get().connTest?.state === "running") return;
			set({
				connTest: {
					fromId,
					to: toName,
					state: "running",
					detail: ""
				},
				paused: false
			});
			runChecks(sim.net, [{
				id: "conn",
				label: "",
				check: {
					type: "ping",
					from: from.name,
					toDevice: toName,
					expect: "success"
				}
			}], (r) => set({ connTest: {
				fromId,
				to: toName,
				state: r.pass ? "ok" : "fail",
				detail: r.detail
			} }), () => get().refresh());
		},
		loadExample(index) {
			const ex = EXAMPLES[index];
			if (!ex) return;
			adoptSave(JSON.parse(JSON.stringify(ex.file)));
			saveSoon();
		},
		setLabStep(step) {
			const lab = get().lab;
			if (!lab) return;
			set({ labStep: Math.max(0, Math.min(lab.steps.length - 1, step)) });
			saveSoon();
		},
		answerQuiz(qid, choice) {
			set({ quizAnswers: {
				...get().quizAnswers,
				[qid]: choice
			} });
			saveSoon();
		},
		checkStep() {
			const lab = get().lab;
			if (!lab || get().labChecking) return;
			const step = lab.steps[get().labStep];
			if (!step || step.objectives.length === 0) return;
			const objectives = get().embedded ? lab.steps.flatMap((s) => s.objectives) : get().mode === "kids" ? lab.steps.slice(0, get().labStep + 1).flatMap((s) => s.objectives) : step.objectives;
			set({
				labChecking: true,
				paused: false
			});
			runChecks(sim.net, objectives, (r) => {
				set({ labResults: {
					...get().labResults,
					[r.id]: {
						pass: r.pass,
						detail: r.detail
					}
				} });
			}, () => {
				set({ labChecking: false });
				get().refresh();
				saveSoon();
				const all = lab.steps.flatMap((s) => s.objectives);
				if (all.length > 0) embed?.onCheck?.(all.every((o) => get().labResults[o.id]?.pass));
			});
		},
		exportAttempt() {
			const lab = get().lab;
			if (!lab) return;
			const blob = new Blob([JSON.stringify(currentSave(), null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `edu-network-${lab.id}.json`;
			a.click();
			URL.revokeObjectURL(url);
			get().setNotice("Роботу збережено, надішли JSON-файл учителю");
		},
		closeLab() {
			set({
				lab: null,
				labStep: 0,
				labResults: {},
				quizAnswers: {},
				labChecking: false
			});
			saveSoon();
		}
	};
});
// src/components/DeviceNode.tsx
function DeviceIcon({ kind, size = 30 }) {
	if (kind === "host") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "4",
				y: "6",
				width: "24",
				height: "15",
				rx: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "7",
				y: "9",
				width: "18",
				height: "9",
				fill: "currentColor",
				opacity: "0.35"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "12",
				y: "23",
				width: "8",
				height: "2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "9",
				y: "26",
				width: "14",
				height: "2",
				rx: "1",
				fill: "currentColor"
			})
		]
	});
	if (kind === "switch") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "3",
				y: "10",
				width: "26",
				height: "12",
				rx: "2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M8 14h8m0 0-2.5-2.5M16 14l-2.5 2.5",
				stroke: "currentColor",
				strokeWidth: "1.6",
				fill: "none"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M24 18h-8m0 0 2.5-2.5M16 18l2.5 2.5",
				stroke: "currentColor",
				strokeWidth: "1.6",
				fill: "none"
			})
		]
	});
	if (kind === "server") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "6",
				y: "4",
				width: "20",
				height: "8",
				rx: "1.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "6",
				y: "14",
				width: "20",
				height: "8",
				rx: "1.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "10",
				cy: "8",
				r: "1.3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "10",
				cy: "18",
				r: "1.3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M14 8h8M14 18h8",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M12 25h8M16 22v3",
				stroke: "currentColor",
				strokeWidth: "1.6",
				fill: "none"
			})
		]
	});
	if (kind === "ap") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M6 14a14 14 0 0 1 20 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M10 18a8.5 8.5 0 0 1 12 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "16",
				cy: "23",
				r: "2.4",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M16 25v3",
				stroke: "currentColor",
				strokeWidth: "2"
			})
		]
	});
	if (kind === "firewall") return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [/* @__PURE__ */ jsx("path", {
			d: "M16 3l10 4v8c0 7-4.5 11.5-10 14C10.5 26.5 6 22 6 15V7l10-4z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2"
		}), /* @__PURE__ */ jsx("path", {
			d: "M9 12h14M9 17h14M13 12v5M19 12v5",
			stroke: "currentColor",
			strokeWidth: "1.4",
			fill: "none"
		})]
	});
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		"aria-hidden": true,
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "16",
			cy: "16",
			r: "12",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2"
		}), /* @__PURE__ */ jsx("path", {
			d: "M16 8v6m0 0-2.5-2M16 14l2.5-2M16 24v-6m0 0-2.5 2m2.5-2 2.5 2M8 16h6m10 0h-6",
			stroke: "currentColor",
			strokeWidth: "1.6",
			fill: "none"
		})]
	});
}
function DeviceNodeInner({ data, selected }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `device-node kind-${data.kind}${selected ? " selected" : ""}`,
		children: [
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Top,
				id: "t"
			}),
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Right,
				id: "r"
			}),
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Bottom,
				id: "b"
			}),
			/* @__PURE__ */ jsx(Handle, {
				type: "source",
				position: Position.Left,
				id: "l"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "dev-icon",
				children: /* @__PURE__ */ jsx(DeviceIcon, { kind: data.kind })
			}),
			data.fw === true && /* @__PURE__ */ jsx("span", {
				className: "dev-fw-badge",
				title: "діють правила брандмауера",
				children: "⛨"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "dev-label",
				children: data.label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "dev-ip",
				children: data.ips.length ? data.ips[0] + (data.ips.length > 1 ? " +" : "") : "\xA0"
			})
		]
	});
}
var DeviceNode = memo(DeviceNodeInner);
// src/components/FloatingEdge.tsx
function clipToRect(cx, cy, tx, ty, w, h) {
	const dx = tx - cx;
	const dy = ty - cy;
	if (dx === 0 && dy === 0) return {
		x: cx,
		y: cy
	};
	const sx = w / 2 / Math.abs(dx || 1e-9);
	const sy = h / 2 / Math.abs(dy || 1e-9);
	const s = Math.min(sx, sy);
	return {
		x: cx + dx * s,
		y: cy + dy * s
	};
}
function FloatingEdge({ id, source, target, style }) {
	const sourceNode = useInternalNode(source);
	const targetNode = useInternalNode(target);
	if (!sourceNode || !targetNode) return null;
	const sw = sourceNode.measured.width ?? 96;
	const sh = sourceNode.measured.height ?? 78;
	const tw = targetNode.measured.width ?? 96;
	const th = targetNode.measured.height ?? 78;
	const scx = sourceNode.internals.positionAbsolute.x + sw / 2;
	const scy = sourceNode.internals.positionAbsolute.y + sh / 2;
	const tcx = targetNode.internals.positionAbsolute.x + tw / 2;
	const tcy = targetNode.internals.positionAbsolute.y + th / 2;
	const p1 = clipToRect(scx, scy, tcx, tcy, sw, sh);
	const p2 = clipToRect(tcx, tcy, scx, scy, tw, th);
	const [path] = getStraightPath({
		sourceX: p1.x,
		sourceY: p1.y,
		targetX: p2.x,
		targetY: p2.y
	});
	return /* @__PURE__ */ jsx(BaseEdge, {
		id,
		path,
		style
	});
}
// src/components/PacketLayer.tsx
var COLORS = {
	arp: "#f59e0b",
	icmp: "#38bdf8",
	tcp: "#34d399",
	udp: "#c084fc"
};
function PacketLayer() {
	const { x, y, zoom } = useViewport();
	const packets = useStore((s) => s.packets);
	const dropFlashes = useStore((s) => s.dropFlashes);
	const clock = useStore((s) => s.clock);
	const nodes = useStore((s) => s.nodes);
	if (!packets.length && !dropFlashes.length) return null;
	const centers = /* @__PURE__ */ new Map();
	for (const n of nodes) centers.set(n.id, {
		x: n.position.x + (n.measured?.width ?? 96) / 2,
		y: n.position.y + (n.measured?.height ?? 78) / 2
	});
	const dots = packets.filter((p) => clock >= p.start && clock <= p.end).map((p) => {
		const a = centers.get(p.fromDeviceId);
		const b = centers.get(p.toDeviceId);
		if (!a || !b) return null;
		const t = (clock - p.start) / (p.end - p.start || 1);
		const px = a.x + (b.x - a.x) * t;
		const py = a.y + (b.y - a.y) * t;
		return /* @__PURE__ */ jsx("circle", {
			cx: px,
			cy: py,
			r: 5,
			fill: COLORS[p.kind] ?? "#fff",
			className: "packet-dot"
		}, p.id);
	});
	const rings = dropFlashes.filter((f) => clock >= f.start && clock <= f.until).map((f) => {
		const c = centers.get(f.deviceId);
		if (!c) return null;
		const t = (clock - f.start) / (f.until - f.start || 1);
		return /* @__PURE__ */ jsx("circle", {
			cx: c.x,
			cy: c.y,
			r: 10 + t * 26,
			fill: "none",
			stroke: "#f87171",
			strokeWidth: 2.5,
			opacity: 1 - t
		}, `flash-${f.id}`);
	});
	return /* @__PURE__ */ jsx("svg", {
		className: "packet-layer",
		children: /* @__PURE__ */ jsxs("g", {
			transform: `translate(${x} ${y}) scale(${zoom})`,
			children: [dots, rings]
		})
	});
}
// src/components/Flow.tsx
var nodeTypes = { device: DeviceNode };
var edgeTypes = { floating: FloatingEdge };
var MINIMAP_COLORS = {
	host: "#38bdf8",
	switch: "#a78bfa",
	router: "#34d399",
	firewall: "#fb923c",
	server: "#2dd4bf",
	ap: "#f472b6"
};
var DROPPABLE_KINDS = /* @__PURE__ */ new Set([
	"host",
	"switch",
	"router",
	"firewall",
	"server",
	"ap"
]);
function Flow() {
	const nodes = useStore((s) => s.nodes);
	const edges = useStore((s) => s.edges);
	const onNodesChange = useStore((s) => s.onNodesChange);
	const onEdgesChange = useStore((s) => s.onEdgesChange);
	const onConnect = useStore((s) => s.onConnect);
	const select = useStore((s) => s.select);
	const openTerminal = useStore((s) => s.openTerminal);
	const kids = useStore((s) => s.mode === "kids");
	const lab = useStore((s) => s.lab !== null);
	const tick = useStore((s) => s.tick);
	const addDeviceAt = useStore((s) => s.addDeviceAt);
	const { screenToFlowPosition, fitView } = useReactFlow();
	const loadSeq = useStore((s) => s.loadSeq);
	const fitOptions = {
		padding: lab && window.innerWidth > 720 ? {
			top: "40px",
			bottom: "40px",
			right: "40px",
			left: "400px"
		} : lab ? {
			top: "45%",
			bottom: "20px",
			x: "20px"
		} : .25,
		maxZoom: 1.25
	};
	useEffect(() => {
		if (loadSeq === 0) return;
		const id = requestAnimationFrame(() => fitView(fitOptions));
		return () => cancelAnimationFrame(id);
	}, [loadSeq]);
	useEffect(() => {
		let last = performance.now();
		let raf = 0;
		const step = () => {
			const t = performance.now();
			tick(t - last);
			last = t;
		};
		const loop = () => {
			step();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const interval = window.setInterval(() => {
			if (performance.now() - last > 200) step();
		}, 250);
		return () => {
			cancelAnimationFrame(raf);
			window.clearInterval(interval);
		};
	}, [tick]);
	const onDrop = useCallback((e) => {
		e.preventDefault();
		const kind = e.dataTransfer.getData("application/netsim");
		if (kind === "" || !DROPPABLE_KINDS.has(kind)) return;
		const pos = screenToFlowPosition({
			x: e.clientX,
			y: e.clientY
		});
		addDeviceAt(kind, {
			x: pos.x - 48,
			y: pos.y - 39
		});
	}, [screenToFlowPosition, addDeviceAt]);
	return /* @__PURE__ */ jsxs(ReactFlow, {
		nodes,
		edges,
		nodeTypes,
		edgeTypes,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onNodeClick: (_, n) => select(n.id),
		onPaneClick: () => select(null),
		onNodeDoubleClick: (_, n) => {
			if (!kids && n.data.kind !== "switch") openTerminal(n.id);
		},
		onDrop,
		onDragOver: (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
		},
		connectionMode: ConnectionMode.Loose,
		connectionRadius: 45,
		deleteKeyCode: ["Backspace", "Delete"],
		defaultEdgeOptions: { type: "floating" },
		minZoom: .25,
		maxZoom: 2.5,
		fitView: true,
		fitViewOptions: fitOptions,
		children: [
			/* @__PURE__ */ jsx(Background, {
				gap: 26,
				size: 1.6
			}),
			/* @__PURE__ */ jsx(Controls, { showInteractive: false }),
			/* @__PURE__ */ jsx(MiniMap, {
				pannable: true,
				zoomable: true,
				nodeColor: (n) => MINIMAP_COLORS[n.data.kind] ?? "#888",
				maskColor: "rgba(10, 15, 28, 0.72)",
				bgColor: "#0d1526"
			}),
			/* @__PURE__ */ jsx(PacketLayer, {})
		]
	});
}
// src/components/Palette.tsx
var ITEMS = [
	{
		kind: "host",
		label: "Комп’ютер",
		blurb: "робоча станція Linux",
		kidsBlurb: "ПК або ноутбук"
	},
	{
		kind: "server",
		label: "Сервер",
		blurb: "DHCP / DNS / вебсервер",
		kidsBlurb: "сайти й файли для мережі"
	},
	{
		kind: "switch",
		label: "Світч",
		blurb: "комутатор L2",
		kidsBlurb: "з’єднує пристрої в одну мережу"
	},
	{
		kind: "router",
		label: "Роутер",
		blurb: "пересилає пакети між мережами",
		kidsBlurb: "з’єднує різні мережі"
	},
	{
		kind: "firewall",
		label: "Брандмауер",
		blurb: "роутер + nftables"
	},
	{
		kind: "ap",
		label: "Точка Wi-Fi",
		blurb: "бездротовий міст (SSID)"
	}
];
var KIDS_KINDS = /* @__PURE__ */ new Set([
	"host",
	"server",
	"switch",
	"router"
]);
function Palette() {
	const addDeviceAt = useStore((s) => s.addDeviceAt);
	const nodeCount = useStore((s) => s.nodes.length);
	const kids = useStore((s) => s.mode === "kids");
	const items = kids ? ITEMS.filter((it) => KIDS_KINDS.has(it.kind)) : ITEMS;
	const onDragStart = (e, kind) => {
		e.dataTransfer.setData("application/netsim", kind);
		e.dataTransfer.effectAllowed = "move";
	};
	return /* @__PURE__ */ jsxs("aside", {
		className: "palette",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "palette-title",
				children: "Пристрої"
			}),
			items.map((it) => /* @__PURE__ */ jsxs("button", {
				className: `palette-item kind-${it.kind}`,
				draggable: true,
				onDragStart: (e) => onDragStart(e, it.kind),
				onClick: () => addDeviceAt(it.kind, {
					x: 140 + nodeCount % 5 * 60,
					y: 120 + nodeCount % 7 * 50
				}),
				title: "Перетягни на поле або натисни, щоб додати",
				children: [/* @__PURE__ */ jsx("span", {
					className: "palette-item-icon",
					children: /* @__PURE__ */ jsx(DeviceIcon, {
						kind: it.kind,
						size: 22
					})
				}), /* @__PURE__ */ jsxs("span", {
					className: "palette-item-text",
					children: [/* @__PURE__ */ jsx("span", {
						className: "palette-item-label",
						children: it.label
					}), /* @__PURE__ */ jsx("span", {
						className: "palette-item-blurb",
						children: kids ? it.kidsBlurb ?? it.blurb : it.blurb
					})]
				})]
			}, it.kind)),
			/* @__PURE__ */ jsx("div", {
				className: "palette-hint",
				children: kids ? "Щоб прокласти кабель, потягни від крапки одного пристрою до крапки іншого. Натисни на пристрій, щоб налаштувати його." : "Щоб прокласти кабель, потягни між крапками двох пристроїв. Подвійне натискання на комп’ютер чи роутер відкриває термінал."
			})
		]
	});
}
// src/components/KidsInspector.tsx
var KIND_NAMES = {
	host: "Комп’ютер",
	server: "Сервер",
	switch: "Світч",
	router: "Роутер",
	firewall: "Брандмауер",
	ap: "Точка Wi-Fi"
};
var MASKS = [
	{
		prefix: 24,
		label: "255.255.255.0"
	},
	{
		prefix: 16,
		label: "255.255.0.0"
	},
	{
		prefix: 8,
		label: "255.0.0.0"
	}
];
function PortForm({ device, ifaceName, showName }) {
	const setIfaceIp = useStore((s) => s.setIfaceIp);
	const setNotice = useStore((s) => s.setNotice);
	const iface = device.getInterface(ifaceName);
	const [addr, setAddr] = useState(iface.ip ? ipToString(iface.ip.addr) : "");
	const [prefix, setPrefix] = useState(iface.ip?.prefix ?? 24);
	const peer = iface.link ? iface.link.other(iface).device.name : null;
	const commit = (nextAddr, nextPrefix) => {
		const a = nextAddr.trim();
		if (a !== "" && parseIp(a) === null) {
			setNotice("Адреса — це чотири числа від 0 до 255 через крапку, наприклад 192.168.1.10");
			return;
		}
		const err = setIfaceIp(device.id, ifaceName, a === "" ? "" : `${a}/${nextPrefix}`);
		if (err) setNotice(err);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "kid-port",
		children: [
			showName && /* @__PURE__ */ jsxs("div", {
				className: "kid-port-head",
				children: [
					"Порт ",
					ifaceName,
					/* @__PURE__ */ jsx("span", {
						className: peer ? "kid-peer" : "kid-peer none",
						children: peer ? `→ ${peer}` : "кабель не під’єднано"
					})
				]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "kid-field",
				children: [/* @__PURE__ */ jsx("span", { children: "IP-адреса" }), /* @__PURE__ */ jsx("input", {
					inputMode: "decimal",
					placeholder: "наприклад, 192.168.1.10",
					value: addr,
					onChange: (e) => setAddr(e.target.value.replace(/\/\d*$/, "")),
					onBlur: () => commit(addr, prefix),
					onKeyDown: (e) => {
						if (e.key === "Enter") e.target.blur();
					}
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "kid-field",
				children: [/* @__PURE__ */ jsx("span", { children: "Маска" }), /* @__PURE__ */ jsx("select", {
					value: prefix,
					onChange: (e) => {
						const p = Number(e.target.value);
						setPrefix(p);
						if (addr.trim()) commit(addr, p);
					},
					children: MASKS.map((m) => /* @__PURE__ */ jsx("option", {
						value: m.prefix,
						children: m.label
					}, m.prefix))
				})]
			})
		]
	});
}
function GatewayField({ device }) {
	const setGateway = useStore((s) => s.setGateway);
	const setNotice = useStore((s) => s.setNotice);
	const current = device.staticRoutes.find((r) => r.prefix === 0)?.via;
	const initial = current !== void 0 && current !== null ? ipToString(current) : "";
	const [text, setText] = useState(initial);
	return /* @__PURE__ */ jsxs("label", {
		className: "kid-field",
		children: [/* @__PURE__ */ jsx("span", { children: "Шлюз" }), /* @__PURE__ */ jsx("input", {
			inputMode: "decimal",
			placeholder: "адреса роутера",
			value: text,
			onChange: (e) => setText(e.target.value),
			onBlur: () => {
				if (text.trim() === initial) return;
				const err = setGateway(device.id, text);
				if (err) {
					setNotice(err);
					setText(initial);
				}
			},
			onKeyDown: (e) => {
				if (e.key === "Enter") e.target.blur();
			}
		})]
	});
}
function ConnectionTest({ device }) {
	const connTest = useStore((s) => s.connTest);
	const testConnection = useStore((s) => s.testConnection);
	const others = [...sim.net.devices.values()].filter((d) => d !== device && d instanceof IpDevice).map((d) => d.name).sort();
	const [target, setTarget] = useState(others[0] ?? "");
	const mine = connTest?.fromId === device.id ? connTest : null;
	if (others.length === 0) return null;
	const chosen = others.includes(target) ? target : others[0];
	return /* @__PURE__ */ jsxs("section", {
		className: "kid-conn",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "Перевірити зв’язок" }),
			/* @__PURE__ */ jsxs("div", {
				className: "kid-conn-row",
				children: [/* @__PURE__ */ jsx("select", {
					"aria-label": "Куди надіслати перевірку",
					value: chosen,
					onChange: (e) => setTarget(e.target.value),
					children: others.map((n) => /* @__PURE__ */ jsx("option", {
						value: n,
						children: n
					}, n))
				}), /* @__PURE__ */ jsx("button", {
					className: "btn primary",
					disabled: mine?.state === "running",
					onClick: () => testConnection(device.id, chosen),
					children: mine?.state === "running" ? "Чекаю відповідь…" : "Перевірити"
				})]
			}),
			mine && mine.state !== "running" && /* @__PURE__ */ jsx("div", {
				className: `kid-conn-result ${mine.state}`,
				children: mine.state === "ok" ? `✅ ${mine.to} відповів. Зв’язок є!` : `❌ ${mine.to} не відповів. ${explainFailure(sim.net, device.name, mine.to, mine.detail)}`
			})
		]
	});
}
function visiblePorts(d) {
	const used = d.interfaces.filter((i) => i.link || i.ip);
	const free = d.interfaces.find((i) => !i.link && !i.ip);
	return free ? [...used, free] : used;
}
function KidsInspector() {
	const selected = useStore((s) => s.selected);
	const renameDevice = useStore((s) => s.renameDevice);
	const deleteDevice = useStore((s) => s.deleteDevice);
	useStore((s) => s.nodes);
	useStore((s) => s.edges);
	if (!selected) return null;
	const device = sim.net.devices.get(selected);
	if (!device) return null;
	const ipd = device instanceof IpDevice ? device : null;
	const multiPort = device.interfaces.length > 1;
	return /* @__PURE__ */ jsxs("aside", {
		className: "inspector kids",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "inspector-head",
				children: [/* @__PURE__ */ jsx("input", {
					className: "inspector-name",
					defaultValue: device.name,
					"aria-label": "Назва пристрою",
					onBlur: (e) => renameDevice(device.id, e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") e.target.blur();
					}
				}, device.id + device.name), /* @__PURE__ */ jsx("span", {
					className: `inspector-kind kind-${device.kind}`,
					children: KIND_NAMES[device.kind]
				})]
			}),
			ipd && /* @__PURE__ */ jsxs("section", { children: [visiblePorts(ipd).map((i) => /* @__PURE__ */ jsx(PortForm, {
				device: ipd,
				ifaceName: i.name,
				showName: multiPort
			}, device.id + i.name + (i.ip ? `${i.ip.addr}/${i.ip.prefix}` : "-"))), device.kind !== "router" && /* @__PURE__ */ jsx(GatewayField, { device: ipd }, device.id + String(ipd.staticRoutes.find((r) => r.prefix === 0)?.via))] }),
			device instanceof SwitchDevice && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "kid-note",
					children: "Світч не має IP-адреси. Він передає дані між пристроями, під’єднаними до нього кабелями."
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "kid-ports",
					children: device.interfaces.filter((i) => i.link).map((i) => /* @__PURE__ */ jsxs("li", { children: [
						i.name,
						" → ",
						i.link.other(i).device.name
					] }, i.name))
				}),
				device.interfaces.every((i) => !i.link) && /* @__PURE__ */ jsx("p", {
					className: "kid-note",
					children: "Поки що нічого не під’єднано."
				})
			] }),
			ipd && /* @__PURE__ */ jsx(ConnectionTest, { device: ipd }, device.id),
			/* @__PURE__ */ jsx("div", {
				className: "inspector-actions",
				children: /* @__PURE__ */ jsx("button", {
					className: "btn danger",
					onClick: () => deleteDevice(device.id),
					children: "Видалити пристрій"
				})
			})
		]
	});
}
// src/components/Inspector.tsx
function CommitInput({ value, placeholder, onCommit, mono = true, width }) {
	const setNotice = useStore((s) => s.setNotice);
	const [text, setText] = useState(value);
	const commit = () => {
		if (text.trim() === value) return;
		const err = onCommit(text) ?? null;
		if (err) {
			setNotice(err);
			setText(value);
		}
	};
	return /* @__PURE__ */ jsx("input", {
		className: "iface-ip",
		style: {
			fontFamily: mono ? void 0 : "inherit",
			width
		},
		placeholder,
		value: text,
		onChange: (e) => setText(e.target.value),
		onBlur: commit,
		onKeyDown: (e) => {
			if (e.key === "Enter") e.target.blur();
		}
	});
}
function DhcpPanel({ device }) {
	const toggle = useStore((s) => s.toggleDhcpServer);
	const setField = useStore((s) => s.setDhcpField);
	const cfg = device.dhcpServer;
	return /* @__PURE__ */ jsxs("details", {
		className: "svc",
		open: cfg?.enabled,
		children: [
			/* @__PURE__ */ jsxs("summary", { children: ["DHCP-сервер ", /* @__PURE__ */ jsx("span", {
				className: `svc-state ${cfg?.enabled ? "on" : ""}`,
				children: cfg?.enabled ? "увімк." : "вимк."
			})] }),
			/* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: cfg?.enabled ?? false,
					onChange: () => toggle(device.id)
				}), "роздавати адреси з цього пристрою"]
			}),
			cfg && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "svc-grid",
					children: [
						/* @__PURE__ */ jsx("span", { children: "від" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: ipToString(cfg.rangeStart),
							onCommit: (t) => setField(device.id, "rangeStart", t)
						}, device.id + ipToString(cfg.rangeStart)),
						/* @__PURE__ */ jsx("span", { children: "до" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: ipToString(cfg.rangeEnd),
							onCommit: (t) => setField(device.id, "rangeEnd", t)
						}, device.id + ipToString(cfg.rangeEnd)),
						/* @__PURE__ */ jsx("span", { children: "шлюз" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: cfg.router !== null ? ipToString(cfg.router) : "",
							placeholder: "не роздається",
							onCommit: (t) => setField(device.id, "router", t)
						}, device.id + (cfg.router ?? "r")),
						/* @__PURE__ */ jsx("span", { children: "dns" }),
						/* @__PURE__ */ jsx(CommitInput, {
							value: cfg.dns !== null ? ipToString(cfg.dns) : "",
							placeholder: "не роздається",
							onCommit: (t) => setField(device.id, "dns", t)
						}, device.id + (cfg.dns ?? "d"))
					]
				}),
				cfg.leases.size > 0 && /* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: [...cfg.leases.entries()].map(([mac, ip]) => `${ipToString(ip)}  ${mac}\n`).join("")
				}),
				/* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "Клієнти отримують адресу командою `dhclient`."
				})
			] })
		]
	});
}
function DnsPanel({ device }) {
	const toggle = useStore((s) => s.toggleDnsServer);
	const setRecords = useStore((s) => s.setDnsRecords);
	const setNotice = useStore((s) => s.setNotice);
	const cfg = device.dnsServer;
	const current = cfg ? [...cfg.records.entries()].map(([n, a]) => `${ipToString(a)} ${n}`).join("\n") : "";
	const [text, setText] = useState(current);
	return /* @__PURE__ */ jsxs("details", {
		className: "svc",
		open: cfg?.enabled,
		children: [
			/* @__PURE__ */ jsxs("summary", { children: ["DNS-сервер ", /* @__PURE__ */ jsx("span", {
				className: `svc-state ${cfg?.enabled ? "on" : ""}`,
				children: cfg?.enabled ? "увімк." : "вимк."
			})] }),
			/* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: cfg?.enabled ?? false,
					onChange: () => toggle(device.id)
				}), "відповідати на запити A-записів (udp/53)"]
			}),
			cfg && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("textarea", {
				className: "svc-textarea",
				placeholder: "записи у форматі /etc/hosts:\n10.0.0.20 web.lan",
				value: text,
				onChange: (e) => setText(e.target.value),
				onBlur: () => {
					if (text === current) return;
					const err = setRecords(device.id, text);
					if (err) {
						setNotice(err);
						setText(current);
					}
				}
			}), /* @__PURE__ */ jsx("span", {
				className: "hint",
				children: "Один запис у рядку: <ip> <ім’я>. Перевірка: `dig`."
			})] })
		]
	});
}
function HttpPanel({ device }) {
	const toggle = useStore((s) => s.toggleHttpServer);
	const setPort = useStore((s) => s.setHttpPort);
	const setBody = useStore((s) => s.setHttpBody);
	const cfg = device.httpServer;
	const [body, setBodyText] = useState(cfg?.body ?? "");
	return /* @__PURE__ */ jsxs("details", {
		className: "svc",
		open: cfg?.enabled,
		children: [
			/* @__PURE__ */ jsxs("summary", { children: ["Вебсервер ", /* @__PURE__ */ jsx("span", {
				className: `svc-state ${cfg?.enabled ? "on" : ""}`,
				children: cfg?.enabled ? "увімк." : "вимк."
			})] }),
			/* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: cfg?.enabled ?? false,
					onChange: () => toggle(device.id)
				}), "віддавати сторінку по HTTP"]
			}),
			cfg && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "svc-grid",
					children: [/* @__PURE__ */ jsx("span", { children: "порт" }), /* @__PURE__ */ jsx(CommitInput, {
						value: String(cfg.port),
						onCommit: (t) => setPort(device.id, t),
						width: 70
					}, device.id + cfg.port)]
				}),
				/* @__PURE__ */ jsx("textarea", {
					className: "svc-textarea",
					value: body,
					onChange: (e) => setBodyText(e.target.value),
					onBlur: () => setBody(device.id, body)
				}),
				/* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "Відкрити: `curl http://<адреса>/`."
				})
			] })
		]
	});
}
function ServicesRow({ deviceId, proto }) {
	const setServices = useStore((s) => s.setServices);
	const setNotice = useStore((s) => s.setNotice);
	const device = sim.net.devices.get(deviceId);
	const current = device instanceof IpDevice ? [...device.services[proto]].sort((a, b) => a - b).join(", ") : "";
	const [value, setValue] = useState(current);
	const commit = () => {
		if (value.trim() === current) return;
		const err = setServices(deviceId, proto, value);
		if (err) {
			setNotice(err);
			setValue(current);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "service-row",
		children: [/* @__PURE__ */ jsx("span", {
			className: "service-proto",
			children: proto
		}), /* @__PURE__ */ jsx("input", {
			className: "iface-ip",
			placeholder: "відкриті порти, напр. 22, 80",
			value,
			onChange: (e) => setValue(e.target.value),
			onBlur: commit,
			onKeyDown: (e) => {
				if (e.key === "Enter") e.target.blur();
			}
		})]
	});
}
function IfaceRow({ deviceId, ifaceName }) {
	const setIfaceIp = useStore((s) => s.setIfaceIp);
	const toggleIface = useStore((s) => s.toggleIface);
	const setNotice = useStore((s) => s.setNotice);
	const iface = sim.net.devices.get(deviceId)?.getInterface(ifaceName);
	const current = iface?.ip ? cidrToString(iface.ip.addr, iface.ip.prefix) : "";
	const [value, setValue] = useState(current);
	if (!iface) return null;
	const commit = () => {
		if (value.trim() === current) return;
		const err = setIfaceIp(deviceId, ifaceName, value);
		if (err) {
			setNotice(err);
			setValue(current);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "iface-row",
		children: [
			/* @__PURE__ */ jsx("button", {
				className: `iface-state ${iface.up ? "up" : "down"}`,
				onClick: () => toggleIface(deviceId, ifaceName),
				title: `ip link set ${ifaceName} ${iface.up ? "down" : "up"}`,
				children: iface.up ? "UP" : "DOWN"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "iface-name",
				children: [
					ifaceName,
					/* @__PURE__ */ jsx("span", {
						className: "iface-mac",
						children: iface.mac
					}),
					iface.link ? null : /* @__PURE__ */ jsx("span", {
						className: "iface-unplugged",
						children: "без кабелю"
					})
				]
			}),
			/* @__PURE__ */ jsx("input", {
				className: "iface-ip",
				placeholder: "немає адреси (CIDR)",
				value,
				onChange: (e) => setValue(e.target.value),
				onBlur: commit,
				onKeyDown: (e) => {
					if (e.key === "Enter") e.target.blur();
				}
			})
		]
	});
}
function Inspector() {
	const selected = useStore((s) => s.selected);
	const renameDevice = useStore((s) => s.renameDevice);
	const deleteDevice = useStore((s) => s.deleteDevice);
	const openTerminal = useStore((s) => s.openTerminal);
	useStore((s) => s.uiPulse);
	useStore((s) => s.nodes);
	if (!selected) return null;
	const device = sim.net.devices.get(selected);
	if (!device) return null;
	const ipd = device instanceof IpDevice ? device : null;
	const swd = device instanceof SwitchDevice ? device : null;
	return /* @__PURE__ */ jsxs("aside", {
		className: "inspector",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "inspector-head",
				children: [/* @__PURE__ */ jsx("input", {
					className: "inspector-name",
					defaultValue: device.name,
					onBlur: (e) => renameDevice(device.id, e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") e.target.blur();
					}
				}, device.id + device.name), /* @__PURE__ */ jsx("span", {
					className: `inspector-kind kind-${device.kind}`,
					children: KIND_NAMES[device.kind]
				})]
			}),
			ipd && /* @__PURE__ */ jsxs("div", {
				className: "inspector-forwarding",
				children: [
					"Пересилання пакетів: ",
					/* @__PURE__ */ jsx("strong", { children: ipd.forwarding ? "увімк." : "вимк." }),
					/* @__PURE__ */ jsx("span", {
						className: "hint",
						children: " (sysctl net.ipv4.ip_forward)"
					})
				]
			}),
			ipd && (device.kind === "router" || device.kind === "firewall") && /* @__PURE__ */ jsxs("label", {
				className: "svc-toggle",
				style: { margin: 0 },
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: ipd.ripEnabled,
					onChange: () => useStore.getState().toggleRip(device.id)
				}), "Маршрутизація RIP: оголошувати й вивчати маршрути (udp/520)"]
			}),
			swd instanceof ApDevice && /* @__PURE__ */ jsxs("div", {
				className: "svc-grid",
				children: [/* @__PURE__ */ jsx("span", { children: "SSID" }), /* @__PURE__ */ jsx(CommitInput, {
					value: swd.ssid,
					onCommit: (t) => useStore.getState().setSsid(device.id, t),
					mono: false
				}, device.id + swd.ssid)]
			}),
			/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h3", { children: "Порти" }), device.interfaces.map((i) => /* @__PURE__ */ jsx(IfaceRow, {
				deviceId: device.id,
				ifaceName: i.name
			}, device.id + i.name + (i.ip ? cidrToString(i.ip.addr, i.ip.prefix) : "-")))] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx("h3", { children: "Таблиця маршрутів" }),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: formatRoutes(ipd) || "(порожньо)\n"
				}),
				/* @__PURE__ */ jsx("h3", { children: "Сусіди (ARP)" }),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: formatNeigh(ipd) || "(порожньо)\n"
				})
			] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h3", { children: "DNS-клієнт" }), /* @__PURE__ */ jsxs("div", {
				className: "svc-grid",
				children: [/* @__PURE__ */ jsx("span", { children: "nameserver" }), /* @__PURE__ */ jsx(CommitInput, {
					value: ipd.nameserver !== null ? ipToString(ipd.nameserver) : "",
					placeholder: "немає (задає dhclient)",
					onCommit: (t) => useStore.getState().setNameserver(ipd.id, t)
				}, ipd.id + (ipd.nameserver ?? "ns"))]
			})] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx("h3", { children: "Служби" }),
				/* @__PURE__ */ jsx(DhcpPanel, { device: ipd }, ipd.id + "dhcp"),
				/* @__PURE__ */ jsx(DnsPanel, { device: ipd }, ipd.id + "dns"),
				/* @__PURE__ */ jsx(HttpPanel, { device: ipd }, ipd.id + "http"),
				/* @__PURE__ */ jsx("h3", {
					style: { marginTop: 10 },
					children: "Інші відкриті порти"
				}),
				/* @__PURE__ */ jsx(ServicesRow, {
					deviceId: ipd.id,
					proto: "tcp"
				}, ipd.id + "tcp"),
				/* @__PURE__ */ jsx(ServicesRow, {
					deviceId: ipd.id,
					proto: "udp"
				}, ipd.id + "udp"),
				/* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "Відкриті порти приймають TCP і UDP; перевірка: nc."
				})
			] }),
			ipd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsxs("h3", { children: ["Firewall (nftables)", /* @__PURE__ */ jsx("button", {
					className: "mini-btn",
					onClick: () => useStore.getState().copyDeviceConfig(ipd.id),
					children: "копіювати"
				})] }),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: listRuleset(ipd.fw)
				}),
				ipd.fw.active() && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("h3", { children: "Conntrack" }), /* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: formatConntrack(ipd)
				})] }),
				ipd.fwLog.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("h3", { children: "Журнал брандмауера (нові вгорі)" }), /* @__PURE__ */ jsx("pre", {
					className: "table-pre fw-log",
					children: ipd.fwLog.slice(0, 12).map((e) => `${(e.t / 1e3).toFixed(1)}s ${e.hook.toUpperCase()} ${e.verdict.toUpperCase()} ${e.pkt}\n    ← ${e.rule}\n`).join("")
				})] })
			] }),
			swd && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx("h3", { children: "VLAN портів (access)" }),
				swd.interfaces.filter((i) => i.link).map((i) => /* @__PURE__ */ jsxs("div", {
					className: "service-row",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "service-proto",
							children: i.name
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "hint",
							style: { width: 90 },
							children: ["→ ", sim.net.links.get(i.link.id) ? i.link.other(i).device.name : "?"]
						}),
						/* @__PURE__ */ jsx(CommitInput, {
							value: String(swd.vlanOf(i.name)),
							onCommit: (t) => useStore.getState().setPortVlan(device.id, i.name, t),
							width: 64
						})
					]
				}, device.id + i.name + swd.vlanOf(i.name))),
				swd.interfaces.every((i) => !i.link) && /* @__PURE__ */ jsx("span", {
					className: "hint",
					children: "нічого не під’єднано"
				}),
				/* @__PURE__ */ jsx("h3", {
					style: { marginTop: 10 },
					children: "Таблиця MAC-адрес"
				}),
				/* @__PURE__ */ jsx("pre", {
					className: "table-pre",
					children: swd.macTable.size ? [...swd.macTable.entries()].map(([key, port]) => {
						const [vlan, mac] = key.split("|");
						return `vlan ${vlan.padEnd(5)}${mac}  ${port.name}\n`;
					}).join("") : "(порожньо: світч вивчить адреси з перших кадрів)\n"
				})
			] }),
			ipd && /* @__PURE__ */ jsx("section", {
				className: "inspector-arp-note",
				children: /* @__PURE__ */ jsxs("span", {
					className: "hint",
					children: [
						"Адреси, задані тут, працюють так само, як ",
						/* @__PURE__ */ jsx("code", { children: "ip address add" }),
						" у терміналі."
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "inspector-actions",
				children: [ipd && /* @__PURE__ */ jsx("button", {
					className: "btn",
					onClick: () => openTerminal(device.id),
					children: "Відкрити термінал"
				}), /* @__PURE__ */ jsx("button", {
					className: "btn danger",
					onClick: () => deleteDevice(device.id),
					children: "Видалити пристрій"
				})]
			})
		]
	});
}
// src/components/TerminalDock.tsx
function TerminalPane({ deviceId, active }) {
	const ref = useRef(null);
	useEffect(() => {
		const device = sim.net.devices.get(deviceId);
		if (!(device instanceof IpDevice) || !ref.current) return;
		const session = getSession(device, { onAfterCommand: () => useStore.getState().refresh() });
		if (!session.opened) {
			session.term.open(ref.current);
			session.opened = true;
		} else if (session.term.element && session.term.element.parentElement !== ref.current) ref.current.appendChild(session.term.element);
		session.fit.fit();
	}, [deviceId]);
	useEffect(() => {
		if (!active) return;
		const device = sim.net.devices.get(deviceId);
		if (!(device instanceof IpDevice)) return;
		const session = getSession(device);
		session.fit.fit();
		session.term.focus();
	}, [active, deviceId]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: "term-host",
		style: { display: active ? "block" : "none" }
	});
}
function TerminalDock() {
	const terminals = useStore((s) => s.terminals);
	const activeTerminal = useStore((s) => s.activeTerminal);
	const setActiveTerminal = useStore((s) => s.setActiveTerminal);
	const closeTerminal = useStore((s) => s.closeTerminal);
	useStore((s) => s.uiPulse);
	if (!terminals.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "terminal-dock",
		children: [/* @__PURE__ */ jsx("div", {
			className: "terminal-tabs",
			children: terminals.map((id) => {
				const name = sim.net.devices.get(id)?.name ?? id;
				return /* @__PURE__ */ jsxs("div", {
					className: `terminal-tab${id === activeTerminal ? " active" : ""}`,
					onClick: () => setActiveTerminal(id),
					children: [/* @__PURE__ */ jsx("span", { children: name }), /* @__PURE__ */ jsx("button", {
						className: "tab-close",
						onClick: (e) => {
							e.stopPropagation();
							closeTerminal(id);
						},
						title: "Close terminal",
						children: "×"
					})]
				}, id);
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "terminal-body",
			children: terminals.map((id) => /* @__PURE__ */ jsx(TerminalPane, {
				deviceId: id,
				active: id === activeTerminal
			}, id))
		})]
	});
}
// src/components/Toolbar.tsx
var USER_GUIDE_URL = "https://github.com/zavada123/edu-network/blob/main/docs/USER_GUIDE.md";
function ExportItem({ label, hint, action, close }) {
	const fn = useStore((s) => s[action]);
	return /* @__PURE__ */ jsxs("button", {
		className: "labs-menu-item",
		onClick: () => {
			fn();
			close(false);
		},
		children: [/* @__PURE__ */ jsx("span", {
			className: "labs-menu-title",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "labs-menu-blurb",
			children: hint
		})]
	});
}
function Toolbar() {
	const [labsOpen, setLabsOpen] = useState(false);
	const [exportOpen, setExportOpen] = useState(false);
	const loadBundledLab = useStore((s) => s.loadBundledLab);
	const loadExample = useStore((s) => s.loadExample);
	const loadKidsLab = useStore((s) => s.loadKidsLab);
	const kids = useStore((s) => s.mode === "kids");
	const embedded = useStore((s) => s.embedded);
	const resetLab = useStore((s) => s.resetLab);
	const clock = useStore((s) => s.clock);
	const paused = useStore((s) => s.paused);
	const speed = useStore((s) => s.speed);
	const notice = useStore((s) => s.notice);
	const setPaused = useStore((s) => s.setPaused);
	const setSpeed = useStore((s) => s.setSpeed);
	const newTopology = useStore((s) => s.newTopology);
	const loadDemo = useStore((s) => s.loadDemo);
	const importJson = useStore((s) => s.importJson);
	const shareUrl = useStore((s) => s.shareUrl);
	const setNotice = useStore((s) => s.setNotice);
	const fileRef = useRef(null);
	const onFile = async (f) => {
		if (!f) return;
		const err = importJson(await f.text());
		if (err) setNotice(`Не вдалося відкрити файл: ${err}`);
		if (fileRef.current) fileRef.current.value = "";
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "toolbar",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "brand",
				children: /* @__PURE__ */ jsx("span", {
					className: "brand-name",
					children: "Мережева лабораторія"
				})
			}),
			embedded ? /* @__PURE__ */ jsx("div", {
				className: "toolbar-group",
				children: /* @__PURE__ */ jsx("button", {
					className: "btn",
					onClick: () => resetLab(),
					children: "Почати спочатку"
				})
			}) : /* @__PURE__ */ jsxs("div", {
				className: "toolbar-group",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => newTopology(),
						children: "Нова схема"
					}),
					!kids && /* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => loadDemo(),
						children: "Приклад"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "labs-menu-wrap",
						children: [/* @__PURE__ */ jsx("button", {
							className: "btn",
							onClick: () => setLabsOpen((v) => !v),
							children: "Завдання ▾"
						}), labsOpen && /* @__PURE__ */ jsxs("div", {
							className: "labs-menu",
							onMouseLeave: () => setLabsOpen(false),
							children: [
								KIDS_LABS.map((l, i) => /* @__PURE__ */ jsxs("button", {
									className: "labs-menu-item",
									onClick: () => {
										loadKidsLab(i);
										setLabsOpen(false);
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "labs-menu-title",
										children: l.lab.title
									}), /* @__PURE__ */ jsx("span", {
										className: "labs-menu-blurb",
										children: l.lab.blurb
									})]
								}, l.lab.id)),
								!kids && /* @__PURE__ */ jsx("div", {
									className: "labs-menu-section",
									children: "Лабораторні з терміналом (англ.)"
								}),
								!kids && LABS.map((l, i) => /* @__PURE__ */ jsxs("button", {
									className: "labs-menu-item",
									onClick: () => {
										loadBundledLab(i);
										setLabsOpen(false);
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "labs-menu-title",
										children: l.lab.title
									}), /* @__PURE__ */ jsx("span", {
										className: "labs-menu-blurb",
										children: l.lab.blurb
									})]
								}, l.lab.id)),
								!kids && /* @__PURE__ */ jsx("div", {
									className: "labs-menu-section",
									children: "Приклади мереж"
								}),
								!kids && EXAMPLES.map((ex, i) => /* @__PURE__ */ jsxs("button", {
									className: "labs-menu-item",
									onClick: () => {
										loadExample(i);
										setLabsOpen(false);
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "labs-menu-title",
										children: ex.title
									}), /* @__PURE__ */ jsx("span", {
										className: "labs-menu-blurb",
										children: ex.blurb
									})]
								}, ex.title)),
								/* @__PURE__ */ jsx("div", {
									className: "labs-menu-note",
									children: "Нове завдання замінить те, що зараз на полі."
								})
							]
						})]
					}),
					!kids && /* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => fileRef.current?.click(),
						children: "Відкрити"
					}),
					!kids && /* @__PURE__ */ jsxs("div", {
						className: "labs-menu-wrap",
						children: [/* @__PURE__ */ jsx("button", {
							className: "btn",
							onClick: () => setExportOpen((v) => !v),
							children: "Зберегти ▾"
						}), exportOpen && /* @__PURE__ */ jsxs("div", {
							className: "labs-menu export-menu",
							onMouseLeave: () => setExportOpen(false),
							children: [
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Схема (.json)",
									hint: "зберегти й відкрити пізніше",
									action: "exportJson",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Налаштування (.zip)",
									hint: "справжні setup.sh, nftables.conf, dnsmasq.conf",
									action: "exportConfigs",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "containerlab (.clab.yml)",
									hint: "запустити схему на справжніх контейнерах",
									action: "exportContainerlab",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "docker-compose (.yml)",
									hint: "L2 приблизно, див. примітку у файлі",
									action: "exportCompose",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Малюнок (.svg)",
									hint: "схема для документації",
									action: "exportSvg",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Малюнок (.png)",
									hint: "той самий малюнок, 2×",
									action: "exportPng",
									close: setExportOpen
								}),
								/* @__PURE__ */ jsx(ExportItem, {
									label: "Звіт (.html)",
									hint: "документ для друку з таблицями й схемою",
									action: "exportReport",
									close: setExportOpen
								})
							]
						})]
					}),
					!kids && /* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => shareUrl(),
						children: "Посилання"
					}),
					!kids && /* @__PURE__ */ jsx("a", {
						className: "btn",
						href: USER_GUIDE_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Довідка (англ.)"
					}),
					/* @__PURE__ */ jsx("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json",
						style: { display: "none" },
						onChange: (e) => onFile(e.target.files?.[0])
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "toolbar-group sim-controls",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						onClick: () => setPaused(!paused),
						title: paused ? "Продовжити" : "Пауза",
						children: paused ? "▶ Пуск" : "⏸ Пауза"
					}),
					/* @__PURE__ */ jsxs("select", {
						className: "speed",
						"aria-label": "Швидкість симуляції",
						value: speed,
						onChange: (e) => setSpeed(Number(e.target.value)),
						children: [
							/* @__PURE__ */ jsx("option", {
								value: .25,
								children: "0.25×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: .5,
								children: "0.5×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 1,
								children: "1×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 2,
								children: "2×"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 4,
								children: "4×"
							})
						]
					}),
					!kids && /* @__PURE__ */ jsxs("span", {
						className: "clock",
						children: [
							"t = ",
							(clock / 1e3).toFixed(1),
							" с"
						]
					})
				]
			}),
			notice && /* @__PURE__ */ jsx("div", {
				className: "notice",
				children: notice
			})
		]
	});
}
// src/components/LabPanel.tsx
function Rich({ text }) {
	return /* @__PURE__ */ jsx(Fragment$1, { children: text.split("\n").map((line, li) => /* @__PURE__ */ jsx("p", {
		className: "lab-line",
		children: line.split("`").map((part, i) => i % 2 ? /* @__PURE__ */ jsx("code", { children: part }, i) : /* @__PURE__ */ jsx(Fragment, { children: part }, i))
	}, li)) });
}
function LabPanel() {
	const lab = useStore((s) => s.lab);
	const stepIdx = useStore((s) => s.labStep);
	const results = useStore((s) => s.labResults);
	const checking = useStore((s) => s.labChecking);
	const quizAnswers = useStore((s) => s.quizAnswers);
	const setLabStep = useStore((s) => s.setLabStep);
	const answerQuiz = useStore((s) => s.answerQuiz);
	const checkStep = useStore((s) => s.checkStep);
	const exportAttempt = useStore((s) => s.exportAttempt);
	const closeLab = useStore((s) => s.closeLab);
	const [collapsed, setCollapsed] = useState(false);
	const [openHints, setOpenHints] = useState({});
	const kids = useStore((s) => s.mode === "kids");
	const selfCheck = useStore((s) => s.selfCheck);
	const onNext = useStore((s) => s.onNext);
	const embedded = useStore((s) => s.embedded);
	if (!lab) return null;
	const step = lab.steps[stepIdx];
	const allObjectives = lab.steps.flatMap((s) => s.objectives);
	const passed = allObjectives.filter((o) => results[o.id]?.pass).length;
	if (collapsed) return /* @__PURE__ */ jsxs("button", {
		className: "lab-pill",
		onClick: () => setCollapsed(false),
		children: [
			lab.title,
			" · ",
			passed,
			"/",
			allObjectives.length,
			" ▸"
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "lab-panel",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "lab-head",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "lab-title",
						children: lab.title
					}),
					/* @__PURE__ */ jsx("button", {
						className: "tab-close",
						title: "Згорнути",
						onClick: () => setCollapsed(true),
						children: "–"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "tab-close",
						title: "Закрити завдання (схема залишиться)",
						onClick: () => closeLab(),
						children: "×"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lab-progress",
				children: [/* @__PURE__ */ jsx("div", {
					className: "lab-progress-bar",
					children: /* @__PURE__ */ jsx("div", {
						className: "lab-progress-fill",
						style: { width: `${allObjectives.length ? passed / allObjectives.length * 100 : 0}%` }
					})
				}), /* @__PURE__ */ jsxs("span", { children: [
					"виконано ",
					passed,
					" з ",
					allObjectives.length
				] })]
			}),
			allObjectives.length > 0 && passed === allObjectives.length && /* @__PURE__ */ jsxs("div", {
				className: "lab-done",
				children: ["🎉 Завдання виконано!", onNext && /* @__PURE__ */ jsx("button", {
					className: "btn primary lab-next",
					onClick: () => onNext(),
					children: "Наступна вправа →"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lab-stepnav",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						disabled: stepIdx === 0,
						onClick: () => setLabStep(stepIdx - 1),
						children: "‹"
					}),
					/* @__PURE__ */ jsxs("span", { children: [
						"Крок ",
						stepIdx + 1,
						" з ",
						lab.steps.length,
						": ",
						/* @__PURE__ */ jsx("strong", { children: step.title })
					] }),
					/* @__PURE__ */ jsx("button", {
						className: "btn",
						disabled: stepIdx >= lab.steps.length - 1,
						onClick: () => setLabStep(stepIdx + 1),
						children: "›"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "lab-body",
				children: /* @__PURE__ */ jsx(Rich, { text: step.body })
			}),
			step.objectives.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "lab-objectives",
				children: [step.objectives.map((o) => {
					const r = results[o.id];
					const state = r === void 0 ? "todo" : r.pass ? "pass" : "fail";
					return /* @__PURE__ */ jsxs("div", {
						className: `lab-objective ${state}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "lab-obj-mark",
							children: state === "pass" ? "✓" : state === "fail" ? "✗" : "○"
						}), /* @__PURE__ */ jsxs("span", { children: [
							o.label,
							r && !r.pass && /* @__PURE__ */ jsxs("span", {
								className: "lab-obj-detail",
								children: [" — ", r.detail]
							}),
							o.hint && state !== "pass" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
								" ",
								/* @__PURE__ */ jsx("button", {
									className: "lab-hint-btn",
									onClick: () => setOpenHints({
										...openHints,
										[o.id]: !openHints[o.id]
									}),
									children: openHints[o.id] ? "сховати підказку" : "💡 підказка"
								}),
								openHints[o.id] && /* @__PURE__ */ jsx("span", {
									className: "lab-hint",
									children: o.hint
								})
							] })
						] })]
					}, o.id);
				}), selfCheck && /* @__PURE__ */ jsx("button", {
					className: "btn lab-check",
					disabled: checking,
					onClick: () => checkStep(),
					children: checking ? "Перевіряю (дивись на пакети)…" : "Перевірити"
				})]
			}),
			step.quiz?.map((q, qi) => {
				const qid = `${lab.id}-${stepIdx}-${qi}`;
				const chosen = quizAnswers[qid];
				return /* @__PURE__ */ jsxs("div", {
					className: "lab-quiz",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "lab-quiz-q",
							children: q.q
						}),
						q.options.map((opt, oi) => {
							const isChosen = chosen === oi;
							const cls = isChosen ? oi === q.answer ? "correct" : "wrong" : "";
							return /* @__PURE__ */ jsxs("label", {
								className: `lab-quiz-opt ${cls}`,
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									name: qid,
									checked: isChosen,
									onChange: () => answerQuiz(qid, oi)
								}), opt]
							}, oi);
						}),
						chosen !== void 0 && /* @__PURE__ */ jsx("div", {
							className: `lab-quiz-verdict ${chosen === q.answer ? "correct" : "wrong"}`,
							children: chosen === q.answer ? "Правильно!" : "Не зовсім, спробуй ще."
						})
					]
				}, qid);
			}),
			!kids && !embedded && /* @__PURE__ */ jsx("div", {
				className: "lab-footer",
				children: /* @__PURE__ */ jsx("button", {
					className: "btn",
					onClick: () => exportAttempt(),
					children: "Зберегти роботу для вчителя"
				})
			})
		]
	});
}
// src/App.tsx
function App() {
	const selected = useStore((s) => s.selected);
	const kids = useStore((s) => s.mode === "kids");
	const hasTerminals = useStore((s) => s.terminals.length > 0) && !kids;
	return /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsxs("div", {
		className: `app${hasTerminals ? " with-dock" : ""}${kids ? " kids" : ""}`,
		children: [
			/* @__PURE__ */ jsx(Toolbar, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "main",
				children: [
					/* @__PURE__ */ jsx(Palette, {}),
					/* @__PURE__ */ jsxs("div", {
						className: "canvas",
						children: [/* @__PURE__ */ jsx(Flow, {}), /* @__PURE__ */ jsx(LabPanel, {})]
					}),
					selected && (kids ? /* @__PURE__ */ jsx(KidsInspector, {}) : /* @__PURE__ */ jsx(Inspector, {}))
				]
			}),
			!kids && /* @__PURE__ */ jsx(TerminalDock, {})
		]
	}) });
}
// src/ui/EduNetwork.tsx
var booted = false;
/** The whole network lab: canvas, palette, device form and the task panel. Fills its parent (`--enet-height`). */
function EduNetwork({ mode = "kids", scenario, initialNetwork, selfCheck = true, onChange, onCheck, onNext }) {
	const hooks = useRef({
		onChange,
		onCheck
	});
	hooks.current = {
		onChange,
		onCheck
	};
	useEffect(() => {
		useStore.getState().setEmbedOptions({
			selfCheck,
			onNext: onNext ?? null,
			hooks: scenario ? {
				onChange: (n) => hooks.current.onChange?.(n),
				onCheck: (ok) => hooks.current.onCheck?.(ok)
			} : null
		});
	}, [
		scenario,
		selfCheck,
		onNext
	]);
	useEffect(() => {
		if (scenario) {
			const start = startNetwork(scenario);
			const saved = initialNetwork === void 0 ? null : parseNetwork(initialNetwork);
			const file = saved ? {
				...saved,
				lab: start.lab
			} : start;
			useStore.getState().embedLab(file, start, {
				onChange: (n) => hooks.current.onChange?.(n),
				onCheck: (ok) => hooks.current.onCheck?.(ok)
			});
			return;
		}
		if (booted) return;
		booted = true;
		useStore.getState().boot(mode);
	}, [scenario?.id, mode]);
	return /* @__PURE__ */ jsx(App, {});
}
export { EduNetwork };
