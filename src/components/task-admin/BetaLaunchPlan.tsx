
import React from 'react';
import StatusOverview from './beta-launch/StatusOverview';
import PhaseList from './beta-launch/PhaseList';
import MilestoneList from './beta-launch/MilestoneList';
import FocusAreas from './beta-launch/FocusAreas';
import { PhaseItem, MilestoneItem, FocusArea } from './beta-launch/types';

const BetaLaunchPlan: React.FC = () => {
  // Phase data
  const phases: PhaseItem[] = [
    {
      title: "Foundation Phase",
      description: "Core platform architecture and essential features",
      timeframe: "January 2025 - February 2025",
      status: "completed",
      tasks: [
        { name: "Authentication system", status: "completed", priority: "high" },
        { name: "Database architecture", status: "completed", priority: "high" },
        { name: "User management", status: "completed", priority: "medium" },
        { name: "Basic UI components", status: "completed", priority: "medium" },
        { name: "Initial survey engine", status: "completed", priority: "high" }
      ]
    },
    {
      title: "Core Features Phase",
      description: "Development of key platform functionality and AI integration",
      timeframe: "February 2025 - April 2025",
      status: "in-progress",
      tasks: [
        { name: "AI integration pipeline", status: "completed", priority: "high" },
        { name: "PulseScore calculation engine", status: "completed", priority: "high" },
        { name: "Dashboard visualizations", status: "in-progress", priority: "medium" },
        { name: "Advanced survey features", status: "in-progress", priority: "medium" },
        { name: "Analytics and reporting", status: "in-progress", priority: "high" },
        { name: "Certification framework", status: "at-risk", priority: "high" }
      ]
    },
    {
      title: "Beta Launch Phase",
      description: "Platform refinement and initial user onboarding",
      timeframe: "April 2025 - June 2025",
      status: "upcoming",
      tasks: [
        { name: "Onboarding flow implementation", status: "pending", priority: "high" },
        { name: "Beta user invitation system", status: "pending", priority: "high" },
        { name: "Feedback collection mechanism", status: "pending", priority: "medium" },
        { name: "Bug fixing and optimization", status: "pending", priority: "high" },
        { name: "User training materials", status: "pending", priority: "medium" }
      ]
    },
    {
      title: "Public Release Phase",
      description: "Full launch with complete feature set",
      timeframe: "June 2025 - July 2025",
      status: "upcoming",
      tasks: [
        { name: "Scaling infrastructure", status: "pending", priority: "high" },
        { name: "Finalize pricing model", status: "pending", priority: "high" },
        { name: "Marketing campaign", status: "pending", priority: "medium" },
        { name: "Documentation & help center", status: "pending", priority: "medium" },
        { name: "Enterprise features rollout", status: "pending", priority: "medium" }
      ]
    }
  ];

  // Key milestones
  const keyMilestones: MilestoneItem[] = [
    { date: "February 15, 2025", title: "Foundation Complete", status: "completed" },
    { date: "April 15, 2025", title: "Core Features Release", status: "in-progress" },
    { date: "April 28, 2025", title: "First Beta User Onboarding", description: "Initial group of 10 companies", status: "upcoming" },
    { date: "May 15, 2025", title: "Beta Expansion (50 companies)", status: "upcoming" },
    { date: "June 1, 2025", title: "Pre-launch Marketing Campaign", status: "upcoming" },
    { date: "July 15, 2025", title: "Public Launch Event", status: "upcoming" }
  ];

  // Focus areas for beta launch
  const focusAreas: FocusArea[] = [
    {
      title: "User Onboarding Experience",
      description: "Streamlined sign-up, account setup, and initial survey creation.",
      color: "bg-purple-100"
    },
    {
      title: "AI Insights Accuracy",
      description: "Fine-tuning of recommendation algorithms and sentiment analysis.",
      color: "bg-blue-100"
    },
    {
      title: "Performance Optimization",
      description: "Dashboard rendering speed and report generation efficiency.",
      color: "bg-green-100"
    },
    {
      title: "Feedback Collection System",
      description: "In-app mechanisms for beta users to report issues and suggest improvements.",
      color: "bg-amber-100"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Beta Launch Plan</h2>
        <StatusOverview />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <PhaseList phases={phases} />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Key Milestones</h3>
          <MilestoneList milestones={keyMilestones} />
          
          <h3 className="text-lg font-medium mt-8 mb-4">Beta Launch Focus Areas</h3>
          <FocusAreas areas={focusAreas} />
        </div>
      </div>
    </div>
  );
};

export default BetaLaunchPlan;
