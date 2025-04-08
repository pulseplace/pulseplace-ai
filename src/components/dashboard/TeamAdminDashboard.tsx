import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { emailService } from '@/services/emailService';
import { insightsService } from '@/services/insightsService';
import { teamAdminService, TeamMember } from '@/services/teamAdminService';
import TeamAdminFilters from './admin/TeamAdminFilters';
import TeamSummaryStats from './admin/TeamSummaryStats';
import LoadingDashboard from './admin/LoadingDashboard';
import DashboardHeader from './admin/DashboardHeader';
import TeamTabContent from './admin/TeamTabContent';
import InsightsTabContent from './admin/InsightsTabContent';
import CertificationTabContent from './admin/CertificationTabContent';
import { DateRangeFilter } from '@/components/ui/date-range-picker';

const DEMO_DEPARTMENTS = [
  "All Departments", "Engineering", "Marketing", "Sales", "Customer Support", "Human Resources"
];

const TeamAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [department, setDepartment] = useState('All Departments');
  const [pulseTheme, setPulseTheme] = useState('All Themes');
  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [summaryStats, setSummaryStats] = useState({
    participationRate: 0,
    averageScore: 0,
    completedSurveys: 0,
    pendingSurveys: 0,
    themeScores: [
      { theme: "Trust & Safety", score: 0 },
      { theme: "Engagement", score: 0 },
      { theme: "Culture", score: 0 },
      { theme: "Growth & Development", score: 0 },
      { theme: "Wellbeing", score: 0 },
    ]
  });
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch team members from Supabase
      const members = await teamAdminService.getTeamMembers(department);
      setTeamMembers(members);
      
      // Fetch summary stats
      const stats = await teamAdminService.getSummaryStats(department, pulseTheme, dateRange);
      setSummaryStats(stats);
      
      try {
        if (!insights) {
          const generatedInsights = await insightsService.generateTestInsight();
          setInsights(generatedInsights);
        }
      } catch (insightError) {
        console.error("Failed to generate insights:", insightError);
      }
      
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
  
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      await loadDashboardData();
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated with current filters",
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleExportCSV = async () => {
    setIsRefreshing(true);
    try {
      const result = await teamAdminService.exportTeamDataCSV(department);
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to export CSV');
      }
      
      // Create and download the CSV file
      const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `tayana-team-pulse-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Completed",
        description: "Your CSV export has been downloaded.",
      });
    } catch (error: any) {
      console.error('Error exporting CSV:', error);
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export data to CSV",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleExportPDF = async () => {
    setIsRefreshing(true);
    try {
      const result = await teamAdminService.exportToPDF(department);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to export PDF');
      }
      
      toast({
        title: "PDF Export Complete",
        description: "Your PDF report has been generated and downloaded.",
      });
    } catch (error: any) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export report to PDF",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleSendReminders = async () => {
    const pendingMembers = teamMembers.filter(member => member.surveyStatus === 'pending');
    
    if (pendingMembers.length === 0) {
      toast({
        title: "No Reminders Sent",
        description: "All team members have already completed the survey.",
      });
      return;
    }
    
    setIsRefreshing(true);
    try {
      const pendingMemberIds = pendingMembers.map(m => m.id);
      const result = await teamAdminService.sendReminders(pendingMemberIds);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send reminders');
      }
      
      toast({
        title: "Reminders Sent",
        description: `Sent survey reminders to ${result.count} team members.`,
      });
      
      // Refresh data to show updated status
      await loadDashboardData();
    } catch (error: any) {
      console.error('Error sending reminders:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send survey reminders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
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
    if (!insights) {
      toast({
        title: "No Insights Available",
        description: "Please generate insights first before sending the certificate.",
        variant: "destructive"
      });
      return;
    }
    
    setIsRefreshing(true);
    try {
      // Generate certification in database
      const certResult = await teamAdminService.generateCertification(
        department === 'All Departments' ? 'Tayana Solutions' : department
      );
      
      if (!certResult.success) {
        throw new Error(certResult.error || 'Failed to generate certification');
      }
      
      toast({
        title: "Certificate Generated",
        description: "The certification has been generated and sent via email.",
      });
    } catch (error: any) {
      console.error('Error sending certificate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate certification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleGenerateInsights = async () => {
    try {
      const generatedInsights = await insightsService.generateTestInsight();
      setInsights(generatedInsights);
    } catch (error) {
      console.error("Failed to generate insights:", error);
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return <LoadingDashboard />;
  }
  
  return (
    <div className="space-y-8">
      <DashboardHeader
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
        error={error}
        teamMembersCount={teamMembers.length}
      />
      
      <TeamAdminFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        department={department}
        setDepartment={setDepartment}
        pulseTheme={pulseTheme}
        setPulseTheme={setPulseTheme}
        onClose={() => handleRefreshData()}
      />
      
      <TeamSummaryStats
        participationRate={summaryStats.participationRate}
        averageScore={summaryStats.averageScore}
        completedSurveys={summaryStats.completedSurveys}
        pendingSurveys={summaryStats.pendingSurveys}
        themeScores={summaryStats.themeScores}
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
                teamMembers={teamMembers} 
                onRefresh={loadDashboardData}
              />
            </TabsContent>
            
            <TabsContent value="insights">
              <InsightsTabContent 
                insights={insights} 
                onGenerateInsights={handleGenerateInsights} 
              />
            </TabsContent>
            
            <TabsContent value="certification">
              <CertificationTabContent 
                averageScore={summaryStats.averageScore}
                onSendCertificate={handleSendCertificate}
                onExportPDF={handleExportPDF}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAdminDashboard;
