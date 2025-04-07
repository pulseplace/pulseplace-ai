
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Globe, Twitter, Linkedin, FileText } from 'lucide-react';
import { PulseScoreTier } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';
import HtmlEmbedTab from './components/HtmlEmbedTab';
import LinkedInTab from './components/LinkedInTab';
import TwitterTab from './components/TwitterTab';
import NotionTab from './components/NotionTab';

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
  tier = 'pulse_certified',
  score = 86,
  issueDate = 'August 7, 2025',
  validUntil = 'August 7, 2026',
  isLoading = false,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('html');
  const [badgeSize, setBadgeSize] = useState('standard');
  const [customCta, setCustomCta] = useState("We're Pulse Certified!");
  const [hasCopied, setHasCopied] = useState<Record<string, boolean>>({
    html: false,
    linkedin: false, 
    twitter: false,
    notion: false
  });
  
  const tierInfo = getTierDisplay(tier);
  
  // Handle copy button click
  const handleCopy = (type: string, text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(prev => ({ ...prev, [type]: true }));
    
    toast({
      title: "Copied Successfully",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} content copied to clipboard`,
    });
    
    setTimeout(() => {
      setHasCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };
  
  // Handle badge download
  const handleDownloadBadge = () => {
    // In a real implementation, you would convert the SVG to an image and download it
    toast({
      title: "Badge Downloaded",
      description: "Your certification badge has been downloaded",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Certification Sharing Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div>
            <Label htmlFor="customCta">Custom Badge Message (Optional)</Label>
            <Input
              id="customCta"
              placeholder="e.g., We're Pulse Certified!"
              value={customCta}
              onChange={(e) => setCustomCta(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Badge Size</Label>
            <div className="flex gap-2 mt-1">
              <Button 
                variant={badgeSize === 'standard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBadgeSize('standard')}
              >
                Standard
              </Button>
              <Button 
                variant={badgeSize === 'compact' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBadgeSize('compact')}
              >
                Compact
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="html" className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              HTML
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center">
              <Twitter className="h-4 w-4 mr-2" />
              X/Twitter
            </TabsTrigger>
            <TabsTrigger value="notion" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Notion
            </TabsTrigger>
          </TabsList>
          
          {/* HTML Embed Tab */}
          <TabsContent value="html">
            <HtmlEmbedTab
              companyName={companyName}
              tier={tier}
              score={score}
              issueDate={issueDate}
              validUntil={validUntil}
              badgeSize={badgeSize as 'standard' | 'compact'}
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
              badgeSize={badgeSize as 'standard' | 'compact'}
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
              badgeSize={badgeSize as 'standard' | 'compact'}
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
              badgeSize={badgeSize as 'standard' | 'compact'}
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
