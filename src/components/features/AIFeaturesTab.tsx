
import React from 'react';
import { Brain, Zap, Cpu, Sparkles, Star } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const AIFeaturesTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        Our advanced AI and LLM technologies power the insights and recommendations that make PulsePlace unique.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <FeatureCard 
            icon={<Brain className="h-8 w-8" />}
            title="LLM Powered Insights" 
            description="Deep learning models that understand the nuances of workplace culture." 
            isNew={true}
          />
          <div className="mt-4 text-center">
            <Link to="/features/ai-analytics">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<Zap className="h-8 w-8" />}
            title="Trust Scoring" 
            description="Proprietary algorithms that quantify workplace trust with precision." 
          />
          <div className="mt-4 text-center">
            <Link to="/certification">
              <Button variant="outline" size="sm">See How It Works</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<Cpu className="h-8 w-8" />}
            title="Sentiment Analysis" 
            description="Natural language processing that captures the true feeling behind feedback." 
          />
          <div className="mt-4 text-center">
            <Link to="/features/ai-analytics">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <FeatureCard 
            icon={<Sparkles className="h-8 w-8" />}
            title="Predictive Analytics" 
            description="AI models that forecast culture trends before they impact performance." 
            isNew={true}
          />
          <div className="mt-4 text-center">
            <Link to="/features/ai-analytics">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-gradient-to-r from-pulse-50 to-teal-50 p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-center">The PulsePlace AI Difference</h3>
        <p className="text-center mb-6">
          Our AI doesn't just analyze data—it understands the complex dynamics of human relationships in the workplace.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="h-5 w-5 text-pulse-600 mr-2" />
              <h4 className="font-semibold">Trained on Workplace Data</h4>
            </div>
            <p className="text-sm text-gray-600">
              Models fine-tuned specifically for workplace culture dynamics
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="h-5 w-5 text-pulse-600 mr-2" />
              <h4 className="font-semibold">Contextual Understanding</h4>
            </div>
            <p className="text-sm text-gray-600">
              Analyzes feedback in the context of your specific industry and company size
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="h-5 w-5 text-pulse-600 mr-2" />
              <h4 className="font-semibold">Continuous Learning</h4>
            </div>
            <p className="text-sm text-gray-600">
              Models that improve with every interaction across our platform
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Link to="/demo">
          <Button className="bg-pulse-gradient hover:opacity-90">Schedule AI Demo</Button>
        </Link>
      </div>
    </div>
  );
};

export default AIFeaturesTab;
