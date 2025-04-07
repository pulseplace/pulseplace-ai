
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from 'lucide-react';
import { emailService } from '@/services/emailService';

const EmailSendTest: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Test Email from PulsePlace');
  const [content, setContent] = useState('<h1>This is a test email</h1><p>If you received this, the email system is working correctly!</p>');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendTest = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter a recipient email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await emailService.sendEmail({
        to: email,
        subject: subject,
        html: content,
        fromName: "PulsePlace Test",
        fromEmail: "test@pulseplace.ai"
      });

      if (!result.success) {
        throw new Error('Failed to send email');
      }

      toast({
        title: "Email Sent",
        description: `Test email was sent to ${email}`,
      });
      console.log('Email sent successfully:', result.data);
    } catch (error) {
      console.error('Failed to send test email:', error);
      toast({
        title: "Error Sending Email",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Email Test Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="recipient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="content">HTML Content</Label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[150px] p-2 border rounded-md"
            />
          </div>
          
          <Button 
            onClick={handleSendTest} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Test Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSendTest;
