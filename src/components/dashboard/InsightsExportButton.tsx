import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileDown, FileText, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { exportService } from '@/services/team/exportService';
import { exportUtils } from '@/utils/exportUtils';

interface InsightsExportButtonProps {
  data?: any[];
  exportTitle?: string;
  department?: string;
  variant?: 'default' | 'outline' | 'secondary';
  disabled?: boolean;
}

const InsightsExportButton: React.FC<InsightsExportButtonProps> = ({
  data = [],
  exportTitle = 'Insights',
  department,
  variant = 'outline',
  disabled = false
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      // If we have data passed directly, use it
      if (data && data.length > 0) {
        exportUtils.exportDataToCSV(data, `${exportTitle.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}`);
        
        toast({
          title: "Export Successful",
          description: `${exportTitle} exported as CSV`,
        });
      } 
      // Otherwise use the export service
      else {
        const result = await exportService.exportTeamDataCSV(department);
        
        if (result.success && result.data) {
          // Create and download CSV file
          const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('download', `${exportTitle.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast({
            title: "Export Successful",
            description: `${exportTitle} exported as CSV`,
          });
        } else {
          throw new Error(result.error || 'Export failed');
        }
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export Failed",
        description: "Could not export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // For demo purposes, we'll just mock the PDF export
      setTimeout(() => {
        toast({
          title: "Export Successful",
          description: `${exportTitle} exported as PDF (Demo)`,
        });
        setIsExporting(false);
      }, 1500);
      
      // In a real implementation:
      // const result = await exportService.exportToPDF(department);
      // if (result.success && result.pdfUrl) {
      //   window.open(result.pdfUrl, '_blank');
      // } else {
      //   throw new Error(result.error || 'Export failed');
      // }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size="sm" 
          className="flex items-center gap-2"
          disabled={disabled || isExporting}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV} disabled={isExporting}>
          <FileDown className="h-4 w-4 mr-2" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting}>
          <FileText className="h-4 w-4 mr-2" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InsightsExportButton;
