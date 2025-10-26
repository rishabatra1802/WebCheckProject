'use client';

import { useState } from 'react';

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: '🔍',
      title: 'SEO Analysis',
      description: 'Comprehensive SEO check including meta tags, Open Graph, and structured data',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Analyze page size, scripts, and get optimization recommendations',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '♿',
      title: 'Accessibility',
      description: 'Validate WCAG compliance with alt text, ARIA, and semantic HTML checks',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🔗',
      title: 'Link Checker',
      description: 'Detect broken internal and external links automatically',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📊',
      title: 'Detailed Reports',
      description: 'Get actionable insights with prioritized recommendations',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: '🚀',
      title: 'Future Scope',
      description: 'Discover opportunities for improvement and growth',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="mt-16 animate-fade-in">
      <h2 className="text-4xl font-bold text-center text-white mb-4">
        What We Analyze
      </h2>
      <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
        Comprehensive website auditing with real-time insights
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer ${
              hoveredIndex === index ? 'scale-105 shadow-2xl' : 'hover:scale-102'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'slide-up 0.6s ease-out backwards',
            }}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            {/* Icon with animation */}
            <div className="relative text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              {feature.icon}
            </div>
            
            {/* Title */}
            <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.color} transition-all duration-300">
              {feature.title}
            </h3>
            
            {/* Description */}
            <p className="relative text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
              {feature.description}
            </p>
            
            {/* Animated arrow */}
            <div className="relative mt-4 flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
              <span className="text-sm font-semibold">Learn more</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
