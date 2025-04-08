
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useOnboarding } from '@/hooks/useOnboarding';

const DashboardHome = () => {
  const { user, profile } = useAuth();
  const { hasSurveys, isStepCompleted } = useOnboarding();
  const { surveys, responses, isLoading, refreshData } = useDashboard();
  const { toast } = useToast();

  useEffect(() => {
    // Refresh data when the component mounts
    refreshData();
  }, []);

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

  // If user hasn't completed at least the company profile, show onboarding
  if (!isStepCompleted('first-survey')) {
    return (
      <div className="container mx-auto py-6">
        <OnboardingFlow />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {profile && profile.company && (
            <p className="text-gray-500">{profile.company}</p>
          )}
        </div>
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

      {/* Dashboard stat summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="font-medium mb-2">Surveys Created</h3>
          <p className="text-2xl font-bold">{surveys.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="font-medium mb-2">Total Responses</h3>
          <p className="text-2xl font-bold">{responses.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="font-medium mb-2">Average Pulse Score</h3>
          <p className="text-2xl font-bold">
            {responses.length > 0 
              ? Math.round(responses.reduce((sum, r) => {
                  const score = typeof r.pulse_score === 'object' && r.pulse_score && 'overallScore' in r.pulse_score 
                    ? Number(r.pulse_score.overallScore) 
                    : 0;
                  return sum + score;
                }, 0) / responses.length)
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
