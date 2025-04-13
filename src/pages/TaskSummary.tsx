import React from 'react';
import MetaTags from '@/components/MetaTags';
import TaskCompletionSummary from '@/components/task-admin/TaskCompletionSummary';
import { Card, CardContent } from "@/components/ui/card";
import ProjectProgressChart, { ProjectPhase } from '@/components/task-admin/ProjectProgressChart';
import TrustTrendPrediction from '@/components/analytics/TrustTrendPrediction';
import { DashboardProvider } from '@/contexts/DashboardContext';
import TeamInsights from '@/components/task-admin/TeamInsights';

const TaskSummary: React.FC = () => {
  // Sample project phases data for the chart
  const phases: ProjectPhase[] = [
    {
      id: "phase-1",
      name: "Foundation",
      progress: 100,
      status: "completed",
      startDate: "2025-01-01",
      endDate: "2025-02-15",
      tasks: []
    },
    {
      id: "phase-2",
      name: "Core Features",
      progress: 65,
      status: "in-progress",
      startDate: "2025-02-16",
      endDate: "2025-04-15",
      tasks: []
    },
    {
      id: "phase-3",
      name: "Beta Launch",
      progress: 10,
      status: "in-progress",
      startDate: "2025-04-16",
      endDate: "2025-06-01",
      tasks: []
    },
    {
      id: "phase-4",
      name: "Public Release",
      progress: 0,
      status: "not-started",
      startDate: "2025-06-02",
      endDate: "2025-07-15",
      tasks: []
    }
  ];

  // Sample trust trend data for prediction widget
  const trustTrends = [
    {
      departmentName: "Engineering",
      currentScore: 75,
      previousScore: 85,
      changePercentage: -11.8,
      predictedRisk: "high" as const,
      riskAreas: ["Team retention", "Leadership trust", "Project delivery"]
    },
    {
      departmentName: "Marketing",
      currentScore: 82,
      previousScore: 79,
      changePercentage: 3.8,
      predictedRisk: "low" as const,
      riskAreas: ["Cross-team collaboration"]
    },
    {
      departmentName: "Customer Support",
      currentScore: 68,
      previousScore: 72,
      changePercentage: -5.6,
      predictedRisk: "medium" as const,
      riskAreas: ["Work-life balance", "Resource allocation"]
    }
  ];

  // Sample team insights data
  const teamInsights = [
    {
      "team": "Team Alpha",
      "insight_type": "Culture Summary",
      "ai_generated": true,
      "content": "Culture Insights – Team Alpha (April 2025)\nYour team continues to show high alignment and positive sentiment around leadership and collaboration. 74% of employees reported a greater sense of clarity in roles, and many referenced 'transparent decision-making'.\n\nHowever, concerns remain around workload balance and recognition. Feedback like 'deadlines are always tight' suggests a need for better prioritization.\n\nRecommendation: Short check-in sessions to revisit scope alignment. Team is well-positioned to level up."
    },
    {
      "team": "Team Beta",
      "insight_type": "PulseScore Certification",
      "ai_generated": true,
      "pulse_score": 82,
      "certification_eligible": true,
      "summary": "Strengths: Inclusion (88%), Peer Trust (91%), Feedback Culture (85%)\nAreas to improve: Workload Balance, Career Clarity\nParticipation Rate: 93%\nAI Rationale: Exceeds 3/5 benchmarks, high psychological safety. Recommend certification."
    },
    {
      "team": "Team Gamma",
      "insight_type": "Risk Alert",
      "ai_generated": true,
      "risk_type": "Burnout & Manager Disconnect",
      "engagement_drop_percent": 28,
      "sentiment_drop": "70% to 48%",
      "recommendation": "Initiate 1:1 check-ins and review sprint allocation. Leadership coaching suggested for the team lead."
    }
  ];

  return (
    <DashboardProvider>
      <div className="container mx-auto py-8 px-4">
        <MetaTags 
          title="Task Summary | PulsePlace.ai" 
          description="Review task completion statistics and project progress."
        />
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Task Summary</h1>
            <p className="text-gray-600 mb-6">
              Review task completion percentages and priority-based statistics for your project.
            </p>
          </div>
          
          <TaskCompletionSummary />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Project Phase Progress</h2>
                <div className="h-[300px]">
                  <ProjectProgressChart phases={phases} />
                </div>
              </CardContent>
            </Card>
            
            <TrustTrendPrediction trends={trustTrends} />
          </div>
          
          <div className="mt-8">
            <TeamInsights insights={teamInsights} />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default TaskSummary;
