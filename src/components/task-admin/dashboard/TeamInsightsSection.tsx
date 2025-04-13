
import React from 'react';
import TeamInsights from '@/components/task-admin/team-insights/TeamInsights';
import { TeamInsight } from '@/components/task-admin/team-insights/types';

interface TeamInsightsSectionProps {
  teamInsights: TeamInsight[];
}

const TeamInsightsSection: React.FC<TeamInsightsSectionProps> = ({ teamInsights }) => {
  return (
    <div className="mt-8">
      <TeamInsights insights={teamInsights} />
    </div>
  );
};

export default TeamInsightsSection;
