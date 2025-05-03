
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MockPulseScoreData } from '@/types/scoring.types';

interface EmailSendTestProps {
  mockData: MockPulseScoreData;
}

const EmailSendTest: React.FC<EmailSendTestProps> = ({ mockData }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string }>({});

  const sendTestEmail = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setResult({});
    
    try {
      // Prepare email data
      const emailData = {
        ...mockData,
        recipientEmail: email
      };
      
      // Send test email (disabled for now - mock success)
      // const response = await sendCertificationEmail(emailData);
      
      // Mock a successful response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResult({
        success: true,
        message: `Test email has been sent to ${email}`
      });
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send test email'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Send Test Email</CardTitle>
        <CardDescription>Send a test certification email to verify how it appears</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-email">Recipient Email</Label>
          <div className="flex gap-2">
            <Input 
              id="test-email"
              type="email" 
              placeholder="Enter an email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              className="bg-pulse-gradient"
              disabled={!email || isLoading}
              onClick={sendTestEmail}
            >
              {isLoading ? (
                <span className="animate-spin mr-2">⏳</span>
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Send Test
            </Button>
          </div>
        </div>

        {result.success === true && (
          <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}

        {result.success === false && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailSendTest;
