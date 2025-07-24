import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SimpleTest from './SimpleTest.tsx';
// import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleTest />
  </StrictMode>
);