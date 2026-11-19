import type { IpDevice } from '../engine/ipdevice.js';
import type { Running } from './shell.js';
export declare function runNc(device: IpDevice, args: string[], write: (s: string) => void, done: () => void): Running | null;
