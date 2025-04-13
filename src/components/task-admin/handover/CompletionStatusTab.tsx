
import React from 'react';
import { CheckCircle, Clock, X } from 'lucide-react';

const FeatureProgressItem = ({ name, progress }: { name: string; progress: number }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm">{name}</span>
      <span className="text-sm font-medium">{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const ChecklistItem = ({ 
  status, 
  title, 
  description 
}: { 
  status: 'completed' | 'in-progress' | 'not-started'; 
  title: string; 
  description: string;
}) => {
  let StatusIcon;
  
  switch (status) {
    case 'completed':
      StatusIcon = () => <CheckCircle className="h-5 w-5 text-green-500" />;
      break;
    case 'in-progress':
      StatusIcon = () => <Clock className="h-5 w-5 text-amber-500" />;
      break;
    case 'not-started':
      StatusIcon = () => <X className="h-5 w-5 text-gray-300" />;
      break;
  }
  
  return (
    <li className="flex items-start gap-2">
      <div className="mt-0.5">
        <StatusIcon />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </li>
  );
};

const CompletionStatusTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
        <h3 className="text-base font-medium">Feature Implementation</h3>
        
        <FeatureProgressItem name="Core features" progress={85} />
        <FeatureProgressItem name="Dashboard" progress={90} />
        <FeatureProgressItem name="Navigation & site structure" progress={95} />
        <FeatureProgressItem name="Responsive design" progress={96} />
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-base font-medium mb-3">Launch Preparation Checklist</h3>
        
        <ul className="space-y-2">
          <ChecklistItem 
            status="completed" 
            title="Beta user selection complete" 
            description="25 organizations confirmed"
          />
          
          <ChecklistItem 
            status="completed" 
            title="Onboarding documentation" 
            description="User guides, FAQs, and support info"
          />
          
          <ChecklistItem 
            status="in-progress" 
            title="Bug triage and prioritization" 
            description="17 issues identified, 12 resolved"
          />
          
          <ChecklistItem 
            status="not-started" 
            title="Final performance testing" 
            description="Load and stress testing"
          />
          
          <ChecklistItem 
            status="not-started" 
            title="Launch communications prepared" 
            description="Email templates and social media"
          />
        </ul>
      </div>
    </div>
  );
};

export default CompletionStatusTab;
