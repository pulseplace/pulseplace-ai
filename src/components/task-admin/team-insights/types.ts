
// Define the types for team insights with literal types for insight_type
export interface TeamInsight {
  team: string;
  insight_type: 'Culture Summary' | 'PulseScore Certification' | 'Risk Alert';
  ai_generated: boolean;
  content?: string;
  pulse_score?: number;
  certification_eligible?: boolean;
  summary?: string;
  risk_type?: string;
  engagement_drop_percent?: number;
  sentiment_drop?: string;
  recommendation?: string;
  updated_at?: string | Date; // Timestamp field
}

export interface TeamInsightsProps {
  insights: TeamInsight[];
}
