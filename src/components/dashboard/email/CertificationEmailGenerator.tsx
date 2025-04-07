
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PulseScoreData } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';
import PersonalizationForm, { EmailPersonalization } from './components/PersonalizationForm';
import EmailPreview from './components/EmailPreview';
import EmailActions from './components/EmailActions';
import { generateHtmlEmail } from './utils/emailGenerator';

interface CertificationEmailGeneratorProps {
  pulseScoreData?: PulseScoreData;
  companyName?: string;
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

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generateHtmlEmail(personalization));
    toast({
      title: "HTML Copied",
      description: "Email template HTML has been copied to clipboard",
    });
  };

  const handleDownloadHtml = () => {
    const element = document.createElement('a');
    const file = new Blob([generateHtmlEmail(personalization)], {type: 'text/html'});
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
        <EmailActions 
          onCopyHtml={handleCopyHtml}
          onDownloadHtml={handleDownloadHtml}
          onSendTestEmail={handleSendTestEmail}
          onRandomize={handleRandomize}
        />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalizationForm 
            personalization={personalization}
            handleInputChange={handleInputChange}
          />
          <EmailPreview personalization={personalization} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationEmailGenerator;
