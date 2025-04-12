
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Cpu, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AiEngine = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>AI Engine | PulsePlace.ai</title>
        <meta 
          name="description" 
          content="The powerful AI Engine behind PulsePlace's workplace culture insights."
        />
      </Helmet>
      
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Engine</h1>
          <p className="text-lg text-gray-600 mb-8">
            Our proprietary LLM technology powers deep insights into workplace culture and trust.
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
                <Cpu className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">LLM Foundation</h3>
            </div>
            <p className="text-gray-600">
              Built on advanced large language models fine-tuned for workplace dynamics.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <Database className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Contextual Learning</h3>
            </div>
            <p className="text-gray-600">
              Models that adapt to your specific industry, company size, and culture context.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <Zap className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Real-time Analysis</h3>
            </div>
            <p className="text-gray-600">
              Process feedback and generate insights in seconds, not days or weeks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiEngine;
