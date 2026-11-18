import type { Network } from './network';
import type { Device, DeviceKind } from './device';
export declare function createDevice(net: Network, kind: DeviceKind, opts?: {
    id?: string;
    name?: string;
}): Device;
