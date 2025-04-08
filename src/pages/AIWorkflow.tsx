
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIWorkflowChart from '@/components/dashboard/mapping/AIWorkflowChart';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIWorkflow = () => {
  return (
    <>
      <Helmet>
        <title>How Our AI Works | PulsePlace.ai</title>
        <meta name="description" content="Learn how PulsePlace.ai uses advanced AI to analyze employee sentiment and calculate workplace culture scores." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">How Our AI Works</h1>
              <p className="text-lg text-gray-600">
                Our advanced AI engine powers workplace sentiment analysis and drives meaningful insights.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6">PulsePlace AI Engine</h2>
              <div className="mb-8">
                <AIWorkflowChart />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Data Collection</h3>
                  <p className="text-gray-700">
                    Our platform collects feedback and sentiment data through periodic pulse surveys, 
                    optional free-form responses, and integration with workplace communication tools.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Sentiment Analysis</h3>
                  <p className="text-gray-700">
                    Using natural language processing, we analyze employee feedback to identify 
                    emotional tones, satisfaction levels, and emerging patterns across teams.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Contextual Scoring</h3>
                  <p className="text-gray-700">
                    Our algorithms account for industry benchmarks, company size, organizational 
                    structure, and historical data to provide contextually relevant scores.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Insight Generation</h3>
                  <p className="text-gray-700">
                    By analyzing patterns over time, our AI identifies root causes of employee 
                    sentiment changes and generates actionable recommendations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Certification Process</h3>
                  <p className="text-gray-700">
                    The PulsePlace Certification uses a weighted scoring algorithm that evaluates 
                    emotional indices, engagement stability, and culture trust to determine your 
                    organization's overall pulse score.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-pulse-50 rounded-xl p-8 border border-pulse-100">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-semibold mb-2">Ready to experience our AI in action?</h3>
                  <p className="text-gray-700">Start with a quick pulse survey to see how our engine analyzes your workplace sentiment.</p>
                </div>
                <Link to="/join-beta">
                  <Button className="bg-pulse-gradient">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AIWorkflow;
