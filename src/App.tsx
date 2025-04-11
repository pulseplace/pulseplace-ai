
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import InvestorDeck from './pages/InvestorDeck';
import Root from './pages/Root';
import ProfileSettings from './pages/dashboard/ProfileSettings';

// Import the new pages
import PitchDeckRequest from './pages/PitchDeckRequest';
import PitchDeckView from './pages/PitchDeckView';
import PitchDeckAdmin from './pages/dashboard/PitchDeckAdmin';

// Dashboard layout
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/investor-deck" element={<InvestorDeck />} />
          
          {/* Add new routes for pitch deck */}
          <Route path="/pitch-deck-request" element={<PitchDeckRequest />} />
          <Route path="/pitch-deck-view" element={<PitchDeckView />} />
        </Route>
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProfileSettings />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          
          {/* Add new protected route for pitch deck admin */}
          <Route path="pitch-deck-admin" element={<PitchDeckAdmin />} />
        </Route>
        
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
