
import React from 'react';
import TimelineItem from './TimelineItem';

const AITimelineSection: React.FC = () => {
  return (
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
  );
};

export default AITimelineSection;
