// The exercise library for EduProstir: each exercise is a kids lab (start network + goals) with a card text,
// a grade, the topic passports it belongs to, and a reference network that solves it.
// The site grades on the server with `grade`: it parses the student's network again with `parseNetwork`
// and runs the goals of the library exercise, never the goals inside the answer.
import type { DeviceKind } from '../engine/device';
import { restoreNetwork, type SaveFile, type SavedDevice, type SavedLink } from '../engine/serialize';
import { runChecks, type CheckResult } from '../labs/checker';
import { KIDS_LABS } from '../labs/kids';
import type { Objective } from '../labs/types';

export type ScenarioTopic = 'lan' | 'addresses' | 'routing';

export interface Scenario {
  readonly id: string;
  /** School grade shown on the card. */
  readonly grade: number;
  readonly title: string;
  readonly topic: ScenarioTopic;
  /** One line for the catalog card. */
  readonly summary: string;
  /** The task as the student reads it on a card, one action per line. */
  readonly task: ReadonlyArray<string>;
  /** Topic passports in EduProstir this exercise belongs to (`inf5-07`). */
  readonly passports: ReadonlyArray<string>;
  /** The start network with the lab (steps, goals, hints). */
  readonly file: SaveFile;
  /** A network that meets every goal: the reference answer of a task. */
  readonly reference: SaveFile;
}

/** Limits of an answer. The kids exercises use a handful of devices; more is a forged or broken answer. */
export const LIMITS = {
  devices: 40,
  links: 80,
  ifaces: 8,
  routes: 16,
  name: 32,
} as const;

const KINDS: ReadonlySet<DeviceKind> = new Set(['host', 'server', 'switch', 'router', 'firewall', 'ap']);

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

const labOf = (id: string): SaveFile => {
  const f = KIDS_LABS.find((l) => l.lab?.id === id);
  if (!f) throw new Error(`no kids lab ${id}`);
  return f;
};

type Edit = (devices: SavedDevice[], links: SavedLink[]) => void;

const solved = (file: SaveFile, edit: Edit): SaveFile => {
  const devices = clone(file.devices);
  const links = clone(file.links);
  edit(devices, links);
  return { app: 'netsim', version: 1, devices, links };
};

const setIp = (devices: SavedDevice[], name: string, iface: string, cidr: string) => {
  const d = devices.find((x) => x.name === name)!;
  d.ifaces = [...d.ifaces.filter((i) => i.name !== iface), { name: iface, ip: cidr, up: true }];
};

const setGateway = (devices: SavedDevice[], name: string, via: string) => {
  const d = devices.find((x) => x.name === name)!;
  d.routes = [{ dest: '0.0.0.0/0', via, dev: 'eth0' }];
};

const firstNetwork = labOf('kids-first-network');
const findMistake = labOf('kids-find-the-mistake');
const routerGateway = labOf('kids-router-gateway');

export const scenarios: ReadonlyArray<Scenario> = [
  {
    id: 'kids-first-network',
    grade: 5,
    title: 'Перша мережа',
    topic: 'lan',
    summary: 'З’єднай два комп’ютери через світч і перевір зв’язок.',
    task: [
      'Під’єднай pc1 і pc2 кабелями до світча.',
      'Дай комп’ютерам адреси 192.168.1.10 і 192.168.1.20.',
      'Перевір зв’язок від pc1 до pc2.',
    ],
    passports: ['inf5-07'],
    file: firstNetwork,
    reference: solved(firstNetwork, (devices, links) => {
      links.push(
        { id: 'pc1.eth0-sw1.eth0', a: ['pc1', 'eth0'], b: ['sw1', 'eth0'] },
        { id: 'pc2.eth0-sw1.eth1', a: ['pc2', 'eth0'], b: ['sw1', 'eth1'] },
      );
      setIp(devices, 'pc1', 'eth0', '192.168.1.10/24');
      setIp(devices, 'pc2', 'eth0', '192.168.1.20/24');
    }),
  },
  {
    id: 'kids-find-the-mistake',
    grade: 5,
    title: 'Знайди помилку',
    topic: 'addresses',
    summary: 'Кабелі на місці, а зв’язку немає. Виправ адреси.',
    task: [
      'Перевір зв’язок від pc1 до pc2 і порівняй їхні адреси.',
      'Виправ адресу, яка не з тієї мережі.',
      'Знайди двійника: у кожного комп’ютера має бути своя адреса.',
    ],
    passports: ['inf5-07'],
    file: findMistake,
    reference: solved(findMistake, (devices) => {
      setIp(devices, 'pc2', 'eth0', '192.168.1.20/24');
      setIp(devices, 'pc3', 'eth0', '192.168.1.30/24');
    }),
  },
  {
    id: 'kids-router-gateway',
    grade: 5,
    title: 'Роутер і шлюз',
    topic: 'routing',
    summary: 'Дві мережі й роутер між ними. Задай комп’ютерам шлюз.',
    task: [
      'Подивись адреси роутера r1.',
      'Задай pc1 і pc2 шлюз: адресу роутера з їхньої мережі.',
      'Перевір зв’язок від pc1 до pc2.',
    ],
    passports: ['inf5-07', 'inf5-08'],
    file: routerGateway,
    reference: solved(routerGateway, (devices) => {
      setGateway(devices, 'pc1', '192.168.1.1');
      setGateway(devices, 'pc2', '192.168.2.1');
    }),
  },
];

export const scenarioById = (id: string): Scenario | undefined => scenarios.find((s) => s.id === id);

/** The start network of an exercise, with its lab. */
export const startNetwork = (s: Scenario): SaveFile => clone(s.file);

