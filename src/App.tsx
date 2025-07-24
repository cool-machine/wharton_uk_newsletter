import React, { useState, useRef } from 'react';
import Newsletter from './Newsletter';

function App() {
  const [showHtml, setShowHtml] = useState(false);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (newsletterRef.current) {
      const html = newsletterRef.current.outerHTML;
      navigator.clipboard.writeText(html);
      alert('Newsletter HTML copied to clipboard!');
    }
  };

  const getHtml = () => {
    return newsletterRef.current?.outerHTML || '';
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#011F5B' }}>
        Wharton Club UK Newsletter
      </h1>
      
      <div className="newsletter-preview" ref={newsletterRef}>
        <Newsletter />
      </div>

      <div className="controls">
        <button 
          className="btn btn-primary" 
          onClick={() => setShowHtml(!showHtml)}
        >
          {showHtml ? 'Hide HTML' : 'Show HTML'}
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={copyToClipboard}
        >
          Copy HTML
        </button>
      </div>

      {showHtml && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: '#1a1a1a',
          color: '#f0f0f0',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'monospace',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          <pre>{getHtml()}</pre>
        </div>
      )}
    </div>
  );
}

export default App;