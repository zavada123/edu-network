/** Entry `edu-network/core`: the simulation engine, the lab format and the grader. No React, so a server can use it. */
export { Network } from './engine/network.js';
export type { WireTransfer } from './engine/network.js';
export { createDevice } from './engine/factory.js';
export { serializeNetwork, restoreNetwork } from './engine/serialize.js';
export type { SaveFile, SavedDevice, SavedLink, SavedIface, SavedRoute } from './engine/serialize.js';
export { runChecks } from './labs/checker.js';
export type { CheckResult } from './labs/checker.js';
export type { Check, Objective, QuizQ, LabStep, LabDef, LabProgress } from './labs/types.js';
export { LABS } from './labs/library.js';
export { EXAMPLES } from './labs/examples.js';
export { KIDS_LABS } from './labs/kids.js';
export { explainFailure } from './kids/explain.js';
export { scenarios, scenarioById, startNetwork, referenceNetwork, parseNetwork, grade, describeNetwork, LIMITS, } from './scenarios/index.js';
export type { Scenario, ScenarioTopic, Grade, GoalResult } from './scenarios/index.js';
