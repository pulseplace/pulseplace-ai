
import React from 'react';
import { Badge } from "@/components/ui/badge";
import PlaceholderTabContent from './PlaceholderTabContent';
import OverviewTabContent from './OverviewTabContent';
import { DepartmentStats, CertificationSummary } from '../AdminDashboardService';

interface TabContentProps {
  activeTab: string;
  departmentStats: any[];
  recentCertifications: any[];
  children?: React.ReactNode;
  value?: string;
}

const TabContent: React.FC<TabContentProps> = ({ 
  activeTab, 
  departmentStats, 
  recentCertifications,
  children,
  value
}) => {
  // For Badge tab, show certification badge preview
  if (activeTab === 'badge') {
    // Sample badge data for preview
    const badgeData = {
      companyName: 'Acme Corporation',
      score: 88,
      tier: 'Pulse Certified™',
      issueDate: 'April 7, 2025',
      validUntil: 'April 7, 2026'
    };
    
    return (
      <PlaceholderTabContent 
        text="Preview your certification badge and get embed code"
        showBadge={true}
        badgeData={badgeData}
      />
    );
  }
  
  // If children are provided, render those
  if (children) {
    return <>{children}</>;
  }
  
  // Otherwise, render appropriate placeholder content based on tab
  let placeholderText = '';
  
  switch(activeTab) {
    case 'overview':
      return (
        <div className="space-y-6">
          {/* Overview content here */}
          <p className="text-gray-500">Dashboard overview content will be displayed here</p>
        </div>
      );
    case 'departments':
      placeholderText = 'Department comparison and metrics will be displayed here';
      break;
    case 'certifications':
      placeholderText = 'Certification reports and analytics will be displayed here';
      break;
    case 'settings':
      placeholderText = 'Dashboard settings and configuration options';
      break;
    default:
      placeholderText = 'Select a tab to view content';
  }
  
  return <PlaceholderTabContent text={placeholderText} />;
};

export default TabContent;
