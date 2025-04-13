
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Toaster } from './components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';

// Pages imports
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import TaskSummary from './pages/TaskSummary';
import SignIn from './pages/auth/SignIn';
import ResetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import Team from './pages/Team';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import EmailVerification from './pages/auth/EmailVerification';
import VerifySuccess from './pages/auth/VerifySuccess';
import AiEngine from './pages/features/AiEngine';
import ProjectHandover from './pages/ProjectHandover';
import LLMInsights from './pages/dashboard/LLMInsights';
import PulseBotPage from './pages/PulseBot';

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="features/ai-engine" element={<AiEngine />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="team" element={<Team />} />
          
          {/* Admin/Project tasks routes */}
          <Route path="task-summary" element={<TaskSummary />} />
          <Route path="project-handover" element={<ProjectHandover />} />
          
          {/* Dashboard routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/llm-insights" element={<LLMInsights />} />
          
          {/* AI Features */}
          <Route path="pulsebot" element={<PulseBotPage />} />
          
          {/* Authentication routes */}
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-email" element={<EmailVerification />} />
          <Route path="verify-success" element={<VerifySuccess />} />
          
          {/* Legal routes */}
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          
          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
