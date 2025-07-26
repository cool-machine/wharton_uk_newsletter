import React from 'react';
import { NewsletterData, NewsletterSection } from './App';

interface Props {
  data: NewsletterData;
}

const NewsletterPreview: React.FC<Props> = ({ data }) => {
  // Clean and make HTML email-safe for NationBuilder
  const makeEmailSafe = (htmlContent: string) => {
    if (!htmlContent) return '';
    
    // First, extract just the text content from the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    let textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clean up any extra whitespace
    textContent = textContent.trim().replace(/\s+/g, ' ');
    
    // Replace spaces with non-breaking spaces to prevent line breaks
    const safeText = textContent.replace(/\s/g, '&nbsp;');
    
    // Debug: log what we're producing
    console.log('Original HTML:', htmlContent);
    console.log('Extracted text:', textContent);
    console.log('Safe text:', safeText);
    
    // Return clean, simple HTML without complex styling
    return safeText;
  };

  // Wharton brand colors
  const colors = {
    primary: '#990000', // Wharton Red
    secondary: '#011F5B', // Wharton Blue
    text: {
      primary: '#333333',
      secondary: '#666666'
    },
    divider: '#e0e0e0'
  };

  const styles = {
    table: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      borderCollapse: 'collapse' as const,
      // Mobile responsive
      minWidth: '320px'
    },
    header: {
      backgroundColor: colors.primary,
      color: '#ffffff',
      padding: '14px 16px',
      textAlign: 'center' as const,
      height: '100px',
      maxHeight: '100px',
      minHeight: '100px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      boxSizing: 'border-box'
    },
    headerTitle: {
      fontSize: '24px',
      margin: '0',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    section: {
      padding: '20px 16px'
    },
    heading: {
      fontSize: '20px',
      color: colors.text.primary,
      marginBottom: '16px',
      fontWeight: 'bold',
      lineHeight: '1.3'
    },
    subheading: {
      fontSize: '16px',
      color: colors.text.primary,
      marginBottom: '8px',
      fontWeight: '600',
      lineHeight: '1.3'
    },
    text: {
      color: colors.text.secondary,
      lineHeight: '1.6',
      margin: '0 0 16px 0',
      fontSize: '14px'
    },
    eventBox: {
      backgroundColor: '#f9f9f9',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '16px',
      border: `2px solid ${colors.primary}`
    },
    communityBox: {
      backgroundColor: colors.primary,
      color: '#ffffff',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '16px',
      border: `2px solid ${colors.primary}`
    },
    button: {
      display: 'inline-block',
      backgroundColor: colors.secondary,
      color: '#ffffff',
      padding: '10px 16px',
      textDecoration: 'none',
      borderRadius: '4px',
      marginTop: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      minWidth: '120px',
      textAlign: 'center' as const,
      lineHeight: '1.4'
    },
    highlight: {
      borderLeft: `4px solid ${colors.primary}`,
      paddingLeft: '12px',
      marginBottom: '16px'
    },
    footer: {
      padding: '20px 16px',
      borderTop: '1px solid #eaeaea',
      textAlign: 'center' as const,
      backgroundColor: '#f8f8f8'
    },
    link: {
      color: colors.primary,
      textDecoration: 'none'
    },
    footerLink: {
      color: colors.secondary,
      textDecoration: 'none'
    }
  };

  const renderSectionContent = (section: NewsletterSection) => {
    switch (section.type) {
      case 'rich-text':
        return (
          <div>
            {section.imageUrl && (
              <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                <img 
                  src={section.imageUrl} 
                  alt={section.imageAlt || 'Section image'} 
                  className="responsive-image"
                  style={{ 
                    width: section.imageWidth ? `${section.imageWidth}px` : 'auto',
                    height: section.imageHeight ? `${section.imageHeight}px` : 'auto',
                    maxWidth: '100%', 
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            )}
            <div 
              className="responsive-text"
              style={{ 
                ...styles.text, 
                margin: 0,
                fontFamily: 'Arial, sans-serif',
                // Fix bullet points and lists staying within bounds
                paddingLeft: '0',
                marginLeft: '0'
              }}
              dangerouslySetInnerHTML={{ __html: section.richContent || '' }}
            />
            {section.sectionUrl && (
              <div style={{ marginTop: '16px' }}>
                <a href={section.sectionUrl} style={styles.link}>
                  Learn More →
                </a>
              </div>
            )}
          </div>
        );

      case 'highlights':
        return (
          <>
            {section.items.map((item, index) => (
              <div key={index} style={styles.highlight}>
                <h3 style={styles.subheading}>{item.title}</h3>
                <p style={styles.text}>{item.description}</p>
              </div>
            ))}
          </>
        );

      case 'events':
      case 'partner-events':
        return (
          <>
            {section.items.map((item, index) => (
              <div key={index}>
                {section.type === 'partner-events' && item.partner && (
                  <h3 style={{ ...styles.subheading, color: colors.primary }}>
                    With {item.partner}
                  </h3>
                )}
                <div style={styles.eventBox}>
                  <h3 style={styles.subheading}>{item.title}</h3>
                  {(item.date || item.time || item.location) && (
                    <p style={styles.text}>
                      {item.date && <><strong>Date:</strong> {item.date}</>}
                      {item.time && <> | {item.time}</>}
                      {item.location && <><br/><strong>Location:</strong> {item.location}</>}
                    </p>
                  )}
                  <p style={styles.text}>{item.description}</p>
                  {item.registrationUrl && item.registrationUrl !== '#' && (
                    <a href={item.registrationUrl} style={styles.button}>Register Now</a>
                  )}
                </div>
              </div>
            ))}
          </>
        );

      case 'alumni-spotlight':
        return (
          <>
            {section.items.map((item, index) => (
              <div key={index} style={styles.eventBox}>
                <h3 style={styles.subheading}>
                  {item.name && item.class ? `${item.name}, ${item.class}` : item.title}
                </h3>
                <p style={styles.text}>{item.description}</p>
                {item.readMoreUrl && item.readMoreUrl !== '#' && (
                  <a href={item.readMoreUrl} style={styles.link}>
                    Read More →
                  </a>
                )}
              </div>
            ))}
          </>
        );

      case 'community-links':
        return (
          <>
            {section.items.map((item, index) => (
              <div key={index} style={styles.eventBox}>
                <h3 style={styles.subheading}>{item.title}</h3>
                <p style={styles.text}>{item.description}</p>
                {item.url && (
                  <a href={item.url} style={styles.button}>
                    {item.title.toLowerCase().includes('whatsapp') ? '💬 Join Group' : 
                     item.title.toLowerCase().includes('ai') ? '🤖 Join AI Studio' : 
                     '🔗 Join Now'}
                  </a>
                )}
              </div>
            ))}
          </>
        );

      default: // custom
        return (
          <>
            {section.items.map((item, index) => (
              <div key={index} style={styles.highlight}>
                <h3 style={styles.subheading}>{item.title}</h3>
                <p style={styles.text}>{item.description}</p>
                {item.url && (
                  <a href={item.url} style={styles.link}>Learn More →</a>
                )}
              </div>
            ))}
          </>
        );
    }
  };

  return (
    <div>
      <h2 style={{ color: '#011F5B', marginBottom: '24px', textAlign: 'center' }}>
        👁 Newsletter Preview
      </h2>
      
      {/* Responsive CSS for email clients */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Email client viewport fix */
          @-ms-viewport { width: device-width; }
          
          /* Rich text paragraph spacing */
          .responsive-text p {
            margin: 0 0 16px 0 !important;
          }
          .responsive-text p:last-child {
            margin-bottom: 0 !important;
          }
          .responsive-section-title p {
            margin: 0 0 8px 0 !important;
          }
          .responsive-section-title p:last-child {
            margin-bottom: 0 !important;
          }
          
          /* Header title specific styles - email client compatible */
          .responsive-header-title {
            white-space: nowrap !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.2 !important;
            text-align: center !important;
            font-size: 20px !important;
            font-weight: bold !important;
            color: #ffffff !important;
          }
          .responsive-header-title p {
            white-space: nowrap !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.2 !important;
            text-align: center !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            color: inherit !important;
          }
          }
          .responsive-header .responsive-text p {
            margin: 0 !important;
            line-height: 1.15 !important;
          }
          
          /* Constrain header height - FORCE NationBuilder compliance */
          .responsive-header {
            height: 100px !important;
            min-height: 100px !important;
            max-height: 100px !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            padding: 14px 16px !important;
          }
          
          /* Override any NationBuilder padding/margin interference */
          .responsive-header * {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Force header title constraints - give enough space for full characters */
          .responsive-header-title {
            height: 40px !important;
            max-height: 40px !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.2 !important;
            overflow: visible !important;
            font-size: 20px !important;
            font-weight: bold !important;
            color: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }
          
          /* Force newsletter title constraints - give enough space for full characters */
          .responsive-header .responsive-text {
            height: 26px !important;
            max-height: 26px !important;
            margin: 2px 0 0 0 !important;
            padding: 0 !important;
            line-height: 1.3 !important;
            overflow: visible !important;
            font-size: 14px !important;
            color: #ffffff !important;
            display: block !important;
            text-align: center !important;
            width: 100% !important;
          }
          
          /* Fix community link buttons - don't inherit header styles */
          .responsive-button {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            line-height: 1.2 !important;
            font-size: 12px !important;
            font-weight: bold !important;
            color: #ffffff !important;
            text-decoration: none !important;
            white-space: normal !important;
            word-break: keep-all !important;
            overflow-wrap: break-word !important;
            padding: 8px 12px !important;
            box-sizing: border-box !important;
            width: 200px !important;
            height: 60px !important;
            max-width: 200px !important;
            max-height: 60px !important;
            overflow: hidden !important;
          }
          
          /* General list formatting for all screen sizes */
          .responsive-text ul, .responsive-text ol {
            padding-left: 24px;
            margin-left: 0;
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .responsive-text li {
            margin-bottom: 6px;
            line-height: 1.5;
          }
          .responsive-text ul ul, .responsive-text ol ol {
            margin-top: 4px;
            margin-bottom: 4px;
          }
          
          /* Tablet styles (601px - 1024px) */
          @media only screen and (min-width: 601px) and (max-width: 1024px) {
            .responsive-table {
              width: 100% !important;
              max-width: 500px !important;
            }
            .responsive-td {
              padding: 16px !important;
            }
            .responsive-header {
              height: 95px !important;
              min-height: 95px !important;
              max-height: 95px !important;
              padding: 14px 16px !important;
            }
            .responsive-header-title {
              font-size: 18px !important;
              line-height: 1.25 !important;
            }
            .responsive-section-title {
              font-size: 19px !important;
            }
            .responsive-text {
              font-size: 15px !important;
            }
            .responsive-button {
              width: 190px !important;
              height: 55px !important;
              max-width: 190px !important;
              max-height: 55px !important;
              margin: 10px auto !important;
              padding: 8px 12px !important;
              font-size: 11px !important;
              line-height: 1.2 !important;
            }
            .responsive-community-container {
              padding: 10px !important;
            }
            .responsive-image {
              max-width: 100% !important;
              height: auto !important;
            }
            /* Fix list indentation for tablets */
            .responsive-text ul, .responsive-text ol {
              padding-left: 20px !important;
              margin-left: 0 !important;
            }
            .responsive-text li {
              margin-bottom: 4px !important;
            }
          }
          
          /* Mobile phone styles (up to 600px) */
          @media only screen and (max-width: 600px) {
            .responsive-table {
              width: 100% !important;
              max-width: 100% !important;
            }
            .responsive-td {
              padding: 12px !important;
            }
            .responsive-header {
              height: 90px !important;
              min-height: 90px !important;
              max-height: 90px !important;
              padding: 12px 12px !important;
            }
            .responsive-header-title {
              font-size: 16px !important;
              line-height: 1.3 !important;
            }
            .responsive-section-title {
              font-size: 18px !important;
            }
            .responsive-text {
              font-size: 14px !important;
            }
            .responsive-button {
              width: 180px !important;
              height: 50px !important;
              max-width: 180px !important;
              max-height: 50px !important;
              margin: 12px auto !important;
              padding: 6px 10px !important;
              font-size: 10px !important;
              line-height: 1.1 !important;
            }
            .responsive-community-container {
              padding: 8px !important;
            }
            .responsive-image {
              max-width: 100% !important;
              height: auto !important;
            }
            /* Fix list indentation for mobile */
            .responsive-text ul, .responsive-text ol {
              padding-left: 16px !important;
              margin-left: 0 !important;
            }
            .responsive-text li {
              margin-bottom: 4px !important;
            }
          }
        `
      }} />
      
      <table style={styles.table} className="responsive-table">
        <tbody>
          {/* Header */}
          <tr>
            <td style={styles.header} className="responsive-header">
              <div 
                className="responsive-header-title"
                style={{
                  fontSize: '20px',
                  margin: '0',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  lineHeight: '1.2',
                  minHeight: '24px',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                  wordBreak: 'normal',
                  overflowWrap: 'normal'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: makeEmailSafe(data.headerTitle || '')
                }}
              />
              <div 
                className="responsive-text"
                style={{ 
                  margin: '2px 0 0 0', 
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: '1.3',
                  height: '26px',
                  maxHeight: '26px',
                  padding: '0',
                  display: 'block',
                  textAlign: 'center',
                  width: '100%',
                  overflow: 'visible'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: data.title || ''
                }}
              />
            </td>
          </tr>

          {/* Greeting */}
          <tr>
            <td style={styles.section} className="responsive-td">
              <div 
                className="responsive-section-title"
                style={{ 
                  fontSize: '20px',
                  color: styles.heading.color,
                  marginBottom: '16px',
                  fontWeight: 'bold',
                  lineHeight: '1.3'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: data.salutation || ''
                }}
              />
              <div 
                className="responsive-text"
                style={{ 
                  color: styles.text.color,
                  lineHeight: '1.6',
                  fontSize: '14px'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: data.greeting || ''
                }}
              />
            </td>
          </tr>

          {/* Dynamic Sections */}
          {data.sections.map((section) => (
            <tr key={section.id}>
              <td style={styles.section} className="responsive-td">
                <h2 style={styles.heading} className="responsive-section-title">{section.title}</h2>
                {renderSectionContent(section)}
              </td>
            </tr>
          ))}

          {/* Fixed Community Links */}
          {data.communityLinks.length > 0 && (
            <tr>
              <td style={styles.section} className="responsive-td">
                <h2 style={styles.heading} className="responsive-section-title">Join Our Communities</h2>
                
                {data.communityLinks.map((link, index) => (
                  <div key={index} style={styles.eventBox} className="responsive-community-container">
                    <h3 style={styles.subheading}>{link.title}</h3>
                    <p style={styles.text} className="responsive-text">
                      {link.description}
                    </p>
                    <a href={link.url} style={{ 
                      ...styles.button, 
                      backgroundColor: colors.primary, 
                      width: '200px', 
                      height: '60px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      textAlign: 'center',
                      fontSize: '12px',
                      lineHeight: '1.2',
                      padding: '8px 12px',
                      boxSizing: 'border-box'
                    }} className="responsive-button">
                      {link.title.toLowerCase().includes('whatsapp') ? 'Join Group' : 
                       link.title.toLowerCase().includes('ai studio') ? 'Join AI Studio' : 
                       link.title.toLowerCase().includes('club member') ? 'Become a Member' :
                       'Join Now'}
                    </a>
                  </div>
                ))}
              </td>
            </tr>
          )}

          {/* Signature */}
          {data.signature && (
            <tr>
              <td style={styles.section} className="responsive-td">
                <div 
                  className="responsive-text"
                  style={{ 
                    color: styles.text.color,
                    lineHeight: '1.6',
                    fontSize: '14px',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: `1px solid ${colors.divider}`
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: data.signature || ''
                  }}
                />
              </td>
            </tr>
          )}

          {/* Footer */}
          <tr>
            <td style={styles.footer} className="responsive-td">
              <p style={styles.text} className="responsive-text">
                <strong>Stay connected with us:</strong><br/>
                <a href="https://www.whartonclubuk.net/" style={styles.footerLink}>Website</a> | {' '}
                <a href="https://www.linkedin.com/company/wharton-club-uk/" style={styles.footerLink}>LinkedIn</a>
              </p>
              <p style={styles.text} className="responsive-text">
                <strong>Contact us:</strong> <a href="mailto:webmaster@whartonclubuk.net" style={styles.footerLink}>webmaster@whartonclubuk.net</a>
              </p>
              <p style={styles.text} className="responsive-text">
The Wharton Club of the United Kingdom<br/>
                Russell House, Oxford Road<br/>
                Bournemouth, Dorset, BH8 8EX
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterPreview;