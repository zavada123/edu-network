import type { IpDevice } from '../engine/ipdevice.js';
type Out = (s: string) => void;
export declare function runIptables(device: IpDevice, args: string[], out: Out): void;
export {};
