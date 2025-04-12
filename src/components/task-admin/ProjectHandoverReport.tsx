import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import { jsPDF } from 'jspdf';

export interface TaskCategory {
  name: string;
  completion: number;
  status: 'not-started' | 'in-progress' | 'near-complete' | 'complete';
  notes: string;
}

export interface CriticalTask {
  name: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'complete';
  assignedTo: string;
  dueDate: string;
}

export interface TeamMember {
  name: string;
  role: string;
  tasksAssigned: number;
  tasksCompleted: number;
}

export interface ProjectStat {
  name: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ProjectHandoverReportProps {
  projectName?: string;
  currentPhase?: string;
  targetLaunchDate?: string;
  taskCategories?: TaskCategory[];
  criticalTasks?: CriticalTask[];
  teamMembers?: TeamMember[];
  projectStats?: ProjectStat[];
  riskFactors?: {
    name: string;
    impact: 'low' | 'medium' | 'high';
    likelihood: 'low' | 'medium' | 'high';
    mitigation: string;
  }[];
}

const defaultTaskCategories: TaskCategory[] = [
  {
    name: "Core Features Implementation",
    completion: 85,
    status: "in-progress",
    notes: "Final AI engine integration pending"
  },
  {
    name: "User Authentication",
    completion: 100,
    status: "complete",
    notes: "Includes email/password and social auth"
  },
  {
    name: "Dashboard Implementation",
    completion: 90,
    status: "near-complete",
    notes: "Advanced analytics pending final review"
  },
  {
    name: "Navigation & Site Structure",
    completion: 95,
    status: "near-complete",
    notes: "Final link validation in progress"
  },
  {
    name: "Responsive Design",
    completion: 96,
    status: "near-complete",
    notes: "Minor tablet breakpoint adjustments needed"
  },
  {
    name: "Content & Messaging",
    completion: 82,
    status: "in-progress",
    notes: "Final review and polish underway"
  },
  {
    name: "Testing & QA",
    completion: 78,
    status: "in-progress",
    notes: "Integration tests and UX reviews ongoing"
  },
  {
    name: "Deployment Pipeline",
    completion: 100,
    status: "complete",
    notes: "CI/CD pipeline fully configured"
  },
  {
    name: "Pitch Deck & Demo Materials",
    completion: 88,
    status: "in-progress",
    notes: "Financial projections being finalized"
  }
];

const defaultCriticalTasks: CriticalTask[] = [
  {
    name: "Complete link validation across site",
    priority: "high",
    status: "in-progress",
    assignedTo: "Dev Team",
    dueDate: "Apr 15, 2025"
  },
  {
    name: "Finalize AI analytics dashboard",
    priority: "high",
    status: "in-progress",
    assignedTo: "Data Science Team",
    dueDate: "Apr 18, 2025"
  },
  {
    name: "Complete comprehensive cross-browser testing",
    priority: "high",
    status: "not-started",
    assignedTo: "QA Team",
    dueDate: "Apr 17, 2025"
  },
  {
    name: "Update pricing tier information",
    priority: "medium",
    status: "not-started",
    assignedTo: "Marketing",
    dueDate: "Apr 19, 2025"
  },
  {
    name: "Complete onboarding flow optimizations",
    priority: "medium",
    status: "in-progress",
    assignedTo: "UX Team",
    dueDate: "Apr 20, 2025"
  },
  {
    name: "Configure production environment",
    priority: "high",
    status: "not-started",
    assignedTo: "DevOps",
    dueDate: "Apr 20, 2025"
  },
  {
    name: "Conduct final security audit",
    priority: "high",
    status: "not-started",
    assignedTo: "Security Team",
    dueDate: "Apr 19, 2025"
  }
];

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Development Team",
    role: "Frontend/Backend Implementation",
    tasksAssigned: 24,
    tasksCompleted: 18
  },
  {
    name: "UX/UI Team",
    role: "Design & User Experience",
    tasksAssigned: 16,
    tasksCompleted: 14
  },
  {
    name: "QA Team",
    role: "Testing & Quality Assurance",
    tasksAssigned: 12,
    tasksCompleted: 7
  },
  {
    name: "Pitch Team",
    role: "Pitch Deck & Demo Preparation",
    tasksAssigned: 8,
    tasksCompleted: 6
  }
];

