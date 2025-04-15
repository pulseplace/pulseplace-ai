
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Explicitly define the export formats as a const type
const EXPORT_FORMATS = ['csv', 'pdf', 'excel', 'json'] as const;
type ExportFormat = typeof EXPORT_FORMATS[number];

interface ExportButtonProps {
  filename?: string;
  formats?: ExportFormat[];
  data?: any;
  onExport?: (format: ExportFormat) => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  buttonText?: string;
  showIcon?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  filename = 'export',
  formats = ['csv', 'pdf'],
  data,
  onExport,
  disabled = false,
  variant = 'outline',
  size = 'sm',
  className = '',
  buttonText,
  showIcon = true
}) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async (format: ExportFormat) => {
    try {
      setIsExporting(true);
      
      // If custom export handler is provided, use it
      if (onExport) {
        await onExport(format);
      } else {
        // Default export behavior - show toast and simulate download
        toast({
          title: `Exporting as ${format.toUpperCase()}`,
          description: `Your file will download shortly: ${filename}.${format}`
        });
        
        // Simulate delay for the export process
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      toast({
        title: "Export Successful",
        description: `Your data has been exported as ${filename}.${format}`
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "There was a problem exporting your data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const getFormatIcon = (format: ExportFormat) => {
    switch (format) {
      case 'csv':
      case 'excel':
        return <FileSpreadsheet className="h-4 w-4 mr-2" />;
      case 'pdf':
        return <FileText className="h-4 w-4 mr-2" />;
      case 'json':
        return <FileText className="h-4 w-4 mr-2" />;
      default:
        return <Download className="h-4 w-4 mr-2" />;
    }
  };
  
  const getFormatLabel = (format: ExportFormat) => {
    switch (format) {
      case 'csv':
        return 'CSV';
      case 'pdf':
        return 'PDF';
      case 'excel':
        return 'Excel';
      case 'json':
        return 'JSON';
      default:
        return format.toUpperCase();
    }
  };
  
  // If there's only one format, use a simple button
  if (formats.length === 1) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={() => handleExport(formats[0])}
        disabled={disabled || isExporting}
        className={className}
      >
        {showIcon && (getFormatIcon(formats[0]))}
        {buttonText || `Export ${getFormatLabel(formats[0])}`}
      </Button>
    );
  }
  
  // Otherwise, use a dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled || isExporting}
          className={className}
        >
          {showIcon && <Download className="h-4 w-4 mr-2" />}
          {buttonText || "Export"}
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {formats.map((format) => (
          <DropdownMenuItem 
            key={format} 
            onClick={() => handleExport(format)}
            className="cursor-pointer"
          >
            {getFormatIcon(format)}
            Export as {getFormatLabel(format)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
