
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SurveyQuestion {
  id: string;
  text: string;
  type: 'likert' | 'text' | 'emoji';
  theme: string;
  weight: number;
}

export const useSurveyQuestions = () => {
  return useQuery({
    queryKey: ['surveyQuestions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pulse_survey_questions')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as SurveyQuestion[];
    }
  });
};
