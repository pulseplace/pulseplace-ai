
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/types/database.types';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

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
  
  // Fetch survey using React Query
  const {
    data: surveyData,
    isLoading: isSurveyLoading,
    error: surveyError
  } = useQuery({
    queryKey: ['survey', surveyId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('pulse_surveys')
        .select('*')
        .eq('id', surveyId)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!userId && !!surveyId
  });
  
  // Fetch responses using React Query
  const {
    data: responsesData,
    isLoading: isResponsesLoading,
    error: responsesError
  } = useQuery({
    queryKey: ['survey-responses', surveyId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
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
        
      if (error) throw error;
      
      // Format the responses data
      const formattedResponses: ResponseWithUser[] = data.map(response => {
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
      
      return formattedResponses;
    },
    enabled: !!userId && !!surveyId
  });
  
  // Update local state when data changes
  useEffect(() => {
    if (surveyData) {
      setSurvey(surveyData);
    }
  }, [surveyData]);
  
  // Error handling
  useEffect(() => {
    if (surveyError) {
      console.error('Error fetching survey:', surveyError);
      toast.error('Failed to load survey details');
    }
    
    if (responsesError) {
      console.error('Error fetching responses:', responsesError);
      toast.error('Failed to load survey responses');
    }
  }, [surveyError, responsesError]);
  
  const isLoading = isSurveyLoading || isResponsesLoading;
  const error = surveyError || responsesError;

  return {
    survey,
    setSurvey,
    responses: responsesData || [],
    isLoading,
    error: error ? (error as Error).message : null
  };
};
