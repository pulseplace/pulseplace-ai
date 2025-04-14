
import React from 'react';
import { TimeRemaining } from './types';

interface CountdownTimerProps {
  timeRemaining: TimeRemaining;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeRemaining }) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-3 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-purple-600">{timeRemaining.days}</span>
        <span className="text-xs text-gray-500">days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-purple-600">{timeRemaining.hours}</span>
        <span className="text-xs text-gray-500">hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-purple-600">{timeRemaining.minutes}</span>
        <span className="text-xs text-gray-500">min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-purple-600">{timeRemaining.seconds}</span>
        <span className="text-xs text-gray-500">sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
