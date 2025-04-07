
import fs from 'fs';
import path from 'path';

/**
 * Provides access to email templates for Postmark integration
 */
export const EmailTemplates = {
  /**
   * Gets the certification summary email HTML template
   * 
   * @returns The HTML template as a string or Promise<string>
   */
  getCertificationSummaryTemplate: async (): Promise<string> => {
    try {
      // In a server environment, read from filesystem
      const templatePath = path.resolve(__dirname, '../components/dashboard/email/templates/certificationSummaryEmail.html');
      return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
      console.error('Error reading email template:', error);
      
      // Fetch from public assets as fallback (for development)
      return fetch('/email-templates/certificationSummaryEmail.html')
        .then(response => response.text())
        .catch(fetchError => {
          console.error('Fallback fetch failed:', fetchError);
          throw new Error('Failed to load email template');
        });
    }
  },
  
  /**
   * Replaces template variables with actual values
   * 
   * @param template The HTML template string
   * @param variables An object with keys matching template variables
   * @returns The processed HTML with variables replaced
   */
  processTemplate: (template: string, variables: Record<string, string>): string => {
    let processedTemplate = template;
    
    // Replace each variable in the template
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedTemplate = processedTemplate.replace(regex, value);
    });
    
    return processedTemplate;
  }
};

/**
 * Helper function to prepare a certification email using the Postmark template
 * 
 * @param recipientData Object containing all recipient data
 * @returns Processed HTML ready to be sent via Postmark
 */
export const prepareCertificationEmail = async (recipientData: {
  recipient_name: string;
  pulse_score: string;
  certification_level: string;
  trust_score: string;
  engagement_score: string;
  culture_score: string;
  ai_summary: string;
  badge_download_link: string;
}): Promise<string> => {
  const template = await EmailTemplates.getCertificationSummaryTemplate();
  return EmailTemplates.processTemplate(template, recipientData);
};
