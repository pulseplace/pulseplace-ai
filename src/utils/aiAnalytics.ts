// Expand the existing aiAnalytics.ts file with additional AI processing functionality

import { SentimentAnalysis, AIInsight, PredictiveFlag } from '@/types/scoring.types';

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

/**
 * Process PulseBot queries using AI
 */
export const processPulseBotQuery = (query: string, contextData: any) => {
  // This is a simplified mock implementation
  // In a real production app, this would connect to an LLM API
  
  console.log('Processing PulseBot query:', query);
  console.log('With context data:', contextData);
  
  // Simple keyword matching for demo purposes
  let response = '';
  let suggestedFollowups: string[] = [];
  
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('top') && lowerQuery.includes('department')) {
    response = `Based on recent survey data, your top performing departments are:
1. HR (85 points)
2. Engineering (82 points)
3. Marketing (78 points)

The HR department shows particularly strong scores in inclusion and psychological safety.`;
    
    suggestedFollowups = [
      "What's driving HR's high scores?",
      "Which department needs the most improvement?",
      "What themes are common across all departments?"
    ];
  } 
  else if (lowerQuery.includes('theme') || lowerQuery.includes('feedback')) {
    response = `The key themes emerging from recent feedback are:

1. Work-life balance (72% positive sentiment)
2. Communication from leadership (64% positive)
3. Career development opportunities (45% positive - area for improvement)

Would you like a deeper analysis on any of these themes?`;
    
    suggestedFollowups = [
      "Tell me more about career development concerns",
      "What specific feedback is there about leadership?",
      "How does our work-life balance compare to benchmarks?"
    ];
  }
  else if (lowerQuery.includes('focus') || lowerQuery.includes('improve')) {
    response = `Based on AI analysis of your culture data, I recommend focusing improvement efforts on:

1. Career Development: Create clearer growth paths, especially for technical roles
2. Cross-Team Communication: Implement structured knowledge sharing between departments
3. Recognition Programs: Your recognition scores are 15% below industry benchmarks

Would you like specific action items for any of these areas?`;
    
    suggestedFollowups = [
      "Generate action plan for career development",
      "How can we improve recognition programs?",
      "Which department has the biggest communication challenges?"
    ];
  }
  else if (lowerQuery.includes('work-life') || lowerQuery.includes('balance')) {
    response = `Your work-life balance metrics compared to industry benchmarks:

Overall Score: 65/100 (Industry avg: 60/100)
Key Insights:
- Flexible work policies are appreciated (mentioned in 78% of positive comments)
- Meeting culture needs improvement (42% of employees report too many meetings)
- After-hours communication expectations vary by department

Engineering and Sales teams report the lowest work-life balance scores.`;
    
    suggestedFollowups = [
      "What's causing low work-life balance in Engineering?",
      "Show me best practices for improving meeting culture",
      "How does our flexible work policy compare to competitors?"
    ];
  }
  else if (lowerQuery.includes('turnover') || lowerQuery.includes('retention')) {
    response = `Analysis of turnover risk in Customer Support:

Current Attrition Risk: Medium-High (67/100)
Primary Factors:
1. Limited career advancement opportunities (mentioned by 72% of the team)
2. Workload concerns (average of 58 tickets per person daily vs. industry benchmark of 45)
3. Compensation satisfaction is 12% below company average

Recommended focus: create clear career paths within customer success.`;
    
    suggestedFollowups = [
      "Generate a retention plan for Customer Support",
      "Which other departments have high turnover risk?",
      "What's the benchmark for Customer Support compensation?"
    ];
  }
  else {
    response = `I'm here to help you understand your workplace culture data and provide actionable insights. 

I can help with:
- Analyzing department performance
- Identifying emerging themes from feedback
- Recommending focus areas for improvement
- Comparing metrics to industry benchmarks
- Assessing turnover risk factors

What specific aspect of your culture data would you like to explore?`;
    
    suggestedFollowups = [
      "What are our top performing departments?",
      "What themes are emerging from feedback?",
      "Where should we focus improvement efforts?",
      "How does our work-life balance compare to benchmarks?",
      "What's causing turnover risk in Customer Support?"
    ];
  }
  
  return {
    response,
    suggestedFollowups
  };
};

/**
 * Generate AI insights for a specific department
 */
export const generateDepartmentInsights = (department: string, metrics: any): AIInsight[] => {
  // This would connect to an LLM in production
  const insights: AIInsight[] = [
    {
      concernCategory: "Career Development",
      concernText: "Limited visibility into promotion criteria",
      severity: "medium",
      impactArea: `${department} Team Retention`,
      recommendedAction: "Create transparent career progression framework with clear milestones"
    },
    {
      concernCategory: "Work-Life Balance",
      concernText: "After-hours communication expectations",
      severity: department === "Sales" ? "high" : "medium",
      impactArea: "Employee Wellbeing",
      recommendedAction: "Implement team communication guidelines with designated offline hours"
    },
    {
      concernCategory: "Team Dynamics",
      concernText: "Siloed knowledge and information sharing",
      severity: "low",
      impactArea: "Cross-functional Collaboration",
      recommendedAction: "Schedule bi-weekly knowledge sharing sessions across related teams"
    }
  ];
  
  return insights;
};

