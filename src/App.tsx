
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';
import Dashboard from './pages/Dashboard';
import PulseBotPage from './pages/PulseBot';
import NotFound from './pages/NotFound';
import AiDashboard from './pages/dashboard/AiDashboard';
import LLMInsights from './pages/dashboard/LLMInsights';
import Root from './pages/Root';

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
          
          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
