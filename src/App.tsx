
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { StrictMode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Methodology from "./pages/Methodology";
import AIEngine from "./pages/AIEngine";
import Certification from "./pages/Certification";
import CertificationShowcase from "./pages/CertificationShowcase";
import JoinBeta from "./pages/JoinBeta";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Demo from "./pages/Demo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Pricing from "./pages/Pricing";
import ROICalculator from "./pages/ROICalculator";
import DashboardPreview from "./pages/DashboardPreview";
import Auth from "./pages/Auth";
import DashboardHome from "./pages/dashboard/Home";
import Surveys from "./pages/dashboard/Surveys";
import CertificationEngine from "./pages/dashboard/CertificationEngine";
import { AuthProvider } from "./contexts/AuthContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import MetaTags from "./components/MetaTags";
import StickyCta from "./components/StickyCta";
import ScoringLogic from '@/pages/dashboard/ScoringLogic';
import EmailTemplates from '@/pages/dashboard/EmailTemplates';
import ShareCertification from '@/pages/dashboard/ShareCertification';
import ProfileSettings from '@/pages/dashboard/ProfileSettings';

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  const hideStickyCta = location.pathname.includes('/auth') || location.pathname.includes('/dashboard');
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/ai-engine" element={<AIEngine />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/showcase" element={<CertificationShowcase />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/dashboard-preview" element={<DashboardPreview />} />
          <Route path="/join-beta" element={<JoinBeta />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardProvider>
                <DashboardLayout />
              </DashboardProvider>
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="surveys/new" element={<Surveys />} />
            <Route path="surveys/:surveyId" element={<Surveys />} />
            <Route path="scoring-logic" element={<ScoringLogic />} />
            <Route path="email-templates" element={<EmailTemplates />} />
            <Route path="certification-engine" element={<CertificationEngine />} />
            <Route path="share-certification" element={<ShareCertification />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!hideStickyCta && <StickyCta />}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <MetaTags />
              <Toaster />
              <Sonner />
              <AnimatedRoutes />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
