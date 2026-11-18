import type { IpDevice } from '../engine/ipdevice';
type Out = (s: string) => void;
export declare function runIptables(device: IpDevice, args: string[], out: Out): void;
export {};
