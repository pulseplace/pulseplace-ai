
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';

export const exportService = {
  async exportTeamDataCSV(departmentFilter?: string): Promise<{success: boolean, data?: string, error?: string}> {
    try {
      console.log(`Exporting team data to CSV. Department filter: ${departmentFilter || 'All Departments'}`);
      
      let teamMembersQuery = collection(db, 'team_members');
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        teamMembersQuery = query(
          collection(db, 'team_members'),
          where('department', '==', departmentFilter)
        );
      }
      
      const teamMembersSnapshot = await getDocs(teamMembersQuery);
      const data = teamMembersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
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
          `"${member.name || ''}"`,
          `"${member.email || ''}"`,
          `"${member.department || 'Unassigned'}"`,
          `"${member.surveyStatus || 'Not Started'}"`,
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
      
      // In a Firebase implementation, this would call a Cloud Function
      // For now, we'll mock the response
      const pdfUrl = `https://firebasestorage.googleapis.com/v0/b/pulseplace-ai.appspot.com/o/reports%2F${Date.now()}_report.pdf?alt=media`;
      
      return {
        success: true,
        pdfUrl: pdfUrl
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
