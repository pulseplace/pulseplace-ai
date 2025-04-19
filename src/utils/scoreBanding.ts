
/**
 * Utility functions for PulseScore banding and visualization
 */

export type ScoreBand = 'thriving' | 'stable' | 'at-risk' | 'critical';

/**
 * Determines the score band based on the PulseScore value
 */
export const getScoreBand = (score: number): ScoreBand => {
  if (score >= 80) return 'thriving';
  if (score >= 60) return 'stable';
  if (score >= 40) return 'at-risk';
  return 'critical';
};

/**
 * Returns the color for a given score band
 */
export const getScoreBandColor = (band: ScoreBand): string => {
  switch (band) {
    case 'thriving': return 'bg-emerald-100 text-emerald-800';
    case 'stable': return 'bg-amber-100 text-amber-800';
    case 'at-risk': return 'bg-orange-100 text-orange-800';
    case 'critical': return 'bg-red-100 text-red-800';
  }
};

/**
 * Returns the color for chart visualization based on score band
 */
export const getScoreBandChartColor = (band: ScoreBand): string => {
  switch (band) {
    case 'thriving': return '#10B981'; // emerald-500
    case 'stable': return '#F59E0B'; // amber-500
    case 'at-risk': return '#F97316'; // orange-500
    case 'critical': return '#EF4444'; // red-500
  }
};

/**
 * Returns the score band description
 */
export const getScoreBandDescription = (band: ScoreBand): string => {
  switch (band) {
    case 'thriving': return 'Thriving culture with strong engagement';
    case 'stable': return 'Stable culture with good foundation';
    case 'at-risk': return 'At risk culture needing attention';
    case 'critical': return 'Critical issues requiring immediate intervention';
  }
};
