
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { teamAdminService, TeamMember } from '@/services/teamAdminService';
import { insightsService } from '@/services/insightsService';
import { DateRangeFilter } from '@/components/ui/date-range-picker';

export interface TeamAdminData {
  teamMembers: TeamMember[];
  summaryStats: {
    participationRate: number;
    averageScore: number;
    completedSurveys: number;
    pendingSurveys: number;
    themeScores: { theme: string; score: number }[];
  };
  insights: any;
}

export interface TeamAdminFilters {
  department: string;
  pulseTheme: string;
  dateRange: DateRangeFilter;
}

export function useTeamAdminData() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TeamAdminData>({
    teamMembers: [],
    summaryStats: {
      participationRate: 0,
      averageScore: 0,
      completedSurveys: 0,
      pendingSurveys: 0,
      themeScores: [
        { theme: "Trust & Safety", score: 0 },
        { theme: "Engagement", score: 0 },
        { theme: "Culture", score: 0 },
        { theme: "Growth & Development", score: 0 },
        { theme: "Wellbeing", score: 0 },
      ]
    },
    insights: null,
  });
  
  const [filters, setFilters] = useState<TeamAdminFilters>({
    department: 'All Departments',
    pulseTheme: 'All Themes',
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date()
    }
  });

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch team members from Supabase
      const members = await teamAdminService.getTeamMembers(filters.department);
      
      // Fetch summary stats
      const stats = await teamAdminService.getSummaryStats(
        filters.department, 
        filters.pulseTheme, 
        filters.dateRange
      );
      
      try {
        if (!data.insights) {
          const generatedInsights = await insightsService.generateTestInsight();
          setData(prev => ({ ...prev, insights: generatedInsights }));
        }
      } catch (insightError) {
        console.error("Failed to generate insights:", insightError);
      }
      
      setData(prev => ({
        ...prev,
        teamMembers: members,
        summaryStats: stats
      }));
      
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      await loadDashboardData();
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated with current filters",
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleGenerateInsights = async () => {
    try {
      const generatedInsights = await insightsService.generateTestInsight();
      setData(prev => ({ ...prev, insights: generatedInsights }));
    } catch (error) {
      console.error("Failed to generate insights:", error);
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  return {
    data,
    filters,
    setFilters,
    isLoading,
    isRefreshing,
    error,
    refreshData: handleRefreshData,
    generateInsights: handleGenerateInsights,
    loadDashboardData
  };
}
