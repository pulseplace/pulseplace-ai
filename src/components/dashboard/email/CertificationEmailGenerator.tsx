
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Mail, RefreshCw } from 'lucide-react';
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

interface CertificationEmailGeneratorProps {
  pulseScoreData?: PulseScoreData;
  companyName?: string;
}

interface EmailPersonalization {
  recipient_name: string;
  pulse_score: string;
  certification_level: string;
  trust_score: string;
  engagement_score: string;
  culture_score: string;
  ai_summary: string;
  badge_download_link: string;
}

const CertificationEmailGenerator: React.FC<CertificationEmailGeneratorProps> = ({
  pulseScoreData,
  companyName = 'Acme Corporation',
}) => {
  const { toast } = useToast();
  const [personalization, setPersonalization] = useState<EmailPersonalization>({
    recipient_name: 'Sarah Chen',
    pulse_score: pulseScoreData ? pulseScoreData.overallScore.toString() : '86',
    certification_level: pulseScoreData ? getTierDisplay(pulseScoreData.tier).label : 'Pulse Certified™',
    trust_score: '85/100',
    engagement_score: '88/100',
    culture_score: '82/100',
    ai_summary: 'Your organization shows strong engagement metrics with opportunities to improve in communication and career development areas.',
    badge_download_link: 'https://app.pulseplace.ai/certification/download-badge'
  });

  const handleInputChange = (field: keyof EmailPersonalization, value: string) => {
    setPersonalization(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generated HTML email template
  const generateHtmlEmail = () => {
    return `<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PulsePlace Certification Summary</title>
    <style>
      body {
        font-family: 'Helvetica Neue', sans-serif;
        background-color: #f4f6f8;
        color: #333;
        padding: 20px;
        margin: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
      }
      .logo {
        width: 160px;
        margin-bottom: 20px;
      }
      .highlight {
        font-size: 28px;
        color: #1365ff;
        font-weight: bold;
      }
      .badge {
        background-color: #e8f0fe;
        padding: 12px 18px;
        display: inline-block;
        border-radius: 6px;
        font-weight: bold;
        color: #1365ff;
        margin-top: 10px;
      }
      .section {
        margin-top: 30px;
      }
      .category {
        background: #f1f4f9;
        padding: 10px 16px;
        border-radius: 8px;
        margin-top: 8px;
      }
      .footer {
        margin-top: 40px;
        font-size: 13px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://pulseplace.ai/logo-dark.png" alt="PulsePlace Logo" class="logo" />
      <p>Hello <strong>${personalization.recipient_name}</strong>,</p>

      <p>We're thrilled to share your latest certification summary from <strong>PulsePlace.ai</strong>.</p>

      <div class="section">
        <p class="highlight">PulseScore™: ${personalization.pulse_score} / 100</p>
        <div class="badge">${personalization.certification_level}</div>
      </div>

      <div class="section">
        <p><strong>Category Breakdown:</strong></p>
        <div class="category">Trust & Psychological Safety: <strong>${personalization.trust_score}</strong></div>
        <div class="category">Engagement & Retention: <strong>${personalization.engagement_score}</strong></div>
        <div class="category">Mission & Belonging: <strong>${personalization.culture_score}</strong></div>
      </div>

      <div class="section">
        <p><strong>AI Insight Summary:</strong><br />
        "${personalization.ai_summary}"</p>
      </div>

      <div class="section">
        <p>You're now eligible to use the official <strong>Pulse Certified™</strong> badge on your website, LinkedIn, and careers page.</p>
        <a href="${personalization.badge_download_link}" class="badge">Download Badge</a>
      </div>

      <div class="footer">
        PulsePlace.ai — Redefining workplace trust through data & AI<br />
        This is an automated summary. For support, contact <a href="mailto:hello@pulseplace.ai">hello@pulseplace.ai</a>
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
    element.download = `pulseplace-certification-${personalization.recipient_name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: "Email template HTML is downloading",
    });
  };

  const handleSendTestEmail = () => {
    // This would connect to a backend service to actually send the email
    toast({
      title: "Test Email Sent",
      description: `A test email has been sent to ${personalization.recipient_name}`,
    });
  };

  const handleRandomize = () => {
    const scores = [
      Math.floor(Math.random() * 15) + 75, 
      Math.floor(Math.random() * 15) + 75, 
      Math.floor(Math.random() * 15) + 75
    ];
    
    const insights = [
      "Your organization shows strong engagement metrics with room for improvement in communication.",
      "Team collaboration scores are exceptional, with leadership trust requiring additional focus.",
      "Mission alignment is outstanding, while work-life balance scores indicate potential burnout risks.",
      "Career development opportunities received lower ratings but are offset by strong culture scores."
    ];
    
    setPersonalization({
      ...personalization,
      pulse_score: (Math.floor(Math.random() * 15) + 80).toString(),
      trust_score: `${scores[0]}/100`,
      engagement_score: `${scores[1]}/100`,
      culture_score: `${scores[2]}/100`,
      ai_summary: insights[Math.floor(Math.random() * insights.length)]
    });
    
    toast({
      title: "Values Randomized",
      description: "Preview data has been refreshed with random values",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Certification Email Generator</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRandomize}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Randomize
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personalization Fields</h3>
            
            <div>
              <Label htmlFor="recipient_name">Recipient Name</Label>
              <Input 
                id="recipient_name" 
                value={personalization.recipient_name} 
                onChange={(e) => handleInputChange('recipient_name', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="pulse_score">Pulse Score (0-100)</Label>
              <Input 
                id="pulse_score" 
                value={personalization.pulse_score} 
                onChange={(e) => handleInputChange('pulse_score', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="certification_level">Certification Level</Label>
              <Input 
                id="certification_level" 
                value={personalization.certification_level} 
                onChange={(e) => handleInputChange('certification_level', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="trust_score">Trust Score</Label>
                <Input 
                  id="trust_score" 
                  value={personalization.trust_score} 
                  onChange={(e) => handleInputChange('trust_score', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="engagement_score">Engagement</Label>
                <Input 
                  id="engagement_score" 
                  value={personalization.engagement_score} 
                  onChange={(e) => handleInputChange('engagement_score', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="culture_score">Culture</Label>
                <Input 
                  id="culture_score" 
                  value={personalization.culture_score} 
                  onChange={(e) => handleInputChange('culture_score', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="ai_summary">AI Insight Summary</Label>
              <Input 
                id="ai_summary" 
                value={personalization.ai_summary} 
                onChange={(e) => handleInputChange('ai_summary', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="badge_download_link">Badge Download Link</Label>
              <Input 
                id="badge_download_link" 
                value={personalization.badge_download_link} 
                onChange={(e) => handleInputChange('badge_download_link', e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md p-4 overflow-auto max-h-[560px]">
            <h3 className="text-lg font-semibold mb-4">Email Preview</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-center mb-4">
                <div className="text-xl font-bold text-blue-600">PulsePlace</div>
                <div className="text-sm text-gray-500">Certification Summary</div>
              </div>
              
              <p className="mb-3">Hello <strong>{personalization.recipient_name}</strong>,</p>
              
              <p className="mb-3">We're thrilled to share your latest certification summary from <strong>PulsePlace.ai</strong>.</p>
              
              <div className="mb-4">
                <p className="text-xl font-bold text-blue-600">PulseScore™: {personalization.pulse_score} / 100</p>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block font-medium mt-1">
                  {personalization.certification_level}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="font-medium mb-2">Category Breakdown:</p>
                <div className="bg-white p-2 rounded-md mb-1">Trust & Psychological Safety: <strong>{personalization.trust_score}</strong></div>
                <div className="bg-white p-2 rounded-md mb-1">Engagement & Retention: <strong>{personalization.engagement_score}</strong></div>
                <div className="bg-white p-2 rounded-md mb-1">Mission & Belonging: <strong>{personalization.culture_score}</strong></div>
              </div>
              
              <div className="mb-4">
                <p className="font-medium mb-1">AI Insight Summary:</p>
                <p className="text-sm italic">"{personalization.ai_summary}"</p>
              </div>
              
              <div className="mb-4">
                <p className="mb-2">You're now eligible to use the official <strong>Pulse Certified™</strong> badge on your website, LinkedIn, and careers page.</p>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block font-medium">
                  Download Badge
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-6">
                PulsePlace.ai — Redefining workplace trust through data & AI<br />
                This is an automated summary. For support, contact hello@pulseplace.ai
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationEmailGenerator;
