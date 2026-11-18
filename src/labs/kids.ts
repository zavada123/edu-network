// Labs for the kids mode (grades 5–9): no terminal, everything is done with
// the mouse and the device form. Text is Ukrainian; device names stay Latin
// so the same file works in the full mode terminal too.
import type { SaveFile, SavedDevice, SavedLink } from '../engine/serialize';
import type { DeviceKind } from '../engine/device';

function dev(
  kind: DeviceKind,
  name: string,
  x: number,
  y: number,
  extra: Partial<SavedDevice> = {},
): SavedDevice {
  return {
    id: name,
    kind,
    name,
    x,
    y,
    forwarding: kind === 'router' || kind === 'firewall',
    ifaces: [],
    routes: [],
    ...extra,
  };
}

function link(a: string, ai: string, b: string, bi: string): SavedLink {
  return { id: `${a}.${ai}-${b}.${bi}`, a: [a, ai], b: [b, bi] };
}

const ip = (name: string, cidr: string) => ({ name, ip: cidr, up: true });

const firstNetwork: SaveFile = {
  app: 'netsim',
  version: 1,
  devices: [dev('host', 'pc1', 60, 80), dev('host', 'pc2', 60, 320), dev('switch', 'sw1', 340, 200)],
  links: [],
  lab: {
    id: 'kids-first-network',
    title: '1. Перша мережа',
    blurb: 'З’єднай два комп’ютери через світч, дай їм адреси й перевір зв’язок.',
    steps: [
      {
        title: 'Під’єднай кабелі',
        body:
          'На схемі два комп’ютери (pc1, pc2) і світч (sw1). Поки що вони не з’єднані.\n' +
          'Наведи мишку на крапку біля комп’ютера, натисни й потягни до крапки біля світча — так прокладають кабель.',
        objectives: [
          {
            id: 'k1-cable1',
            label: 'pc1 під’єднано до світча',
            check: { type: 'linked', a: 'pc1', b: 'sw1' },
            hint: 'Крапки з’являються по краях значка. Тягни від крапки pc1 до будь-якої крапки sw1.',
          },
          {
            id: 'k1-cable2',
            label: 'pc2 під’єднано до світча',
            check: { type: 'linked', a: 'pc2', b: 'sw1' },
            hint: 'Так само, як для pc1: від крапки pc2 до крапки sw1.',
          },
        ],
      },
      {
        title: 'Дай адреси',
        body:
          'Кожен комп’ютер у мережі має свою IP-адресу, як будинок має свою адресу на вулиці.\n' +
          'Натисни на pc1 і впиши адресу `192.168.1.10`. Потім натисни на pc2 і впиши `192.168.1.20`.',
        objectives: [
          {
            id: 'k1-ip1',
            label: 'pc1 має адресу в мережі 192.168.1.…',
            check: { type: 'iface-ip', device: 'pc1', iface: 'eth0', inSubnet: '192.168.1.0/24' },
            hint: 'Адреса складається з чотирьох чисел через крапку. Перші три мають бути 192.168.1, а останнє будь-яке від 1 до 254.',
          },
          {
            id: 'k1-ip2',
            label: 'pc2 має адресу в мережі 192.168.1.…',
            check: { type: 'iface-ip', device: 'pc2', iface: 'eth0', inSubnet: '192.168.1.0/24' },
            hint: 'Останнє число в pc2 має відрізнятися від pc1, інакше комп’ютери переплутаються.',
          },
        ],
      },
      {
        title: 'Перевір зв’язок',
        body:
          'Натисни на pc1, вибери в полі «Перевірити зв’язок» комп’ютер pc2 і натисни кнопку.\n' +
          'Подивись, як по кабелях біжать пакети: спочатку pc1 питає «чия це адреса?», а потім надсилає «привіт».',
        objectives: [
          {
            id: 'k1-ping',
            label: 'pc1 отримує відповідь від pc2',
            check: { type: 'ping', from: 'pc1', toDevice: 'pc2', expect: 'success' },
            hint: 'Перевір, що обидва кабелі на місці і в обох комп’ютерів адреси починаються з 192.168.1.',
          },
        ],
        quiz: [
          {
            q: 'Навіщо комп’ютеру IP-адреса?',
            options: [
              'Щоб він швидше працював',
              'Щоб інші пристрої знали, куди надсилати йому дані',
              'Щоб світч світився',
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
};

const wrongSubnet: SaveFile = {
  app: 'netsim',
  version: 1,
  devices: [
    dev('host', 'pc1', 60, 80, { ifaces: [ip('eth0', '192.168.1.10/24')] }),
    dev('host', 'pc2', 60, 320, { ifaces: [ip('eth0', '192.168.2.20/24')] }),
    dev('host', 'pc3', 560, 200, { ifaces: [ip('eth0', '192.168.1.10/24')] }),
    dev('switch', 'sw1', 320, 200),
  ],
  links: [link('pc1', 'eth0', 'sw1', 'eth0'), link('pc2', 'eth0', 'sw1', 'eth1'), link('pc3', 'eth0', 'sw1', 'eth2')],
  lab: {
    id: 'kids-find-the-mistake',
    title: '2. Знайди помилку',
    blurb: 'Кабелі на місці, а зв’язку немає. Знайди, що не так з адресами.',
    steps: [
      {
        title: 'Чому pc2 мовчить?',
        body:
          'Учень зібрав мережу з трьох комп’ютерів, але щось не працює.\n' +
          'Спершу перевір зв’язок від pc1 до pc2. Потім натисни на кожен комп’ютер і порівняй їхні адреси.',
        objectives: [
          {
            id: 'k2-ping12',
            label: 'pc1 отримує відповідь від pc2',
            check: { type: 'ping', from: 'pc1', toDevice: 'pc2', expect: 'success' },
            hint: 'Комп’ютери з одного світча бачать одне одного, лише якщо перші три числа адреси (при масці 255.255.255.0) однакові.',
          },
        ],
      },
      {
        title: 'Двійник',
        body:
          'Тепер перевір зв’язок від pc2 до pc3. Подивись уважно на адресу pc3: чи немає ще в когось такої самої?',
        objectives: [
          {
            id: 'k2-unique',
            label: 'у кожного комп’ютера своя адреса',
            check: { type: 'unique-ips' },
            hint: 'У pc1 і pc3 однакова адреса. Зміни останнє число в pc3.',
          },
          {
            id: 'k2-ping23',
            label: 'pc2 отримує відповідь від pc3',
            check: { type: 'ping', from: 'pc2', toDevice: 'pc3', expect: 'success' },
            hint: 'Два пристрої з однаковою адресою заважають одне одному. У кожного має бути своя.',
          },
        ],
        quiz: [
          {
            q: 'Чи можуть два комп’ютери в одній мережі мати однакову IP-адресу?',
            options: ['Так, це не важливо', 'Ні, адреса має бути унікальною', 'Так, якщо в них різні назви'],
            answer: 1,
          },
        ],
      },
    ],
  },
};

const routerGateway: SaveFile = {
  app: 'netsim',
  version: 1,
  devices: [
    dev('host', 'pc1', 0, 200, { ifaces: [ip('eth0', '192.168.1.10/24')] }),
    dev('switch', 'sw1', 160, 200),
    dev('router', 'r1', 320, 200, { ifaces: [ip('eth0', '192.168.1.1/24'), ip('eth1', '192.168.2.1/24')] }),
    dev('switch', 'sw2', 480, 200),
    dev('host', 'pc2', 640, 200, { ifaces: [ip('eth0', '192.168.2.10/24')] }),
  ],
  links: [
    link('pc1', 'eth0', 'sw1', 'eth0'),
    link('sw1', 'eth1', 'r1', 'eth0'),
    link('r1', 'eth1', 'sw2', 'eth0'),
    link('sw2', 'eth1', 'pc2', 'eth0'),
  ],
  lab: {
    id: 'kids-router-gateway',
    title: '3. Роутер і шлюз',
    blurb: 'Дві мережі з’єднані роутером. Покажи комп’ютерам, через кого ходити в іншу мережу.',
    steps: [
      {
        title: 'Дві різні мережі',
        body:
          'Ліворуч мережа 192.168.1.…, праворуч 192.168.2.…. Між ними роутер r1, у нього дві адреси, по одній у кожній мережі.\n' +
          'Перевір зв’язок від pc1 до pc2. Поки що відповіді не буде: pc1 не знає, кому віддати пакет для чужої мережі.',
        objectives: [],
      },
      {
        title: 'Задай шлюз',
        body:
          'Шлюз — це адреса роутера, якому комп’ютер віддає все, що йде в інші мережі.\n' +
          'Натисни на pc1 і в поле «Шлюз» впиши адресу роутера з його мережі. Зроби те саме для pc2.',
        objectives: [
          {
            id: 'k3-gw1',
            label: 'pc1 має шлюз 192.168.1.1',
            check: { type: 'default-route', device: 'pc1', via: '192.168.1.1' },
            hint: 'Натисни на r1 і подивись його адреси. Для pc1 потрібна та, що починається з 192.168.1.',
          },
          {
            id: 'k3-gw2',
            label: 'pc2 має шлюз 192.168.2.1',
            check: { type: 'default-route', device: 'pc2', via: '192.168.2.1' },
            hint: 'Шлюз має бути в тій самій мережі, що й комп’ютер. pc2 живе в 192.168.2.…',
          },
          {
            id: 'k3-ping',
            label: 'pc1 отримує відповідь від pc2',
            check: { type: 'ping', from: 'pc1', toDevice: 'pc2', expect: 'success' },
            hint: 'Відповідь теж має повернутися назад, тому шлюз потрібен обом комп’ютерам.',
          },
        ],
        quiz: [
          {
            q: 'Що таке шлюз?',
            options: [
              'Кабель між світчами',
              'Адреса роутера, через який комп’ютер виходить в інші мережі',
              'Назва комп’ютера',
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
};

export const KIDS_LABS: SaveFile[] = [firstNetwork, wrongSubnet, routerGateway];
