# Newsletter Builder Project Memory

## Project Overview
**Wharton Club UK Newsletter Builder** - A comprehensive web-based tool for creating professional email newsletters.

- **Repository**: https://github.com/cool-machine/wharton_uk_newsletter (public)
- **Live Site**: https://cool-machine.github.io/wharton_uk_newsletter/
- **Complete Editor**: https://cool-machine.github.io/wharton_uk_newsletter/complete-original-newsletter.html
- **Main File**: `/Users/gg1900/newsletter_v3/complete-original-newsletter.html`

## Key Features Implemented

### 1. Enhanced Rich Text Editor (Latest)
- **Font Controls**: Family selection (Arial, Georgia, Times New Roman, etc.) and size (8pt-36pt)
- **Color Management**: Comprehensive picker with separate text and background color sections
- **Text Alignment**: Left, center, right, and justify options
- **Line Spacing**: Single, 1.15, 1.5, double, 2.5, triple spacing
- **Toolbar Organization**: Logical groupings (History, Style, Font, Color, Alignment, Spacing, Actions)
- **Placeholder Fix**: Proper behavior - disappears on focus/typing, reappears when empty

### 2. UI/UX Improvements
- **File Management**: Fixed Save/Save As/New Project with proper browser file system behavior
- **Minimalist Design**: Removed white backgrounds, collapsible sections with smart defaults
- **Template Controls**: All sections removable with toggle controls
- **Title Alignment**: Configurable positioning (left/center/right) for all sections
- **Progressive Disclosure**: Only essential controls visible initially, expandable sections

### 3. Newsletter Features
- **Section Types**: Rich text, structured lists, community links, signature blocks
- **Image Support**: URL-based images with alt text and sizing
- **Gmail Optimization**: Email-compatible HTML with inline styles
- **Mobile Responsive**: Works across email clients and devices
- **Brand Integration**: Wharton colors (#990000 red, #011F5B blue) throughout

## Technical Architecture

### Frontend Stack
- **Framework**: Pure HTML/CSS/JavaScript with React via CDN
- **State Management**: React hooks (useState, useEffect, useCallback)
- **File Operations**: File System Access API for modern browsers
- **Styling**: Responsive design with mobile-first approach

### Key Components
```javascript
// Main functions
addSection(type) // Creates new newsletter sections
generateSectionHTML(section) // Converts to email-compatible HTML
updateSection(id, updates) // Updates section data
toggleSection(sectionName) // Manages collapsible sections

// Rich Text Editor
RichTextEditor({ content, onChange, placeholder })
// Enhanced contentEditable with comprehensive formatting toolbar
```

### Deployment
- **GitHub Pages**: Automatic deployment from main branch
- **Git Workflow**: Descriptive commits with Claude co-authoring
- **Testing**: Local verification before deployment

## Integration Instructions

### NationBuilder Email Campaign
1. Use "📋 Copy HTML for NationBuilder" button in newsletter builder
2. Go to NationBuilder admin → Email → Create new email
3. Click source code button (</> symbol) in NationBuilder editor
4. Paste the copied HTML
5. Save and send campaign

### Brand Guidelines
- **Primary Color**: Wharton Red (#990000)
- **Secondary Color**: Wharton Blue (#011F5B)
- **Fonts**: Professional serif/sans-serif options available
- **Favicon**: "W" logo with brand gradient

## Recent Commits
- `98138a7`: Fix rich text editor placeholder behavior
- `b7660e1`: Enhance rich text editor with comprehensive formatting options
- `ff5bf57`: Major UI improvements and functionality fixes

## Development Notes
- **Performance**: Optimized for large content with debounced save operations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Cross-browser**: Compatible with modern browsers supporting File System Access API
- **Error Handling**: Graceful fallbacks for unsupported features

## File Structure
```
newsletter_v3/
├── complete-original-newsletter.html  # Main application
├── index.html                        # Landing page
├── favicon.svg                       # Wharton "W" logo
├── README.md                         # Project documentation
└── CLAUDE.md                        # This file
```

Last Updated: January 2025