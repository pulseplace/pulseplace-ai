
import { ExportFormat } from './types';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';
import React from 'react';

export const getFormatIcon = (format: ExportFormat) => {
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

export const getFormatLabel = (format: ExportFormat) => {
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
      // Add explicit type assertion or handle default case differently
      // By casting to string we ensure TypeScript knows format is a string
      return String(format).toUpperCase();
  }
};
