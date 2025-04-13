
import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TimelineItemProps { 
  status: 'completed' | 'in-progress' | 'upcoming'; 
  text: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  status, 
  text 
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

export default TimelineItem;
