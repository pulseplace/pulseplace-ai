
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Linkedin } from 'lucide-react';
import CertificationBadge from '../CertificationBadge';
import CopyButton from './CopyButton';
import { generateLinkedInText } from '../utils/sharingCodeGenerators';
import { PulseScoreTier } from '@/types/scoring.types';

interface LinkedInTabProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  issueDate?: string;
  validUntil?: string;
  badgeSize: 'standard' | 'compact';
  customCta: string;
  onCopy: (type: string, text: string) => void;
  onDownload: () => void;
}

const LinkedInTab: React.FC<LinkedInTabProps> = ({
  companyName,
  tier,
  score,
  issueDate,
  validUntil,
  badgeSize,
  customCta,
  onCopy,
  onDownload
}) => {
  const linkedInText = generateLinkedInText(companyName, score);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <div className="bg-white p-4 border rounded-md mb-4 flex justify-center">
          <CertificationBadge 
            companyName={companyName}
            tier={tier}
            score={score}
            issueDate={issueDate}
            validUntil={validUntil}
            size={badgeSize}
            customCta={customCta}
            variant="linkedin"
          />
        </div>
        <Button 
          className="w-full"
          variant="outline"
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Badge for LinkedIn
        </Button>
      </div>
      
      <div className="md:w-1/2">
        <Label className="mb-2 block">LinkedIn Post Text</Label>
        <div className="relative">
          <Textarea 
            className="h-[180px] text-sm font-normal" 
            value={linkedInText}
            readOnly
          />
          <CopyButton 
            className="absolute top-2 right-2"
            text={linkedInText}
            onCopy={(text) => onCopy('linkedin', text)}
            label="Copy Text"
          />
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <Linkedin className="h-4 w-4" />
            Share on LinkedIn
          </h3>
          <ol className="space-y-2 pl-5 list-decimal">
            <li>Copy the text above</li>
            <li>Download the LinkedIn-optimized badge image</li>
            <li>Create a new LinkedIn post, paste the text, and upload the badge image</li>
            <li>Tag @PulsePlace to amplify your certification announcement</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LinkedInTab;
