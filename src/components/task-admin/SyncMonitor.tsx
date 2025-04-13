
import React, { useState } from 'react';
import { RefreshCw, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface SyncMonitorProps {
  lastUpdated: Date;
  onRefresh: () => void;
}

const SyncMonitor: React.FC<SyncMonitorProps> = ({ lastUpdated, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');

  // Simulate connection check
  React.useEffect(() => {
    const connectionCheck = setTimeout(() => {
      // 80% chance of staying connected, 20% chance of failing
      if (Math.random() < 0.2) {
        setConnectionStatus('disconnected');
        toast.warning("Real-time connection interrupted", {
          description: "Displaying cached insights. Click to refresh.",
          duration: 5000,
        });
      }
    }, 5000);

    return () => clearTimeout(connectionCheck);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    onRefresh();
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Simulate success (80% of the time)
        if (Math.random() > 0.2) {
          setConnectionStatus('connected');
          
          toast.success("Stats refreshed successfully", {
            description: "Latest data loaded from server",
            duration: 3000,
          });
        } else {
          // Simulate connection error
          setConnectionStatus('error');
          
          toast.error("Connection issue detected", {
            description: "Using cached data. Reconnecting...",
            duration: 5000,
          });
        }
      } catch (error) {
        setConnectionStatus('error');
        console.error("Error refreshing stats:", error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center space-x-2 text-xs">
      {connectionStatus === 'connected' ? (
        <span className="flex items-center text-green-600">
          <CheckCircle className="mr-1 h-3 w-3" /> 
          Real-time data
        </span>
      ) : (
        <span className="flex items-center text-amber-600">
          <AlertCircle className="mr-1 h-3 w-3" /> 
          Using cached data
          <button 
            onClick={handleRefresh} 
            className="ml-2 text-pulse-600 hover:text-pulse-800 flex items-center"
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </span>
      )}
      <span className="text-gray-400 flex items-center">
        <Clock className="mr-1 h-3 w-3" />
        {format(lastUpdated, 'MMM d, h:mm a')}
      </span>
    </div>
  );
};

export default SyncMonitor;
