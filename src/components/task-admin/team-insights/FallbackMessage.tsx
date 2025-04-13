
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface FallbackMessageProps {
  loading: boolean;
  onRefreshInsights: () => void;
}

const FallbackMessage: React.FC<FallbackMessageProps> = ({ loading, onRefreshInsights }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-6 text-center">
      <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
      <h3 className="text-lg font-medium text-amber-800 mb-2">Real-Time Insights Unavailable</h3>
      <p className="text-amber-700 mb-4">
        We're unable to fetch real-time insights at this moment. This could be due to network connectivity issues.
      </p>
      <button
        onClick={onRefreshInsights}
        disabled={loading}
        className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 mx-auto"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        <span>Retry Connection</span>
      </button>
    </div>
  );
};

export default FallbackMessage;
