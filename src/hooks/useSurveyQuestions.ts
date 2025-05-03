
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { SurveyQuestion } from '@/types/scoring.types';

export const useSurveyQuestions = () => {
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(db, 'pulse_survey_questions'),
          orderBy('createdAt', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const questionsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            type: data.type,
            theme: data.theme,
            weight: data.weight
          } as SurveyQuestion;
        });
        
        setQuestions(questionsData);
      } catch (err) {
        console.error('Error fetching survey questions:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch questions'));
        
        // Provide fallback questions for testing/demo purposes
        setQuestions([
          {
            id: '1',
            text: 'I feel my ideas are valued by my team',
            type: 'likert',
            theme: 'psychological_safety',
            weight: 1
          },
          {
            id: '2',
            text: 'I have opportunities to learn and grow at my company',
            type: 'likert',
            theme: 'growth_opportunity',
            weight: 1
          },
          {
            id: '3',
            text: 'My manager genuinely cares about my wellbeing',
            type: 'likert',
            theme: 'trust_in_leadership',
            weight: 1
          },
          {
            id: '4',
            text: 'I have a good work-life balance',
            type: 'likert',
            theme: 'work_life_balance',
            weight: 1
          },
          {
            id: '5',
            text: 'I feel included and respected in my workplace',
            type: 'likert',
            theme: 'inclusion_belonging',
            weight: 1
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return {
    data: questions,
    isLoading,
    error
  };
};
