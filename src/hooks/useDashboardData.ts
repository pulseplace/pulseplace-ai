
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { toast } from 'sonner';
import { calculateDashboardStats, generateDemoData } from '@/utils/dashboardUtils';

export const useDashboardData = (userId: string | undefined) => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    pulseScore: 0,
    responseRate: 0,
    employeesEngaged: 0,
    insightsGenerated: 0
  });
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Force refresh function for manual retries
  const forceRefresh = () => {
    console.log('Force refresh triggered');
    setRefreshCounter(prev => prev + 1);
  };

  const fetchDashboardData = async () => {
    if (!userId) {
      console.log('No user, setting isLoading to false');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching dashboard data...');
      
      // Fetch surveys
      const surveysQuery = query(
        collection(db, 'pulse_surveys'),
        where('created_by', '==', userId),
        orderBy('created_at', 'desc')
      );
      
      const surveysSnapshot = await getDocs(surveysQuery);
      const surveysData = surveysSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Surveys data fetched:', surveysData?.length || 0, 'surveys');
      setSurveys(surveysData || []);

      // Fetch responses
      let responsesData: any[] = [];
      // Collect response data for each survey
      for (const survey of surveysData) {
        const responsesQuery = query(
          collection(db, 'survey_responses'),
          where('survey_id', '==', survey.id),
          orderBy('created_at', 'desc')
        );
        
        const responsesSnapshot = await getDocs(responsesQuery);
        const surveyResponses = responsesSnapshot.docs.map(doc => ({
          id: doc.id,
          survey_id: survey.id,
          ...doc.data(),
          pulse_surveys: {
            title: survey.title
          }
        }));
        
        responsesData = [...responsesData, ...surveyResponses];
      }

      console.log('Responses data fetched:', responsesData?.length || 0, 'responses');
      setResponses(responsesData || []);

      // Calculate and set stats
      const calculatedStats = calculateDashboardStats(surveysData, responsesData);
      
      console.log('Stats calculated:', calculatedStats);
      setStats(calculatedStats);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      
      // Use demo data if error occurs
      const { surveys: demoSurveys, stats: demoStats } = generateDemoData(userId);
      setSurveys(demoSurveys);
      setStats(demoStats);
      
      toast.error('Failed to load dashboard data - displaying demo data');
    } finally {
      console.log('Finished fetching dashboard data, setting isLoading to false');
      setIsLoading(false);
    }
  };

  // Initialize data when user changes or refresh counter changes
  useEffect(() => {
    console.log('User or refresh counter changed, fetching dashboard data...');
    if (userId) {
      fetchDashboardData();
    } else {
      // If no user, don't try to fetch data but make sure we're not in loading state
      setIsLoading(false);
    }
  }, [userId, refreshCounter]);

  return {
    surveys,
    responses,
    stats,
    isLoading,
    error,
    refreshData: fetchDashboardData,
    forceRefresh
  };
};
