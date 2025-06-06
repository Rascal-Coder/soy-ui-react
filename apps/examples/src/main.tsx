import { createRoot } from 'react-dom/client';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import App from './App';
import './index.css';

function setupApp() {
  const container = document.getElementById('root');

  if (!container) return;

  const root = createRoot(container);

  root.render(<App />);
}

setupApp();
