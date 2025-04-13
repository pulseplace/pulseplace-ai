
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface PhaseItem {
  title: string;
  description: string;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  tasks: {
    name: string;
    status: 'completed' | 'in-progress' | 'pending' | 'at-risk';
    priority: 'high' | 'medium' | 'low';
  }[];
}

interface MilestoneProps {
  date: string;
  title: string;
  description?: string;
  status: 'completed' | 'upcoming' | 'in-progress';
}

const Milestone: React.FC<MilestoneProps> = ({ date, title, description, status }) => {
  return (
    <div className="flex items-start mb-6">
      <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0 ${
        status === 'completed' ? 'bg-green-100 text-green-600' : 
        status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {status === 'completed' ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Clock className="h-5 w-5" />
        )}
      </div>
      <div>
        <div className="text-sm text-gray-500">{date}</div>
        <h3 className="font-medium text-lg">{title}</h3>
        {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
      </div>
    </div>
  );
};

const TaskItem: React.FC<{ task: PhaseItem['tasks'][0], phaseStatus: PhaseItem['status'] }> = ({ task, phaseStatus }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full mr-3 ${
          task.status === 'completed' ? 'bg-green-500' : 
          task.status === 'in-progress' ? 'bg-blue-500' : 
          task.status === 'at-risk' ? 'bg-red-500' : 'bg-gray-300'
        }`} />
        <span className={phaseStatus === 'upcoming' ? 'text-gray-400' : ''}>{task.name}</span>
      </div>
      <Badge className={`
        ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
        task.status === 'at-risk' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
        ${task.priority === 'high' ? 'border border-red-200' : ''}
      `}>
        {task.status === 'at-risk' ? 'At Risk' : task.status}
        {task.priority === 'high' && ' (High)'}
      </Badge>
    </div>
  );
};

const PhaseCard: React.FC<{ phase: PhaseItem }> = ({ phase }) => {
  return (
    <Card className={`mb-6 ${
      phase.status === 'completed' ? 'border-l-4 border-l-green-500' : 
      phase.status === 'in-progress' ? 'border-l-4 border-l-blue-500' : ''
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{phase.title}</CardTitle>
          <Badge className={`
            ${phase.status === 'completed' ? 'bg-green-100 text-green-800' : 
              phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-800'}
          `}>
            {phase.status.replace('-', ' ')}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">{phase.timeframe}</div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{phase.description}</p>
        <div className="space-y-1">
          {phase.tasks.map((task, index) => (
            <TaskItem key={index} task={task} phaseStatus={phase.status} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const BetaLaunchPlan: React.FC = () => {
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

  const keyMilestones = [
    { date: "February 15, 2025", title: "Foundation Complete", status: "completed" as const },
    { date: "April 15, 2025", title: "Core Features Release", status: "in-progress" as const },
    { date: "April 28, 2025", title: "First Beta User Onboarding", description: "Initial group of 10 companies", status: "upcoming" as const },
    { date: "May 15, 2025", title: "Beta Expansion (50 companies)", status: "upcoming" as const },
    { date: "June 1, 2025", title: "Pre-launch Marketing Campaign", status: "upcoming" as const },
    { date: "July 15, 2025", title: "Public Launch Event", status: "upcoming" as const }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Beta Launch Plan</h2>
        <Card className="bg-blue-50 border-blue-100 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <AlertCircle className="text-blue-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Current Status Overview</h3>
                <p className="text-sm text-gray-700 mt-1">
                  The project is currently in the <span className="font-medium">Core Features Phase (65% complete)</span>, 
                  with plans to begin beta onboarding in late April. Development is on track with the 
                  exception of the Certification Framework, which requires attention to meet the timeline.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Phase Details & Tasks</h3>
          {phases.map((phase, index) => (
            <PhaseCard key={index} phase={phase} />
          ))}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Key Milestones</h3>
          <Card>
            <CardContent className="pt-6">
              {keyMilestones.map((milestone, index) => (
                <Milestone 
                  key={index} 
                  date={milestone.date} 
                  title={milestone.title} 
                  description={milestone.description}
                  status={milestone.status}
                />
              ))}
            </CardContent>
          </Card>
          
          <h3 className="text-lg font-medium mt-8 mb-4">Beta Launch Focus Areas</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 rounded p-2 mr-3">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">User Onboarding Experience</h4>
                    <p className="text-sm text-gray-600">Streamlined sign-up, account setup, and initial survey creation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded p-2 mr-3">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">AI Insights Accuracy</h4>
                    <p className="text-sm text-gray-600">Fine-tuning of recommendation algorithms and sentiment analysis.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded p-2 mr-3">
                    <ArrowRight className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Performance Optimization</h4>
                    <p className="text-sm text-gray-600">Dashboard rendering speed and report generation efficiency.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-100 rounded p-2 mr-3">
                    <ArrowRight className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Feedback Collection System</h4>
                    <p className="text-sm text-gray-600">In-app mechanisms for beta users to report issues and suggest improvements.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BetaLaunchPlan;
