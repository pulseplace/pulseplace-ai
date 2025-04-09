
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, ExternalLink } from 'lucide-react';
import CertificationBadgeStyled from '../CertificationBadgeStyled';
import CopyButton from './CopyButton';
import { generateNotionCode } from '../utils/sharingCodeGenerators';
import { PulseScoreTier } from '@/types/scoring.types';
import { BadgeStyle } from '@/types/badge.types';
import { useToast } from "@/hooks/use-toast";

interface NotionTabProps {
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

const NotionTab: React.FC<NotionTabProps> = ({
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
  const notionUrl = generateNotionCode(
    companyName,
    tier,
    score,
    issueDate,
    validUntil,
    badgeSize,
    customCta
  );

  const openDemo = () => {
    // Open a demo page showing how the embed looks in Notion
    window.open(notionUrl, "_blank", "noopener,noreferrer");
    
    toast({
      title: "Preview Opened",
      description: "Viewing the embed preview in a new tab"
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
            variant="notion"
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
            className="hover:scale-[1.02] transition-transform duration-200 bg-black hover:bg-black/80"
            onClick={openDemo}
          >
            <FileText className="h-4 w-4 mr-2" />
            Preview Embed
          </Button>
        </div>
      </div>
      
      <div className="md:w-1/2">
        <Label className="mb-2 block">Notion/Webflow Embed URL</Label>
        <div className="relative">
          <Input
            value={notionUrl}
            readOnly
            className="font-mono text-xs shadow-inner bg-gray-50 border-gray-200"
          />
          <CopyButton 
            className="absolute top-0 right-0 h-full rounded-l-none shadow-sm"
            text={notionUrl}
            onCopy={(text) => onCopy('notion', text)}
            label="Copy URL"
          />
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800 border border-blue-100 shadow-sm">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4" />
            Embed in Notion or Webflow
          </h3>
          <ol className="space-y-2 pl-5 list-decimal">
            <li>Copy the URL above</li>
            <li>In Notion: Create an embed block and paste the URL</li>
            <li>In Webflow: Add an embed element and paste the URL</li>
            <li>The badge will automatically appear in your document</li>
          </ol>
          <div className="mt-3 pt-3 border-t border-blue-200 flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 mt-1"
              variant="outline"
              onClick={() => window.open("https://www.notion.so/", "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Notion
            </Button>
            <Button 
              size="sm" 
              className="flex-1 mt-1"
              variant="outline"
              onClick={() => window.open("https://webflow.com/", "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Webflow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionTab;
