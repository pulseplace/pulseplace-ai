
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Cpu, Database, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AiEngine = () => {
  // Integration status data
  const integrationStatus = {
    overallCompletion: 85,
    components: [
      { name: "Core LLM Integration", completion: 92, status: "near-complete" },
      { name: "Sentiment Analysis Pipeline", completion: 88, status: "near-complete" },
      { name: "Real-time Insights Engine", completion: 82, status: "in-progress" },
      { name: "Performance Optimization", completion: 75, status: "in-progress" },
      { name: "Cross-Platform Integration", completion: 90, status: "near-complete" }
    ]
  };
  
  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Complete</Badge>;
      case 'near-complete':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Near Complete</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">AI Engine</h1>
            <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200 text-sm">BETA</Badge>
          </div>
          
          <p className="text-lg text-gray-600 mb-8">
            Our proprietary LLM technology powers deep insights into workplace culture and trust.
          </p>
          
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Integration Status: {integrationStatus.overallCompletion}%</span>
              <span className="text-sm font-medium text-blue-600">Target: April 21, 2025</span>
            </div>
            <Progress value={integrationStatus.overallCompletion} className="h-2.5" />
          </div>
          
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
        
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">AI Integration Progress</h2>
            <div className="space-y-4">
              {integrationStatus.components.map((component, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center">
                      <span className="font-medium">{component.name}</span>
                      <div className="ml-2">
                        {getStatusBadge(component.status)}
                      </div>
                    </div>
                    <span className="text-sm font-medium">{component.completion}%</span>
                  </div>
                  <Progress value={component.completion} className="h-2 mb-2" />
                </div>
              ))}
            </div>
          </div>
        
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-pulse-100 p-2 rounded-full">
                  <Cpu className="h-6 w-6 text-pulse-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3">LLM Foundation</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Built on advanced large language models fine-tuned for workplace dynamics.
              </p>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Deployment ready</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-pulse-100 p-2 rounded-full">
                  <Database className="h-6 w-6 text-pulse-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3">Contextual Learning</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Models that adapt to your specific industry, company size, and culture context.
              </p>
              <div className="flex items-center text-sm text-yellow-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Final testing in progress</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-pulse-100 p-2 rounded-full">
                  <Zap className="h-6 w-6 text-pulse-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3">Real-time Analysis</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Process feedback and generate insights in seconds, not days or weeks.
              </p>
              <div className="flex items-center text-sm text-blue-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Performance optimization ongoing</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">AI Integration Timeline</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-pulse-300 ml-6 pl-8 pb-8">
              <div className="mb-8 relative">
                <div className="absolute -left-10 top-0 bg-green-100 text-green-800 p-1 rounded-full border-2 border-pulse-300">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Base LLM Integration</h3>
                <p className="text-gray-600 text-sm">Completed March 28, 2025</p>
                <p className="mt-2">Core language model implementation and initial training completed.</p>
              </div>
              
              <div className="mb-8 relative">
                <div className="absolute -left-10 top-0 bg-green-100 text-green-800 p-1 rounded-full border-2 border-pulse-300">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Sentiment Analysis Engine</h3>
                <p className="text-gray-600 text-sm">Completed April 5, 2025</p>
                <p className="mt-2">Sentiment analysis pipeline for survey responses integrated.</p>
              </div>
              
              <div className="mb-8 relative">
                <div className="absolute -left-10 top-0 bg-yellow-100 text-yellow-800 p-1 rounded-full border-2 border-pulse-300">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Real-time Insights Engine</h3>
                <p className="text-gray-600 text-sm">In Progress - Due April 15, 2025</p>
                <p className="mt-2">Real-time processing of feedback data and generation of actionable insights.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 top-0 bg-blue-100 text-blue-800 p-1 rounded-full border-2 border-pulse-300">
                  <Cpu className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Final Deployment</h3>
                <p className="text-gray-600 text-sm">Scheduled - April 21, 2025</p>
                <p className="mt-2">Full AI engine deployment with the beta launch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiEngine;
