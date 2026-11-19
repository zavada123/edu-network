import type { Network } from '../engine/network.js';
import type { Objective } from './types.js';
export interface CheckResult {
    id: string;
    pass: boolean;
    detail: string;
}
export declare function runChecks(net: Network, objectives: Objective[], onResult: (r: CheckResult) => void, onDone: () => void): void;
