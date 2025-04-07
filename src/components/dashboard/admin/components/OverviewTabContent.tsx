
import React from 'react';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';
import RecentCertifications from './RecentCertifications';
import DepartmentComparison from './DepartmentComparison';
import { DepartmentStats, CertificationSummary } from '../AdminDashboardService';

interface OverviewTabContentProps {
  stats: {
    overallScore: number;
    activeSurveys: number;
    responseRate: number;
    insightsGenerated: number;
  };
  departmentStats: DepartmentStats[];
  certifications: CertificationSummary[];
  onSendRemindersClick: () => void;
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  stats,
  departmentStats,
  certifications,
  onSendRemindersClick
}) => {
  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <QuickActions onSendRemindersClick={onSendRemindersClick} />
      <RecentCertifications certifications={certifications} />
      <DepartmentComparison departmentStats={departmentStats} />
    </div>
  );
};

export default OverviewTabContent;
