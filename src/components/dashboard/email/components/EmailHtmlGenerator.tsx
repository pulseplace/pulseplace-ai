
import React from 'react';
import { PulseScoreData } from '@/types/scoring.types';

interface EmailHtmlGeneratorProps {
  pulseScore: PulseScoreData & { companyName: string };
}

const EmailHtmlGenerator: React.FC<EmailHtmlGeneratorProps> = ({ pulseScore }) => {
  // This component generates the raw HTML for the certification email
  // It could be used to directly copy HTML or to send via an API
  
  const {
    companyName,
    overallScore,
    tier,
    themesScores = [],
    categoryScores = [],
    insights = [] // Using optional chaining since we added this as optional
  } = pulseScore;
  
  const getTierDescription = (tier: string): string => {
    switch (tier) {
      case 'pulse_certified':
        return 'Pulse Certified™ (Excellent)';
      case 'emerging_culture':
        return 'Emerging Culture (Good)';
      case 'at_risk':
        return 'At Risk (Needs Improvement)';
      case 'intervention_advised':
        return 'Intervention Advised (Critical)';
      default:
        return 'Pending Review';
    }
  };
  
  const getTierColor = (tier: string): string => {
    switch (tier) {
      case 'pulse_certified':
        return '#10b981'; // Green
      case 'emerging_culture':
        return '#f59e0b'; // Amber
      case 'at_risk':
        return '#f97316'; // Orange
      case 'intervention_advised':
        return '#ef4444'; // Red
      default:
        return '#6b7280'; // Gray
    }
  };
  
  const tierDescription = getTierDescription(tier);
  const tierColor = getTierColor(tier);
  
  // Date formatting
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Raw HTML for email
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PulseScore Certification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          background-color: #f9fafb;
        }
        .logo {
          max-width: 150px;
        }
        .score-box {
          text-align: center;
          margin: 30px 0;
        }
        .score {
          font-size: 64px;
          font-weight: bold;
          color: ${tierColor};
        }
        .tier {
          font-size: 18px;
          font-weight: bold;
          color: ${tierColor};
          margin: 10px 0;
        }
        .category {
          margin: 20px 0;
        }
        .category-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .progress-bar {
          background-color: #e5e7eb;
          height: 10px;
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .progress-fill {
          background-color: #6366f1;
          height: 10px;
          border-radius: 5px;
        }
        .theme-scores {
          margin: 30px 0;
        }
        .theme-item {
          margin-bottom: 15px;
        }
        .insights {
          background-color: #f3f4f6;
          padding: 15px;
          border-radius: 5px;
          margin: 30px 0;
        }
        .insight-item {
          margin-bottom: 15px;
          padding-left: 10px;
          border-left: 3px solid #6366f1;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://storage.googleapis.com/pulseplace/logo.png" alt="PulsePlace Logo" class="logo" />
        </div>
        
        <h1>PulseScore™ Certification</h1>
        <p>This is to certify that <strong>${companyName}</strong> has achieved the following PulseScore™ based on our comprehensive workplace culture assessment.</p>
        
        <div class="score-box">
          <div class="score">${overallScore}</div>
          <div class="tier">${tierDescription}</div>
          <p>Issued on ${currentDate}</p>
        </div>
        
        <h2>Category Results</h2>
        ${categoryScores.map(category => `
          <div class="category">
            <div class="category-name">${category.category.replace(/_/g, ' ')} (${category.score}%)</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${category.score}%;"></div>
            </div>
            <div class="caption">Weight in final score: ${Math.round(category.weight * 100)}%</div>
          </div>
        `).join('')}
        
        <h2>Theme Breakdown</h2>
        <div class="theme-scores">
          ${themesScores.map(theme => `
            <div class="theme-item">
              <div class="theme-name">${theme.theme.replace(/_/g, ' ')}: ${theme.score}%</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${theme.score}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
        
        ${insights && insights.length > 0 ? `
          <h2>Key Insights</h2>
          <div class="insights">
            ${insights.slice(0, 3).map(insight => `
              <div class="insight-item">
                <h3>${insight.title}</h3>
                <p>${insight.content}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <p>The PulseScore™ certification is valid for 12 months from the issue date. We commend your organization's commitment to fostering a positive workplace culture.</p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} PulsePlace. All rights reserved.</p>
          <p>This certification is based on employee feedback collected through the PulsePlace platform.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return (
    <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: emailHtml }} />
  );
};

export default EmailHtmlGenerator;
