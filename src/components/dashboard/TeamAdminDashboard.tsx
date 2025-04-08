import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { emailService } from '@/services/emailService';
import { insightsService } from '@/services/insightsService';
import TeamAdminFilters from './admin/TeamAdminFilters';
import TeamSummaryStats from './admin/TeamSummaryStats';
import LoadingDashboard from './admin/LoadingDashboard';
import DashboardHeader from './admin/DashboardHeader';
import TeamTabContent from './admin/TeamTabContent';
import InsightsTabContent from './admin/InsightsTabContent';
import CertificationTabContent from './admin/CertificationTabContent';
import { DateRangeFilter } from '@/components/ui/date-range-picker';

// Mock data for demonstration
const DEMO_DEPARTMENTS = [
  "All Departments", "Engineering", "Marketing", "Sales", "Customer Support", "Human Resources"
];

interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  surveyStatus: 'completed' | 'pending' | 'not_sent';
  lastActive: string;
}

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
  
  // Simulated data loading
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, fetch data from your API with applied filters
      // For now, simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock team members
      const mockTeamMembers: TeamMember[] = [];
      const departments = department === 'All Departments' 
        ? DEMO_DEPARTMENTS.filter(d => d !== 'All Departments') 
        : [department];
      
      departments.forEach(dept => {
        const memberCount = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < memberCount; i++) {
          mockTeamMembers.push({
            id: `user-${dept}-${i}`,
            name: `Team Member ${i+1}`,
            email: `employee${i+1}@tayanasolutions.com`,
            department: dept,
            surveyStatus: ['completed', 'pending', 'not_sent'][Math.floor(Math.random() * 3)] as any,
            lastActive: `${Math.floor(Math.random() * 24)} hours ago`
          });
        }
      });
      
      setTeamMembers(mockTeamMembers);
      
      // Calculate summary statistics
      const completed = mockTeamMembers.filter(m => m.surveyStatus === 'completed').length;
      const pending = mockTeamMembers.filter(m => m.surveyStatus === 'pending').length;
      const participationRate = Math.round((completed / mockTeamMembers.length) * 100);
      
      // Generate random theme scores that are somewhat realistic
      const baseScore = 65 + Math.floor(Math.random() * 20);
      const themeScores = [
        { theme: "Trust & Safety", score: baseScore + Math.floor(Math.random() * 15) },
        { theme: "Engagement", score: baseScore - 5 + Math.floor(Math.random() * 15) },
        { theme: "Culture", score: baseScore + 2 + Math.floor(Math.random() * 15) },
        { theme: "Growth & Development", score: baseScore - 8 + Math.floor(Math.random() * 15) },
        { theme: "Wellbeing", score: baseScore + 5 + Math.floor(Math.random() * 15) },
      ];
      
      // Calculate average score
      const averageScore = Math.round(
        themeScores.reduce((sum, theme) => sum + theme.score, 0) / themeScores.length
      );
      
      setSummaryStats({
        participationRate,
        averageScore,
        completedSurveys: completed,
        pendingSurveys: pending,
        themeScores
      });
      
      // Try to generate insights
      try {
        // Only show loading state for initial load, not for refresh
        if (!insights) {
          const generatedInsights = await insightsService.generateTestInsight();
          setInsights(generatedInsights);
        }
      } catch (insightError) {
        console.error("Failed to generate insights:", insightError);
        // Don't set error state for insights failures
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
  
  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Your CSV export is being prepared and will download shortly.",
    });
    
    // Simulate CSV export
    setTimeout(() => {
      // Generate CSV content from team members and statistics
      const csvHeader = "Name,Email,Department,Status,Last Active\n";
      const csvRows = teamMembers.map(member => 
        `"${member.name}","${member.email}","${member.department}","${member.surveyStatus}","${member.lastActive}"`
      ).join("\n");
      const csvContent = csvHeader + csvRows;
      
      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `tayana-team-pulse-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };
  
  const handleExportPDF = () => {
    toast({
      title: "PDF Export Started",
      description: "Your PDF report is being generated and will download shortly.",
    });
    
    // In a real implementation, we would use a PDF library like jsPDF
    // For now, simulate the download
    setTimeout(() => {
      toast({
        title: "PDF Generated",
        description: "Your report has been downloaded",
      });
      
      // In a real implementation, we would generate and download an actual PDF
      // This is just a placeholder for demonstration
    }, 1500);
  };
  
  const handleSendReminders = async () => {
    // ... keep existing code (for the reminder functionality)
  };
  
  const handleBulkInvite = () => {
    // ... keep existing code (for bulk invite functionality)
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
      // In a real implementation, send an actual certificate email
      // For demo, just show success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Prepare certification email
      const certificateHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">Tayana Solutions PulseScore™ Certification</h1>
          
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
            <p style="font-size: 18px; font-weight: bold; text-align: center;">
              Overall Score: ${summaryStats.averageScore}/100 - Pulse Certified™
            </p>
          </div>
          
          <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Executive Summary</h2>
          <p>${insights.summary}</p>
          
          <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Key Strengths</h2>
          <ul>
            ${insights.strengths.map((strength: string) => `<li>${strength}</li>`).join('')}
          </ul>
          
          <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Opportunities</h2>
          <ul>
            ${insights.opportunities.map((opportunity: string) => `<li>${opportunity}</li>`).join('')}
          </ul>
          
          <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Recommended Actions</h2>
          <ul>
            ${insights.actionItems.map((action: string) => `<li>${action}</li>`).join('')}
          </ul>
          
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0; text-align: center;">
            <p style="font-style: italic; color: #4f46e5;">
              ${insights.certificateText}
            </p>
            <p style="margin-top: 15px; font-size: 12px;">
              Issued on ${new Date().toLocaleDateString()} | Valid for 12 months
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            This certification is issued by PulsePlace.ai based on employee feedback data.
          </p>
        </div>
      `;
      
      // Send certificate email
      await emailService.sendEmail({
        to: "hr@tayanasolutions.com",
        subject: "Tayana Solutions - PulseScore™ Certification",
        html: certificateHtml,
        fromName: "PulsePlace.ai Certification",
        fromEmail: "certification@pulseplace.ai"
      });
      
      toast({
        title: "Certificate Sent",
        description: "The certification email has been sent successfully.",
      });
    } catch (error) {
      console.error('Error sending certificate:', error);
      toast({
        title: "Error",
        description: "Failed to send certification email. Please try again.",
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
      
      {/* Advanced filters */}
      <TeamAdminFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        department={department}
        setDepartment={setDepartment}
        pulseTheme={pulseTheme}
        setPulseTheme={setPulseTheme}
        onClose={() => handleRefreshData()}
      />
      
      {/* Summary statistics */}
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
              <TeamTabContent teamMembers={teamMembers} />
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
