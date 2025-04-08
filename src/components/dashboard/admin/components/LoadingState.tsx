
import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading dashboard data...', 
  subMessage,
  onRetry,
  showRetry = false
}) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-pulse-600" />
        <p className="mt-4 text-gray-600">{message}</p>
        {subMessage && (
          <p className="mt-2 text-sm text-gray-500 max-w-md text-center">{subMessage}</p>
        )}
        {showRetry && onRetry && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRetry}
            className="mt-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoadingState;
