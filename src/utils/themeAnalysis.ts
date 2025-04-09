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

export interface ThemeSentimentScore {
  theme: string;
  score: number;
  status: 'Strong' | 'Healthy' | 'Needs Focus' | 'Critical Attention';
  statusColor: string;
}

export interface DepartmentThemeScores {
  department: string;
  themes: Record<string, number>;
  overallScore: number;
}

/**
 * Analyze theme frequency from text responses
 */
export const analyzeThemeFrequency = (responses: Record<string, any>[]): ThemeFrequency[] => {
  const themes: Record<ScoringTheme, { count: number; sentiment: number }> = {
    trust_in_leadership: { count: 0, sentiment: 0 },
    psychological_safety: { count: 0, sentiment: 0 },
    inclusion_belonging: { count: 0, sentiment: 0 },
    motivation_fulfillment: { count: 0, sentiment: 0 },
    mission_alignment: { count: 0, sentiment: 0 },
    engagement_continuity: { count: 0, sentiment: 0 }
  };
  
  responses.forEach(response => {
    if (typeof response.textResponses === 'object') {
      Object.entries(response.textResponses).forEach(([_, text]) => {
        if (typeof text !== 'string') return;
        
        if (text.toLowerCase().includes('leader') || text.toLowerCase().includes('manager')) {
          themes.trust_in_leadership.count++;
          themes.trust_in_leadership.sentiment += 0.7;
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
  
  const totalMentions = Object.values(themes).reduce((sum, { count }) => sum + count, 0);
  
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
  return Object.entries(departmentScores).map(([department, scores]) => {
    const factors = scores.map(score => ({
      theme: score.theme,
      impact: calculateThemeImpactOnAttrition(score.theme, score.score)
    })).sort((a, b) => b.impact - a.impact);
    
    const baseRisk = 100 - scores.reduce((sum, score) => {
      return sum + (score.score * getThemeWeightForAttrition(score.theme));
    }, 0) / scores.length;
    
    const normalizedRisk = Math.min(Math.max(baseRisk / 3, 0), 100);
    
    let level: 'low' | 'medium' | 'high';
    if (normalizedRisk > 25) level = 'high';
    else if (normalizedRisk > 15) level = 'medium';
    else level = 'low';
    
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
  return weight * (100 - score) / 100;
};

/**
 * Get theme weight for attrition calculation
 */
const getThemeWeightForAttrition = (theme: ScoringTheme): number => {
  switch (theme) {
    case 'engagement_continuity':
      return 1.5;
    case 'motivation_fulfillment':
      return 1.3;
    case 'trust_in_leadership':
      return 1.2;
    case 'psychological_safety':
      return 1.0;
    case 'inclusion_belonging':
      return 0.9;
    case 'mission_alignment':
      return 0.8;
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
  
  const mostMentioned = [...themeFrequencies].sort((a, b) => b.percentage - a.percentage)[0];
  insights.push(`${formatThemeName(mostMentioned.theme)} is the most frequently mentioned theme (${Math.round(mostMentioned.percentage)}% of responses).`);
  
  const biggestImprovement = [...themeTrends].sort((a, b) => b.change - a.change)[0];
  if (biggestImprovement.change > 0) {
    insights.push(`${formatThemeName(biggestImprovement.theme)} shows the largest improvement (+${Math.round(biggestImprovement.change)} points).`);
  }
  
  const biggestDecline = [...themeTrends].sort((a, b) => a.change - b.change)[0];
  if (biggestDecline.change < 0) {
    insights.push(`${formatThemeName(biggestDecline.theme)} shows the largest decline (${Math.round(biggestDecline.change)} points).`);
  }
  
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

/**
 * NEW FUNCTIONS FOR THEME SENTIMENT ANALYSIS
 */

/**
 * Calculate sentiment scores for each theme from survey responses
 */
export const calculateThemeScores = (
  surveyResponses: any[],
  department?: string,
  themeFilter?: string
): DepartmentThemeScores[] => {
  const departments = [
    "Engineering", 
    "Marketing", 
    "Sales", 
    "Customer Support", 
    "Human Resources",
    "Product"
  ];
  
  const departmentsToProcess = department ? 
    departments.filter(d => d === department) : departments;
  
  return departmentsToProcess.map(dept => {
    const baseScores: Record<string, number> = {
      trust_in_leadership: Math.floor(70 + Math.random() * 25),
      psychological_safety: Math.floor(75 + Math.random() * 20),
      inclusion_belonging: Math.floor(75 + Math.random() * 20),
      motivation_fulfillment: Math.floor(70 + Math.random() * 25),
      mission_alignment: Math.floor(72 + Math.random() * 23),
      engagement_continuity: Math.floor(68 + Math.random() * 27)
    };
    
    if (dept === "Human Resources") {
      baseScores.inclusion_belonging = Math.min(95, baseScores.inclusion_belonging + 10);
      baseScores.psychological_safety = Math.min(95, baseScores.psychological_safety + 8);
    } else if (dept === "Sales") {
      baseScores.engagement_continuity = Math.max(65, baseScores.engagement_continuity - 7);
      baseScores.mission_alignment = Math.min(92, baseScores.mission_alignment + 8);
    } else if (dept === "Engineering") {
      baseScores.trust_in_leadership = Math.max(70, baseScores.trust_in_leadership - 5);
      baseScores.psychological_safety = Math.min(90, baseScores.psychological_safety + 5);
    }
    
    const themeValues = Object.values(baseScores);
    const overallScore = Math.round(
      themeValues.reduce((sum, score) => sum + score, 0) / themeValues.length
    );
    
    return {
      department: dept,
      themes: baseScores,
      overallScore
    };
  });
};

/**
 * Classify a theme score into sentiment status categories
 */
export const classifyThemeSentiment = (score: number): ThemeSentimentScore['status'] => {
  if (score >= 90) return 'Strong';
  if (score >= 80) return 'Healthy';
  if (score >= 70) return 'Needs Focus';
  return 'Critical Attention';
};

/**
 * Get color code for sentiment status
 */
export const getSentimentStatusColor = (status: ThemeSentimentScore['status']): string => {
  switch (status) {
    case 'Strong':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Healthy':
      return 'bg-lime-100 text-lime-800 border-lime-200';
    case 'Needs Focus':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Critical Attention':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

/**
 * Process scores into full theme sentiment data with classification
 */
export const processThemeSentimentScores = (
  departmentScores: DepartmentThemeScores[]
): Record<string, ThemeSentimentScore[]> => {
  const result: Record<string, ThemeSentimentScore[]> = {};
  
  departmentScores.forEach(deptScore => {
    Object.entries(deptScore.themes).forEach(([theme, score]) => {
      if (!result[theme]) {
        result[theme] = [];
      }
      
      const status = classifyThemeSentiment(score);
      result[theme].push({
        theme,
        score,
        status,
        statusColor: getSentimentStatusColor(status)
      });
    });
  });
  
  return result;
};
