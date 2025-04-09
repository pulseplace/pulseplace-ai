
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[300px] w-full">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-secondary border-t-primary animate-spin"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
