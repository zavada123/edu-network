import type { Network } from '../engine/network.js';
import { IpDevice } from '../engine/ipdevice.js';
export declare function setupScript(d: IpDevice): string;
export declare function nftablesConf(d: IpDevice): string | null;
export declare function dnsmasqConf(d: IpDevice): string | null;
export interface ConfigFile {
    path: string;
    content: string;
}
export declare function sanitizeName(name: string): string;
export declare function configBundle(net: Network): ConfigFile[];
