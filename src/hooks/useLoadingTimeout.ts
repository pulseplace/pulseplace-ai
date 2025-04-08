
import { useEffect } from 'react';
import { Tables } from '@/types/database.types';
import { generateDemoData } from '@/utils/dashboardUtils';

interface LoadingTimeoutProps {
  isLoading: boolean;
  surveys: Tables<'pulse_surveys'>[];
  setSurveys: (surveys: Tables<'pulse_surveys'>[]) => void;
  setResponses: (responses: any[]) => void;
  setStats: (stats: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  userId?: string;
}

export const useLoadingTimeout = ({
  isLoading,
  surveys,
  setSurveys,
  setResponses,
  setStats,
  setIsLoading,
  userId
}: LoadingTimeoutProps) => {
  // Add a timeout to prevent infinite loading state
  useEffect(() => {
    // If loading continues for more than 8 seconds, force it to stop loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log('Force ending loading state after timeout');
        setIsLoading(false);
        
        // Set some mock data for demo purposes
        if (surveys.length === 0) {
          const { surveys: demoSurveys, stats: demoStats } = generateDemoData(userId);
          setSurveys(demoSurveys);
          setResponses([]);
          setStats(demoStats);
        }
      }
    }, 8000); // 8 second timeout
    
    return () => clearTimeout(timeoutId);
  }, [isLoading, surveys.length, userId, setSurveys, setResponses, setStats, setIsLoading]);
};
