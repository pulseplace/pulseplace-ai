
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import PulseBotPage from './pages/PulseBot';
import TaskTrackerPage from './pages/dashboard/TaskTracker';
import LLMInsights from './pages/dashboard/LLMInsights';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ChatbotWidget from './components/ChatbotWidget';
import NotFound from './pages/NotFound';
import RouteValidator from './pages/dashboard/RouteValidator';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
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
              <Route path="pulsebot" element={<PulseBotPage />} />
              <Route path="tasktracker" element={<TaskTrackerPage />} />
              <Route path="llminsights" element={<LLMInsights />} />
              <Route path="routes" element={<RouteValidator />} />
            </Route>

            {/* 404 Route - This must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
        </Router>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
