import '@xyflow/react/dist/style.css';
import '@xterm/xterm/css/xterm.css';
import '../styles.css';
import { type Mode } from '../store';
export interface EduNetworkProps {
    /** `kids` (default): grades 5–9, no terminal, simple device form. `full`: terminals and every netsim tool. */
    mode?: Mode;
}
/** The whole network lab: canvas, palette, device form and the task panel. Fills its parent. */
export declare function EduNetwork({ mode }: EduNetworkProps): import("react").JSX.Element;
