
import { certificationService } from './team/certificationService';
import { EmailTemplates } from '@/utils/emailTemplates';
import { supabase } from '@/integrations/supabase/client';

export const certificationEmailService = {
  /**
   * Trigger a certification email based on survey results
   * @param departmentName The department name to generate certification for
   * @param averageScore The department's average score
   * @param participationRate The department's survey participation rate
   * @returns Promise with result of operation
   */
  async triggerCertificationEmail(
    departmentName: string,
    averageScore: number,
    participationRate: number
  ): Promise<{ success: boolean; message: string; certificateId?: string }> {
    try {
      console.log(`Checking certification eligibility for ${departmentName} with score ${averageScore}`);
      
      // Check if the department meets certification criteria
      if (averageScore < 80) {
        return {
          success: false,
          message: `Department does not meet the minimum score threshold (${averageScore}/100, minimum 80 required)`
        };
      }
      
      if (participationRate < 50) {
        return {
          success: false,
          message: `Department does not meet the minimum participation threshold (${participationRate}%, minimum 50% required)`
        };
      }
      
      // Check if the department already has a valid certification
      const { data: existingCert, error: certError } = await supabase
        .from('certifications')
        .select('id, certification_date, expiry_date')
        .eq('department', departmentName)
        .eq('is_certified', true)
        .order('certification_date', { ascending: false })
        .limit(1)
        .single();
      
      // If there's already a valid certification that hasn't expired
      if (existingCert && !certError) {
        const expiryDate = new Date(existingCert.expiry_date);
        const now = new Date();
        
        if (expiryDate > now) {
          // Certification is still valid - check if it's older than 3 months (to prevent spam)
          const certDate = new Date(existingCert.certification_date);
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          
          if (certDate > threeMonthsAgo) {
            return {
              success: false,
              message: `Department already has a valid certification issued within the last 3 months`,
              certificateId: existingCert.id
            };
          }
        }
      }
      
      // Generate the certification and send the email
      const result = await certificationService.generateCertification(departmentName);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate certification');
      }
      
      return {
        success: true,
        message: `Certification generated and email sent for ${departmentName}`,
        certificateId: result.certificateId
      };
    } catch (error: any) {
      console.error('Error triggering certification email:', error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred'
      };
    }
  },
  
  /**
   * Manually trigger a certification email (for admin use)
   * @param departmentName The department to generate certification for
   * @returns Promise with result of the operation
   */
  async manualTriggerCertification(departmentName: string): Promise<{ success: boolean; message: string; certificateId?: string }> {
    try {
      // Get the department stats to check qualification
      const { data: stats, error: statsError } = await supabase.rpc(
        'get_department_stats',
        { department_name: departmentName }
      );
      
      if (statsError) {
        throw statsError;
      }
      
      // If no stats are available, we can't generate a certification
      if (!stats || stats.average_score === null) {
        return {
          success: false,
          message: `No survey data available for ${departmentName}`
        };
      }
      
      // Use the automatic trigger with the retrieved stats
      return await this.triggerCertificationEmail(
        departmentName,
        stats.average_score,
        stats.participation_rate
      );
    } catch (error: any) {
      console.error('Error manually triggering certification:', error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred'
      };
    }
  }
};

export default certificationEmailService;
