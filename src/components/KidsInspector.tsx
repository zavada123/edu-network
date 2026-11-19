// The device form in the kids mode: name, address with a mask picker,
// gateway and a «Перевірити зв'язок» button. No tables, no terminal.
import { useState } from 'react';
import { useStore } from '../store';
import { sim } from '../sim';
import { IpDevice } from '../engine/ipdevice';
import { SwitchDevice } from '../engine/switch';
import type { DeviceKind } from '../engine/device';
import { ipToString, parseIp } from '../engine/ip';
import { explainFailure } from '../kids/explain';

export const KIND_NAMES: Record<DeviceKind, string> = {
  host: 'Комп’ютер',
  server: 'Сервер',
  switch: 'Світч',
  router: 'Роутер',
  firewall: 'Брандмауер',
  ap: 'Точка Wi-Fi',
};

const MASKS: { prefix: number; label: string }[] = [
  { prefix: 24, label: '255.255.255.0' },
  { prefix: 16, label: '255.255.0.0' },
  { prefix: 8, label: '255.0.0.0' },
];

function PortForm({ device, ifaceName, showName }: { device: IpDevice; ifaceName: string; showName: boolean }) {
  const setIfaceIp = useStore((s) => s.setIfaceIp);
  const setNotice = useStore((s) => s.setNotice);
  const iface = device.getInterface(ifaceName)!;
  const [addr, setAddr] = useState(iface.ip ? ipToString(iface.ip.addr) : '');
  const [prefix, setPrefix] = useState(iface.ip?.prefix ?? 24);
  const peer = iface.link ? iface.link.other(iface).device.name : null;

  const commit = (nextAddr: string, nextPrefix: number) => {
    const a = nextAddr.trim();
    if (a !== '' && parseIp(a) === null) {
      setNotice('Адреса — це чотири числа від 0 до 255 через крапку, наприклад 192.168.1.10');
      return;
    }
    const err = setIfaceIp(device.id, ifaceName, a === '' ? '' : `${a}/${nextPrefix}`);
    if (err) setNotice(err);
  };

  return (
    <div className="kid-port">
      {showName && (
        <div className="kid-port-head">
          Порт {ifaceName}
          <span className={peer ? 'kid-peer' : 'kid-peer none'}>{peer ? `→ ${peer}` : 'кабель не під’єднано'}</span>
        </div>
      )}
      <label className="kid-field">
        <span>IP-адреса</span>
        <input
          inputMode="decimal"
          placeholder="наприклад, 192.168.1.10"
          value={addr}
          onChange={(e) => setAddr(e.target.value.replace(/\/\d*$/, ''))}
          onBlur={() => commit(addr, prefix)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
          }}
        />
      </label>
      <label className="kid-field">
        <span>Маска</span>
        <select
          value={prefix}
          onChange={(e) => {
            const p = Number(e.target.value);
            setPrefix(p);
            if (addr.trim()) commit(addr, p);
          }}
        >
          {MASKS.map((m) => (
            <option key={m.prefix} value={m.prefix}>
              {m.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function GatewayField({ device }: { device: IpDevice }) {
  const setGateway = useStore((s) => s.setGateway);
  const setNotice = useStore((s) => s.setNotice);
  const current = device.staticRoutes.find((r) => r.prefix === 0)?.via;
  const initial = current !== undefined && current !== null ? ipToString(current) : '';
  const [text, setText] = useState(initial);
  return (
    <label className="kid-field">
      <span>Шлюз</span>
      <input
        inputMode="decimal"
        placeholder="адреса роутера"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          if (text.trim() === initial) return;
          const err = setGateway(device.id, text);
          if (err) {
            setNotice(err);
            setText(initial);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
        }}
      />
    </label>
  );
}

function ConnectionTest({ device }: { device: IpDevice }) {
  const connTest = useStore((s) => s.connTest);
  const testConnection = useStore((s) => s.testConnection);
  const others = [...sim.net.devices.values()]
    .filter((d) => d !== device && d instanceof IpDevice)
    .map((d) => d.name)
    .sort();
  const [target, setTarget] = useState(others[0] ?? '');
  const mine = connTest?.fromId === device.id ? connTest : null;
  if (others.length === 0) return null;
  const chosen = others.includes(target) ? target : others[0];

  return (
    <section className="kid-conn">
      <h3>Перевірити зв’язок</h3>
      <div className="kid-conn-row">
        <select aria-label="Куди надіслати перевірку" value={chosen} onChange={(e) => setTarget(e.target.value)}>
          {others.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button
          className="btn primary"
          disabled={mine?.state === 'running'}
          onClick={() => testConnection(device.id, chosen)}
        >
          {mine?.state === 'running' ? 'Чекаю відповідь…' : 'Перевірити'}
        </button>
      </div>
      {mine && mine.state !== 'running' && (
        <div className={`kid-conn-result ${mine.state}`}>
          {mine.state === 'ok'
            ? `✅ ${mine.to} відповів. Зв’язок є!`
            : `❌ ${mine.to} не відповів. ${explainFailure(sim.net, device.name, mine.to, mine.detail)}`}
        </div>
      )}
    </section>
  );
}

// A router has four ports; show the ones in use plus one free port to cable next.
function visiblePorts(d: IpDevice) {
  const used = d.interfaces.filter((i) => i.link || i.ip);
  const free = d.interfaces.find((i) => !i.link && !i.ip);
  return free ? [...used, free] : used;
}

export function KidsInspector() {
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

  return (
    <aside className="inspector kids">
      <div className="inspector-head">
        <input
          key={device.id + device.name}
          className="inspector-name"
          defaultValue={device.name}
          aria-label="Назва пристрою"
          onBlur={(e) => renameDevice(device.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
          }}
        />
        <span className={`inspector-kind kind-${device.kind}`}>{KIND_NAMES[device.kind]}</span>
      </div>

      {ipd && (
        <section>
          {visiblePorts(ipd).map((i) => (
            <PortForm
              key={device.id + i.name + (i.ip ? `${i.ip.addr}/${i.ip.prefix}` : '-')}
              device={ipd}
              ifaceName={i.name}
              showName={multiPort}
            />
          ))}
          {device.kind !== 'router' && (
            <GatewayField key={device.id + String(ipd.staticRoutes.find((r) => r.prefix === 0)?.via)} device={ipd} />
          )}
        </section>
      )}

      {device instanceof SwitchDevice && (
        <section>
          <p className="kid-note">
            Світч не має IP-адреси. Він передає дані між пристроями, під’єднаними до нього кабелями.
          </p>
          <ul className="kid-ports">
            {device.interfaces
              .filter((i) => i.link)
              .map((i) => (
                <li key={i.name}>
                  {i.name} → {i.link!.other(i).device.name}
                </li>
              ))}
          </ul>
          {device.interfaces.every((i) => !i.link) && <p className="kid-note">Поки що нічого не під’єднано.</p>}
        </section>
      )}

      {ipd && <ConnectionTest key={device.id} device={ipd} />}

      <div className="inspector-actions">
        <button className="btn danger" onClick={() => deleteDevice(device.id)}>
          Видалити пристрій
        </button>
      </div>
    </aside>
  );
}
