
import React from 'react';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface HeaderSectionProps {
  realTimeStatus: 'connected' | 'disconnected' | 'failed';
  loading: boolean;
  onRefreshInsights: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  realTimeStatus, 
  loading, 
  onRefreshInsights 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Team AI Insights</h2>
        <p className="text-sm text-gray-500 mt-1">
          AI-generated insights based on survey and feedback data
        </p>
      </div>
      <div className="flex items-center gap-3">
        {realTimeStatus === 'failed' && (
          <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Using cached data</span>
          </Badge>
        )}
        {realTimeStatus === 'connected' && (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <Check className="h-3.5 w-3.5" />
            <span>Real-time</span>
          </Badge>
        )}
        <Badge className="bg-blue-100 text-blue-800 px-3 py-1">AI Generated</Badge>
        <button 
          onClick={onRefreshInsights}
          disabled={loading}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;
