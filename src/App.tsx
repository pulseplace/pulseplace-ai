import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProfileSettings from './pages/dashboard/ProfileSettings';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PulseSurveyList from './pages/dashboard/PulseSurveyList';
import PulseSurveyCreate from './pages/dashboard/PulseSurveyCreate';
import PulseSurveyEdit from './pages/dashboard/PulseSurveyEdit';
import InvestorDeck from './pages/InvestorDeck';

// Import the new pages
import PitchDeckRequest from './pages/PitchDeckRequest';
import PitchDeckView from './pages/PitchDeckView';
import PitchDeckAdmin from './pages/dashboard/PitchDeckAdmin';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/investor-deck" element={<InvestorDeck />} />
        
        {/* Add new routes for pitch deck */}
        <Route path="/pitch-deck-request" element={<PitchDeckRequest />} />
        <Route path="/pitch-deck-view" element={<PitchDeckView />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProfileSettings />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="pulse-surveys" element={<PulseSurveyList />} />
          <Route path="pulse-surveys/create" element={<PulseSurveyCreate />} />
          <Route path="pulse-surveys/edit/:surveyId" element={<PulseSurveyEdit />} />
          
          {/* Add new protected route for pitch deck admin */}
          <Route path="pitch-deck-admin" element={<PitchDeckAdmin />} />
        </Route>
        
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
