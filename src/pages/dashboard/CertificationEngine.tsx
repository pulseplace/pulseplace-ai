
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionThemeMapping from '@/components/dashboard/mapping/QuestionThemeMapping';
import AIWorkflowChart from '@/components/dashboard/mapping/AIWorkflowChart';
import CertificationEmailTemplate from '@/components/dashboard/email/CertificationEmailTemplate';
import AdminHRDashboard from '@/components/dashboard/admin/AdminHRDashboard';
import EmbeddableBadgeWidget from '@/components/dashboard/badge/EmbeddableBadgeWidget';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const CertificationEngine = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('mapping');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Demo function to simulate data loading when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError(null);
    
    // Simulate loading on certain data-heavy tabs
    if (value === 'admin' || value === 'badge') {
      setIsLoading(true);
      
      // Simulate network request
      setTimeout(() => {
        setIsLoading(false);
        
        // Success toast notification
        toast({
          title: `${value === 'admin' ? 'Admin Dashboard' : 'Badge Widget'} Loaded`,
          description: "Data loaded successfully",
        });
      }, 1000);
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">PulseScore™ Certification Engine</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="mapping" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="mapping">Question Mapping</TabsTrigger>
          <TabsTrigger value="workflow">AI Workflow</TabsTrigger>
          <TabsTrigger value="email">Email Template</TabsTrigger>
          <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
          <TabsTrigger value="badge">Badge Widget</TabsTrigger>
        </TabsList>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Loading {activeTab === 'admin' ? 'Admin Dashboard' : 'Badge Widget'}...</p>
            </div>
          </div>
        ) : (
          <>
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
              <EmbeddableBadgeWidget isLoading={false} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default CertificationEngine;
