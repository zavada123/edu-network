import { Scheduler } from './scheduler';
import { Link } from './device';
import type { Device, DeviceKind, NetInterface } from './device';
import type { EthernetFrame } from './types';
export interface WireTransfer {
    id: number;
    linkId: string;
    fromDeviceId: string;
    toDeviceId: string;
    kind: 'arp' | 'icmp' | 'tcp' | 'udp';
    start: number;
    end: number;
}
export declare class Network {
    scheduler: Scheduler;
    devices: Map<string, Device>;
    links: Map<string, Link>;
    onWireTransfer: ((t: WireTransfer) => void) | null;
    onFwDrop: ((deviceId: string) => void) | null;
    private macCounter;
    private wireCounter;
    private idCounter;
    get now(): number;
    nextMac(): string;
    allocId(prefix: string): string;
    allocName(kind: DeviceKind): string;
    register(device: Device): void;
    removeDevice(id: string): string[];
    connect(aId: string, bId: string, opts?: {
        id?: string;
        aIface?: string;
        bIface?: string;
    }): Link;
    disconnect(linkId: string): void;
    interfaceOwner(iface: NetInterface): Device;
    emitWire(link: Link, from: Device, to: Device, frame: EthernetFrame): void;
}
