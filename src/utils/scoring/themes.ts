
import { SurveyResponse, ThemeScore, ScoringTheme } from '@/types/scoring.types';

// Helper function to calculate category scores from theme scores
export const calculateThemeScores = (response: SurveyResponse): ThemeScore[] => {
  // Group scores by theme
  const themeScores: Record<string, { total: number, count: number }> = {};
  
  // Process each response and accumulate theme scores
  Object.entries(response.responses).forEach(([questionId, value]) => {
    const questionInfo = response.questionMapping[questionId];
    
    if (questionInfo && typeof value === 'number') {
      const { theme, weight = 1 } = questionInfo;
      
      if (!themeScores[theme]) {
        themeScores[theme] = { total: 0, count: 0 };
      }
      
      themeScores[theme].total += value * weight;
      themeScores[theme].count += 1;
    }
  });
  
  // Convert to array of theme scores
  return Object.entries(themeScores).map(([theme, data]) => ({
    theme: theme as ScoringTheme,
    score: data.count > 0 ? Math.round((data.total / data.count) * 20) : 0, // Scale to 0-100
    count: data.count
  }));
};

// Get the display name for a theme
export const getThemeDisplayName = (theme: ScoringTheme): string => {
  const displayNames: Record<ScoringTheme, string> = {
    trust_in_leadership: 'Trust in Leadership',
    psychological_safety: 'Psychological Safety',
    inclusion_belonging: 'Inclusion & Belonging',
    motivation_fulfillment: 'Motivation & Fulfillment',
    mission_alignment: 'Mission Alignment',
    engagement_continuity: 'Engagement Continuity'
  };
  
  return displayNames[theme] || theme.replace(/_/g, ' ');
};

// Get color for theme visualization
export const getThemeColor = (theme: ScoringTheme): string => {
  const colorMap: Record<ScoringTheme, string> = {
    trust_in_leadership: '#3B82F6', // blue-500
    psychological_safety: '#10B981', // green-500
    inclusion_belonging: '#8B5CF6', // purple-500
    motivation_fulfillment: '#F59E0B', // amber-500
    mission_alignment: '#6366F1', // indigo-500
    engagement_continuity: '#EC4899'  // pink-500
  };
  
  return colorMap[theme] || '#6B7280'; // gray-500 as fallback
};

// Get a description for each theme
export const getThemeDescription = (theme: ScoringTheme): string => {
  const descriptions: Record<ScoringTheme, string> = {
    trust_in_leadership: 'Confidence that leaders make decisions in the best interest of the organization and its people.',
    psychological_safety: 'Feeling able to speak up, take risks, and make mistakes without fear of negative consequences.',
    inclusion_belonging: 'Sense of being valued, respected, and part of the team regardless of background or identity.',
    motivation_fulfillment: 'Intrinsic drive and satisfaction derived from work and accomplishments.',
    mission_alignment: 'Connection between individual work and the larger purpose of the organization.',
    engagement_continuity: 'Likelihood to remain committed and engaged with the organization over time.'
  };
  
  return descriptions[theme] || 'No description available.';
};
