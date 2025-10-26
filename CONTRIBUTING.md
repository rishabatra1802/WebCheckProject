# Contributing to WebCheck

Thank you for your interest in contributing to WebCheck! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites
- Node.js 18+
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webcheck.git
   cd webcheck
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
webcheck/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   └── analyze/        # Main analysis endpoint
│   ├── components/         # React components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                    # Utility functions
├── types/                  # TypeScript types
└── public/                # Static assets
```

## Code Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` types when possible
- Export types for reusability

### React Components
- Use functional components with hooks
- Add 'use client' directive for client components
- Keep components focused and reusable
- Use descriptive prop names

### Styling
- Use Tailwind CSS utility classes
- Follow responsive design principles
- Maintain consistent spacing and colors
- Use semantic color names

### Code Formatting
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Making Changes

### Before You Start
1. Check existing issues and PRs
2. Create an issue to discuss major changes
3. Get feedback before implementing

### Development Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes:
   - Write clean, documented code
   - Follow existing patterns
   - Test thoroughly

3. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request

### Commit Message Format

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build/tooling changes

Examples:
```
feat: add PDF export functionality
fix: resolve broken link detection issue
docs: update installation instructions
```

## Areas for Contribution

### High Priority
- [ ] Lighthouse integration
- [ ] Mobile responsiveness testing
- [ ] Security headers analysis
- [ ] Export to PDF/CSV
- [ ] Historical tracking

### Medium Priority
- [ ] Sitemap validation
- [ ] Robots.txt analysis
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Performance optimizations

### Nice to Have
- [ ] Custom check profiles
- [ ] Scheduled monitoring
- [ ] Email reports
- [ ] Comparison with competitors
- [ ] Advanced analytics

## Testing

### Manual Testing
1. Test with various websites:
   - Small sites
   - Large sites
   - Different technologies
   - Edge cases

2. Verify all features:
   - URL validation
   - Analysis accuracy
   - Error handling
   - UI responsiveness

3. Check different browsers:
   - Chrome
   - Firefox
   - Safari
   - Edge

### Future: Automated Testing
We welcome contributions for:
- Unit tests (Jest/Vitest)
- Integration tests
- E2E tests (Playwright/Cypress)

## Adding New Analysis Features

To add a new analysis category:

1. Update the analysis interface in `types/index.ts`:
   ```typescript
   export interface AnalysisResult {
     // ... existing fields
     yourNewAnalysis: YourNewAnalysisType;
   }
   ```

2. Add analysis logic in `app/api/analyze/route.ts`:
   ```typescript
   function analyzeYourFeature($: CheerioAPI): YourNewAnalysisType {
     // Your analysis logic
   }
   ```

3. Update the result object to include your analysis

4. Create a display component in `app/components/ReportCard.tsx`

5. Add documentation in README.md

## Documentation

When adding features:
- Update README.md
- Update SUMMARY.md if technical
- Add inline code comments
- Update TypeScript types

## Performance Guidelines

- Keep bundle size minimal
- Optimize images and assets
- Use lazy loading when appropriate
- Minimize API calls
- Set appropriate timeouts
- Cache when beneficial

## Reporting Bugs

### Before Reporting
1. Check existing issues
2. Verify it's reproducible
3. Test with latest version

### Bug Report Template
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 18.17.0]
- OS: [e.g. macOS 14.0]

**Additional context**
Any other relevant information.
```

## Feature Requests

We welcome feature requests! Please:
1. Check if it already exists
2. Provide clear use case
3. Explain expected behavior
4. Consider implementation complexity

## Code Review Process

Pull requests will be reviewed for:
- Code quality and style
- Functionality and correctness
- Documentation completeness
- Performance implications
- Breaking changes

## Questions?

- Open a GitHub issue for bugs/features
- Start a discussion for questions
- Contact: kunalr.tech@gmail.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to WebCheck! 🎉
