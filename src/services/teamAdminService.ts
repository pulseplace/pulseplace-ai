
import { supabase } from '@/integrations/supabase/client';
import { DateRangeFilter } from '@/components/ui/date-range-picker';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  surveyStatus: 'completed' | 'pending' | 'not_sent';
  lastActive: string;
}

export interface SummaryStats {
  participationRate: number;
  averageScore: number;
  completedSurveys: number;
  pendingSurveys: number;
  themeScores: {
    theme: string;
    score: number;
  }[];
}

export const teamAdminService = {
  async getTeamMembers(departmentFilter?: string): Promise<TeamMember[]> {
    try {
      let query = supabase
        .from('team_members')
        .select('*');
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        query = query.eq('department', departmentFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Map database fields to our TeamMember interface
      return (data || []).map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        department: member.department || 'Unassigned',
        surveyStatus: member.surveyStatus as 'completed' | 'pending' | 'not_sent',
        lastActive: member.lastActive ? new Date(member.lastActive).toLocaleString() : 'Never'
      }));
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  },
  
  async getSummaryStats(
    departmentFilter?: string, 
    pulseThemeFilter?: string,
    dateRange?: DateRangeFilter
  ): Promise<SummaryStats> {
    try {
      // First get team members to calculate participation
      let membersQuery = supabase
        .from('team_members')
        .select('id, surveyStatus');
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        membersQuery = membersQuery.eq('department', departmentFilter);
      }
      
      const { data: membersData, error: membersError } = await membersQuery;
      
      if (membersError) throw membersError;
      
      const totalMembers = membersData?.length || 0;
      const completedSurveys = membersData?.filter(m => m.surveyStatus === 'completed').length || 0;
      const pendingSurveys = membersData?.filter(m => m.surveyStatus === 'pending').length || 0;
      
      const participationRate = totalMembers > 0 
        ? Math.round((completedSurveys / totalMembers) * 100)
        : 0;
      
      // Now fetch survey responses to calculate scores
      let responsesQuery = supabase
        .from('survey_responses')
        .select(`
          id, 
          pulse_score,
          team_members(department)
        `);
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        responsesQuery = responsesQuery.eq('team_members.department', departmentFilter);
      }
      
      if (dateRange?.from) {
        responsesQuery = responsesQuery.gte('created_at', dateRange.from.toISOString());
      }
      
      if (dateRange?.to) {
        responsesQuery = responsesQuery.lte('created_at', dateRange.to.toISOString());
      }
      
      const { data: responsesData, error: responsesError } = await responsesQuery;
      
      if (responsesError) throw responsesError;
      
      // Calculate average score from pulse_score data
      let averageScore = 0;
      let themeScores = [
        { theme: "Trust & Safety", score: 0, count: 0 },
        { theme: "Engagement", score: 0, count: 0 },
        { theme: "Culture", score: 0, count: 0 },
        { theme: "Growth & Development", score: 0, count: 0 },
        { theme: "Wellbeing", score: 0, count: 0 },
      ];
      
      responsesData?.forEach(response => {
        if (response.pulse_score && response.pulse_score.overallScore) {
          averageScore += response.pulse_score.overallScore;
          
          // If pulse_score has themeScores, aggregate them
          if (response.pulse_score.themeScores) {
            response.pulse_score.themeScores.forEach((themeScore: any) => {
              const themeIndex = themeScores.findIndex(t => t.theme === themeScore.theme);
              if (themeIndex !== -1) {
                themeScores[themeIndex].score += themeScore.score;
                themeScores[themeIndex].count += 1;
              }
            });
          }
        }
      });
      
      // Calculate final average scores
      if (responsesData && responsesData.length > 0) {
        averageScore = Math.round(averageScore / responsesData.length);
        
        // Calculate average for each theme
        themeScores = themeScores.map(theme => ({
          theme: theme.theme,
          score: theme.count > 0 ? Math.round(theme.score / theme.count) : 0
        }));
      }
      
      // If we're filtering by a specific theme, adjust the overall average
      if (pulseThemeFilter && pulseThemeFilter !== 'All Themes') {
        const filteredTheme = themeScores.find(t => t.theme === pulseThemeFilter);
        if (filteredTheme) {
          averageScore = filteredTheme.score;
        }
      }
      
      return {
        participationRate,
        averageScore,
        completedSurveys,
        pendingSurveys,
        themeScores
      };
    } catch (error) {
      console.error('Error fetching summary stats:', error);
      return {
        participationRate: 0,
        averageScore: 0,
        completedSurveys: 0,
        pendingSurveys: 0,
        themeScores: [
          { theme: "Trust & Safety", score: 0 },
          { theme: "Engagement", score: 0 },
          { theme: "Culture", score: 0 },
          { theme: "Growth & Development", score: 0 },
          { theme: "Wellbeing", score: 0 },
        ]
      };
    }
  },
  
  async uploadTeamMembers(teamMembers: Omit<TeamMember, 'id' | 'lastActive'>[]): Promise<{success: boolean, count: number, error?: string}> {
    try {
      // Format for database insertion
      const membersToInsert = teamMembers.map(member => ({
        name: member.name,
        email: member.email,
        department: member.department,
        surveyStatus: member.surveyStatus || 'not_sent'
      }));
      
      const { data, error } = await supabase
        .from('team_members')
        .upsert(membersToInsert, { 
          onConflict: 'email',
          ignoreDuplicates: false 
        });
      
      if (error) throw error;
      
      return {
        success: true,
        count: membersToInsert.length
      };
    } catch (error: any) {
      console.error('Error uploading team members:', error);
      return {
        success: false,
        count: 0,
        error: error.message || 'Failed to upload team members'
      };
    }
  },
  
  async sendReminders(memberIds: string[]): Promise<{success: boolean, count: number, error?: string}> {
    try {
      // Get member data for emails
      const { data: members, error: fetchError } = await supabase
        .from('team_members')
        .select('id, name, email')
        .in('id', memberIds);
      
      if (fetchError) throw fetchError;
      
      // Update status to pending
      const { error: updateError } = await supabase
        .from('team_members')
        .update({ surveyStatus: 'pending' })
        .in('id', memberIds);
      
      if (updateError) throw updateError;
      
      // Here we would normally call an edge function to send emails
      // For now, we'll just update the status and return success
      
      return {
        success: true,
        count: members?.length || 0
      };
    } catch (error: any) {
      console.error('Error sending reminders:', error);
      return {
        success: false,
        count: 0,
        error: error.message || 'Failed to send reminders'
      };
    }
  },
  
  async exportTeamDataCSV(departmentFilter?: string): Promise<{success: boolean, data?: string, error?: string}> {
    try {
      let query = supabase
        .from('team_members')
        .select('*');
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        query = query.eq('department', departmentFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return { 
          success: false, 
          error: 'No data to export' 
        };
      }
      
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
  
  async generateCertification(departmentName: string): Promise<{success: boolean, certificateId?: string, error?: string}> {
    try {
      // Get the average score for the department
      const { data: statsData } = await this.getSummaryStats(departmentName);
      
      if (!statsData || statsData.averageScore < 80) {
        return {
          success: false,
          error: `Department does not meet certification criteria. Current score: ${statsData?.averageScore || 0}/100`
        };
      }
      
      // Calculate expiry date (1 year from now)
      const now = new Date();
      const expiryDate = new Date(now);
      expiryDate.setFullYear(now.getFullYear() + 1);
      
      // Create certification record
      const { data, error } = await supabase
        .from('certifications')
        .insert({
          department: departmentName,
          average_score: statsData.averageScore,
          is_certified: true,
          certification_date: now.toISOString(),
          expiry_date: expiryDate.toISOString()
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      return {
        success: true,
        certificateId: data.id
      };
    } catch (error: any) {
      console.error('Error generating certification:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate certification'
      };
    }
  }
};
