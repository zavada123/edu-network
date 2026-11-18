import type { Ipv4Packet } from './types';
import { type U32 } from './ip';
export type Verdict = 'accept' | 'drop' | 'reject';
export type CtStateName = 'new' | 'established' | 'related' | 'invalid';
export type FilterHook = 'input' | 'forward' | 'output';
export type NatHook = 'prerouting' | 'postrouting';
export type Proto = 'tcp' | 'udp' | 'icmp';
export interface PortRange {
    from: number;
    to: number;
}
export interface RuleMatch {
    srcNet?: {
        addr: U32;
        prefix: number;
    };
    dstNet?: {
        addr: U32;
        prefix: number;
    };
    proto?: Proto;
    sport?: PortRange;
    dport?: PortRange;
    icmpType?: 'echo-request' | 'echo-reply';
    ctStates?: CtStateName[];
    iif?: string;
    oif?: string;
}
export type NatAction = {
    type: 'masquerade';
} | {
    type: 'snat';
    addr: U32;
} | {
    type: 'dnat';
    addr: U32;
    port?: number;
};
export interface FilterRule {
    handle: number;
    match: RuleMatch;
    verdict: Verdict;
}
export interface NatRule {
    handle: number;
    match: RuleMatch;
    action: NatAction;
}
export interface FilterChain {
    declared: boolean;
    name: string;
    policy: 'accept' | 'drop';
    rules: FilterRule[];
}
export interface NatChain {
    declared: boolean;
    name: string;
    rules: NatRule[];
}
export interface EvalCtx {
    iif?: string;
    oif?: string;
    ctState: CtStateName;
}
export interface EvalResult {
    verdict: Verdict;
    rule: FilterRule | null;
    policy: boolean;
    filtered: boolean;
    hook: FilterHook;
}
export declare function matchesRule(m: RuleMatch, pkt: Ipv4Packet, ctx: EvalCtx): boolean;
export declare class FirewallModel {
    private handleSeq;
    tables: {
        filter: boolean;
        nat: boolean;
    };
    filter: Record<FilterHook, FilterChain>;
    nat: Record<NatHook, NatChain>;
    active(): boolean;
    declareFilter(hook: FilterHook, name: string, policy?: 'accept' | 'drop'): void;
    declareNat(hook: NatHook, name: string): void;
    ensureIptablesTable(table: 'filter' | 'nat'): void;
    chainByName(table: 'filter' | 'nat', name: string): {
        kind: 'filter';
        hook: FilterHook;
    } | {
        kind: 'nat';
        hook: NatHook;
    } | null;
    addFilterRule(hook: FilterHook, match: RuleMatch, verdict: Verdict, atHead?: boolean): number;
    addNatRule(hook: NatHook, match: RuleMatch, action: NatAction, atHead?: boolean): number;
    deleteHandle(handle: number): boolean;
    flush(): void;
    evaluate(hook: FilterHook, pkt: Ipv4Packet, ctx: EvalCtx): EvalResult;
    evalNat(hook: NatHook, pkt: Ipv4Packet, ctx: EvalCtx): NatRule | null;
}
interface MatchJSON {
    src?: string;
    dst?: string;
    proto?: Proto;
    sport?: [number, number];
    dport?: [number, number];
    icmpType?: 'echo-request' | 'echo-reply';
    ct?: CtStateName[];
    iif?: string;
    oif?: string;
}
interface FilterRuleJSON {
    match: MatchJSON;
    verdict: Verdict;
}
interface NatRuleJSON {
    match: MatchJSON;
    action: {
        type: 'masquerade';
    } | {
        type: 'snat';
        addr: string;
    } | {
        type: 'dnat';
        addr: string;
        port?: number;
    };
}
export interface FirewallJSON {
    tables: {
        filter: boolean;
        nat: boolean;
    };
    filter: Partial<Record<FilterHook, {
        name: string;
        policy: 'accept' | 'drop';
        rules: FilterRuleJSON[];
    }>>;
    nat: Partial<Record<NatHook, {
        name: string;
        rules: NatRuleJSON[];
    }>>;
}
export declare function firewallToJSON(fw: FirewallModel): FirewallJSON | null;
export declare function firewallFromJSON(fw: FirewallModel, j: FirewallJSON): void;
export {};
