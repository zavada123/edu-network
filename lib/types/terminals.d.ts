import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import type { IpDevice } from './engine/ipdevice';
export interface SessionOpts {
    onAfterCommand?: () => void;
}
export interface Session {
    term: Terminal;
    fit: FitAddon;
    opened: boolean;
}
export declare function getSession(device: IpDevice, opts?: SessionOpts): Session;
export declare function disposeSession(deviceId: string): void;
export declare function disposeAllSessions(): void;
