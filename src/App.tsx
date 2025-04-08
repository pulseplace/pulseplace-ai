import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MetaTags from 'react-meta-tags';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/Home';
import DashboardReports from './pages/dashboard/Reports';
import DashboardTrends from './pages/dashboard/Trends';
import DashboardTeams from './pages/dashboard/Teams';
import DashboardFeedback from './pages/dashboard/Feedback';
import DashboardSurveys from './pages/dashboard/Surveys';
import DashboardSettings from './pages/dashboard/Settings';
import DashboardProfile from './pages/dashboard/Profile';
import NewSurvey from './pages/dashboard/NewSurvey';
import EditSurvey from './pages/dashboard/EditSurvey';
import ShareCertification from './pages/dashboard/ShareCertification';
import EmailTemplates from './pages/dashboard/EmailTemplates';
import CertificationEngine from './pages/dashboard/CertificationEngine';
import Home from './pages/Home';
import JoinBeta from './pages/JoinBeta';
import Methodology from './pages/Methodology';
import Pricing from './pages/Pricing';
import Showcase from './pages/Showcase';
import AIengine from './pages/AIengine';
import DashboardPreview from './pages/DashboardPreview';
import NotFound from './pages/NotFound';
import StickyCta from './components/StickyCta';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <DashboardProvider>
            <ThemeProvider>
              <TaskProvider>
                <MetaTags>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </MetaTags>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/join-beta" element={<JoinBeta />} />
                  <Route path="/methodology" element={<Methodology />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/showcase" element={<Showcase />} />
                  <Route path="/ai-engine" element={<AIengine />} />
                  <Route path="/dashboard-preview" element={<DashboardPreview />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="reports" element={<DashboardReports />} />
                    <Route path="trends" element={<DashboardTrends />} />
                    <Route path="teams" element={<DashboardTeams />} />
                    <Route path="feedback" element={<DashboardFeedback />} />
                    <Route path="surveys" element={<DashboardSurveys />} />
                    <Route path="surveys/new" element={<NewSurvey />} />
                    <Route path="surveys/:id/edit" element={<EditSurvey />} />
                    <Route path="settings" element={<DashboardSettings />} />
                    <Route path="profile" element={<DashboardProfile />} />
                    <Route path="share-certification" element={<ShareCertification />} />
                    <Route path="email-templates" element={<EmailTemplates />} />
                    <Route path="certification-engine" element={<CertificationEngine />} />
                  </Route>
                  
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
