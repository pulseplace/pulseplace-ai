
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FocusArea } from './types';

interface FocusAreaItemProps {
  area: FocusArea;
}

const FocusAreaItem: React.FC<FocusAreaItemProps> = ({ area }) => {
  return (
    <div className="flex items-start">
      <div className={`${area.color} rounded p-2 mr-3`}>
        <ArrowRight className="h-4 w-4 text-purple-600" />
      </div>
      <div>
        <h4 className="font-medium">{area.title}</h4>
        <p className="text-sm text-gray-600">{area.description}</p>
      </div>
    </div>
  );
};

export default FocusAreaItem;
