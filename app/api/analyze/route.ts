import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface AnalysisResult {
  url: string;
  title: string;
  metaDescription: string;
  performance: {
    score: number;
    issues: string[];
  };
  seo: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  accessibility: {
    score: number;
    issues: string[];
  };
  brokenLinks: {
    internal: string[];
    external: string[];
  };
  images: {
    total: number;
    withoutAlt: number;
    missingAlt: string[];
  };
  headers: {
    h1Count: number;
    hasMultipleH1: boolean;
    structure: string[];
  };
  futureScope: string[];
  overallScore: number;
}

async function checkLink(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, { timeout: 5000, maxRedirects: 5 });
    return response.status >= 200 && response.status < 400;
  } catch {
    return false;
  }
}

function calculateSEOScore($: cheerio.CheerioAPI): { score: number; issues: string[]; recommendations: string[] } {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Check title
  const title = $('title').text();
  if (!title) {
    issues.push('❌ Your page is missing a title. Visitors won\'t know what your page is about!');
    recommendations.push('📝 Add a clear, descriptive title to your page (like "My Bakery - Fresh Homemade Cookies")');
    score -= 15;
  } else if (title.length < 30) {
    issues.push('📏 Your page title is too short. It should describe what your page is about.');
    recommendations.push('📏 Make your title longer and more descriptive (50-60 characters is perfect)');
    score -= 5;
  } else if (title.length > 60) {
    issues.push('📏 Your page title is too long. It might get cut off in search results.');
    recommendations.push('📏 Shorten your title to 50-60 characters so it\'s fully visible');
    score -= 5;
  }

  // Check meta description
  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc) {
    issues.push('❌ Your page is missing a meta description. You\'re missing a chance to attract visitors!');
    recommendations.push('📝 Write a short paragraph (150-160 characters) describing what your page offers');
    score -= 15;
  } else if (metaDesc.length < 120) {
    issues.push('📏 Your meta description is too short to explain what your page offers');
    recommendations.push('📏 Expand your meta description to better explain your page (150-160 characters ideal)');
    score -= 5;
  } else if (metaDesc.length > 160) {
    issues.push('📏 Your meta description is too long. Search engines may cut it off.');
    recommendations.push('📏 Keep your meta description under 160 characters so it displays fully');
    score -= 5;
  }

  // Check canonical URL
  if (!$('link[rel="canonical"]').length) {
    recommendations.push('🔗 Add a canonical URL to help search engines understand your main page (prevents duplicate content issues)');
    score -= 5;
  }

  // Check Open Graph tags
  if (!$('meta[property^="og:"]').length) {
    recommendations.push('📱 Add social media preview images so your links look great when shared on Facebook, Twitter, etc.');
    score -= 5;
  }

  // Check robots meta
  if (!$('meta[name="robots"]').length) {
    recommendations.push('🤖 Consider adding a robots meta tag to control how search engines index your page');
  }

  return { score: Math.max(0, score), issues, recommendations };
}

function analyzeAccessibility($: cheerio.CheerioAPI): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  // Check for alt attributes on images
  const imagesWithoutAlt = $('img:not([alt])').length;
  if (imagesWithoutAlt > 0) {
    issues.push(`🖼️ ${imagesWithoutAlt} image(s) on your page don't have descriptions. This helps visually impaired visitors using screen readers.`);
    score -= Math.min(30, imagesWithoutAlt * 5);
  }

  // Check for form labels
  const inputsWithoutLabels = $('input:not([type="hidden"]):not([aria-label])').filter((_, el) => {
    return !$(el).prev('label').length && !$(el).parent('label').length;
  }).length;
  
  if (inputsWithoutLabels > 0) {
    issues.push(`📋 ${inputsWithoutLabels} form field(s) don't have labels. Visitors might not know what information to enter.`);
    score -= Math.min(20, inputsWithoutLabels * 5);
  }

  // Check for language attribute
  if (!$('html[lang]').length) {
    issues.push('🌐 Your website is missing a language setting. This helps search engines and translation tools.');
    score -= 10;
  }

  // Check for ARIA landmarks
  const hasLandmarks = $('[role="main"], main, [role="navigation"], nav').length > 0;
  if (!hasLandmarks) {
    issues.push('🗺️ Your page is missing navigation landmarks. These help visitors find content more easily.');
    score -= 10;
  }

  return { score: Math.max(0, score), issues };
}

