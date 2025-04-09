
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Download, FileSpreadsheet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TeamExportOptionsProps {
  onExportCSV: () => void;
  onExportPDF: () => void;
  dataAvailable: boolean;
  className?: string;
}

const TeamExportOptions: React.FC<TeamExportOptionsProps> = ({
  onExportCSV,
  onExportPDF,
  dataAvailable,
  className
}) => {
  const { toast } = useToast();
  
  const handleExport = (type: 'csv' | 'pdf') => {
    if (!dataAvailable) {
      toast({
        title: "No Data Available",
        description: "There is no data to export. Apply filters and try again.",
        variant: "destructive"
      });
      return;
    }
    
    if (type === 'csv') {
      onExportCSV();
    } else {
      onExportPDF();
    }
  };
  
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('csv')}
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
        className="text-xs flex items-center"
      >
        <FileText className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">Export PDF</span>
        <span className="sm:hidden">PDF</span>
      </Button>
    </div>
  );
};

export default TeamExportOptions;
