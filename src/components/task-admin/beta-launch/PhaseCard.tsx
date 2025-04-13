
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskItem from './TaskItem';
import { PhaseItem } from './types';

interface PhaseCardProps {
  phase: PhaseItem;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  return (
    <Card className={`mb-6 ${
      phase.status === 'completed' ? 'border-l-4 border-l-green-500' : 
      phase.status === 'in-progress' ? 'border-l-4 border-l-blue-500' : ''
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{phase.title}</CardTitle>
          <Badge className={`
            ${phase.status === 'completed' ? 'bg-green-100 text-green-800' : 
              phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-800'}
          `}>
            {phase.status.replace('-', ' ')}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">{phase.timeframe}</div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{phase.description}</p>
        <div className="space-y-1">
          {phase.tasks.map((task, index) => (
            <TaskItem key={index} task={task} phaseStatus={phase.status} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseCard;
