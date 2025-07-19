
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
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
// New task tracker imports
import TaskTracker from '@/pages/task-tracker/TaskTracker';
import DebugLog from '@/pages/task-tracker/DebugLog';
import BuildFlow from '@/pages/task-tracker/BuildFlow';
// New page imports
import HowItWorks from '@/pages/HowItWorks';
import Certification from '@/pages/Certification';
import Features from '@/pages/Features';
import Contact from '@/pages/Contact';
import AboutUs from '@/pages/AboutUs';
import Methodology from '@/pages/Methodology';
import Pricing from '@/pages/Pricing';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import TaskAudit from '@/pages/TaskAudit';
import ProjectHandover from '@/pages/ProjectHandover';
import RoiCalculator from '@/pages/RoiCalculator';
import Demo from '@/pages/Demo';
import JoinBeta from '@/pages/JoinBeta';
import Resources from '@/pages/Resources';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/how-it-works',
    element: <HowItWorks />
  },
  {
    path: '/certification',
    element: <Certification />
  },
  {
    path: '/features',
    element: <Features />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/about-us',
    element: <AboutUs />
  },
  {
    path: '/methodology',
    element: <Methodology />
  },
  {
    path: '/pricing',
    element: <Pricing />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />
  },
  {
    path: '/terms-of-service',
    element: <TermsOfService />
  },
  {
    path: '/task-audit',
    element: <TaskAudit />
  },
  {
    path: '/project-handover',
    element: <ProjectHandover />
  },
  {
    path: '/roi-calculator',
    element: <RoiCalculator />
  },
  {
    path: '/demo',
    element: <Demo />
  },
  {
    path: '/join-beta',
    element: <JoinBeta />
  },
  {
    path: '/resources',
    element: <Resources />
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
  // New routes for task tracker
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
  // 404 catch-all route - must be last
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
