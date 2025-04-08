
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/types/database.types';
import { toast } from 'sonner';

interface DashboardContextType {
  surveys: Tables<'pulse_surveys'>[];
  responses: any[]; // Using any for flexibility with response data
  stats: {
    pulseScore: number;
    responseRate: number;
    employeesEngaged: number;
    insightsGenerated: number;
  };
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState<Tables<'pulse_surveys'>[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    pulseScore: 0,
    responseRate: 0,
    employeesEngaged: 0,
    insightsGenerated: 0
  });

  const fetchDashboardData = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch surveys
      const { data: surveysData, error: surveysError } = await supabase
        .from('pulse_surveys')
        .select('*')
        .order('created_at', { ascending: false });

      if (surveysError) throw surveysError;
      setSurveys(surveysData || []);

      // Fetch responses
      const { data: responsesData, error: responsesError } = await supabase
        .from('survey_responses')
        .select(`
          id,
          survey_id,
          user_id,
          responses,
          created_at,
          sentiment_score,
          pulse_score,
          pulse_surveys (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (responsesError) throw responsesError;
      setResponses(responsesData || []);

      // Calculate stats
      let totalPulseScore = 0;
      let scoreCount = 0;

      responsesData?.forEach(response => {
        if (response.pulse_score && response.pulse_score.overallScore) {
          totalPulseScore += response.pulse_score.overallScore;
          scoreCount++;
        }
      });

      setStats({
        pulseScore: scoreCount > 0 ? Math.round(totalPulseScore / scoreCount) : 0,
        responseRate: calculateResponseRate(surveysData, responsesData),
        employeesEngaged: new Set(responsesData?.map(r => r.user_id) || []).size,
        insightsGenerated: Math.min(responsesData?.length * 2 || 0, 30) // Mock value for insights
      });
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate response rate (mock calculation for demo)
  const calculateResponseRate = (surveys: any[], responses: any[]) => {
    if (!surveys || surveys.length === 0) return 0;
    
    // In a real app, you would count actual invitations sent
    const estimatedInvitations = surveys.length * 10; // Assume 10 invitations per survey
    const actualResponses = responses?.length || 0;
    
    return Math.min(Math.round((actualResponses / Math.max(estimatedInvitations, 1)) * 100), 100);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const value = {
    surveys,
    responses,
    stats,
    isLoading,
    error,
    refreshData: fetchDashboardData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
