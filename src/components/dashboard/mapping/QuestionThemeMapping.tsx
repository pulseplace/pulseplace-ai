
import React from 'react';
import { SurveyQuestion, SurveyTheme, ScoringCategory } from '@/types/scoring.types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Theme color mapping for UI
const themeColorMap: Record<SurveyTheme, { bg: string; text: string }> = {
  trust_in_leadership: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  psychological_safety: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
  inclusion_belonging: { bg: 'bg-amber-100', text: 'text-amber-800' },
  work_life_balance: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  growth_opportunity: { bg: 'bg-violet-100', text: 'text-violet-800' }
};

// Theme to scoring category mapping
const themeToCategoryMap: Record<SurveyTheme, ScoringCategory> = {
  trust_in_leadership: 'culture_trust',
  psychological_safety: 'culture_trust',
  inclusion_belonging: 'emotion_index',
  work_life_balance: 'engagement_stability',
  growth_opportunity: 'engagement_stability'
};

// Format theme name for display
const formatThemeName = (theme: string): string => {
  return theme
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

interface QuestionThemeMappingProps {
  question: SurveyQuestion;
  compact?: boolean;
}

const QuestionThemeMapping: React.FC<QuestionThemeMappingProps> = ({
  question,
  compact = false
}) => {
  // Ensure question theme is a valid SurveyTheme
  const theme = question.theme as SurveyTheme;
  const colorMap = themeColorMap[theme] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  const category = themeToCategoryMap[theme] || 'emotion_index';

  if (compact) {
    return (
      <Badge className={`${colorMap.bg} ${colorMap.text} font-normal`}>
        {formatThemeName(theme)}
      </Badge>
    );
  }

  return (
    <Card className="p-3">
      <div className="flex flex-col">
        <Badge className={`${colorMap.bg} ${colorMap.text} self-start mb-2`}>
          {formatThemeName(theme)}
        </Badge>
        <span className="text-sm text-gray-500">
          Contributes to <strong>{formatThemeName(category)}</strong> score
        </span>
      </div>
    </Card>
  );
};

export default QuestionThemeMapping;
