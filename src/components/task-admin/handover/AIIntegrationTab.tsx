
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CultureCompass from '@/components/analytics/CultureCompass';
import { generateCultureCompass } from '@/utils/aiAnalytics';

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

const AIIntegrationItem = ({ 
  title, 
  progress, 
  description, 
  status 
}: { 
  title: string; 
  progress: number; 
  description: string; 
  status: 'complete' | 'near-complete' | 'in-progress';
}) => {
  const getBadgeClass = () => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800 border-green-200';
      case 'near-complete': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };
  
  const getBadgeText = () => {
    switch (status) {
      case 'complete': return 'Complete';
      case 'near-complete': return 'Near Complete';
      case 'in-progress': return 'In Progress';
    }
  };
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between mb-1">
        <div className="flex items-center">
          <span className="font-medium">{title}</span>
          <Badge className={`ml-2 ${getBadgeClass()}`}>{getBadgeText()}</Badge>
        </div>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className={`${status === 'complete' ? 'bg-green-600' : 'bg-blue-600'} h-2.5 rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const TimelineItem = ({ 
  status, 
  text 
}: { 
  status: 'completed' | 'in-progress' | 'upcoming'; 
  text: string;
}) => {
  let StatusIcon;
  
  switch (status) {
    case 'completed':
      StatusIcon = () => <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />;
      break;
    case 'in-progress':
      StatusIcon = () => <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />;
      break;
    case 'upcoming':
      StatusIcon = () => <Clock className="h-4 w-4 text-gray-400 shrink-0" />;
      break;
  }
  
  return (
    <li className="flex items-center gap-2">
      <StatusIcon />
      <span className="text-gray-800">{text}</span>
    </li>
  );
};

const AIIntegrationTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
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
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-base font-medium mb-1">AI Integration Timeline</h3>
          <p className="text-sm text-gray-600 mb-3">Key milestones for AI engine deployment</p>
          
          <ul className="space-y-3 text-sm">
            <TimelineItem 
              status="completed" 
              text="Base LLM Integration (Mar 28)"
            />
            <TimelineItem 
              status="completed" 
              text="Sentiment Pipeline (Apr 5)"
            />
            <TimelineItem 
              status="in-progress" 
              text="Real-time Insights (Apr 15)"
            />
            <TimelineItem 
              status="upcoming" 
              text="Final Deployment (Apr 21)"
            />
          </ul>
        </div>
        
        <div className="flex-1">
          <CultureCompass {...cultureCompass} />
        </div>
      </div>
    </div>
  );
};

export default AIIntegrationTab;
