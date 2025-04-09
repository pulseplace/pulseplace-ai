
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { exportService } from '@/services/team/exportService';
import { useToast } from "@/hooks/use-toast";

export interface TeamDataExportProps {
  teamMembersCount: number;
  department?: string;
}

const TeamDataExport: React.FC<TeamDataExportProps> = ({ 
  teamMembersCount,
  department 
}) => {
  const { toast } = useToast();
  
  const handleExportPDF = async () => {
    try {
      const result = await exportService.exportToPDF(department);
      
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
      const result = await exportService.exportTeamDataCSV(department);
      
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
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={handleExportPDF}
      >
        <FileText className="h-4 w-4" />
        <span>Export PDF</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={handleExportCSV}
      >
        <FileSpreadsheet className="h-4 w-4" />
        <span>Export CSV ({teamMembersCount})</span>
      </Button>
    </div>
  );
};

export default TeamDataExport;
