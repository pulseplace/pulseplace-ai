
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
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import MetaTags from "./components/MetaTags";
import StickyCta from "./components/StickyCta";
import ScoringLogic from '@/pages/dashboard/ScoringLogic';
import EmailTemplates from '@/pages/dashboard/EmailTemplates';
import CertificationSharing from "@/components/certification/CertificationSharing";

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
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="surveys/new" element={<Surveys />} />
            <Route path="surveys/:surveyId" element={<Surveys />} />
            <Route path="scoring-logic" element={<ScoringLogic />} />
            <Route path="email-templates" element={<EmailTemplates />} />
            <Route path="certification-engine" element={<CertificationEngine />} />
            <Route path="share-certification" element={<ShareCertificationPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!hideStickyCta && <StickyCta />}
      </motion.div>
    </AnimatePresence>
  );
};

// Simple standalone page for certification sharing
const ShareCertificationPage = () => {
  // Demo data for certification badge
  const certificationData = {
    companyName: 'Acme Corporation',
    tier: 'pulse_certified' as const,
    score: 88,
    issueDate: 'April 7, 2025',
    validUntil: 'April 7, 2026'
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Share Your Certification</h1>
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Congratulations on achieving your PulseScore™ Certification! Use the tools below to share your achievement with stakeholders and promote your commitment to workplace well-being.
        </p>
      </div>
      <CertificationSharing
        companyName={certificationData.companyName}
        tier={certificationData.tier}
        score={certificationData.score}
        issueDate={certificationData.issueDate}
        validUntil={certificationData.validUntil}
      />
    </div>
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
