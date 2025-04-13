
import { PredictiveFlag } from '@/types/scoring.types';

/**
 * Generate the CultureCompass data based on culture data input
 */
export const generateCultureCompass = (
  cultureData: Array<{ category: string; score: number; benchmark: number }>
) => {
  // Transform the culture data into the required format for CultureCompass
  const dimensions = cultureData.map(item => {
    const gap = Math.round(item.score - item.benchmark);
    let status: 'strength' | 'neutral' | 'opportunity';
    
    if (gap >= 5) {
      status = 'strength';
    } else if (gap <= -5) {
      status = 'opportunity';
    } else {
      status = 'neutral';
    }

    // Generate trend data (would be based on historical data in production)
    let trend: 'up' | 'down' | 'stable' | undefined;
    const randomTrend = Math.floor(Math.random() * 3);
    switch (randomTrend) {
      case 0: trend = 'up'; break;
      case 1: trend = 'down'; break;
      case 2: trend = 'stable'; break;
      default: trend = undefined;
    }

    // Generate insight based on the data
    let keyInsight;
    if (status === 'strength') {
      keyInsight = `Strong ${item.category.toLowerCase()} scores indicate positive alignment with organizational values.`;
    } else if (status === 'opportunity') {
      keyInsight = `Consider focused initiatives to improve ${item.category.toLowerCase()} across teams.`;
    } else {
      keyInsight = `${item.category} is on par with industry benchmarks.`;
    }

    return {
      name: item.category,
      score: item.score,
      benchmark: item.benchmark,
      gap,
      status,
      trend,
      keyInsight
    };
  });

  // Calculate overall alignment score (average of all scores)
  const overallAlignment = dimensions.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length;

  // Determine primary strength (highest gap)
  const sortedByStrength = [...dimensions].sort((a, b) => b.gap - a.gap);
  const primaryStrength = `${sortedByStrength[0].name} reflects strong cultural values with scores ${sortedByStrength[0].gap > 0 ? '+' + sortedByStrength[0].gap : sortedByStrength[0].gap} above benchmark.`;

  // Determine primary gap (lowest gap)
  const sortedByGap = [...dimensions].sort((a, b) => a.gap - b.gap);
  const primaryGap = `Focus on improving ${sortedByGap[0].name.toLowerCase()} with targeted team initiatives.`;

  // Generate predicted risks
  const predictedRisks = [];
  const lowestDimensions = sortedByGap.slice(0, 2);
  
  for (const dim of lowestDimensions) {
    if (dim.gap < -3) {  // Only add risks for dimensions significantly below benchmark
      predictedRisks.push({
        type: `${dim.name} Misalignment`,
        description: `${dim.name} scores ${Math.abs(dim.gap)} points below benchmark may indicate cultural friction.`,
        severity: Math.abs(dim.gap) > 10 ? 'high' : 'medium' as 'high' | 'medium' | 'low'
      });
    }
  }

  // Add a general risk based on variance if scores are inconsistent
  const scores = dimensions.map(d => d.score);
  const variance = calculateVariance(scores);
  if (variance > 100) {
    predictedRisks.push({
      type: 'Cultural Inconsistency',
      description: 'High variance between dimension scores may indicate uneven culture development.',
      severity: 'medium' as 'high' | 'medium' | 'low'
    });
  }

  // Timestamp for last updated
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return {
    dimensions,
    overallAlignment,
    primaryStrength,
    primaryGap,
    lastUpdated,
    predictedRisks
  };
};

// Helper function to calculate variance of an array of numbers
function calculateVariance(arr: number[]): number {
  if (arr.length === 0) return 0;
  const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;
  const squaredDiffs = arr.map(val => Math.pow(val - mean, 2));
  return squaredDiffs.reduce((sum, val) => sum + val, 0) / arr.length;
}
