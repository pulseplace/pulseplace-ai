
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionThemeMapping from '@/components/dashboard/mapping/QuestionThemeMapping';
import AIWorkflowChart from '@/components/dashboard/mapping/AIWorkflowChart';
import CertificationEmailTemplate from '@/components/dashboard/email/CertificationEmailTemplate';
import AdminHRDashboard from '@/components/dashboard/admin/AdminHRDashboard';
import EmbeddableBadgeWidget from '@/components/dashboard/badge/EmbeddableBadgeWidget';

const CertificationEngine = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">PulseScore™ Certification Engine</h1>
      
      <Tabs defaultValue="mapping">
        <TabsList className="mb-6">
          <TabsTrigger value="mapping">Question Mapping</TabsTrigger>
          <TabsTrigger value="workflow">AI Workflow</TabsTrigger>
          <TabsTrigger value="email">Email Template</TabsTrigger>
          <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
          <TabsTrigger value="badge">Badge Widget</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mapping">
          <QuestionThemeMapping />
        </TabsContent>
        
        <TabsContent value="workflow">
          <AIWorkflowChart />
        </TabsContent>
        
        <TabsContent value="email">
          <CertificationEmailTemplate />
        </TabsContent>
        
        <TabsContent value="admin">
          <AdminHRDashboard />
        </TabsContent>
        
        <TabsContent value="badge">
          <EmbeddableBadgeWidget />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificationEngine;
