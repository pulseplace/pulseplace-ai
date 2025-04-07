
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Code, Loader2 } from 'lucide-react';
import { PulseScoreTier } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmbeddableBadgeWidgetProps {
  companyName?: string;
  tier?: PulseScoreTier;
  score?: number;
  issueDate?: string;
  validUntil?: string;
  isLoading?: boolean;
}

const EmbeddableBadgeWidget: React.FC<EmbeddableBadgeWidgetProps> = ({
  companyName = 'Acme Corporation',
  tier = 'pulse_certified',
  score = 86,
  issueDate = 'August 7, 2025',
  validUntil = 'August 7, 2026',
  isLoading = false,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('preview');
  const [badgeType, setBadgeType] = useState('standard');
  const [hasCopied, setHasCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const tierInfo = getTierDisplay(tier);
  
  // Generate the embed code for the badge
  const generateEmbedCode = (): string => {
    try {
      const baseUrl = 'https://pulseplace.ai/certification/verify';
      const params = new URLSearchParams({
        company: companyName,
        tier: tier,
        score: score.toString(),
        issued: issueDate,
        valid: validUntil,
        style: badgeType
      });
      
      return `<!-- PulsePlace Certification Badge -->
<script src="https://cdn.pulseplace.ai/badge.js" defer></script>
<div class="pulseplace-badge" data-badge-url="${baseUrl}?${params.toString()}"></div>
<!-- End PulsePlace Badge -->`;
    } catch (err) {
      setError('Error generating embed code. Please try again.');
      return '';
    }
  };
  
  // SVG code for different badge types
  const standardBadgeSvg = `<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="120" rx="8" fill="url(#paint0_linear)" />
  <path d="M31.5 42.5L37 48L46 36" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  <rect x="24" y="30" width="36" height="36" rx="18" stroke="#22C55E" stroke-width="2.5" />
  <text x="80" y="40" font-family="Arial" font-weight="bold" font-size="14" fill="#22C55E">PULSE CERTIFIED™</text>
  <text x="80" y="60" font-family="Arial" font-size="12" fill="#4B5563">PulseScore: ${score}/100</text>
  <text x="80" y="75" font-family="Arial" font-size="10" fill="#6B7280">Issued: ${issueDate}</text>
  <text x="80" y="90" font-family="Arial" font-size="10" fill="#6B7280">Valid Until: ${validUntil}</text>
  <defs>
    <linearGradient id="paint0_linear" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F0FDF4" />
      <stop offset="1" stop-color="#DCFCE7" />
    </linearGradient>
  </defs>
</svg>`;
  
  const compactBadgeSvg = `<svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="60" rx="4" fill="url(#paint0_linear)" />
  <path d="M24 30.5L27 33.5L33 26" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <rect x="20" y="23" width="20" height="20" rx="10" stroke="#22C55E" stroke-width="2" />
  <text x="50" y="32" font-family="Arial" font-weight="bold" font-size="12" fill="#22C55E">PULSE CERTIFIED™</text>
  <text x="50" y="46" font-family="Arial" font-size="10" fill="#4B5563">PulseScore: ${score}/100</text>
  <defs>
    <linearGradient id="paint0_linear" x1="0" y1="0" x2="180" y2="60" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F0FDF4" />
      <stop offset="1" stop-color="#DCFCE7" />
    </linearGradient>
  </defs>
</svg>`;
  
  // Get the appropriate badge SVG based on selected type
  const getBadgeSvg = () => {
    return badgeType === 'standard' ? standardBadgeSvg : compactBadgeSvg;
  };
  
  // Handle copy embed code button click
  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(generateEmbedCode());
      setHasCopied(true);
      
      toast({
        title: "Embed Code Copied",
        description: "Badge embed code has been copied to clipboard",
        variant: "default",
      });
      
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (err) {
      setError('Failed to copy code to clipboard. Please try again.');
      toast({
        title: "Copy Failed",
        description: "Could not copy code to clipboard",
        variant: "destructive",
      });
    }
  };
  
  // Different badge type options
  const badgeOptions = [
    { id: 'standard', label: 'Standard' },
    { id: 'compact', label: 'Compact' },
  ];
  
  // Clear any errors when changing tabs or badge type
  const clearErrors = () => {
    if (error) setError(null);
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Embeddable Certification Badge</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Badge Style</label>
            <div className="flex gap-2">
              {badgeOptions.map(option => (
                <Button 
                  key={option.id}
                  variant={badgeType === option.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setBadgeType(option.id);
                    clearErrors();
                  }}
                  disabled={isLoading}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          clearErrors();
        }} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="preview">Badge Preview</TabsTrigger>
            <TabsTrigger value="code">Embed Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="flex justify-center p-4 border rounded-md bg-gray-50 min-h-[180px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="w-full max-w-md" dangerouslySetInnerHTML={{ __html: getBadgeSvg() }} />
            )}
          </TabsContent>
          
          <TabsContent value="code">
            <div className="relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-[150px]">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs min-h-[150px]">
                  {generateEmbedCode()}
                </pre>
              )}
              <Button 
                className="absolute top-2 right-2"
                size="sm"
                onClick={handleCopyCode}
                variant="outline"
                disabled={isLoading || !!error}
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
                <li>When users click on the badge, they'll be taken to our verification page that confirms your certification status</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 p-4 rounded-md border border-gray-200 bg-white">
          <h3 className="font-medium mb-2">Recommended Placement:</h3>
          <ul className="space-y-1 pl-5 list-disc text-sm text-gray-600">
            <li>Careers/jobs page</li>
            <li>About us section</li>
            <li>Footer of your website</li>
            <li>Employee testimonials section</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Adding this badge to your website shows potential employees and customers that your organization has been independently verified to have an exceptional workplace culture.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbeddableBadgeWidget;
