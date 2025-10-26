'use client';

import { useState } from 'react';

interface AnalysisFormProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export default function AnalysisForm({ onAnalyze, loading }: AnalysisFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300">
        <div className="mb-6">
          <label htmlFor="url" className="block text-sm font-semibold text-white mb-3 tracking-wide">
            🌐 Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-6 py-4 bg-white/90 border-2 border-purple-300/50 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 outline-none transition-all text-gray-900 placeholder-gray-500 font-medium"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:scale-105 transform active:scale-95"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🚀 Analyze Website
            </span>
          )}
        </button>
      </form>

      {/* Example URLs */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-300 mb-3 font-medium">Try these examples:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {['https://example.com', 'https://github.com', 'https://vercel.com'].map((exampleUrl) => (
            <button
              key={exampleUrl}
              onClick={() => setUrl(exampleUrl)}
              className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 transform"
              disabled={loading}
            >
              {exampleUrl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
