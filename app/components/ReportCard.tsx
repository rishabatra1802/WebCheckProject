'use client';

import { AnalysisResult } from '../page';
import { useState } from 'react';
import PracticalGuide from './PracticalGuide';

interface ReportCardProps {
  result: AnalysisResult;
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const getColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-yellow-500 to-orange-500';
    if (score >= 50) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const getTextColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative mb-4">
        {/* Animated background glow */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getColor(score)} opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500`}></div>
        
        {/* SVG Circle */}
        <svg className="transform -rotate-90 w-32 h-32 relative" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient-${label})"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={score >= 90 ? 'text-green-500' : score >= 70 ? 'text-yellow-500' : score >= 50 ? 'text-orange-500' : 'text-red-500'} stopColor="currentColor" />
              <stop offset="100%" className={score >= 90 ? 'text-emerald-500' : score >= 70 ? 'text-orange-500' : score >= 50 ? 'text-red-500' : 'text-pink-500'} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-3xl font-bold ${getTextColor(score)} group-hover:scale-110 transition-transform duration-300`}>
            {score}
          </div>
        </div>
      </div>
      <div className="text-base font-semibold text-white">{label}</div>
    </div>
  );
}

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-102 group">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/20 pb-3 flex items-center gap-3">
        {icon && <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}

