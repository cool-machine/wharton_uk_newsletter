import React from 'react';
import { MessageSquare } from 'lucide-react';

function AprilNewsletter() {
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
      marginBottom: '16px',
      overflow: 'visible'
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <table style={{ width: '100%', minWidth: '320px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', borderCollapse: 'collapse' }}>
          <tbody>
            {/* Header */}
            <tr>
              <td style={{ backgroundColor: colors.primary, color: '#ffffff', padding: '24px' }}>
                <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', margin: '0' }}>April 2024 Newsletter</h1>
              </td>
            </tr>

            {/* Greeting Section */}
            <tr>
              <td style={{ padding: '24px' }}>
                <h2 style={styles.heading}>Dear George,</h2>
                <p style={styles.text}>
                  April is flying by, but there's still plenty going on—here's a quick look at what's next!
                </p>
              </td>
            </tr>

            {/* Recent Highlights Section */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Recent Highlights</h2>
                <div style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: '16px', marginBottom: '16px' }}>
                  <h3 style={styles.subheading}>Wharton Real Estate Trip to London: Alumni Happy Hour</h3>
                  <p style={styles.text}>
                    Thursday, May 1st, 2025, 6:00pm — 8:00pm. The Wharton Real Estate Club will be visiting London this May. We have 14 students visiting and would love to meet real estate industry alumni.
                  </p>
                </div>
                <div style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: '16px' }}>
                  <h3 style={styles.subheading}>Wharton Club of the UK (AGM) 2025</h3>
                  <p style={styles.text}>
                    Monday, May 12, 2025, 6:30pm — 8:00pm. Have your say and join us at the WCUK AGM.
                  </p>
                </div>
              </td>
            </tr>

            {/* Upcoming Events */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Upcoming Events</h2>
                <div style={styles.eventBox}>
                  <h3 style={styles.subheading}>The Women's Health Revolution: Science, Innovation & Impact</h3>
                  <p style={styles.text}>Tuesday, May 13, 2025</p>
                  <p style={styles.text}>6:30pm — 8:30pm</p>
                  <a href="#" style={styles.button}>Register Now</a>
                </div>
                <div style={styles.eventBox}>
                  <h3 style={styles.subheading}>Operationalizing Responsible AI and Governance</h3>
                  <p style={styles.text}>Tuesday, May 20, 2025</p>
                  <p style={styles.text}>5:00pm — 6:00pm</p>
                  <p style={{ ...styles.text, margin: '8px 0' }}>
                    AI policy is evolving rapidly, with new regulations and global pressures shaping the field. Join us for insights on Responsible AI and practical strategies for AI governance.
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
                  <div style={styles.eventBox}>
                    <h4 style={styles.subheading}>Tour of The Wiener Holocaust Library</h4>
                    <p style={styles.text}>
                      The world's oldest and Britain's largest collection of original archival material on the Nazi era and the Holocaust. This year it is celebrating its 90th Anniversary.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 style={{ ...styles.subheading, color: colors.primary }}>Coming in Late June/Early July</h3>
                  <div style={styles.eventBox}>
                    <h4 style={styles.subheading}>Super Summer Party</h4>
                    <p style={styles.text}>Want to help us plan this event?</p>
                    <p style={styles.text}>Contact: <a href="mailto:committee@whartonclubuk.net" style={styles.link}>committee@whartonclubuk.net</a></p>
                  </div>
                </div>
              </td>
            </tr>

            {/* Sold Out Events */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Sold Out Events</h2>
                <div style={styles.eventBox}>
                  <h3 style={styles.subheading}>WCUK Regular Dinner</h3>
                  <p style={styles.text}>Saturday, April 26th, 2025</p>
                </div>
                <div style={styles.eventBox}>
                  <h3 style={styles.subheading}>National Gallery Tour</h3>
                  <p style={styles.text}>Sunday, April 27th, 2025</p>
                  <p style={{ ...styles.text, margin: '8px 0' }}>
                    Watch this space for similar events and make sure you register early so you don't miss out.
                  </p>
                </div>
              </td>
            </tr>

            {/* Join Our Communities */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Join Our Communities</h2>
                <div style={styles.eventBox}>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: colors.text.primary, fontSize: 'clamp(14px, 2vw, 16px)' }}>Wharton Club of the UK</strong>
                    <p style={styles.text}>
                      Share recommendations on career, business, culture, and more with fellow Wharton alumni.
                    </p>
                    <a href="#" style={{ ...styles.button, width: '100%', maxWidth: '300px' }}>
                      <MessageSquare size={16} style={{ verticalAlign: 'middle', marginRight: '8px', display: 'inline' }} />
                      Join WhatsApp Group
                    </a>
                  </div>
                  <div>
                    <strong style={{ color: colors.text.primary, fontSize: 'clamp(14px, 2vw, 16px)' }}>Wharton Alumni AI Studio</strong>
                    <p style={styles.text}>
                      Connect with AI and deep tech enthusiasts in our growing global community.
                    </p>
                    <a href="#" style={{ ...styles.button, width: '100%', maxWidth: '300px' }}>
                      Join WhatsApp Group
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

            {/* Alumni of the Month */}
            <tr>
              <td style={{ padding: '0 24px 24px' }}>
                <h2 style={styles.heading}>Alumni of the Month</h2>
                <div style={styles.eventBox}>
                  <div style={{ display: 'flex', alignItems: 'start', marginBottom: '12px', flexDirection: window.innerWidth <= 480 ? 'column' : 'row' }}>
                    <div>
                      <h3 style={styles.subheading}>Dina Geha</h3>
                      <p style={{ ...styles.text, margin: '0 0 8px 0' }}>
                        Dina currently serves as the Global Head of Distribution at BNP Paribas. In her role she is responsible for the various Equity Sales teams globally as well as Client Coordination across Equities in Prime Brokerage, Equity Derivatives and Cash Equities.
                      </p>
                      <p style={{ ...styles.text, margin: '0 0 8px 0' }}>
                        Prior to BNP, Dina was a senior partner at Exane SA and a board member of Exane Inc, a predominantly European Cash Equities brokerage firm, that was sold to BNP Paribas in July 2021 following a longstanding partnership.
                      </p>
                      <p style={{ ...styles.text, margin: '0 0 8px 0' }}>
                        She started her Finance career in Research at DLJ (later Credit Suisse First Boston) in New York covering US Healthcare Services (#1 II rated team) before moving to London into European Equity Sales.
                      </p>
                      <a href="#" style={styles.link}>Read More About Dina</a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Footer */}
            <tr>
              <td style={{ padding: '24px', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
                <p style={{ ...styles.text, margin: '0 0 16px 0' }}>
                  Stay connected with us:
                  <br />
                  <a href="https://www.whartonclubuk.net/" style={styles.link}>Website</a>
                </p>
                <p style={{ ...styles.text, margin: '0' }}>
                  Wharton Club of the United Kingdom
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AprilNewsletter;