
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import ProtectedRoute from './components/ProtectedRoute';
import InvestorDeck from './pages/InvestorDeck';
import Root from './pages/Root';
import ProfileSettings from './pages/dashboard/ProfileSettings';
import TaskSummary from './pages/TaskSummary';
import TaskAudit from './pages/TaskAudit';
import ChatbotWidget from './components/ChatbotWidget';

// Import the new pages
import PitchDeckRequest from './pages/PitchDeckRequest';
import PitchDeckView from './pages/PitchDeckView';
import PitchDeckAdmin from './pages/dashboard/PitchDeckAdmin';
import LinkValidation from './pages/dashboard/LinkValidation';
import BookDemo from './pages/BookDemo';
import Demo from './pages/Demo';
import Features from './pages/Features';
import Certification from './pages/Certification';
import Contact from './pages/Contact';
import PulseBot from './pages/PulseBot';
import JoinBeta from './pages/JoinBeta';
import DashboardPreview from './pages/DashboardPreview';
import HowItWorks from './pages/HowItWorks';
import Insights from './pages/Insights';

// Dashboard layout
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Routes>
          <Route element={<Root />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/investor-deck" element={<InvestorDeck />} />
            
            {/* Features and main routes */}
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pulsebot" element={<PulseBot />} />
            <Route path="/join-beta" element={<JoinBeta />} />
            <Route path="/dashboard-preview" element={<DashboardPreview />} />
            
            {/* Add new routes for pitch deck */}
            <Route path="/pitch-deck-request" element={<PitchDeckRequest />} />
            <Route path="/pitch-deck-view" element={<PitchDeckView />} />
            
            {/* Demo routes */}
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/demo" element={<Demo />} />
            
            {/* Task routes */}
            <Route path="/task-summary" element={<TaskSummary />} />
            <Route path="/task-admin" element={<TaskAudit />} />
          </Route>
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            
            {/* Add new protected route for pitch deck admin */}
            <Route path="pitch-deck-admin" element={<PitchDeckAdmin />} />
            
            {/* Add new protected route for link validation dashboard */}
            <Route path="link-validation" element={<LinkValidation />} />
          </Route>
          
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        
        {/* Add the ChatbotWidget here so it appears on all pages */}
        <ChatbotWidget />
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
