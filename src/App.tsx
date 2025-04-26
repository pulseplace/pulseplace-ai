
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import PulseBotPage from './pages/PulseBot';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ChatbotWidget from './components/ChatbotWidget';
import NotFound from './pages/NotFound';
import TeamDashboard from './pages/dashboard/TeamDashboard';
import CertificationReport from './pages/dashboard/CertificationReport';
import AdminView from './pages/dashboard/AdminView';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="teams" element={<TeamDashboard />} />
            <Route path="certification" element={<CertificationReport />} />
            <Route path="admin" element={<AdminView />} />
          </Route>

          {/* PulseBot standalone route */}
          <Route path="/pulsebot" element={<PulseBotPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotWidget />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
