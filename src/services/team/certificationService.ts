
import { supabase } from '@/integrations/supabase/client';
import { statsService } from './statsService';

export const certificationService = {
  async generateCertification(departmentName: string): Promise<{success: boolean, certificateId?: string, error?: string}> {
    try {
      console.log(`Checking certification eligibility for department: ${departmentName}`);
      
      // Get the average score for the department
      const { participationRate, averageScore, themeScores } = await statsService.getSummaryStats(departmentName);
      
      console.log(`Department stats: Score ${averageScore}/100, Participation ${participationRate}%`);
      
      if (participationRate < 50) {
        console.warn(`Department does not meet minimum participation criteria: ${participationRate}% vs 50% required`);
        return {
          success: false,
          error: `Department does not meet minimum participation criteria (${participationRate}% vs 50% required)`
        };
      }
      
      if (averageScore < 80) {
        console.warn(`Department does not meet certification criteria: ${averageScore}/100 vs 80/100 minimum`);
        return {
          success: false,
          error: `Department does not meet certification criteria. Current score: ${averageScore}/100 (minimum 80 required)`
        };
      }
      
      console.log(`Department ${departmentName} qualifies for certification!`);
      
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
      
      console.log(`Certification record created with ID: ${data.id}`);
      
      // Fetch department admin's email (HR contact)
      // For now, we'll use a placeholder email, but this should be fetched from a department_admins table
      const departmentEmail = "hr@tayanasolutions.com";
      
      // Generate insights for the certification email
      const insights = await this.generateDepartmentInsights(departmentName, averageScore, themeScores);
      
      console.log(`Sending certification email to ${departmentEmail}`);
      
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
      
      console.log(`Certification process completed successfully for ${departmentName}`);
      
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
      console.log(`Calling send-certification-email edge function for ${params.departmentName}`);
      
      const { data, error } = await supabase.functions.invoke('send-certification-email', {
        body: params
      });
      
      if (error) throw error;
      
      console.log(`Certification email sent successfully to ${params.recipientEmail}`);
      
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
  }
};
