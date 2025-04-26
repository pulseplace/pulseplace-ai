
import React from 'react';
import MetaTags from '@/components/MetaTags';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const LLMInsights: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("generate");

  const handleGenerateClick = () => {
    toast({
      title: "Generating insights...",
      description: "Your workplace culture insights will be ready in a moment."
    });
  };

  return (
    <DashboardProvider>
      <div className="container mx-auto p-6">
        <MetaTags
          title="LLM Insights | PulsePlace.ai"
          description="Generate AI-powered workplace insights using large language models"
        />
        
        <h1 className="text-3xl font-bold mb-6">LLM Insights</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="generate">Generate Insights</TabsTrigger>
            <TabsTrigger value="history">Past Insights</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Workplace Culture Insights</CardTitle>
                <CardDescription>
                  Use our advanced AI models to analyze your workplace culture data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our LLM-powered analysis identifies trends, patterns, and potential issues 
                  in your company's culture data, providing actionable recommendations.
                </p>
                <Button className="bg-pulse-gradient" onClick={handleGenerateClick}>
                  Generate Workplace Insights
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Available Data Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>PulseScore survey responses (42 responses)</li>
                  <li>Team feedback sessions (7 sessions)</li>
                  <li>1-on-1 manager reports (18 reports)</li>
                  <li>Exit interview data (3 interviews)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Previously Generated Insights</CardTitle>
                <CardDescription>
                  Review insights generated in the past
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6 text-gray-500">
                  No previous insights have been generated
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>LLM Insights Settings</CardTitle>
                <CardDescription>
                  Configure how insights are generated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Settings for your AI-generated insights will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardProvider>
  );
};

export default LLMInsights;
