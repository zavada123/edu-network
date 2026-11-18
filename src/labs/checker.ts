// Runs lab objectives against the live simulation. Passive checks read
// engine state; active checks (ping/tcp/dns/http) send real packets and
// wait on the virtual clock, so students watch the grader's traffic.
import type { Network } from '../engine/network';
import { IpDevice } from '../engine/ipdevice';
import { cidrToString, ipToString, networkOf, parseCidr, parseIp, type U32 } from '../engine/ip';
import type { Check, Objective } from './types';

export interface CheckResult {
  id: string;
  pass: boolean;
  detail: string;
}

// Errors from the engine keep real Linux wording for the terminal; the lab panel shows them in Ukrainian.
const SEND_ERRORS: Record<string, string> = {
  'Network is unreachable': 'мережа недосяжна: немає маршруту',
  'Operation not permitted': 'заборонено брандмауером',
};
const ua = (msg: string) => SEND_ERRORS[msg] ?? msg;

const PING_TIMEOUT_MS = 3500;
const TCP_TIMEOUT_MS = 3000;
const HTTP_TIMEOUT_MS = 4000;

function findDevice(net: Network, name: string): IpDevice | null {
  for (const d of net.devices.values()) {
    if (d.name === name && d instanceof IpDevice) return d;
  }
  return null;
}

function targetAddr(net: Network, toDevice?: string, toAddr?: string): U32 | null {
  if (toAddr) return parseIp(toAddr);
  if (toDevice) {
    const d = findDevice(net, toDevice);
    const iface = d?.interfaces.find((i) => i.ip);
    return iface?.ip?.addr ?? null;
  }
  return null;
}

function deviceByName(net: Network, name: string) {
  for (const d of net.devices.values()) if (d.name === name) return d;
  return null;
}

