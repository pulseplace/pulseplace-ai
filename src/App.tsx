
import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner';
import './App.css';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import Root from './pages/Root';
import BrandSystem from './pages/BrandSystem';
import JoinBetaPage from './pages/JoinBeta';
import BadgeDemo from './pages/BadgeDemo';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BadgeCustomization = lazy(() => import('./pages/dashboard/BadgeCustomization'));
const DashboardQA = lazy(() => import('./pages/dashboard/DashboardQA'));
const ShareCertification = lazy(() => import('./pages/dashboard/ShareCertification'));
const ExportCertification = lazy(() => import('./pages/dashboard/ExportCertification'));
const Assessments = lazy(() => import('./pages/Assessments'));
const Community = lazy(() => import('./pages/Community'));
const Resources = lazy(() => import('./pages/Resources'));
const Settings = lazy(() => import('./pages/Settings'));
const Auth = lazy(() => import('./pages/Auth'));
const PulseBot = lazy(() => import('./pages/PulseBot'));
const PulseBotAnalytics = lazy(() => import('./pages/PulseBotAnalytics'));
const MailchimpEvents = lazy(() => import('./pages/dashboard/MailchimpEvents'));
const CertificationEngine = lazy(() => import('./pages/dashboard/CertificationEngine'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Certification = lazy(() => import('./pages/Certification'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Insights = lazy(() => import('./pages/Insights'));
const Contact = lazy(() => import('./pages/Contact'));
const Features = lazy(() => import('./pages/Features'));
const DashboardPreview = lazy(() => import('./pages/DashboardPreview'));
const BookDemo = lazy(() => import('./pages/BookDemo'));
// Fix file casing to match actual file names
const AIEngine = lazy(() => import('./pages/AIEngine')); // Changed from AiEngine to AIEngine
const ROICalculator = lazy(() => import('./pages/ROICalculator')); // Changed from RoiCalculator to ROICalculator
const Methodology = lazy(() => import('./pages/Methodology'));
const Pricing = lazy(() => import('./pages/Pricing'));
const TaskAdmin = lazy(() => import('./pages/TaskAdmin'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><Home /></Suspense>,
      },
      {
        path: "dashboard",
        element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
      },
      {
        path: "dashboard/share-certification",
        element: <Suspense fallback={<Loading />}><ShareCertification /></Suspense>,
      },
      {
        path: "dashboard/badge-customization",
        element: <Suspense fallback={<Loading />}><BadgeCustomization /></Suspense>,
      },
      {
        path: "dashboard/export-certification",
        element: <Suspense fallback={<Loading />}><ExportCertification /></Suspense>,
      },
      {
        path: "dashboard/certification-engine",
        element: <Suspense fallback={<Loading />}><CertificationEngine /></Suspense>,
      },
      {
        path: "dashboard/qa",
        element: <Suspense fallback={<Loading />}><DashboardQA /></Suspense>,
      },
      {
        path: "dashboard/mailchimp-events",
        element: <Suspense fallback={<Loading />}><MailchimpEvents /></Suspense>,
      },
      {
        path: "badge-demo",
        element: <BadgeDemo />,
      },
      {
        path: "assessments",
        element: <Suspense fallback={<Loading />}><Assessments /></Suspense>,
      },
      {
        path: "community",
        element: <Suspense fallback={<Loading />}><Community /></Suspense>,
      },
      {
        path: "resources",
        element: <Suspense fallback={<Loading />}><Resources /></Suspense>,
      },
      {
        path: "settings",
        element: <Suspense fallback={<Loading />}><Settings /></Suspense>,
      },
      {
        path: "auth",
        element: <Suspense fallback={<Loading />}><Auth /></Suspense>,
      },
      {
        path: "pulsebot",
        element: <Suspense fallback={<Loading />}><PulseBot /></Suspense>,
      },
      {
        path: "pulsebot-analytics",
        element: <Suspense fallback={<Loading />}><PulseBotAnalytics /></Suspense>,
      },
      {
        path: "brand-system",
        element: <BrandSystem />,
      },
      {
        path: "join-beta",
        element: <JoinBetaPage />,
      },
      {
        path: "about-us",
        element: <Suspense fallback={<Loading />}><AboutUs /></Suspense>,
      },
      {
        path: "certification",
        element: <Suspense fallback={<Loading />}><Certification /></Suspense>,
      },
      {
        path: "terms-of-service",
        element: <Suspense fallback={<Loading />}><TermsOfService /></Suspense>,
      },
      {
        path: "privacy-policy",
        element: <Suspense fallback={<Loading />}><PrivacyPolicy /></Suspense>,
      },
      {
        path: "how-it-works",
        element: <Suspense fallback={<Loading />}><HowItWorks /></Suspense>,
      },
      {
        path: "insights",
        element: <Suspense fallback={<Loading />}><Insights /></Suspense>,
      },
      {
        path: "contact",
        element: <Suspense fallback={<Loading />}><Contact /></Suspense>,
      },
      {
        path: "features",
        element: <Suspense fallback={<Loading />}><Features /></Suspense>,
      },
      {
        path: "dashboard-preview",
        element: <Suspense fallback={<Loading />}><DashboardPreview /></Suspense>,
      },
      {
        path: "book-demo",
        element: <Suspense fallback={<Loading />}><BookDemo /></Suspense>,
      },
      {
        path: "ai-engine",
        element: <Suspense fallback={<Loading />}><AiEngine /></Suspense>,
      },
      {
        path: "roi-calculator",
        element: <Suspense fallback={<Loading />}><RoiCalculator /></Suspense>,
      },
      {
        path: "methodology",
        element: <Suspense fallback={<Loading />}><Methodology /></Suspense>,
      },
      {
        path: "pricing",
        element: <Suspense fallback={<Loading />}><Pricing /></Suspense>,
      },
      {
        path: "task-admin",
        element: <Suspense fallback={<Loading />}><TaskAdmin /></Suspense>,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}
