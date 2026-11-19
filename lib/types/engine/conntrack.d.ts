import type { Ipv4Packet } from './types.js';
import type { U32 } from './ip.js';
import type { CtStateName } from './firewall.js';
export interface Tuple {
    proto: 'tcp' | 'udp' | 'icmp';
    srcIp: U32;
    srcPort: number;
    dstIp: U32;
    dstPort: number;
}
export declare function tupleOf(pkt: Ipv4Packet): Tuple | null;
export declare function reverseTuple(t: Tuple): Tuple;
export interface CtEntry {
    orig: Tuple;
    trans: Tuple;
    state: 'new' | 'established';
    lastSeen: number;
}
export interface CtResult {
    pkt: Ipv4Packet;
    state: CtStateName;
    entry: CtEntry | null;
    dir: 'orig' | 'reply' | 'none';
}
export declare class ConnTrack {
    private byOrig;
    private byReply;
    process(pkt: Ipv4Packet, now: number): CtResult;
    confirm(orig: Tuple, trans: Tuple, now: number): void;
    list(now: number): CtEntry[];
    private lookup;
}