/**
 * Generate predictive flags for potential cultural issues
 */
export const generatePredictiveFlags = (surveyData: any): PredictiveFlag[] => {
  // This would use a prediction model in production
  return [
    {
      department: "Engineering",
      issue: "Psychological safety concerns in team meetings",
      severity: "medium",
      predictedImpact: 65
    },
    {
      department: "Sales",
      issue: "Work-life balance deterioration due to end-of-quarter targets",
      severity: "high",
      predictedImpact: 80
    },
    {
      department: "Customer Success",
      issue: "Career growth perception gap with other departments",
      severity: "medium",
      predictedImpact: 70
    }
  ];
};

/**
 * Generate manager action summary with high-priority items
 */
export const generateManagerSummary = (manager: string, teamData: any): {
  focusAreas: string[];
  recentTrends: Array<{trend: string; direction: 'up' | 'down' | 'stable'}>;
  teamConcerns: string[];
} => {
  // Would be AI-powered in production
  return {
    focusAreas: [
      "Schedule 1:1s with team members expressing career development concerns",
      "Address meeting culture feedback by implementing no-meeting Fridays",
      "Follow up on cross-team collaboration friction with Product team"
    ],
    recentTrends: [
      {trend: "Team morale", direction: "up"},
      {trend: "Project clarity", direction: "down"},
      {trend: "Work-life satisfaction", direction: "stable"}
    ],
    teamConcerns: [
      "Unclear requirements from stakeholders",
      "Too many context-switching demands",
      "Limited visibility into company direction"
    ]
  };
};

/**
 * Calculate PulseScore with AI-enhanced weightings
 */
export const calculateEnhancedPulseScore = (
  metrics: any,
  benchmarks: any,
  participationRate: number
): {
  score: number;
  category_scores: Array<{name: string; score: number; benchmark: number}>;
  certification_eligible: boolean;
  certification_reasons: string[];
} => {
  // Would use actual metrics and ML models in production
  
  // Sample implementation
  const categoryScores = [
    {name: "Trust & Safety", score: 82, benchmark: 75},
    {name: "Team Dynamics", score: 78, benchmark: 72},
    {name: "Growth & Development", score: 65, benchmark: 70},
    {name: "Mission & Purpose", score: 85, benchmark: 68}
  ];
  
  // Calculate weighted score
  const weights = {
    "Trust & Safety": 1.5,
    "Team Dynamics": 1.2,
    "Growth & Development": 1.0,
    "Mission & Purpose": 1.3
  };
  
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  
  const weightedScore = categoryScores.reduce((sum, cat) => {
    const weight = weights[cat.name as keyof typeof weights] || 1.0;
    return sum + (cat.score * weight);
  }, 0) / totalWeight;
  
  // Adjust for participation rate
  const participationFactor = 0.8 + (0.2 * (participationRate / 100));
  
  // Calculate final score
  const finalScore = Math.round(weightedScore * participationFactor);
  
  // Determine certification eligibility
  const certificationEligible = finalScore >= 80;
  
  const certificationReasons = certificationEligible ? 
    [
      "Above-benchmark scores in 3 of 4 key culture dimensions",
      "High participation rate indicates valid representation",
      "Strong Trust & Safety scores indicate healthy foundation"
    ] : 
    [
      "Growth & Development scores below benchmark threshold",
      "Further improvement needed in career path clarity",
      "Consider implementing recommended focus areas before recertification"
    ];
  
  return {
    score: finalScore,
    category_scores: categoryScores,
    certification_eligible: certificationEligible,
    certification_reasons: certificationReasons
  };
};

/**
 * Generate sentiment summaries from open text responses
 */
export const generateSentimentSummaries = (responses: string[]): {
  positive_themes: string[];
  neutral_themes: string[];
  negative_themes: string[];
  highlight_quotes: string[];
} => {
  // This would use NLP/sentiment analysis in production
  
  return {
    positive_themes: [
      "Supportive team environment and collaboration",
      "Appreciation for flexible work policies",
      "Inclusive culture and belonging"
    ],
    neutral_themes: [
      "Office environment and facilities",
      "Company events and activities",
      "Internal communication processes"
    ],
    negative_themes: [
      "Workload and resource allocation",
      "Unclear career progression",
      "Meeting efficiency and frequency"
    ],
    highlight_quotes: [
      "The mentorship program has been transformative for my professional growth.",
      "I appreciate how my manager creates a psychologically safe environment for the team.",
      "While I love my team, I'm concerned about the lack of clear career paths.",
      "The cross-team collaboration has improved substantially since the new process was implemented."
    ]
  };
};
