
export const EXPORT_FORMATS = ['csv', 'pdf', 'excel', 'json'] as const;
export type ExportFormat = (typeof EXPORT_FORMATS)[number];

export interface ExportButtonProps {
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
