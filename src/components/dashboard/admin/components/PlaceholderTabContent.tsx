
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PlaceholderTabContentProps {
  text: string;
  showBadge?: boolean;
  badgeData?: {
    companyName: string;
    score: number;
    tier: string;
    issueDate: string;
    validUntil: string;
  };
}

const PlaceholderTabContent: React.FC<PlaceholderTabContentProps> = ({ 
  text, 
  showBadge = false, 
  badgeData 
}) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Certificate downloaded",
      description: "Your certification badge has been downloaded successfully.",
    });
  };

  if (showBadge && badgeData) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Certification Badge Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg border border-green-200 max-w-md">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border-2 border-green-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{badgeData.companyName}</h2>
                <p className="text-green-700 font-semibold text-lg mb-3">
                  {badgeData.tier}
                </p>
                <p className="text-gray-600 mb-1">PulseScore™: {badgeData.score}/100</p>
                <p className="text-sm text-gray-500">Valid: {badgeData.issueDate} - {badgeData.validUntil}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={handleDownload} className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Certificate Badge
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  window.location.href = "/dashboard/certification-engine";
                }}
              >
                View Sharing Options
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="text-gray-500 text-center py-6">
      {text}
    </div>
  );
};

export default PlaceholderTabContent;
