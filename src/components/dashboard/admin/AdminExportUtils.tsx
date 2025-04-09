
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ExportButtonsProps {
  onExportCSV: () => Promise<void>;
  onExportPDF: () => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
}

const AdminExportButtons: React.FC<ExportButtonsProps> = ({
  onExportCSV,
  onExportPDF,
  isLoading,
  disabled = false
}) => {
  const { toast } = useToast();
  
  const handleExport = async (type: 'csv' | 'pdf') => {
    if (disabled) {
      toast({
        title: "Export unavailable",
        description: "Please wait for data to load before exporting",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (type === 'csv') {
        await onExportCSV();
      } else {
        await onExportPDF();
      }
    } catch (error) {
      console.error(`Error during ${type.toUpperCase()} export:`, error);
      toast({
        title: "Export Failed",
        description: `There was an error exporting to ${type.toUpperCase()}. Please try again.`,
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('csv')}
        disabled={isLoading || disabled}
        className="text-xs flex items-center"
      >
        <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">Export CSV</span>
        <span className="sm:hidden">CSV</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('pdf')}
        disabled={isLoading || disabled}
        className="text-xs flex items-center"
      >
        <FileText className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">Export PDF</span>
        <span className="sm:hidden">PDF</span>
      </Button>
    </div>
  );
};

export default AdminExportButtons;
