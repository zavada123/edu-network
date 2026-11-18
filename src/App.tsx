import { ReactFlowProvider } from '@xyflow/react';
import { Flow } from './components/Flow';
import { Palette } from './components/Palette';
import { Inspector } from './components/Inspector';
import { TerminalDock } from './components/TerminalDock';
import { Toolbar } from './components/Toolbar';
import { LabPanel } from './components/LabPanel';
import { KidsInspector } from './components/KidsInspector';
import { useStore } from './store';

export default function App() {
  const selected = useStore((s) => s.selected);
  const kids = useStore((s) => s.mode === 'kids');
  const hasTerminals = useStore((s) => s.terminals.length > 0) && !kids;

  return (
    <ReactFlowProvider>
      <div className={`app${hasTerminals ? ' with-dock' : ''}${kids ? ' kids' : ''}`}>
        <Toolbar />
        <div className="main">
          <Palette />
          <div className="canvas">
            <Flow />
            <LabPanel />
          </div>
          {selected && (kids ? <KidsInspector /> : <Inspector />)}
        </div>
        {!kids && <TerminalDock />}
      </div>
    </ReactFlowProvider>
  );
}
