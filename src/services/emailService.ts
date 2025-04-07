
import { prepareCertificationEmail } from '@/utils/emailTemplates';
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

interface EmailRecipient {
  name: string;
  email: string;
  company?: string;
}

/**
 * Service for sending emails via Postmark
 */
export const emailService = {
  /**
   * Sends a certification summary email via Postmark
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
      
      // In a real implementation, this would call the Postmark API
      console.log(`Prepared email for ${recipient.email} with Postmark template`);
      
      // Example of how to use with Postmark API
      // const response = await fetch('https://api.postmarkapp.com/email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-Postmark-Server-Token': 'your-postmark-server-token'
      //   },
      //   body: JSON.stringify({
      //     From: 'certification@pulseplace.ai',
      //     To: recipient.email,
      //     Subject: `Your PulsePlace Certification: ${getTierDisplay(pulseScoreData.tier).label}`,
      //     HtmlBody: emailHtml,
      //     MessageStream: 'outbound'
      //   })
      // });
      
      // const result = await response.json();
      // return result.ErrorCode === 0;
      
      // For now, simulate success
      return true;
    } catch (error) {
      console.error('Failed to send certification email:', error);
      return false;
    }
  }
};
