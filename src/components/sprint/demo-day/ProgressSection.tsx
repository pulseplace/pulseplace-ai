
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle } from 'lucide-react';
import { PhaseProgress } from './types';

interface ProgressSectionProps {
  overallReadiness: number;
  phasesProgress: PhaseProgress[];
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ 
  overallReadiness, 
  phasesProgress 
}) => {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Overall readiness</span>
          <span className="font-medium">{overallReadiness}%</span>
        </div>
        <Progress value={overallReadiness} className="h-2" />
      </div>
      
      <h3 className="text-sm font-medium">Project Phase Progress</h3>
      <div className="space-y-2">
        {phasesProgress.map((phase, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="flex items-center">
                {phase.status === "completed" ? (
                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <Clock className="h-3 w-3 mr-1 text-amber-600" />
                )}
                {phase.phase}
              </span>
              <span className="font-medium">{phase.progress}%</span>
            </div>
            <Progress 
              value={phase.progress} 
              className="h-1.5" 
              indicatorClassName={
                phase.status === "completed" 
                  ? "bg-green-500" 
                  : phase.progress >= 80 
                    ? "bg-amber-500" 
                    : "bg-blue-500"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
