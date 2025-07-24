import React, { useRef } from 'react';
import { NewsletterData } from './App';

interface Props {
  data: NewsletterData;
}

const NewsletterPreview: React.FC<Props> = ({ data }) => {
  // Wharton brand colors
  const colors = {
    primary: '#990000', // Wharton Red
    secondary: '#011F5B', // Wharton Blue
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  };

  const styles = {
    table: {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      borderCollapse: 'collapse' as const
    },
    header: {
      backgroundColor: colors.primary,
      color: '#ffffff',
      padding: '24px',
      textAlign: 'center' as const
    },
    headerTitle: {
      fontSize: '28px',
      margin: '0',
      fontWeight: 'bold'
    },
    section: {
      padding: '24px'
    },
    heading: {
      fontSize: '22px',
      color: colors.text.primary,
      marginBottom: '16px',
      fontWeight: 'bold'
    },
    subheading: {
      fontSize: '18px',
      color: colors.text.primary,
      marginBottom: '8px',
      fontWeight: '600'
    },
    text: {
      color: colors.text.secondary,
      lineHeight: '1.6',
      margin: '0 0 16px 0',
      fontSize: '16px'
    },
    eventBox: {
      backgroundColor: '#f9f9f9',
      padding: '16px',
      borderRadius: '4px',
      marginBottom: '16px',
      border: `2px solid ${colors.primary}`
    },
    button: {
      display: 'inline-block',
      backgroundColor: colors.secondary,
      color: '#ffffff',
      padding: '12px 24px',
      textDecoration: 'none',
      borderRadius: '4px',
      marginTop: '8px',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    highlight: {
      borderLeft: `4px solid ${colors.primary}`,
      paddingLeft: '16px',
      marginBottom: '16px'
    },
    footer: {
      padding: '24px',
      borderTop: '1px solid #eaeaea',
      textAlign: 'center' as const,
      backgroundColor: '#f8f8f8'
    },
    link: {
      color: colors.primary,
      textDecoration: 'none'
    },
    copyButton: {
      position: 'absolute' as const,
      top: '8px',
      right: '8px',
      padding: '4px 8px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      opacity: 0.8
    },
    sectionWrapper: {
      position: 'relative' as const,
      border: '1px dashed #ddd',
      margin: '4px 0',
      padding: '4px'
    }
  };

  // Refs for each section
  const headerRef = useRef<HTMLTableRowElement>(null);
  const greetingRef = useRef<HTMLTableRowElement>(null);
  const highlightsRef = useRef<HTMLTableRowElement>(null);
  const eventsRef = useRef<HTMLTableRowElement>(null);
  const partnerEventsRef = useRef<HTMLTableRowElement>(null);
  const alumniRef = useRef<HTMLTableRowElement>(null);
  const communityRef = useRef<HTMLTableRowElement>(null);
  const membershipRef = useRef<HTMLTableRowElement>(null);
  const footerRef = useRef<HTMLTableRowElement>(null);

  const copyElementHtml = (element: HTMLElement | null, sectionName: string) => {
    if (element) {
      // Create a table wrapper for the individual section
      const tableWrapper = `<table style="width: 100%; max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff; border-collapse: collapse;">
        <tbody>
          ${element.outerHTML}
        </tbody>
      </table>`;
      
      navigator.clipboard.writeText(tableWrapper);
      alert(`${sectionName} HTML copied to clipboard!`);
    }
  };

  const CopyButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
    <button
      style={styles.copyButton}
      onClick={onClick}
      title={`Copy ${label} HTML`}
    >
      📋 Copy
    </button>
  );

  return (
    <div>
      <h2 style={{ color: '#011F5B', marginBottom: '24px', textAlign: 'center' }}>
        👁 Newsletter Preview
      </h2>
      
      <table style={styles.table}>
        <tbody>
          {/* Header */}
          <div style={styles.sectionWrapper}>
            <CopyButton 
              onClick={() => copyElementHtml(headerRef.current, 'Header')} 
              label="Header" 
            />
            <tr ref={headerRef}>
              <td style={styles.header}>
                <h1 style={styles.headerTitle}>
                  {data.month} {data.year} Newsletter
                </h1>
                <p style={{ margin: '8px 0 0 0', fontSize: '18px' }}>
                  {data.title}
                </p>
              </td>
            </tr>
          </div>

          {/* Greeting */}
          <div style={styles.sectionWrapper}>
            <CopyButton 
              onClick={() => copyElementHtml(greetingRef.current, 'Greeting')} 
              label="Greeting" 
            />
            <tr ref={greetingRef}>
              <td style={styles.section}>
                <h2 style={styles.heading}>Dear Wharton Alumni,</h2>
                <p style={styles.text}>
                  {data.greeting}
                </p>
              </td>
            </tr>
          </div>

          {/* Recent Highlights */}
          {data.highlights.length > 0 && (
            <div style={styles.sectionWrapper}>
              <CopyButton 
                onClick={() => copyElementHtml(highlightsRef.current, 'Recent Highlights')} 
                label="Highlights" 
              />
              <tr ref={highlightsRef}>
                <td style={styles.section}>
                  <h2 style={styles.heading}>Recent Highlights</h2>
                  
                  {data.highlights.map((highlight, index) => (
                    <div key={index} style={styles.highlight}>
                      <h3 style={styles.subheading}>{highlight.title}</h3>
                      <p style={styles.text}>
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </td>
              </tr>
            </div>
          )}

          {/* Upcoming Events */}
          {data.events.length > 0 && (
            <div style={styles.sectionWrapper}>
              <CopyButton 
                onClick={() => copyElementHtml(eventsRef.current, 'Upcoming Events')} 
                label="Events" 
              />
              <tr ref={eventsRef}>
                <td style={styles.section}>
                  <h2 style={styles.heading}>Upcoming Wharton UK Club Events</h2>
                  
                  {data.events.map((event, index) => (
                    <div key={index} style={styles.eventBox}>
                      <h3 style={styles.subheading}>{event.title}</h3>
                      <p style={styles.text}>
                        <strong>Date:</strong> {event.date} | {event.time}<br/>
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p style={styles.text}>
                        {event.description}
                      </p>
                      <a href={event.registrationUrl} style={styles.button}>Register Now</a>
                    </div>
                  ))}
                </td>
              </tr>
            </div>
          )}

          {/* Partner Events */}
          {data.partnerEvents.length > 0 && (
            <div style={styles.sectionWrapper}>
              <CopyButton 
                onClick={() => copyElementHtml(partnerEventsRef.current, 'Partner Events')} 
                label="Partner Events" 
              />
              <tr ref={partnerEventsRef}>
                <td style={styles.section}>
                  <h2 style={styles.heading}>Partner Events</h2>
                  
                  {data.partnerEvents.map((event, index) => (
                    <div key={index}>
                      <h3 style={{ ...styles.subheading, color: colors.primary }}>
                        With {event.partner}
                      </h3>
                      <div style={styles.eventBox}>
                        <h4 style={styles.subheading}>{event.title}</h4>
                        <p style={styles.text}>
                          <strong>Date:</strong> {event.date} | {event.time}<br/>
                          <strong>Location:</strong> {event.location}
                        </p>
                        <p style={styles.text}>
                          {event.description}
                        </p>
                        <a href={event.registrationUrl} style={styles.button}>Register Now</a>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            </div>
          )}

          {/* Alumni Spotlight */}
          {data.alumniSpotlight.name && (
            <div style={styles.sectionWrapper}>
              <CopyButton 
                onClick={() => copyElementHtml(alumniRef.current, 'Alumni Spotlight')} 
                label="Alumni" 
              />
              <tr ref={alumniRef}>
                <td style={styles.section}>
                  <h2 style={styles.heading}>Alumni of the Month</h2>
                  <div style={styles.eventBox}>
                    <h3 style={styles.subheading}>
                      {data.alumniSpotlight.name}, {data.alumniSpotlight.class}
                    </h3>
                    <p style={styles.text}>
                      {data.alumniSpotlight.description}
                    </p>
                    <a href={data.alumniSpotlight.readMoreUrl} style={styles.link}>
                      Read {data.alumniSpotlight.name.split(' ')[0]}'s Full Story →
                    </a>
                  </div>
                </td>
              </tr>
            </div>
          )}

          {/* Community Links */}
          {data.communityLinks.length > 0 && (
            <div style={styles.sectionWrapper}>
              <CopyButton 
                onClick={() => copyElementHtml(communityRef.current, 'Community Links')} 
                label="Community" 
              />
              <tr ref={communityRef}>
                <td style={styles.section}>
                  <h2 style={styles.heading}>Join Our Communities</h2>
                  
                  {data.communityLinks.map((link, index) => (
                    <div key={index} style={styles.eventBox}>
                      <h3 style={styles.subheading}>{link.title}</h3>
                      <p style={styles.text}>
                        {link.description}
                      </p>
                      <a href={link.url} style={styles.button}>
                        {link.title.includes('WhatsApp') ? '💬 Join Group' : 
                         link.title.includes('AI') ? '🤖 Join AI Studio' : 
                         '🔗 Join Now'}
                      </a>
                    </div>
                  ))}
                </td>
              </tr>
            </div>
          )}

          {/* Membership */}
          <div style={styles.sectionWrapper}>
            <CopyButton 
              onClick={() => copyElementHtml(membershipRef.current, 'Membership')} 
              label="Membership" 
            />
            <tr ref={membershipRef}>
              <td style={styles.section}>
                <div style={styles.eventBox}>
                  <h2 style={{ ...styles.heading, marginBottom: '8px' }}>Become a Member</h2>
                  <p style={styles.text}>
                    Join the Wharton Club UK to access exclusive events, networking opportunities, and resources designed to advance your career and connections.
                  </p>
                  <a href="https://www.whartonclubuk.net/become_a_member" style={styles.button}>
                    Become a Member
                  </a>
                </div>
              </td>
            </tr>
          </div>

          {/* Footer */}
          <div style={styles.sectionWrapper}>
            <CopyButton 
              onClick={() => copyElementHtml(footerRef.current, 'Footer')} 
              label="Footer" 
            />
            <tr ref={footerRef}>
              <td style={styles.footer}>
                <p style={styles.text}>
                  <strong>Stay connected with us:</strong><br/>
                  <a href="https://www.whartonclubuk.net/" style={styles.link}>Website</a> | {' '}
                  <a href="https://www.linkedin.com/company/wharton-club-uk/" style={styles.link}>LinkedIn</a>
                </p>
                <p style={styles.text}>
                  <strong>Contact us:</strong> <a href="mailto:webmaster@whartonclubuk.net" style={styles.link}>webmaster@whartonclubuk.net</a>
                </p>
                <p style={styles.text}>
                  Wharton Club of the UK<br/>
                  Russell House, Oxford Road<br/>
                  Bournemouth, Dorset, BH8 8EX
                </p>
              </td>
            </tr>
          </div>
        </tbody>
      </table>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        padding: '16px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        border: '1px solid #e0e8f0'
      }}>
        <p style={{ 
          margin: 0, 
          color: '#011F5B', 
          fontSize: '14px',
          fontWeight: '600'
        }}>
          💡 Tip: Click the "📋 Copy" button on any section to copy just that part's HTML
        </p>
      </div>
    </div>
  );
};

export default NewsletterPreview;