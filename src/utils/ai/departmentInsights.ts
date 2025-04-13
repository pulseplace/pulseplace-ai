
import { AIInsight } from '@/types/scoring.types';

/**
 * Generate AI insights for a specific department
 */
export const generateDepartmentInsights = (department: string, metrics: any): AIInsight[] => {
  // This would connect to an LLM in production
  const insights: AIInsight[] = [
    {
      concernCategory: "Career Development",
      concernText: "Limited visibility into promotion criteria",
      severity: "medium",
      impactArea: `${department} Team Retention`,
      recommendedAction: "Create transparent career progression framework with clear milestones"
    },
    {
      concernCategory: "Work-Life Balance",
      concernText: "After-hours communication expectations",
      severity: department === "Sales" ? "high" : "medium",
      impactArea: "Employee Wellbeing",
      recommendedAction: "Implement team communication guidelines with designated offline hours"
    },
    {
      concernCategory: "Team Dynamics",
      concernText: "Siloed knowledge and information sharing",
      severity: "low",
      impactArea: "Cross-functional Collaboration",
      recommendedAction: "Schedule bi-weekly knowledge sharing sessions across related teams"
    }
  ];
  
  return insights;
};

/**
 * Generate predictive flags for potential cultural issues
 */
export const generatePredictiveFlags = (surveyData: any): Array<{
  department: string;
  issue: string;
  severity: "high" | "medium" | "low";
  predictedImpact: number;
}> => {
  // This would use a prediction model in production
  return [
    {
      department: "Engineering",
      issue: "Psychological safety concerns in team meetings",
      severity: "medium",
      predictedImpact: 65
    },
    {
      department: "Sales",
      issue: "Work-life balance deterioration due to end-of-quarter targets",
      severity: "high",
      predictedImpact: 80
    },
    {
      department: "Customer Success",
      issue: "Career growth perception gap with other departments",
      severity: "medium",
      predictedImpact: 70
    }
  ];
};
