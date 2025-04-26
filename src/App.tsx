
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { TaskProvider } from './contexts/TaskContext';
import { BuildRequestsProvider } from './contexts/BuildRequestsContext';

// Main public pages
import LandingPage from './pages/LandingPage';
import PulseScoreLite from './pages/PulseScoreLite';
import PulseScoreThankYou from './pages/PulseScoreThankYou';
import BookDemo from './pages/BookDemo';

// Auth
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// Dashboard and related pages
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import TeamDashboard from './pages/TeamDashboard';
import Insights from './pages/Insights';
import PulseBot from './pages/PulseBot';
import AiDashboard from './pages/dashboard/AiDashboard';

// Certification related
import CertificationEngine from './pages/dashboard/CertificationEngine';
import ShareCertification from './pages/certification/ShareCertification';

// Utility components
import PulseBotWidget from './components/chat/PulseBotWidget';
import NotFound from './pages/NotFound';

// Case studies
import TayanaStudy from './pages/case-studies/TayanaStudy';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <BuildRequestsProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/pulse-score-lite" element={<PulseScoreLite />} />
              <Route path="/pulse-score-lite/thank-you" element={<PulseScoreThankYou />} />
              <Route path="/book-demo" element={<BookDemo />} />
              <Route path="/case-studies/tayana" element={<TayanaStudy />} />

              {/* Auth Routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>

              {/* Dashboard Routes - Consolidated under one layout */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="teams/:teamId?" element={<TeamDashboard />} />
                <Route path="insights" element={<Insights />} />
                <Route path="pulsebot" element={<PulseBot />} />
                <Route path="ai" element={<AiDashboard />} />
                <Route path="certification" element={<CertificationEngine />} />
                <Route path="certification/share" element={<ShareCertification />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <PulseBotWidget />
            <Toaster />
          </BuildRequestsProvider>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
