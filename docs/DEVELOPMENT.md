# Development Guide

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/cool-machine/wharton_uk_newsletter.git
   cd wharton_uk_newsletter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   This will start a local server at `http://localhost:8080`

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Run linting and formatting checks
- `npm run test` - Run all tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changes
- `npm run validate` - Validate HTML structure

## Project Structure

```
wharton_uk_newsletter/
├── index.html                      # Landing page
├── complete-original-newsletter.html # Main newsletter builder
├── favicon.svg                     # Site favicon
├── package.json                    # Dependencies and scripts
├── README.md                       # Main documentation
├── LICENSE                         # MIT License
├── .gitignore                      # Git exclusions
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── playwright.config.js            # Test configuration
├── tests/                          # Test suite
│   └── newsletter.spec.js          # Main test file
├── docs/                           # Documentation
│   ├── DEVELOPMENT.md              # This file
│   └── screenshots/                # Project screenshots
└── .github/
    └── workflows/
        └── deploy.yml              # GitHub Actions deployment
```

## Testing

The project uses Playwright for end-to-end testing:

- **Run tests**: `npm test`
- **Interactive mode**: `npm run test:ui`
- **Debug tests**: `npx playwright test --debug`

Test files are located in the `tests/` directory and cover:
- Newsletter builder functionality
- Form input validation
- Responsive design
- Cross-browser compatibility

## Code Quality

The project enforces code quality through:

- **ESLint**: JavaScript/HTML linting
- **Prettier**: Code formatting
- **HTML Validate**: HTML structure validation

Run `npm run build` before committing to ensure all quality checks pass.

## Browser Support

The newsletter builder supports:
- Chrome 88+
- Firefox 84+
- Safari 14+
- Edge 88+

## File System Integration

The app uses modern web APIs for file operations:
- **File System Access API**: Chrome/Edge (full file editing)
- **Download fallback**: Firefox/Safari (save as new files)
- **Local Storage**: All browsers (auto-save backup)

## Deployment

The project auto-deploys to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

Manual deployment: `npm run deploy`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test: `npm run build && npm test`
4. Commit with clear message: `git commit -m "Add feature description"`
5. Push and create pull request

## Architecture Notes

- **Self-contained**: No build process required for core functionality
- **Progressive enhancement**: Works without JavaScript for basic viewing
- **Mobile-first**: Responsive design with touch-friendly interface
- **Email-optimized**: HTML output designed for email clients
