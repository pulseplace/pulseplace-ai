
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import SurveyList from '@/components/dashboard/SurveyList';
import AdvancedAnalytics from '@/components/dashboard/AdvancedAnalytics';
import AdminHRDashboard from '@/components/dashboard/admin/AdminHRDashboard';
import TeamAdminDashboard from '@/components/dashboard/TeamAdminDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { exportService } from '@/services/team/exportService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationJourney from '@/components/dashboard/CertificationJourney';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleExportPDF = async () => {
    try {
      const result = await exportService.exportToPDF();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to export PDF');
      }
      
      toast({
        title: "PDF Export Complete",
        description: "Your PDF certification report has been generated and downloaded.",
      });
    } catch (error: any) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export report to PDF",
        variant: "destructive"
      });
    }
  };

  const handleExportCSV = async () => {
    try {
      const result = await exportService.exportTeamDataCSV();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to export CSV');
      }
      
      // Create and download the CSV file
      const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `pulseplace-certification-${new Date().toISOString().split('T')[0]}.csv`);
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
    }
  };

  return (
    <DashboardLayout>
      <DashboardProvider>
        <div className="container mx-auto py-6 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">PulsePlace Dashboard</h1>
          <p className="text-gray-600 mb-6">Your organization's engagement insights and certification status.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Certification Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Download your certification report or data for presentations, analysis, or record keeping.
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button 
                    onClick={handleExportPDF} 
                    className="flex items-center gap-2 bg-pulse-gradient hover:opacity-90"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Export PDF Certification</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleExportCSV}
                    className="flex items-center gap-2"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Export CSV Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/share-certification')}>
                    <Download className="mr-2 h-4 w-4" />
                    Share Certification Badge
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/badge-customization')}>
                    <Download className="mr-2 h-4 w-4" />
                    Customize Badge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <CertificationJourney className="mb-8" />
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="surveys">Surveys</TabsTrigger>
              <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
              <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
              <TabsTrigger value="team">Team Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <DashboardOverview />
            </TabsContent>
            
            <TabsContent value="surveys">
              <SurveyList />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AdvancedAnalytics />
            </TabsContent>
            
            <TabsContent value="admin">
              <AdminHRDashboard />
            </TabsContent>
            
            <TabsContent value="team">
              <TeamAdminDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardProvider>
    </DashboardLayout>
  );
};

export default Dashboard;
