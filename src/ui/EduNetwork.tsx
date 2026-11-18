import { useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import '@xterm/xterm/css/xterm.css';
import '../styles.css';
import App from '../App';
import { useStore, type Mode } from '../store';

let booted = false;

export interface EduNetworkProps {
  /** `kids` (default): grades 5–9, no terminal, simple device form. `full`: terminals and every netsim tool. */
  mode?: Mode;
}

/** The whole network lab: canvas, palette, device form and the task panel. Fills its parent. */
export function EduNetwork({ mode = 'kids' }: EduNetworkProps) {
  useEffect(() => {
    if (booted) return;
    booted = true;
    useStore.getState().boot(mode);
  }, [mode]);
  return <App />;
}
