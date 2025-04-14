
import React from 'react';
import MetaTags from '@/components/MetaTags';
import { Card, CardContent } from "@/components/ui/card";
import AdvancedAnalytics from '@/components/dashboard/AdvancedAnalytics';
import { DashboardProvider } from '@/contexts/DashboardContext';
import InsightsExportButton from '@/components/dashboard/InsightsExportButton';

const Insights: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="container mx-auto py-8 px-4">
        <MetaTags 
          title="Insights | PulsePlace.ai" 
          description="Advanced analytics and insights for your workplace culture data."
        />
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Culture Insights</h1>
              <p className="text-gray-600">
                Discover trends, patterns and actionable insights from your workplace culture data.
              </p>
            </div>
            
            <InsightsExportButton 
              exportTitle="Culture Insights"
              variant="outline"
            />
          </div>
          
          <AdvancedAnalytics />
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Insights;
