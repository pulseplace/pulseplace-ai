import React from 'react';
import { Brain, Bot, Cpu, LineChart, Sparkles, Zap } from 'lucide-react';

const AITechnologySection = () => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4">How Our AI Works</h2>
        <p className="text-gray-600 mb-6">
          The PulsePlace AI Engine combines various machine learning models that have been specifically trained on workplace culture data. 
          These models work together to understand, analyze, and provide insights from both structured and unstructured feedback.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Cpu className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium">Natural Language Processing</h3>
              <p className="text-sm text-gray-500">Understands and contextualizes human language from surveys and feedback</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <LineChart className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium">Predictive Analytics</h3>
              <p className="text-sm text-gray-500">Forecasts trends and identifies potential issues before they impact the workplace</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium">Recommendation Engine</h3>
              <p className="text-sm text-gray-500">Suggests actionable steps to improve workplace culture based on data analysis</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Integration Status</h2>
        <p className="text-gray-600 mb-6">
          Our AI Engine is integrated across the PulsePlace.ai platform, powering multiple features with intelligent insights.
        </p>
        
        <div className="space-y-4">
          <AIIntegrationItem 
            icon={<Bot className="h-5 w-5 text-green-500" />} 
            name="PulseBot" 
            status="Live" 
            statusColor="green" 
          />
          <AIIntegrationItem 
            icon={<Zap className="h-5 w-5 text-green-500" />} 
            name="Culture Insights" 
            status="Live" 
            statusColor="green" 
          />
          <AIIntegrationItem 
            icon={<LineChart className="h-5 w-5 text-yellow-500" />} 
            name="Predictive Analytics" 
            status="Beta" 
            statusColor="yellow" 
          />
          <AIIntegrationItem 
            icon={<Brain className="h-5 w-5 text-blue-500" />} 
            name="Advanced LLM Features" 
            status="In Development" 
            statusColor="blue" 
          />
        </div>
      </div>
    </div>
  );
};

interface AIIntegrationItemProps {
  icon: React.ReactNode;
  name: string;
  status: string;
  statusColor: "green" | "yellow" | "blue";
}

const AIIntegrationItem: React.FC<AIIntegrationItemProps> = ({ icon, name, status, statusColor }) => {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div className="flex items-center space-x-3">
        {icon}
        <span>{name}</span>
      </div>
      <span className={`bg-${statusColor}-100 text-${statusColor}-700 px-2 py-1 rounded text-xs font-medium`}>
        {status}
      </span>
    </div>
  );
};

export default AITechnologySection;
