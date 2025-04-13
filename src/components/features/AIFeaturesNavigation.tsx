
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Brain, Bot, LineChart, MessageSquare, Zap } from 'lucide-react';

interface FeatureNavigationItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const features: FeatureNavigationItem[] = [
  {
    title: "PulseBot",
    description: "AI assistant for workplace culture questions",
    icon: <Bot className="h-5 w-5" />,
    path: "/pulsebot"
  },
  {
    title: "AI Dashboard",
    description: "Advanced AI analytics and insights",
    icon: <Brain className="h-5 w-5" />,
    path: "/ai-dashboard"
  },
  {
    title: "LLM Insights",
    description: "Deep learning insights from workplace data",
    icon: <MessageSquare className="h-5 w-5" />,
    path: "/dashboard/llm-insights"
  },
  {
    title: "Task Audit",
    description: "AI-enhanced task management",
    icon: <LineChart className="h-5 w-5" />,
    path: "/task-audit"
  },
  {
    title: "Culture Insights",
    description: "Workplace culture analytics",
    icon: <Zap className="h-5 w-5" />,
    path: "/insights"
  }
];

const AIFeaturesNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 my-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Explore Our AI Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(feature.path)}
          >
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/features')}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          View All Features
        </Button>
      </div>
    </div>
  );
};

export default AIFeaturesNavigation;
