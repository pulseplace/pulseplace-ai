
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationEmailTemplate from '@/components/dashboard/email/CertificationEmailTemplate';
import CertificationEmailGenerator from '@/components/dashboard/email/CertificationEmailGenerator';

const EmailTemplates = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Email Templates</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generator">Custom Generator</TabsTrigger>
          <TabsTrigger value="standard">Standard Template</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <CertificationEmailGenerator />
        </TabsContent>
        
        <TabsContent value="standard">
          <CertificationEmailTemplate />
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
