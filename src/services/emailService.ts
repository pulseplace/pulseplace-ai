
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface EmailParams {
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

interface EmailResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Service for sending emails through the Supabase Edge Function
 */
export const emailService = {
  /**
   * Sends an email using the Supabase Edge Function
   */
  sendEmail: async (params: EmailParams): Promise<EmailResponse> => {
    try {
      console.log(`Sending email to ${Array.isArray(params.to) ? params.to.join(', ') : params.to}`);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('resend-email', {
        body: params
      });
      
      if (error) {
        console.error('Email service error:', error);
        return { 
          success: false, 
          error: error.message || 'Failed to send email' 
        };
      }
      
      console.log('Email sent successfully:', data);
      return { 
        success: true, 
        data 
      };
    } catch (error) {
      console.error('Unexpected error in email service:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  },
  
  /**
   * Sends a test email to verify the email service is working
   */
  sendTestEmail: async (recipientEmail: string): Promise<EmailResponse> => {
    try {
      const testEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Email Test</h1>
          
          <p style="font-size: 16px;">This is a test email from PulsePlace.ai to verify that the email service is working correctly.</p>
          
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
            <p>If you received this email, it means the email service is configured correctly.</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            Sent on ${new Date().toLocaleString()}
          </p>
        </div>
      `;
      
      return await emailService.sendEmail({
        to: recipientEmail,
        subject: "PulsePlace.ai Email Service Test",
        html: testEmailHtml,
        fromName: "PulsePlace.ai System",
        fromEmail: "system@pulseplace.ai"
      });
    } catch (error) {
      console.error('Test email error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  },
  
  /**
   * Sends a contact form submission
   */
  sendContactFormSubmission: async (name: string, email: string, message: string, subject?: string): Promise<EmailResponse> => {
    try {
      const contactHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Contact Form Submission</h1>
          
          <div style="background-color: #f7f7ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `;
      
      return await emailService.sendEmail({
        to: "contact@pulseplace.ai",
        subject: subject || "New Contact Form Submission",
        html: contactHtml,
        fromName: "PulsePlace Contact Form",
        fromEmail: "contact-form@pulseplace.ai",
        replyTo: email
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  },
  
  /**
   * Sends a beta request
   */
  sendBetaRequest: async (name: string, email: string, company: string, message?: string): Promise<EmailResponse> => {
    try {
      const betaRequestHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Private Beta Request</h1>
          
          <div style="background-color: #f7f7ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
          </div>
          
          ${message ? `
          <div style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          ` : ''}
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `;
      
      return await emailService.sendEmail({
        to: "beta@pulseplace.ai",
        subject: "Private Beta Request",
        html: betaRequestHtml,
        fromName: "PulsePlace Beta Program",
        fromEmail: "beta-requests@pulseplace.ai",
        replyTo: email
      });
    } catch (error) {
      console.error('Beta request error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  },
  
  /**
   * Sends a pitch deck access approval email
   */
  sendPitchDeckApprovalEmail: async (userData: { email: string, firstName: string }): Promise<EmailResponse> => {
    try {
      const baseUrl = window.location.origin;
      const approvalHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Pitch Deck Access</h1>
          
          <p style="font-size: 16px;">Hi ${userData.firstName || 'there'},</p>
          
          <p style="font-size: 16px;">Thanks for your interest in PulsePlace.ai.</p>
          
          <p style="font-size: 16px;">We're excited to share our latest Investor Pitch Deck (v1) with you.</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${baseUrl}/pitch-deck-view" style="background-color: #4338ca; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Access Pitch Deck
            </a>
          </div>
          
          <p style="font-size: 16px; padding: 15px; background-color: #f3f4f6; border-radius: 4px;">
            <strong>Please Note:</strong><br>
            This document is confidential and intended only for your review. It is not to be shared, distributed, or published publicly.
          </p>
          
          <p style="font-size: 16px;">We look forward to hearing your thoughts.</p>
          
          <p style="font-size: 16px;">
            Warm regards,<br>
            Vishal & the PulsePlace.ai team<br>
            <a href="mailto:hello@pulseplace.ai" style="color: #4338ca;">hello@pulseplace.ai</a>
          </p>
        </div>
      `;
      
      return await emailService.sendEmail({
        to: userData.email,
        subject: "You're approved to access the PulsePlace.ai Pitch Deck",
        html: approvalHtml,
        fromName: "PulsePlace.ai",
        fromEmail: "notifications@pulseplace.ai"
      });
    } catch (error) {
      console.error('Pitch deck approval email error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }
};
