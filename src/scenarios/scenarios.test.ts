import { describe, expect, it } from 'vitest';
import { grade, parseNetwork, referenceNetwork, scenarios, startNetwork, describeNetwork, LIMITS } from './index';

describe('scenario library', () => {
  it('has unique ids and a passport for each exercise', () => {
    expect(new Set(scenarios.map((s) => s.id)).size).toBe(scenarios.length);
    for (const s of scenarios) expect(s.passports.length).toBeGreaterThan(0);
  });

  for (const s of scenarios) {
    it(`${s.id}: the start network does not solve it, the reference does`, () => {
      const start = grade(s, startNetwork(s));
      expect(start.status).toBe('ok');
      if (start.status === 'ok') expect(start.results.some((r) => !r.ok)).toBe(true);
      const ref = grade(s, referenceNetwork(s));
      expect(ref.status).toBe('ok');
      if (ref.status === 'ok') expect(ref.results.filter((r) => !r.ok)).toEqual([]);
    });
  }
});

describe('parseNetwork', () => {
  const ok = referenceNetwork(scenarios[0]);

  it('drops the lab and keeps devices and cables', () => {
    const p = parseNetwork(ok);
    expect(p).not.toBeNull();
    expect(p!.lab).toBeUndefined();
    expect(p!.devices.length).toBe(ok.devices.length);
    expect(p!.links.length).toBe(ok.links.length);
  });

  it('rejects malformed and oversized answers', () => {
    expect(parseNetwork(null)).toBeNull();
    expect(parseNetwork({ app: 'other', version: 1, devices: [], links: [] })).toBeNull();
    expect(parseNetwork({ ...ok, devices: [{ ...ok.devices[0], kind: 'toaster' }] })).toBeNull();
    expect(parseNetwork({ ...ok, devices: [ok.devices[0], ok.devices[0]] })).toBeNull();
    expect(parseNetwork({ ...ok, links: [{ id: 'x', a: ['nope', 'eth0'], b: ['sw1', 'eth0'] }] })).toBeNull();
    const many = Array.from({ length: LIMITS.devices + 1 }, (_, i) => ({ ...ok.devices[0], id: `d${i}`, name: `d${i}` }));
    expect(parseNetwork({ ...ok, devices: many, links: [] })).toBeNull();
  });

  it('grades a forged answer as invalid', () => {
    expect(grade(scenarios[0], { hello: 1 }).status).toBe('invalid');
  });

  it('describes a network for the teacher', () => {
    const lines = describeNetwork(ok);
    expect(lines.join('\n')).toContain('pc1: 192.168.1.10/24');
    expect(lines.at(-1)).toContain('Кабелі');
  });
});
