
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
  console.log('Processing format:', format, typeof format);
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
      // Ensure we explicitly handle any unexpected values
      if (typeof format !== 'string') {
        console.warn('Unexpected format type:', format);
        return 'Unknown';
      }
      return String(format).toUpperCase();
  }
};
