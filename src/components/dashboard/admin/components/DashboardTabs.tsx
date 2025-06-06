
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BarChart3, FileText, Settings, Users2 } from 'lucide-react';

interface DashboardTabsProps {
  departmentStats: any[];
  recentCertifications: any[];
  selectedTab?: string;
  onTabChange?: (value: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  departmentStats, 
  recentCertifications,
  selectedTab = 'overview',
  onTabChange
}) => {
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };
  
  return (
    <Tabs 
      defaultValue={selectedTab} 
      className="mt-6"
      onValueChange={handleTabChange}
      value={selectedTab}
    >
      <TabsList className="grid grid-cols-5 w-full max-w-3xl">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="departments" className="flex items-center gap-2">
          <Users2 className="h-4 w-4" />
          <span className="hidden sm:inline">Departments</span>
        </TabsTrigger>
        <TabsTrigger value="certifications" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Reports</span>
        </TabsTrigger>
        <TabsTrigger value="badge" className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          <span className="hidden sm:inline">Badge</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DashboardTabs;
