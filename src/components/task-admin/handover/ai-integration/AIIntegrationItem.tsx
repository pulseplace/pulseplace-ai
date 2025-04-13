
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AIIntegrationItemProps { 
  title: string; 
  progress: number; 
  description: string; 
  status: 'complete' | 'near-complete' | 'in-progress';
}

const AIIntegrationItem: React.FC<AIIntegrationItemProps> = ({ 
  title, 
  progress, 
  description, 
  status 
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

export default AIIntegrationItem;
