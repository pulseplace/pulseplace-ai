
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
  CheckCircle 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { emailService } from '@/services/emailService';
import { insightsService } from '@/services/insightsService';

// Mock data for demonstration
const DEMO_DEPARTMENTS = [
  "All Departments", "Engineering", "Marketing", "Sales", "Customer Support", "Human Resources"
];

const DEMO_TIME_PERIODS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "6m", label: "Last 6 months" },
  { value: "1y", label: "Last year" },
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
  const [timePeriod, setTimePeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [insights, setInsights] = useState<any>(null);
  
  // Simulated data loading
  useEffect(() => {
    loadDashboardData();
  }, [department, timePeriod]);
  
  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, fetch data from your API
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
        description: "Dashboard data has been updated",
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being prepared and will download shortly.",
    });
    
    // Simulate export download
    setTimeout(() => {
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent("Team data export"));
      element.setAttribute("download", `team-data-${new Date().toISOString().split('T')[0]}.csv`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
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
              Overall Score: 82/100 - Pulse Certified™
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
        
        <Skeleton className="h-96" />
      </div>
    );
  }
  
  // Calculate stats
  const completedCount = teamMembers.filter(m => m.surveyStatus === 'completed').length;
  const pendingCount = teamMembers.filter(m => m.surveyStatus === 'pending').length;
  const notSentCount = teamMembers.filter(m => m.surveyStatus === 'not_sent').length;
  const completionRate = Math.round((completedCount / (teamMembers.length || 1)) * 100);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team Admin Dashboard</h2>
          <p className="text-gray-500">Manage your team's PulseScore™ certification process</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_DEPARTMENTS.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_TIME_PERIODS.map(period => (
                <SelectItem key={period.value} value={period.value}>{period.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleExportData} disabled={isRefreshing}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Survey Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="text-muted-foreground">{completedCount}/{teamMembers.length} team members</div>
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pulse-gradient rounded-full" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-center">
              <div>
                <div className="font-bold">{completedCount}</div>
                <div className="text-green-600">Completed</div>
              </div>
              <div>
                <div className="font-bold">{pendingCount}</div>
                <div className="text-amber-600">Pending</div>
              </div>
              <div>
                <div className="font-bold">{notSentCount}</div>
                <div className="text-gray-500">Not Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">PulseScore™</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">82/100</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                Pulse Certified™
              </span>
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pulse-gradient rounded-full" 
                style={{ width: '82%' }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-center">
              <div>
                <div className="font-bold">85</div>
                <div className="text-purple-600">Trust & Safety</div>
              </div>
              <div>
                <div className="font-bold">78</div>
                <div className="text-blue-600">Engagement</div>
              </div>
              <div>
                <div className="font-bold">84</div>
                <div className="text-indigo-600">Culture</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button onClick={handleSendReminders} variant="outline" className="justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Send Reminders ({pendingCount})
              </Button>
              <Button onClick={handleBulkInvite} variant="outline" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                Bulk Invite Team
              </Button>
              <Button onClick={handleSendCertificate} variant="outline" className="justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Send Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
                    <div className="text-3xl font-bold mb-1">82/100</div>
                    <div className="font-medium">Pulse Certified™</div>
                  </div>
                  <p className="text-gray-500 mb-2">Tayana Solutions</p>
                  <p className="text-gray-500 text-sm">Valid until April 8, 2026</p>
                </div>
                
                <div className="space-x-2">
                  <Button onClick={handleSendCertificate}>
                    <Download className="h-4 w-4 mr-2" />
                    Send Certificate
                  </Button>
                  <Button variant="outline" onClick={handleExportData}>
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
