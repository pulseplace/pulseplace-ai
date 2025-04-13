
/**
 * Generate manager action summary with high-priority items
 */
export const generateManagerSummary = (manager: string, teamData: any): {
  focusAreas: string[];
  recentTrends: Array<{trend: string; direction: 'up' | 'down' | 'stable'}>;
  teamConcerns: string[];
} => {
  // Would be AI-powered in production
  return {
    focusAreas: [
      "Schedule 1:1s with team members expressing career development concerns",
      "Address meeting culture feedback by implementing no-meeting Fridays",
      "Follow up on cross-team collaboration friction with Product team"
    ],
    recentTrends: [
      {trend: "Team morale", direction: "up"},
      {trend: "Project clarity", direction: "down"},
      {trend: "Work-life satisfaction", direction: "stable"}
    ],
    teamConcerns: [
      "Unclear requirements from stakeholders",
      "Too many context-switching demands",
      "Limited visibility into company direction"
    ]
  };
};
