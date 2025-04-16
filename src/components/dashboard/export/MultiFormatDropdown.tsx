
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from 'lucide-react';
import { ExportFormat } from './types';
import { getFormatIcon, getFormatLabel } from './formatUtils';

interface MultiFormatDropdownProps {
  formats: ExportFormat[];
  onExport: (format: ExportFormat) => void;
  disabled: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  buttonText?: string;
  showIcon?: boolean;
}

export const MultiFormatDropdown = ({
  formats,
  onExport,
  disabled,
  variant = 'outline',
  size = 'sm',
  className = '',
  buttonText,
  showIcon = true
}: MultiFormatDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
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
            onClick={() => onExport(format)}
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
