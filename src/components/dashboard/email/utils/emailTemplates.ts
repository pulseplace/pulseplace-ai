
import { MockPulseScoreData } from '@/types/scoring.types';
import { generateDepartmentInsights, generateRecommendedActions } from '@/utils/ai/departmentInsights';

// Generate a mock PulseScore for email templates
export const generateMockPulseScore = (companyName: string = 'Acme Corporation'): MockPulseScoreData => {
  // Create sample theme scores
  const themesScores = [
    { theme: 'trust_in_leadership' as const, score: 75, count: 15 },
    { theme: 'psychological_safety' as const, score: 82, count: 15 },
    { theme: 'inclusion_belonging' as const, score: 78, count: 15 },
    { theme: 'work_life_balance' as const, score: 65, count: 15 },
    { theme: 'growth_opportunity' as const, score: 80, count: 15 }
  ];
  
  // Create sample category scores
  const categoryScores = [
    { category: 'emotion_index' as const, score: 78, weight: 0.4 },
    { category: 'culture_trust' as const, score: 80, weight: 0.35 },
    { category: 'engagement_stability' as const, score: 72, weight: 0.25 }
  ];
  
  // Calculate overall score from category scores (weighted average)
  const overallScore = Math.round(
    categoryScores.reduce((sum, { category, score, weight }) => sum + score * weight, 0) / 
    categoryScores.reduce((sum, { weight }) => sum + weight, 0)
  );

  // Generate insights
  const insights = generateDepartmentInsights(overallScore);
  
  // Generate actions based on insights
  const recommendedActions = generateRecommendedActions(insights);
  
  // Determine tier based on score
  let tier: any = 'emerging_culture';
  if (overallScore >= 80) {
    tier = 'pulse_certified';
  } else if (overallScore < 50) {
    tier = 'intervention_advised';
  } else if (overallScore < 65) {
    tier = 'at_risk';
  }
  
  return {
    overallScore,
    themesScores,
    categoryScores,
    responseCount: 45,
    tier,
    insights,
    recommendedActions,
    companyName,
    industryBenchmark: 75,
    dateGenerated: new Date().toISOString()
  };
};

// Email content templates
export const emailSubjectTemplates = {
  certification: (companyName: string, score: number) => 
    `PulseScore™ Certification: ${companyName} (${score}/100)`,
  
  insights: (companyName: string) => 
    `Culture Insights Report for ${companyName}`,
  
  action_plan: (companyName: string) => 
    `Culture Action Plan for ${companyName}`,
  
  reminder: (companyName: string) => 
    `Reminder: Complete your PulsePlace survey at ${companyName}`
};

// Generate email signature
export const getEmailSignature = () => `
<div style="margin-top: 30px; color: #64748b; font-size: 14px;">
  <p>Best regards,</p>
  <p><strong>The PulsePlace Team</strong></p>
  <p>
    <a href="https://pulseplace.ai" style="color: #6366f1;">pulseplace.ai</a> | 
    <a href="mailto:support@pulseplace.ai" style="color: #6366f1;">support@pulseplace.ai</a>
  </p>
</div>
`;
