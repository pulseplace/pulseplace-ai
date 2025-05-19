
import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';

interface ResponseWithPulseScore {
  id: string;
  surveyId?: string;
  survey_id?: string;
  pulse_score?: {
    overallScore: number;
  };
  [key: string]: any;
}

export const useDashboardData = (userId: string | undefined) => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [responses, setResponses] = useState<ResponseWithPulseScore[]>([]);
  const [stats, setStats] = useState<any>({
    pulseScore: 0,
    responseRate: 0,
    participationRate: 0,
    completionRate: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data function
  const fetchData = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch surveys
      const surveysQuery = query(
        collection(db, 'surveys'),
        where('userId', '==', userId)
      );
      const surveysSnapshot = await getDocs(surveysQuery);
      const surveysData = surveysSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSurveys(surveysData);

      // Fetch responses
      const responsesQuery = query(
        collection(db, 'responses'),
        where('userId', '==', userId)
      );
      const responsesSnapshot = await getDocs(responsesQuery);
      const responsesData = responsesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResponseWithPulseScore[];
      setResponses(responsesData);

      // Calculate statistics
      // Safely calculate pulse scores, handling cases where pulse_score may not exist
      const pulseScores = responsesData
        .filter(r => r.pulse_score && typeof r.pulse_score.overallScore === 'number')
        .map(r => r.pulse_score.overallScore);

      const avgPulseScore = pulseScores.length > 0
        ? Math.round(pulseScores.reduce((a, b) => a + b, 0) / pulseScores.length)
        : 0;

      setStats({
        pulseScore: avgPulseScore,
        responseRate: surveysData.length > 0 ? Math.round((responsesData.length / surveysData.length) * 100) : 0,
        participationRate: 76, // Mock value, would be calculated from actual user data
        completionRate: 92, // Mock value, would be calculated from actual user data
      });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
      
      // Use mock data as fallback
      setSurveys([
        { id: 'mock1', name: 'Employee Engagement 2025', date: new Date().toISOString() },
        { id: 'mock2', name: 'Leadership Assessment', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() }
      ]);
      
      setResponses([
        { 
          id: 'resp1', 
          surveyId: 'mock1', 
          pulse_score: { overallScore: 78 } 
        },
        { 
          id: 'resp2', 
          surveyId: 'mock2', 
          pulse_score: { overallScore: 82 } 
        }
      ]);
      
      setStats({
        pulseScore: 80,
        responseRate: 68,
        participationRate: 76,
        completionRate: 92
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Force refresh function for manual refresh
  const forceRefresh = () => {
    fetchData();
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh data function
  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    surveys,
    responses,
    stats,
    isLoading,
    error,
    refreshData,
    forceRefresh
  };
};
