
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Code } from 'lucide-react';
import CertificationBadge from '../CertificationBadge';
import CopyButton from './CopyButton';
import { generateHtmlCode } from '../utils/sharingCodeGenerators';
import { PulseScoreTier } from '@/types/scoring.types';

interface HtmlEmbedTabProps {
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

const HtmlEmbedTab: React.FC<HtmlEmbedTabProps> = ({
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
  const htmlCode = generateHtmlCode(
    companyName,
    tier,
    score,
    issueDate,
    validUntil,
    badgeSize,
    customCta
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <div className="bg-white p-4 border rounded-md mb-4 flex justify-center shadow-sm hover:shadow-md transition-all duration-300">
          <CertificationBadge 
            companyName={companyName}
            tier={tier}
            score={score}
            issueDate={issueDate}
            validUntil={validUntil}
            size={badgeSize}
            customCta={customCta}
          />
        </div>
        <Button 
          className="w-full hover:scale-[1.02] transition-transform duration-200"
          variant="outline"
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Badge
        </Button>
      </div>
      
      <div className="md:w-1/2">
        <div className="relative">
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs h-[180px] border border-gray-200 shadow-inner">
            {htmlCode}
          </pre>
          <CopyButton 
            className="absolute top-2 right-2 shadow-sm"
            text={htmlCode}
            onCopy={(text) => onCopy('html', text)}
          />
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800 border border-blue-100 shadow-sm">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <Code className="h-4 w-4" />
            Add to Your Website
          </h3>
          <ol className="space-y-2 pl-5 list-decimal">
            <li>Copy the HTML above</li>
            <li>Paste it into your website where you want the badge to appear</li>
            <li>The badge will automatically render on your site</li>
            <li>Works with most website builders including WordPress, Wix, and Squarespace</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HtmlEmbedTab;
