import type { FilterHook, FilterRule, FirewallModel, NatHook, NatRule, RuleMatch } from './firewall';
export declare function matchToNft(m: RuleMatch): string;
export declare function filterRuleText(r: FilterRule): string;
export declare function natRuleText(r: NatRule): string;
export declare function listRuleset(fw: FirewallModel, opts?: {
    handles?: boolean;
}): string;
export declare const IPT_CHAIN: Record<FilterHook | NatHook, string>;
export declare function matchToIptables(m: RuleMatch): string;
export declare function iptablesSave(fw: FirewallModel, table: 'filter' | 'nat'): string;
export declare function iptablesListing(fw: FirewallModel, table: 'filter' | 'nat', opts?: {
    lineNumbers?: boolean;
}): string;
