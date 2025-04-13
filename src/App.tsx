
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';
import Dashboard from './pages/Dashboard';
import PulseBotPage from './pages/PulseBot';
import NotFound from './pages/NotFound';
import AiDashboard from './pages/dashboard/AiDashboard';
import LLMInsights from './pages/dashboard/LLMInsights';
import Root from './pages/Root';
import Insights from './pages/Insights';

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          {/* Public routes */}
          <Route index element={<Dashboard />} />
          
          {/* AI Features */}
          <Route path="pulsebot" element={<PulseBotPage />} />
          <Route path="ai-dashboard" element={<AiDashboard />} />
          <Route path="dashboard/llm-insights" element={<LLMInsights />} />
          <Route path="insights" element={<Insights />} />
          
          {/* Add any other routes that were previously available */}
          <Route path="certification" element={<Dashboard />} /> {/* Placeholder until we restore the real component */}
          <Route path="how-it-works" element={<Dashboard />} /> {/* Placeholder until we restore the real component */}
          <Route path="features" element={<Dashboard />} /> {/* Placeholder until we restore the real component */}
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
