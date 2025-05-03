
import { PulseScoreTier } from '@/types/scoring.types';
import { TIER_THRESHOLDS } from './config';

// Get the tier based on score
export const getTierFromScore = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.pulse_certified) {
    return 'pulse_certified';
  } else if (score >= TIER_THRESHOLDS.emerging_culture) {
    return 'emerging_culture';
  } else if (score >= TIER_THRESHOLDS.at_risk) {
    return 'at_risk';
  } else {
    return 'intervention_advised';
  }
};

// Function to format scores for display
export const formatScore = (score: number): string => {
  return Math.round(score).toString();
};

// Function to get color based on score
export const getScoreColor = (score: number): string => {
  if (score >= 80) {
    return 'text-green-600';
  } else if (score >= 60) {
    return 'text-yellow-500';
  } else {
    return 'text-red-500';
  }
};

// Function to get background color based on score
export const getScoreBgColor = (score: number): string => {
  if (score >= 80) {
    return 'bg-green-100';
  } else if (score >= 60) {
    return 'bg-yellow-100';
  } else {
    return 'bg-red-100';
  }
};
