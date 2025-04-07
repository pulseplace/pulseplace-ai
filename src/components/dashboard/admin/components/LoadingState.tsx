
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-pulse-600" />
        <p className="mt-4 text-gray-600">Loading dashboard data...</p>
      </div>
    </div>
  );
};

export default LoadingState;
