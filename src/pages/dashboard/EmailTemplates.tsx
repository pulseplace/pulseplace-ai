import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationEmailTemplate from "@/components/dashboard/email/CertificationEmailTemplate";
import CertificationEmailGenerator from "@/components/dashboard/email/CertificationEmailGenerator";
import MailchimpEmailPreview from "@/components/dashboard/email/MailchimpEmailPreview";
import { MailchimpWebhookLogs, MailchimpSubscribersTable } from "@/components/dashboard/admin/mailchimp";
import { BrandMessage } from '@/components/BrandMessage';
import EmailSendTest from '@/components/dashboard/email/EmailSendTest';

const EmailTemplates = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Email Templates</h1>
        <p className="text-gray-600">
          Manage and customize email templates for certification and other communications
        </p>
      </div>
      
      <BrandMessage 
        message="Effective email communications help showcase your certification achievements"
        variant="highlight"
        className="mb-8"
      />
      
      <Tabs defaultValue="certification" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="certification">Certification Emails</TabsTrigger>
          <TabsTrigger value="mailchimp">Mailchimp Templates</TabsTrigger>
          <TabsTrigger value="logs">Webhook Logs</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="custom">Custom Template</TabsTrigger>
        </TabsList>
        
        <TabsContent value="certification">
          <div className="space-y-8">
            <CertificationEmailTemplate />
            <CertificationEmailGenerator />
          </div>
        </TabsContent>
        
        <TabsContent value="mailchimp">
          <div className="space-y-8">
            <MailchimpEmailPreview />
            <EmailSendTest />
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <div className="space-y-8">
            <MailchimpWebhookLogs />
          </div>
        </TabsContent>
        
        <TabsContent value="subscribers">
          <div className="space-y-8">
            <MailchimpSubscribersTable />
          </div>
        </TabsContent>
        
        <TabsContent value="custom">
          <div className="space-y-8">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Custom Email Templates</h3>
              <p className="text-gray-600 mb-4">
                This feature is coming soon. You'll be able to create and manage custom email templates.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailTemplates;
