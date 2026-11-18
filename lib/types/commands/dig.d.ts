import type { IpDevice } from '../engine/ipdevice';
import type { Running } from './shell';
export declare function runDig(device: IpDevice, args: string[], write: (s: string) => void, done: () => void): Running | null;
