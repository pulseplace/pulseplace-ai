
import React, { useState } from 'react';
import { Download, FileDown, Check, Loader2 } from 'lucide-react';
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface ExportButtonProps extends Omit<ButtonProps, 'onClick'> {
  filename?: string;
  formats?: Array<'pdf' | 'csv' | 'excel' | 'json'>;
  onExport?: (format: string) => Promise<void>;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  filename = 'dashboard-export',
  formats = ['pdf', 'csv', 'excel', 'json'],
  onExport,
  ...props
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<string | null>(null);

  const handleExport = async (format: string) => {
    try {
      setIsExporting(true);
      setExportFormat(format);
      
      if (onExport) {
        await onExport(format);
      } else {
        // Default export simulation
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      toast.success(`Export complete`, {
        description: `Your ${format.toUpperCase()} file has been downloaded successfully.`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed', {
        description: 'There was a problem generating your export. Please try again.'
      });
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };

  // Format label mapping
  const formatLabels: Record<string, string> = {
    pdf: 'PDF Document',
    csv: 'CSV Spreadsheet',
    excel: 'Excel Spreadsheet',
    json: 'JSON Data'
  };

  // Format icon mapping
  const getFormatIcon = (format: string) => {
    if (isExporting && exportFormat === format) {
      return <Loader2 className="h-4 w-4 mr-2 animate-spin" />;
    }
    return <FileDown className="h-4 w-4 mr-2" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" {...props}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {formats.map((format) => (
          <DropdownMenuItem
            key={format}
            disabled={isExporting}
            onClick={() => handleExport(format)}
          >
            {getFormatIcon(format)}
            <span>{formatLabels[format] || format.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
