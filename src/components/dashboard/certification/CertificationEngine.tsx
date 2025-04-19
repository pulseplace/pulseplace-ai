
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Copy, 
  CheckCircle, 
  Award, 
  Image, 
  Code,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getScoreBand } from '@/utils/scoreBanding';

interface CertificationEngineProps {
  organizationName: string;
  pulseScore: number;
  certificationDate?: Date;
  expiryDate?: Date;
}

const CertificationEngine: React.FC<CertificationEngineProps> = ({
  organizationName,
  pulseScore,
  certificationDate = new Date(),
  expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("badge");
  
  // Determine if qualified for certification
  const isQualified = pulseScore >= 75;
  const scoreBand = getScoreBand(pulseScore);
  
  // Format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const certificationDateStr = formatDate(certificationDate);
  const expiryDateStr = formatDate(expiryDate);
  
  // Sample badge code for embedding
  const embedCode = `<a href="https://pulseplace.ai/verify/${btoa(organizationName)}" target="_blank">
  <img src="https://pulseplace.ai/badge/${btoa(organizationName)}.svg" 
       alt="${organizationName} - PulsePlace Certified" 
       width="240" height="120" />
</a>`;
  
  // Copy to clipboard function
  const copyToClipboard = (text: string, successMessage: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: successMessage,
        });
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually",
          variant: "destructive",
        });
      });
  };
  
  // Download badge function (in a real implementation, this would generate an actual badge)
  const downloadBadge = (format: 'png' | 'svg') => {
    toast({
      title: `${format.toUpperCase()} Badge Downloaded`,
      description: `Your certification badge has been downloaded in ${format.toUpperCase()} format.`,
    });
    
    // In a real implementation, this would trigger an actual download
    // For demo purposes, we'll just show the toast
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Award className="h-5 w-5 text-amber-500" />
          PulseScore™ Certification Engine
        </CardTitle>
        <CardDescription>
          Generate and manage your PulsePlace™ certification badges
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Certification Status Section */}
        <div className={`p-4 rounded-lg ${
          isQualified 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-center gap-3">
            {isQualified ? (
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            ) : (
              <div className="rounded-full bg-amber-100 p-2">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
            )}
            
            <div>
              <h3 className="font-medium text-lg">
                {isQualified 
                  ? 'Certification Qualified!' 
                  : 'Not Yet Qualified for Certification'
                }
              </h3>
              <p className="text-sm">
                {isQualified 
                  ? `Your PulseScore of ${pulseScore} qualifies for PulsePlace certification.` 
                  : `Your current PulseScore is ${pulseScore}. A score of 75 or higher is required for certification.`
                }
              </p>
            </div>
          </div>
          
          {isQualified && (
            <div className="mt-4 pt-4 border-t border-green-200 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Certification Date:</p>
                  <p>{certificationDateStr}</p>
                </div>
                <div>
                  <p className="font-medium">Valid Until:</p>
                  <p>{expiryDateStr}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Badge Preview and Options */}
        {isQualified && (
          <Tabs defaultValue="badge" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="badge">Badge Preview</TabsTrigger>
              <TabsTrigger value="download">Download Options</TabsTrigger>
              <TabsTrigger value="embed">Embed Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="badge" className="space-y-4">
              <div className="flex justify-center p-4 bg-gray-50 rounded-lg border">
                <div className="w-64 h-32 bg-white rounded-lg shadow-sm border flex flex-col items-center justify-center p-4">
                  <div className="text-xs text-gray-500 uppercase font-medium">Certified by</div>
                  <div className="text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    PulsePlace.ai
                  </div>
                  <div className="my-1 flex items-center gap-1">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span className="text-lg font-bold">{pulseScore}</span>
                  </div>
                  <div className="text-xs text-gray-600">{organizationName}</div>
                  <div className="text-xs text-gray-500 mt-1">Valid until {expiryDateStr}</div>
                </div>
              </div>
              
              <div className="flex justify-center gap-2">
                <Button size="sm" onClick={() => setActiveTab("download")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Badge
                </Button>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("embed")}>
                  <Code className="h-4 w-4 mr-2" />
                  Get Embed Code
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="download" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">PNG Format</CardTitle>
                    <CardDescription>Best for websites and documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => downloadBadge('png')} className="w-full">
                      <Image className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">SVG Format</CardTitle>
                    <CardDescription>Scalable format for all sizes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => downloadBadge('svg')} className="w-full">
                      <Image className="h-4 w-4 mr-2" />
                      Download SVG
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <h4 className="font-medium mb-2">Usage Guidelines:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Display on your company website</li>
                  <li>Include in email signatures</li>
                  <li>Add to marketing materials</li>
                  <li>Feature in investor presentations</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="embed" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border">
                <pre className="text-xs overflow-x-auto p-2">{embedCode}</pre>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => copyToClipboard(embedCode, "Embed code copied to clipboard")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Certificate
                </Button>
                <Button variant="ghost" asChild>
                  <a href="https://docs.pulseplace.ai/certification-guide" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Guide
                  </a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        {/* Improvement Suggestions (if not qualified) */}
        {!isQualified && (
          <div className="space-y-4">
            <h3 className="font-medium">How to Improve Your Score</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</div>
                <div>
                  <p className="font-medium">Focus on Trust & Safety</p>
                  <p className="text-sm text-gray-600">Run targeted initiatives to improve psychological safety.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</div>
                <div>
                  <p className="font-medium">Enhance Leadership Communication</p>
                  <p className="text-sm text-gray-600">Implement regular transparent updates from leadership.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</div>
                <div>
                  <p className="font-medium">Run Follow-up Surveys</p>
                  <p className="text-sm text-gray-600">Gather more data through pulse surveys to track improvements.</p>
                </div>
              </li>
            </ul>
            
            <Button variant="outline" className="w-full" asChild>
              <a href="/dashboard/improvement-plan">
                <Award className="h-4 w-4 mr-2" />
                Get Detailed Improvement Plan
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationEngine;
