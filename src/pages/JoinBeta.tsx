
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JoinBetaForm from '@/components/JoinBetaForm';
import { BrandMessage } from '@/components/BrandMessage';

const JoinBetaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pulse-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
            Be among the first to build a soulful, AI-powered workplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our private beta and get early access to PulseScore certification. Transform how you measure, understand, and improve your workplace culture.
          </p>
        </div>
        
        <JoinBetaForm />
        
        <div className="mt-16">
          <BrandMessage 
            message="Great workplaces don't guess culture — they listen to it."
            className="text-center italic text-lg mb-8"
          />
        </div>
        
        <div className="mt-20 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">What Beta Users Receive</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pulse-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Early Access</h3>
              <p className="text-gray-600">First to use our cutting-edge AI tools with priority onboarding and support.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pulse-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-medal">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Priority Certification</h3>
              <p className="text-gray-600">Get fast-tracked for PulseScore Certification to showcase your workplace excellence.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pulse-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Shape the Product</h3>
              <p className="text-gray-600">Your feedback directly influences our development, helping create a product truly built for people.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 italic">
            "We're building PulsePlace.ai to help organizations create workplaces people love. Join us in this journey to make work better for everyone."
          </p>
          <p className="mt-2 font-semibold">— The PulsePlace Team</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinBetaPage;
