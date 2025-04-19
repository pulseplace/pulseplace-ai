
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import TaskSummary from '@/pages/TaskSummary';
import Insights from '@/pages/Insights';
import PulseBot from '@/pages/PulseBot';
import PulseScoreAdmin from '@/pages/dashboard/PulseScoreAdmin';
import CertificationEngine from '@/pages/dashboard/CertificationEngine';
import AiDashboard from '@/pages/dashboard/AiDashboard';
import LLMInsights from '@/pages/dashboard/LLMInsights';
import BookDemo from '@/pages/BookDemo';

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
  }
];

export default routes;
