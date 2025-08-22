# Contributing to Wharton UK Newsletter Builder

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/wharton_uk_newsletter.git
   cd wharton_uk_newsletter
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm start
   ```

## Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run build  # Runs linting and formatting checks
   npm test       # Runs all tests
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Standards

### JavaScript
- Use ES6+ features where appropriate
- Follow ESLint configuration (`.eslintrc.js`)
- Use meaningful variable and function names
- Add comments for complex logic

### HTML
- Use semantic HTML5 elements
- Maintain accessibility standards (ARIA labels, alt text)
- Keep email compatibility in mind for newsletter templates

### CSS
- Use consistent indentation (4 spaces)
- Group related properties together
- Use CSS custom properties for theme values

### Formatting
- Code is automatically formatted with Prettier
- Run `npm run format` before committing

## Testing

- Write tests for new features using Playwright
- Ensure all existing tests pass: `npm test`
- Test across multiple browsers when possible
- Verify mobile responsiveness

## Commit Messages

Follow conventional commit format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting/style changes
- `refactor:` code refactoring
- `test:` adding or updating tests
- `chore:` maintenance tasks

Examples:
```
feat: add drag-and-drop section reordering
fix: resolve image upload issue in Safari
docs: update README installation instructions
```

## Pull Request Guidelines

### Before Submitting
- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Code quality checks pass (`npm run build`)
- [ ] Changes are tested in multiple browsers
- [ ] Documentation is updated if needed

### PR Description
Include:
- **What**: Brief description of changes
- **Why**: Reason for the changes
- **How**: How the changes work
- **Testing**: How you tested the changes
- **Screenshots**: For UI changes (before/after)

### Review Process
- Maintainers will review within 1-2 weeks
- Address feedback promptly
- Keep PR scope focused and small
- Be responsive to questions

## Types of Contributions

### Bug Reports
- Use GitHub Issues
- Include steps to reproduce
- Specify browser and OS
- Include screenshots if applicable

### Feature Requests
- Use GitHub Issues with "enhancement" label
- Describe the use case clearly
- Explain why it would benefit users
- Consider implementation complexity

### Code Contributions
- Focus on one feature/fix per PR
- Maintain backwards compatibility
- Consider email client compatibility
- Add tests for new functionality

## Development Environment

### Required Tools
- Node.js 16+ and npm 7+
- Modern browser for testing
- Git for version control

### Recommended Tools
- VS Code with ESLint/Prettier extensions
- Browser developer tools
- Playwright Test extension (for VS Code)

## Architecture Considerations

### Email Compatibility
- Use table-based layouts for email sections
- Avoid modern CSS features in email templates
- Test with various email clients
- Keep image sizes optimized

### Performance
- Minimize bundle size (currently self-contained)
- Optimize images and assets
- Consider mobile users

### Accessibility
- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers when possible

## Getting Help

- **Documentation**: Check README.md and docs/
- **Issues**: Search existing GitHub Issues
- **Questions**: Open a new Issue with "question" label
- **Contact**: Reach out to project maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to the Wharton UK Newsletter Builder!**
