
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CertificationEmailTemplate from '@/components/dashboard/email/CertificationEmailTemplate';
import EmailSendTest from '@/components/dashboard/email/EmailSendTest';
import { PulseScoreData, PulseScoreTier } from '@/types/scoring.types';

const EmailTemplates: React.FC = () => {
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
  
  // Mock data for email test
  const mockEmailData = {
    companyName: 'Acme Corporation',
    overallScore: 88,
    themesScores: samplePulseScore.themesScores,
    categoryScores: samplePulseScore.categoryScores,
    tier: 'pulse_certified' as PulseScoreTier,
    industryBenchmark: 75,
    dateGenerated: 'April 8, 2025',
    responseCount: 142
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Email Templates</h1>
      
      <Tabs defaultValue="certification">
        <TabsList className="mb-6">
          <TabsTrigger value="certification">Certification</TabsTrigger>
          <TabsTrigger value="survey">Survey Invite</TabsTrigger>
          <TabsTrigger value="results">Results Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="certification">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CertificationEmailTemplate 
                pulseScore={samplePulseScore}
                companyName="Acme Corporation"  
              />
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Email Testing</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmailSendTest mockData={mockEmailData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="survey">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Survey Invitation Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Survey invitation email template content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Results Summary Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Results summary email template content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailTemplates;
