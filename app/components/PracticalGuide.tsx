'use client';

import { useState } from 'react';
import type { AnalysisResult } from '../page';

interface PracticalGuideProps {
  result: AnalysisResult;
}

export default function PracticalGuide({ result }: PracticalGuideProps) {
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

  // Categorize recommendations for non-tech users
  const practicalRecommendations = {
    quickWins: [] as string[],
    content: [] as string[],
    design: [] as string[],
    technical: [] as string[],
  };

  // Collect all recommendations
  const allRecommendations = [
    ...result.seo.recommendations,
    ...result.futureScope
  ];

  // Categorize them
  allRecommendations.forEach(rec => {
    if (rec.includes('title') || rec.includes('description') || rec.includes('meta')) {
      practicalRecommendations.content.push(rec);
    } else if (rec.includes('image') || rec.includes('favicon') || rec.includes('social')) {
      practicalRecommendations.design.push(rec);
    } else if (rec.includes('script') || rec.includes('performance') || rec.includes('CSP') || rec.includes('analytics')) {
      practicalRecommendations.technical.push(rec);
    } else {
      practicalRecommendations.quickWins.push(rec);
    }
  });

  // Add some general tips based on scores
  if (result.seo.score < 80) {
    practicalRecommendations.quickWins.push('📝 Focus on improving your page titles and meta descriptions - these are like shop window displays for search engines');
  }
  
  if (result.accessibility.score < 80) {
    practicalRecommendations.quickWins.push('♿ Make sure all images have descriptions - this helps visually impaired visitors');
  }
  
  if (result.performance.score < 80) {
    practicalRecommendations.quickWins.push('⚡ Optimize your images and remove unnecessary scripts to make your site faster');
  }

  const categories = [
    { 
      id: 'quickWins', 
      title: '🚀 Quick Wins', 
      icon: '🚀',
      description: 'Easy improvements you can make right away',
      color: 'from-green-500 to-emerald-500',
      items: practicalRecommendations.quickWins,
      priority: 'High'
    },
    { 
      id: 'content', 
      title: '📝 Content Improvements', 
      icon: '📝',
      description: 'Make your content more discoverable and engaging',
      color: 'from-blue-500 to-cyan-500',
      items: practicalRecommendations.content,
      priority: 'High'
    },
    { 
      id: 'design', 
      title: '🎨 Design & Media', 
      icon: '🎨',
      description: 'Visual elements that improve user experience',
      color: 'from-purple-500 to-pink-500',
      items: practicalRecommendations.design,
      priority: 'Medium'
    },
    { 
      id: 'technical', 
      title: '⚙️ Technical Enhancements', 
      icon: '⚙️',
      description: 'Advanced improvements (ask your developer for help)',
      color: 'from-orange-500 to-red-500',
      items: practicalRecommendations.technical,
      priority: 'Low'
    }
  ];

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">📋 Practical Action Plan</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Simple steps to improve your website, organized by difficulty. Start with Quick Wins!
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          category.items.length > 0 && (
            <div 
              key={category.id}
              className="bg-black/20 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-400/50"
            >
              <button
                onClick={() => toggleSection(category.id)}
                className={`w-full p-5 text-left flex items-center justify-between bg-gradient-to-r ${category.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <p className="text-gray-300 text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    category.priority === 'High' ? 'bg-red-500/30 text-red-200' :
                    category.priority === 'Medium' ? 'bg-yellow-500/30 text-yellow-200' :
                    'bg-green-500/30 text-green-200'
                  }`}>
                    {category.priority}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {category.items.length} {category.items.length === 1 ? 'tip' : 'tips'}
                  </span>
                  <span className="text-2xl transition-transform duration-300">
                    {expandedSections.has(category.id) ? '▲' : '▼'}
                  </span>
                </div>
              </button>
              
              {expandedSections.has(category.id) && (
                <div className="p-5 border-t border-white/10 animate-slide-up">
                  <ul className="space-y-4">
                    {category.items.map((item, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5"
                      >
                        <span className="text-xl mt-0.5">💡</span>
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {category.id === 'quickWins' && (
                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-200 flex items-center gap-2">
                        <span className="text-2xl">🌟</span>
                        <span><strong>Pro Tip:</strong> Start with these quick wins first - they'll make the biggest impact with the least effort!</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        ))}
      </div>

      {allRecommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Excellent Work!</h3>
          <p className="text-gray-300">
            Your website is in great shape! No major improvements needed right now.
          </p>
        </div>
      )}
    </div>
  );
}
