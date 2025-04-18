
import React from 'react';
import { TimeRemaining } from './types';
import { Progress } from "@/components/ui/progress";
import { Rocket } from 'lucide-react';

interface CountdownTimerProps {
  timeRemaining: TimeRemaining;
  completionPercentage: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  timeRemaining, 
  completionPercentage 
}) => {
  return (
    <div className="p-4 bg-pulse-50 rounded-lg border border-pulse-100">
      <h3 className="text-md font-medium mb-2 flex items-center">
        <Rocket className="h-4 w-4 mr-2 text-pulse-600" />
        Time Until Demo Day
      </h3>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="text-center">
          <span className="text-2xl font-bold text-pulse-600">{timeRemaining.days}</span>
          <p className="text-xs text-gray-600">days</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-pulse-600">{timeRemaining.hours}</span>
          <p className="text-xs text-gray-600">hours</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-pulse-600">{timeRemaining.minutes}</span>
          <p className="text-xs text-gray-600">min</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-pulse-600">{timeRemaining.seconds}</span>
          <p className="text-xs text-gray-600">sec</p>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
    </div>
  );
};

export default CountdownTimer;
