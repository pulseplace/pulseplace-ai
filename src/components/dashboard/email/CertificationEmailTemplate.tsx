
import React from 'react';
import { PulseScoreData } from '@/types/scoring.types';
import EmailHtmlGenerator from './components/EmailHtmlGenerator';
import EmailPreviewContent from './components/EmailPreviewContent';

// Import UI components
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Send, Download, Copy } from 'lucide-react';

interface CertificationEmailTemplateProps {
  pulseScore: PulseScoreData;
  companyName?: string;
  recipientEmail?: string;
  onSendClick?: () => void;
}

const CertificationEmailTemplate: React.FC<CertificationEmailTemplateProps> = ({
  pulseScore,
  companyName = 'Your Company',
  recipientEmail,
  onSendClick
}) => {
  const emailData = {
    ...pulseScore,
    companyName
  };

  return (
    <Card className="shadow-md border-gray-200">
      <CardContent className="pt-6 pb-2">
        <EmailPreviewContent pulseScore={emailData} />
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          {recipientEmail ? `Send to: ${recipientEmail}` : 'Preview mode'}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            Copy HTML
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button 
            size="sm" 
            className="bg-pulse-gradient"
            onClick={onSendClick}
            disabled={!recipientEmail}
          >
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CertificationEmailTemplate;
