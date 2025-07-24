import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AprilNewsletter from './AprilNewsletter.tsx';
import NewsletterForm from './NewsletterForm.tsx';
import TestingPage from './TestingPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/april" element={<AprilNewsletter />} />
        <Route path="/templates" element={<TestingPage />} />
        <Route path="/testing" element={<TestingPage />} />
      </Routes>
    </Router>
  </StrictMode>
);