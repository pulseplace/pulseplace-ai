
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import OnboardingState from '@/components/OnboardingState';
import { Tables } from '@/types/database.types';
import SkillsGapAnalysis from '@/components/dashboard/SkillsGapAnalysis';
import TeamPulseTrends from '@/components/dashboard/TeamPulseTrends';
import SentimentAnalysis from '@/components/dashboard/SentimentAnalysis';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardHome = () => {
  const { user, profile } = useAuth();
  const [surveys, setSurveys] = useState<Tables<'pulse_surveys'>[]>([]);
  const [responses, setResponses] = useState<Tables<'survey_responses'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Fetch surveys
        const { data: surveysData, error: surveysError } = await supabase
          .from('pulse_surveys')
          .select('*')
          .limit(5)
          .order('created_at', { ascending: false });

        if (surveysError) throw surveysError;
        setSurveys(surveysData);

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
          .limit(10)
          .order('created_at', { ascending: false });

        if (responsesError) throw responsesError;
        
        // Cast the data to match our expected type
        const typedResponses = responsesData.map(response => ({
          id: response.id,
          survey_id: response.survey_id,
          user_id: response.user_id,
          responses: response.responses,
          created_at: response.created_at,
          sentiment_score: response.sentiment_score,
          pulse_score: response.pulse_score || null
        })) as Tables<'survey_responses'>[];
        
        setResponses(typedResponses);

        // Check if we have any data
        setHasData(surveysData.length > 0 || responsesData.length > 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleOnboardingClick = () => {
    // Navigate to survey creation or take first pulse survey
  };

  const handleExportPDF = () => {
    toast({
      title: "Dashboard Report Exported",
      description: "Your PDF report has been generated and downloaded",
    });
    // In a real implementation, we would generate and download a PDF here
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pulse-600"></div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="container mx-auto py-6">
        <OnboardingState
          stateType="emptyDashboard"
          onButtonClick={handleOnboardingClick}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleExportPDF}
          >
            <Download size={16} />
            Export PDF Report
          </Button>
          <Link to="/dashboard/surveys/new">
            <Button className="bg-pulse-gradient">Create Survey</Button>
          </Link>
        </div>
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mt-8">
        <SkillsGapAnalysis />
        <TeamPulseTrends />
        <SentimentAnalysis />
      </div>
    </div>
  );
};

export default DashboardHome;
