
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ExportButtonsProps {
  className?: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ className }) => {
  const { toast } = useToast();
  
  const handleExport = (format: string) => {
    toast({
      title: `Export as ${format.toUpperCase()}`,
      description: `Analytics data exported as ${format.toUpperCase()} file`
    });
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className || ''}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('csv')}
        className="text-xs flex items-center"
      >
        <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">CSV</span>
        <span className="sm:hidden">CSV</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('excel')}
        className="text-xs flex items-center"
      >
        <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">Excel</span>
        <span className="sm:hidden">XLS</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('pdf')}
        className="text-xs flex items-center"
      >
        <FileText className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">PDF</span>
        <span className="sm:hidden">PDF</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({
          title: "Dashboard Saved",
          description: "Custom dashboard configuration saved"
        })}
        className="text-xs flex items-center"
      >
        <Save className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">Save</span>
        <span className="sm:hidden">Save</span>
      </Button>
    </div>
  );
};

export default ExportButtons;
