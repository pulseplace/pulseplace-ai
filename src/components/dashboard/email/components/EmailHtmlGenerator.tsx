
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

interface CertificationEmailProps {
  recipientName: string;
  companyName: string;
  pulseScoreData: PulseScoreData;
  certificationLevel: string;
  badgeDownloadUrl?: string;
}

/**
 * Generates HTML for certification emails
 */
export const generateCertificationHtml = ({
  recipientName,
  companyName,
  pulseScoreData,
  certificationLevel,
  badgeDownloadUrl = 'https://app.pulseplace.ai/certification/badge'
}: CertificationEmailProps): string => {
  const tierInfo = getTierDisplay(pulseScoreData.tier);
  const emotionScore = pulseScoreData.categoryScores.find(c => c.category === 'emotion_index');
  const engagementScore = pulseScoreData.categoryScores.find(c => c.category === 'engagement_stability');
  const cultureScore = pulseScoreData.categoryScores.find(c => c.category === 'culture_trust');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your PulsePlace Certification</title>
  <style>
    body { 
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    .header img {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .content {
      padding: 20px 0;
    }
    .certification-badge {
      background-color: #f0fdf4;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
      border: 1px solid #dcfce7;
    }
    .score-bar {
      background-color: #f3f4f6;
      height: 10px;
      border-radius: 5px;
      margin: 10px 0;
      overflow: hidden;
    }
    .score-fill {
      height: 100%;
      background-color: #22c55e;
      border-radius: 5px;
    }
    .scores {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }
    .score-card {
      flex: 1;
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 15px;
      margin: 0 5px;
      text-align: center;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 14px;
      color: #6b7280;
    }
    .button {
      display: inline-block;
      background-color: #22c55e;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 10px;
    }
    .insights {
      background-color: #f0f9ff;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      border: 1px solid #e0f2fe;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        padding: 10px;
      }
      .scores {
        flex-direction: column;
      }
      .score-card {
        margin: 5px 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://app.pulseplace.ai/logo.png" alt="PulsePlace Logo">
      <h1>Your PulsePlace Certification</h1>
    </div>
    
    <div class="content">
      <p>Dear ${recipientName},</p>
      
      <p>Congratulations! We're pleased to announce that <strong>${companyName}</strong> has achieved the <strong>${certificationLevel}</strong> certification from PulsePlace.</p>
      
      <div class="certification-badge">
        <h2>${tierInfo.label}</h2>
        <p>PulseScore: ${pulseScoreData.overallScore}/100</p>
        <div class="score-bar">
          <div class="score-fill" style="width: ${pulseScoreData.overallScore}%;"></div>
        </div>
      </div>
      
      <p>This certification is based on an analysis of your organization's employee experience and culture data. Here's a breakdown of your scores:</p>
      
      <div class="scores">
        <div class="score-card">
          <h3>Trust & Safety</h3>
          <p>${emotionScore ? Math.round(emotionScore.score) : 'N/A'}/100</p>
        </div>
        <div class="score-card">
          <h3>Engagement</h3>
          <p>${engagementScore ? Math.round(engagementScore.score) : 'N/A'}/100</p>
        </div>
        <div class="score-card">
          <h3>Culture</h3>
          <p>${cultureScore ? Math.round(cultureScore.score) : 'N/A'}/100</p>
        </div>
      </div>
      
      <div class="insights">
        <h3>AI Insights</h3>
        <p>${pulseScoreData.insights.join(' ')}</p>
      </div>
      
      <p>Your organization has demonstrated a strong commitment to creating a positive workplace environment. This certification is valid for one year and can be displayed on your website, social media, and recruitment materials.</p>
      
      <p style="text-align: center;">
        <a href="${badgeDownloadUrl}" class="button">Download Your Certification Badge</a>
      </p>
    </div>
    
    <div class="footer">
      <p>This certification is valid until one year from today's date.</p>
      <p>PulsePlace | Measuring and improving workplace culture | <a href="https://pulseplace.ai">pulseplace.ai</a></p>
    </div>
  </div>
</body>
</html>`;
};
