
import React, { Suspense, lazy } from 'react';
import {
  Routes,
  Route,
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
// Fix casing issues in imports
const AiEngine = lazy(() => import('./pages/AiEngine')); 
const RoiCalculator = lazy(() => import('./pages/RoiCalculator'));
const Methodology = lazy(() => import('./pages/Methodology'));
const Pricing = lazy(() => import('./pages/Pricing'));
const TaskAdmin = lazy(() => import('./pages/TaskAdmin'));
const Demo = lazy(() => import('./pages/Demo'));

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
          <Route path="dashboard" element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
          <Route path="dashboard/share-certification" element={<Suspense fallback={<Loading />}><ShareCertification /></Suspense>} />
          <Route path="dashboard/badge-customization" element={<Suspense fallback={<Loading />}><BadgeCustomization /></Suspense>} />
          <Route path="dashboard/export-certification" element={<Suspense fallback={<Loading />}><ExportCertification /></Suspense>} />
          <Route path="dashboard/certification-engine" element={<Suspense fallback={<Loading />}><CertificationEngine /></Suspense>} />
          <Route path="dashboard/qa" element={<Suspense fallback={<Loading />}><DashboardQA /></Suspense>} />
          <Route path="dashboard/mailchimp-events" element={<Suspense fallback={<Loading />}><MailchimpEvents /></Suspense>} />
          <Route path="badge-demo" element={<BadgeDemo />} />
          <Route path="assessments" element={<Suspense fallback={<Loading />}><Assessments /></Suspense>} />
          <Route path="community" element={<Suspense fallback={<Loading />}><Community /></Suspense>} />
          <Route path="resources" element={<Suspense fallback={<Loading />}><Resources /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<Loading />}><Settings /></Suspense>} />
          <Route path="auth" element={<Suspense fallback={<Loading />}><Auth /></Suspense>} />
          <Route path="pulsebot" element={<Suspense fallback={<Loading />}><PulseBot /></Suspense>} />
          <Route path="pulsebot-analytics" element={<Suspense fallback={<Loading />}><PulseBotAnalytics /></Suspense>} />
          <Route path="brand-system" element={<BrandSystem />} />
          <Route path="join-beta" element={<JoinBetaPage />} />
          <Route path="about-us" element={<Suspense fallback={<Loading />}><AboutUs /></Suspense>} />
          <Route path="certification" element={<Suspense fallback={<Loading />}><Certification /></Suspense>} />
          <Route path="terms-of-service" element={<Suspense fallback={<Loading />}><TermsOfService /></Suspense>} />
          <Route path="privacy-policy" element={<Suspense fallback={<Loading />}><PrivacyPolicy /></Suspense>} />
          <Route path="how-it-works" element={<Suspense fallback={<Loading />}><HowItWorks /></Suspense>} />
          <Route path="insights" element={<Suspense fallback={<Loading />}><Insights /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<Loading />}><Contact /></Suspense>} />
          <Route path="features" element={<Suspense fallback={<Loading />}><Features /></Suspense>} />
          <Route path="dashboard-preview" element={<Suspense fallback={<Loading />}><DashboardPreview /></Suspense>} />
          <Route path="book-demo" element={<Suspense fallback={<Loading />}><BookDemo /></Suspense>} />
          <Route path="ai-engine" element={<Suspense fallback={<Loading />}><AiEngine /></Suspense>} />
          <Route path="roi-calculator" element={<Suspense fallback={<Loading />}><RoiCalculator /></Suspense>} />
          <Route path="methodology" element={<Suspense fallback={<Loading />}><Methodology /></Suspense>} />
          <Route path="pricing" element={<Suspense fallback={<Loading />}><Pricing /></Suspense>} />
          <Route path="task-admin" element={<Suspense fallback={<Loading />}><TaskAdmin /></Suspense>} />
          <Route path="demo" element={<Suspense fallback={<Loading />}><Demo /></Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}
