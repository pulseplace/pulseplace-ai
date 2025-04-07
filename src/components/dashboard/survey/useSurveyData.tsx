
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/types/database.types';
import { toast } from 'sonner';

interface ResponseWithUser {
  id: string;
  user_id: string;
  responses: any;
  sentiment_score: number | null;
  created_at: string;
  user: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export const useSurveyData = (surveyId: string, userId: string | undefined) => {
  const [survey, setSurvey] = useState<Tables<'pulse_surveys'> | null>(null);
  const [responses, setResponses] = useState<ResponseWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      if (!userId) return;

      try {
        // Fetch the survey
        const { data: surveyData, error: surveyError } = await supabase
          .from('pulse_surveys')
          .select('*')
          .eq('id', surveyId)
          .single();

        if (surveyError) throw surveyError;
        setSurvey(surveyData);

        // Fetch responses with user profiles
        const { data: responsesData, error: responsesError } = await supabase
          .from('survey_responses')
          .select(`
            id,
            user_id,
            responses,
            sentiment_score,
            created_at,
            profiles:profiles(
              first_name,
              last_name
            )
          `)
          .eq('survey_id', surveyId)
          .order('created_at', { ascending: false });

        if (responsesError) throw responsesError;

        // Format the responses data
        const formattedResponses: ResponseWithUser[] = responsesData.map(response => {
          return {
            id: response.id,
            user_id: response.user_id || "",
            responses: response.responses,
            sentiment_score: response.sentiment_score,
            created_at: response.created_at,
            user: response.profiles && response.profiles.length > 0 ? {
              first_name: response.profiles[0].first_name,
              last_name: response.profiles[0].last_name
            } : null
          };
        });

        setResponses(formattedResponses);
      } catch (error: any) {
        console.error('Error fetching survey details:', error);
        setError(error.message || 'Failed to load survey details');
        toast.error('Failed to load survey details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyDetails();
  }, [surveyId, userId]);

  return {
    survey,
    setSurvey,
    responses,
    isLoading,
    error
  };
};
