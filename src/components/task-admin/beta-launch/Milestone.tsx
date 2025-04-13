
import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { MilestoneItem } from './types';

interface MilestoneProps {
  milestone: MilestoneItem;
}

const Milestone: React.FC<MilestoneProps> = ({ milestone }) => {
  const { date, title, description, status } = milestone;
  
  return (
    <div className="flex items-start mb-6">
      <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0 ${
        status === 'completed' ? 'bg-green-100 text-green-600' : 
        status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {status === 'completed' ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Clock className="h-5 w-5" />
        )}
      </div>
      <div>
        <div className="text-sm text-gray-500">{date}</div>
        <h3 className="font-medium text-lg">{title}</h3>
        {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default Milestone;