function analyzePerformance($: cheerio.CheerioAPI, html: string): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  // Check HTML size
  const htmlSize = Buffer.byteLength(html, 'utf8');
  if (htmlSize > 500000) {
    issues.push(`📦 Your webpage is quite large (${(htmlSize / 1024).toFixed(2)} KB). Large pages load slower.`);
    score -= 15;
  }

  // Check for inline styles
  const inlineStyles = $('[style]').length;
  if (inlineStyles > 10) {
    issues.push(`🎨 You have ${inlineStyles} elements with inline styles. This makes your site harder to update.`);
    score -= 10;
  }

  // Check for external resources
  const externalScripts = $('script[src]').length;
  if (externalScripts > 15) {
    issues.push(`⚡ You're loading ${externalScripts} external scripts. Too many scripts can slow down your site.`);
    score -= 10;
  }

  const externalStyles = $('link[rel="stylesheet"]').length;
  if (externalStyles > 5) {
    issues.push(`🎨 You're loading ${externalStyles} stylesheet files. Combining them could make your site faster.`);
    score -= 5;
  }

  // Check for image optimization hints
  const largeImages = $('img').filter((_, el) => {
    const src = $(el).attr('src');
    return !!src && !src.includes('.webp') && !src.includes('.avif');
  }).length;
  
  if (largeImages > 0) {
    issues.push(`🖼️ You have images that could be compressed. Smaller images load faster.`);
    score -= 10;
  }

  // Check for lazy loading
  const imagesWithoutLazyLoad = $('img:not([loading="lazy"])').length;
  if (imagesWithoutLazyLoad > 5) {
    issues.push(`⚡ ${imagesWithoutLazyLoad} images aren't using lazy loading. This loads all images at once, slowing your site.`);
    score -= 5;
  }

  return { score: Math.max(0, score), issues };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url);
      if (!['http:', 'https:'].includes(validUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the webpage
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'WebCheck Bot/1.0'
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract basic information
    const title = $('title').text() || 'No title found';
    const metaDescription = $('meta[name="description"]').attr('content') || 'No description found';

    // Analyze SEO
    const seo = calculateSEOScore($);

    // Analyze Accessibility
    const accessibility = analyzeAccessibility($);

    // Analyze Performance
    const performance = analyzePerformance($, html);

    // Analyze header structure
    const h1Elements = $('h1');
    const h1Count = h1Elements.length;
    const headerStructure: string[] = [];
    
    $('h1, h2, h3, h4, h5, h6').each((_, el) => {
      headerStructure.push(`<${el.name}> ${$(el).text().substring(0, 50)}`);
    });

    // Analyze images
    const allImages = $('img');
    const imagesWithoutAlt = allImages.filter((_, el) => !$(el).attr('alt'));
    const missingAlt: string[] = [];
    
    imagesWithoutAlt.each((_, el) => {
      const src = $(el).attr('src') || 'unknown';
      missingAlt.push(src);
    });

    // Check for broken links
    const links = $('a[href]');
    const internalLinks: string[] = [];
    const externalLinks: string[] = [];
    const brokenInternal: string[] = [];
    const brokenExternal: string[] = [];

    links.each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;

      try {
        const linkUrl = new URL(href, url);
        if (linkUrl.hostname === validUrl.hostname) {
          internalLinks.push(linkUrl.href);
        } else {
          externalLinks.push(linkUrl.href);
        }
      } catch {
        // Invalid URL, skip
      }
    });

    // Check a sample of links (limit to prevent timeout)
    const linksToCheck = [...new Set([...internalLinks.slice(0, 10), ...externalLinks.slice(0, 5)])];
    
    await Promise.all(
      linksToCheck.map(async (link) => {
        const isValid = await checkLink(link);
        if (!isValid) {
          if (internalLinks.includes(link)) {
            brokenInternal.push(link);
          } else {
            brokenExternal.push(link);
          }
        }
      })
    );

    // Generate future scope recommendations
    const futureScope: string[] = [];
    
    if (!$('meta[name="viewport"]').length) {
      futureScope.push('📱 Add a viewport meta tag to make your site look good on mobile phones and tablets');
    }
    
    if (!$('link[rel="icon"]').length && !$('link[rel="shortcut icon"]').length) {
      futureScope.push(' Favicons help visitors recognize your site in bookmarks and tabs');
    }
    
    if (!$('meta[property="og:image"]').length) {
      futureScope.push('🖼️ Add an Open Graph image so your links look great when shared on social media');
    }
    
    if (!$('script[type="application/ld+json"]').length) {
      futureScope.push(' Structured data helps search engines understand your content better (can improve search rankings)');
    }
    
    if ($('script[src]:not([async]):not([defer])').length > 0) {
      futureScope.push('⚡ Add async or defer attributes to script tags to improve page loading speed');
    }
    
    futureScope.push('🔐 Consider implementing a Content Security Policy (CSP) to protect against hackers');
    futureScope.push(' Progressive Web App (PWA) features can make your site work like a mobile app');
    futureScope.push('📊 Add analytics to understand how visitors use your site and what to improve');

    // Calculate overall score
    const overallScore = Math.round(
      (seo.score * 0.4 + accessibility.score * 0.3 + performance.score * 0.3)
    );

    const result: AnalysisResult = {
      url,
      title,
      metaDescription,
      performance,
      seo,
      accessibility,
      brokenLinks: {
        internal: brokenInternal,
        external: brokenExternal,
      },
      images: {
        total: allImages.length,
        withoutAlt: imagesWithoutAlt.length,
        missingAlt: missingAlt.slice(0, 20), // Limit to first 20
      },
      headers: {
        h1Count,
        hasMultipleH1: h1Count > 1,
        structure: headerStructure.slice(0, 30), // Limit to first 30
      },
      futureScope,
      overallScore,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website. Please check the URL and try again.' },
      { status: 500 }
    );
  }
}
