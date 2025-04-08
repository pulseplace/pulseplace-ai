
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import TeamExportOptions from './TeamExportOptions';

interface DashboardHeaderProps {
  onExportCSV: () => void;
  onExportPDF: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  error: string | null;
  teamMembersCount: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onExportCSV,
  onExportPDF,
  onRefreshData,
  isRefreshing,
  error,
  teamMembersCount
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team Admin Dashboard</h2>
          <p className="text-gray-500">Manage your team's PulseScore™ certification process</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <TeamExportOptions 
            onExportCSV={onExportCSV}
            onExportPDF={onExportPDF}
            dataAvailable={teamMembersCount > 0}
          />
          
          <Button onClick={onRefreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default DashboardHeader;
