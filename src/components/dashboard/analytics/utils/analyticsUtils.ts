
// Calculate statistical significance
export const calculateZScore = (value: number, benchmark: number) => {
  // Simplified z-score calculation (assumes standard deviation of 10)
  const stdDev = 10;
  return ((value - benchmark) / stdDev).toFixed(2);
};

// Helper to format percentage changes
export const formatChange = (current: number, previous: number): string => {
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
};

// Helper to determine if a value is statistically significant
export const isSignificant = (zScore: number | string): boolean => {
  const score = typeof zScore === 'string' ? parseFloat(zScore) : zScore;
  return Math.abs(score) >= 1.96; // 95% confidence interval
};
