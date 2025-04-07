
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FilePdf } from 'lucide-react';
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
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('csv')}
        className="text-xs"
      >
        <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('excel')}
        className="text-xs"
      >
        <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
        Excel
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport('pdf')}
        className="text-xs"
      >
        <FilePdf className="h-3.5 w-3.5 mr-1" />
        PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({
          title: "Dashboard Saved",
          description: "Custom dashboard configuration saved"
        })}
        className="text-xs"
      >
        <FilePdf className="h-3.5 w-3.5 mr-1" />
        Save
      </Button>
    </div>
  );
};

export default ExportButtons;
