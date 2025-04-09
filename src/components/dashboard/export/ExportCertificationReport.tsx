
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileSpreadsheet, Download } from 'lucide-react';
import { exportService } from '@/services/team/exportService';
import { useToast } from "@/hooks/use-toast";

const ExportCertificationReport: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [exportType, setExportType] = useState('summary');
  
  const handleExportPDF = async () => {
    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Export Certification Reports</h2>
        <p className="text-gray-600">
          Export your certification data in different formats for presentations, analysis, or record keeping.
        </p>
      </div>
      
      <Tabs defaultValue="summary" value={exportType} onValueChange={setExportType}>
        <TabsList className="w-full">
          <TabsTrigger value="summary" className="flex-1">Summary Report</TabsTrigger>
          <TabsTrigger value="detailed" className="flex-1">Detailed Report</TabsTrigger>
          <TabsTrigger value="raw" className="flex-1">Raw Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Certification Summary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="block mb-2">Report Information</Label>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      The summary report includes your organization's PulseScore™, 
                      certification tier, and high-level scores across key categories. 
                      This is ideal for sharing with stakeholders or including in presentations.
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Export Format</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={handleExportPDF}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-pulse-blue hover:bg-pulse-blue/90"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Export as PDF</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detailed" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Certification Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="block mb-2">Report Information</Label>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      The detailed report includes comprehensive insights and metrics, 
                      including theme-by-theme analysis, department breakdowns, and recommendations. 
                      This is ideal for internal review and improvement planning.
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Export Format</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={handleExportPDF}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-pulse-blue hover:bg-pulse-blue/90"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Export as PDF</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="raw" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Raw Certification Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="block mb-2">Data Information</Label>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      Export raw certification data in CSV format for custom analysis, 
                      integration with other systems, or archiving. This includes all metrics, 
                      scores, and timestamps in a tabular format.
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Export Format</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={handleExportCSV}
                      disabled={isLoading}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      <span>Export as CSV</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportCertificationReport;
