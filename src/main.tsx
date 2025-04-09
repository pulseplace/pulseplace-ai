
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(<App />);
