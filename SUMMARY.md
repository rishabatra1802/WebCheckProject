# WebCheck - Project Summary

## Overview
WebCheck is a lightweight, comprehensive website analysis tool that provides detailed reports on SEO, performance, accessibility, broken links, and actionable recommendations.

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Parsing**: Cheerio
- **HTTP Client**: Axios

## Project Structure

```
webcheck/
├── app/
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts          # Main analysis endpoint
│   │   └── health/
│   │       └── route.ts          # Health check endpoint
│   ├── components/
│   │   ├── AnalysisForm.tsx      # URL input form component
│   │   ├── ReportCard.tsx        # Results display component
│   │   ├── LoadingSpinner.tsx    # Loading state component
│   │   └── Features.tsx          # Features showcase component
│   ├── globals.css               # Global styles with animations
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main application page
├── lib/
│   └── config.ts                 # Configuration and utilities
├── types/
│   └── index.ts                  # TypeScript type definitions
└── public/                       # Static assets
```

## Key Features

### 1. SEO Analysis
- ✅ Page title validation (length: 50-60 chars recommended)
- ✅ Meta description validation (length: 150-160 chars recommended)
- ✅ Canonical URL detection
- ✅ Open Graph tags verification
- ✅ Robots meta tag recommendations
- ✅ Structured data suggestions

### 2. Performance Analysis
- ✅ HTML size monitoring
- ✅ Inline styles detection
- ✅ External scripts counting and bundling suggestions
- ✅ Stylesheet optimization recommendations
- ✅ Modern image format suggestions (WebP, AVIF)
- ✅ Lazy loading detection

### 3. Accessibility Analysis
- ✅ Alt text validation on images
- ✅ Form label associations
- ✅ Language attribute validation
- ✅ ARIA landmarks and semantic HTML checks
- ✅ WCAG compliance indicators

### 4. Link Analysis
- ✅ Internal link validation (sample of 10)
- ✅ External link verification (sample of 5)
- ✅ Broken link detection and reporting

### 5. Image Analysis
- ✅ Total image count
- ✅ Images without alt text detection
- ✅ List of problematic images

### 6. Header Structure
- ✅ H1 count validation
- ✅ Multiple H1 detection
- ✅ Complete heading hierarchy display

### 7. Future Recommendations
- ✅ Responsive viewport meta tag
- ✅ Favicon suggestions
- ✅ Open Graph image recommendations
- ✅ Structured data implementation
- ✅ Script optimization (async/defer)
- ✅ CSP implementation
- ✅ PWA manifest suggestions
- ✅ Analytics recommendations

## Scoring System

The application uses a weighted scoring system:
- **SEO**: 40% weight
- **Accessibility**: 30% weight
- **Performance**: 30% weight

Score Ranges:
- 90-100: Excellent ✅
- 70-89: Good ⚠️
- 50-69: Fair ⚠️
- 0-49: Poor ❌

## API Endpoints

### POST /api/analyze
Analyzes a website and returns comprehensive report.

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "title": "Page Title",
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

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "WebCheck API is running",
  "version": "1.0.0",
  "endpoints": {
    "analyze": "/api/analyze (POST)"
  }
}
```

## How to Use

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Open Browser**:
   Navigate to `http://localhost:3000`

3. **Analyze a Website**:
   - Enter the website URL (including https://)
   - Click "Analyze Website"
   - Wait for the analysis to complete
   - Review the comprehensive report

4. **Print/Save Report**:
   - Click "Print Report" to save as PDF
   - Use "Analyze Another Site" to start over

## Performance Optimization

The application is designed to be lightweight:
- ✅ Server-side rendering for initial load
- ✅ Client-side state management for interactivity
- ✅ Minimal JavaScript bundle
- ✅ Optimized Tailwind CSS
- ✅ Efficient HTML parsing with Cheerio
- ✅ Request timeouts to prevent hanging
- ✅ Link checking limited to samples

## Future Enhancements

Potential features for future versions:
1. Advanced Lighthouse integration for detailed performance metrics
2. Mobile responsiveness testing
3. Security headers analysis
4. Sitemap validation
5. Robots.txt analysis
6. Page speed insights integration
7. Historical analysis tracking
8. Comparison with competitors
9. Scheduled monitoring
10. Email reports
11. Custom check profiles
12. API key authentication for rate limiting
13. Export to PDF/CSV
14. Dark mode
15. Multi-language support

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting
```bash
npm run build
npm start
```

## Environment Variables

No environment variables required for basic functionality.

Optional:
- `NEXT_PUBLIC_API_URL`: Custom API URL (default: relative)
- `NODE_ENV`: production/development

## Troubleshooting

### Issue: "Failed to analyze website"
- Check if the URL is accessible
- Verify the website allows scraping
- Check internet connection
- Try again with a different URL

### Issue: "CORS errors"
- This should not happen as analysis is server-side
- Check if the target website has strict CORS policies

### Issue: "Timeout errors"
- The website may be slow to respond
- Check the timeout configuration in lib/config.ts
- Try analyzing a faster website

## Credits

Built by: Kunal Rohilla
- GitHub: [@Kunal061](https://github.com/Kunal061)
- LinkedIn: [Kunal Rohilla](https://www.linkedin.com/in/kunal-rohilla-745545246/)
- Email: kunalr.tech@gmail.com

## License

MIT License - Free for personal and commercial use.

---

**Note**: This tool is for educational and analysis purposes. Always respect website terms of service and robots.txt when analyzing websites.
