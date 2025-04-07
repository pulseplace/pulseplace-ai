
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { emailService } from "@/services/emailService"; // Updated import statement
import { CategoryScore, MockPulseScoreData, PulseScoreTier, ScoringCategory, ThemeScore } from '@/types/scoring.types';

interface EmailFormData {
  to: string;
  subject: string;
  html: string;
}

const EmailSendTest: React.FC = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState('custom');
  
  const [formData, setFormData] = useState<EmailFormData>({
    to: '',
    subject: 'Test Email from PulsePlace',
    html: '<p>This is a test email from PulsePlace.ai.</p>'
  });
  
  const [certData, setCertData] = useState<MockPulseScoreData>({
    overallScore: 86,
    categoryScores: [
      { category: 'emotion_index', score: 84, weight: 0.4 },
      { category: 'engagement_stability', score: 87, weight: 0.3 },
      { category: 'culture_trust', score: 85, weight: 0.3 }
    ],
    themeScores: [],
    tier: 'pulse_certified',
    insights: ["Your organization demonstrates strong leadership trust and team cohesion, with opportunities to enhance career development paths."],
    recommendedActions: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // Updated to use emailService.sendEmail
      const result = await emailService.sendEmail({
        to: formData.to,
        subject: formData.subject,
        html: formData.html
      });
      
      if (!result.success) {
        throw new Error("Failed to send email");
      }
      
      toast({
        title: "Email Sent Successfully",
        description: `Email has been sent to ${formData.to}`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const handleCertificationEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.to) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    // Replace placeholder values in the email template
    const certificationEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>PulsePlace Certification Summary</title>
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai</h1>
            
            <p style="font-size: 18px;">Hello ${formData.to.split('@')[0]},</p>
            
            <p>We're thrilled to share your latest certification summary from PulsePlace.ai.</p>
            
            <p style="font-size: 24px; text-align: center; font-weight: bold;">PulseScore®: ${certData.overallScore} / 100</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <span style="background-color: #e8f0fe; padding: 8px 20px; border-radius: 50px; font-weight: 600;">${certData.tier.replace('_', ' ').toUpperCase()}</span>
            </div>
            
            <h2>Category Breakdown:</h2>
            <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
              ${certData.categoryScores.map(cat => `
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e1eaf8;">
                  <div>${cat.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                  <div style="font-weight: 600;">${cat.score}</div>
                </div>
              `).join('')}
            </div>
            
            <h2>AI Insight Summary:</h2>
            <p style="line-height: 1.6; margin-bottom: 20px;">"${certData.insights[0]}"</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">You're now eligible to use the official Pulse Certified® badge on your website, LinkedIn, and careers page.</p>
            
            <div style="text-align: center; margin-bottom: 20px;">
              <a href="#" style="background-color: #4338ca; color: white; padding: 12px 25px; border-radius: 50px; text-decoration: none; font-weight: 600;">Download Badge</a>
            </div>
            
            <div style="text-align: center; color: #64748b; margin-top: 30px; font-size: 12px;">
              <p>PulsePlace.ai — Redefining workplace trust through data & AI</p>
              <p>This is an automated summary. For support, contact <a href="mailto:hello@pulseplace.ai" style="color: #4338ca;">hello@pulseplace.ai</a></p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    try {
      // Updated to use emailService.sendEmail
      const result = await emailService.sendEmail({
        to: formData.to,
        subject: 'Your PulsePlace Certification Summary',
        html: certificationEmailHtml
      });
      
      if (!result.success) {
        throw new Error("Failed to send email");
      }
      
      toast({
        title: "Certification Email Sent",
        description: `Certification summary sent to ${formData.to}`,
      });
    } catch (error) {
      console.error('Error sending certification email:', error);
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the certification email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const randomizeScores = () => {
    const getRandomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    
    const overallScore = getRandomScore(65, 95);
    const emotionScore = getRandomScore(60, 95);
    const engagementScore = getRandomScore(60, 95);
    const trustScore = getRandomScore(60, 95);
    
    let tier: PulseScoreTier = 'pulse_certified';
    if (overallScore < 70) tier = 'intervention_advised';
    else if (overallScore < 78) tier = 'at_risk';
    else if (overallScore < 85) tier = 'emerging_culture';
    
    const categoryScores: CategoryScore[] = [
      { category: 'emotion_index', score: emotionScore, weight: 0.4 },
      { category: 'engagement_stability', score: engagementScore, weight: 0.3 },
      { category: 'culture_trust', score: trustScore, weight: 0.3 }
    ];
    
    setCertData({
      ...certData,
      overallScore,
      categoryScores,
      tier
    });
    
    toast({
      title: "Scores Randomized",
      description: `New overall score: ${overallScore}`,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="custom">Custom Email</TabsTrigger>
            <TabsTrigger value="certification">Certification Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="custom">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="to" className="block text-sm font-medium mb-1">Recipient Email</label>
                <Input
                  id="to"
                  name="to"
                  type="email"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="recipient@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Email subject"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="html" className="block text-sm font-medium mb-1">Email Content (HTML)</label>
                <Textarea
                  id="html"
                  name="html"
                  value={formData.html}
                  onChange={handleInputChange}
                  placeholder="<p>Your HTML email content here</p>"
                  rows={6}
                  required
                />
              </div>
              
              <Button type="submit" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Test Email'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="certification">
            <form onSubmit={handleCertificationEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="cert-to" className="block text-sm font-medium mb-1">Recipient Email</label>
                <Input
                  id="cert-to"
                  name="to"
                  type="email"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="recipient@example.com"
                  required
                />
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-sm font-medium mb-3 text-blue-800">Certification Parameters</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="block text-sm text-blue-700 mb-1">Overall Score</span>
                    <div className="bg-white p-2 rounded border text-xl font-bold text-blue-700">
                      {certData.overallScore}/100
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm text-blue-700 mb-1">Certification Tier</span>
                    <div className="bg-white p-2 rounded border font-medium text-blue-700">
                      {certData.tier.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  {certData.categoryScores.map((cat, index) => (
                    <div key={index}>
                      <span className="block text-sm text-blue-700 mb-1">
                        {cat.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <div className="bg-white p-2 rounded border font-medium text-blue-700">
                        {cat.score}/100
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={randomizeScores}
                >
                  Randomize Scores
                </Button>
              </div>
              
              <Button type="submit" disabled={isSending} className="w-full">
                {isSending ? 'Sending...' : 'Send Certification Email'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailSendTest;
