
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
import JoinBeta from "./pages/JoinBeta";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Demo from "./pages/Demo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Pricing from "./pages/Pricing";
import ROICalculator from "./pages/ROICalculator";
import DashboardPreview from "./pages/DashboardPreview";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Animation wrapper for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/dashboard-preview" element={<DashboardPreview />} />
          <Route path="/join-beta" element={<JoinBeta />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