/** A network that solves the exercise, with its lab. */
export const referenceNetwork = (s: Scenario): SaveFile => ({ ...clone(s.reference), lab: clone(s.file.lab) });

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const str = (x: unknown, max: number): x is string => typeof x === 'string' && x.length > 0 && x.length <= max;
const num = (x: unknown): x is number => typeof x === 'number' && Number.isFinite(x) && Math.abs(x) < 1e6;

/**
 * Reads a network from untrusted JSON (an answer from the browser). Keeps only devices, addresses, routes and
 * cables, within `LIMITS`; drops services, firewall rules and the lab. `null` when anything is malformed.
 */
export function parseNetwork(data: unknown): SaveFile | null {
  if (!isObj(data) || data.app !== 'netsim' || data.version !== 1) return null;
  const { devices, links } = data;
  if (!Array.isArray(devices) || !Array.isArray(links)) return null;
  if (devices.length > LIMITS.devices || links.length > LIMITS.links) return null;
  const ids = new Set<string>();
  const outDevices: SavedDevice[] = [];
  for (const d of devices) {
    if (!isObj(d) || !str(d.id, LIMITS.name) || !str(d.name, LIMITS.name)) return null;
    if (typeof d.kind !== 'string' || !KINDS.has(d.kind as DeviceKind)) return null;
    if (!num(d.x) || !num(d.y) || ids.has(d.id)) return null;
    if (!Array.isArray(d.ifaces) || d.ifaces.length > LIMITS.ifaces) return null;
    if (!Array.isArray(d.routes) || d.routes.length > LIMITS.routes) return null;
    ids.add(d.id);
    const ifaces = [];
    for (const i of d.ifaces) {
      if (!isObj(i) || !str(i.name, 8) || typeof i.up !== 'boolean') return null;
      if (i.ip !== null && !str(i.ip, 18)) return null;
      ifaces.push({ name: i.name, ip: i.ip as string | null, up: i.up });
    }
    const routes = [];
    for (const r of d.routes) {
      if (!isObj(r) || !str(r.dest, 18) || !str(r.dev, 8)) return null;
      if (r.via !== null && !str(r.via, 15)) return null;
      routes.push({ dest: r.dest, via: r.via as string | null, dev: r.dev });
    }
    outDevices.push({
      id: d.id,
      kind: d.kind as DeviceKind,
      name: d.name,
      x: d.x,
      y: d.y,
      forwarding: d.kind === 'router' || d.kind === 'firewall' ? d.forwarding === true : false,
      ifaces,
      routes,
    });
  }
  const outLinks: SavedLink[] = [];
  for (const l of links) {
    if (!isObj(l) || !str(l.id, 80) || !Array.isArray(l.a) || !Array.isArray(l.b)) return null;
    const [ad, ai] = l.a;
    const [bd, bi] = l.b;
    if (!str(ad, LIMITS.name) || !str(ai, 8) || !str(bd, LIMITS.name) || !str(bi, 8)) return null;
    if (!ids.has(ad) || !ids.has(bd)) return null;
    outLinks.push({ id: l.id, a: [ad, ai], b: [bd, bi] });
  }
  return { app: 'netsim', version: 1, devices: outDevices, links: outLinks };
}

export interface GoalResult {
  readonly ok: boolean;
  /** The goal as the student reads it. */
  readonly text: string;
  /** What the check saw, for example «у eth0 ще немає адреси». */
  readonly detail: string;
  readonly hint?: string;
}

export type Grade = { status: 'ok'; results: ReadonlyArray<GoalResult> } | { status: 'invalid' };

const goalsOf = (s: Scenario): Objective[] => (s.file.lab?.steps ?? []).flatMap((st) => st.objectives);

/** Parses the network again and checks every goal of the exercise in a fresh simulation. Synchronous. */
export function grade(s: Scenario, data: unknown): Grade {
  const parsed = parseNetwork(data);
  if (parsed === null) return { status: 'invalid' };
  let net;
  try {
    net = restoreNetwork(parsed);
  } catch {
    return { status: 'invalid' };
  }
  const goals = goalsOf(s);
  const found: Record<string, CheckResult> = {};
  let finished = false;
  runChecks(net, goals, (r) => (found[r.id] = r), () => (finished = true));
  // Every check ends on a virtual timeout of a few seconds; ten simulated minutes is far beyond that.
  net.scheduler.advanceTo(net.scheduler.now + 600_000);
  if (!finished) return { status: 'invalid' };
  return {
    status: 'ok',
    results: goals.map((g) => ({
      ok: found[g.id]?.pass ?? false,
      text: g.label,
      detail: found[g.id]?.detail ?? '',
      ...(g.hint ? { hint: g.hint } : {}),
    })),
  };
}

/** The network as a teacher reads it: devices with their addresses and gateways, and the cables. */
export function describeNetwork(data: unknown): ReadonlyArray<string> {
  const parsed = parseNetwork(data);
  if (parsed === null) return ['Схему мережі пошкоджено'];
  const names = new Map(parsed.devices.map((d) => [d.id, d.name]));
  const lines = parsed.devices.map((d) => {
    const ips = d.ifaces.filter((i) => i.ip).map((i) => i.ip);
    const gw = d.routes.find((r) => r.dest === '0.0.0.0/0')?.via;
    return `${d.name}: ${ips.length ? ips.join(', ') : 'без адреси'}${gw ? `, шлюз ${gw}` : ''}`;
  });
  const cables = parsed.links.map((l) => `${names.get(l.a[0])}–${names.get(l.b[0])}`);
  return [...lines, `Кабелі: ${cables.length ? cables.join(', ') : 'немає'}`];
}
