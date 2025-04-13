
import React from 'react';
import MetaTags from '@/components/MetaTags';
import { DashboardProvider } from '@/contexts/DashboardContext';

const LLMInsights: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="container mx-auto p-6">
        <MetaTags
          title="LLM Insights | PulsePlace.ai"
          description="Generate AI-powered workplace insights using large language models"
        />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">LLM Insights</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <p className="text-lg mb-4">
              Generate workplace culture insights using our advanced AI models.
            </p>
            <p className="mb-4">
              Our LLM-powered analysis identifies trends, patterns, and potential issues 
              in your company's culture data, providing actionable recommendations.
            </p>
            <button className="bg-pulse-gradient text-white px-4 py-2 rounded-md hover:opacity-90 transition-all">
              Generate Workplace Insights
            </button>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default LLMInsights;
