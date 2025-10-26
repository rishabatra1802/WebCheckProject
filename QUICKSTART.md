# Quick Start Guide - WebCheck

## Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Using WebCheck

### Step 1: Enter a URL
Type or paste the website URL you want to analyze in the input field.

**Examples:**
- https://example.com
- https://github.com
- https://vercel.com

### Step 2: Click "Analyze Website"
The analysis will start and typically takes 5-15 seconds depending on the website size.

### Step 3: Review Your Report
You'll receive a comprehensive report card including:

- **Overall Score** (0-100)
- **SEO Analysis** - Meta tags, Open Graph, structured data
- **Accessibility** - Alt text, ARIA, semantic HTML
- **Performance** - Page size, scripts, optimization tips
- **Broken Links** - Internal and external link validation
- **Images** - Alt text coverage
- **Header Structure** - H1-H6 hierarchy
- **Future Recommendations** - Actionable improvements

### Step 4: Take Action
- Print the report using the "Print Report" button
- Implement the recommendations
- Re-analyze to track improvements

## Score Interpretation

| Score | Rating | Meaning |
|-------|--------|---------|
| 90-100 | Excellent ✅ | Great job! Minor tweaks may help |
| 70-89 | Good ⚠️ | Solid foundation, room for improvement |
| 50-69 | Fair ⚠️ | Several issues need attention |
| 0-49 | Poor ❌ | Critical issues require immediate action |

## Common Issues & Solutions

### "Invalid URL format"
**Solution:** Ensure URL includes protocol (http:// or https://)

### "Failed to analyze website"
**Possible causes:**
- Website is down or unreachable
- Website blocks automated requests
- Network connectivity issues

**Solution:** 
- Verify the URL is correct
- Try a different website
- Check your internet connection

### Analysis takes too long
**Solution:**
- Large websites take longer to analyze
- Wait up to 30 seconds
- If timeout, try again

## Understanding the Report

### SEO Section
Issues flagged:
- Missing or poorly optimized title tags
- Missing or poorly optimized meta descriptions
- Missing canonical URLs
- Missing Open Graph tags

### Performance Section
Issues flagged:
- Large HTML size (>500KB)
- Too many inline styles
- Too many external scripts
- Images not using modern formats
- Missing lazy loading

### Accessibility Section
Issues flagged:
- Images without alt text
- Form inputs without labels
- Missing language attribute
- Missing ARIA landmarks

### Broken Links
- **Internal links:** Links within the same domain
- **External links:** Links to other domains
- Limited to sample checking to prevent timeouts

## Tips for Best Results

1. **Analyze production sites:** Development sites may have issues
2. **Use full URLs:** Include https:// for accurate analysis
3. **Re-test after changes:** Track improvements over time
4. **Prioritize high-impact issues:** Focus on red flags first
5. **Consider context:** Some recommendations may not apply to your use case

## Building for Production

```bash
npm run build
npm start
```

Access at [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel login
vercel deploy
```

### Docker
```bash
docker build -t webcheck .
docker run -p 3000:3000 webcheck
```

## Getting Help

- Check the [README.md](./README.md) for detailed documentation
- Review [SUMMARY.md](./SUMMARY.md) for technical details
- Open an issue on GitHub for bugs or feature requests

## Next Steps

After analyzing your first website:
1. Review all sections of the report
2. Prioritize issues by severity
3. Implement recommendations
4. Re-analyze to verify improvements
5. Share the tool with others!

---

**Happy Analyzing! 🚀**

Built with ❤️ by Kunal Rohilla
