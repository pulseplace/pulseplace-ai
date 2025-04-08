
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Helmet } from 'react-helmet';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/Home';
import DashboardSurveys from './pages/dashboard/Surveys';
import ShareCertification from './pages/dashboard/ShareCertification';
import EmailTemplates from './pages/dashboard/EmailTemplates';
import CertificationEngine from './pages/dashboard/CertificationEngine';
import JoinBeta from './pages/JoinBeta';
import Methodology from './pages/Methodology';
import Pricing from './pages/Pricing';
import AIEngine from './pages/AIEngine';
import AboutUs from './pages/AboutUs';
import Certification from './pages/Certification';
import CertificationShowcase from './pages/CertificationShowcase';
import AIWorkflow from './pages/AIWorkflow';
import NotFound from './pages/NotFound';
import StickyCta from './components/StickyCta';
import { TaskProvider } from './contexts/TaskContext';
import MetaTags from './components/MetaTags';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <DashboardProvider>
            <ThemeProvider>
              <TaskProvider>
                <Helmet>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Helmet>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/join-beta" element={<JoinBeta />} />
                  <Route path="/methodology" element={<Methodology />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/ai-engine" element={<AIEngine />} />
                  <Route path="/how-ai-works" element={<AIWorkflow />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/certification" element={<Certification />} />
                  <Route path="/showcase" element={<CertificationShowcase />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="surveys" element={<DashboardSurveys />} />
                    <Route path="share-certification" element={<ShareCertification />} />
                    <Route path="email-templates" element={<EmailTemplates />} />
                    <Route path="certification-engine" element={<CertificationEngine />} />
                  </Route>
                  
                  {/* Home page route - redirect to join-beta for now */}
                  <Route path="/" element={<Navigate to="/join-beta" replace />} />
                  
                  {/* Not Found Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <StickyCta />
              </TaskProvider>
            </ThemeProvider>
          </DashboardProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
