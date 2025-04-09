
import { DateRangeFilter } from '@/components/ui/date-range-picker';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  surveyStatus: 'completed' | 'pending' | 'not_sent';
  lastActive: string;
}

export interface SummaryStats {
  participationRate: number;
  averageScore: number;
  completedSurveys: number;
  pendingSurveys: number;
  themeScores: {
    theme: string;
    score: number;
  }[];
}

export interface ProcessedSurveyResponse {
  overallScore: number;
  themeScores: {
    theme: string;
    score: number;
  }[];
  sentimentScore?: number;
  insights?: {
    summary: string;
    strengths: string[];
    opportunities: string[];
    actionItems: string[];
  };
}
