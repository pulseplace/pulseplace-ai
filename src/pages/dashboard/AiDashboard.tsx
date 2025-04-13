
import React from 'react';
import MetaTags from '@/components/MetaTags';
import DashboardUI from '@/components/dashboard/DashboardUI';
import { DashboardProvider } from '@/contexts/DashboardContext';

const AiDashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="container mx-auto p-6">
        <MetaTags
          title="AI Dashboard | PulsePlace.ai"
          description="Advanced AI-powered analytics dashboard for workplace culture insights"
        />
        
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">AI Dashboard</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <p className="text-lg mb-4">
              Welcome to your AI-powered dashboard. Monitor culture metrics, track engagement, 
              and discover actionable insights.
            </p>
            <p className="mb-4">
              This dashboard leverages advanced AI to help you understand and improve your workplace culture.
            </p>
          </div>
          
          <DashboardUI />
        </div>
      </div>
    </DashboardProvider>
  );
};

export default AiDashboard;
