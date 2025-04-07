
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Tables } from '@/types/database.types';
import { 
  Clock, 
  Users, 
  Briefcase 
} from 'lucide-react';

interface SurveyStatsProps {
  survey: Tables<'pulse_surveys'>;
  responsesCount: number;
}

const SurveyStats: React.FC<SurveyStatsProps> = ({ survey, responsesCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-md flex items-start">
        <div className="mr-3 mt-1">
          <Briefcase className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Department</h3>
          <p className="mt-1 font-medium">{survey.department || 'All'}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md flex items-start">
        <div className="mr-3 mt-1">
          <Clock className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Created</h3>
          <p className="mt-1 font-medium">
            {formatDistanceToNow(new Date(survey.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md flex items-start">
        <div className="mr-3 mt-1">
          <Users className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Responses</h3>
          <p className="mt-1 font-medium">{responsesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyStats;
