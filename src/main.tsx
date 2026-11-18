import { createRoot } from 'react-dom/client';
import { EduNetwork } from './ui/EduNetwork';

// Demo page: ?mode=full opens the original netsim tools with terminals.
const mode = new URLSearchParams(location.search).get('mode') === 'full' ? 'full' : 'kids';

createRoot(document.getElementById('root')!).render(<EduNetwork mode={mode} />);
