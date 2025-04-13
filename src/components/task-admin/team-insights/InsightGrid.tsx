
import React from 'react';
import InsightCard from './InsightCard';
import { TeamInsight } from './types';

interface InsightGridProps {
  insights: TeamInsight[];
}

const InsightGrid: React.FC<InsightGridProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <InsightCard key={index} insight={insight} />
      ))}
    </div>
  );
};

export default InsightGrid;
