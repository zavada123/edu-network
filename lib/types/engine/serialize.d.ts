import { Network } from './network.js';
import type { DeviceKind } from './device.js';
import { type FirewallJSON } from './firewall.js';
import type { LabDef, LabProgress } from '../labs/types.js';
export interface SavedIface {
    name: string;
    ip: string | null;
    up: boolean;
}
export interface SavedRoute {
    dest: string;
    via: string | null;
    dev: string;
}
export interface SavedDevice {
    id: string;
    kind: DeviceKind;
    name: string;
    x: number;
    y: number;
    forwarding: boolean;
    ifaces: SavedIface[];
    routes: SavedRoute[];
    services?: {
        tcp: number[];
        udp: number[];
    };
    firewall?: FirewallJSON;
    nameserver?: string | null;
    dhcpServer?: {
        enabled: boolean;
        rangeStart: string;
        rangeEnd: string;
        router: string | null;
        dns: string | null;
    };
    dnsServer?: {
        enabled: boolean;
        records: [string, string][];
    };
    httpServer?: {
        enabled: boolean;
        port: number;
        body: string;
    };
    ripEnabled?: boolean;
    vlans?: Record<string, number>;
    ssid?: string;
}
export interface SavedLink {
    id: string;
    a: [deviceId: string, ifaceName: string];
    b: [deviceId: string, ifaceName: string];
}
export interface SaveFile {
    app: 'netsim';
    version: 1;
    devices: SavedDevice[];
    links: SavedLink[];
    lab?: LabDef;
    labProgress?: LabProgress;
}
export declare function serializeNetwork(net: Network, positions: Record<string, {
    x: number;
    y: number;
}>): SaveFile;
export declare function restoreNetwork(data: SaveFile): Network;
