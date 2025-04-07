
import { supabase } from '@/integrations/supabase/client';
import { generateCertificationHtml } from '@/components/dashboard/email/components/EmailHtmlGenerator';
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

interface EmailRecipient {
  name: string;
  email: string;
  company?: string;
}

interface GenericEmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  fromName?: string;
  fromEmail?: string;
  replyTo?: string;
  templateId?: string;
  variables?: Record<string, any>;
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
      const tierInfo = getTierDisplay(pulseScoreData.tier);
      console.log('Preparing to send certification email to:', recipient.email);
      
      // Generate the HTML for the certification email
      const emailHtml = generateCertificationHtml({
        recipientName: recipient.name,
        companyName: recipient.company || 'Your Company',
        pulseScoreData: pulseScoreData,
        certificationLevel: tierInfo.label
      });
      
      // Send email using our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: recipient.email,
          subject: `Your PulsePlace Certification: ${tierInfo.label}`,
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
  },

  /**
   * Sends a generic email using the edge function
   * 
   * @param emailRequest Email request configuration
   * @returns Promise resolving to success status and response data
   */
  sendEmail: async (emailRequest: GenericEmailRequest): Promise<{success: boolean, data?: any}> => {
    try {
      console.log('Sending email to:', emailRequest.to);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          ...emailRequest,
          fromName: emailRequest.fromName || "PulsePlace",
          fromEmail: emailRequest.fromEmail || "no-reply@pulseplace.ai",
          replyTo: emailRequest.replyTo || "support@pulseplace.ai"
        }
      });
      
      if (error) {
        console.error('Failed to send email:', error);
        return { success: false };
      }
      
      console.log('Email sent successfully:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Failed to send email:', error);
      return { success: false };
    }
  },
  
  /**
   * Test email sending functionality
   * 
   * @param to Recipient email address
   * @param subject Email subject
   * @returns Promise resolving to success status
   */
  sendTestEmail: async (to: string, subject: string = "PulsePlace Test Email"): Promise<boolean> => {
    try {
      const testHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #22c55e;">PulsePlace Test Email</h1>
          <p>This is a test email from PulsePlace.</p>
          <p>If you're receiving this, email sending is working correctly!</p>
          <p>Time sent: ${new Date().toLocaleString()}</p>
        </div>
      `;
      
      const result = await emailService.sendEmail({
        to,
        subject,
        html: testHtml
      });
      
      return result.success;
    } catch (error) {
      console.error('Failed to send test email:', error);
      return false;
    }
  }
};
