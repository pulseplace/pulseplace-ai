
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from 'lucide-react';
import CertificationEmailTemplate from '@/components/dashboard/email/CertificationEmailTemplate';
import CertificationEmailGenerator from '@/components/dashboard/email/CertificationEmailGenerator';
import EmailSendTest from '@/components/dashboard/email/EmailSendTest';

const EmailTemplates = () => {
  const { toast } = useToast();
  
  const handlePostmarkTemplateClick = () => {
    // Open template in new tab
    window.open('/email-templates/certificationSummaryEmail.html', '_blank');
  };
  
  const handlePostmarkDocsClick = () => {
    window.open('https://postmarkapp.com/support/article/1117-how-do-i-create-and-use-templates', '_blank');
    toast({
      title: "Postmark Documentation",
      description: "Opened Postmark documentation in a new tab",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Email Templates</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generator">Custom Generator</TabsTrigger>
          <TabsTrigger value="standard">Standard Template</TabsTrigger>
          <TabsTrigger value="test">Email Tester</TabsTrigger>
          <TabsTrigger value="postmark">Postmark Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <CertificationEmailGenerator />
        </TabsContent>
        
        <TabsContent value="standard">
          <CertificationEmailTemplate />
        </TabsContent>

        <TabsContent value="test">
          <EmailSendTest />
        </TabsContent>
        
        <TabsContent value="postmark">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Postmark Template Integration</CardTitle>
              <CardDescription>
                Use our pre-built HTML template with Postmark for sending certification emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Certification Summary Template</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This template is designed for Postmark integration and includes all necessary variables for 
                    certification summary emails.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={handlePostmarkTemplateClick}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Template
                    </Button>
                    <Button variant="outline" onClick={handlePostmarkDocsClick}>
                      Postmark Docs
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Integration Steps</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Log into your Postmark account</li>
                    <li>Go to Templates → Click "Add Template"</li>
                    <li>Choose "Paste HTML"</li>
                    <li>Copy-paste the full HTML template from the "View Template" button above</li>
                    <li>Replace the placeholder tags like {'{{pulse_score}}'}, {'{{recipient_name}}'}, etc. with Postmark's template syntax</li>
                    <li>Save your template</li>
                    <li>Use Postmark's API with our email service to send the certification emails</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md text-blue-800">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> You can upload the PulsePlace logo directly to Postmark assets for 
                    better email delivery performance instead of linking to external image sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Email Template Guide</CardTitle>
          <CardDescription>
            Tips for creating effective certification emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">Personalization Best Practices</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Always use the recipient's name in the greeting</li>
                <li>Keep AI insights specific to their organization's data</li>
                <li>Use their company name where relevant</li>
                <li>Ensure certification level matches their actual scores</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">Available Personalization Tags</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{recipient_name}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">The recipient's full name</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{pulse_score}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">The overall PulseScore (0-100)</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{certification_level}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">Certification tier achieved</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{trust_score}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">Trust & Safety category score</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{engagement_score}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">Engagement category score</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{culture_score}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">Culture category score</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{ai_summary}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">AI-generated insights</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm">{'{{badge_download_link}}'}</code>
                  <p className="text-sm text-gray-600 mt-1">URL to download badge</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplates;
