
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';
import TaskCompletionSummary from '@/components/task-admin/TaskCompletionSummary';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectProgressChart, { ProjectPhase } from '@/components/task-admin/ProjectProgressChart';
import TrustTrendPrediction from '@/components/analytics/TrustTrendPrediction';
import { DashboardProvider } from '@/contexts/DashboardContext';
import TeamInsights from '@/components/task-admin/team-insights/TeamInsights';
import { TeamInsight } from '@/components/task-admin/team-insights/types';
import { sampleInsights } from '@/utils/ai/insightPrompts';
import { Badge } from "@/components/ui/badge";
import AIIntegrationTimeline from '@/components/task-admin/AIIntegrationTimeline';
import RealTimeTriggers from '@/components/task-admin/RealTimeTriggers';
import AIIntegrationStatus from '@/components/task-admin/AIIntegrationStatus';
import SyncMonitor from '@/components/task-admin/SyncMonitor';
import InsightCard from '@/components/task-admin/InsightCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BetaLaunchPlan from '@/components/task-admin/BetaLaunchPlan';

const TaskSummary: React.FC = () => {
  const [searchParams] = useSearchParams();
  // State for tracking when insights were last updated
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<string>("summary");
  
  // Set the active tab based on the URL query parameter (if present)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && (tabParam === 'summary' || tabParam === 'beta-plan')) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

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
  const teamInsights: TeamInsight[] = [
    ...sampleInsights,
    // Add Team Sigma (approaching certification)
    {
      team: "Team Sigma",
      insight_type: "PulseScore Certification",
      ai_generated: true,
      pulse_score: 78,
      certification_eligible: false,
      summary: "Team Sigma shows promising cultural indicators with a growing PulseScore approaching the certification threshold. Key strengths include innovation, cross-functional collaboration, and learning culture. While not yet eligible for certification, the team is trending positively.",
      updated_at: new Date(Date.now() - 3600000 * 24) // 1 day ago
    },
    // Add Team Sigma culture summary
    {
      team: "Team Sigma",
      insight_type: "Culture Summary",
      ai_generated: true,
      content: "Team Sigma demonstrates strong innovation metrics with 92% positive sentiment around creativity and 87% for cross-functional collaboration. Their learning culture (84% positive) is also notable. However, work-life balance (64%) and communication clarity (69%) need attention. The team's energy and enthusiasm are high, but there are early signs of potential burnout.",
      updated_at: new Date(Date.now() - 3600000 * 36) // 1.5 days ago
    },
    // Add Team Zeta (gold certification level)
    {
      team: "Team Zeta",
      insight_type: "PulseScore Certification",
      ai_generated: true,
      pulse_score: 94,
      certification_eligible: true,
      summary: "Team Zeta has achieved our highest PulseScore with exceptional ratings across all categories, earning Gold Certification status. This team demonstrates exemplary psychological safety, leadership trust, and team cohesion, serving as an internal benchmark for cultural excellence.",
      updated_at: new Date() // Just now
    }
  ] as TeamInsight[];
  
  // Demo content - AI integration timeline
  const aiIntegrationTimeline = [
    { milestone: "Base LLM Integration", status: "completed" as const, date: "Mar 28" },
    { milestone: "Sentiment Pipeline", status: "completed" as const, date: "Apr 5" },
    { milestone: "Real-time Insights", status: "completed" as const, date: "Apr 13" },
    { milestone: "Final Deployment", status: "upcoming" as const, date: "Apr 21" }
  ];

  // Handle data refresh
  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  // Sample sparkline data for team performance
  const sampleSparklineData = [
    { value: 70, timestamp: '2025-03-01' },
    { value: 65, timestamp: '2025-03-08' },
    { value: 68, timestamp: '2025-03-15' },
    { value: 72, timestamp: '2025-03-22' },
    { value: 78, timestamp: '2025-03-29' },
    { value: 82, timestamp: '2025-04-05' },
    { value: 85, timestamp: '2025-04-12' },
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
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold">Task Summary</h1>
              <Badge className="bg-green-100 text-green-800">AI Integration: 100% Ready</Badge>
            </div>
            <p className="text-gray-600 mb-6">
              Review task completion percentages and priority-based statistics for your project.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="summary">Project Summary</TabsTrigger>
              <TabsTrigger value="beta-plan">Beta Launch Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-8">
              <TaskCompletionSummary />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-xl font-semibold">Project Phase Progress</CardTitle>
                      <SyncMonitor lastUpdated={lastUpdated} onRefresh={handleRefresh} />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-[300px]">
                        <ProjectProgressChart phases={phases} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <InsightCard 
                    title="AI Integration Timeline"
                    type="info"
                    content={<AIIntegrationTimeline timeline={aiIntegrationTimeline} />}
                  />
                  
                  <InsightCard 
                    title="Real-Time Triggers"
                    type="success"
                    content={<RealTimeTriggers />}
                    sparklineData={sampleSparklineData}
                    badgeText="Active"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TrustTrendPrediction trends={trustTrends} />
                <AIIntegrationStatus />
              </div>
              
              <div className="mt-8">
                <TeamInsights insights={teamInsights} />
              </div>
            </TabsContent>
            
            <TabsContent value="beta-plan">
              <BetaLaunchPlan />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default TaskSummary;
