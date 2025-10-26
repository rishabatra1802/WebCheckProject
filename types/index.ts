export interface AnalysisResult {
  url: string;
  title: string;
  metaDescription: string;
  performance: PerformanceAnalysis;
  seo: SEOAnalysis;
  accessibility: AccessibilityAnalysis;
  brokenLinks: BrokenLinksAnalysis;
  images: ImageAnalysis;
  headers: HeaderAnalysis;
  futureScope: string[];
  overallScore: number;
}

export interface PerformanceAnalysis {
  score: number;
  issues: string[];
}

export interface SEOAnalysis {
  score: number;
  issues: string[];
  recommendations: string[];
}

export interface AccessibilityAnalysis {
  score: number;
  issues: string[];
}

export interface BrokenLinksAnalysis {
  internal: string[];
  external: string[];
}

export interface ImageAnalysis {
  total: number;
  withoutAlt: number;
  missingAlt: string[];
}

export interface HeaderAnalysis {
  h1Count: number;
  hasMultipleH1: boolean;
  structure: string[];
}

export interface AnalyzeRequest {
  url: string;
}

export interface AnalyzeResponse {
  result?: AnalysisResult;
  error?: string;
}
