import type { Network } from '../engine/network';
import type { Objective } from './types';
export interface CheckResult {
    id: string;
    pass: boolean;
    detail: string;
}
export declare function runChecks(net: Network, objectives: Objective[], onResult: (r: CheckResult) => void, onDone: () => void): void;
