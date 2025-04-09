
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Twitter, ExternalLink } from 'lucide-react';
import CertificationBadgeStyled from '../CertificationBadgeStyled';
import CopyButton from './CopyButton';
import { generateTwitterText } from '../utils/sharingCodeGenerators';
import { PulseScoreTier } from '@/types/scoring.types';
import { BadgeStyle } from '@/types/badge.types';
import { useToast } from "@/hooks/use-toast";

interface TwitterTabProps {
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

const TwitterTab: React.FC<TwitterTabProps> = ({
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
  const twitterText = generateTwitterText(companyName, score);

  const openTwitter = () => {
    const tweetText = encodeURIComponent(twitterText);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
    
    toast({
      title: "Opening X/Twitter",
      description: "Twitter sharing window has been opened"
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
            variant="twitter"
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
            className="hover:scale-[1.02] transition-transform duration-200 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
            onClick={openTwitter}
          >
            <Twitter className="h-4 w-4 mr-2" />
            Tweet Now
          </Button>
        </div>
      </div>
      
      <div className="md:w-1/2">
        <Label className="mb-2 block">X/Twitter Post Text</Label>
        <div className="relative">
          <Textarea 
            className="h-[180px] text-sm font-normal border-gray-200 shadow-inner" 
            value={twitterText}
            readOnly
          />
          <CopyButton 
            className="absolute top-2 right-2 shadow-sm"
            text={twitterText}
            onCopy={(text) => onCopy('twitter', text)}
            label="Copy Text"
          />
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800 border border-blue-100 shadow-sm">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <Twitter className="h-4 w-4" />
            Share on X/Twitter
          </h3>
          <ol className="space-y-2 pl-5 list-decimal">
            <li>Copy the text above</li>
            <li>Download the X/Twitter-optimized badge image</li>
            <li>Create a new post, paste the text, and upload the badge image</li>
            <li>Tag @PulsePlace to amplify your certification announcement</li>
          </ol>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <Button 
              size="sm" 
              className="w-full mt-1"
              variant="outline"
              onClick={openTwitter}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open X/Twitter in New Tab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterTab;
