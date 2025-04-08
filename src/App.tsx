
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { TaskProvider } from '@/contexts/TaskContext';
import LoadingState from '@/components/dashboard/admin/components/LoadingState';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Layout
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));

// Public Pages
const Home = lazy(() => import('@/pages/Home'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Demo = lazy(() => import('@/pages/Demo'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const Certification = lazy(() => import('@/pages/Certification'));
const CertificationShowcase = lazy(() => import('@/pages/CertificationShowcase'));
const JoinBeta = lazy(() => import('@/pages/JoinBeta'));
const DashboardPreview = lazy(() => import('@/pages/DashboardPreview'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const Auth = lazy(() => import('@/pages/Auth'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Methodology = lazy(() => import('@/pages/Methodology'));
const ROICalculator = lazy(() => import('@/pages/ROICalculator'));
const AIWorkflow = lazy(() => import('@/pages/AIWorkflow'));
const AIEngine = lazy(() => import('@/pages/AIEngine'));

// Dashboard Pages
const DashboardHome = lazy(() => import('@/pages/dashboard/Home'));
const Surveys = lazy(() => import('@/pages/dashboard/Surveys'));
const ShareCertification = lazy(() => import('@/pages/dashboard/ShareCertification'));
const ScoringLogic = lazy(() => import('@/pages/dashboard/ScoringLogic'));
const ProfileSettings = lazy(() => import('@/pages/dashboard/ProfileSettings'));
const CertificationEngine = lazy(() => import('@/pages/dashboard/CertificationEngine'));
const EmailTemplates = lazy(() => import('@/pages/dashboard/EmailTemplates'));
const TeamAdmin = lazy(() => import('@/pages/dashboard/TeamAdmin'));
const BulkTeamUpload = lazy(() => import('@/pages/dashboard/BulkTeamUpload'));
const LLMInsights = lazy(() => import('@/pages/dashboard/LLMInsights'));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <DashboardProvider>
            <TaskProvider>
              <Suspense fallback={<LoadingState />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/certification" element={<Certification />} />
                  <Route path="/certified-companies" element={<CertificationShowcase />} />
                  <Route path="/showcase" element={<CertificationShowcase />} />
                  <Route path="/about-us" element={<Navigate to="/about" replace />} />
                  <Route path="/join-beta" element={<JoinBeta />} />
                  <Route path="/preview-dashboard" element={<DashboardPreview />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/methodology" element={<Methodology />} />
                  <Route path="/roi-calculator" element={<ROICalculator />} />
                  <Route path="/ai-workflow" element={<AIWorkflow />} />
                  <Route path="/ai-engine" element={<AIEngine />} />
                  
                  {/* Dashboard Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<DashboardHome />} />
                    <Route path="surveys" element={<Surveys />} />
                    <Route path="surveys/:surveyId" element={<Surveys />} />
                    <Route path="surveys/new" element={<Surveys />} />
                    <Route path="share" element={<ShareCertification />} />
                    <Route path="scoring" element={<ScoringLogic />} />
                    <Route path="certification-engine" element={<CertificationEngine />} />
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="email-templates" element={<EmailTemplates />} />
                    <Route path="team-admin" element={<TeamAdmin />} />
                    <Route path="bulk-upload" element={<BulkTeamUpload />} />
                    <Route path="llm-insights" element={<LLMInsights />} />
                    
                    {/* Add fallback route for dashboard to prevent 404s within dashboard */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Route>
                  
                  {/* 404 - Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster position="top-right" />
            </TaskProvider>
          </DashboardProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
