
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText } from 'lucide-react';
import CertificationBadge from '../CertificationBadge';
import CopyButton from './CopyButton';
import { generateNotionCode } from '../utils/sharingCodeGenerators';
import { PulseScoreTier } from '@/types/scoring.types';

interface NotionTabProps {
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
  const notionUrl = generateNotionCode(
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
        <div className="bg-white p-4 border rounded-md mb-4 flex justify-center">
          <CertificationBadge 
            companyName={companyName}
            tier={tier}
            score={score}
            issueDate={issueDate}
            validUntil={validUntil}
            size={badgeSize}
            customCta={customCta}
            variant="notion"
          />
        </div>
        <Button 
          className="w-full"
          variant="outline"
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Badge
        </Button>
      </div>
      
      <div className="md:w-1/2">
        <Label className="mb-2 block">Notion/Webflow Embed URL</Label>
        <div className="relative">
          <Input
            value={notionUrl}
            readOnly
            className="font-mono text-xs"
          />
          <CopyButton 
            className="absolute top-0 right-0 h-full rounded-l-none"
            text={notionUrl}
            onCopy={(text) => onCopy('notion', text)}
            label="Copy URL"
          />
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800">
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
        </div>
      </div>
    </div>
  );
};

export default NotionTab;
