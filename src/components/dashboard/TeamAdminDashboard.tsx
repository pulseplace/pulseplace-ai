
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart2, 
  Download, 
  Users, 
  Calendar, 
  Filter, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { emailService } from '@/services/emailService';
import { insightsService } from '@/services/insightsService';
import TeamAdminFilters from './admin/TeamAdminFilters';
import TeamExportOptions from './admin/TeamExportOptions';
import TeamSummaryStats from './admin/TeamSummaryStats';

// Mock data for demonstration
const DEMO_DEPARTMENTS = [
  "All Departments", "Engineering", "Marketing", "Sales", "Customer Support", "Human Resources"
];

const PULSE_CATEGORIES = [
  "all", "trust", "engagement", "culture", "growth", "wellbeing"
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
  const [pulseCategoryFilter, setPulseCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
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
    const pendingMembers = teamMembers.filter(m => m.surveyStatus === 'pending');
    if (pendingMembers.length === 0) {
      toast({
        title: "No Reminders Needed",
        description: "There are no team members with pending surveys.",
      });
      return;
    }
    
    setIsRefreshing(true);
    try {
      // In a real implementation, send actual reminder emails
      // For demo, just show success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Reminders Sent",
        description: `Reminder emails sent to ${pendingMembers.length} team members.`,
      });
      
      // Update local state to reflect reminders sent
      const updatedMembers = teamMembers.map(member => {
        if (member.surveyStatus === 'pending') {
          return { ...member, lastActive: 'Just now' };
        }
        return member;
      });
      
      setTeamMembers(updatedMembers);
    } catch (error) {
      console.error('Error sending reminders:', error);
      toast({
        title: "Error",
        description: "Failed to send reminder emails. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleBulkInvite = () => {
    // Navigate to bulk invite page or open modal
    toast({
      title: "Bulk Invite",
      description: "The bulk invite feature will be available in the next update.",
    });
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
  
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <Skeleton className="h-40" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        
        <Skeleton className="h-96" />
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team Admin Dashboard</h2>
          <p className="text-gray-500">Manage your team's PulseScore™ certification process</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <TeamExportOptions 
            onExportCSV={handleExportCSV}
            onExportPDF={handleExportPDF}
            dataAvailable={teamMembers.length > 0}
          />
          
          <Button onClick={handleRefreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {/* Advanced filters */}
      <TeamAdminFilters
        department={department}
        setDepartment={setDepartment}
        pulseCategoryFilter={pulseCategoryFilter}
        setPulseCategoryFilter={setPulseCategoryFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={handleRefreshData}
        departments={DEMO_DEPARTMENTS}
        isRefreshing={isRefreshing}
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
              <div className="rounded-md border">
                <div className="bg-slate-50 p-4 grid grid-cols-6 gap-4 font-medium">
                  <div className="col-span-2">Name / Email</div>
                  <div>Department</div>
                  <div>Status</div>
                  <div>Last Active</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 grid grid-cols-6 gap-4 items-center">
                      <div className="col-span-2">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                      <div>{member.department}</div>
                      <div>
                        {member.surveyStatus === 'completed' && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Completed
                          </span>
                        )}
                        {member.surveyStatus === 'pending' && (
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                            Pending
                          </span>
                        )}
                        {member.surveyStatus === 'not_sent' && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            Not Sent
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{member.lastActive}</div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              {insights ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Executive Summary</h3>
                    <p className="text-gray-700">{insights.summary}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Key Strengths</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {insights.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-gray-700">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Improvement Areas</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {insights.opportunities.map((opportunity: string, index: number) => (
                          <li key={index} className="text-gray-700">{opportunity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Recommended Actions</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {insights.actionItems.map((action: string, index: number) => (
                        <li key={index} className="text-gray-700">{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Insights Available</h3>
                  <p className="text-gray-500 mb-4">
                    There are no AI-generated insights available yet. Complete surveys to generate insights.
                  </p>
                  <Button onClick={() => insightsService.generateTestInsight().then(setInsights)}>
                    Generate Test Insights
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="certification">
              <div className="text-center py-8">
                <div className="mb-8 mx-auto max-w-md p-6 border rounded-lg shadow-sm bg-white">
                  <h3 className="text-xl font-bold mb-4">PulseScore™ Certification</h3>
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-8 mb-4">
                    <div className="text-3xl font-bold mb-1">{summaryStats.averageScore}/100</div>
                    <div className="font-medium">
                      {summaryStats.averageScore >= 80 ? 'Pulse Certified™' : 'In Progress'}
                    </div>
                  </div>
                  <p className="text-gray-500 mb-2">Tayana Solutions</p>
                  <p className="text-gray-500 text-sm">Valid until April 8, 2026</p>
                </div>
                
                <div className="space-x-2">
                  <Button onClick={handleSendCertificate}>
                    <Download className="h-4 w-4 mr-2" />
                    Send Certificate
                  </Button>
                  <Button variant="outline" onClick={handleExportPDF}>
                    <FileText className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAdminDashboard;
