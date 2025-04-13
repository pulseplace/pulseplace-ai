
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';
import Dashboard from './pages/Dashboard';
import PulseBotPage from './pages/PulseBot';
import NotFound from './pages/NotFound';
import AiDashboard from './pages/dashboard/AiDashboard';
import LLMInsights from './pages/dashboard/LLMInsights';
import LinkValidation from './pages/dashboard/LinkValidation';
import Root from './pages/Root';
import Insights from './pages/Insights';
import TaskAudit from './pages/TaskAudit';
import TaskSummary from './pages/TaskSummary';
import ProjectHandover from './pages/ProjectHandover';
import DashboardHome from './pages/dashboard/Home';
import Home from './pages/Home';
import Features from './pages/Features';
import AIEngine from './pages/features/AIEngine'; // Fixed casing to match the actual file
import QASprint from './pages/dashboard/QASprint';

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Features pages */}
          <Route path="features" element={<Features />} />
          <Route path="features/ai-engine" element={<AIEngine />} />
          
          {/* AI Features */}
          <Route path="pulsebot" element={<PulseBotPage />} />
          <Route path="ai-dashboard" element={<AiDashboard />} />
          <Route path="dashboard/llm-insights" element={<LLMInsights />} />
          <Route path="insights" element={<Insights />} />
          
          {/* Task Management & Project Pages */}
          <Route path="task-audit" element={<TaskAudit />} />
          <Route path="task-summary" element={<TaskSummary />} />
          <Route path="project-handover" element={<ProjectHandover />} />
          
          {/* Dashboard routes */}
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="dashboard/link-validation" element={<LinkValidation />} />
          <Route path="dashboard/qa-sprint" element={<QASprint />} />
          
          {/* Add any other routes that were previously available */}
          <Route path="certification" element={<Dashboard />} /> {/* Placeholder until we restore the real component */}
          <Route path="how-it-works" element={<Dashboard />} /> {/* Placeholder until we restore the real component */}
          <Route path="contact" element={<Dashboard />} /> {/* Placeholder until we restore the real component */}
          
          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
