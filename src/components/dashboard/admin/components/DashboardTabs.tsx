
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ selectedTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
      <TabsTrigger 
        value="overview" 
        onClick={() => onTabChange('overview')}
        data-state={selectedTab === 'overview' ? 'active' : 'inactive'}
      >
        Overview
      </TabsTrigger>
      <TabsTrigger 
        value="surveys" 
        onClick={() => onTabChange('surveys')}
        data-state={selectedTab === 'surveys' ? 'active' : 'inactive'}
      >
        Surveys
      </TabsTrigger>
      <TabsTrigger 
        value="insights" 
        onClick={() => onTabChange('insights')}
        data-state={selectedTab === 'insights' ? 'active' : 'inactive'}
      >
        Insights
      </TabsTrigger>
      <TabsTrigger 
        value="certifications" 
        onClick={() => onTabChange('certifications')}
        data-state={selectedTab === 'certifications' ? 'active' : 'inactive'}
      >
        Certifications
      </TabsTrigger>
      <TabsTrigger 
        value="employees" 
        onClick={() => onTabChange('employees')}
        data-state={selectedTab === 'employees' ? 'active' : 'inactive'}
      >
        Employees
      </TabsTrigger>
    </TabsList>
  );
};

export default DashboardTabs;
