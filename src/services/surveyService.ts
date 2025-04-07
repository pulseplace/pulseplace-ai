
import { supabase } from '@/integrations/supabase/client';
import { SurveyQuestion, SurveyResponse, PulseScoreData } from '@/types/scoring.types';
import { calculatePulseScore } from '@/utils/scoring';
import { Tables, Insertables } from '@/types/database.types';

export interface CreateSurveyParams {
  title: string;
  description?: string;
  department?: string;
}

export interface SubmitResponseParams {
  surveyId: string;
  responses: Record<string, any>;
  textResponses?: Record<string, string>;
}

export const createSurvey = async (params: CreateSurveyParams): Promise<Tables<'pulse_surveys'>> => {
  const { data, error } = await supabase
    .from('pulse_surveys')
    .insert({
      title: params.title,
      description: params.description || null,
      department: params.department || null,
      is_active: true
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getSurveys = async (): Promise<Tables<'pulse_surveys'>[]> => {
  const { data, error } = await supabase
    .from('pulse_surveys')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getSurveyById = async (id: string): Promise<Tables<'pulse_surveys'>> => {
  const { data, error } = await supabase
    .from('pulse_surveys')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getSurveyResponses = async (surveyId: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from('survey_responses')
    .select(`
      id,
      user_id,
      responses,
      sentiment_score,
      pulse_score,
      created_at,
      profiles:profiles(
        first_name,
        last_name,
        company,
        department
      )
    `)
    .eq('survey_id', surveyId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const submitSurveyResponse = async (
  params: SubmitResponseParams
): Promise<Tables<'survey_responses'>> => {
  try {
    // 1. Format responses for storing
    const formattedResponses: Record<string, any> = {
      ...params.responses,
      ...(params.textResponses ? { textResponses: params.textResponses } : {})
    };

    // 2. Calculate PulseScore
    const questions = Object.keys(params.responses).map(id => ({
      id,
      value: params.responses[id]
    }));

    // 3. Calculate sentiment score (simplified for now)
    const sentimentScore = calculateSentimentScore(formattedResponses);

    // 4. Prepare data to insert
    const responseData: Insertables<'survey_responses'> = {
      survey_id: params.surveyId,
      responses: formattedResponses,
      sentiment_score: sentimentScore,
      pulse_score: calculateSamplePulseScore(sentimentScore)
    };

    // 5. Insert response
    const { data, error } = await supabase
      .from('survey_responses')
      .insert(responseData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting survey response:', error);
    throw error;
  }
};

// Helper function for sentiment score calculation
const calculateSentimentScore = (responses: Record<string, any>): number => {
  // Simplified calculation for now
  // In a real implementation, this would use NLP or more sophisticated analysis
  const likertResponses = Object.values(responses).filter(value => 
    typeof value === 'number' && value >= 1 && value <= 5
  );
  
  if (likertResponses.length === 0) return 0.5;
  
  // Calculate average and normalize to 0-1 scale
  const average = likertResponses.reduce((sum, value) => sum + value, 0) / likertResponses.length;
  return (average - 1) / 4; // Normalize from 1-5 to 0-1
};

// Simplified PulseScore calculation for now
const calculateSamplePulseScore = (sentimentScore: number): any => {
  // This is a placeholder that returns a sample PulseScore
  // In production, we would use the actual scoring algorithm
  const score = Math.round(sentimentScore * 100);
  
  return {
    overallScore: score,
    categoryScores: [
      { category: "emotion_index", score: score + 5, weight: 0.4 },
      { category: "engagement_stability", score: score - 3, weight: 0.3 },
      { category: "culture_trust", score: score + 2, weight: 0.3 }
    ],
    tier: score >= 85 ? 'pulse_certified' : 
          score >= 70 ? 'emerging_culture' :
          score >= 50 ? 'at_risk' : 'intervention_advised',
    insights: [
      `Overall sentiment score is ${score}/100`,
      "Areas of improvement include communication and career growth"
    ],
    recommendedActions: [
      "Implement regular team feedback sessions",
      "Develop clearer career progression pathways"
    ]
  };
};

export const toggleSurveyStatus = async (id: string, isActive: boolean): Promise<void> => {
  const { error } = await supabase
    .from('pulse_surveys')
    .update({ is_active: isActive })
    .eq('id', id);

  if (error) throw error;
};
