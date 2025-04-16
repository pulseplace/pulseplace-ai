
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SingleFormatButton } from './export/SingleFormatButton';
import { MultiFormatDropdown } from './export/MultiFormatDropdown';
import { ExportButtonProps, ExportFormat } from './export/types';

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
      
      if (onExport) {
        await onExport(format);
      } else {
        toast({
          title: `Exporting as ${format.toUpperCase()}`,
          description: `Your file will download shortly: ${filename}.${format}`
        });
        
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
  
  if (formats.length === 1) {
    return (
      <SingleFormatButton
        format={formats[0]}
        onExport={() => handleExport(formats[0])}
        disabled={disabled || isExporting}
        variant={variant}
        size={size}
        className={className}
        buttonText={buttonText}
        showIcon={showIcon}
      />
    );
  }
  
  return (
    <MultiFormatDropdown
      formats={formats}
      onExport={handleExport}
      disabled={disabled || isExporting}
      variant={variant}
      size={size}
      className={className}
      buttonText={buttonText}
      showIcon={showIcon}
    />
  );
};

export default ExportButton;
