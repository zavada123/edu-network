/** Entry `edu-network/core`: the simulation engine, the lab format and the grader. No React, so a server can use it. */
export { Network } from './engine/network';
export type { WireTransfer } from './engine/network';
export { createDevice } from './engine/factory';
export { serializeNetwork, restoreNetwork } from './engine/serialize';
export type { SaveFile, SavedDevice, SavedLink, SavedIface, SavedRoute } from './engine/serialize';
export { runChecks } from './labs/checker';
export type { CheckResult } from './labs/checker';
export type { Check, Objective, QuizQ, LabStep, LabDef, LabProgress } from './labs/types';
export { LABS } from './labs/library';
export { EXAMPLES } from './labs/examples';
export { KIDS_LABS } from './labs/kids';
export { explainFailure } from './kids/explain';
