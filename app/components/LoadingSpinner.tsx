'use client';

import { useState, useEffect } from 'react';

export default function LoadingSpinner() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: '🌐', text: 'Fetching webpage...' },
    { icon: '🔍', text: 'Analyzing SEO metrics...' },
    { icon: '♿', text: 'Checking accessibility...' },
    { icon: '🔗', text: 'Scanning for broken links...' },
    { icon: '⚡', text: 'Evaluating performance...' },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 95 : prev + 1));
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev >= steps.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 animate-fade-in">
      {/* Main spinner */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-50 animate-pulse-glow"></div>
        
        {/* Rotating rings */}
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-400 border-l-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl animate-float">🔍</span>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 mb-6">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-300 mt-2 font-medium">{progress}% Complete</p>
      </div>
      
      <div className="text-center">
        <p className="text-2xl font-bold text-white mb-2">Analyzing your website</p>
        <p className="text-sm text-gray-300 mb-6">This may take a few moments...</p>
        
        {/* Animated steps */}
        <div className="space-y-3 mt-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-500 ${
                index === currentStep 
                  ? 'bg-white/20 backdrop-blur-sm scale-105 border border-purple-400/50' 
                  : index < currentStep 
                  ? 'bg-white/5 opacity-50' 
                  : 'bg-white/5 opacity-30'
              }`}
            >
              <span className="text-2xl">{step.icon}</span>
              <span className={`text-sm ${
                index === currentStep ? 'text-white font-semibold' : 'text-gray-400'
              }`}>
                {step.text}
              </span>
              {index < currentStep && <span className="ml-auto text-green-400">✓</span>}
              {index === currentStep && (
                <div className="ml-auto">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
