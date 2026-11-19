import type { Network } from './network.js';
import type { Device, DeviceKind } from './device.js';
export declare function createDevice(net: Network, kind: DeviceKind, opts?: {
    id?: string;
    name?: string;
}): Device;
