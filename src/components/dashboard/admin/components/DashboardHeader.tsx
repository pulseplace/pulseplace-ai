
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  onExportClick: () => void;
  onRefreshData: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onExportClick, onRefreshData }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold">Admin HR Dashboard</h2>
        <p className="text-sm text-gray-500">Manage certification process and employee insights</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onExportClick}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button size="sm" className="bg-pulse-gradient" onClick={onRefreshData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
