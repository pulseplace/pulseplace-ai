
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, RefreshCw, Download, FileText } from 'lucide-react';
import { insightsService, InsightResponse } from '@/services/insightsService';

const LLMInsightsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<InsightResponse | null>(null);
  
  const handleGenerateInsights = async () => {
    setIsLoading(true);
    
    try {
      const generatedInsights = await insightsService.generateTestInsight();
      setInsights(generatedInsights);
      
      toast({
        title: "Insights Generated",
        description: "AI-powered insights have been generated based on survey data.",
      });
    } catch (error) {
      console.error("Error generating insights:", error);
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportInsights = () => {
    if (!insights) return;
    
    // Create text content for export
    const exportContent = `
PulsePlace.ai - LLM Insights
Generated on: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
${insights.summary}

KEY STRENGTHS
${insights.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

OPPORTUNITIES FOR IMPROVEMENT
${insights.opportunities.map((o, i) => `${i + 1}. ${o}`).join('\n')}

RECOMMENDED ACTIONS
${insights.actionItems.map((a, i) => `${i + 1}. ${a}`).join('\n')}

CERTIFICATION TEXT
${insights.certificateText}
    `;
    
    // Create and download the file
    const element = document.createElement('a');
    const file = new Blob([exportContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `pulseplace-insights-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Insights Exported",
      description: "Insights have been downloaded as a text file.",
    });
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">LLM Insights Engine</h1>
      
      {!insights ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generate Workplace Insights</CardTitle>
            <CardDescription>
              Use our AI-powered LLM engine to generate personalized insights from your survey data.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-12">
            <BarChart3 className="h-16 w-16 text-pulse-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Insights Generated Yet</h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Generate AI-powered insights based on your survey responses to understand your workplace culture strengths and opportunities.
            </p>
            <Button 
              onClick={handleGenerateInsights} 
              disabled={isLoading}
              className="bg-pulse-gradient"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  Generate Demo Insights
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-medium">AI-Generated Insights</h2>
              <p className="text-gray-500">Based on Tayana Solutions survey data</p>
            </div>
            <Button
              variant="outline"
              onClick={handleExportInsights}
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Insights
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="strengths">Strengths</TabsTrigger>
                  <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                  <TabsTrigger value="actions">Action Items</TabsTrigger>
                  <TabsTrigger value="certificate">Certificate</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Executive Summary</h3>
                      <p className="text-gray-700 leading-relaxed">{insights.summary}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Key Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {insights.strengths.slice(0, 1).map((strength, index) => (
                              <li key={index} className="text-gray-700">{strength}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Improvement Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {insights.opportunities.slice(0, 1).map((opportunity, index) => (
                              <li key={index} className="text-gray-700">{opportunity}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Recommended Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {insights.actionItems.slice(0, 1).map((action, index) => (
                              <li key={index} className="text-gray-700">{action}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="strengths">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Strengths</h3>
                    <div className="space-y-4">
                      {insights.strengths.map((strength, index) => (
                        <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-start">
                            <div className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700">{strength}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="opportunities">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Opportunities for Improvement</h3>
                    <div className="space-y-4">
                      {insights.opportunities.map((opportunity, index) => (
                        <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start">
                            <div className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700">{opportunity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="actions">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recommended Actions</h3>
                    <div className="space-y-4">
                      {insights.actionItems.map((action, index) => (
                        <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start">
                            <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700">{action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="certificate">
                  <div className="flex flex-col items-center py-8">
                    <div className="max-w-2xl mx-auto p-8 border rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">PulseScore™ Certification</h2>
                        <p className="text-gray-600">Tayana Solutions</p>
                      </div>
                      
                      <div className="flex justify-center mb-8">
                        <div className="bg-pulse-gradient text-white rounded-full py-3 px-6">
                          <span className="text-2xl font-bold">82/100</span>
                        </div>
                      </div>
                      
                      <div className="text-center mb-8">
                        <p className="text-lg font-medium text-gray-700 italic mb-2">
                          {insights.certificateText}
                        </p>
                        <p className="text-sm text-gray-500">
                          Issued: April 8, 2025 | Valid until: April 8, 2026
                        </p>
                      </div>
                      
                      <div className="text-center text-sm text-gray-500">
                        <p>This certification is based on comprehensive workplace culture assessment using PulsePlace.ai's advanced AI analytics.</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button onClick={handleExportInsights}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LLMInsightsPage;
