'use client';

import { useState } from 'react';
import AnalysisForm from './components/AnalysisForm';
import ReportCard from './components/ReportCard';
import LoadingSpinner from './components/LoadingSpinner';
import Features from './components/Features';

export interface AnalysisResult {
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

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze website');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-300">
              Web<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Check</span>
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Comprehensive website analysis tool. Get instant insights on SEO, performance, 
            accessibility, and actionable recommendations.
          </p>
        </header>

        {/* Analysis Form */}
        <AnalysisForm onAnalyze={handleAnalyze} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-6 bg-red-500/10 backdrop-blur-sm border border-red-500/50 rounded-2xl text-red-100 animate-shake">
            <p className="font-semibold text-lg">⚠️ Error:</p>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Results */}
        {result && <ReportCard result={result} />}

        {/* Features Section - Show when no analysis is running */}
        {!loading && !result && <Features />}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>Built with Next.js and Tailwind CSS by Kunal Rohilla</p>
        </footer>
      </div>
    </div>
  );
}
