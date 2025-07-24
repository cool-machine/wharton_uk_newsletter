import React, { useState, useRef } from 'react';
import NewsletterBuilder from './NewsletterBuilder';
import NewsletterPreview from './NewsletterPreview';

export interface NewsletterData {
  title: string;
  month: string;
  year: string;
  greeting: string;
  
  // Recent Highlights
  highlights: Array<{
    title: string;
    description: string;
  }>;
  
  // Upcoming Events
  events: Array<{
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    registrationUrl: string;
  }>;
  
  // Partner Events
  partnerEvents: Array<{
    partner: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    registrationUrl: string;
  }>;
  
  // Alumni Spotlight
  alumniSpotlight: {
    name: string;
    class: string;
    description: string;
    readMoreUrl: string;
  };
  
  // Community Links
  communityLinks: Array<{
    title: string;
    description: string;
    url: string;
  }>;
}

function App() {
  const [showPreview, setShowPreview] = useState(true);
  const [showHtml, setShowHtml] = useState(false);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const [newsletterData, setNewsletterData] = useState<NewsletterData>({
    title: 'Wharton Club UK Newsletter',
    month: 'March',
    year: '2024',
    greeting: 'We hope this newsletter finds you well. We\'re excited to share updates about our recent activities and upcoming events.',
    
    highlights: [
      {
        title: 'Annual London Networking Event',
        description: 'Last month, we hosted our annual networking event at The Shard, bringing together over 100 alumni for an evening of connections and insights.'
      },
      {
        title: 'Women in Finance Panel Discussion',
        description: 'Our recent panel featuring distinguished alumnae in finance drew an engaged audience of over 80 participants.'
      }
    ],
    
    events: [
      {
        title: 'Spring Leadership Forum',
        date: 'April 15, 2024',
        time: '6:30 PM',
        location: 'The Royal Institution, London',
        description: 'Join us for an evening of insights from industry leaders discussing the future of leadership in the digital age.',
        registrationUrl: '#'
      },
      {
        title: 'FinTech Innovation Workshop',
        date: 'April 28, 2024',
        time: '2:00 PM',
        location: 'Level39, Canary Wharf',
        description: 'Explore the latest trends in financial technology with hands-on demonstrations and expert discussions.',
        registrationUrl: '#'
      }
    ],
    
    partnerEvents: [
      {
        partner: 'Harvard Business School',
        title: 'Joint Networking Reception',
        date: 'May 5, 2024',
        time: '7:00 PM',
        location: 'The Ned, City of London',
        description: 'Connect with alumni from both institutions.',
        registrationUrl: '#'
      }
    ],
    
    alumniSpotlight: {
      name: 'Sarah Johnson',
      class: 'WG\'15',
      description: 'Sarah recently launched a successful fintech startup that was acquired by a major bank. She credits her Wharton network for connecting her with key investors and advisors.',
      readMoreUrl: '#'
    },
    
    communityLinks: [
      {
        title: 'Wharton Club UK WhatsApp Group',
        description: 'Stay connected with fellow alumni through our main WhatsApp group.',
        url: 'https://forms.gle/CDvFgFGrgLFZB3HL9'
      },
      {
        title: 'Wharton Alumni AI Studio',
        description: 'Connect with AI and deep tech enthusiasts in our growing global community.',
        url: 'https://forms.gle/CoDwPjqsn8Hn1X8v7'
      }
    ]
  });

  const copyToClipboard = () => {
    if (newsletterRef.current) {
      const html = newsletterRef.current.innerHTML;
      navigator.clipboard.writeText(html);
      alert('Newsletter HTML copied to clipboard! Ready to paste into NationBuilder.');
    }
  };

  const getHtml = () => {
    return newsletterRef.current?.innerHTML || '';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#011F5B',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>
          📧 Wharton Club UK Newsletter Builder
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
          Create and customize your newsletter, then copy the HTML for NationBuilder
        </p>
      </div>

      {/* Toggle Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowPreview(!showPreview)}
          style={{
            padding: '12px 24px',
            backgroundColor: showPreview ? '#990000' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {showPreview ? '📝 Show Editor' : '👁 Show Preview'}
        </button>
        
        <button 
          onClick={copyToClipboard}
          style={{
            padding: '12px 24px',
            backgroundColor: '#011F5B',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          📋 Copy HTML for NationBuilder
        </button>
        
        <button 
          onClick={() => setShowHtml(!showHtml)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {showHtml ? '🙈 Hide HTML' : '👁 Show HTML'}
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        gap: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Editor Panel */}
        {!showPreview && (
          <div style={{
            flex: '1',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <NewsletterBuilder 
              data={newsletterData} 
              onChange={setNewsletterData} 
            />
          </div>
        )}

        {/* Preview Panel */}
        {showPreview && (
          <div style={{
            flex: '1',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div ref={newsletterRef}>
              <NewsletterPreview data={newsletterData} />
            </div>
          </div>
        )}
      </div>

      {/* HTML Code Display */}
      {showHtml && (
        <div style={{
          maxWidth: '1400px',
          margin: '20px auto',
          padding: '0 20px'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            color: '#f0f0f0',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'monospace',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            <h3 style={{ color: '#4CAF50', marginBottom: '16px' }}>
              📋 HTML Code (Ready for NationBuilder)
            </h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {getHtml()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;