import { type SaveFile } from '../engine/serialize';
export type ScenarioTopic = 'lan' | 'addresses' | 'routing';
export interface Scenario {
    readonly id: string;
    /** School grade shown on the card. */
    readonly grade: number;
    readonly title: string;
    readonly topic: ScenarioTopic;
    /** One line for the catalog card. */
    readonly summary: string;
    /** The task as the student reads it on a card, one action per line. */
    readonly task: ReadonlyArray<string>;
    /** Topic passports in EduProstir this exercise belongs to (`inf5-07`). */
    readonly passports: ReadonlyArray<string>;
    /** The start network with the lab (steps, goals, hints). */
    readonly file: SaveFile;
    /** A network that meets every goal: the reference answer of a task. */
    readonly reference: SaveFile;
}
/** Limits of an answer. The kids exercises use a handful of devices; more is a forged or broken answer. */
export declare const LIMITS: {
    readonly devices: 40;
    readonly links: 80;
    readonly ifaces: 8;
    readonly routes: 16;
    readonly name: 32;
};
export declare const scenarios: ReadonlyArray<Scenario>;
export declare const scenarioById: (id: string) => Scenario | undefined;
/** The start network of an exercise, with its lab. */
export declare const startNetwork: (s: Scenario) => SaveFile;
/** A network that solves the exercise, with its lab. */
export declare const referenceNetwork: (s: Scenario) => SaveFile;
/**
 * Reads a network from untrusted JSON (an answer from the browser). Keeps only devices, addresses, routes and
 * cables, within `LIMITS`; drops services, firewall rules and the lab. `null` when anything is malformed.
 */
export declare function parseNetwork(data: unknown): SaveFile | null;
export interface GoalResult {
    readonly ok: boolean;
    /** The goal as the student reads it. */
    readonly text: string;
    /** What the check saw, for example «у eth0 ще немає адреси». */
    readonly detail: string;
    readonly hint?: string;
}
export type Grade = {
    status: 'ok';
    results: ReadonlyArray<GoalResult>;
} | {
    status: 'invalid';
};
/** Parses the network again and checks every goal of the exercise in a fresh simulation. Synchronous. */
export declare function grade(s: Scenario, data: unknown): Grade;
/** The network as a teacher reads it: devices with their addresses and gateways, and the cables. */
export declare function describeNetwork(data: unknown): ReadonlyArray<string>;