const defaultProjectStats: ProjectStat[] = [
  {
    name: "Overall Completion",
    value: "87%",
    change: "+4% from last week",
    trend: "up"
  },
  {
    name: "Days to Beta Launch",
    value: 18,
    change: "On schedule",
    trend: "neutral"
  },
  {
    name: "Critical Issues Open",
    value: 3,
    change: "-2 from last week",
    trend: "up"
  },
  {
    name: "Total Features",
    value: "32/35 implemented",
    change: "+5 this week",
    trend: "up"
  }
];

const defaultRiskFactors = [
  {
    name: "AI Engine Integration Complexity",
    impact: "high" as const,
    likelihood: "medium" as const,
    mitigation: "Additional developer resources allocated"
  },
  {
    name: "Beta Tester Recruitment Delay",
    impact: "medium" as const,
    likelihood: "low" as const,
    mitigation: "Expanded outreach to potential testers"
  },
  {
    name: "Performance Issues at Scale",
    impact: "high" as const,
    likelihood: "medium" as const,
    mitigation: "Load testing planned prior to launch"
  }
];

const ProjectHandoverReport: React.FC<ProjectHandoverReportProps> = ({
  projectName = "PulsePlace.ai",
  currentPhase = "Beta Launch Preparation",
  targetLaunchDate = "April 21, 2025",
  taskCategories = defaultTaskCategories,
  criticalTasks = defaultCriticalTasks,
  teamMembers = defaultTeamMembers,
  projectStats = defaultProjectStats,
  riskFactors = defaultRiskFactors
}) => {
  const overallCompletion = Math.round(
    taskCategories.reduce((sum, category) => sum + category.completion, 0) / taskCategories.length
  );
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(`${projectName} - Project Handover Report`, 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Current Phase: ${currentPhase}`, 20, 30);
    doc.text(`Target Launch Date: ${targetLaunchDate}`, 20, 37);
    doc.text(`Overall Completion: ${overallCompletion}%`, 20, 44);
    
    doc.setFontSize(16);
    doc.text("Task Categories", 20, 60);
    
    let yPos = 70;
    taskCategories.forEach((category, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(12);
      doc.text(`${category.name} - ${category.completion}% complete`, 20, yPos);
      yPos += 7;
    });
    
    yPos += 10;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.text("Critical Path Tasks", 20, yPos);
    yPos += 10;
    
    criticalTasks.slice(0, 5).forEach((task) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(12);
      doc.text(`${task.name} - Due: ${task.dueDate}`, 20, yPos);
      doc.text(`Priority: ${task.priority}, Status: ${task.status}`, 40, yPos + 7);
      yPos += 15;
    });
    
    yPos += 10;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.text("Risk Assessment", 20, yPos);
    yPos += 10;
    
    riskFactors.forEach((risk) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(12);
      doc.text(`${risk.name} - Impact: ${risk.impact}, Likelihood: ${risk.likelihood}`, 20, yPos);
      yPos += 7;
    });
    
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`, 20, 287);
    }
    
    doc.save(`${projectName.replace(/\s+/g, '-').toLowerCase()}-handover-report.pdf`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Complete</Badge>;
      case 'near-complete':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Near Complete</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };
  
  const getRiskBadge = (level: string) => {
    switch(level) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{projectName} Project Handover Report</h2>
          <p className="text-gray-500">Current Phase: {currentPhase}</p>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm text-gray-600">Target Launch: {targetLaunchDate}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600">Generated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleExportPDF}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Export PDF
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <div className="flex items-end justify-between mt-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.change && (
                  <div className={`flex items-center text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Completion Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{overallCompletion}%</span>
            </div>
            <Progress value={overallCompletion} className="h-2.5" />
          </div>
          
          <div className="grid gap-4">
            {taskCategories.map((category, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <span className="font-medium">{category.name}</span>
                    <div className="ml-2">
                      {getStatusBadge(category.status)}
                    </div>
                  </div>
                  <span className="text-sm font-medium">{category.completion}%</span>
                </div>
                <Progress value={category.completion} className="h-2 mb-2" />
                <p className="text-sm text-gray-600 mt-2">{category.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Critical Path Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criticalTasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Factor</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Likelihood</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskFactors.map((risk, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{risk.name}</TableCell>
                    <TableCell>{getRiskBadge(risk.impact)}</TableCell>
                    <TableCell>{getRiskBadge(risk.likelihood)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Mitigation Strategies</h4>
              <ul className="space-y-2">
                {riskFactors.map((risk, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{risk.name}:</span> {risk.mitigation}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Allocation & Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Completion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </TableCell>
                    <TableCell>{member.tasksCompleted}/{member.tasksAssigned}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress 
                          value={Math.round((member.tasksCompleted / member.tasksAssigned) * 100)} 
                          className="h-2 w-20 mr-2" 
                        />
                        <span>{Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div>
              <h4 className="font-medium mb-3">Team Task Distribution</h4>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">{member.name}</span>
                      <span className="text-sm">{member.tasksCompleted}/{member.tasksAssigned}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-pulse-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%` }} 
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Action Plan for Beta Launch (April 21, 2025)</CardTitle>
          <Badge className="ml-2 bg-orange-100 text-orange-800 border-orange-200">High Priority</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                Immediate Actions (Next 3 Days)
              </h4>
              <ul className="list-none space-y-2">
                {criticalTasks
                  .filter(task => task.priority === "high" && new Date(task.dueDate) <= new Date('2025-04-15'))
                  .map((task, idx) => (
                    <li key={idx} className="flex items-center p-2 rounded-md bg-orange-50 border border-orange-100">
                      <div className="mr-3">
                        {task.status === 'complete' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{task.name}</p>
                        <p className="text-sm text-gray-600">Assigned to: {task.assignedTo} • Due: {task.dueDate}</p>
                      </div>
                      <div>
                        {getStatusBadge(task.status)}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                Pre-Launch Actions (April 16-20)
              </h4>
              <ul className="list-none space-y-2">
                {criticalTasks
                  .filter(task => 
                    task.priority === "high" && 
                    new Date(task.dueDate) > new Date('2025-04-15') &&
                    new Date(task.dueDate) <= new Date('2025-04-20')
                  )
                  .map((task, idx) => (
                    <li key={idx} className="flex items-center p-2 rounded-md bg-blue-50 border border-blue-100">
                      <div className="mr-3">
                        {task.status === 'complete' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Calendar className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{task.name}</p>
                        <p className="text-sm text-gray-600">Assigned to: {task.assignedTo} • Due: {task.dueDate}</p>
                      </div>
                      <div>
                        {getStatusBadge(task.status)}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Risk Mitigation Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className={`p-3 rounded-md border ${
                    risk.impact === 'high' ? 'bg-red-50 border-red-100' : 
                    risk.impact === 'medium' ? 'bg-yellow-50 border-yellow-100' : 
                    'bg-blue-50 border-blue-100'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium">{risk.name}</h5>
                      <div className="flex space-x-1">
                        <span className="text-xs">Impact:</span>
                        {getRiskBadge(risk.impact)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Likelihood: {risk.likelihood}</p>
                    <div className="text-xs font-medium uppercase text-gray-500 mb-1">Mitigation Plan:</div>
                    <p className="text-sm">{risk.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Launch Day Checklist (April 21)</h4>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  <li>Final end-to-end testing of core user flows</li>
                  <li>Verify all analytics tracking is working correctly</li>
                  <li>Confirm email notifications and integrations are functional</li>
                  <li>Deploy to production environment (morning of April 21)</li>
                  <li>Conduct smoke testing in production environment</li>
                  <li>Send beta launch emails to confirmed participants</li>
                  <li>Monitor system health and performance metrics</li>
                  <li>Have support team standby for initial user onboarding</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Post-Launch Monitoring (April 21-28)</h4>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  <li>Daily review of system performance and error logs</li>
                  <li>User feedback collection and prioritization</li>
                  <li>Daily bug triage and critical issue resolution</li>
                  <li>User engagement monitoring and dropout analysis</li>
                  <li>Weekly team retrospective to assess launch success</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button 
          onClick={handleExportPDF}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Action Plan
        </Button>
      </div>
    </div>
  );
};

export default ProjectHandoverReport;
