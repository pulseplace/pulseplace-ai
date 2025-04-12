
import React from 'react';
import { BarChart, MessageSquare, Users, Clock, Smile, FileText } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CoreFeaturesTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        Our core platform features are designed to provide a comprehensive solution for measuring and improving workplace trust.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div>
          <FeatureCard 
            icon={<MessageSquare className="h-8 w-8" />}
            title="Pulse Surveys" 
            description="Continuous micro-surveys to gather real-time feedback." 
          />
          <div className="mt-4 text-center">
            <Link to="/features/surveys">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<BarChart className="h-8 w-8" />}
            title="AI Analytics" 
            description="Transform feedback into actionable insights." 
            isNew={true}
          />
          <div className="mt-4 text-center">
            <Link to="/features/ai-analytics">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<Users className="h-8 w-8" />}
            title="Certification Engine" 
            description="Validate and showcase your workplace culture." 
          />
          <div className="mt-4 text-center">
            <Link to="/features/certification">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<Clock className="h-8 w-8" />}
            title="Real-Time Dashboard" 
            description="Monitor your culture metrics as they evolve." 
          />
          <div className="mt-4 text-center">
            <Link to="/dashboard-preview">
              <Button variant="outline" size="sm">See Demo</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<Smile className="h-8 w-8" />}
            title="PulseBot AI" 
            description="AI assistant for employee engagement and insights." 
            isNew={true}
          />
          <div className="mt-4 text-center">
            <Link to="/pulsebot">
              <Button variant="outline" size="sm">Try PulseBot</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<FileText className="h-8 w-8" />}
            title="Custom Reports" 
            description="Generate detailed reports for stakeholders." 
          />
          <div className="mt-4 text-center">
            <Link to="/features/ai-analytics">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreFeaturesTab;
