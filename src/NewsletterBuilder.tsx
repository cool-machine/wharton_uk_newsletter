import React from 'react';
import { NewsletterData } from './App';

interface Props {
  data: NewsletterData;
  onChange: (data: NewsletterData) => void;
}

const NewsletterBuilder: React.FC<Props> = ({ data, onChange }) => {
  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '12px'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical' as const,
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#333'
  };

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #e0e0e0'
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#990000',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '8px',
    marginTop: '8px'
  };

  const updateField = (field: keyof NewsletterData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addHighlight = () => {
    const newHighlights = [...data.highlights, { title: '', description: '' }];
    updateField('highlights', newHighlights);
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    const newHighlights = [...data.highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    updateField('highlights', newHighlights);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = data.highlights.filter((_, i) => i !== index);
    updateField('highlights', newHighlights);
  };

  const addEvent = () => {
    const newEvents = [...data.events, {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      registrationUrl: '#'
    }];
    updateField('events', newEvents);
  };

  const updateEvent = (index: number, field: string, value: string) => {
    const newEvents = [...data.events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    updateField('events', newEvents);
  };

  const removeEvent = (index: number) => {
    const newEvents = data.events.filter((_, i) => i !== index);
    updateField('events', newEvents);
  };

  const addPartnerEvent = () => {
    const newPartnerEvents = [...data.partnerEvents, {
      partner: '',
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      registrationUrl: '#'
    }];
    updateField('partnerEvents', newPartnerEvents);
  };

  const updatePartnerEvent = (index: number, field: string, value: string) => {
    const newPartnerEvents = [...data.partnerEvents];
    newPartnerEvents[index] = { ...newPartnerEvents[index], [field]: value };
    updateField('partnerEvents', newPartnerEvents);
  };

  const removePartnerEvent = (index: number) => {
    const newPartnerEvents = data.partnerEvents.filter((_, i) => i !== index);
    updateField('partnerEvents', newPartnerEvents);
  };

  const addCommunityLink = () => {
    const newCommunityLinks = [...data.communityLinks, {
      title: '',
      description: '',
      url: ''
    }];
    updateField('communityLinks', newCommunityLinks);
  };

  const updateCommunityLink = (index: number, field: string, value: string) => {
    const newCommunityLinks = [...data.communityLinks];
    newCommunityLinks[index] = { ...newCommunityLinks[index], [field]: value };
    updateField('communityLinks', newCommunityLinks);
  };

  const removeCommunityLink = (index: number) => {
    const newCommunityLinks = data.communityLinks.filter((_, i) => i !== index);
    updateField('communityLinks', newCommunityLinks);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#011F5B', marginBottom: '24px' }}>
        📝 Newsletter Editor
      </h2>

      {/* Basic Info */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>📅 Basic Information</h3>
        
        <label style={labelStyle}>Newsletter Title:</label>
        <input
          style={inputStyle}
          value={data.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Wharton Club UK Newsletter"
        />

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Month:</label>
            <input
              style={inputStyle}
              value={data.month}
              onChange={(e) => updateField('month', e.target.value)}
              placeholder="e.g., March"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Year:</label>
            <input
              style={inputStyle}
              value={data.year}
              onChange={(e) => updateField('year', e.target.value)}
              placeholder="e.g., 2024"
            />
          </div>
        </div>

        <label style={labelStyle}>Opening Greeting:</label>
        <textarea
          style={textareaStyle}
          value={data.greeting}
          onChange={(e) => updateField('greeting', e.target.value)}
          placeholder="Welcome message for the newsletter..."
        />
      </div>

      {/* Recent Highlights */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>✨ Recent Highlights</h3>
        
        {data.highlights.map((highlight, index) => (
          <div key={index} style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '6px',
            marginBottom: '16px',
            border: '1px solid #ddd'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, color: '#333' }}>Highlight #{index + 1}</h4>
              <button
                style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                onClick={() => removeHighlight(index)}
              >
                🗑 Remove
              </button>
            </div>
            
            <label style={labelStyle}>Title:</label>
            <input
              style={inputStyle}
              value={highlight.title}
              onChange={(e) => updateHighlight(index, 'title', e.target.value)}
              placeholder="Event or achievement title"
            />
            
            <label style={labelStyle}>Description:</label>
            <textarea
              style={textareaStyle}
              value={highlight.description}
              onChange={(e) => updateHighlight(index, 'description', e.target.value)}
              placeholder="Describe the highlight..."
            />
          </div>
        ))}
        
        <button style={buttonStyle} onClick={addHighlight}>
          ➕ Add Highlight
        </button>
      </div>

      {/* Upcoming Events */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>📅 Upcoming Events</h3>
        
        {data.events.map((event, index) => (
          <div key={index} style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '6px',
            marginBottom: '16px',
            border: '1px solid #ddd'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, color: '#333' }}>Event #{index + 1}</h4>
              <button
                style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                onClick={() => removeEvent(index)}
              >
                🗑 Remove
              </button>
            </div>
            
            <label style={labelStyle}>Event Title:</label>
            <input
              style={inputStyle}
              value={event.title}
              onChange={(e) => updateEvent(index, 'title', e.target.value)}
              placeholder="Event name"
            />
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Date:</label>
                <input
                  style={inputStyle}
                  value={event.date}
                  onChange={(e) => updateEvent(index, 'date', e.target.value)}
                  placeholder="April 15, 2024"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Time:</label>
                <input
                  style={inputStyle}
                  value={event.time}
                  onChange={(e) => updateEvent(index, 'time', e.target.value)}
                  placeholder="6:30 PM"
                />
              </div>
            </div>
            
            <label style={labelStyle}>Location:</label>
            <input
              style={inputStyle}
              value={event.location}
              onChange={(e) => updateEvent(index, 'location', e.target.value)}
              placeholder="Venue name and address"
            />
            
            <label style={labelStyle}>Description:</label>
            <textarea
              style={textareaStyle}
              value={event.description}
              onChange={(e) => updateEvent(index, 'description', e.target.value)}
              placeholder="Event description..."
            />
            
            <label style={labelStyle}>Registration URL:</label>
            <input
              style={inputStyle}
              value={event.registrationUrl}
              onChange={(e) => updateEvent(index, 'registrationUrl', e.target.value)}
              placeholder="https://..."
            />
          </div>
        ))}
        
        <button style={buttonStyle} onClick={addEvent}>
          ➕ Add Event
        </button>
      </div>

      {/* Partner Events */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>🤝 Partner Events</h3>
        
        {data.partnerEvents.map((event, index) => (
          <div key={index} style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '6px',
            marginBottom: '16px',
            border: '1px solid #ddd'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, color: '#333' }}>Partner Event #{index + 1}</h4>
              <button
                style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                onClick={() => removePartnerEvent(index)}
              >
                🗑 Remove
              </button>
            </div>
            
            <label style={labelStyle}>Partner Organization:</label>
            <input
              style={inputStyle}
              value={event.partner}
              onChange={(e) => updatePartnerEvent(index, 'partner', e.target.value)}
              placeholder="e.g., Harvard Business School"
            />
            
            <label style={labelStyle}>Event Title:</label>
            <input
              style={inputStyle}
              value={event.title}
              onChange={(e) => updatePartnerEvent(index, 'title', e.target.value)}
              placeholder="Event name"
            />
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Date:</label>
                <input
                  style={inputStyle}
                  value={event.date}
                  onChange={(e) => updatePartnerEvent(index, 'date', e.target.value)}
                  placeholder="May 5, 2024"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Time:</label>
                <input
                  style={inputStyle}
                  value={event.time}
                  onChange={(e) => updatePartnerEvent(index, 'time', e.target.value)}
                  placeholder="7:00 PM"
                />
              </div>
            </div>
            
            <label style={labelStyle}>Location:</label>
            <input
              style={inputStyle}
              value={event.location}
              onChange={(e) => updatePartnerEvent(index, 'location', e.target.value)}
              placeholder="Venue name"
            />
            
            <label style={labelStyle}>Description:</label>
            <textarea
              style={textareaStyle}
              value={event.description}
              onChange={(e) => updatePartnerEvent(index, 'description', e.target.value)}
              placeholder="Event description..."
            />
            
            <label style={labelStyle}>Registration URL:</label>
            <input
              style={inputStyle}
              value={event.registrationUrl}
              onChange={(e) => updatePartnerEvent(index, 'registrationUrl', e.target.value)}
              placeholder="https://..."
            />
          </div>
        ))}
        
        <button style={buttonStyle} onClick={addPartnerEvent}>
          ➕ Add Partner Event
        </button>
      </div>

      {/* Alumni Spotlight */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>⭐ Alumni Spotlight</h3>
        
        <label style={labelStyle}>Alumni Name:</label>
        <input
          style={inputStyle}
          value={data.alumniSpotlight.name}
          onChange={(e) => updateField('alumniSpotlight', { ...data.alumniSpotlight, name: e.target.value })}
          placeholder="Full name"
        />
        
        <label style={labelStyle}>Class:</label>
        <input
          style={inputStyle}
          value={data.alumniSpotlight.class}
          onChange={(e) => updateField('alumniSpotlight', { ...data.alumniSpotlight, class: e.target.value })}
          placeholder="e.g., WG'15"
        />
        
        <label style={labelStyle}>Description:</label>
        <textarea
          style={textareaStyle}
          value={data.alumniSpotlight.description}
          onChange={(e) => updateField('alumniSpotlight', { ...data.alumniSpotlight, description: e.target.value })}
          placeholder="Alumni achievements and story..."
        />
        
        <label style={labelStyle}>Read More URL:</label>
        <input
          style={inputStyle}
          value={data.alumniSpotlight.readMoreUrl}
          onChange={(e) => updateField('alumniSpotlight', { ...data.alumniSpotlight, readMoreUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>

      {/* Community Links */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>💬 Community Links</h3>
        
        {data.communityLinks.map((link, index) => (
          <div key={index} style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '6px',
            marginBottom: '16px',
            border: '1px solid #ddd'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, color: '#333' }}>Community Link #{index + 1}</h4>
              <button
                style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                onClick={() => removeCommunityLink(index)}
              >
                🗑 Remove
              </button>
            </div>
            
            <label style={labelStyle}>Title:</label>
            <input
              style={inputStyle}
              value={link.title}
              onChange={(e) => updateCommunityLink(index, 'title', e.target.value)}
              placeholder="Community group name"
            />
            
            <label style={labelStyle}>Description:</label>
            <textarea
              style={textareaStyle}
              value={link.description}
              onChange={(e) => updateCommunityLink(index, 'description', e.target.value)}
              placeholder="Brief description of the community..."
            />
            
            <label style={labelStyle}>URL:</label>
            <input
              style={inputStyle}
              value={link.url}
              onChange={(e) => updateCommunityLink(index, 'url', e.target.value)}
              placeholder="https://..."
            />
          </div>
        ))}
        
        <button style={buttonStyle} onClick={addCommunityLink}>
          ➕ Add Community Link
        </button>
      </div>
    </div>
  );
};

export default NewsletterBuilder;