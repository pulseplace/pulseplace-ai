
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Code, Twitter, Linkedin, Globe, FileText, Download } from 'lucide-react';
import CertificationBadge from './CertificationBadge';
import { PulseScoreTier } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

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
  
  // Generate HTML embed code
  const generateHtmlCode = (): string => {
    const baseUrl = 'https://pulseplace.ai/certification/verify';
    const params = new URLSearchParams({
      company: companyName,
      tier: tier,
      score: score.toString(),
      issued: issueDate,
      valid: validUntil,
      style: badgeSize,
      cta: customCta || ''
    });
    
    return `<!-- PulsePlace Certification Badge -->
<script src="https://cdn.pulseplace.ai/badge.js" defer></script>
<div class="pulseplace-badge" data-badge-url="${baseUrl}?${params.toString()}"></div>
<!-- End PulsePlace Badge -->`;
  };
  
  // Generate Notion embed code
  const generateNotionCode = (): string => {
    const baseUrl = 'https://pulseplace.ai/certification/embed';
    const params = new URLSearchParams({
      company: companyName,
      tier: tier,
      score: score.toString(),
      issued: issueDate,
      valid: validUntil,
      style: 'notion',
      cta: customCta || ''
    });
    
    return `${baseUrl}?${params.toString()}`;
  };
  
  // Generate LinkedIn post text
  const generateLinkedInText = (): string => {
    return `We're proud to announce that ${companyName} has been officially certified by PulsePlace with a PulseScore™ of ${score}/100! 

This certification reflects our commitment to creating a positive workplace environment where employees can thrive. 

Learn more about what makes us a great place to work: https://pulseplace.ai/certification/${encodeURIComponent(companyName)}

#PulseCertified #WorkplaceCulture #EmployeeExperience`;
  };
  
  // Generate Twitter/X post text
  const generateTwitterText = (): string => {
    return `🎉 ${companyName} is now Pulse Certified™ with a score of ${score}/100! 

We're committed to creating a workplace where people thrive.

Verify our certification: https://pulseplace.ai/c/${encodeURIComponent(companyName)}

#PulseCertified #WorkplaceCulture`;
  };
  
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
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="bg-white p-4 border rounded-md mb-4 flex justify-center">
                  <CertificationBadge 
                    companyName={companyName}
                    tier={tier}
                    score={score}
                    issueDate={issueDate}
                    validUntil={validUntil}
                    size={badgeSize as 'standard' | 'compact'}
                    customCta={customCta}
                  />
                </div>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={handleDownloadBadge}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Badge
                </Button>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs h-[180px]">
                    {generateHtmlCode()}
                  </pre>
                  <Button 
                    className="absolute top-2 right-2"
                    size="sm"
                    onClick={() => handleCopy('html', generateHtmlCode())}
                    variant="outline"
                  >
                    {hasCopied.html ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800">
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
          </TabsContent>
          
          {/* LinkedIn Tab */}
          <TabsContent value="linkedin">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="bg-white p-4 border rounded-md mb-4 flex justify-center">
                  <CertificationBadge 
                    companyName={companyName}
                    tier={tier}
                    score={score}
                    issueDate={issueDate}
                    validUntil={validUntil}
                    size={badgeSize as 'standard' | 'compact'}
                    customCta={customCta}
                    variant="linkedin"
                  />
                </div>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={handleDownloadBadge}
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
                    value={generateLinkedInText()}
                  />
                  <Button 
                    className="absolute top-2 right-2"
                    size="sm"
                    onClick={() => handleCopy('linkedin', generateLinkedInText())}
                    variant="outline"
                  >
                    {hasCopied.linkedin ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Text
                      </>
                    )}
                  </Button>
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
          </TabsContent>
          
          {/* Twitter/X Tab */}
          <TabsContent value="twitter">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="bg-white p-4 border rounded-md mb-4 flex justify-center">
                  <CertificationBadge 
                    companyName={companyName}
                    tier={tier}
                    score={score}
                    issueDate={issueDate}
                    validUntil={validUntil}
                    size={badgeSize as 'standard' | 'compact'}
                    customCta={customCta}
                    variant="twitter"
                  />
                </div>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={handleDownloadBadge}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Badge for X/Twitter
                </Button>
              </div>
              
              <div className="md:w-1/2">
                <Label className="mb-2 block">X/Twitter Post Text</Label>
                <div className="relative">
                  <Textarea 
                    className="h-[180px] text-sm font-normal" 
                    value={generateTwitterText()}
                  />
                  <Button 
                    className="absolute top-2 right-2"
                    size="sm"
                    onClick={() => handleCopy('twitter', generateTwitterText())}
                    variant="outline"
                  >
                    {hasCopied.twitter ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Text
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-800">
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
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Notion Tab */}
          <TabsContent value="notion">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="bg-white p-4 border rounded-md mb-4 flex justify-center">
                  <CertificationBadge 
                    companyName={companyName}
                    tier={tier}
                    score={score}
                    issueDate={issueDate}
                    validUntil={validUntil}
                    size={badgeSize as 'standard' | 'compact'}
                    customCta={customCta}
                    variant="notion"
                  />
                </div>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={handleDownloadBadge}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Badge
                </Button>
              </div>
              
              <div className="md:w-1/2">
                <Label className="mb-2 block">Notion/Webflow Embed URL</Label>
                <div className="relative">
                  <Input
                    value={generateNotionCode()}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button 
                    className="absolute top-0 right-0 h-full rounded-l-none"
                    size="sm"
                    onClick={() => handleCopy('notion', generateNotionCode())}
                    variant="outline"
                  >
                    {hasCopied.notion ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy URL
                      </>
                    )}
                  </Button>
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CertificationSharing;
