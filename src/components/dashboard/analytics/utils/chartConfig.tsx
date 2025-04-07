
import React from 'react';

// Dashboard colors
export const COLORS = {
  pulseScore: '#9B87F5',
  sentiment: '#22C55E',
  responseRate: '#3B82F6',
  benchmark: '#94A3B8',
  low: '#22C55E',
  medium: '#EAB308',
  high: '#EF4444',
  secondary: '#6E59A5',
  tertiary: '#1EAEDB',
};

// Color array for pie charts
export const PIE_COLORS = ['#9B87F5', '#22C55E', '#3B82F6', '#EAB308', '#EC4899', '#6366F1', '#14B8A6'];

// Get risk color based on risk level
export const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low':
      return COLORS.low;
    case 'medium':
      return COLORS.medium;
    case 'high':
      return COLORS.high;
    default:
      return COLORS.low;
  }
};

// AI insight severity color
export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Custom tooltip for charts
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`tooltip-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Calculate statistical significance
export const calculateZScore = (value: number, benchmark: number) => {
  // Simplified z-score calculation (assumes standard deviation of 10)
  const stdDev = 10;
  return ((value - benchmark) / stdDev).toFixed(2);
};
