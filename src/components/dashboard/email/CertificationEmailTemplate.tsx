
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';
import EmailTemplateActions from './components/EmailTemplateActions';
import EmailPreviewContent from './components/EmailPreviewContent';
import HtmlCodePreview from './components/HtmlCodePreview';
import { generateCertificationHtml } from './components/EmailHtmlGenerator';

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
  
  // Generate HTML version of the email
  const generateHtmlEmail = () => {
    return generateCertificationHtml({
      recipientName,
      companyName,
      pulseScoreData,
      certificationLevel
    });
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

  const handleSendTestEmail = async (): Promise<void> => {
    // Since this is a demo/template function, it only shows a toast notification
    // In a real implementation, it would connect to a backend service
    return new Promise<void>((resolve) => {
      // Simulate a short delay to show the loading state
      setTimeout(() => {
        toast({
          title: "Test Email Sent",
          description: `A test email has been sent to ${recipientEmail}`,
        });
        resolve();
      }, 500);
    });
  };
  
  const toggleHtmlView = () => {
    setShowHtml(!showHtml);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Certification Email Template</CardTitle>
        <EmailTemplateActions 
          showHtml={showHtml}
          onToggleView={toggleHtmlView}
          onCopyHtml={handleCopyHtml}
          onDownloadHtml={handleDownloadHtml}
          onSendTestEmail={handleSendTestEmail}
        />
      </CardHeader>
      <CardContent>
        {showHtml ? (
          <HtmlCodePreview htmlContent={generateHtmlEmail()} />
        ) : (
          <div className="border rounded-md overflow-auto max-h-[600px] bg-white">
            <EmailPreviewContent
              recipientName={recipientName}
              pulseScoreData={pulseScoreData}
              certificationLevel={certificationLevel}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationEmailTemplate;
