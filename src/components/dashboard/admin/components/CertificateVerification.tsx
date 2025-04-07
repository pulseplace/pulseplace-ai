
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Search, X } from 'lucide-react';

const CertificateVerification: React.FC = () => {
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleVerify = () => {
    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter a verification code",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate verification process with a delay
    setTimeout(() => {
      // Sample verification logic - in a real app, this would be a backend check
      const isValid = verificationCode.length >= 6;
      setVerificationResult(isValid ? 'valid' : 'invalid');
      setLoading(false);
      
      if (isValid) {
        toast({
          title: "Certificate Verified",
          description: "This certificate is valid and authentic",
        });
      } else {
        toast({
          title: "Invalid Certificate",
          description: "This certificate could not be verified",
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Certificate Verification</CardTitle>
        <CardDescription>
          Verify the authenticity of a PulsePlace™ certification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter certificate verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="flex-grow"
            />
            <Button 
              onClick={handleVerify} 
              disabled={loading}
              className="min-w-[100px]"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
          
          {verificationResult === 'valid' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                This certificate is valid and authentic. Issued to Company XYZ and expires on April 7, 2026.
              </AlertDescription>
            </Alert>
          )}
          
          {verificationResult === 'invalid' && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertDescription>
                This certificate could not be verified. Please check the code and try again.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">How to verify a certificate</h3>
            <ol className="text-sm text-blue-700 list-decimal pl-5 space-y-1">
              <li>Find the verification code on the bottom of the certificate or badge</li>
              <li>Enter the complete code including hyphens</li>
              <li>Click the 'Verify' button to check authenticity</li>
              <li>For QR code verification, scan the QR code on the certificate</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateVerification;
