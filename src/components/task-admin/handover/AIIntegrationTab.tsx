
import React from 'react';
import CultureCompass from '@/components/analytics/CultureCompass';
import { generateCultureCompass } from '@/utils/aiAnalytics';
import AITimelineSection from './ai-integration/AITimelineSection';
import AIStatusSection from './ai-integration/AIStatusSection';

// Sample culture data for demonstration
const sampleCultureData = [
  { category: 'Psychological Safety', score: 82, benchmark: 75 },
  { category: 'Communication', score: 68, benchmark: 72 },
  { category: 'Trust in Leadership', score: 75, benchmark: 70 },
  { category: 'Growth & Development', score: 63, benchmark: 68 },
  { category: 'Team Collaboration', score: 79, benchmark: 73 },
  { category: 'Work-Life Balance', score: 71, benchmark: 65 }
];

// Generate the culture compass
const cultureCompass = generateCultureCompass(sampleCultureData);

const AIIntegrationTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <AIStatusSection />
      </div>
      
      <div className="flex flex-col gap-4">
        <AITimelineSection />
        
        <div className="flex-1">
          <CultureCompass {...cultureCompass} />
        </div>
      </div>
    </div>
  );
};

export default AIIntegrationTab;
