
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
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

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/ai-engine" element={<AIEngine />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="/join-beta" element={<JoinBeta />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
