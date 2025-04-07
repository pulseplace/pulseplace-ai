
import React from 'react';
import { Badge } from "@/components/ui/badge";
import PlaceholderTabContent from './PlaceholderTabContent';
import OverviewTabContent from './OverviewTabContent';
import { DepartmentStats, CertificationSummary } from '../AdminDashboardService';

interface TabContentProps {
  activeTab: string;
  departmentStats: any[];
  recentCertifications: any[];
}

const TabContent: React.FC<TabContentProps> = ({ 
  activeTab, 
  departmentStats,
  recentCertifications 
}) => {
  const stats = {
    overallScore: 86,
    activeSurveys: 3,
    responseRate: 78,
    insightsGenerated: 12
  };
  
  const handleSendReminderClick = () => {
    console.log('Send reminder clicked');
  };
  
  if (activeTab === 'overview') {
    return (
      <OverviewTabContent 
        stats={stats}
        departmentStats={departmentStats}
        certifications={recentCertifications}
        onSendRemindersClick={handleSendReminderClick}
      />
    );
  }
  
  if (activeTab === 'badge') {
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
  
  return (
    <PlaceholderTabContent 
      text={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} tab content would go here`} 
    />
  );
};

export default TabContent;
