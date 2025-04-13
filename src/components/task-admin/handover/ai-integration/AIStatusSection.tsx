
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AIIntegrationItem from './AIIntegrationItem';

const AIStatusSection: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <h3 className="text-base font-medium mb-3">AI Integration Status</h3>
      
      <div className="space-y-4">
        <AIIntegrationItem 
          title="Sentiment Analysis Pipeline" 
          progress={88} 
          description="Text and survey response analysis with theme extraction" 
          status="near-complete"
        />
        
        <AIIntegrationItem 
          title="PulseBot Implementation" 
          progress={92} 
          description="Chatbot interface for insights with follow-up suggestions" 
          status="near-complete"
        />
        
        <AIIntegrationItem 
          title="Real-time Insights Engine" 
          progress={82} 
          description="Realtime culture trends and predictive analytics" 
          status="in-progress"
        />
        
        <AIIntegrationItem 
          title="Culture Compass Implementation" 
          progress={100} 
          description="Multidimensional culture analysis with benchmarks" 
          status="complete"
        />
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button asChild>
          <Link to="/features/ai-engine">
            View Detailed AI Status
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AIStatusSection;