function runOne(net: Network, check: Check, done: (pass: boolean, detail: string) => void): void {
  switch (check.type) {
    case 'linked': {
      const a = deviceByName(net, check.a);
      if (!a) return done(false, `немає пристрою ${check.a}`);
      const ok = a.interfaces.some((i) => i.link && i.link.other(i).device.name === check.b);
      return done(ok, ok ? `${check.a} з’єднано з ${check.b}` : `${check.a} ще не з’єднано з ${check.b}`);
    }
    case 'unique-ips': {
      const owner = new Map<U32, string>();
      for (const d of net.devices.values()) {
        if (!(d instanceof IpDevice)) continue;
        for (const i of d.interfaces) {
          if (!i.ip) continue;
          const other = owner.get(i.ip.addr);
          if (other) return done(false, `${other} і ${d.name} мають однакову адресу ${ipToString(i.ip.addr)}`);
          owner.set(i.ip.addr, d.name);
        }
      }
      return done(true, 'усі адреси різні');
    }
    case 'iface-ip': {
      const d = findDevice(net, check.device);
      const iface = d?.getInterface(check.iface);
      if (!d || !iface) return done(false, `немає пристрою або порту ${check.device}/${check.iface}`);
      if (!iface.ip) return done(false, `у ${check.iface} ще немає адреси`);
      const got = cidrToString(iface.ip.addr, iface.ip.prefix);
      if (check.cidr) return done(got === check.cidr, `${check.iface} має адресу ${got}`);
      if (check.inSubnet) {
        const net_ = parseCidr(check.inSubnet);
        if (!net_) return done(false, 'помилка в завданні: неправильна підмережа');
        const ok =
          networkOf(iface.ip.addr, net_.prefix) === networkOf(net_.addr, net_.prefix) &&
          iface.ip.prefix === net_.prefix;
        return done(ok, `${check.iface} має адресу ${got}`);
      }
      return done(true, `${check.iface} має адресу ${got}`);
    }
    case 'default-route': {
      const d = findDevice(net, check.device);
      if (!d) return done(false, `немає пристрою ${check.device}`);
      const def = d.routes().find((r) => r.prefix === 0);
      if (!def) return done(false, 'шлюз не задано');
      if (check.via) {
        const via = parseIp(check.via);
        return done(
          def.via === via,
          `шлюз: ${def.via !== null ? ipToString(def.via) : '(напряму)'}`,
        );
      }
      return done(true, 'шлюз задано');
    }
    case 'forwarding': {
      const d = findDevice(net, check.device);
      if (!d) return done(false, `немає пристрою ${check.device}`);
      return done(d.forwarding === check.expect, `пересилання пакетів: ${d.forwarding ? 'увімкнено' : 'вимкнено'}`);
    }
    case 'fw-policy': {
      const d = findDevice(net, check.device);
      if (!d) return done(false, `немає пристрою ${check.device}`);
      const chain = d.fw.filter[check.hook];
      if (!chain.declared) return done(false, `ланцюжок ${check.hook} не створено`);
      return done(chain.policy === check.policy, `політика ${check.hook}: ${chain.policy}`);
    }
    case 'ping': {
      const from = findDevice(net, check.from);
      if (!from) return done(false, `немає пристрою ${check.from}`);
      const target = targetAddr(net, check.toDevice, check.toAddr);
      if (target === null) return done(false, 'у пристрою-адресата немає адреси');
      const wantSuccess = check.expect === 'success';
      const id = from.allocIcmpId();
      let finished = false;
      const finish = (gotReply: boolean, note: string) => {
        if (finished) return;
        finished = true;
        from.offIcmp(id);
        done(gotReply === wantSuccess, note);
      };
      from.onIcmp(id, (ev) => {
        if (ev.type === 'reply') finish(true, `відповідь від ${ipToString(ev.from)}`);
        else if (ev.type === 'unreachable') finish(false, `адресат недосяжний (повідомив ${ipToString(ev.from)})`);
        else if (ev.type === 'send-error') finish(false, ua(ev.message));
      });
      const err = from.sendEcho(target, id, 1);
      if (err) return finish(false, ua(err));
      net.scheduler.schedule(PING_TIMEOUT_MS, () => finish(false, 'немає відповіді (час вичерпано)'));
      return;
    }
    case 'tcp': {
      const from = findDevice(net, check.from);
      if (!from) return done(false, `немає пристрою ${check.from}`);
      const target = targetAddr(net, check.toDevice, check.toAddr);
      if (target === null) return done(false, 'у пристрою-адресата немає адреси');
      const err = from.connectTcp(target, check.port, TCP_TIMEOUT_MS, (r) => {
        const observed = r === 'open' ? 'open' : r === 'refused' ? 'refused' : 'filtered';
        done(observed === check.expect, `порт ${check.port}: ${observed}`);
      });
      if (err) done(check.expect === 'filtered', err);
      return;
    }
    case 'dns': {
      const from = findDevice(net, check.from);
      if (!from) return done(false, `немає пристрою ${check.from}`);
      if (from.nameserver === null) return done(false, 'DNS-сервер не задано');
      from.resolveDns(check.name, from.nameserver, (r) => {
        if (typeof r === 'number') {
          if (check.expect !== 'resolves') return done(false, `ім’я відповідає ${ipToString(r)}`);
          if (check.addr) return done(ipToString(r) === check.addr, `ім’я відповідає ${ipToString(r)}`);
          return done(true, `ім’я відповідає ${ipToString(r)}`);
        }
        if (r === null) return done(check.expect === 'nxdomain', 'такого імені немає (NXDOMAIN)');
        return done(false, `пошук імені не вдався (${r})`);
      });
      return;
    }
    case 'http': {
      const from = findDevice(net, check.from);
      if (!from) return done(false, `немає пристрою ${check.from}`);
      let rest = check.url.startsWith('http://') ? check.url.slice(7) : check.url;
      const slash = rest.indexOf('/');
      const hostPort = slash < 0 ? rest : rest.slice(0, slash);
      const path = slash < 0 ? '/' : rest.slice(slash);
      const colon = hostPort.indexOf(':');
      const host = colon < 0 ? hostPort : hostPort.slice(0, colon);
      const port = colon < 0 ? 80 : Number(hostPort.slice(colon + 1));
      const wantOk = check.expect === 'ok';
      const withIp = (ip: U32) => {
        const err = from.httpGet(ip, port, path, host, HTTP_TIMEOUT_MS, (r) => {
          if (r.ok) {
            if (!wantOk) return done(false, `сторінка відкрилася (HTTP ${r.status})`);
            if (check.contains && !r.body.includes(check.contains))
              return done(false, 'на сторінці немає потрібного тексту');
            return done(true, `HTTP ${r.status} ${r.reason}`);
          }
          return done(!wantOk, `сторінка не відкрилася (${r.error})`);
        });
        if (err) done(!wantOk, err);
      };
      const literal = parseIp(host);
      if (literal !== null) return withIp(literal);
      if (from.nameserver === null) return done(!wantOk, 'не вдалося знайти ім’я: DNS-сервер не задано');
      from.resolveDns(host, from.nameserver, (r) => {
        if (typeof r === 'number') withIp(r);
        else done(!wantOk, `не вдалося знайти ім’я ${host}`);
      });
      return;
    }
  }
}

// Sequential so the probe traffic reads clearly on the canvas.
export function runChecks(
  net: Network,
  objectives: Objective[],
  onResult: (r: CheckResult) => void,
  onDone: () => void,
): void {
  let i = 0;
  const next = () => {
    if (i >= objectives.length) {
      onDone();
      return;
    }
    const obj = objectives[i++];
    runOne(net, obj.check, (pass, detail) => {
      onResult({ id: obj.id, pass, detail });
      net.scheduler.schedule(150, next);
    });
  };
  next();
}
