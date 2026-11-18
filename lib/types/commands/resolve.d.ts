import type { IpDevice } from '../engine/ipdevice';
import { type U32 } from '../engine/ip';
export declare function resolveHost(device: IpDevice, target: string, cb: (res: {
    ip: U32;
} | {
    error: string;
}) => void): {
    cancel(): void;
};
