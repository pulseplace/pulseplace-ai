
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <DashboardTabs 
            departmentStats={departmentStats} 
            recentCertifications={certifications}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          
          <TabsContent value="overview">
            <OverviewTabContent 
              stats={stats}
              departmentStats={departmentStats}
              certifications={certifications}
              onSendRemindersClick={handleSendReminderClick}
            />
          </TabsContent>
          
          <TabsContent value="surveys">
            <PlaceholderTabContent text="Surveys tab content would go here with active and scheduled surveys" />
          </TabsContent>
          
          <TabsContent value="insights">
            <PlaceholderTabContent text="Insights tab would contain AI-generated insights and trend analysis" />
          </TabsContent>
          
          <TabsContent value="certifications">
            <PlaceholderTabContent text="Certifications tab would show all past and current certifications" />
          </TabsContent>
          
          <TabsContent value="employees">
            <PlaceholderTabContent text="Employees tab would contain employee participation and individual insights" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminHRDashboard;
