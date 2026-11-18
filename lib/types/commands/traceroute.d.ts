import type { IpDevice } from '../engine/ipdevice';
import type { Running } from './shell';
export declare function runTraceroute(device: IpDevice, args: string[], write: (s: string) => void, done: () => void): Running | null;
