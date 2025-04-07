
import { MockPulseScoreData } from '@/types/scoring.types';

/**
 * Generates certification email HTML template
 */
export const generateCertificationEmail = (recipientEmail: string, certData: MockPulseScoreData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>PulsePlace Certification Summary</title>
      </head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai</h1>
          
          <p style="font-size: 18px;">Hello ${recipientEmail.split('@')[0]},</p>
          
          <p>We're thrilled to share your latest certification summary from PulsePlace.ai.</p>
          
          <p style="font-size: 24px; text-align: center; font-weight: bold;">PulseScore®: ${certData.overallScore} / 100</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <span style="background-color: #e8f0fe; padding: 8px 20px; border-radius: 50px; font-weight: 600;">${certData.tier.replace('_', ' ').toUpperCase()}</span>
          </div>
          
          <h2>Category Breakdown:</h2>
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
            ${certData.categoryScores.map(cat => `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e1eaf8;">
                <div>${cat.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                <div style="font-weight: 600;">${cat.score}</div>
              </div>
            `).join('')}
          </div>
          
          <h2>AI Insight Summary:</h2>
          <p style="line-height: 1.6; margin-bottom: 20px;">"${certData.insights[0]}"</p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">You're now eligible to use the official Pulse Certified® badge on your website, LinkedIn, and careers page.</p>
          
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="#" style="background-color: #4338ca; color: white; padding: 12px 25px; border-radius: 50px; text-decoration: none; font-weight: 600;">Download Badge</a>
          </div>
          
          <div style="text-align: center; color: #64748b; margin-top: 30px; font-size: 12px;">
            <p>PulsePlace.ai — Redefining workplace trust through data & AI</p>
            <p>This is an automated summary. For support, contact <a href="mailto:hello@pulseplace.ai" style="color: #4338ca;">hello@pulseplace.ai</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};
