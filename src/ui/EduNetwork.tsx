import { useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import '@xterm/xterm/css/xterm.css';
import '../styles.css';
import App from '../App';
import { useStore } from '../store';

let booted = false;

/** The whole network lab: canvas, palette, inspector, terminals and the lab panel. Fills its parent. */
export function EduNetwork() {
  useEffect(() => {
    if (booted) return;
    booted = true;
    useStore.getState().boot();
  }, []);
  return <App />;
}
