
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
  overallScore: 92,
  categoryScores: [
    { category: 'emotion_index', score: 92, weight: 0.4 },
    { category: 'engagement_stability', score: 93, weight: 0.3 },
    { category: 'culture_trust', score: 90, weight: 0.3 }
  ],
  themeScores: [],
  tier: 'pulse_certified',
  insights: [
    'Your organization demonstrates outstanding levels of employee trust and belonging, with high engagement scores.'
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
  recipientName = 'John Doe',
  recipientEmail = 'john.doe@acmecorp.com'
}) => {
  const { toast } = useToast();
  const [showHtml, setShowHtml] = useState(false);
  
  const tierInfo = getTierDisplay(pulseScoreData.tier);
  const certificationLevel = "Growth Culture";
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
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PulsePlace Certification Summary</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        background-color: #f8f9fa;
        color: #1a1a2e;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header h1 {
        font-size: 36px;
        color: #0f172a;
        margin: 0;
        font-weight: 800;
      }
      .greeting {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .intro {
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 30px;
      }
      .pulse-score {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        color: #0f172a;
        margin: 30px 0 20px;
      }
      .certification-level {
        background-color: #e8f0fe;
        color: #1a1a2e;
        padding: 12px 25px;
        border-radius: 50px;
        font-size: 18px;
        font-weight: 600;
        display: inline-block;
        margin: 0 auto 30px;
        text-align: center;
      }
      .level-wrapper {
        text-align: center;
      }
      .category-title {
        font-size: 24px;
        margin-bottom: 15px;
      }
      .category-table {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 20px;
        width: 100%;
        margin-bottom: 30px;
      }
      .category-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #e1eaf8;
      }
      .category-row:last-child {
        border-bottom: none;
      }
      .category-name {
        font-weight: 500;
      }
      .category-score {
        font-weight: 600;
      }
      .insight-title {
        font-size: 24px;
        margin-bottom: 15px;
      }
      .insight-text {
        line-height: 1.6;
        margin-bottom: 30px;
      }
      .badge-info {
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .download-button {
        background-color: #1a56db;
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        display: inline-block;
        text-align: center;
        margin: 0 auto;
      }
      .button-wrapper {
        text-align: center;
        margin-bottom: 30px;
      }
      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 14px;
        color: #64748b;
      }
      .footer p {
        margin: 5px 0;
      }
      .footer a {
        color: #1a56db;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>PulsePlace.ai</h1>
      </div>
      
      <div class="greeting">
        Hello ${recipientName},
      </div>
      
      <div class="intro">
        We're thrilled to share your latest certification summary from PulsePlace.ai.
      </div>
      
      <div class="pulse-score">
        PulseScore®: ${pulseScoreData.overallScore} / 100
      </div>
      
      <div class="level-wrapper">
        <div class="certification-level">
          ${certificationLevel}
        </div>
      </div>
      
      <div class="category-title">
        Category Breakdown:
      </div>
      
      <div class="category-table">
        <div class="category-row">
          <div class="category-name">Trust & Psychological Safety:</div>
          <div class="category-score">${Math.round(pulseScoreData.categoryScores.find(c => c.category === 'culture_trust')?.score || 0)}</div>
        </div>
        <div class="category-row">
          <div class="category-name">Engagement & Retention:</div>
          <div class="category-score">${Math.round(pulseScoreData.categoryScores.find(c => c.category === 'engagement_stability')?.score || 0)}</div>
        </div>
        <div class="category-row">
          <div class="category-name">Mission & Belonging:</div>
          <div class="category-score">${Math.round(pulseScoreData.categoryScores.find(c => c.category === 'emotion_index')?.score || 0)}</div>
        </div>
      </div>
      
      <div class="insight-title">
        AI Insight Summary:
      </div>
      
      <div class="insight-text">
        "${pulseScoreData.insights[0]}"
      </div>
      
      <div class="badge-info">
        You're now eligible to use the official Pulse Certified® badge on your website, LinkedIn, and careers page.
      </div>
      
      <div class="button-wrapper">
        <a href="https://app.pulseplace.ai/certification/badge/${pulseScoreData.tier}" class="download-button">Download Badge</a>
      </div>
      
      <div class="footer">
        <p>PulsePlace.ai — Redefining workplace trust through data & AI</p>
        <p>This is an automated summary. For support, contact <a href="mailto:hello@pulseplace.ai">hello@pulseplace.ai</a></p>
      </div>
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
          <div className="border rounded-md overflow-auto max-h-[600px] bg-white">
            <div className="p-8 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-slate-900 mb-4">PulsePlace.ai</div>
              </div>
              
              <div className="text-2xl mb-4">Hello {recipientName},</div>
              
              <div className="text-lg mb-6">
                We're thrilled to share your latest certification summary from PulsePlace.ai.
              </div>
              
              <div className="text-center my-6">
                <div className="text-3xl font-bold text-slate-900 mb-3">
                  PulseScore®: {pulseScoreData.overallScore} / 100
                </div>
                <div className="inline-block bg-blue-50 text-slate-800 px-6 py-2 rounded-full font-semibold">
                  {certificationLevel}
                </div>
              </div>
              
              <div className="my-6">
                <div className="text-xl font-semibold mb-3">Category Breakdown:</div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between py-2 border-b border-blue-100">
                    <div>Trust & Psychological Safety:</div>
                    <div className="font-semibold">{Math.round(pulseScoreData.categoryScores.find(c => c.category === 'culture_trust')?.score || 0)}</div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-blue-100">
                    <div>Engagement & Retention:</div>
                    <div className="font-semibold">{Math.round(pulseScoreData.categoryScores.find(c => c.category === 'engagement_stability')?.score || 0)}</div>
                  </div>
                  <div className="flex justify-between py-2">
                    <div>Mission & Belonging:</div>
                    <div className="font-semibold">{Math.round(pulseScoreData.categoryScores.find(c => c.category === 'emotion_index')?.score || 0)}</div>
                  </div>
                </div>
              </div>
              
              <div className="my-6">
                <div className="text-xl font-semibold mb-3">AI Insight Summary:</div>
                <div className="text-slate-700">
                  "{pulseScoreData.insights[0]}"
                </div>
              </div>
              
              <div className="my-6">
                <div className="text-lg mb-4">
                  You're now eligible to use the official Pulse Certified® badge on your website, LinkedIn, and careers page.
                </div>
                <div className="text-center">
                  <a 
                    href="#" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold no-underline hover:bg-blue-700 transition-colors"
                  >
                    Download Badge
                  </a>
                </div>
              </div>
              
              <div className="mt-10 text-center text-gray-500 text-sm">
                <p>PulsePlace.ai — Redefining workplace trust through data & AI</p>
                <p className="mt-1">
                  This is an automated summary. For support, contact <a href="mailto:hello@pulseplace.ai" className="text-blue-600">hello@pulseplace.ai</a>
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationEmailTemplate;
