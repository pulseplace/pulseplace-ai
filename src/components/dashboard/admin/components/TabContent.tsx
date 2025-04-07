
import React from 'react';
import OverviewTabContent from './OverviewTabContent';
import PlaceholderTabContent from './PlaceholderTabContent';

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
  // Mock data for the certification badge preview
  const badgeData = {
    companyName: 'Acme Corporation',
    score: 86,
    tier: 'Pulse Certified™',
    issueDate: 'April 7, 2025',
    validUntil: 'April 7, 2026'
  };

  switch (activeTab) {
    case 'overview':
      return (
        <OverviewTabContent 
          departmentStats={departmentStats} 
          recentCertifications={recentCertifications} 
        />
      );
    case 'departments':
      return <PlaceholderTabContent text="Department management coming soon" />;
    case 'certifications':
      return <PlaceholderTabContent text="Certification history coming soon" />;
    case 'settings':
      return <PlaceholderTabContent text="Dashboard settings coming soon" />;
    case 'badge':
      return (
        <PlaceholderTabContent 
          text="Badge Preview" 
          showBadge={true} 
          badgeData={badgeData} 
        />
      );
    default:
      return <PlaceholderTabContent text="Content coming soon" />;
  }
};

export default TabContent;
