
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper functions for exporting data to various formats
 */
export const exportUtils = {
  /**
   * Exports data to CSV format and triggers download
   * @param data Array of objects to export
   * @param filename Filename for the downloaded file
   */
  exportDataToCSV: (data: any[], filename: string): void => {
    if (!data || !data.length) {
      throw new Error('No data to export');
    }
    
    // Get headers from the first item
    const headers = Object.keys(data[0]);
    
    // Convert data to CSV format
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row => {
        return headers.map(header => {
          const cellValue = row[header] === null || row[header] === undefined ? '' : row[header];
          // Escape quotes and wrap values with quotes
          return `"${String(cellValue).replace(/"/g, '""')}"`;
        }).join(',');
      })
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  
  /**
   * Exports data to PDF format using the Supabase Edge Function
   * @param payload Data to include in the PDF
   * @param reportType Type of report for naming
   */
  exportToPDF: async (payload: any, reportType: string): Promise<{success: boolean, url?: string, error?: string}> => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-pdf-report', {
        body: payload
      });
      
      if (error) throw error;
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate PDF');
      }
      
      // If we have a URL, open it in a new tab
      if (data.url) {
        window.open(data.url, '_blank');
      }
      
      return {
        success: true,
        url: data.url
      };
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      return {
        success: false,
        error: error.message || 'An unknown error occurred'
      };
    }
  }
};
