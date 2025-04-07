
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchAdminDashboardStats, 
  fetchDepartmentStats, 
  fetchRecentCertifications 
} from './AdminDashboardService';

import DashboardHeader from './components/DashboardHeader';
import DashboardTabs from './components/DashboardTabs';
import LoadingState from './components/LoadingState';
import ErrorAlert from './components/ErrorAlert';
import OverviewTabContent from './components/OverviewTabContent';
import PlaceholderTabContent from './components/PlaceholderTabContent';

const AdminHRDashboard = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stats, setStats] = useState({
    overallScore: 0,
    activeSurveys: 0,
    responseRate: 0,
    insightsGenerated: 0
  });
  const [departmentStats, setDepartmentStats] = useState([]);
  const [certifications, setCertifications] = useState([]);
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [overallStats, departments, recentCerts] = await Promise.all([
        fetchAdminDashboardStats(),
        fetchDepartmentStats(),
        fetchRecentCertifications()
      ]);
      
      setStats(overallStats);
      setDepartmentStats(departments);
      setCertifications(recentCerts);
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportClick = () => {
    toast({
      title: "Report Exported",
      description: "Dashboard data has been exported to Excel",
    });
  };
  
  const handleSendReminderClick = () => {
    toast({
      title: "Reminders Sent",
      description: "Survey completion reminders have been sent to 32 employees",
    });
  };
  
  const handleRefreshData = async () => {
    await loadDashboardData();
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated",
    });
  };
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <OverviewTabContent 
            stats={stats}
            departmentStats={departmentStats}
            certifications={certifications}
            onSendRemindersClick={handleSendReminderClick}
          />
        );
      case 'departments':
        return <PlaceholderTabContent text="Departments tab would show department-specific metrics and insights" />;
      case 'certifications':
        return <PlaceholderTabContent text="Certifications tab would show all past and current certifications" />;
      case 'badge':
        return (
          <PlaceholderTabContent 
            text="Preview your certification badge and get embed code"
            showBadge={true}
            badgeData={{
              companyName: 'Acme Corporation',
              score: 88,
              tier: 'Pulse Certified™',
              issueDate: 'April 7, 2025',
              validUntil: 'April 7, 2026'
            }}
          />
        );
      case 'settings':
        return <PlaceholderTabContent text="Settings tab would contain dashboard configuration options" />;
      default:
        return <PlaceholderTabContent text="Select a tab to view content" />;
    }
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <DashboardHeader 
          onExportClick={handleExportClick}
          onRefreshData={handleRefreshData}
        />
      </CardHeader>
      <CardContent>
        {error && <ErrorAlert message={error} />}
        
        <DashboardTabs 
          departmentStats={departmentStats} 
          recentCertifications={certifications}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        
        {renderTabContent()}
      </CardContent>
    </Card>
  );
};

export default AdminHRDashboard;
