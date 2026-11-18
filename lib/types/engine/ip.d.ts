export type U32 = number;
export declare const BROADCAST_MAC = "ff:ff:ff:ff:ff:ff";
export declare const BROADCAST_IP: U32;
export declare function parseIp(s: string): U32 | null;
export declare function ipToString(ip: U32): string;
export declare function parseCidr(s: string): {
    addr: U32;
    prefix: number;
} | null;
export declare function maskOf(prefix: number): U32;
export declare function networkOf(addr: U32, prefix: number): U32;
export declare function sameSubnet(a: U32, b: U32, prefix: number): boolean;
export declare function broadcastOf(addr: U32, prefix: number): U32;
export declare function cidrToString(addr: U32, prefix: number): string;
