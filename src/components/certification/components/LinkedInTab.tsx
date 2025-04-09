
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Linkedin, ExternalLink } from 'lucide-react';
import CertificationBadgeStyled from '../CertificationBadgeStyled';
import CopyButton from './CopyButton';
import { generateLinkedInText } from '../utils/sharingCodeGenerators';
import { PulseScoreTier } from '@/types/scoring.types';
import { BadgeStyle } from '@/types/badge.types';
import { useToast } from "@/hooks/use-toast";

interface LinkedInTabProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  issueDate?: string;
  validUntil?: string;
  badgeSize: BadgeStyle;
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
  const { toast } = useToast();
  const linkedInText = generateLinkedInText(companyName, score);

  const openLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://pulseplace.ai/certification/" + encodeURIComponent(companyName))}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
    
    toast({
      title: "Opening LinkedIn",
      description: "LinkedIn sharing window has been opened"
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <div className="bg-white p-4 border rounded-md mb-4 flex justify-center shadow-sm hover:shadow-md transition-all duration-300">
          <CertificationBadgeStyled 
            companyName={companyName}
            tier={tier}
            score={score}
            issueDate={issueDate}
            validUntil={validUntil}
            style={badgeSize}
            customCta={customCta}
            variant="linkedin"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            className="hover:scale-[1.02] transition-transform duration-200"
            variant="outline"
            onClick={onDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Badge
          </Button>
          <Button 
            className="hover:scale-[1.02] transition-transform duration-200 bg-[#0A66C2] hover:bg-[#0A66C2]/90"
            onClick={openLinkedIn}
          >
            <Linkedin className="h-4 w-4 mr-2" />
            Share Now
          </Button>
        </div>
      </div>
      
      <div className="md:w-1/2">
        <Label className="mb-2 block">LinkedIn Post Text</Label>
        <div className="relative">
          <Textarea 
            className="h-[180px] text-sm font-normal border-gray-200 shadow-inner" 
            value={linkedInText}
            readOnly
          />
          <CopyButton 
            className="absolute top-2 right-2 shadow-sm"
            text={linkedInText}
            onCopy={(text) => onCopy('linkedin', text)}
            label="Copy Text"
          />
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800 border border-blue-100 shadow-sm">
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
          <div className="mt-3 pt-3 border-t border-blue-200">
            <Button 
              size="sm" 
              className="w-full mt-1"
              variant="outline"
              onClick={openLinkedIn}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open LinkedIn in New Tab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInTab;
