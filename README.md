# Newsletter Builder v3

A comprehensive email newsletter builder designed specifically for The Wharton Club of the United Kingdom. This modern React application provides a rich text editing experience with professional email-compatible HTML output.

## 🚀 Features

### Core Functionality
- **Rich Text Editing**: Full TipTap editor integration with formatting, colors, links, and typography
- **Drag & Drop**: Reorder newsletter sections with intuitive drag-and-drop interface
- **File Management**: True file saving/updating using File System Access API
- **Live Preview**: Real-time preview of newsletter as you edit
- **HTML Export**: One-click copy of email-compatible HTML for NationBuilder

### Advanced Features
- **Claude AI Integration**: Automatic alt text generation for images
- **Image Controls**: Custom width/height settings with quick sizing presets
- **Template System**: Save and load newsletter templates
- **Autosave**: Automatic saving to prevent data loss
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing
- **File Handle Persistence**: Smart re-linking of files across browser sessions

### Section Types
- **Highlights**: Key announcements and updates
- **Events**: Upcoming events with dates, times, and registration links
- **Partner Events**: External partner event listings
- **Alumni Spotlight**: Featured alumni profiles
- **Community Links**: Important club and community resources
- **Rich Text**: Flexible content sections with full formatting
- **Custom**: Tailored sections for specific content

## 🛠 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with File System Access API support (Chrome, Edge, Opera)

### Installation

```bash
# Clone the repository
git clone https://github.com/cool-machine/newsletter_v3.git
cd newsletter_v3

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📋 Usage Guide

### Creating a Newsletter

1. **Basic Information**: Update header title, newsletter title, month/year, and greeting
2. **Add Sections**: Use the "Add Section" or "Add Rich Text Section" buttons
3. **Content Editing**: Click any text area to access the rich text editor
4. **Images**: Upload images with automatic Claude AI alt text generation
5. **Reorder**: Drag sections using the ⋮⋮ handle to reorder
6. **Preview**: Real-time preview shows exactly how the newsletter will appear

### Saving and Loading

- **New File**: Create a fresh newsletter template
- **Save**: Save current work (updates existing file if linked)
- **Save As**: Create a new file with a different name
- **Open**: Load an existing newsletter template
- **Re-link**: Reconnect to original file if handle is lost

### Exporting for Email

1. Click "📋 Copy HTML for NationBuilder"
2. Paste the HTML directly into NationBuilder's email editor
3. The HTML is fully compatible with email clients and responsive

### Rich Text Editor Features

- **Formatting**: Bold, italic, underline
- **Typography**: Multiple font families and sizes
- **Colors**: Custom text and highlight colors
- **Links**: Add hyperlinks with custom text
- **Alignment**: Left, center, right, justify
- **Line Controls**: Manual line breaks and paragraph spacing

## 🎨 Customization

### Styling
The newsletter uses The Wharton Club's brand colors:
- **Wharton Blue**: #011F5B
- **Wharton Red**: #990000

### Templates
Templates are saved as JSON files containing:
- Newsletter content and structure
- Section configurations
- Metadata (creation date, last modified)

## 🔧 Technical Details

### Built With
- **React 18**: Modern React with hooks and TypeScript
- **TipTap**: Rich text editor with extensive formatting
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Modern icon library

### Browser Compatibility
- **File System Access API**: Chrome 86+, Edge 86+, Opera 72+
- **Fallback Mode**: Download-based saves for other browsers
- **Email Compatibility**: HTML output works in all major email clients

### Performance
- **Bundle Size**: ~522KB minified (161KB gzipped)
- **Load Time**: Sub-second load on modern connections
- **Memory Usage**: Optimized for long editing sessions

## 📁 Project Structure

```
newsletter_v3/
├── src/
│   ├── App.tsx              # Main application component
│   ├── NewsletterBuilder.tsx # Editor interface
│   ├── NewsletterPreview.tsx # Live preview component
│   ├── RichTextEditor.tsx   # TipTap editor wrapper
│   └── SimpleApp.tsx        # Simplified version
├── public/                  # Static assets
├── dist/                    # Production build
└── CLAUDE.md               # Development memory and history
```

## 🚀 Deployment

### Development
```bash
npm run dev
```
Access at `http://localhost:5175`

### Production Build
```bash
npm run build
npm run preview
```

### Static Hosting
The built application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Azure Static Web Apps

## 📝 Development Notes

See `CLAUDE.md` for detailed development history, completed features, and technical implementation notes.

## 🤝 Contributing

This project is maintained for The Wharton Club of the United Kingdom. For issues or feature requests, please contact the development team.

## 📄 License

Private repository for The Wharton Club of the United Kingdom.
