
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { teamAdminService } from '@/services/teamAdminService';
import TeamExportOptions from './TeamExportOptions';

interface TeamDataExportProps {
  teamMembersCount: number;
  department?: string;
}

const TeamDataExport: React.FC<TeamDataExportProps> = ({ teamMembersCount, department }) => {
  const { toast } = useToast();
  
  const handleExportCSV = async () => {
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
    }
  };
  
  const handleExportPDF = async () => {
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
    }
  };

  return (
    <TeamExportOptions
      onExportCSV={handleExportCSV}
      onExportPDF={handleExportPDF}
      dataAvailable={teamMembersCount > 0}
    />
  );
};

export default TeamDataExport;
