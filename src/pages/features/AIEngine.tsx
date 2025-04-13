
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Zap, Bot, Cpu, Sparkles, LineChart } from 'lucide-react';

const AIEngine = () => {
  return (
    <>
      <Helmet>
        <title>AI Engine | PulsePlace.ai</title>
        <meta name="description" content="Learn about PulsePlace.ai's advanced AI engine powering workplace culture insights and analytics." />
      </Helmet>
      
      <div className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <Link to="/features" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Features
          </Link>
          
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Engine Technology</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proprietary AI engine powers all of PulsePlace.ai's intelligent features, delivering deep insights and actionable recommendations.
            </p>
          </div>
          
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
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-3">
                    <Bot className="h-5 w-5 text-green-500" />
                    <span>PulseBot</span>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Live</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-green-500" />
                    <span>Culture Insights</span>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Live</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-3">
                    <LineChart className="h-5 w-5 text-yellow-500" />
                    <span>Predictive Analytics</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">Beta</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <span>Advanced LLM Features</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">In Development</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">AI-Powered Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Bot className="h-6 w-6 text-purple-500" />
                  <h3 className="text-lg font-semibold">PulseBot</h3>
                </div>
                <p className="text-gray-600 mb-4">AI assistant that answers questions about workplace culture and guides users through the platform.</p>
                <Link to="/pulsebot">
                  <Button variant="outline" size="sm" className="w-full">Try PulseBot</Button>
                </Link>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-semibold">AI Dashboard</h3>
                </div>
                <p className="text-gray-600 mb-4">Comprehensive dashboard with AI-generated insights and analytics about your organization.</p>
                <Link to="/ai-dashboard">
                  <Button variant="outline" size="sm" className="w-full">View Dashboard</Button>
                </Link>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <h3 className="text-lg font-semibold">Culture Insights</h3>
                </div>
                <p className="text-gray-600 mb-4">Data-driven analysis of your workplace culture with actionable recommendations.</p>
                <Link to="/insights">
                  <Button variant="outline" size="sm" className="w-full">Explore Insights</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/book-demo">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIEngine;
