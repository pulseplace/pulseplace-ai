
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Mail } from 'lucide-react';
import { PulseScoreData, PulseScoreTier } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

// Interface for the email template props
interface CertificationEmailTemplateProps {
  pulseScoreData?: PulseScoreData;
  companyName?: string;
  recipientName?: string;
  recipientEmail?: string;
}

const defaultPulseScoreData: PulseScoreData = {
  overallScore: 86,
  categoryScores: [
    { category: 'emotion_index', score: 82, weight: 0.4 },
    { category: 'engagement_stability', score: 88, weight: 0.3 },
    { category: 'culture_trust', score: 85, weight: 0.3 }
  ],
  themeScores: [],
  tier: 'pulse_certified',
  insights: [
    'Strong overall culture with high engagement stability.',
    'Leadership trust is a key strength in your organization.',
    'Focus area: Mission alignment could be improved.'
  ],
  recommendedActions: [
    'Conduct team workshops on company mission and values.',
    'Continue the current leadership communication strategy.',
    'Consider additional psychological safety training.'
  ]
};

const CertificationEmailTemplate: React.FC<CertificationEmailTemplateProps> = ({
  pulseScoreData = defaultPulseScoreData,
  companyName = 'Acme Corporation',
  recipientName = 'Sarah Chen',
  recipientEmail = 'sarah.chen@acmecorp.com'
}) => {
  const { toast } = useToast();
  const [showHtml, setShowHtml] = useState(false);
  
  const tierInfo = getTierDisplay(pulseScoreData.tier);
  const certificationDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  const formattedExpirationDate = expirationDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Generate HTML version of the email
  const generateHtmlEmail = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your PulsePlace Certification</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { padding: 20px 0; text-align: center; }
    .logo { max-width: 180px; }
    .certification-box { background: linear-gradient(to right, #f0f9ff, #ffffff); border: 1px solid #90cdf4; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .certification-title { color: #2b6cb0; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
    .score-box { display: inline-block; background-color: #ebf8ff; border-radius: 8px; padding: 10px 15px; margin: 5px 0; }
    .score-value { font-size: 24px; font-weight: bold; color: #2c5282; }
    .category-score { background-color: #f7fafc; border-radius: 4px; padding: 10px; margin: 5px 0; }
    .insights-box { background-color: #f7fafc; border-radius: 8px; padding: 15px; margin: 20px 0; }
    .insights-title { font-size: 16px; font-weight: bold; color: #4a5568; margin-bottom: 10px; }
    .insight-item { padding: 5px 0; border-bottom: 1px solid #edf2f7; }
    .cta-button { display: inline-block; background-color: #4299e1; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; margin: 15px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #edf2f7; font-size: 12px; color: #718096; }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://example.com/pulseplace-logo.png" alt="PulsePlace Logo" class="logo">
  </div>
  
  <p>Dear ${recipientName},</p>
  
  <p>We're excited to inform you that <strong>${companyName}</strong> has successfully completed the PulsePlace certification process. Based on our comprehensive assessment of your workplace culture metrics, we're pleased to present your official certification results.</p>
  
  <div class="certification-box">
    <div class="certification-title">PulsePlace Certification Result: ${tierInfo.label}</div>
    <div class="score-box">
      Overall PulseScore™: <span class="score-value">${pulseScoreData.overallScore}/100</span>
    </div>
    
    <p>Your organization has achieved the following category scores:</p>
    
    ${pulseScoreData.categoryScores.map(category => `
    <div class="category-score">
      <strong>${category.category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</strong> ${Math.round(category.score)}/100
    </div>
    `).join('')}
    
    <p>Certification Issue Date: ${certificationDate}<br>
    Valid Until: ${formattedExpirationDate}</p>
  </div>
  
  <div class="insights-box">
    <div class="insights-title">Key Insights:</div>
    ${pulseScoreData.insights.map(insight => `
    <div class="insight-item">${insight}</div>
    `).join('')}
  </div>
  
  <div class="insights-box">
    <div class="insights-title">Recommended Actions:</div>
    ${pulseScoreData.recommendedActions.map(action => `
    <div class="insight-item">${action}</div>
    `).join('')}
  </div>
  
  <p>Your digital certification badge is attached to this email. You can also access your full certification dashboard, complete with detailed metrics and benchmark comparisons, by clicking the button below:</p>
  
  <a href="https://app.pulseplace.ai/dashboard" class="cta-button">View Full Certification Report</a>
  
  <p>In addition, you now have access to your embeddable certification badge that can be displayed on your website, recruitment materials, and other marketing channels.</p>
  
  <p>Congratulations on this achievement! We look forward to seeing how you'll continue to build and maintain an exceptional workplace culture.</p>
  
  <p>Best regards,<br>
  The PulsePlace Team</p>
  
  <div class="footer">
    <p>This certification is based on data collected during your assessment period. Recertification is recommended annually to maintain your status.</p>
    <p>© ${new Date().getFullYear()} PulsePlace AI, Inc. All rights reserved.</p>
  </div>
</body>
</html>`;
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generateHtmlEmail());
    toast({
      title: "HTML Copied",
      description: "Email template HTML has been copied to clipboard",
    });
  };

  const handleDownloadHtml = () => {
    const element = document.createElement('a');
    const file = new Blob([generateHtmlEmail()], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = `${companyName.replace(/\s+/g, '-').toLowerCase()}-certification.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: "Email template HTML is downloading",
    });
  };

  const handleSendTestEmail = () => {
    toast({
      title: "Test Email Sent",
      description: `A test email has been sent to ${recipientEmail}`,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Certification Email Template</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowHtml(!showHtml)}>
            {showHtml ? "Preview" : "Show HTML"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyHtml}>
            <Copy className="h-4 w-4 mr-2" />
            Copy HTML
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadHtml}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" onClick={handleSendTestEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Send Test
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showHtml ? (
          <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[600px]">
            <pre className="text-xs whitespace-pre-wrap">{generateHtmlEmail()}</pre>
          </div>
        ) : (
          <div className="border rounded-md p-6 max-w-2xl mx-auto bg-white">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-pulse-600 mb-1">PulsePlace</div>
              <div className="text-sm text-gray-500">Workplace Culture Certification</div>
            </div>
            
            <p className="mb-4">Dear {recipientName},</p>
            
            <p className="mb-4">We're excited to inform you that <strong>{companyName}</strong> has successfully completed the PulsePlace certification process. Based on our comprehensive assessment of your workplace culture metrics, we're pleased to present your official certification results.</p>
            
            <div className="bg-gradient-to-r from-pulse-50 to-white border border-pulse-200 rounded-lg p-4 mb-6">
              <div className="text-lg font-semibold text-pulse-700 mb-2">
                PulsePlace Certification Result: {tierInfo.label}
              </div>
              
              <div className="inline-block bg-pulse-100 rounded-lg px-4 py-2 mb-4">
                Overall PulseScore™: <span className="text-2xl font-bold text-pulse-700">{pulseScoreData.overallScore}/100</span>
              </div>
              
              <div className="text-sm mb-2">Your organization has achieved the following category scores:</div>
              
              <div className="space-y-2 mb-4">
                {pulseScoreData.categoryScores.map((category, index) => (
                  <div key={index} className="bg-white rounded p-2 flex justify-between items-center">
                    <span className="font-medium">
                      {category.category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                    </span>
                    <span className="font-semibold">{Math.round(category.score)}/100</span>
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-gray-600">
                Certification Issue Date: {certificationDate}<br />
                Valid Until: {formattedExpirationDate}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="font-semibold mb-2">Key Insights:</div>
              <ul className="space-y-1 pl-5 list-disc">
                {pulseScoreData.insights.map((insight, index) => (
                  <li key={index} className="text-gray-700">{insight}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="font-semibold mb-2">Recommended Actions:</div>
              <ul className="space-y-1 pl-5 list-disc">
                {pulseScoreData.recommendedActions.map((action, index) => (
                  <li key={index} className="text-gray-700">{action}</li>
                ))}
              </ul>
            </div>
            
            <p className="mb-4">Your digital certification badge is attached to this email. You can also access your full certification dashboard, complete with detailed metrics and benchmark comparisons, by clicking the button below:</p>
            
            <div className="text-center mb-6">
              <Button className="bg-pulse-gradient">View Full Certification Report</Button>
            </div>
            
            <p className="mb-4">In addition, you now have access to your embeddable certification badge that can be displayed on your website, recruitment materials, and other marketing channels.</p>
            
            <p className="mb-4">Congratulations on this achievement! We look forward to seeing how you'll continue to build and maintain an exceptional workplace culture.</p>
            
            <p className="mb-6">
              Best regards,<br />
              The PulsePlace Team
            </p>
            
            <div className="text-xs text-gray-500 border-t pt-4">
              <p>This certification is based on data collected during your assessment period. Recertification is recommended annually to maintain your status.</p>
              <p>© {new Date().getFullYear()} PulsePlace AI, Inc. All rights reserved.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationEmailTemplate;
