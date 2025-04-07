
import { ScoringTheme, ThemeScore } from '@/types/scoring.types';

export interface ThemeFrequency {
  theme: ScoringTheme;
  count: number;
  percentage: number;
  sentiment: number;
}

export interface ThemeTrend {
  theme: ScoringTheme;
  previousScore: number;
  currentScore: number;
  change: number;
  direction: 'up' | 'down' | 'stable';
}

export interface AttritionRisk {
  department: string;
  risk: number;
  change: number;
  factors: {
    theme: ScoringTheme;
    impact: number;
  }[];
  level: 'low' | 'medium' | 'high';
}

/**
 * Analyze theme frequency from text responses
 */
export const analyzeThemeFrequency = (responses: Record<string, any>[]): ThemeFrequency[] => {
  // This is a placeholder implementation
  // In a real app, this would use NLP/AI to identify themes in text responses
  
  const themes: Record<ScoringTheme, { count: number; sentiment: number }> = {
    trust_in_leadership: { count: 0, sentiment: 0 },
    psychological_safety: { count: 0, sentiment: 0 },
    inclusion_belonging: { count: 0, sentiment: 0 },
    motivation_fulfillment: { count: 0, sentiment: 0 },
    mission_alignment: { count: 0, sentiment: 0 },
    engagement_continuity: { count: 0, sentiment: 0 }
  };
  
  // Count occurrences and sum sentiment for each theme
  responses.forEach(response => {
    if (typeof response.textResponses === 'object') {
      Object.entries(response.textResponses).forEach(([_, text]) => {
        if (typeof text !== 'string') return;
        
        // Simple keyword matching (this would be more sophisticated in a real implementation)
        if (text.toLowerCase().includes('leader') || text.toLowerCase().includes('manager')) {
          themes.trust_in_leadership.count++;
          themes.trust_in_leadership.sentiment += 0.7; // Placeholder sentiment score
        }
        
        if (text.toLowerCase().includes('safe') || text.toLowerCase().includes('speak up')) {
          themes.psychological_safety.count++;
          themes.psychological_safety.sentiment += 0.6;
        }
        
        if (text.toLowerCase().includes('belong') || text.toLowerCase().includes('inclusion')) {
          themes.inclusion_belonging.count++;
          themes.inclusion_belonging.sentiment += 0.8;
        }
        
        if (text.toLowerCase().includes('motivat') || text.toLowerCase().includes('fulfill')) {
          themes.motivation_fulfillment.count++;
          themes.motivation_fulfillment.sentiment += 0.75;
        }
        
        if (text.toLowerCase().includes('mission') || text.toLowerCase().includes('purpose')) {
          themes.mission_alignment.count++;
          themes.mission_alignment.sentiment += 0.65;
        }
        
        if (text.toLowerCase().includes('stay') || text.toLowerCase().includes('leave')) {
          themes.engagement_continuity.count++;
          themes.engagement_continuity.sentiment += 0.5;
        }
      });
    }
  });
  
  // Calculate total count for percentage calculation
  const totalMentions = Object.values(themes).reduce((sum, { count }) => sum + count, 0);
  
  // Format the results
  return Object.entries(themes).map(([theme, { count, sentiment }]) => ({
    theme: theme as ScoringTheme,
    count,
    percentage: totalMentions > 0 ? (count / totalMentions) * 100 : 0,
    sentiment: count > 0 ? sentiment / count : 0
  }));
};

/**
 * Calculate trend between current and previous scores
 */
export const calculateThemeTrends = (
  currentScores: ThemeScore[], 
  previousScores: ThemeScore[]
): ThemeTrend[] => {
  return currentScores.map(currentTheme => {
    const previousTheme = previousScores.find(t => t.theme === currentTheme.theme);
    const previousScore = previousTheme ? previousTheme.score : currentTheme.score;
    const change = currentTheme.score - previousScore;
    
    return {
      theme: currentTheme.theme,
      previousScore,
      currentScore: currentTheme.score,
      change,
      direction: change > 1 ? 'up' : change < -1 ? 'down' : 'stable'
    };
  });
};

