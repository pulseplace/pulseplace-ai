
import { MockPulseScoreData } from '@/types/scoring.types';

export const generateCertificationEmail = (
  recipientEmail: string,
  certData: MockPulseScoreData
): string => {
  const { companyName, overallScore, tier, industryBenchmark, dateGenerated } = certData;
  
  // Get tier display name
  const getTierDisplayName = (tier: string): string => {
    switch (tier) {
      case 'pulse_certified': return 'Pulse Certified';
      case 'emerging_culture': return 'Emerging Culture';
      case 'at_risk': return 'At Risk';
      default: return 'Intervention Advised';
    }
  };
  
  // Get appropriate badge color
  const getBadgeColor = (tier: string): string => {
    switch (tier) {
      case 'pulse_certified': return '#10b981'; // green
      case 'emerging_culture': return '#3b82f6'; // blue
      case 'at_risk': return '#f59e0b'; // amber
      default: return '#ef4444'; // red
    }
  };

  // Basic email template with dynamic content
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>PulsePlace Certification Summary</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; margin-bottom: 30px; }
      .score-badge { 
        display: inline-block; 
        width: 150px; 
        height: 150px; 
        border-radius: 50%; 
        background-color: ${getBadgeColor(tier)}; 
        color: white;
        text-align: center;
        line-height: 150px;
        font-size: 42px;
        font-weight: bold;
        margin: 20px auto;
      }
      .score-container { text-align: center; margin-bottom: 30px; }
      .tier-name { 
        display: inline-block; 
        padding: 5px 15px; 
        background-color: ${getBadgeColor(tier)}; 
        color: white;
        border-radius: 15px;
        font-weight: bold;
      }
      .details { background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
      .benchmark { margin-top: 20px; font-style: italic; }
      .footer { margin-top: 30px; font-size: 0.9em; color: #666; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://pulseplace.ai/logo.png" alt="PulsePlace Logo" width="200">
        <h1>Certification Summary for ${companyName}</h1>
      </div>
      
      <div class="score-container">
        <div class="score-badge">${overallScore}</div>
        <h2>Your PulseScore™</h2>
        <div class="tier-name">${getTierDisplayName(tier)}</div>
      </div>
      
      <div class="details">
        <p>Congratulations! Based on your organization's workplace culture assessment, we're pleased to present your official PulseScore™ certification results.</p>
        
        <h3>What This Means</h3>
        <p>Your organization has demonstrated a strong commitment to building a positive workplace culture. With a PulseScore™ of ${overallScore}, you rank in the "${getTierDisplayName(tier)}" tier.</p>
        
        <div class="benchmark">
          <p>Industry Average: ${industryBenchmark}</p>
          <p>Your organization is performing ${overallScore > industryBenchmark ? 'above' : 'below'} the industry average.</p>
        </div>
      </div>
      
      <div class="footer">
        <p>This certification was generated on ${dateGenerated} and is valid for 12 months.</p>
        <p>© ${new Date().getFullYear()} PulsePlace.ai - Transforming Workplace Culture</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
