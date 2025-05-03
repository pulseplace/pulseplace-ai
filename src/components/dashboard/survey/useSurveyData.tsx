
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
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
  const [survey, setSurvey] = useState<any | null>(null);
  const [responses, setResponses] = useState<ResponseWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch survey data
  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!userId || !surveyId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch the survey
        const surveyDocRef = doc(db, 'pulse_surveys', surveyId);
        const surveySnapshot = await getDoc(surveyDocRef);
        
        if (surveySnapshot.exists()) {
          setSurvey({
            id: surveySnapshot.id,
            ...surveySnapshot.data()
          });
        } else {
          throw new Error('Survey not found');
        }
        
        // Fetch responses for the survey
        const responsesQuery = query(
          collection(db, 'survey_responses'),
          where('survey_id', '==', surveyId),
          orderBy('created_at', 'desc')
        );
        
        const responsesSnapshot = await getDocs(responsesQuery);
        
        const formattedResponses: ResponseWithUser[] = await Promise.all(
          responsesSnapshot.docs.map(async (responseDoc) => {
            const responseData = responseDoc.data();
            let userData = null;
            
            // Fetch user profile if user_id exists
            if (responseData.user_id) {
              try {
                const userDocRef = doc(db, 'profiles', responseData.user_id);
                const userSnapshot = await getDoc(userDocRef);
                
                if (userSnapshot.exists()) {
                  userData = {
                    first_name: userSnapshot.data().first_name,
                    last_name: userSnapshot.data().last_name
                  };
                }
              } catch (userError) {
                console.error('Error fetching user data:', userError);
              }
            }
            
            return {
              id: responseDoc.id,
              user_id: responseData.user_id || "",
              responses: responseData.responses,
              sentiment_score: responseData.sentiment_score,
              created_at: responseData.created_at,
              user: userData
            };
          })
        );
        
        setResponses(formattedResponses);
      } catch (err: any) {
        console.error('Error fetching survey data:', err);
        setError(err.message || 'Failed to load survey data');
        toast.error('Failed to load survey details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSurveyData();
  }, [surveyId, userId]);
  
  return {
    survey,
    setSurvey,
    responses,
    isLoading,
    error
  };
};
