import type { IpDevice } from '../engine/ipdevice.js';
type Out = (s: string) => void;
export declare function runIp(device: IpDevice, args: string[], out: Out): void;
export declare function formatAddresses(device: IpDevice, opts?: {
    linkOnly?: boolean;
}): string;
export declare function formatRoutes(device: IpDevice): string;
export declare function formatNeigh(device: IpDevice): string;
export declare function formatArpClassic(device: IpDevice): string;
export {};
