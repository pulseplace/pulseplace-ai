
import React, { useState, useEffect } from 'react';
import MetaTags from '@/components/MetaTags';
import TaskCompletionSummary from '@/components/task-admin/TaskCompletionSummary';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectProgressChart, { ProjectPhase } from '@/components/task-admin/ProjectProgressChart';
import TrustTrendPrediction from '@/components/analytics/TrustTrendPrediction';
import { DashboardProvider } from '@/contexts/DashboardContext';
import TeamInsights from '@/components/task-admin/TeamInsights';
import { sampleInsights } from '@/utils/ai/insightPrompts';
import { Badge } from "@/components/ui/badge";
import { Info } from 'lucide-react';

const TaskSummary: React.FC = () => {
  // State for tracking when insights were last updated
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
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
    },
    {
      departmentName: "Team Sigma",
      currentScore: 78,
      previousScore: 74,
      changePercentage: 5.4,
      predictedRisk: "low" as const,
      riskAreas: ["Work-life balance"]
    },
    {
      departmentName: "Team Zeta",
      currentScore: 94,
      previousScore: 91,
      changePercentage: 3.2,
      predictedRisk: "low" as const,
      riskAreas: []
    }
  ];

  // Using sample insights with added new teams
  const teamInsights = [
    ...sampleInsights,
    // Add Team Sigma (approaching certification)
    {
      team: "Team Sigma",
      insight_type: "PulseScore Certification" as const,
      ai_generated: true,
      pulse_score: 78,
      certification_eligible: false,
      summary: "Team Sigma shows promising cultural indicators with a growing PulseScore approaching the certification threshold. Key strengths include innovation, cross-functional collaboration, and learning culture. While not yet eligible for certification, the team is trending positively.",
      updated_at: new Date(Date.now() - 3600000 * 24) // 1 day ago
    },
    // Add Team Sigma culture summary
    {
      team: "Team Sigma",
      insight_type: "Culture Summary" as const,
      ai_generated: true,
      content: "Team Sigma demonstrates strong innovation metrics with 92% positive sentiment around creativity and 87% for cross-functional collaboration. Their learning culture (84% positive) is also notable. However, work-life balance (64%) and communication clarity (69%) need attention. The team's energy and enthusiasm are high, but there are early signs of potential burnout.",
      updated_at: new Date(Date.now() - 3600000 * 36) // 1.5 days ago
    },
    // Add Team Zeta (gold certification level)
    {
      team: "Team Zeta",
      insight_type: "PulseScore Certification" as const,
      ai_generated: true,
      pulse_score: 94,
      certification_eligible: true,
      summary: "Team Zeta has achieved our highest PulseScore with exceptional ratings across all categories, earning Gold Certification status. This team demonstrates exemplary psychological safety, leadership trust, and team cohesion, serving as an internal benchmark for cultural excellence.",
      updated_at: new Date() // Just now
    }
  ];
  
  // Demo content - AI integration timeline
  const aiIntegrationTimeline = [
    { milestone: "Base LLM Integration", status: "completed", date: "Mar 28" },
    { milestone: "Sentiment Pipeline", status: "completed", date: "Apr 5" },
    { milestone: "Real-time Insights", status: "completed", date: "Apr 13" },
    { milestone: "Final Deployment", status: "upcoming", date: "Apr 21" }
  ];
  
  // Demo component for real-time trigger conditions
  const RealTimeTriggers = () => (
    <Card className="bg-gray-50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-sm font-medium">Real-Time Insight Triggers</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0 text-xs text-gray-600">
        <ul className="space-y-1">
          <li className="flex items-center justify-between">
            <span>Culture Summary:</span>
            <Badge variant="outline" className="text-xs">Survey Completion (5+ responses)</Badge>
          </li>
          <li className="flex items-center justify-between">
            <span>Risk Alert:</span>
            <Badge variant="outline" className="text-xs">Sentiment Drop (15%+)</Badge>
          </li>
          <li className="flex items-center justify-between">
            <span>Certification:</span>
            <Badge variant="outline" className="text-xs">PulseScore (75+ points)</Badge>
          </li>
          <li className="flex items-center justify-between">
            <span>Fallback:</span>
            <Badge variant="outline" className="text-xs">Demo Content</Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <DashboardProvider>
      <div className="container mx-auto py-8 px-4">
        <MetaTags 
          title="Task Summary | PulsePlace.ai" 
          description="Review task completion statistics and project progress."
        />
        
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold">Task Summary</h1>
              <Badge className="bg-green-100 text-green-800">AI Integration: 100% Ready</Badge>
            </div>
            <p className="text-gray-600 mb-6">
              Review task completion percentages and priority-based statistics for your project.
            </p>
          </div>
          
          <TaskCompletionSummary />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Project Phase Progress</h2>
                  <div className="h-[300px]">
                    <ProjectProgressChart phases={phases} />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">AI Integration Timeline</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {aiIntegrationTimeline.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            item.status === 'completed' ? 'bg-green-500' : 
                            item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                          <span>{item.milestone}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            item.status === 'completed' ? 'text-green-600' : 
                            item.status === 'in-progress' ? 'text-blue-600' : 'text-gray-500'
                          }`}
                        >
                          {item.date}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <RealTimeTriggers />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrustTrendPrediction trends={trustTrends} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">AI Integration Components</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sentiment Analysis Pipeline</span>
                    <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PulseBot Implementation</span>
                    <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Insights Engine</span>
                    <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Culture Compass Implementation</span>
                    <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
