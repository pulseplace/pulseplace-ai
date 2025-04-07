
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PulseScoreTier } from '@/types/scoring.types';
import { useToast } from "@/hooks/use-toast";
import { Download, FileDown, File } from 'lucide-react';

interface CertificateData {
  companyName: string;
  contactName: string;
  score: number;
  tier: PulseScoreTier;
  issueDate: string;
  validUntil: string;
}

const CertificatePdfExport: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState<CertificateData>({
    companyName: 'Acme Corporation',
    contactName: 'John Doe',
    score: 86,
    tier: 'pulse_certified',
    issueDate: 'April 7, 2025',
    validUntil: 'April 7, 2026'
  });
  
  // Handle field changes
  const handleChange = (field: keyof CertificateData, value: string | number | PulseScoreTier) => {
    setCertificateData({
      ...certificateData,
      [field]: value
    });
  };
  
  // Generate and download PDF certificate
  const generatePdf = () => {
    setLoading(true);
    
    // Simulate PDF generation with a delay
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Certificate Generated",
        description: "Your PDF certificate has been generated and downloaded",
      });
    }, 1500);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Export PDF Certificate</CardTitle>
        <CardDescription>
          Create an official PDF certificate for your organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={certificateData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="contactName">Contact Person</Label>
              <Input 
                id="contactName" 
                value={certificateData.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="score">PulseScore™</Label>
              <Input 
                id="score" 
                type="number"
                min="0"
                max="100" 
                value={certificateData.score}
                onChange={(e) => handleChange('score', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="tier">Certification Tier</Label>
              <Select 
                value={certificateData.tier}
                onValueChange={(value) => handleChange('tier', value as PulseScoreTier)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pulse_certified">Pulse Certified™</SelectItem>
                  <SelectItem value="emerging_culture">Emerging Culture</SelectItem>
                  <SelectItem value="at_risk">At Risk</SelectItem>
                  <SelectItem value="intervention_advised">Intervention Advised</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col justify-between space-y-4">
            <div className="bg-gradient-to-r from-pulse-50 to-white p-6 rounded-lg border border-pulse-200 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="text-xl font-bold mb-2">Certificate Preview</div>
                <div className="text-sm text-gray-500 mb-4">
                  Your official PulsePlace™ certificate will be generated as a high-quality PDF
                </div>
                <File className="h-16 w-16 text-green-500 mx-auto" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={generatePdf} 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>Generating PDF...</>
                ) : (
                  <>
                    <FileDown className="mr-2 h-4 w-4" />
                    Generate & Download PDF Certificate
                  </>
                )}
              </Button>
              
              <div className="text-xs text-gray-500 text-center">
                This certificate is valid for one year from the issue date and includes a QR code for verification.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatePdfExport;
