
import { ThemeTrend, AttritionRisk, ScoringTheme } from '@/types/scoring.types';

// Mock data for theme trends over time
export const getThemeTrendData = (): ThemeTrend[] => {
  return [
    {
      theme: 'trust_in_leadership',
      previousScore: 72,
      currentScore: 78,
      change: 6,
      direction: 'up'
    },
    {
      theme: 'psychological_safety',
      previousScore: 68,
      currentScore: 75,
      change: 7,
      direction: 'up'
    },
    {
      theme: 'inclusion_belonging',
      previousScore: 81,
      currentScore: 83,
      change: 2,
      direction: 'up'
    },
    {
      theme: 'motivation_fulfillment',
      previousScore: 74,
      currentScore: 68,
      change: -6,
      direction: 'down'
    },
    {
      theme: 'mission_alignment',
      previousScore: 79,
      currentScore: 80,
      change: 1,
      direction: 'up'
    },
    {
      theme: 'engagement_continuity',
      previousScore: 65,
      currentScore: 70,
      change: 5,
      direction: 'up'
    }
  ];
};

// Generate attrition risk data based on themes
export const getAttritionRiskData = (): AttritionRisk[] => {
  return [
    {
      department: 'Engineering',
      risk: 28,
      change: -5,
      factors: [
        {
          theme: 'motivation_fulfillment' as ScoringTheme,
          impact: 35
        },
        {
          theme: 'psychological_safety' as ScoringTheme,
          impact: 30
        },
        {
          theme: 'engagement_continuity' as ScoringTheme,
          impact: 25
        }
      ],
      level: 'low'
    },
    {
      department: 'Sales',
      risk: 42,
      change: 8,
      factors: [
        {
          theme: 'trust_in_leadership' as ScoringTheme,
          impact: 45
        },
        {
          theme: 'mission_alignment' as ScoringTheme,
          impact: 35
        }
      ],
      level: 'medium'
    },
    {
      department: 'Customer Support',
      risk: 65,
      change: 12,
      factors: [
        {
          theme: 'motivation_fulfillment' as ScoringTheme,
          impact: 50
        },
        {
          theme: 'inclusion_belonging' as ScoringTheme,
          impact: 35
        }
      ],
      level: 'high'
    },
    {
      department: 'Marketing',
      risk: 38,
      change: -2,
      factors: [
        {
          theme: 'psychological_safety' as ScoringTheme,
          impact: 40
        },
        {
          theme: 'mission_alignment' as ScoringTheme,
          impact: 30
        }
      ],
      level: 'medium'
    },
    {
      department: 'Product',
      risk: 22,
      change: -8,
      factors: [
        {
          theme: 'inclusion_belonging' as ScoringTheme,
          impact: 25
        },
        {
          theme: 'trust_in_leadership' as ScoringTheme,
          impact: 20
        }
      ],
      level: 'low'
    }
  ];
};

// Generate mock engagement data
export const getEngagementData = () => {
  return {
    overall: 78,
    byDepartment: [
      { department: 'Engineering', score: 82, change: 5 },
      { department: 'Sales', score: 74, change: -3 },
      { department: 'Customer Support', score: 68, change: 2 },
      { department: 'Marketing', score: 80, change: 4 },
      { department: 'Product', score: 85, change: 7 }
    ],
    recommendations: [
      'Focus on improving motivation in Customer Support',
      'Address leadership trust concerns in Sales',
      'Continue successful inclusion initiatives in Product'
    ]
  };
};

// Generate retention data
export const getRetentionData = () => {
  return {
    overall: 83,
    predictedTurnover: 12,
    highRiskCount: 8,
    riskFactors: [
      { factor: 'Work-life balance', impact: 42 },
      { factor: 'Career growth', impact: 38 },
      { factor: 'Management quality', impact: 35 },
      { factor: 'Compensation', impact: 30 },
      { factor: 'Team dynamics', impact: 25 }
    ],
    recommendations: [
      'Review work-life balance policies',
      'Implement clearer career progression paths',
      'Provide additional management training'
    ]
  };
};