/**
 * Calculate attrition risk by department
 */
export const calculateAttritionRisk = (
  departmentScores: Record<string, ThemeScore[]>
): AttritionRisk[] => {
  // This is a simplified model - a real implementation would use more factors and ML
  return Object.entries(departmentScores).map(([department, scores]) => {
    // Calculate weighted risk factors
    const factors = scores.map(score => ({
      theme: score.theme,
      impact: calculateThemeImpactOnAttrition(score.theme, score.score)
    })).sort((a, b) => b.impact - a.impact);
    
    // Overall risk calculation (lower scores = higher risk)
    const baseRisk = 100 - scores.reduce((sum, score) => {
      return sum + (score.score * getThemeWeightForAttrition(score.theme));
    }, 0) / scores.length;
    
    // Normalize to 0-100 scale
    const normalizedRisk = Math.min(Math.max(baseRisk / 3, 0), 100);
    
    // Determine risk level
    let level: 'low' | 'medium' | 'high';
    if (normalizedRisk > 25) level = 'high';
    else if (normalizedRisk > 15) level = 'medium';
    else level = 'low';
    
    // Simulated change from previous period
    const change = Math.round((Math.random() * 20) - 10);
    
    return {
      department,
      risk: Math.round(normalizedRisk),
      change,
      factors,
      level
    };
  });
};

/**
 * Calculate theme impact on attrition
 */
const calculateThemeImpactOnAttrition = (theme: ScoringTheme, score: number): number => {
  const weight = getThemeWeightForAttrition(theme);
  // Lower scores have more impact on attrition risk
  return weight * (100 - score) / 100;
};

/**
 * Get theme weight for attrition calculation
 */
const getThemeWeightForAttrition = (theme: ScoringTheme): number => {
  // These weights determine which themes are most predictive of attrition
  switch (theme) {
    case 'engagement_continuity':
      return 1.5; // Strongest predictor
    case 'motivation_fulfillment':
      return 1.3;
    case 'trust_in_leadership':
      return 1.2;
    case 'psychological_safety':
      return 1.0;
    case 'inclusion_belonging':
      return 0.9;
    case 'mission_alignment':
      return 0.8; // Weakest predictor
    default:
      return 1.0;
  }
};

/**
 * Generate AI insights from theme analysis
 */
export const generateThemeInsights = (
  themeFrequencies: ThemeFrequency[],
  themeTrends: ThemeTrend[]
): string[] => {
  const insights: string[] = [];
  
  // Most mentioned theme
  const mostMentioned = [...themeFrequencies].sort((a, b) => b.percentage - a.percentage)[0];
  insights.push(`${formatThemeName(mostMentioned.theme)} is the most frequently mentioned theme (${Math.round(mostMentioned.percentage)}% of responses).`);
  
  // Biggest improvement
  const biggestImprovement = [...themeTrends].sort((a, b) => b.change - a.change)[0];
  if (biggestImprovement.change > 0) {
    insights.push(`${formatThemeName(biggestImprovement.theme)} shows the largest improvement (+${Math.round(biggestImprovement.change)} points).`);
  }
  
  // Biggest decline
  const biggestDecline = [...themeTrends].sort((a, b) => a.change - b.change)[0];
  if (biggestDecline.change < 0) {
    insights.push(`${formatThemeName(biggestDecline.theme)} shows the largest decline (${Math.round(biggestDecline.change)} points).`);
  }
  
  // Sentiment insights
  const highestSentiment = [...themeFrequencies].sort((a, b) => b.sentiment - a.sentiment)[0];
  insights.push(`${formatThemeName(highestSentiment.theme)} receives the most positive sentiment in comments.`);
  
  return insights;
};

/**
 * Format theme name for display
 */
export const formatThemeName = (theme: ScoringTheme): string => {
  return theme
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
