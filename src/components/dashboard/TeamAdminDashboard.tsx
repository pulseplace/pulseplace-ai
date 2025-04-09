
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import TeamAdminFilters from './admin/TeamAdminFilters';
import TeamSummaryStats from './admin/TeamSummaryStats';
import LoadingDashboard from './admin/LoadingDashboard';
import TeamTabContent from './admin/TeamTabContent';
import InsightsTabContent from './admin/InsightsTabContent';
import CertificationTabContent from './admin/CertificationTabContent';
import TeamActions from './admin/TeamActions';
import TeamDataExport from './admin/TeamDataExport';
import { useTeamAdminData } from './admin/useTeamAdminData';

const DEMO_DEPARTMENTS = [
  "All Departments", "Engineering", "Marketing", "Sales", "Customer Support", "Human Resources"
];

const TeamAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Use our custom hook to manage data and state
  const {
    data,
    filters,
    setFilters,
    isLoading,
    isRefreshing,
    error,
    refreshData,
    generateInsights,
    loadDashboardData
  } = useTeamAdminData();
  
  const handleSendReminders = async () => {
    const pendingMembers = data.teamMembers.filter(member => member.surveyStatus === 'pending');
    
    if (pendingMembers.length === 0) {
      return;
    }
    
    const pendingMemberIds = pendingMembers.map(m => m.id);
    try {
      const result = await teamAdminService.sendReminders(pendingMemberIds);
      
      // Refresh data to show updated status
      await loadDashboardData();
    } catch (error) {
      console.error('Error sending reminders:', error);
    }
  };
  
  const handleBulkInvite = () => {
    toast({
      title: "Bulk Invite Initiated",
      description: "Invitations are being sent to all team members without a survey status.",
    });
    
    setTimeout(() => {
      toast({
        title: "Invitations Sent",
        description: "Invitations have been sent to all team members without a survey status.",
      });
    }, 1500);
  };
  
  const handleSendCertificate = async () => {
    if (!data.insights) {
      return;
    }
    
    try {
      // Generate certification in database
      const certResult = await teamAdminService.generateCertification(
        filters.department === 'All Departments' ? 'Tayana Solutions' : filters.department
      );
    } catch (error) {
      console.error('Error sending certificate:', error);
    }
  };
  
  if (isLoading) {
    return <LoadingDashboard />;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team Admin Dashboard</h2>
          <p className="text-gray-500">Manage your team's PulseScore™ certification process</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <TeamDataExport 
            teamMembersCount={data.teamMembers.length}
            department={filters.department !== 'All Departments' ? filters.department : undefined}
          />
          
          <TeamActions 
            teamMembers={data.teamMembers}
            onSendReminders={handleSendReminders}
            onBulkInvite={handleBulkInvite}
            isRefreshing={isRefreshing}
          />
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <TeamAdminFilters
        dateRange={filters.dateRange}
        setDateRange={date => setFilters({...filters, dateRange: date})}
        department={filters.department}
        setDepartment={department => setFilters({...filters, department})}
        pulseTheme={filters.pulseTheme}
        setPulseTheme={theme => setFilters({...filters, pulseTheme: theme})}
        onClose={() => refreshData()}
      />
      
      <TeamSummaryStats
        participationRate={data.summaryStats.participationRate}
        averageScore={data.summaryStats.averageScore}
        completedSurveys={data.summaryStats.completedSurveys}
        pendingSurveys={data.summaryStats.pendingSurveys}
        themeScores={data.summaryStats.themeScores}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
          <CardDescription>
            Manage your team members and track their survey status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="team" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="team">Team Members</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="certification">Certification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="team">
              <TeamTabContent 
                teamMembers={data.teamMembers} 
                onRefresh={loadDashboardData}
              />
            </TabsContent>
            
            <TabsContent value="insights">
              <InsightsTabContent 
                insights={data.insights} 
                onGenerateInsights={generateInsights} 
              />
            </TabsContent>
            
            <TabsContent value="certification">
              <CertificationTabContent 
                averageScore={data.summaryStats.averageScore}
                onSendCertificate={handleSendCertificate}
                onExportPDF={() => exportService.exportToPDF(
                  filters.department !== 'All Departments' ? filters.department : undefined
                )}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAdminDashboard;
