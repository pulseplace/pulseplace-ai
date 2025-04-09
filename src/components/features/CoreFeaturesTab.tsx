
import React from 'react';
import { BarChart, MessageSquare, Users, Clock, Smile, FileText } from 'lucide-react';
import FeatureCard from './FeatureCard';

const CoreFeaturesTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        Our core platform features are designed to provide a comprehensive solution for measuring and improving workplace trust.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <FeatureCard 
          icon={<MessageSquare className="h-8 w-8" />}
          title="Pulse Surveys" 
          description="Continuous micro-surveys to gather real-time feedback." 
        />
        
        <FeatureCard 
          icon={<BarChart className="h-8 w-8" />}
          title="AI Analytics" 
          description="Transform feedback into actionable insights." 
          isNew={true}
        />
        
        <FeatureCard 
          icon={<Users className="h-8 w-8" />}
          title="Certification Engine" 
          description="Validate and showcase your workplace culture." 
        />
        
        <FeatureCard 
          icon={<Clock className="h-8 w-8" />}
          title="Real-Time Dashboard" 
          description="Monitor your culture metrics as they evolve." 
        />
        
        <FeatureCard 
          icon={<Smile className="h-8 w-8" />}
          title="PulseBot AI" 
          description="AI assistant for employee engagement and insights." 
          isNew={true}
        />
        
        <FeatureCard 
          icon={<FileText className="h-8 w-8" />}
          title="Custom Reports" 
          description="Generate detailed reports for stakeholders." 
        />
      </div>
    </div>
  );
};

export default CoreFeaturesTab;
