
import React from 'react';
import MailchimpWebhookLogs from "@/components/dashboard/admin/MailchimpWebhookLogs";
import DashboardLayout from "@/layouts/DashboardLayout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MailchimpEventsPage: React.FC = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mailchimp Events</h1>
        <p className="text-gray-600">
          Monitor and manage Mailchimp subscription events and webhooks
        </p>
      </div>
      
      <MailchimpWebhookLogs />
    </div>
  );
};

export default MailchimpEventsPage;
