
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, RefreshCw } from 'lucide-react';
import { emailService } from '@/services/emailService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailSendTest: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Test Email from PulsePlace');
  const [content, setContent] = useState('<h1>This is a test email</h1><p>If you received this, the email system is working correctly!</p>');
  const [isLoading, setIsLoading] = useState(false);
  
  // Fields for certification email
  const [recipientName, setRecipientName] = useState('John Doe');
  const [pulseScore, setPulseScore] = useState('92');
  const [certificationLevel, setCertificationLevel] = useState('Growth Culture');
  const [trustScore, setTrustScore] = useState('90');
  const [engagementScore, setEngagementScore] = useState('93');
  const [cultureScore, setCultureScore] = useState('92');
  const [aiSummary, setAiSummary] = useState('Your organization demonstrates outstanding levels of employee trust and belonging, with high engagement scores.');

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
  
  const handleSendCertificationEmail = async () => {
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
      // Create recipient object
      const recipient = {
        name: recipientName,
        email: email
      };
      
      // Create pulse score data
      const pulseScoreData = {
        overallScore: parseInt(pulseScore),
        categoryScores: [
          { category: 'emotion_index', score: parseInt(cultureScore), weight: 0.4 },
          { category: 'engagement_stability', score: parseInt(engagementScore), weight: 0.3 },
          { category: 'culture_trust', score: parseInt(trustScore), weight: 0.3 }
        ],
        themeScores: [],
        tier: 'pulse_certified',
        insights: [aiSummary],
        recommendedActions: []
      };
      
      // Send certification email
      const result = await emailService.sendCertificationEmail(recipient, pulseScoreData);
      
      if (!result) {
        throw new Error('Failed to send certification email');
      }
      
      toast({
        title: "Certification Email Sent",
        description: `Certification email was sent to ${email}`,
      });
    } catch (error) {
      console.error('Failed to send certification email:', error);
      toast({
        title: "Error Sending Email",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRandomize = () => {
    // Generate random scores between 85-95
    const newTrustScore = Math.floor(Math.random() * 11) + 85;
    const newEngagementScore = Math.floor(Math.random() * 11) + 85;
    const newCultureScore = Math.floor(Math.random() * 11) + 85;
    const newOverallScore = Math.floor((newTrustScore + newEngagementScore + newCultureScore) / 3);
    
    setTrustScore(newTrustScore.toString());
    setEngagementScore(newEngagementScore.toString());
    setCultureScore(newCultureScore.toString());
    setPulseScore(newOverallScore.toString());
    
    const insights = [
      "Your organization demonstrates outstanding levels of employee trust and belonging, with high engagement scores.",
      "Employee satisfaction is at exceptional levels with strong alignment to organizational mission and values.",
      "Team cohesion and psychological safety metrics show excellent results, indicating a healthy workplace culture.",
      "Your organization exhibits remarkable levels of trust and transparency, fostering high employee engagement."
    ];
    
    setAiSummary(insights[Math.floor(Math.random() * insights.length)]);
    
    toast({
      title: "Values Randomized",
      description: "Test data has been refreshed with random values",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Email Test Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="custom">
          <TabsList className="mb-4">
            <TabsTrigger value="custom">Custom Email</TabsTrigger>
            <TabsTrigger value="certification">Certification Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="custom" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="certification" className="space-y-4">
            <div className="flex justify-end mb-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRandomize}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Randomize Scores
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cert-email">Recipient Email</Label>
                <Input
                  id="cert-email"
                  type="email"
                  placeholder="recipient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="recipient-name">Recipient Name</Label>
                <Input
                  id="recipient-name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pulse-score">PulseScore</Label>
                <Input
                  id="pulse-score"
                  value={pulseScore}
                  onChange={(e) => setPulseScore(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="certification-level">Certification Level</Label>
                <Input
                  id="certification-level"
                  value={certificationLevel}
                  onChange={(e) => setCertificationLevel(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="trust-score">Trust Score</Label>
                <Input
                  id="trust-score"
                  value={trustScore}
                  onChange={(e) => setTrustScore(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="engagement-score">Engagement Score</Label>
                <Input
                  id="engagement-score"
                  value={engagementScore}
                  onChange={(e) => setEngagementScore(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="culture-score">Culture Score</Label>
                <Input
                  id="culture-score"
                  value={cultureScore}
                  onChange={(e) => setCultureScore(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="ai-summary">AI Insight Summary</Label>
              <textarea
                id="ai-summary"
                value={aiSummary}
                onChange={(e) => setAiSummary(e.target.value)}
                className="w-full min-h-[80px] p-2 border rounded-md"
              />
            </div>
            
            <Button 
              onClick={handleSendCertificationEmail} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Certification Email...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Certification Email
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailSendTest;
