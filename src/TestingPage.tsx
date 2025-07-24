import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TestingPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('recentHighlights');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Wharton brand colors
  const colors = {
    primary: '#011F5B',
    secondary: '#990000',
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  };

  const styles = {
    heading: {
      color: colors.primary,
      fontSize: 'clamp(18px, 3vw, 24px)',
      marginBottom: '20px'
    },
    subheading: {
      color: colors.text.primary,
      fontSize: 'clamp(16px, 2.5vw, 20px)',
      marginBottom: '12px'
    },
    text: {
      color: colors.text.secondary,
      fontSize: 'clamp(14px, 2vw, 16px)',
      lineHeight: '1.6'
    },
    eventBox: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '16px'
    },
    button: {
      display: 'inline-block',
      backgroundColor: colors.secondary,
      color: '#ffffff',
      padding: '12px 24px',
      textDecoration: 'none',
      borderRadius: '4px',
      marginTop: '12px',
      width: '300px',
      textAlign: 'center' as const
    }
  };

  const sections = {
    recentHighlights: {
      title: 'Recent Highlights',
      content: [
        {
          title: 'Annual London Networking Event',
          description: 'Last month, we hosted our annual networking event at The Shard, bringing together over 100 alumni for an evening of connections and insights.',
          image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'Women in Finance Panel Discussion',
          description: 'Our recent panel featuring distinguished alumnae in finance drew an engaged audience of over 80 participants.',
          image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&h=600&fit=crop'
        }
      ]
    },
    womensNetworking: {
      title: "Women's Networking Events",
      content: [
        {
          title: 'Women in Leadership Summit',
          description: 'March 8, 2025 | 6:00 PM<br/>The Shard, London<br/>Join us for International Women\'s Day with inspiring speakers, panel discussions, and networking opportunities for women leaders across industries.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'Women in Finance Breakfast Series',
          description: 'Monthly | First Friday | 8:00 AM<br/>Canary Wharf, London<br/>Monthly breakfast networking for women in financial services. Connect with peers, share experiences, and build lasting professional relationships.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'Mentorship Circle: Women Entrepreneurs',
          description: 'April 15, 2025 | 6:30 PM<br/>WeWork, Shoreditch<br/>A supportive environment for women entrepreneurs to share challenges, celebrate successes, and build mentor-mentee relationships.',
          registrationUrl: '#'
        },
        {
          title: 'Women in Tech Innovation Panel',
          description: 'May 20, 2025 | 7:00 PM<br/>Google Campus, London<br/>Hear from successful women in technology about innovation, career growth, and breaking barriers in the tech industry.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&h=600&fit=crop'
        }
      ]
    },
    finalCall: {
      title: 'Final Call',
      content: [
        {
          title: 'WCUK Regular Dinner',
          description: 'Saturday, April 26th, 2025 - Last chance to register for our quarterly dinner event.',
          registrationUrl: '#'
        },
        {
          title: 'National Gallery Tour',
          description: 'Sunday, April 27th, 2025 - Final spots available for our exclusive guided tour.',
          registrationUrl: '#'
        }
      ]
    },
    artisticEvents: {
      title: 'Artistic Events',
      content: [
        {
          title: 'Private Gallery Opening: Contemporary British Art',
          description: 'April 22, 2025 | 6:00 PM<br/>Saatchi Gallery, London<br/>Exclusive preview of emerging British artists with wine reception and curator-led discussion.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'Opera Night: La Traviata',
          description: 'May 10, 2025 | 7:30 PM<br/>Royal Opera House, London<br/>Group booking for Verdi\'s masterpiece with pre-show champagne reception.',
          registrationUrl: '#'
        },
        {
          title: 'Art Workshop: Watercolor Painting',
          description: 'June 5, 2025 | 2:00 PM<br/>Chelsea Arts Club, London<br/>Hands-on watercolor workshop led by professional artist, all materials provided.',
          registrationUrl: '#'
        },
        {
          title: 'Museum After Hours: British Museum',
          description: 'July 18, 2025 | 6:30 PM<br/>British Museum, London<br/>Private after-hours tour of ancient civilizations with expert guide and cocktail reception.',
          registrationUrl: '#'
        }
      ]
    },
    winterParty: {
      title: 'Christmas Party',
      content: [
        {
          title: 'Annual Christmas Celebration',
          description: 'December 15, 2024 | 7:00 PM<br/>The Shard, London<br/>Join us for our annual Christmas celebration with festive drinks, networking, and holiday cheer. Dress code: Smart casual with festive touches.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'Holiday Networking Mixer',
          description: 'December 20, 2024 | 6:30 PM<br/>Covent Garden, London<br/>End the year with connections and conversations in a warm, festive atmosphere.',
          registrationUrl: '#'
        }
      ]
    },
    summerParty: {
      title: 'Summer (4th of July) Party',
      content: [
        {
          title: 'Wharton UK July 4th Garden Party',
          description: 'July 4, 2025 | 6:00 PM<br/>Royal Botanic Gardens, Kew<br/>Celebrate Independence Day with fellow alumni featuring outdoor networking, live music, BBQ, and seasonal refreshments in beautiful garden surroundings.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'July 4th Thames Cruise',
          description: 'July 4, 2025 | 7:30 PM<br/>Westminster Pier, London<br/>An exclusive Independence Day evening cruise along the Thames with American-themed dinner, drinks, and spectacular fireworks views of London.',
          registrationUrl: '#'
        }
      ]
    },
    monthlyDinners: {
      title: 'Monthly Dinners',
      content: [
        {
          title: 'March Quarterly Dinner',
          description: 'March 28, 2025 | 7:00 PM<br/>The Ivy, London<br/>Join fellow alumni for an intimate dinner featuring guest speaker Sarah Mitchell, CEO of FinTech Innovations.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'April Business Leaders Dinner',
          description: 'April 25, 2025 | 7:30 PM<br/>Sketch Restaurant, London<br/>An evening of fine dining and discussion with industry leaders from various sectors.',
          registrationUrl: '#'
        },
        {
          title: 'May Entrepreneurs Dinner',
          description: 'May 30, 2025 | 7:00 PM<br/>Chiltern Firehouse, London<br/>Connect with fellow entrepreneurs and startup founders over an exquisite dinner experience.',
          registrationUrl: '#'
        }
      ]
    },
    otherEvents: {
      title: 'Other Events',
      content: [
        {
          title: 'Wine Tasting Evening',
          description: 'April 12, 2025 | 6:30 PM<br/>Harrods Wine Shop, London<br/>Discover exceptional wines with expert sommelier guidance and fellow wine enthusiasts.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'Art Gallery Private Viewing',
          description: 'May 8, 2025 | 6:00 PM<br/>Tate Modern, London<br/>Exclusive after-hours viewing of the latest contemporary art exhibition with curator-led tour.',
          registrationUrl: '#'
        },
        {
          title: 'Theatre Night: Hamilton',
          description: 'June 15, 2025 | 7:30 PM<br/>Victoria Palace Theatre, London<br/>Group booking for the acclaimed musical with pre-show drinks and networking.',
          registrationUrl: '#'
        },
        {
          title: 'Charity Golf Tournament',
          description: 'September 20, 2025 | 8:00 AM<br/>Wentworth Club, Surrey<br/>Annual charity golf tournament supporting local education initiatives.',
          registrationUrl: '#'
        }
      ]
    },
    aiStudioMeetings: {
      title: 'AI Studio Meetings',
      content: [
        {
          title: 'AI in Healthcare Innovation',
          description: 'April 18, 2025 | 6:00 PM<br/>Google Campus, London<br/>Exploring the latest developments in AI applications for healthcare and medical research.',
          registrationUrl: '#',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&h=600&fit=crop'
        },
        {
          title: 'Machine Learning for Finance',
          description: 'May 16, 2025 | 5:30 PM<br/>Level39, Canary Wharf<br/>Deep dive into ML applications in financial services with hands-on demonstrations.',
          registrationUrl: '#'
        },
        {
          title: 'AI Ethics and Governance Panel',
          description: 'June 20, 2025 | 6:30 PM<br/>Imperial College London<br/>Panel discussion on responsible AI development and regulatory frameworks.',
          registrationUrl: '#'
        },
        {
          title: 'Startup Pitch: AI Innovations',
          description: 'July 25, 2025 | 6:00 PM<br/>WeWork, Moorgate<br/>Alumni entrepreneurs pitch their AI startups to investors and fellow alumni.',
          registrationUrl: '#'
        }
      ]
    },
    upcomingEvents: {
      title: 'Upcoming Events',
      content: [
        {
          title: 'Spring Leadership Forum',
          description: 'April 15, 2024 | 6:30 PM<br/>The Royal Institution, London<br/>Join us for an evening of insights from industry leaders discussing the future of leadership in the digital age.',
          registrationUrl: '#'
        },
        {
          title: 'FinTech Innovation Workshop',
          description: 'April 28, 2024 | 2:00 PM<br/>Level39, Canary Wharf<br/>Explore the latest trends in financial technology with hands-on demonstrations and expert discussions.',
          registrationUrl: '#'
        }
      ]
    },
    partnerEvents: {
      title: 'Partner Events',
      content: [
        {
          title: 'Joint Networking Reception (with Harvard Business School)',
          description: 'May 5, 2024 | 7:00 PM<br/>The Ned, City of London<br/>Connect with alumni from both institutions in this exclusive networking event.',
          registrationUrl: '#'
        },
        {
          title: 'ESG Investment Forum (with Columbia Business School)',
          description: 'May 12, 2024 | 6:30 PM<br/>Bloomberg London HQ<br/>Explore sustainable investment strategies with industry experts.',
          registrationUrl: '#'
        }
      ]
    },
    alumniOfMonth: {
      title: 'Alumni of the Month',
      content: [
        {
          title: 'Sarah Johnson, WG\'15',
          description: 'Sarah recently launched a successful fintech startup that was acquired by a major bank. She credits her Wharton network for connecting her with key investors and advisors.',
          image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&fit=crop',
          link: '#'
        }
      ]
    }
  };

  const sectionKeys = Object.keys(sections) as Array<keyof typeof sections>;

  const renderContent = () => {
    const section = sections[selectedSection as keyof typeof sections];
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 style={styles.heading}>{section.title}</h2>
        
        {section.content.map((item, index) => (
          <div key={index} style={styles.eventBox}>
            <h3 style={styles.subheading}>{item.title}</h3>
            
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full max-w-md h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <div 
              style={styles.text}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            
            {item.registrationUrl && (
              <div className="mt-4">
                <a href={item.registrationUrl} style={styles.button}>
                  Register Now
                </a>
              </div>
            )}
            
            {item.link && (
              <div className="mt-4">
                <a href={item.link} style={{ ...styles.text, color: colors.primary, textDecoration: 'underline' }}>
                  Read More
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Newsletter Builder
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-800">Newsletter Template Testing</h1>
            </div>
            
            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="font-medium">
                  {sections[selectedSection as keyof typeof sections].title}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                  <div className="py-2">
                    {sectionKeys.map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedSection(key);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedSection === key ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {sections[key].title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {renderContent()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => {
              const currentIndex = sectionKeys.indexOf(selectedSection as keyof typeof sections);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : sectionKeys.length - 1;
              setSelectedSection(sectionKeys[prevIndex]);
            }}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Previous Section
          </button>
          
          <button
            onClick={() => {
              const currentIndex = sectionKeys.indexOf(selectedSection as keyof typeof sections);
              const nextIndex = currentIndex < sectionKeys.length - 1 ? currentIndex + 1 : 0;
              setSelectedSection(sectionKeys[nextIndex]);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Section
          </button>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default TestingPage;