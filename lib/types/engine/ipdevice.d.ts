import { Device, NetInterface } from './device';
import type { AppData, DhcpApp, EthernetFrame, IcmpMessage, Ipv4Packet, L4 } from './types';
import { type U32 } from './ip';
import { FirewallModel, type FilterHook } from './firewall';
import { ConnTrack } from './conntrack';
export declare const DEFAULT_TTL = 64;
export type IcmpEvent = {
    type: 'reply';
    from: U32;
    seq: number;
    ttl: number;
} | {
    type: 'time-exceeded';
    from: U32;
    seq: number | null;
} | {
    type: 'unreachable';
    from: U32;
    seq: number | null;
    code: 'net' | 'host' | 'port';
} | {
    type: 'send-error';
    seq: number | null;
    message: string;
};
export type SocketResult = 'open' | 'refused' | 'timeout' | 'unreachable';
export type TcpSessionEvent = {
    type: 'open';
} | {
    type: 'refused';
} | {
    type: 'unreachable';
} | {
    type: 'data';
    app: AppData;
};
export type DnsResult = U32 | null | 'timeout' | 'refused';
export interface Route {
    dest: U32;
    prefix: number;
    via: U32 | null;
    ifaceName: string;
    kind: 'connected' | 'static' | 'rip';
    metric?: number;
}
export interface ArpEntry {
    mac: string;
    ifaceName: string;
    at: number;
}
export interface FwLogEntry {
    t: number;
    hook: FilterHook;
    verdict: string;
    rule: string;
    pkt: string;
}
export interface DhcpServerConfig {
    enabled: boolean;
    rangeStart: U32;
    rangeEnd: U32;
    router: U32 | null;
    dns: U32 | null;
    leases: Map<string, U32>;
}
export interface DnsServerConfig {
    enabled: boolean;
    records: Map<string, U32>;
}
export interface HttpServerConfig {
    enabled: boolean;
    port: number;
    body: string;
}
export declare function normalizeName(name: string): string;
export declare function summarizePacket(pkt: Ipv4Packet): string;
export declare abstract class IpDevice extends Device {
    forwarding: boolean;
    arpTable: Map<number, ArpEntry>;
    staticRoutes: Route[];
    fw: FirewallModel;
    ct: ConnTrack;
    fwLog: FwLogEntry[];
    services: {
        tcp: Set<number>;
        udp: Set<number>;
    };
    ncTcp: Map<number, (msg: string) => void>;
    ncUdp: Map<number, (msg: string) => void>;
    nameserver: U32 | null;
    dhcpServer: DhcpServerConfig | null;
    dnsServer: DnsServerConfig | null;
    httpServer: HttpServerConfig | null;
    dhcpListeners: Set<(app: DhcpApp) => void>;
    ripEnabled: boolean;
    private ripRoutes;
    private ripScheduled;
    private pendingArp;
    private icmpListeners;
    private icmpIdSeq;
    private tcpSessions;
    private udpSessions;
    private dnsPending;
    private ephemeralPort;
    private dnsQidSeq;
    private dhcpXidSeq;
    allocIcmpId(): number;
    nextDhcpXid(): number;
    onIcmp(id: number, fn: (ev: IcmpEvent) => void): void;
    offIcmp(id: number): void;
    myIps(): U32[];
    hasIp(ip: U32): boolean;
    routes(): Route[];
    private freshRipRoutes;
    enableRip(on: boolean): void;
    private ripTick;
    private advertiseRip;
    private handleRip;
    lookupRoute(dst: U32): Route | null;
    addIp(ifaceName: string, addr: U32, prefix: number): string | null;
    delIp(ifaceName: string, addr: U32, prefix: number): string | null;
    addRoute(dest: U32, prefix: number, via: U32 | null, dev?: string): string | null;
    delRoute(dest: U32, prefix: number): string | null;
    sendEcho(dst: U32, id: number, seq: number, ttl?: number): string | null;
    sendIcmp(dst: U32, msg: IcmpMessage, opts?: {
        ttl?: number;
        srcOverride?: U32;
    }): string | null;
    sendL4(dst: U32, l4: L4, opts?: {
        ttl?: number;
        srcOverride?: U32;
    }): string | null;
    sendBroadcastUdp(iface: NetInterface, srcIp: U32, srcPort: number, dstPort: number, app: AppData): boolean;
    sendDhcpClient(iface: NetInterface, app: DhcpApp): boolean;
    tcpListening(port: number): boolean;
    udpListening(port: number): boolean;
    openTcp(dst: U32, port: number, onEvent: (ev: TcpSessionEvent) => void): {
        srcPort: number;
        close: () => void;
        error: string | null;
    };
    connectTcp(dst: U32, port: number, timeoutMs: number, cb: (r: SocketResult) => void): string | null;
    probeUdp(dst: U32, port: number, timeoutMs: number, cb: (r: SocketResult) => void): string | null;
    httpGet(dst: U32, port: number, path: string, host: string, timeoutMs: number, cb: (res: {
        ok: true;
        status: number;
        reason: string;
        body: string;
    } | {
        ok: false;
        error: 'refused' | 'timeout' | 'unreachable' | 'empty' | string;
    }) => void, onConnect?: () => void): string | null;
    resolveDns(name: string, server: U32, cb: (r: DnsResult) => void): void;
    receiveFrame(iface: NetInterface, frame: EthernetFrame): void;
    private handleIp;
    private deliverBroadcast;
    private handleDhcpServer;
    private allocLease;
    private applyDnat;
    private applySnat;
    private rejectPacket;
    private logFw;
    private routePacket;
    private resolveAndSend;
    private arpRetry;
    private failDelivery;
    private sendArpRequest;
    private handleArp;
    private deliverLocal;
    private handleUdp;
    private handleTcp;
    private handleServerTcpData;
    private notifySocket;
}
export declare class Host extends IpDevice {
    readonly kind: 'host';
    constructor(network: Network, id: string, name: string);
}
export declare class ServerDevice extends IpDevice {
    readonly kind: 'server';
    constructor(network: Network, id: string, name: string);
}
export declare class RouterDevice extends IpDevice {
    readonly kind: 'router';
    constructor(network: Network, id: string, name: string);
}
export declare class FirewallDevice extends IpDevice {
    readonly kind: 'firewall';
    constructor(network: Network, id: string, name: string);
}
import type { Network } from './network';
