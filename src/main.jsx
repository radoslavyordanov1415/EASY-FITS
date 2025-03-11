import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')); // Correct use of createRoot
root.render(
  <App />
);
