
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PulseScoreTier } from '@/types/scoring.types';
import { BadgeStyle } from '@/types/badge.types';
import { useBadgeSharing } from './hooks/useBadgeSharing';
import HtmlEmbedTab from './components/HtmlEmbedTab';
import LinkedInTab from './components/LinkedInTab';
import TwitterTab from './components/TwitterTab';
import NotionTab from './components/NotionTab';
import SharingTabs from './components/SharingTabs';
import CustomCtaInput from './components/CustomCtaInput';
import BadgeStyleSelector from './components/BadgeStyleSelector';

interface CertificationSharingProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  issueDate?: string;
  validUntil?: string;
  isLoading?: boolean;
}

const CertificationSharing: React.FC<CertificationSharingProps> = ({
  companyName = 'Acme Corporation',
  tier = 'thriving',
  score = 86,
  issueDate = 'August 7, 2025',
  validUntil = 'August 7, 2026',
  isLoading = false,
}) => {
  const {
    activeTab,
    setActiveTab,
    badgeStyle,
    setBadgeStyle,
    customCta,
    setCustomCta,
    hasCopied,
    handleCopy,
    handleDownloadBadge
  } = useBadgeSharing();
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Certification Sharing Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <CustomCtaInput value={customCta} onChange={setCustomCta} />
          <BadgeStyleSelector badgeStyle={badgeStyle as BadgeStyle} onChange={(style: BadgeStyle) => setBadgeStyle(style)} />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <SharingTabs activeTab={activeTab} />
          
          {/* HTML Embed Tab */}
          <TabsContent value="html">
            <HtmlEmbedTab
              companyName={companyName}
              tier={tier}
              score={score}
              issueDate={issueDate}
              validUntil={validUntil}
              badgeSize={badgeStyle as BadgeStyle}
              customCta={customCta}
              onCopy={handleCopy}
              onDownload={handleDownloadBadge}
            />
          </TabsContent>
          
          {/* LinkedIn Tab */}
          <TabsContent value="linkedin">
            <LinkedInTab
              companyName={companyName}
              tier={tier}
              score={score}
              issueDate={issueDate}
              validUntil={validUntil}
              badgeSize={badgeStyle as BadgeStyle}
              customCta={customCta}
              onCopy={handleCopy}
              onDownload={handleDownloadBadge}
            />
          </TabsContent>
          
          {/* Twitter/X Tab */}
          <TabsContent value="twitter">
            <TwitterTab
              companyName={companyName}
              tier={tier}
              score={score}
              issueDate={issueDate}
              validUntil={validUntil}
              badgeSize={badgeStyle as BadgeStyle}
              customCta={customCta}
              onCopy={handleCopy}
              onDownload={handleDownloadBadge}
            />
          </TabsContent>
          
          {/* Notion Tab */}
          <TabsContent value="notion">
            <NotionTab
              companyName={companyName}
              tier={tier}
              score={score}
              issueDate={issueDate}
              validUntil={validUntil}
              badgeSize={badgeStyle as BadgeStyle}
              customCta={customCta}
              onCopy={handleCopy}
              onDownload={handleDownloadBadge}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CertificationSharing;
