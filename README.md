# WebCheck - Website Analyzer & Report Card

A comprehensive, lightweight website analysis tool built with Next.js that provides detailed reports on SEO, performance, accessibility, broken links, and actionable recommendations.

## Features

- 🔍 **SEO Analysis**: Checks meta tags, titles, descriptions, Open Graph tags, and more
- ⚡ **Performance Metrics**: Analyzes page size, scripts, stylesheets, and optimization opportunities
- ♿ **Accessibility Checks**: Validates alt text, form labels, ARIA landmarks, and semantic HTML
- 🔗 **Broken Link Detection**: Identifies internal and external broken links
- 📋 **Header Structure Analysis**: Reviews heading hierarchy and multiple H1 detection
- 🖼️ **Image Optimization**: Checks for alt text and image format recommendations
- 🚀 **Future Recommendations**: Provides actionable insights for improvement

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cheerio** - Fast HTML parsing
- **Axios** - HTTP client for fetching websites

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/webcheck.git
cd webcheck
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter the URL of the website you want to analyze
2. Click "Analyze Website"
3. Wait for the comprehensive report
4. Review the scores and recommendations
5. Print or save the report for future reference

## Project Structure

```
webcheck/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for website analysis
│   ├── components/
│   │   ├── AnalysisForm.tsx      # URL input form
│   │   ├── ReportCard.tsx        # Results display component
│   │   ├── PracticalGuide.tsx    # Non-tech user recommendations
│   │   ├── LoadingSpinner.tsx    # Loading state component
│   │   └── Features.tsx          # Features showcase component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── public/                       # Static assets
├── package.json
└── README.md
```

## API Endpoint

### POST `/api/analyze`

Analyzes a website and returns a comprehensive report.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "title": "Website Title",
  "metaDescription": "Description...",
  "overallScore": 85,
  "seo": {
    "score": 90,
    "issues": [],
    "recommendations": []
  },
  "accessibility": {
    "score": 80,
    "issues": []
  },
  "performance": {
    "score": 85,
    "issues": []
  },
  "brokenLinks": {
    "internal": [],
    "external": []
  },
  "images": {
    "total": 10,
    "withoutAlt": 2,
    "missingAlt": []
  },
  "headers": {
    "h1Count": 1,
    "hasMultipleH1": false,
    "structure": []
  },
  "futureScope": []
}
```

## Features in Detail

### SEO Analysis
- Page title validation (length and presence)
- Meta description validation
- Canonical URL checking
- Open Graph tags verification
- Robots meta tag recommendations

### Performance Analysis
- HTML size monitoring
- Inline styles detection
- External script optimization
- Stylesheet bundling suggestions
- Modern image format recommendations
- Lazy loading detection

### Accessibility Checks
- Alt text on images
- Form label associations
- Language attribute validation
- ARIA landmarks and semantic HTML

### Link Checking
- Internal link validation
- External link verification
- Broken link reporting

## Deployment

### Deploy on Vercel

The easiest way to deploy WebCheck is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/webcheck)

### Environment Variables

No environment variables required for basic functionality.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Built by Kunal Rohilla
- GitHub: [@Kunal061](https://github.com/Kunal061)
- LinkedIn: [Kunal Rohilla](https://www.linkedin.com/in/kunal-rohilla-745545246/)

## Acknowledgments

- Next.js team for the amazing framework
- Cheerio for HTML parsing
- Tailwind CSS for styling utilities
