
import { supabase } from '@/integrations/supabase/client';
import { prepareCertificationEmail } from '@/utils/emailTemplates';
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

interface EmailRecipient {
  name: string;
  email: string;
  company?: string;
}

/**
 * Service for sending emails via MailerSend through a Supabase Edge Function
 */
export const emailService = {
  /**
   * Sends a certification summary email via MailerSend
   * 
   * @param recipient The email recipient information
   * @param pulseScoreData The pulse score data for the certification
   * @returns Promise resolving to success status
   */
  sendCertificationEmail: async (
    recipient: EmailRecipient,
    pulseScoreData: PulseScoreData
  ): Promise<boolean> => {
    try {
      // Get category scores for the email
      const trustScore = pulseScoreData.categoryScores.find(
        c => c.category === 'emotion_index'
      );
      const engagementScore = pulseScoreData.categoryScores.find(
        c => c.category === 'engagement_stability'
      );
      const cultureScore = pulseScoreData.categoryScores.find(
        c => c.category === 'culture_trust'
      );
      
      // Prepare email template with recipient data
      const emailHtml = await prepareCertificationEmail({
        recipient_name: recipient.name,
        pulse_score: pulseScoreData.overallScore.toString(),
        certification_level: getTierDisplay(pulseScoreData.tier).label,
        trust_score: trustScore ? `${Math.round(trustScore.score)}/100` : 'N/A',
        engagement_score: engagementScore ? `${Math.round(engagementScore.score)}/100` : 'N/A',
        culture_score: cultureScore ? `${Math.round(cultureScore.score)}/100` : 'N/A',
        ai_summary: pulseScoreData.insights.join(' '),
        badge_download_link: `https://app.pulseplace.ai/certification/badge/${pulseScoreData.tier}`
      });
      
      console.log('Preparing to send certification email to:', recipient.email);
      
      // Send email using our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: recipient.email,
          subject: `Your PulsePlace Certification: ${getTierDisplay(pulseScoreData.tier).label}`,
          html: emailHtml,
          fromName: "PulsePlace Certification",
          fromEmail: "certification@pulseplace.ai",
          replyTo: "support@pulseplace.ai"
        }
      });
      
      if (error) {
        console.error('Failed to send certification email:', error);
        return false;
      }
      
      console.log('Certification email sent successfully:', data);
      return true;
    } catch (error) {
      console.error('Failed to send certification email:', error);
      return false;
    }
  }
};
