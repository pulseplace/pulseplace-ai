
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JoinBetaForm from '@/components/JoinBetaForm';
import MetaTags from '@/components/MetaTags';

const JoinBetaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pulse-50">
      <MetaTags 
        title="Join the PulsePlace.ai Beta | AI-powered workplace culture certification"
        description="Be among the first to transform your workplace with AI-powered culture insights. Join our private beta and get early access to PulseScore certification."
      />
      <Navbar />
      <div className="container mx-auto px-4 py-24 mt-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
            Be among the first to build a soulful, AI-powered workplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our private beta and get early access to PulseScore certification. Transform how you measure, understand, and improve your workplace culture.
          </p>
        </div>
        
        <JoinBetaForm />
      </div>
      <Footer />
    </div>
  );
};

export default JoinBetaPage;
