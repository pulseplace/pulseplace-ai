
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bot, Brain, Zap } from 'lucide-react';

const AIFeaturesGrid = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">AI-Powered Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Bot className="h-6 w-6 text-purple-500" />}
          title="PulseBot"
          description="AI assistant that answers questions about workplace culture and guides users through the platform."
          linkTo="/pulsebot"
          buttonText="Try PulseBot"
        />
        
        <FeatureCard 
          icon={<Brain className="h-6 w-6 text-blue-500" />}
          title="AI Dashboard"
          description="Comprehensive dashboard with AI-generated insights and analytics about your organization."
          linkTo="/ai-dashboard"
          buttonText="View Dashboard"
        />
        
        <FeatureCard 
          icon={<Zap className="h-6 w-6 text-yellow-500" />}
          title="Culture Insights"
          description="Data-driven analysis of your workplace culture with actionable recommendations."
          linkTo="/insights"
          buttonText="Explore Insights"
        />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, linkTo, buttonText }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={linkTo}>
        <Button variant="outline" size="sm" className="w-full">{buttonText}</Button>
      </Link>
    </div>
  );
};

export default AIFeaturesGrid;
