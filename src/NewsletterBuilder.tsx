import React from 'react';
import { NewsletterData, NewsletterSection } from './App';
import RichTextEditor from './RichTextEditor';

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
    marginBottom: '12px',
    userSelect: 'text' as const,
    WebkitUserSelect: 'text' as const,
    MozUserSelect: 'text' as const,
    msUserSelect: 'text' as const,
    pointerEvents: 'auto' as const
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    userSelect: 'text' as const,
    WebkitUserSelect: 'text' as const,
    MozUserSelect: 'text' as const,
    msUserSelect: 'text' as const
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

  const selectStyle = {
    ...inputStyle,
    backgroundColor: 'white'
  };

  const updateField = (field: keyof NewsletterData, value: NewsletterData[keyof NewsletterData]) => {
    onChange({ ...data, [field]: value });
  };

  const addSection = () => {
    const newSection: NewsletterSection = {
      id: Date.now().toString(),
      type: 'custom',
      title: 'New Section',
      items: [{ title: '', description: '' }]
    };
    updateField('sections', [...data.sections, newSection]);
  };

  const addRichTextSection = () => {
    const newSection: NewsletterSection = {
      id: Date.now().toString(),
      type: 'rich-text',
      title: 'New Rich Text Section',
      items: [],
      richContent: '<p>Enter your content here...</p>',
      sectionUrl: '',
      imageUrl: '',
      imageAlt: ''
    };
    updateField('sections', [...data.sections, newSection]);
  };

  const updateSection = (sectionId: string, updates: Partial<NewsletterSection>) => {
    const newSections = data.sections.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    );
    updateField('sections', newSections);
  };

  const removeSection = (sectionId: string) => {
    const newSections = data.sections.filter(section => section.id !== sectionId);
    updateField('sections', newSections);
  };

  const moveSectionUp = (sectionId: string) => {
    const currentIndex = data.sections.findIndex(s => s.id === sectionId);
    if (currentIndex > 0) {
      const newSections = [...data.sections];
      [newSections[currentIndex - 1], newSections[currentIndex]] = [newSections[currentIndex], newSections[currentIndex - 1]];
      updateField('sections', newSections);
    }
  };

  const moveSectionDown = (sectionId: string) => {
    const currentIndex = data.sections.findIndex(s => s.id === sectionId);
    if (currentIndex < data.sections.length - 1) {
      const newSections = [...data.sections];
      [newSections[currentIndex], newSections[currentIndex + 1]] = [newSections[currentIndex + 1], newSections[currentIndex]];
      updateField('sections', newSections);
    }
  };

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    // Don't start drag if user is selecting text in inputs
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleInputEvents = (e: React.MouseEvent | React.DragEvent) => {
    // Only prevent drag events, allow normal mouse events for text selection
    if (e.type === 'dragstart') {
      e.preventDefault();
      e.stopPropagation();
    }
    // For mousedown events, only stop propagation if it's for dragging
    if (e.type === 'mousedown' && e.currentTarget.draggable) {
      e.stopPropagation();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    // Add visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.borderColor = '#990000';
    target.style.backgroundColor = '#fff5f5';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Remove visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.borderColor = '#ddd';
    target.style.backgroundColor = '#f9f9f9';
  };

  const handleDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    const draggedSectionId = e.dataTransfer.getData('text/plain');
    
    // Reset visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.borderColor = '#ddd';
    target.style.backgroundColor = '#f9f9f9';
    
    if (draggedSectionId === targetSectionId) return;

    const draggedIndex = data.sections.findIndex(s => s.id === draggedSectionId);
    const targetIndex = data.sections.findIndex(s => s.id === targetSectionId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newSections = [...data.sections];
    const [draggedSection] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, draggedSection);
    
    updateField('sections', newSections);
  };

  const addItemToSection = (sectionId: string) => {
    const section = data.sections.find(s => s.id === sectionId);
    if (!section) return;

    const newItem = section.type === 'events' || section.type === 'partner-events'
      ? { title: '', description: '', date: '', time: '', location: '', registrationUrl: '#' }
      : section.type === 'alumni-spotlight'
      ? { title: '', description: '', name: '', class: '', readMoreUrl: '#' }
      : section.type === 'community-links'
      ? { title: '', description: '', url: '' }
      : { title: '', description: '' };

    updateSection(sectionId, {
      items: [...section.items, newItem]
    });
  };

  const updateItemInSection = (sectionId: string, itemIndex: number, field: string, value: string) => {
    const section = data.sections.find(s => s.id === sectionId);
    if (!section) return;

    const newItems = [...section.items];
    newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
    updateSection(sectionId, { items: newItems });
  };

  const removeItemFromSection = (sectionId: string, itemIndex: number) => {
    const section = data.sections.find(s => s.id === sectionId);
    if (!section) return;

    const newItems = section.items.filter((_, i) => i !== itemIndex);
    updateSection(sectionId, { items: newItems });
  };

  const updateCommunityLink = (index: number, field: string, value: string) => {
    const newCommunityLinks = [...data.communityLinks];
    newCommunityLinks[index] = { ...newCommunityLinks[index], [field]: value };
    updateField('communityLinks', newCommunityLinks);
  };

  const fixCommunityLinksOrder = () => {
    const correctedLinks = [
      {
        title: 'Become a Club Member',
        description: 'Join The Wharton Club of the United Kingdom to access exclusive events, networking opportunities, and career resources.',
        url: 'https://www.whartonclubuk.net/become_a_member'
      },
      {
        title: 'Join our Community',
        description: 'Stay connected with fellow alumni through our main WhatsApp group.',
        url: 'https://forms.gle/CDvFgFGrgLFZB3HL9'
      },
      {
        title: 'Join The Wharton Alumni AI Studio',
        description: 'Connect with AI and deep tech enthusiasts in our growing global community.',
        url: 'https://forms.gle/CoDwPjqsn8Hn1X8v7'
      }
    ];
    updateField('communityLinks', correctedLinks);
  };

  // Function removed as it was unused

  const handleImageUpload = (sectionId: string, file: File) => {
    // Convert file to base64 for simple storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      // Create an image element to get original dimensions
      const img = new Image();
      img.onload = () => {
        // Calculate dimensions maintaining aspect ratio
        const originalWidth = img.width;
        const originalHeight = img.height;
        const aspectRatio = originalWidth / originalHeight;
        
        // Set maximum bounds for newsletter images
        const maxWidth = 500;
        const maxHeight = 400;
        
        let finalWidth = originalWidth;
        let finalHeight = originalHeight;
        
        // Scale down if image is too large, maintaining aspect ratio
        if (originalWidth > maxWidth) {
          finalWidth = maxWidth;
          finalHeight = maxWidth / aspectRatio;
        }
        
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = maxHeight * aspectRatio;
        }
        
        updateSection(sectionId, { 
          imageUrl: result,
          imageAlt: file.name,
          imageWidth: Math.round(finalWidth),
          imageHeight: Math.round(finalHeight)
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const generateAltTextWithClaude = (section: NewsletterSection) => {
    if (!section.imageUrl) {
      alert('No image found to analyze');
      return;
    }

    // Count how many images are already in this section type across all sections
    const sectionsWithSameName = data.sections.filter(s => s.title === section.title);
    const imageCount = sectionsWithSameName.reduce((count, s) => count + (s.imageUrl ? 1 : 0), 0);
    
    // Create clean filename from section title
    const cleanSectionName = section.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    // Create filename with section name and numbering if needed
    const baseFilename = cleanSectionName || 'newsletter_section';
    const filename = imageCount > 1 
      ? `${baseFilename}_${imageCount}` 
      : baseFilename;
    
    // Determine file extension from base64 data
    const fileExtension = section.imageUrl.includes('jpeg') || section.imageUrl.includes('jpg') ? 'jpg' : 'png';

    // Create a downloadable image file
    const link = document.createElement('a');
    link.href = section.imageUrl;
    link.download = `${filename}.${fileExtension}`;
    link.click();

    // Create the Claude prompt
    const claudePrompt = `Please analyze this newsletter image and generate professional alt text for accessibility. The alt text should:

1. Be descriptive but concise (under 125 characters)
2. Focus on the main subject and context
3. Be appropriate for a professional newsletter
4. Help screen readers understand the image content

Please provide just the alt text without quotes or extra explanation.`;

    // Copy prompt to clipboard
    navigator.clipboard.writeText(claudePrompt).then(() => {
      // Show instructions modal
      const instructions = `✅ Image downloaded and Claude prompt copied to clipboard!

📋 Next steps:
1. The image file was downloaded to your computer
2. The Claude prompt is copied to your clipboard
3. Go to Claude and upload the downloaded image
4. Paste the prompt (Ctrl/Cmd+V)
5. Copy Claude's alt text response
6. Come back and paste it in the Alt Text field

🤖 The Claude prompt asks for professional, concise alt text perfect for newsletters.`;

      alert(instructions);
    }).catch(() => {
      // Fallback if clipboard fails
      const instructions = `✅ Image downloaded!

📋 Next steps:
1. The image was downloaded to your computer
2. Go to Claude and upload the downloaded image
3. Use this prompt: "${claudePrompt}"
4. Copy Claude's alt text response
5. Come back and paste it in the Alt Text field`;

      alert(instructions);
    });
  };

  const renderSectionItem = (section: NewsletterSection, item: NewsletterSection['items'][0], itemIndex: number) => {
    return (
      <div key={itemIndex} style={{
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '6px',
        marginBottom: '16px',
        border: '1px solid #ddd'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ margin: 0, color: '#333' }}>Item #{itemIndex + 1}</h4>
          <button
            style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
            onClick={() => removeItemFromSection(section.id, itemIndex)}
          >
            🗑 Remove
          </button>
        </div>

        {section.type === 'partner-events' && (
          <>
            <label style={labelStyle}>Partner Organization:</label>
            <input
              style={inputStyle}
              value={item.partner || ''}
              onChange={(e) => updateItemInSection(section.id, itemIndex, 'partner', e.target.value)}
              placeholder="e.g., Harvard Business School"
            />
          </>
        )}

        {section.type === 'alumni-spotlight' && (
          <>
            <label style={labelStyle}>Alumni Name:</label>
            <input
              style={inputStyle}
              value={item.name || ''}
              onChange={(e) => updateItemInSection(section.id, itemIndex, 'name', e.target.value)}
              placeholder="Full name"
            />
            <label style={labelStyle}>Class:</label>
            <input
              style={inputStyle}
              value={item.class || ''}
              onChange={(e) => updateItemInSection(section.id, itemIndex, 'class', e.target.value)}
              placeholder="e.g., WG'15"
            />
          </>
        )}

        <label style={labelStyle}>Title:</label>
        <input
          style={inputStyle}
          value={item.title}
          onChange={(e) => updateItemInSection(section.id, itemIndex, 'title', e.target.value)}
          placeholder="Item title"
          onMouseDown={handleInputEvents}
          onDragStart={handleInputEvents}
        />

        {(section.type === 'events' || section.type === 'partner-events') && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Date:</label>
              <input
                style={inputStyle}
                value={item.date || ''}
                onChange={(e) => updateItemInSection(section.id, itemIndex, 'date', e.target.value)}
                placeholder="April 15, 2024"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Time:</label>
              <input
                style={inputStyle}
                value={item.time || ''}
                onChange={(e) => updateItemInSection(section.id, itemIndex, 'time', e.target.value)}
                placeholder="6:30 PM"
              />
            </div>
          </div>
        )}

        {(section.type === 'events' || section.type === 'partner-events') && (
          <>
            <label style={labelStyle}>Location:</label>
            <input
              style={inputStyle}
              value={item.location || ''}
              onChange={(e) => updateItemInSection(section.id, itemIndex, 'location', e.target.value)}
              placeholder="Venue name and address"
            />
          </>
        )}

        <label style={labelStyle}>Description:</label>
        <textarea
          style={textareaStyle}
          value={item.description}
          onChange={(e) => updateItemInSection(section.id, itemIndex, 'description', e.target.value)}
          placeholder="Description..."
          onMouseDown={handleInputEvents}
          onDragStart={handleInputEvents}
        />

        {(section.type === 'events' || section.type === 'partner-events') && (
          <>
            <label style={labelStyle}>Registration URL:</label>
            <input
              style={inputStyle}
              value={item.registrationUrl || ''}
              onChange={(e) => updateItemInSection(section.id, itemIndex, 'registrationUrl', e.target.value)}
              placeholder="https://..."
            />
          </>
        )}

        {section.type === 'community-links' && (
          <>
            <label style={labelStyle}>URL:</label>
            <input
              style={inputStyle}
              value={item.url || ''}
              onChange={(e) => updateItemInSection(section.id, itemIndex, 'url', e.target.value)}
              placeholder="https://..."
            />
          </>
        )}

        {section.type === 'alumni-spotlight' && (
          <>
            <label style={labelStyle}>Read More URL:</label>
            <input
              style={inputStyle}
              value={item.readMoreUrl || ''}
              onChange={(e) => updateItemInSection(section.id, itemIndex, 'readMoreUrl', e.target.value)}
              placeholder="https://..."
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#011F5B', marginBottom: '24px' }}>
        📝 Newsletter Editor
      </h2>

      {/* Basic Info */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>📅 Basic Information</h3>
        
        <label style={labelStyle}>Header Title (Rich Text):</label>
        <RichTextEditor
          content={data.headerTitle || ''}
          onChange={(content) => updateField('headerTitle', content)}
          placeholder="e.g., March 2024 Newsletter"
        />

        <label style={labelStyle}>Newsletter Title (Rich Text):</label>
        <RichTextEditor
          content={data.title || ''}
          onChange={(content) => updateField('title', content)}
          placeholder="e.g., The Wharton Club of the United Kingdom Newsletter"
        />

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Month (Rich Text):</label>
            <RichTextEditor
              content={data.month || ''}
              onChange={(content) => updateField('month', content)}
              placeholder="e.g., March"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Year (Rich Text):</label>
            <RichTextEditor
              content={data.year || ''}
              onChange={(content) => updateField('year', content)}
              placeholder="e.g., 2024"
            />
          </div>
        </div>

        <label style={labelStyle}>Salutation (Rich Text):</label>
        <RichTextEditor
          content={data.salutation || ''}
          onChange={(content) => updateField('salutation', content)}
          placeholder="e.g., Dear Friends, or personalized salutation..."
        />

        <label style={labelStyle}>Opening Greeting (Rich Text):</label>
        <RichTextEditor
          content={data.greeting || ''}
          onChange={(content) => updateField('greeting', content)}
          placeholder="Welcome message with rich formatting..."
        />
      </div>

      {/* Dynamic Sections */}
      {data.sections.map((section, sectionIndex) => (
        <div 
          key={section.id} 
          style={{
            ...sectionStyle,
            border: '2px dashed #ddd',
            transition: 'all 0.2s ease'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, section.id)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onMouseDown={(e) => e.stopPropagation()}
                style={{ 
                  cursor: 'grab', 
                  padding: '8px', 
                  color: '#666',
                  fontSize: '16px',
                  userSelect: 'none',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                title="Drag to reorder section"
              >
                ⋮⋮
              </div>
              <div style={{ flex: 1 }}>
                <input
                  style={{ ...inputStyle, fontSize: '18px', fontWeight: '600', color: '#990000' }}
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  placeholder="Section Title"
                  onMouseDown={handleInputEvents}
                  onDragStart={handleInputEvents}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                style={{ ...buttonStyle, backgroundColor: '#6c757d', fontSize: '12px', padding: '6px 8px' }}
                onClick={() => moveSectionUp(section.id)}
                disabled={sectionIndex === 0}
                title="Move up"
              >
                ↑
              </button>
              <button
                style={{ ...buttonStyle, backgroundColor: '#6c757d', fontSize: '12px', padding: '6px 8px' }}
                onClick={() => moveSectionDown(section.id)}
                disabled={sectionIndex === data.sections.length - 1}
                title="Move down"
              >
                ↓
              </button>
              <button
                style={{ ...buttonStyle, backgroundColor: '#dc3545', marginLeft: '8px' }}
                onClick={() => removeSection(section.id)}
              >
                🗑 Remove Section
              </button>
            </div>
          </div>

          <label style={labelStyle}>Section Type:</label>
          <select
            style={selectStyle}
            value={section.type}
            onChange={(e) => updateSection(section.id, { type: e.target.value as NewsletterSection['type'] })}
          >
            <option value="custom">Custom</option>
            <option value="rich-text">Rich Text Content</option>
            <option value="highlights">Recent Highlights</option>
            <option value="events">Events</option>
            <option value="partner-events">Partner Events</option>
            <option value="alumni-spotlight">Alumni Spotlight</option>
            <option value="community-links">Community Links</option>
          </select>

          {section.type === 'rich-text' ? (
            <div>
              <label style={labelStyle}>Content:</label>
              <RichTextEditor
                content={section.richContent || ''}
                onChange={(content) => updateSection(section.id, { richContent: content })}
                placeholder="Enter your content here..."
              />

              <label style={labelStyle}>Optional URL:</label>
              <input
                style={inputStyle}
                value={section.sectionUrl || ''}
                onChange={(e) => updateSection(section.id, { sectionUrl: e.target.value })}
                placeholder="https://example.com (optional)"
              />

              <label style={labelStyle}>Image Upload:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(section.id, file);
                  }
                }}
                style={inputStyle}
              />

              {section.imageUrl && (
                <div style={{ marginTop: '12px' }}>
                  <img 
                    src={section.imageUrl} 
                    alt={section.imageAlt || 'Uploaded image'} 
                    style={{ 
                      width: section.imageWidth ? `${section.imageWidth}px` : 'auto',
                      height: section.imageHeight ? `${section.imageHeight}px` : 'auto',
                      maxWidth: '400px', 
                      maxHeight: '300px', 
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                  
                  <div style={{ marginTop: '8px' }}>
                    <label style={labelStyle}>Image Dimensions:</label>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ ...labelStyle, fontSize: '12px' }}>Width (px):</label>
                        <input
                          type="number"
                          style={{ ...inputStyle, marginBottom: '4px' }}
                          value={section.imageWidth || ''}
                          onChange={(e) => {
                            const newWidth = parseInt(e.target.value) || 0;
                            if (newWidth > 0 && section.imageUrl) {
                              // Get original image dimensions to maintain aspect ratio
                              const img = new Image();
                              img.onload = () => {
                                const aspectRatio = img.width / img.height;
                                const newHeight = Math.round(newWidth / aspectRatio);
                                updateSection(section.id, { 
                                  imageWidth: newWidth, 
                                  imageHeight: newHeight 
                                });
                              };
                              img.src = section.imageUrl;
                            } else {
                              updateSection(section.id, { imageWidth: newWidth });
                            }
                          }}
                          placeholder="Width"
                          min="50"
                          max="600"
                          onMouseDown={handleInputEvents}
                          onDragStart={handleInputEvents}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ ...labelStyle, fontSize: '12px' }}>Height (px):</label>
                        <input
                          type="number"
                          style={{ ...inputStyle, marginBottom: '4px' }}
                          value={section.imageHeight || ''}
                          onChange={(e) => {
                            const newHeight = parseInt(e.target.value) || 0;
                            if (newHeight > 0 && section.imageUrl) {
                              // Get original image dimensions to maintain aspect ratio
                              const img = new Image();
                              img.onload = () => {
                                const aspectRatio = img.width / img.height;
                                const newWidth = Math.round(newHeight * aspectRatio);
                                updateSection(section.id, { 
                                  imageWidth: newWidth, 
                                  imageHeight: newHeight 
                                });
                              };
                              img.src = section.imageUrl;
                            } else {
                              updateSection(section.id, { imageHeight: newHeight });
                            }
                          }}
                          placeholder="Height"
                          min="50"
                          max="400"
                          onMouseDown={handleInputEvents}
                          onDragStart={handleInputEvents}
                        />
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <button
                        style={{ ...buttonStyle, backgroundColor: '#ff6b35', fontSize: '12px' }}
                        onClick={() => {
                          if (section.imageUrl) {
                            const img = new Image();
                            img.onload = () => {
                              const aspectRatio = img.width / img.height;
                              // Keep current width but fix height to match aspect ratio
                              const currentWidth = section.imageWidth || 400;
                              const correctHeight = Math.round(currentWidth / aspectRatio);
                              updateSection(section.id, { 
                                imageWidth: currentWidth, 
                                imageHeight: correctHeight 
                              });
                            };
                            img.src = section.imageUrl;
                          }
                        }}
                      >
                        🔧 Fix Proportions
                      </button>
                      <button
                        style={{ ...buttonStyle, backgroundColor: '#17a2b8', fontSize: '12px' }}
                        onClick={() => {
                          if (section.imageUrl) {
                            const img = new Image();
                            img.onload = () => {
                              const aspectRatio = img.width / img.height;
                              const targetWidth = 400;
                              const targetHeight = Math.round(targetWidth / aspectRatio);
                              updateSection(section.id, { 
                                imageWidth: targetWidth, 
                                imageHeight: targetHeight 
                              });
                            };
                            img.src = section.imageUrl;
                          }
                        }}
                      >
                        📐 Reset Size
                      </button>
                      <button
                        style={{ ...buttonStyle, backgroundColor: '#28a745', fontSize: '12px' }}
                        onClick={() => {
                          if (section.imageUrl) {
                            const img = new Image();
                            img.onload = () => {
                              const aspectRatio = img.width / img.height;
                              const targetWidth = 300;
                              const targetHeight = Math.round(targetWidth / aspectRatio);
                              updateSection(section.id, { 
                                imageWidth: targetWidth, 
                                imageHeight: targetHeight 
                              });
                            };
                            img.src = section.imageUrl;
                          }
                        }}
                      >
                        📱 Email Size
                      </button>
                    </div>

                    <label style={labelStyle}>Image Alt Text:</label>
                    <input
                      style={inputStyle}
                      value={section.imageAlt || ''}
                      onChange={(e) => updateSection(section.id, { imageAlt: e.target.value })}
                      placeholder="Describe the image for accessibility"
                      onMouseDown={handleInputEvents}
                      onDragStart={handleInputEvents}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button
                        style={{ ...buttonStyle, backgroundColor: '#6f42c1', fontSize: '12px' }}
                        onClick={() => generateAltTextWithClaude(section)}
                      >
                        🤖 Generate with Claude
                      </button>
                      <button
                        style={{ ...buttonStyle, backgroundColor: '#dc3545', fontSize: '12px' }}
                        onClick={() => updateSection(section.id, { imageUrl: '', imageAlt: '', imageWidth: undefined, imageHeight: undefined })}
                      >
                        🗑 Remove Image
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {section.items.map((item, itemIndex) => 
                renderSectionItem(section, item, itemIndex)
              )}

              <button 
                style={buttonStyle} 
                onClick={() => addItemToSection(section.id)}
              >
                ➕ Add Item
              </button>
            </>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#28a745', fontSize: '16px', padding: '12px 24px' }} 
          onClick={addRichTextSection}
        >
          ➕ Add Rich Text Section
        </button>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#6f42c1', fontSize: '16px', padding: '12px 24px' }} 
          onClick={addSection}
        >
          ➕ Add Structured Section
        </button>
      </div>

      {/* Fixed Community Links */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: '#990000', margin: 0 }}>💬 Community Links (Fixed)</h3>
          <button
            style={{ ...buttonStyle, backgroundColor: '#ff6b35', fontSize: '12px' }}
            onClick={fixCommunityLinksOrder}
            title="Fix the order and URLs of community links"
          >
            🔧 Fix Order & Links
          </button>
        </div>
        
        {data.communityLinks.map((link, index) => (
          <div key={index} style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '6px',
            marginBottom: '16px',
            border: '1px solid #ddd'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>{link.title}</h4>
            
            <label style={labelStyle}>Description:</label>
            <textarea
              style={textareaStyle}
              value={link.description}
              onChange={(e) => updateCommunityLink(index, 'description', e.target.value)}
              placeholder="Brief description..."
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
      </div>

      {/* Signature Section */}
      <div style={sectionStyle}>
        <h3 style={{ color: '#990000', marginBottom: '16px' }}>✍️ Signature</h3>
        
        <label style={labelStyle}>Newsletter Signature (Rich Text):</label>
        <RichTextEditor
          content={data.signature || ''}
          onChange={(content) => updateField('signature', content)}
          placeholder="Add your closing message and signature with rich formatting..."
        />
      </div>
    </div>
  );
};

export default NewsletterBuilder;