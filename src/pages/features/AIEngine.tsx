
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AIHero from '@/components/features/ai-engine/AIHero';
import AITechnologySection from '@/components/features/ai-engine/AITechnologySection';
import AIFeaturesGrid from '@/components/features/ai-engine/AIFeaturesGrid';
import CallToAction from '@/components/features/ai-engine/CallToAction';

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
          
          <AIHero />
          <AITechnologySection />
          <AIFeaturesGrid />
          <CallToAction />
        </div>
      </div>
    </>
  );
};

export default AIEngine;
