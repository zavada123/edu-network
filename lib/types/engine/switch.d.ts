import { Device, NetInterface } from './device.js';
import type { Network } from './network.js';
import type { EthernetFrame } from './types.js';
export declare class SwitchDevice extends Device {
    readonly kind: 'switch' | 'ap';
    macTable: Map<string, NetInterface>;
    vlans: Map<string, number>;
    constructor(network: Network, id: string, name: string, kind?: 'switch' | 'ap', ports?: number);
    vlanOf(portName: string): number;
    receiveFrame(iface: NetInterface, frame: EthernetFrame): void;
    private flood;
}
export declare class ApDevice extends SwitchDevice {
    ssid: string;
    constructor(network: Network, id: string, name: string, ports?: number);
}
