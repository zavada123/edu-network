import './demo.css';
import { createRoot } from 'react-dom/client';
import { EduNetwork } from './ui/EduNetwork';
import { scenarioById } from './scenarios';

// Demo page: ?mode=full opens the original netsim tools with terminals; ?task=<id> opens one library exercise
// the way EduProstir embeds it (no autosave, changes logged to the console).
const params = new URLSearchParams(location.search);
const mode = params.get('mode') === 'full' ? 'full' : 'kids';
const scenario = scenarioById(params.get('task') ?? '');

createRoot(document.getElementById('root')!).render(
  scenario ? (
    <EduNetwork
      scenario={scenario}
      onChange={(n) => console.info('network', n)}
      onCheck={(ok) => console.info('check', ok)}
      onNext={() => console.info('next')}
    />
  ) : (
    <EduNetwork mode={mode} />
  ),
);
