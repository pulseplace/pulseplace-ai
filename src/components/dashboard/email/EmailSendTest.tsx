
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MockPulseScoreData, PulseScoreTier, ScoringCategory } from '@/types/scoring.types';
import CustomEmailForm from './CustomEmailForm';
import CertificationEmailForm from './CertificationEmailForm';

interface EmailFormData {
  to: string;
  subject: string;
  html: string;
}

const EmailSendTest: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('custom');
  
  const [formData, setFormData] = useState<EmailFormData>({
    to: '',
    subject: 'Test Email from PulsePlace',
    html: '<p>This is a test email from PulsePlace.ai.</p>'
  });
  
  const [certData, setCertData] = useState<MockPulseScoreData>({
    overallScore: 86,
    categoryScores: [
      { category: 'emotion_index' as ScoringCategory, score: 84, weight: 0.4 },
      { category: 'engagement_stability' as ScoringCategory, score: 87, weight: 0.3 },
      { category: 'culture_trust' as ScoringCategory, score: 85, weight: 0.3 }
    ],
    themeScores: [],
    tier: 'pulse_certified' as PulseScoreTier,
    insights: ["Your organization demonstrates strong leadership trust and team cohesion, with opportunities to enhance career development paths."],
    recommendedActions: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const randomizeScores = () => {
    const getRandomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    
    const overallScore = getRandomScore(65, 95);
    const emotionScore = getRandomScore(60, 95);
    const engagementScore = getRandomScore(60, 95);
    const trustScore = getRandomScore(60, 95);
    
    let tier: PulseScoreTier = 'pulse_certified';
    if (overallScore < 70) tier = 'intervention_advised';
    else if (overallScore < 78) tier = 'at_risk';
    else if (overallScore < 85) tier = 'emerging_culture';
    
    const categoryScores = [
      { category: 'emotion_index' as ScoringCategory, score: emotionScore, weight: 0.4 },
      { category: 'engagement_stability' as ScoringCategory, score: engagementScore, weight: 0.3 },
      { category: 'culture_trust' as ScoringCategory, score: trustScore, weight: 0.3 }
    ];
    
    setCertData({
      ...certData,
      overallScore,
      categoryScores,
      tier
    });
    
    toast({
      title: "Scores Randomized",
      description: `New overall score: ${overallScore}`,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="custom">Custom Email</TabsTrigger>
            <TabsTrigger value="certification">Certification Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="custom">
            <CustomEmailForm 
              formData={formData}
              onInputChange={handleInputChange}
            />
          </TabsContent>
          
          <TabsContent value="certification">
            <CertificationEmailForm
              formData={formData}
              certData={certData}
              onInputChange={handleInputChange}
              onRandomizeScores={randomizeScores}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailSendTest;
