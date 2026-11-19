import { useEffect, useRef } from 'react';
import '@xyflow/react/dist/style.css';
import '@xterm/xterm/css/xterm.css';
import '../styles.css';
import App from '../App';
import { useStore, type Mode } from '../store';
import type { SaveFile } from '../engine/serialize';
import { parseNetwork, startNetwork, type Scenario } from '../scenarios';

let booted = false;

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
export function EduNetwork({ mode = 'kids', scenario, initialNetwork, selfCheck = true, onChange, onCheck, onNext }: EduNetworkProps) {
  const hooks = useRef({ onChange, onCheck });
  hooks.current = { onChange, onCheck };

  useEffect(() => {
    useStore.getState().setEmbedOptions({
      selfCheck,
      onNext: onNext ?? null,
      hooks: scenario
        ? { onChange: (n) => hooks.current.onChange?.(n), onCheck: (ok) => hooks.current.onCheck?.(ok) }
        : null,
    });
  }, [scenario, selfCheck, onNext]);

  useEffect(() => {
    if (scenario) {
      const start = startNetwork(scenario);
      const saved = initialNetwork === undefined ? null : parseNetwork(initialNetwork);
      const file: SaveFile = saved ? { ...saved, lab: start.lab } : start;
      useStore.getState().embedLab(file, start, {
        onChange: (n) => hooks.current.onChange?.(n),
        onCheck: (ok) => hooks.current.onCheck?.(ok),
      });
      return;
    }
    if (booted) return;
    booted = true;
    useStore.getState().boot(mode);
    // The start network is read once per exercise; a new `initialNetwork` object must not reset the canvas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario?.id, mode]);

  return <App />;
}
