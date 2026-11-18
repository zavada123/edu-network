import type { DragEvent } from 'react';
import { useStore } from '../store';
import type { DeviceKind } from '../engine/device';
import { DeviceIcon } from './DeviceNode';

const ITEMS: { kind: DeviceKind; label: string; blurb: string; kidsBlurb?: string }[] = [
  { kind: 'host', label: 'Комп’ютер', blurb: 'робоча станція Linux', kidsBlurb: 'ПК або ноутбук' },
  { kind: 'server', label: 'Сервер', blurb: 'DHCP / DNS / вебсервер', kidsBlurb: 'сайти й файли для мережі' },
  { kind: 'switch', label: 'Світч', blurb: 'комутатор L2', kidsBlurb: 'з’єднує пристрої в одну мережу' },
  { kind: 'router', label: 'Роутер', blurb: 'пересилає пакети між мережами', kidsBlurb: 'з’єднує різні мережі' },
  { kind: 'firewall', label: 'Брандмауер', blurb: 'роутер + nftables' },
  { kind: 'ap', label: 'Точка Wi-Fi', blurb: 'бездротовий міст (SSID)' },
];
const KIDS_KINDS = new Set<DeviceKind>(['host', 'server', 'switch', 'router']);

export function Palette() {
  const addDeviceAt = useStore((s) => s.addDeviceAt);
  const nodeCount = useStore((s) => s.nodes.length);
  const kids = useStore((s) => s.mode === 'kids');
  const items = kids ? ITEMS.filter((it) => KIDS_KINDS.has(it.kind)) : ITEMS;

  const onDragStart = (e: DragEvent, kind: DeviceKind) => {
    e.dataTransfer.setData('application/netsim', kind);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="palette">
      <div className="palette-title">Пристрої</div>
      {items.map((it) => (
        <button
          key={it.kind}
          className={`palette-item kind-${it.kind}`}
          draggable
          onDragStart={(e) => onDragStart(e, it.kind)}
          onClick={() => addDeviceAt(it.kind, { x: 140 + (nodeCount % 5) * 60, y: 120 + (nodeCount % 7) * 50 })}
          title="Перетягни на поле або натисни, щоб додати"
        >
          <span className="palette-item-icon">
            <DeviceIcon kind={it.kind} size={22} />
          </span>
          <span className="palette-item-text">
            <span className="palette-item-label">{it.label}</span>
            <span className="palette-item-blurb">{kids ? (it.kidsBlurb ?? it.blurb) : it.blurb}</span>
          </span>
        </button>
      ))}
      <div className="palette-hint">
        {kids
          ? 'Щоб прокласти кабель, потягни від крапки одного пристрою до крапки іншого. Натисни на пристрій, щоб налаштувати його.'
          : 'Щоб прокласти кабель, потягни між крапками двох пристроїв. Подвійне натискання на комп’ютер чи роутер відкриває термінал.'}
      </div>
    </aside>
  );
}
