
import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatCardProps = {
  title: string;
  value: React.ReactNode;
  footer?: React.ReactNode;
  progress?: number;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, footer, progress }) => (
  <div className="bg-white p-4 rounded-lg border shadow-sm">
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <div className="text-3xl font-bold mb-1">{value}</div>
    {progress !== undefined && (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${title.includes('AI') ? 'bg-blue-600' : 'bg-green-600'} h-2.5 rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}
    {footer && footer}
  </div>
);

const HandoverStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Overall Completion" 
        value="87%" 
        progress={87}
      />
      
      <StatCard 
        title="Target Launch Date" 
        value="April 21, 2025"
        footer={
          <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
            8 days remaining
          </Badge>
        }
      />
      
      <StatCard 
        title="AI Integration" 
        value="85%" 
        progress={85}
      />
    </div>
  );
};

export default HandoverStats;
