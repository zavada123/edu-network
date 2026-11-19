import type { Network } from './network.js';
import type { EthernetFrame } from './types.js';
import type { U32 } from './ip.js';
export type DeviceKind = 'host' | 'switch' | 'router' | 'firewall' | 'server' | 'ap';
export declare class NetInterface {
    device: Device;
    name: string;
    mac: string;
    link: Link | null;
    up: boolean;
    ip: {
        addr: U32;
        prefix: number;
    } | null;
    constructor(device: Device, name: string, mac: string);
    send(frame: EthernetFrame): void;
}
export declare abstract class Device {
    network: Network;
    id: string;
    name: string;
    abstract readonly kind: DeviceKind;
    interfaces: NetInterface[];
    constructor(network: Network, id: string, name: string);
    protected addInterfaces(prefix: string, count: number): void;
    getInterface(name: string): NetInterface | null;
    freeInterface(): NetInterface | null;
    abstract receiveFrame(iface: NetInterface, frame: EthernetFrame): void;
}
export declare class Link {
    network: Network;
    id: string;
    a: NetInterface;
    b: NetInterface;
    latency: number;
    constructor(network: Network, id: string, a: NetInterface, b: NetInterface, latency?: number);
    other(i: NetInterface): NetInterface;
    transmit(from: NetInterface, frame: EthernetFrame): void;
    detach(): void;
}
