import type { IpDevice } from '../engine/ipdevice.js';
import { type U32 } from '../engine/ip.js';
export declare function resolveHost(device: IpDevice, target: string, cb: (res: {
    ip: U32;
} | {
    error: string;
}) => void): {
    cancel(): void;
};
