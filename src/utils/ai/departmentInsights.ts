
import { AIInsight } from '@/types/scoring.types';

// Generate AI insights based on score
export const generateDepartmentInsights = (departmentScore: number): AIInsight[] => {
  const insights: AIInsight[] = [
    {
      title: "Employee Engagement",
      content: "Regular team building activities have improved employee engagement scores by 18% over the past quarter.",
      category: "Engagement",
      severity: "positive"
    },
    {
      title: "Leadership Communication",
      content: "Leadership transparency score is below benchmark. Consider implementing more consistent communication channels.",
      category: "Leadership",
      severity: "important"
    },
    {
      title: "Work-Life Balance",
      content: "33% of employees report working more than 50 hours per week. Review workload distribution.",
      category: "Wellbeing",
      severity: "moderate"
    }
  ];

  if (departmentScore < 65) {
    insights.push({
      title: "Retention Risk",
      content: "Current engagement metrics indicate a 28% higher risk of turnover in the next quarter compared to industry baseline.",
      category: "Retention",
      severity: "critical"
    });
  }

  return insights;
};

// Generate recommended actions based on insights
export const generateRecommendedActions = (insights: AIInsight[]): string[] => {
  return [
    "Implement bi-weekly leadership Q&A sessions to improve transparency",
    "Review and adjust workload distribution across teams",
    "Develop a structured 30-60-90 day onboarding program for new hires",
    "Schedule regular one-on-one meetings between managers and direct reports"
  ];
};
