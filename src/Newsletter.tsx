import React from 'react';

const Newsletter: React.FC = () => {
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
    }
  };

  return (
    <table style={styles.table}>
      <tbody>
        {/* Header */}
        <tr>
          <td style={styles.header}>
            <h1 style={styles.headerTitle}>March 2024 Newsletter</h1>
            <p style={{ margin: '8px 0 0 0', fontSize: '18px' }}>Wharton Club of the UK</p>
          </td>
        </tr>

        {/* Greeting */}
        <tr>
          <td style={styles.section}>
            <h2 style={styles.heading}>Dear Wharton Alumni,</h2>
            <p style={styles.text}>
              We hope this newsletter finds you well. We're excited to share updates about our recent activities and upcoming events that will help strengthen our alumni community.
            </p>
          </td>
        </tr>

        {/* Recent Highlights */}
        <tr>
          <td style={styles.section}>
            <h2 style={styles.heading}>Recent Highlights</h2>
            
            <div style={styles.highlight}>
              <h3 style={styles.subheading}>Annual London Networking Event</h3>
              <p style={styles.text}>
                Last month, we hosted our annual networking event at The Shard, bringing together over 100 alumni for an evening of connections and insights. The event featured spectacular views and meaningful conversations.
              </p>
            </div>

            <div style={styles.highlight}>
              <h3 style={styles.subheading}>Women in Finance Panel Discussion</h3>
              <p style={styles.text}>
                Our recent panel featuring distinguished alumnae in finance drew an engaged audience of over 80 participants, discussing career advancement and industry trends.
              </p>
            </div>
          </td>
        </tr>

        {/* Upcoming Events */}
        <tr>
          <td style={styles.section}>
            <h2 style={styles.heading}>Upcoming Wharton UK Club Events</h2>
            
            <div style={styles.eventBox}>
              <h3 style={styles.subheading}>Spring Leadership Forum</h3>
              <p style={styles.text}>
                <strong>Date:</strong> April 15, 2024 | 6:30 PM<br/>
                <strong>Location:</strong> The Royal Institution, London
              </p>
              <p style={styles.text}>
                Join us for an evening of insights from industry leaders discussing the future of leadership in the digital age.
              </p>
              <a href="#" style={styles.button}>Register Now</a>
            </div>

            <div style={styles.eventBox}>
              <h3 style={styles.subheading}>FinTech Innovation Workshop</h3>
              <p style={styles.text}>
                <strong>Date:</strong> April 28, 2024 | 2:00 PM<br/>
                <strong>Location:</strong> Level39, Canary Wharf
              </p>
              <p style={styles.text}>
                Explore the latest trends in financial technology with hands-on demonstrations and expert discussions.
              </p>
              <a href="#" style={styles.button}>Register Now</a>
            </div>
          </td>
        </tr>

        {/* Partner Events */}
        <tr>
          <td style={styles.section}>
            <h2 style={styles.heading}>Partner Events</h2>
            
            <h3 style={{ ...styles.subheading, color: colors.primary }}>With Harvard Business School</h3>
            <div style={styles.eventBox}>
              <h4 style={styles.subheading}>Joint Networking Reception</h4>
              <p style={styles.text}>
                <strong>Date:</strong> May 5, 2024 | 7:00 PM<br/>
                <strong>Location:</strong> The Ned, City of London
              </p>
              <a href="#" style={styles.button}>Register Now</a>
            </div>

            <h3 style={{ ...styles.subheading, color: colors.primary }}>With Columbia Business School</h3>
            <div style={styles.eventBox}>
              <h4 style={styles.subheading}>ESG Investment Forum</h4>
              <p style={styles.text}>
                <strong>Date:</strong> May 12, 2024 | 6:30 PM<br/>
                <strong>Location:</strong> Bloomberg London HQ
              </p>
              <a href="#" style={styles.button}>Register Now</a>
            </div>
          </td>
        </tr>

        {/* Alumni Spotlight */}
        <tr>
          <td style={styles.section}>
            <h2 style={styles.heading}>Alumni of the Month</h2>
            <div style={styles.eventBox}>
              <h3 style={styles.subheading}>Sarah Johnson, WG'15</h3>
              <p style={styles.text}>
                Sarah recently launched a successful fintech startup that was acquired by a major bank. She credits her Wharton network for connecting her with key investors and advisors throughout her entrepreneurial journey.
              </p>
              <a href="#" style={styles.link}>Read Sarah's Full Story →</a>
            </div>
          </td>
        </tr>

        {/* Community Links */}
        <tr>
          <td style={styles.section}>
            <h2 style={styles.heading}>Join Our Communities</h2>
            <div style={styles.eventBox}>
              <h3 style={styles.subheading}>Wharton Club UK WhatsApp Group</h3>
              <p style={styles.text}>
                Stay connected with fellow alumni through our main WhatsApp group for real-time updates and networking opportunities.
              </p>
              <a href="https://forms.gle/CDvFgFGrgLFZB3HL9" style={styles.button}>Join WhatsApp Group</a>
            </div>

            <div style={styles.eventBox}>
              <h3 style={styles.subheading}>Wharton Alumni AI Studio</h3>
              <p style={styles.text}>
                Connect with AI and deep tech enthusiasts in our growing global community focused on artificial intelligence and emerging technologies.
              </p>
              <a href="https://forms.gle/CoDwPjqsn8Hn1X8v7" style={styles.button}>Join AI Studio</a>
            </div>
          </td>
        </tr>

        {/* Membership */}
        <tr>
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

        {/* Footer */}
        <tr>
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
      </tbody>
    </table>
  );
};

export default Newsletter;