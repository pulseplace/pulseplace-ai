
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionThemeMapping from '@/components/dashboard/mapping/QuestionThemeMapping';
import AIWorkflowChart from '@/components/dashboard/mapping/AIWorkflowChart';
import CertificationEmailTemplate from '@/components/dashboard/email/CertificationEmailTemplate';
import AdminHRDashboard from '@/components/dashboard/admin/AdminHRDashboard';
import EmbeddableBadgeWidget from '@/components/dashboard/badge/EmbeddableBadgeWidget';
import CertificatePdfExport from '@/components/dashboard/admin/components/CertificatePdfExport';
import CertificateVerification from '@/components/dashboard/admin/components/CertificateVerification';
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import LoadingState from '@/components/dashboard/admin/components/LoadingState';

const CertificationEngine = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('mapping');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check authentication
    if (!user) {
      setError("You must be logged in to access the certification engine.");
      return;
    }
    
    // Clear error if user is authenticated
    setError(null);
  }, [user]);
  
  // Demo function to simulate data loading when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError(null);
    
    // Simulate loading on certain data-heavy tabs
    if (value === 'admin' || value === 'badge' || value === 'pdf' || value === 'verify') {
      setIsLoading(true);
      
      // Simulate network request
      setTimeout(() => {
        setIsLoading(false);
        
        // Success toast notification
        toast({
          title: `${getTabTitle(value)} Loaded`,
          description: "Data loaded successfully",
        });
      }, 1000);
    }
  };
  
  const getTabTitle = (tab: string): string => {
    switch (tab) {
      case 'admin': return 'Admin Dashboard';
      case 'badge': return 'Badge Widget';
      case 'pdf': return 'PDF Certificate';
      case 'verify': return 'Certificate Verification';
      default: return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };
  
  const handleError = (err: Error) => {
    console.error('Certification Engine Error:', err);
    setError(err.message || 'An error occurred. Please try again.');
    toast({
      title: "Error",
      description: err.message || 'An error occurred. Please try again.',
      variant: "destructive",
    });
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">PulseScore™ Certification Engine</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
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
          <TabsTrigger value="pdf">PDF Certificate</TabsTrigger>
          <TabsTrigger value="verify">Verify Certificate</TabsTrigger>
        </TabsList>
        
        {isLoading ? (
          <LoadingState />
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
            
            <TabsContent value="pdf">
              <CertificatePdfExport />
            </TabsContent>
            
            <TabsContent value="verify">
              <CertificateVerification />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default CertificationEngine;
