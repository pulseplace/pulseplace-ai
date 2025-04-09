
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PulseScoreTier } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';
import { Download, ExternalLink, Code, Copy, Check } from 'lucide-react';
import CertificationBadge from './CertificationBadge';

interface BadgeGeneratorProps {
  companyName?: string;
  tier?: PulseScoreTier;
  score?: number;
  issueDate?: string;
  validUntil?: string;
}

const BadgeGenerator: React.FC<BadgeGeneratorProps> = ({
  companyName = 'Acme Corporation',
  tier = 'pulse_certified',
  score = 86,
  issueDate = 'April 9, 2025',
  validUntil = 'April 9, 2026',
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('editor');
  const [badgeSettings, setBadgeSettings] = useState({
    companyName,
    tier,
    score,
    issueDate,
    validUntil,
    badgeSize: 'standard' as 'standard' | 'compact',
    badgeStyle: 'default' as 'default' | 'minimal' | 'colorful',
    customCta: "We're Pulse Certified!"
  });
  const [hasCopied, setHasCopied] = useState(false);
  
  const generateEmbedCode = (): string => {
    const baseUrl = 'https://pulseplace.ai/certification/verify';
    const params = new URLSearchParams({
      company: badgeSettings.companyName,
      tier: badgeSettings.tier,
      score: badgeSettings.score.toString(),
      issued: badgeSettings.issueDate,
      valid: badgeSettings.validUntil,
      style: badgeSettings.badgeSize + '-' + badgeSettings.badgeStyle,
      cta: badgeSettings.customCta || ''
    });
    
    return `<!-- PulsePlace Certification Badge -->
<script src="https://cdn.pulseplace.ai/badge.js" defer></script>
<div class="pulseplace-badge" data-badge-url="${baseUrl}?${params.toString()}"></div>
<!-- End PulsePlace Badge -->`;
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setHasCopied(true);
    
    toast({
      title: "Embed Code Copied",
      description: "Badge embed code has been copied to clipboard"
    });
    
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };
  
  const handleDownloadBadge = () => {
    toast({
      title: "Badge Downloaded",
      description: "Your certification badge has been downloaded as an image"
    });
    // In a real implementation, we would convert the SVG to PNG and download
  };
  
  const handleInputChange = (field: string, value: string | number) => {
    setBadgeSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>PulseScore™ Badge Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="editor">Badge Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Embed Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={badgeSettings.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="score">PulseScore™</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  value={badgeSettings.score}
                  onChange={(e) => handleInputChange('score', parseInt(e.target.value, 10))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="tier">Certification Tier</Label>
                <Select
                  value={badgeSettings.tier}
                  onValueChange={(value: PulseScoreTier) => handleInputChange('tier', value)}
                >
                  <SelectTrigger id="tier" className="mt-1">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pulse_certified">Pulse Certified</SelectItem>
                    <SelectItem value="pulse_gold">Pulse Gold</SelectItem>
                    <SelectItem value="pulse_platinum">Pulse Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="badgeSize">Badge Size</Label>
                <Select
                  value={badgeSettings.badgeSize}
                  onValueChange={(value: 'standard' | 'compact') => handleInputChange('badgeSize', value)}
                >
                  <SelectTrigger id="badgeSize" className="mt-1">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="badgeStyle">Badge Style</Label>
                <Select
                  value={badgeSettings.badgeStyle}
                  onValueChange={(value: 'default' | 'minimal' | 'colorful') => handleInputChange('badgeStyle', value)}
                >
                  <SelectTrigger id="badgeStyle" className="mt-1">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="customCta">Custom Call-to-Action (Optional)</Label>
                <Input
                  id="customCta"
                  value={badgeSettings.customCta}
                  onChange={(e) => handleInputChange('customCta', e.target.value)}
                  className="mt-1"
                  placeholder="e.g., We're Pulse Certified!"
                />
              </div>
              
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  value={badgeSettings.issueDate}
                  onChange={(e) => handleInputChange('issueDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="validUntil">Valid Until</Label>
                <Input
                  id="validUntil"
                  value={badgeSettings.validUntil}
                  onChange={(e) => handleInputChange('validUntil', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="flex justify-center p-6 bg-gray-50 rounded-md">
            <div className="max-w-md">
              <CertificationBadge 
                companyName={badgeSettings.companyName}
                tier={badgeSettings.tier}
                score={badgeSettings.score}
                issueDate={badgeSettings.issueDate}
                validUntil={badgeSettings.validUntil}
                size={badgeSettings.badgeSize}
                variant={badgeSettings.badgeStyle}
                customCta={badgeSettings.customCta}
              />
              
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleDownloadBadge}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Badge
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code">
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs h-[180px]">
                {generateEmbedCode()}
              </pre>
              <Button 
                className="absolute top-2 right-2"
                size="sm"
                onClick={handleCopyCode}
                variant="outline"
              >
                {hasCopied ? (
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
                Integration Instructions
              </h3>
              <ol className="space-y-2 pl-5 list-decimal">
                <li>Copy the embed code above</li>
                <li>Paste it into the HTML of your website where you want the badge to appear</li>
                <li>The badge will automatically be rendered on your site</li>
                <li>When users click on the badge, they'll be redirected to our verification page</li>
                <li>Add this badge to your career page, about us section, or company footer</li>
              </ol>
              
              <div className="mt-4 pt-2 border-t border-blue-200">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://pulseplace.ai/certification/docs', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BadgeGenerator;
