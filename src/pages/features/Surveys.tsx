
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Surveys = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>Pulse Surveys | PulsePlace.ai</title>
        <meta 
          name="description" 
          content="Learn about PulsePlace's AI-powered pulse surveys for real-time employee feedback."
        />
      </Helmet>
      
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Pulse Surveys</h1>
          <p className="text-lg text-gray-600 mb-8">
            Gather continuous feedback with micro-surveys designed to capture real-time employee sentiment.
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
                <MessageSquare className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Quick Feedback</h3>
            </div>
            <p className="text-gray-600">
              Short, targeted questions that take less than 60 seconds to answer, making feedback collection effortless.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">High Participation</h3>
            </div>
            <p className="text-gray-600">
              Achieve 4x higher response rates compared to traditional surveys with our engaging format.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <BarChart className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Trend Analysis</h3>
            </div>
            <p className="text-gray-600">
              Track sentiment changes over time to identify patterns and opportunities for improvement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Surveys;
