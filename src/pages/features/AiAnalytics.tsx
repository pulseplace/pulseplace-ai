
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Brain, Sparkles, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AiAnalytics = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>AI Analytics | PulsePlace.ai</title>
        <meta 
          name="description" 
          content="Advanced AI analytics that transform workplace feedback into actionable insights."
        />
      </Helmet>
      
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Analytics</h1>
          <p className="text-lg text-gray-600 mb-8">
            Our advanced AI transforms raw feedback into actionable insights and recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join-beta">
              <Button className="bg-pulse-gradient hover:opacity-90">
                Join Beta Program
              </Button>
            </Link>
            <Link to="/book-demo">
              <Button variant="outline">
                Book a Demo
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <Brain className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Sentiment Analysis</h3>
            </div>
            <p className="text-gray-600">
              Natural language processing captures the true feeling behind employee feedback.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Action Recommendations</h3>
            </div>
            <p className="text-gray-600">
              AI-generated recommendations for specific actions to improve workplace culture.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <LineChart className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Predictive Insights</h3>
            </div>
            <p className="text-gray-600">
              Forecast culture trends before they impact performance with our predictive AI models.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiAnalytics;
