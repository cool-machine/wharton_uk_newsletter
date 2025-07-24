import React, { useState, useRef } from 'react';
import { MessageSquare, Copy } from 'lucide-react';

function App() {
  const [showHtml, setShowHtml] = useState(false);
  const newsletterRef = useRef<HTMLTableElement>(null);

  // Wharton brand colors
  const colors = {
    primary: '#990000', // Wharton Red
    secondary: '#011F5B', // Wharton Blue
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  };

  // Common styles that can be reused
  const styles = {
    button: {
      display: 'inline-block',
      backgroundColor: colors.secondary,
      color: '#ffffff',
      padding: '12px 16px',
      borderRadius: '4px',
      textDecoration: 'none',
      marginTop: '8px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '200px',
      textAlign: 'center' as const
    },
    heading: {
      fontSize: 'clamp(18px, 3vw, 22px)',
      color: colors.text.primary,
      marginBottom: '16px'
    },
    subheading: {
      fontSize: 'clamp(15px, 2.5vw, 18px)',
      color: colors.text.primary,
      marginBottom: '8px'
    },
    text: {
      color: colors.text.secondary,
      lineHeight: '1.6',
      margin: '0',
      fontSize: 'clamp(14px, 2vw, 16px)'
    },
    link: {
      color: colors.primary,
      textDecoration: 'none',
      fontSize: 'clamp(14px, 2vw, 16px)'
    },
    eventBox: {
      backgroundColor: '#f9f9f9',
      padding: '16px',
      borderRadius: '4px',
      marginBottom: '16px'
    },
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '16px'
    },
    galleryImage: {
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '4px',
      display: 'block',
    }
  };

  const getNewsletterHtml = () => {
    return newsletterRef.current?.outerHTML || '';
  };

  const copyToClipboard = () => {
    const html = getNewsletterHtml();
    navigator.clipboard.writeText(html);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <table ref={newsletterRef} style={{ width: '100%', minWidth: '320px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', borderCollapse: 'collapse' }}>
          <tbody>
            {/* Header */}
            <tr>
              <td style={{ backgroundColor: colors.primary, color: '#ffffff', padding: '24px' }}>
                <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', margin: '0' }}>March 2024 Newsletter</h1>
              </td>
            </tr>

            {/* Greeting Section */}
            <tr>
              <td style={{ padding: '24px' }}>
                <h2 style={styles.heading}>Dear Wharton Alumni,</h2>
                <p style={styles.text}>
                  We hope this newsletter finds you well. We're excited to share updates about our recent activities and upcoming events.
                </p>
              </td>
            </tr>

            {/* Recent Highlights Section */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Recent Highlights</h2>
                <div style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: '16px', marginBottom: '16px' }}>
                  <h3 style={styles.subheading}>Annual London Networking Event</h3>
                  <p style={styles.text}>
                    Last month, we hosted our annual networking event at The Shard, bringing together over 100 alumni for an evening of connections and insights.
                  </p>
                </div>
                <div style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: '16px' }}>
                  <h3 style={styles.subheading}>Women in Finance Panel Discussion</h3>
                  <p style={styles.text}>
                    Our recent panel featuring distinguished alumnae in finance drew an engaged audience of over 80 participants.
                  </p>
                </div>
              </td>
            </tr>

            {/* Upcoming Wharton UK Club Events */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Upcoming Wharton UK Club Events</h2>
                <div style={styles.eventBox}>
                  <h3 style={styles.subheading}>Spring Leadership Forum</h3>
                  <p style={styles.text}>April 15, 2024 | 6:30 PM</p>
                  <p style={styles.text}>The Royal Institution, London</p>
                  <p style={{ ...styles.text, margin: '8px 0' }}>
                    Join us for an evening of insights from industry leaders discussing the future of leadership in the digital age.
                  </p>
                  <a href="#" style={styles.button}>Register Now</a>
                </div>
                <div style={styles.eventBox}>
                  <h3 style={styles.subheading}>FinTech Innovation Workshop</h3>
                  <p style={styles.text}>April 28, 2024 | 2:00 PM</p>
                  <p style={styles.text}>Level39, Canary Wharf</p>
                  <p style={{ ...styles.text, margin: '8px 0' }}>
                    Explore the latest trends in financial technology with hands-on demonstrations and expert discussions.
                  </p>
                  <a href="#" style={styles.button}>Register Now</a>
                </div>
              </td>
            </tr>

            {/* Partner Events */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Partner Events</h2>
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ ...styles.subheading, color: colors.primary }}>With Harvard Business School</h3>
                  <div style={styles.eventBox}>
                    <h4 style={styles.subheading}>Joint Networking Reception</h4>
                    <p style={styles.text}>May 5, 2024 | 7:00 PM</p>
                    <p style={styles.text}>The Ned, City of London</p>
                    <a href="#" style={styles.button}>Register Now</a>
                  </div>
                </div>
                <div>
                  <h3 style={{ ...styles.subheading, color: colors.primary }}>With Columbia Business School</h3>
                  <div style={styles.eventBox}>
                    <h4 style={styles.subheading}>ESG Investment Forum</h4>
                    <p style={styles.text}>May 12, 2024 | 6:30 PM</p>
                    <p style={styles.text}>Bloomberg London HQ</p>
                    <a href="#" style={styles.button}>Register Now</a>
                  </div>
                </div>
              </td>
            </tr>

            {/* Alumni of the Month */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Alumni of the Month</h2>
                <div style={styles.eventBox}>
                  <div style={{ display: 'flex', alignItems: 'start', marginBottom: '12px', flexDirection: window.innerWidth <= 480 ? 'column' : 'row' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&fit=crop" 
                      alt="Sarah Johnson" 
                     style={{ width: '80px', height: '80px', borderRadius: '40px', marginRight: '16px', marginBottom: window.innerWidth <= 480 ? '16px' : '0', objectFit: 'cover', maxWidth: '100%', display: 'block', flexShrink: 0 }}
                    />
                    <div>
                      <h3 style={styles.subheading}>Sarah Johnson, WG'15</h3>
                      <p style={{ ...styles.text, margin: '0 0 8px 0' }}>
                        Sarah recently launched a successful fintech startup that was acquired by a major bank. She credits her Wharton network for connecting her with key investors and advisors.
                      </p>
                      <a href="#" style={styles.link}>Read Sarah's Story</a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Event Photo Gallery */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Recent Event Gallery</h2>
                <div style={styles.eventBox}>
                  <p style={{ ...styles.text, marginBottom: '16px' }}>
                    Highlights from our recent events. Click on any image to view more photos from the event.
                  </p>
                  <div style={{ marginBottom: '16px' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=1200&h=400&fit=crop" 
                      alt="Christmas Party Event Gallery" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '100%',
                        display: 'block',
                        borderRadius: '4px !important',
                        objectFit: 'contain !important'
                      }}
                    />
                    <p style={{ ...styles.text, marginTop: '8px', fontSize: 'clamp(12px, 1.8vw, 14px)' }}>
                      Christmas Party Event Highlights
                    </p>
                  </div>
                  <a href="#" style={{ ...styles.button, marginTop: '16px' }}>View All Photos</a>
                </div>
              </td>
            </tr>

            {/* Help the Club */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Help the Club</h2>
                <div style={styles.eventBox}>
                  <p style={{ ...styles.text, margin: '0 0 16px 0' }}>
                    We're always looking for enthusiastic alumni to join our committee and help shape the future of our club. Share your ideas for events or activities, or volunteer to help organize them.
                  </p>
                  <a href="#" style={styles.button}>Get Involved</a>
                </div>
              </td>
            </tr>

            {/* Join Our Communities */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Join Our Communities</h2>
                <div style={styles.eventBox}>
                  <p style={{ ...styles.text, margin: '0 0 16px 0' }}>
                    Stay connected with fellow alumni through our digital platforms:
                  </p>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: colors.text.primary, fontSize: 'clamp(14px, 2vw, 16px)' }}>WCUK WhatsApp Group</strong>
                    <p style={styles.text}>
                      Join our main WhatsApp group to stay connected with the community.
                    </p>
                    <a href="https://forms.gle/CDvFgFGrgLFZB3HL9" style={{ ...styles.button, width: '100%', maxWidth: '300px' }}>
                      <MessageSquare size={16} style={{ verticalAlign: 'middle', marginRight: '8px', display: 'inline' }} />
                      Join WhatsApp Group
                    </a>
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, fontSize: 'clamp(14px, 2vw, 16px)' }}>Wharton Alumni AI Studio WhatsApp Group</strong>
                    <p style={styles.text}>
                      Connect with AI and deep tech enthusiasts in our growing global community.
                    </p>
                    <a href="https://forms.gle/CoDwPjqsn8Hn1X8v7" style={{ ...styles.button, width: '100%', maxWidth: '300px' }}>
                      Wharton Alumni AI Studio
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            {/* Become a Member */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <div style={styles.eventBox}>
                  <h2 style={{ ...styles.heading, marginBottom: '8px' }}>Become a Member</h2>
                  <p style={{ ...styles.text, margin: '0 0 16px 0' }}>
                    Join the Wharton Club UK to access exclusive events, networking opportunities, and resources.
                  </p>
                  <a href="https://www.whartonclubuk.net/become_a_member" style={styles.button}>
                    Become a Member
                  </a>
                </div>
              </td>
            </tr>

            {/* Footer */}
            <tr>
              <td style={{ padding: '24px', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
                <p style={{ ...styles.text, margin: '0 0 16px 0' }}>
                  Stay connected with us:
                  <br />
                  <a href="https://www.whartonclubuk.net/" style={styles.link}>Website</a> |{' '}
                  <a href="https://www.linkedin.com/company/wharton-club-uk/" style={styles.link}>LinkedIn</a>
                </p>
                <p style={{ ...styles.text, margin: '0 0 8px 0' }}>
                  Contact us: <a href="mailto:webmaster@whartonclubuk.net" style={styles.link}>webmaster@whartonclubuk.net</a>
                </p>
                <p style={{ ...styles.text, margin: '0' }}>
                  Wharton Club of the UK<br />
                  Russell House, Oxford Road<br />
                  Bournemouth, Dorset, BH8 8EX
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Controls */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={() => setShowHtml(!showHtml)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            {showHtml ? 'Hide HTML' : 'Show HTML'}
          </button>
          
          <button
            onClick={copyToClipboard}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Copy size={16} />
            Copy HTML to Clipboard
          </button>

          {showHtml && (
            <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto w-full">
              <code>{getNewsletterHtml()}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;