
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetaTags from '@/components/MetaTags';
import PulseScoreAdminPanel from '@/components/dashboard/admin/PulseScoreAdminPanel';
import PulseScoreExplainer from '@/components/dashboard/admin/PulseScoreExplainer';
import CertificationEngine from '@/components/dashboard/certification/CertificationEngine';
import AISummaryWithFeedback from '@/components/dashboard/ai/AISummaryWithFeedback';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PulseScoreAdmin: React.FC = () => {
  const { toast } = useToast();
  
  // Handle AI summary feedback
  const handleSummaryFeedback = (summaryId: string, rating: 'positive' | 'negative') => {
    console.log('Feedback submitted:', { summaryId, rating });
    
    // In a real implementation, this would send data to the backend
    // For demo purposes, we'll just log it and show a toast
    
    toast({
      title: "Feedback Recorded",
      description: `Thank you for your feedback on summary ${summaryId}.`,
    });
  };
  
  // Handle AI summary regeneration
  const handleRegenerateSummary = (teamId: string) => {
    console.log('Regenerating summary for team:', teamId);
    
    // In a real implementation, this would trigger a new AI summary generation
    // For demo purposes, we'll just log it and show a toast
    
    toast({
      title: "Regenerating Summary",
      description: "A new AI summary is being generated for this team.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags 
        title="PulseScore Admin | PulsePlace.ai" 
        description="Manage your organization's PulseScore settings and certification."
      />
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">PulseScore™ Admin Dashboard</h1>
          <p className="text-gray-600">Configure scoring weights, view explainers, and manage certifications</p>
        </div>
      </div>
      
      <div className="space-y-8">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="settings">Admin Controls</TabsTrigger>
            <TabsTrigger value="explainer">PulseScore Explainer</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <PulseScoreAdminPanel />
          </TabsContent>
          
          <TabsContent value="explainer">
            <PulseScoreExplainer />
          </TabsContent>
          
          <TabsContent value="certification">
            <div className="space-y-6">
              <CertificationEngine 
                organizationName="Tayana Solutions" 
                pulseScore={82}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Certification History</CardTitle>
                  <CardDescription>View past certifications for your organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Your organization has been certified since April 2024.
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">April 2025 Certification</p>
                        <p className="text-sm text-gray-600">Score: 82 - Valid until April 2026</p>
                      </div>
                      <p className="text-sm text-green-600">Current</p>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">October 2024 Certification</p>
                        <p className="text-sm text-gray-600">Score: 78 - Valid until October 2025</p>
                      </div>
                      <p className="text-sm text-gray-600">Expired</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">April 2024 Certification</p>
                        <p className="text-sm text-gray-600">Score: 75 - Valid until April 2025</p>
                      </div>
                      <p className="text-sm text-gray-600">Expired</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-insights">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AISummaryWithFeedback 
                  onProvideFeedback={handleSummaryFeedback}
                  onRegenerateSummary={handleRegenerateSummary}
                />
                
                <AISummaryWithFeedback 
                  summary={{
                    id: 'sample-2',
                    teamId: 'team-2',
                    teamName: 'Marketing Team',
                    summaryText: 
                      "The Marketing team maintains a high PulseScore of 91, showing exceptional team cohesion and alignment. " +
                      "Members consistently highlight clarity in communication and strong leadership support. " +
                      "Team innovation and creative freedom scored highest among all metrics. " +
                      "Minor concerns include workload distribution during campaign launches. " +
                      "Recommend implementing more structured campaign retrospectives and cross-functional collaboration opportunities.",
                    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                    score: 91,
                    feedbackRating: 'positive'
                  }}
                  onProvideFeedback={handleSummaryFeedback}
                  onRegenerateSummary={handleRegenerateSummary}
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights Usage</CardTitle>
                  <CardDescription>Statistics for your AI-generated insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total Insights</p>
                        <p className="text-2xl font-bold">24</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Positive Feedback</p>
                        <p className="text-2xl font-bold">21 (87.5%)</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Teams Analyzed</p>
                        <p className="text-2xl font-bold">6</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      AI insights are generated using team feedback data and our advanced natural language processing algorithms.
                      Each insight is crafted to provide actionable recommendations specific to your team's culture needs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PulseScoreAdmin;
