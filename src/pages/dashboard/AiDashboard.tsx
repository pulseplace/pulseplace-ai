
import React, { useState } from 'react';
import MetaTags from '@/components/MetaTags';
import DashboardUI from '@/components/dashboard/DashboardUI';
import { DashboardProvider } from '@/contexts/DashboardContext';
import ExportButton from '@/components/dashboard/ExportButton';
import { Button } from '@/components/ui/button';
import { BarChart3, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const AiDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRefreshing(false);
    toast.success("Dashboard refreshed", {
      description: "All data has been updated to the latest values."
    });
  };
  
  return (
    <DashboardProvider>
      <div className="container mx-auto px-4 py-6">
        <MetaTags
          title="AI Dashboard | PulsePlace.ai"
          description="Advanced AI-powered analytics dashboard for workplace culture insights"
        />
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">AI Dashboard</h1>
              <p className="text-muted-foreground">AI-powered insights for your workplace culture</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <ExportButton 
                filename="ai-dashboard"
                formats={['pdf', 'csv']} 
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-10 w-10 rounded-full bg-blue-100 items-center justify-center flex-shrink-0">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-1">Welcome to your AI Dashboard</h2>
                <p className="text-muted-foreground">
                  Monitor culture metrics, track engagement, and discover actionable insights powered by advanced AI.
                </p>
              </div>
            </div>
          </div>
          
          <DashboardUI />
        </div>
      </div>
    </DashboardProvider>
  );
};

export default AiDashboard;
