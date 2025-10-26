export const config = {
  // Maximum time to wait for a webpage to load (in milliseconds)
  requestTimeout: 10000,
  
  // Maximum time to check a single link (in milliseconds)
  linkCheckTimeout: 5000,
  
  // Maximum number of internal links to check
  maxInternalLinksToCheck: 10,
  
  // Maximum number of external links to check
  maxExternalLinksToCheck: 5,
  
  // Maximum number of images without alt to display
  maxMissingAltToDisplay: 20,
  
  // Maximum number of headers to display in structure
  maxHeadersToDisplay: 30,
};

export const scoreThresholds = {
  excellent: 90,
  good: 70,
  fair: 50,
  poor: 0,
};

export const getScoreLabel = (score: number): string => {
  if (score >= scoreThresholds.excellent) return 'Excellent';
  if (score >= scoreThresholds.good) return 'Good';
  if (score >= scoreThresholds.fair) return 'Fair';
  return 'Poor';
};

export const getScoreColor = (score: number): {
  text: string;
  bg: string;
  border: string;
} => {
  if (score >= scoreThresholds.excellent) {
    return {
      text: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
    };
  }
  if (score >= scoreThresholds.good) {
    return {
      text: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    };
  }
  if (score >= scoreThresholds.fair) {
    return {
      text: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    };
  }
  return {
    text: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  };
};
