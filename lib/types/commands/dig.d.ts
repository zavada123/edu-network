import type { IpDevice } from '../engine/ipdevice.js';
import type { Running } from './shell.js';
export declare function runDig(device: IpDevice, args: string[], write: (s: string) => void, done: () => void): Running | null;
