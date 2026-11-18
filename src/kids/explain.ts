// Turns a failed «Перевірити зв'язок» into one sentence a child can act on.
// The order follows how a teacher would check: address, cable, subnet, gateway.
import type { Network } from '../engine/network';
import { IpDevice } from '../engine/ipdevice';
import { ipToString, networkOf } from '../engine/ip';

function byName(net: Network, name: string) {
  for (const d of net.devices.values()) if (d.name === name) return d;
  return null;
}

export function explainFailure(net: Network, fromName: string, toName: string, detail: string): string {
  const from = byName(net, fromName);
  const to = byName(net, toName);
  if (!(from instanceof IpDevice) || !(to instanceof IpDevice)) return detail;
  const fromIf = from.interfaces.find((i) => i.ip);
  const toIf = to.interfaces.find((i) => i.ip);
  if (!fromIf?.ip) return `У ${fromName} ще немає IP-адреси.`;
  if (!toIf?.ip) return `У ${toName} ще немає IP-адреси, тому йому нічого не надіслати.`;
  if (!fromIf.link) return `${fromName} не під’єднано кабелем.`;
  if (!toIf.link) return `${toName} не під’єднано кабелем.`;

  const sameNet =
    fromIf.ip.prefix === toIf.ip.prefix &&
    networkOf(fromIf.ip.addr, fromIf.ip.prefix) === networkOf(toIf.ip.addr, toIf.ip.prefix);
  const fromGw = from.routes().find((r) => r.prefix === 0);
  if (!sameNet && !fromGw) {
    return (
      `${toName} (${ipToString(toIf.ip.addr)}) в іншій мережі, ніж ${fromName} (${ipToString(fromIf.ip.addr)}). ` +
      `Або зроби адреси з однієї мережі, або задай ${fromName} шлюз.`
    );
  }
  const toGw = to.routes().find((r) => r.prefix === 0);
  if (!sameNet && !toGw) {
    return `Пакет дійшов до ${toName}, але відповідь не знає дороги назад: у ${toName} не задано шлюз.`;
  }
  for (const d of net.devices.values()) {
    if (d === from || !(d instanceof IpDevice)) continue;
    if (d.interfaces.some((i) => i.ip?.addr === fromIf.ip!.addr)) {
      return `У ${fromName} і ${d.name} однакова адреса ${ipToString(fromIf.ip.addr)}. У кожного має бути своя.`;
    }
  }
  return `Пакет не дійшов (${detail}). Перевір кабелі й адреси на шляху.`;
}
