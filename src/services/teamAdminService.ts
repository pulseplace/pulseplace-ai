
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

export interface ProcessedSurveyResponse {
  overallScore: number;
  themeScores: {
    theme: string;
    score: number;
  }[];
  sentimentScore?: number;
  insights?: {
    summary: string;
    strengths: string[];
    opportunities: string[];
    actionItems: string[];
  };
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
      // Fixed the type mismatch here - removed count property from themeScores
      let themeScores: { theme: string; score: number }[] = [
        { theme: "Trust & Safety", score: 0 },
        { theme: "Engagement", score: 0 },
        { theme: "Culture", score: 0 },
        { theme: "Growth & Development", score: 0 },
        { theme: "Wellbeing", score: 0 },
      ];
      
      // Track counts separately
      let themeCounts = {
        "Trust & Safety": 0,
        "Engagement": 0,
        "Culture": 0,
        "Growth & Development": 0,
        "Wellbeing": 0
      };
      
      responsesData?.forEach(response => {
        if (response.pulse_score && response.pulse_score.overallScore) {
          averageScore += response.pulse_score.overallScore;
          
          // If pulse_score has themeScores, aggregate them
          if (response.pulse_score.themeScores) {
            response.pulse_score.themeScores.forEach((themeScore: any) => {
              const themeIndex = themeScores.findIndex(t => t.theme === themeScore.theme);
              if (themeIndex !== -1) {
                themeScores[themeIndex].score += themeScore.score;
                themeCounts[themeScore.theme as keyof typeof themeCounts] += 1;
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
          score: themeCounts[theme.theme as keyof typeof themeCounts] > 0 
            ? Math.round(theme.score / themeCounts[theme.theme as keyof typeof themeCounts]) 
            : 0
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
      const { participationRate, averageScore, themeScores } = await this.getSummaryStats(departmentName);
      
      if (participationRate < 50) {
        return {
          success: false,
          error: `Department does not meet minimum participation criteria (${participationRate}% vs 50% required)`
        };
      }
      
      if (averageScore < 80) {
        return {
          success: false,
          error: `Department does not meet certification criteria. Current score: ${averageScore}/100 (minimum 80 required)`
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
          average_score: averageScore,
          is_certified: true,
          certification_date: now.toISOString(),
          expiry_date: expiryDate.toISOString()
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      // Fetch department admin's email (HR contact)
      // For now, we'll use a placeholder email, but this should be fetched from a department_admins table
      const departmentEmail = "hr@tayanasolutions.com";
      
      // Generate insights for the certification email
      const insights = await this.generateDepartmentInsights(departmentName, averageScore, themeScores);
      
      // Send certification email
      await this.sendCertificationEmail({
        recipientEmail: departmentEmail,
        companyName: "Tayana Solutions",
        departmentName: departmentName,
        certificationId: data.id,
        pulseScore: averageScore,
        themeScores: themeScores,
        insights: insights,
        expiryDate: expiryDate.toISOString()
      });
      
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
  },
  
  async sendCertificationEmail(params: {
    recipientEmail: string;
    companyName: string;
    departmentName: string;
    certificationId: string;
    pulseScore: number;
    themeScores: { theme: string; score: number; }[];
    insights?: any;
    expiryDate?: string;
  }): Promise<{success: boolean, error?: string}> {
    try {
      const { data, error } = await supabase.functions.invoke('send-certification-email', {
        body: params
      });
      
      if (error) throw error;
      
      return {
        success: true
      };
    } catch (error: any) {
      console.error('Error sending certification email:', error);
      return {
        success: false,
        error: error.message || 'Failed to send certification email'
      };
    }
  },
  
  async generateDepartmentInsights(departmentName: string, averageScore: number, themeScores: {theme: string; score: number}[]): Promise<any> {
    // In a real implementation, this would be more sophisticated, possibly using AI
    const sortedThemes = [...themeScores].sort((a, b) => b.score - a.score);
    const topThemes = sortedThemes.slice(0, 2).map(t => t.theme);
    const lowestThemes = sortedThemes.slice(-2).map(t => t.theme);
    
    return {
      summary: `${departmentName} has achieved an impressive PulseScore of ${averageScore}, demonstrating a strong commitment to organizational culture and employee wellbeing.`,
      strengths: [
        `Exceptional performance in ${topThemes[0]}`,
        `Strong results in ${topThemes[1]}`,
        `Overall positive employee sentiment and engagement`
      ],
      opportunities: [
        `Consider focusing improvement efforts on ${lowestThemes[0]}`,
        `Develop strategies to enhance ${lowestThemes[1]}`,
        `Continue regular pulse surveys to maintain momentum`
      ],
      actionItems: [
        "Share certification results with all team members",
        "Display certification badge on department communications",
        "Develop action plan targeting improvement areas",
        "Schedule quarterly review of pulse metrics"
      ]
    };
  },
  
  async exportToPDF(departmentFilter?: string): Promise<{success: boolean, pdfUrl?: string, error?: string}> {
    try {
      // In a real implementation, this would use a PDF generation library or service
      // For now, we'll return a mock success
      
      // Get the data we need for the PDF
      const teamMembers = await this.getTeamMembers(departmentFilter);
      const stats = await this.getSummaryStats(departmentFilter);
      
      // Mock PDF generation - in a real implementation, this would use a library like pdfmake
      // or call an edge function that uses a PDF generation service
      
      return {
        success: true,
        pdfUrl: `https://hamqupvdhlfznwnuohsh.supabase.co/storage/v1/object/public/reports/tayana-team-pulse-${new Date().toISOString().split('T')[0]}.pdf`
      };
    } catch (error: any) {
      console.error('Error exporting to PDF:', error);
      return {
        success: false,
        error: error.message || 'Failed to export PDF'
      };
    }
  },
  
  async processSurveyResponse(surveyId: string, userId: string, responses: any): Promise<ProcessedSurveyResponse> {
    try {
      // Group responses by theme
      const themeResponses: Record<string, number[]> = {
        "Trust & Safety": [],
        "Engagement": [],
        "Culture": [],
        "Growth & Development": [],
        "Wellbeing": []
      };
      
      // Process each response and categorize by theme
      Object.entries(responses).forEach(([questionId, response]) => {
        // In a real implementation, this would map question IDs to themes
        // For now, we'll use a simple mapping based on question ID prefix
        let theme = "Culture"; // Default theme
        
        if (questionId.startsWith('trust')) {
          theme = "Trust & Safety";
        } else if (questionId.startsWith('engage')) {
          theme = "Engagement";
        } else if (questionId.startsWith('growth')) {
          theme = "Growth & Development";
        } else if (questionId.startsWith('wellbeing')) {
          theme = "Wellbeing";
        }
        
        // Add the numeric response to the theme array (if it's a number)
        const numericResponse = typeof response === 'number' ? response : 
                               (typeof response === 'string' && !isNaN(parseFloat(response))) ? 
                               parseFloat(response) : null;
        
        if (numericResponse !== null) {
          themeResponses[theme].push(numericResponse);
        }
      });
      
      // Calculate average score for each theme
      const themeScores = Object.entries(themeResponses).map(([theme, scores]) => {
        // Calculate average score on a 0-100 scale
        const average = scores.length > 0 ? 
          Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 20) : 0;
        
        return { theme, score: average };
      });
      
      // Calculate overall score (average of theme scores)
      const overallScore = themeScores.length > 0 ?
        Math.round(themeScores.reduce((sum, theme) => sum + theme.score, 0) / themeScores.length) : 0;
      
      // Basic sentiment analysis - in a real implementation, this would use NLP
      // Just a placeholder for now
      const sentimentScore = Math.min(100, Math.max(0, overallScore + Math.floor(Math.random() * 20) - 10));
      
      // Generate a processed response
      const processed: ProcessedSurveyResponse = {
        overallScore,
        themeScores,
        sentimentScore
      };
      
      // Store the processed response in the database
      const { error } = await supabase
        .from('survey_responses')
        .insert({
          survey_id: surveyId,
          user_id: userId,
          responses: responses,
          pulse_score: processed,
          sentiment_score: sentimentScore
        });
      
      if (error) throw error;
      
      return processed;
    } catch (error) {
      console.error('Error processing survey response:', error);
      throw error;
    }
  }
};
