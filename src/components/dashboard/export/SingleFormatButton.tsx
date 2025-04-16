
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExportFormat } from './types';
import { getFormatIcon, getFormatLabel } from './formatUtils';

interface SingleFormatButtonProps {
  format: ExportFormat;
  onExport: () => void;
  disabled: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  buttonText?: string;
  showIcon?: boolean;
}

export const SingleFormatButton = ({
  format,
  onExport,
  disabled,
  variant = 'outline',
  size = 'sm',
  className = '',
  buttonText,
  showIcon = true
}: SingleFormatButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onExport}
      disabled={disabled}
      className={className}
    >
      {showIcon && getFormatIcon(format)}
      {buttonText || `Export ${getFormatLabel(format)}`}
    </Button>
  );
};
