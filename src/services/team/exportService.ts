
import { supabase } from '@/integrations/supabase/client';

export const exportService = {
  async exportTeamDataCSV(departmentFilter?: string): Promise<{success: boolean, data?: string, error?: string}> {
    try {
      console.log(`Exporting team data to CSV. Department filter: ${departmentFilter || 'All Departments'}`);
      
      let query = supabase
        .from('team_members')
        .select('*');
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        query = query.eq('department', departmentFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        console.warn('No data found to export');
        return { 
          success: false, 
          error: 'No data to export' 
        };
      }
      
      console.log(`Found ${data.length} team members to export`);
      
      // Convert to CSV
      const headers = ['Name', 'Email', 'Department', 'Survey Status', 'Last Active'];
      const csvRows = [headers.join(',')];
      
      data.forEach(member => {
        const row = [
          `"${member.name}"`,
          `"${member.email}"`,
          `"${member.department || 'Unassigned'}"`,
          `"${member.surveyStatus}"`,
          `"${member.lastActive ? new Date(member.lastActive).toLocaleString() : 'Never'}"`
        ];
        csvRows.push(row.join(','));
      });
      
      const csvString = csvRows.join('\n');
      console.log(`CSV export completed with ${csvRows.length - 1} data rows`);
      
      return {
        success: true,
        data: csvString
      };
    } catch (error: any) {
      console.error('Error exporting team data:', error);
      return {
        success: false,
        error: error.message || 'Failed to export team data'
      };
    }
  },
  
  async exportToPDF(departmentFilter?: string): Promise<{success: boolean, pdfUrl?: string, error?: string}> {
    try {
      console.log(`Generating PDF report for department: ${departmentFilter || 'All Departments'}`);
      
      // Call the edge function to generate the PDF
      const { data, error } = await supabase.functions.invoke('generate-pdf-report', {
        body: {
          departmentFilter,
          companyName: "Tayana Solutions",
          // The rest of the required data will be fetched in the edge function
        }
      });
      
      if (error) throw error;
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate PDF');
      }
      
      console.log(`PDF report generated successfully: ${data.url}`);
      
      return {
        success: true,
        pdfUrl: data.url
      };
    } catch (error: any) {
      console.error('Error exporting to PDF:', error);
      return {
        success: false,
        error: error.message || 'Failed to export PDF'
      };
    }
  }
};
