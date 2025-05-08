
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionThemeMapping from '@/components/dashboard/mapping/QuestionThemeMapping';
import AIWorkflowChart from '@/components/dashboard/mapping/AIWorkflowChart';
import CertificationEmailTemplate from '@/components/dashboard/email/CertificationEmailTemplate';
import AdminHRDashboard from '@/components/dashboard/admin/AdminHRDashboard';
import EmbeddableBadgeWidget from '@/components/dashboard/badge/EmbeddableBadgeWidget';
import CertificatePdfExport from '@/components/dashboard/admin/components/CertificatePdfExport';
import CertificateVerification from '@/components/dashboard/admin/components/CertificateVerification';
import CertificationSharing from '@/components/certification/CertificationSharing';
import ThemeSentimentAnalysis from '@/components/dashboard/sentiment/ThemeSentimentAnalysis';
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import LoadingState from '@/components/dashboard/admin/components/LoadingState';
import { SurveyQuestion, PulseScoreData } from '@/types/scoring.types';

const CertificationEngine = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('mapping');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sample questions for mapping
  const sampleQuestions: SurveyQuestion[] = [
    {
      id: '1',
      text: 'I feel my ideas are valued by my team',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1
    },
    {
      id: '2',
      text: 'I have opportunities to learn and grow at my company',
      type: 'likert',
      theme: 'growth_opportunity',
      weight: 1
    },
    {
      id: '3',
      text: 'My manager genuinely cares about my wellbeing',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1
    }
  ];
  
  // Sample pulse score data
  const samplePulseScore: PulseScoreData = {
    overallScore: 82,
    themesScores: [
      { theme: 'trust_in_leadership', score: 78, count: 2 },
      { theme: 'psychological_safety', score: 85, count: 3 },
      { theme: 'inclusion_belonging', score: 76, count: 3 },
      { theme: 'work_life_balance', score: 68, count: 2 },
      { theme: 'growth_opportunity', score: 82, count: 2 }
    ],
    categoryScores: [
      { category: 'emotion_index', score: 76, weight: 0.4 },
      { category: 'culture_trust', score: 81, weight: 0.35 },
      { category: 'engagement_stability', score: 75, weight: 0.25 }
    ],
    responseCount: 142,
    tier: 'pulse_certified'
  };
  
  // Demo data for certification badge
  const certificationData = {
    companyName: 'Acme Corporation',
    tier: 'pulse_certified' as const,
    score: 88,
    issueDate: 'April 7, 2025',
    validUntil: 'April 7, 2026'
  };
  
  // Additional mock data for email test
  const mockEmailData = {
    companyName: 'Acme Corporation',
    overallScore: 88,
    themesScores: samplePulseScore.themesScores,
    categoryScores: samplePulseScore.categoryScores,
    tier: 'pulse_certified' as const, // Specify the type to match PulseScoreTier
    industryBenchmark: 75,
    dateGenerated: 'April 8, 2025',
    responseCount: 142
  };
  
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
    if (value === 'admin' || value === 'badge' || value === 'pdf' || value === 'verify' || value === 'sharing' || value === 'sentiment') {
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
      case 'sharing': return 'Sharing Options';
      case 'sentiment': return 'Theme Sentiment';
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
          <TabsTrigger value="sentiment">Theme Sentiment</TabsTrigger>
          <TabsTrigger value="badge">Badge Widget</TabsTrigger>
          <TabsTrigger value="pdf">PDF Certificate</TabsTrigger>
          <TabsTrigger value="verify">Verify Certificate</TabsTrigger>
          <TabsTrigger value="sharing">Sharing Options</TabsTrigger>
        </TabsList>
        
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            <TabsContent value="mapping">
              <QuestionThemeMapping question={sampleQuestions} />
            </TabsContent>
            
            <TabsContent value="workflow">
              <AIWorkflowChart />
            </TabsContent>
            
            <TabsContent value="email">
              <CertificationEmailTemplate pulseScore={samplePulseScore} companyName="Acme Corporation" />
            </TabsContent>
            
            <TabsContent value="admin">
              <AdminHRDashboard />
            </TabsContent>
            
            <TabsContent value="sentiment">
              <ThemeSentimentAnalysis />
            </TabsContent>
            
            <TabsContent value="badge">
              <EmbeddableBadgeWidget 
                companyName={certificationData.companyName}
                tier={certificationData.tier}
                score={certificationData.score}
                issueDate={certificationData.issueDate}
                validUntil={certificationData.validUntil}
                isLoading={false}
              />
            </TabsContent>
            
            <TabsContent value="pdf">
              <CertificatePdfExport />
            </TabsContent>
            
            <TabsContent value="verify">
              <CertificateVerification />
            </TabsContent>
            
            <TabsContent value="sharing">
              <CertificationSharing
                companyName={certificationData.companyName}
                tier={certificationData.tier}
                score={certificationData.score}
                issueDate={certificationData.issueDate}
                validUntil={certificationData.validUntil}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default CertificationEngine;
