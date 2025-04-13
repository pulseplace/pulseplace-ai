
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  milestone: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date: string;
}

interface AIIntegrationTimelineProps {
  timeline: TimelineItem[];
}

const AIIntegrationTimeline: React.FC<AIIntegrationTimelineProps> = ({ timeline }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">AI Integration Timeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500' : 
                  item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
                <span>{item.milestone}</span>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  item.status === 'completed' ? 'text-green-600' : 
                  item.status === 'in-progress' ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {item.date}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIIntegrationTimeline;
