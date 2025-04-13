
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ProjectProgressChart, { ProjectPhase } from '@/components/task-admin/ProjectProgressChart';
import SyncMonitor from '@/components/task-admin/SyncMonitor';
import AIIntegrationTimeline from '@/components/task-admin/AIIntegrationTimeline';
import RealTimeTriggers from '@/components/task-admin/RealTimeTriggers';
import InsightCard from '@/components/task-admin/InsightCard';

interface ProjectPhaseSectionProps {
  phases: ProjectPhase[];
  lastUpdated: Date;
  onRefresh: () => void;
  aiIntegrationTimeline: Array<{
    milestone: string;
    status: "completed" | "upcoming";
    date: string;
  }>;
  sampleSparklineData: Array<{
    value: number;
    timestamp: string;
  }>;
}

const ProjectPhaseSection: React.FC<ProjectPhaseSectionProps> = ({
  phases,
  lastUpdated,
  onRefresh,
  aiIntegrationTimeline,
  sampleSparklineData
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Project Phase Progress</CardTitle>
            <SyncMonitor lastUpdated={lastUpdated} onRefresh={onRefresh} />
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
  );
};

export default ProjectPhaseSection;
