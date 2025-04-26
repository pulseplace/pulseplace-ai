
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from './pages/LandingPage';
import PulseBot from './pages/PulseBot';
import PulseScoreLite from './pages/PulseScoreLite';
import PulseScoreThankYou from './pages/PulseScoreThankYou';
import TeamDashboard from './pages/TeamDashboard';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import PulseBotWidget from './components/chat/PulseBotWidget';
import NotFound from './pages/NotFound';
import CertificationEngine from './pages/dashboard/CertificationEngine';
import DebugLog from './pages/task-tracker/DebugLog';
import TayanaStudy from './pages/case-studies/TayanaStudy';
import BuildFlow from './pages/task-tracker/BuildFlow';
import TaskTracker from './pages/task-tracker/TaskTracker';
import Integrations from './pages/features/Integrations';
import Root from './pages/Root';
import Dashboard from './pages/Dashboard';
import PulseScoreAdmin from './pages/dashboard/PulseScoreAdmin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<LandingPage />} />
            <Route path="/pulse-score-lite" element={<PulseScoreLite />} />
            <Route path="/pulse-score-lite/thank-you" element={<PulseScoreThankYou />} />
            <Route path="/teams" element={<TeamDashboard />} />
            <Route path="/pulsebot" element={<PulseBot />} />
            <Route path="/certification-engine" element={<CertificationEngine />} />
            <Route path="/debug-log" element={<DebugLog />} />
            <Route path="/case-studies/tayana" element={<TayanaStudy />} />
            <Route path="/task-tracker" element={<TaskTracker />} />
            <Route path="/build-flow" element={<BuildFlow />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/dashboard">
              <Route path="pulse-score-admin" element={<PulseScoreAdmin />} />
            </Route>
          </Route>
          
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PulseBotWidget />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
