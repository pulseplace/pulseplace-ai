
import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const HeroStats = () => {
  const [stats, setStats] = useState({
    retention: 85,
    productivity: 3.2,
    cultureImprovement: 60
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');

  // Simulate fetching updated stats
  const refreshStats = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Simulate success (80% of the time)
        if (Math.random() > 0.2) {
          // Small variations in stats to show real-time changes
          setStats({
            retention: Math.min(99, Math.max(70, stats.retention + (Math.random() > 0.5 ? 1 : -1))),
            productivity: parseFloat((stats.productivity + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1)),
            cultureImprovement: Math.min(95, Math.max(40, stats.cultureImprovement + (Math.random() > 0.5 ? 2 : -2)))
          });
          setLastUpdated(new Date());
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

  // Simulate connection check on component mount
  useEffect(() => {
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

  return (
    <div className="relative mt-16">
      {/* Connection status indicator */}
      <div className="absolute -top-6 right-0 flex items-center space-x-2 text-xs">
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
              onClick={refreshStats} 
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

      {/* Stats grid with fallback UI */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 bg-white shadow-xl rounded-xl p-8 ${connectionStatus === 'error' ? 'border-amber-300 border-2' : ''}`}>
        {connectionStatus === 'error' && (
          <div className="absolute inset-0 bg-amber-50/80 rounded-xl flex items-center justify-center z-10">
            <div className="text-center p-6">
              <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-amber-800 mb-2">Connection Issue</h3>
              <p className="text-amber-700 mb-4">
                We're having trouble fetching the latest data.
              </p>
              <button
                onClick={refreshStats}
                disabled={isLoading}
                className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 mx-auto"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Retry Connection</span>
              </button>
            </div>
          </div>
        )}

        <div className={`text-center ${isLoading ? 'animate-pulse' : ''}`}>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">{stats.retention}%</h3>
          <p className="text-gray-600">Higher retention for top-scoring companies</p>
        </div>
        <div className={`text-center ${isLoading ? 'animate-pulse' : ''}`}>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">{stats.productivity}x</h3>
          <p className="text-gray-600">Productivity increase in certified organizations</p>
        </div>
        <div className={`text-center ${isLoading ? 'animate-pulse' : ''}`}>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">{stats.cultureImprovement}%</h3>
          <p className="text-gray-600">Faster culture improvements with AI insights</p>
        </div>
      </div>
    </div>
  );
};

export default HeroStats;
