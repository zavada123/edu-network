import type { IpDevice } from '../engine/ipdevice.js';
export interface TermIO {
    write(s: string): void;
}
export interface Running {
    cancel(): void;
}
export declare function formatConntrack(device: IpDevice): string;
export declare function formatSockets(device: IpDevice): string;
export declare class Shell {
    device: IpDevice;
    constructor(device: IpDevice);
    exec(line: string, io: TermIO, done: () => void): Running | null;
}
