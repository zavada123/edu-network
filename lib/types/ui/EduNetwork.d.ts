import '@xyflow/react/dist/style.css';
import '@xterm/xterm/css/xterm.css';
import '../styles.css';
import { type Mode } from '../store';
import type { SaveFile } from '../engine/serialize';
import { type Scenario } from '../scenarios';
export interface EduNetworkProps {
    /** `kids` (default): grades 5–9, no terminal, simple device form. `full`: terminals and every netsim tool. */
    mode?: Mode;
    /**
     * One exercise of the library. The trainer opens it instead of the autosaved canvas, keeps nothing in the
     * browser and reports changes with `onChange`. Only one trainer per page: the simulation is shared.
     */
    scenario?: Scenario;
    /** A network saved earlier (from `onChange`): opens instead of the start network of the exercise. */
    initialNetwork?: unknown;
    /** Show the «Перевірити» button of the task panel. Off when the host page checks the answer itself. */
    selfCheck?: boolean;
    /** The network after each change (devices, addresses, routes, cables; no lab). */
    onChange?: (network: SaveFile) => void;
    /** After «Перевірити»: `true` when every goal of the exercise is met. */
    onCheck?: (ok: boolean) => void;
    /** Shown as «Наступна вправа» after a passed check. */
    onNext?: () => void;
}
/** The whole network lab: canvas, palette, device form and the task panel. Fills its parent (`--enet-height`). */
export declare function EduNetwork({ mode, scenario, initialNetwork, selfCheck, onChange, onCheck, onNext }: EduNetworkProps): import("react").JSX.Element;