function IssueList({ items, type = 'warning', title }: { items: string[]; type?: 'warning' | 'error' | 'info' | 'success'; title?: string }) {
  if (items.length === 0) return null;

  const getIcon = () => {
    switch (type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return '💡';
      case 'success': return '✅';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'error': return 'bg-red-500/10 border-red-500/50 text-red-100';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-100';
      case 'info': return 'bg-blue-500/10 border-blue-500/50 text-blue-100';
      case 'success': return 'bg-green-500/10 border-green-500/50 text-green-100';
    }
  };

  return (
    <div className="space-y-3">
      {title && <h4 className="font-semibold text-white text-lg mb-2">{title}</h4>}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`p-4 rounded-xl border ${getColors()} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 cursor-default`}
            style={{
              animationDelay: `${index * 0.05}s`,
              animation: 'slide-up 0.4s ease-out backwards',
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5 flex-shrink-0">{getIcon()}</span>
              <span className="font-medium">{item}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ReportCard({ result }: ReportCardProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="mt-12 space-y-8 animate-fade-in">
      {/* Overall Score */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 rounded-3xl shadow-2xl p-10 text-white">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
            🎯 Overall Score
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-7xl font-bold mb-3 animate-float">{result.overallScore}<span className="text-4xl">/100</span></div>
              <p className="text-xl text-purple-100">
                {result.overallScore >= 90 ? '🎉 Excellent! Your site is top-notch!' : 
                 result.overallScore >= 70 ? '👍 Good job! Room for improvement' :
                 result.overallScore >= 50 ? '⚠️ Needs work, but you\'re on track' : 
                 '🚨 Critical issues need attention'}
              </p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{result.seo.score}</div>
                <div className="text-sm text-purple-200">SEO</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{result.accessibility.score}</div>
                <div className="text-sm text-purple-200">A11y</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{result.performance.score}</div>
                <div className="text-sm text-purple-200">Perf</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Info */}
      <Section title="Website Information" icon="🌐">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-semibold text-white min-w-[100px]">URL:</span>
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors truncate">
              {result.url}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-semibold text-white min-w-[100px]">Title:</span>
            <span className="text-gray-200">{result.title}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-white">Meta Description:</span>
            <p className="text-gray-200 bg-black/20 p-4 rounded-xl border border-white/10">
              {result.metaDescription}
            </p>
          </div>
        </div>
      </Section>

      {/* Score Breakdown */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/20 pb-3 flex items-center gap-3">
          📊 Score Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScoreCircle score={result.seo.score} label="SEO" />
          <ScoreCircle score={result.accessibility.score} label="Accessibility" />
          <ScoreCircle score={result.performance.score} label="Performance" />
        </div>
      </div>

      {/* SEO Analysis */}
      <Section title="🔍 SEO Analysis" icon="🔍">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              Issues Found <span className="text-red-400">({result.seo.issues.length})</span>
            </h4>
            {result.seo.issues.length > 0 ? (
              <IssueList items={result.seo.issues} type="error" />
            ) : (
              <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-100 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>No SEO issues found! Your SEO is excellent!</span>
              </div>
            )}
          </div>
          {result.seo.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                Recommendations <span className="text-blue-400">({result.seo.recommendations.length})</span>
              </h4>
              <IssueList items={result.seo.recommendations} type="info" />
            </div>
          )}
        </div>
      </Section>

      {/* Accessibility Analysis */}
      <Section title="♿ Accessibility Analysis" icon="♿">
        {result.accessibility.issues.length > 0 ? (
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              Issues Found <span className="text-red-400">({result.accessibility.issues.length})</span>
            </h4>
            <IssueList items={result.accessibility.issues} type="error" />
          </div>
        ) : (
          <div className="p-6 bg-green-500/10 border border-green-500/50 rounded-xl text-green-100 flex items-center gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <span className="font-semibold block">Perfect Accessibility!</span>
              <span>No accessibility issues found. Your site is inclusive!</span>
            </div>
          </div>
        )}
      </Section>

      {/* Performance Analysis */}
      <Section title="⚡ Performance Analysis" icon="⚡">
        {result.performance.issues.length > 0 ? (
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              Issues Found <span className="text-orange-400">({result.performance.issues.length})</span>
            </h4>
            <IssueList items={result.performance.issues} type="warning" />
          </div>
        ) : (
          <div className="p-6 bg-green-500/10 border border-green-500/50 rounded-xl text-green-100 flex items-center gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <span className="font-semibold block">Lightning Fast Performance!</span>
              <span>No performance issues found. Your site loads quickly!</span>
            </div>
          </div>
        )}
      </Section>

      {/* Header Structure */}
      <Section title="📋 Header Structure" icon="📋">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">H1 Count:</span>
            <span className={`px-3 py-1 rounded-full ${result.headers.hasMultipleH1 ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
              {result.headers.h1Count} {result.headers.hasMultipleH1 && '(Warning: Multiple H1 tags found)'}
            </span>
          </div>
          {result.headers.structure.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3">Header Hierarchy:</h4>
              <div className="bg-black/20 p-4 rounded-xl border border-white/10 max-h-64 overflow-y-auto">
                {result.headers.structure.map((header, index) => (
                  <div key={index} className="text-gray-200 py-2 font-mono text-sm border-b border-white/5 last:border-0">
                    {header}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Images Analysis */}
      <Section title="🖼️ Images Analysis" icon="🖼️">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-300">{result.images.total}</div>
              <div className="text-sm text-blue-200">Total Images</div>
            </div>
            <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/30">
              <div className="text-3xl font-bold text-orange-300">{result.images.withoutAlt}</div>
              <div className="text-sm text-orange-200">Without Alt Text</div>
            </div>
          </div>
          {result.images.missingAlt.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                Images Missing Alt Text <span className="text-orange-400">({result.images.missingAlt.length})</span>
              </h4>
              <div className="bg-black/20 p-4 rounded-xl border border-white/10 max-h-48 overflow-y-auto">
                {result.images.missingAlt.map((src, index) => (
                  <div key={index} className="text-gray-200 py-2 text-sm truncate border-b border-white/5 last:border-0">
                    {src}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Broken Links */}
      <Section title="🔗 Broken Links" icon="🔗">
        <div className="space-y-4">
          {result.brokenLinks.internal.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                Internal Broken Links <span className="text-red-400">({result.brokenLinks.internal.length})</span>
              </h4>
              <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/30 max-h-48 overflow-y-auto">
                {result.brokenLinks.internal.map((link, index) => (
                  <div key={index} className="text-red-100 py-2 text-sm break-all border-b border-red-500/20 last:border-0">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.brokenLinks.external.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                External Broken Links <span className="text-orange-400">({result.brokenLinks.external.length})</span>
              </h4>
              <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/30 max-h-48 overflow-y-auto">
                {result.brokenLinks.external.map((link, index) => (
                  <div key={index} className="text-orange-100 py-2 text-sm break-all border-b border-orange-500/20 last:border-0">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.brokenLinks.internal.length === 0 && result.brokenLinks.external.length === 0 && (
            <div className="p-6 bg-green-500/10 border border-green-500/50 rounded-xl text-green-100 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <span className="font-semibold block">All Links Working!</span>
                <span>No broken links detected in the sample checked.</span>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Future Scope */}
      <Section title="🚀 Future Scope & Recommendations" icon="🚀">
        <div>
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            Actionable Insights <span className="text-blue-400">({result.futureScope.length})</span>
          </h4>
          <IssueList items={result.futureScope} type="info" />
        </div>
      </Section>

      {/* Practical Guide for Non-Tech Users */}
      <PracticalGuide result={result} />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in">
        <button
          onClick={() => window.print()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform flex items-center justify-center gap-2"
        >
          <span>🖨️</span>
          <span>Print Report</span>
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform flex items-center justify-center gap-2"
        >
          <span>🔄</span>
          <span>Analyze Another Site</span>
        </button>
      </div>
    </div>
  );
}
