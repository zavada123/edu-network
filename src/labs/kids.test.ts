import { describe, expect, it } from 'vitest';
import { restoreNetwork } from '../engine/serialize';
import type { Network } from '../engine/network';
import { IpDevice } from '../engine/ipdevice';
import { parseCidr, parseIp } from '../engine/ip';
import { KIDS_LABS } from './kids';
import { runChecks, type CheckResult } from './checker';
import type { Objective } from './types';

function labFile(id: string) {
  const f = KIDS_LABS.find((l) => l.lab?.id === id);
  expect(f).toBeTruthy();
  return JSON.parse(JSON.stringify(f));
}

function device(net: Network, name: string): IpDevice {
  const d = [...net.devices.values()].find((x) => x.name === name);
  expect(d).toBeTruthy();
  return d as IpDevice;
}

function check(net: Network, objectives: Objective[]): Record<string, CheckResult> {
  const results: Record<string, CheckResult> = {};
  let finished = false;
  runChecks(net, objectives, (r) => (results[r.id] = r), () => (finished = true));
  net.scheduler.advanceTo(net.scheduler.now + 120_000);
  expect(finished).toBe(true);
  return results;
}

const objectivesOf = (file: { lab?: { steps: { objectives: Objective[] }[] } }) =>
  file.lab!.steps.flatMap((s) => s.objectives);

function cable(net: Network, a: string, b: string): void {
  const id = (n: string) => [...net.devices.values()].find((x) => x.name === n)!.id;
  net.connect(id(a), id(b));
}

describe('kids labs', () => {
  it('every objective has a hint', () => {
    for (const f of KIDS_LABS) for (const o of objectivesOf(f)) expect(o.hint, o.id).toBeTruthy();
  });

  it('lab 1: fails on the start network, passes once cabled and addressed', () => {
    const file = labFile('kids-first-network');
    const net = restoreNetwork(file);
    let r = check(net, objectivesOf(file));
    expect(Object.values(r).every((x) => !x.pass)).toBe(true);

    cable(net, 'pc1', 'sw1');
    cable(net, 'pc2', 'sw1');
    device(net, 'pc1').getInterface('eth0')!.ip = parseCidr('192.168.1.10/24');
    device(net, 'pc2').getInterface('eth0')!.ip = parseCidr('192.168.1.20/24');
    r = check(net, objectivesOf(file));
    expect(Object.values(r).filter((x) => !x.pass)).toEqual([]);
  });

  it('lab 2: wrong subnet and a duplicate address both fail until fixed', () => {
    const file = labFile('kids-find-the-mistake');
    const net = restoreNetwork(file);
    let r = check(net, objectivesOf(file));
    expect(r['k2-ping12'].pass).toBe(false);
    expect(r['k2-unique'].pass).toBe(false);
    expect(r['k2-unique'].detail).toContain('однакову адресу');

    device(net, 'pc2').getInterface('eth0')!.ip = parseCidr('192.168.1.20/24');
    device(net, 'pc3').getInterface('eth0')!.ip = parseCidr('192.168.1.30/24');
    r = check(net, objectivesOf(file));
    expect(Object.values(r).filter((x) => !x.pass)).toEqual([]);
  });

  it('lab 3: ping across the router needs a gateway on both hosts', () => {
    const file = labFile('kids-router-gateway');
    const net = restoreNetwork(file);
    let r = check(net, objectivesOf(file));
    expect(r['k3-ping'].pass).toBe(false);

    device(net, 'pc1').addRoute(0, 0, parseIp('192.168.1.1'));
    r = check(net, objectivesOf(file));
    expect(r['k3-ping'].pass).toBe(false);

    device(net, 'pc2').addRoute(0, 0, parseIp('192.168.2.1'));
    r = check(net, objectivesOf(file));
    expect(Object.values(r).filter((x) => !x.pass)).toEqual([]);
  });
});

describe('explainFailure', () => {
  it('names the missing gateway when the target is in another network', async () => {
    const { explainFailure } = await import('../kids/explain');
    const net = restoreNetwork(labFile('kids-router-gateway'));
    expect(explainFailure(net, 'pc1', 'pc2', 'x')).toContain('задай pc1 шлюз');
    device(net, 'pc1').addRoute(0, 0, parseIp('192.168.1.1'));
    expect(explainFailure(net, 'pc1', 'pc2', 'x')).toContain('у pc2 не задано шлюз');
  });

  it('spots a missing address and a missing cable', async () => {
    const { explainFailure } = await import('../kids/explain');
    const net = restoreNetwork(labFile('kids-first-network'));
    expect(explainFailure(net, 'pc1', 'pc2', 'x')).toContain('немає IP-адреси');
    device(net, 'pc1').getInterface('eth0')!.ip = parseCidr('192.168.1.10/24');
    device(net, 'pc2').getInterface('eth0')!.ip = parseCidr('192.168.1.20/24');
    expect(explainFailure(net, 'pc1', 'pc2', 'x')).toContain('не під’єднано кабелем');
  });
});
