
import { Task, BuildRequest, DebugLog } from '@/types/task.types';

// Mock data for regular tasks
export const getMockTasks = (): Task[] => [
  {
    id: '1',
    name: 'Update documentation',
    module: 'Frontend UI',
    priority: 'Medium',
    status: 'In Progress',
    owner: 'Founder',
    deadline: new Date('2023-12-20'),
    notes: 'Focus on API documentation',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-22')
  },
  {
    id: '2',
    name: 'Fix mobile responsiveness',
    module: 'Frontend UI',
    priority: 'High',
    status: 'Not Started',
    owner: 'Lovable',
    deadline: new Date('2023-12-10'),
    notes: '',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-15')
  }
];

// Mock data for build requests
export const getMockBuildRequests = (): BuildRequest[] => [
  {
    id: '1',
    name: 'Implement PulseScore calculator',
    context: 'Create a calculator that visualizes scores based on survey responses',
    module: 'PulseScore Engine',
    deadline: new Date('2023-12-15'),
    notes: 'High priority - needed for demo',
    lane: 'CURRENT SPRINT',
    createdAt: new Date('2023-11-28')
  },
  {
    id: '2',
    name: 'Add theme sentiment analysis',
    context: 'Build a component that analyzes sentiment by theme',
    module: 'AI Summary',
    deadline: null,
    notes: '',
    lane: 'BACKLOG',
    createdAt: new Date('2023-11-25')
  }
];

// Mock data for debug logs
export const getMockDebugLogs = (): DebugLog[] => [
  {
    id: '1',
    dateLogged: new Date('2023-12-01'),
    component: 'PulseScore Engine',
    description: 'Calculation error in theme score aggregation',
    severity: 'Critical',
    status: 'Open',
    loggedBy: 'Dev Team'
  },
  {
    id: '2',
    dateLogged: new Date('2023-11-29'),
    component: 'Dashboard',
    description: 'Chart rendering issue with large datasets',
    severity: 'Major',
    status: 'In Progress',
    fixLink: 'https://github.com/fix-branch',
    loggedBy: 'QA Team'
  }
];
