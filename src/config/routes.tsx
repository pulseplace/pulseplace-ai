import React from 'react';
import { RouteObject } from 'react-router-dom';

// Page imports
import Dashboard from '@/pages/Dashboard';
import DashboardHome from '@/pages/dashboard/Home';
import QASprint from '@/pages/dashboard/QASprint';
import DashboardQA from '@/pages/dashboard/DashboardQA';
import QATestingDashboard from '@/pages/dashboard/QATestingDashboard';
import Insights from '@/pages/Insights';
import PulseBot from '@/pages/PulseBot';
import PulseBotAnalytics from '@/pages/PulseBotAnalytics';
import DemoPrep from '@/pages/DemoPrep';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: {
    INDEX: '/dashboard',
    HOME: '/dashboard/home',
    QA_SPRINT: '/dashboard/qa-sprint',
    QA_TESTING: '/dashboard/qa-testing',
    DASHBOARD_QA: '/dashboard/dashboard-qa'
  },
  INSIGHTS: {
    INDEX: '/insights',
    PULSEBOT: '/insights/pulsebot'
  },
  TEAMS: {
    INDEX: '/teams',
    TEAM: (id: string) => `/teams/${id}`
  },
  PULSEBOT: '/pulsebot',
  PULSEBOT_ANALYTICS: '/pulsebot-analytics',
  QA_BROWSER: '/qa-browser',
  DEMO: {
    RESET: '/demo/reset'
  }
};

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Dashboard />
  },
  {
    path: ROUTES.DASHBOARD.INDEX,
    element: <DashboardHome />
  },
  {
    path: ROUTES.DASHBOARD.HOME,
    element: <DashboardHome />
  },
  {
    path: ROUTES.DASHBOARD.QA_SPRINT,
    element: <QASprint />
  },
  {
    path: ROUTES.DASHBOARD.QA_TESTING,
    element: <QATestingDashboard />
  },
  {
    path: ROUTES.DASHBOARD.DASHBOARD_QA,
    element: <DashboardQA />
  },
  {
    path: ROUTES.INSIGHTS.INDEX,
    element: <Insights />
  },
  {
    path: ROUTES.INSIGHTS.PULSEBOT,
    element: <PulseBotAnalytics />
  },
  {
    path: ROUTES.PULSEBOT,
    element: <PulseBot />
  },
  {
    path: ROUTES.PULSEBOT_ANALYTICS,
    element: <PulseBotAnalytics />
  },
  {
    path: ROUTES.TEAMS.TEAM(':id'),
    element: <Insights />
  },
  {
    path: ROUTES.QA_BROWSER,
    element: <QATestingDashboard />
  },
  {
    path: ROUTES.DEMO.RESET,
    element: <QATestingDashboard />
  },
  {
    path: '/demo-prep',
    element: <DemoPrep />,
    meta: {
      title: 'Demo Preparation'
    }
  }
];

export default routes;
