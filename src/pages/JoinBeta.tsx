import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JoinBetaForm from '@/components/JoinBetaForm';
import MailchimpSignup from '@/components/MailchimpSignup';
import MetaTags from '@/components/MetaTags';

const JoinBetaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pulse-50">
      <MetaTags 
        title="Join the PulsePlace.ai Beta | AI-powered workplace culture certification"
        description="Be among the first to transform your workplace with AI-powered culture insights. Join our private beta and get early access to PulseScore certification."
      />
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
            Join the PulsePlace Private Beta
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Be among the first to transform your workplace with AI-powered culture insights and get early access to PulseScore certification.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-xl mx-auto">
            <MailchimpSignup 
              title="Quick Beta Registration" 
              buttonText="Join Beta"
              placeholder="Enter your work email"
            />
            <p className="text-sm text-gray-500 mt-2">Get early access with just your email</p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Full Registration Form</h2>
            <JoinBetaForm />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-pulse-600 text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Submit Application</h3>
              <p className="text-sm text-gray-600">Complete the form with your company details</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-pulse-600 text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Quick Onboarding</h3>
              <p className="text-sm text-gray-600">We'll set up your account within 24-48 hours</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-pulse-600 text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Start Your Journey</h3>
              <p className="text-sm text-gray-600">Begin measuring and improving your workplace culture</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinBetaPage;
