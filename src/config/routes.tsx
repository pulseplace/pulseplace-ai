
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import TaskSummary from '@/pages/TaskSummary';
import Insights from '@/pages/Insights';
import PulseBot from '@/pages/PulseBot';
import PulseScoreAdmin from '@/pages/dashboard/PulseScoreAdmin';
import CertificationEngine from '@/pages/dashboard/CertificationEngine';
import ShareCertification from '@/pages/certification/ShareCertification';
import AiDashboard from '@/pages/dashboard/AiDashboard';
import LLMInsights from '@/pages/dashboard/LLMInsights';
import BookDemo from '@/pages/BookDemo';
import TayanaStudy from '@/pages/case-studies/TayanaStudy';
import PulseScoreLite from '@/pages/PulseScoreLite';
// New task tracker imports
import TaskTracker from '@/pages/task-tracker/TaskTracker';
import DebugLog from '@/pages/task-tracker/DebugLog';
import BuildFlow from '@/pages/task-tracker/BuildFlow';
// New integrations import
import Integrations from '@/pages/features/Integrations';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/task-summary',
    element: <TaskSummary />
  },
  {
    path: '/insights',
    element: <Insights />
  },
  {
    path: '/pulsebot',
    element: <PulseBot />
  },
  {
    path: '/dashboard/pulse-score-admin',
    element: <PulseScoreAdmin />
  },
  {
    path: '/dashboard/certification-engine',
    element: <CertificationEngine />
  },
  {
    path: '/certification/share',
    element: <ShareCertification />
  },
  {
    path: '/ai-dashboard',
    element: <AiDashboard />
  },
  {
    path: '/dashboard/llm-insights',
    element: <LLMInsights />
  },
  {
    path: '/book-demo',
    element: <BookDemo />
  },
  {
    path: '/case-studies/tayana',
    element: <TayanaStudy />
  },
  {
    path: '/pulse-score-lite',
    element: <PulseScoreLite />
  },
  // Task tracker routes
  {
    path: '/task-tracker',
    element: <TaskTracker />
  },
  {
    path: '/debug-log',
    element: <DebugLog />
  },
  {
    path: '/build-flow',
    element: <BuildFlow />
  },
  // Integrations route
  {
    path: '/integrations',
    element: <Integrations />
  }
];

export default routes;
