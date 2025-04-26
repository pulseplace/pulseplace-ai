
import React from 'react';
import Navbar from '@/components/navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, TrendingUp, Award, Brain, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pulse-50 to-white">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Build Trust. Certify Your Culture.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              PulsePlace uses explainable AI to measure, improve, and certify your workplace culture with objective metrics and actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pulse-score-lite">
                <Button 
                  size="lg"
                  className="bg-pulse-gradient hover:opacity-90 transition-all w-full sm:w-auto"
                >
                  Start Free Certification
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 w-full sm:w-auto"
                >
                  How Certification Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* The Culture Gap Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Culture Gap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most organizations struggle with disengagement, burnout, and declining trust - yet continue to use black-box survey tools that fail to provide actionable insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-5 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Disengagement</h3>
              <p className="text-gray-600 text-center">
                70% of employees report feeling disconnected from their organization's mission and purpose.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-5 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Burnout</h3>
              <p className="text-gray-600 text-center">
                Over 50% of workers experience burnout and stress due to unhealthy workplace dynamics.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-5 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093v0" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19v.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Black-Box Distrust</h3>
              <p className="text-gray-600 text-center">
                Traditional survey tools provide metrics without transparency or actionable recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pulse Certified System Introduction */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Introducing Pulse Certified™</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The first workplace culture certification system that combines AI-powered insights with transparent metrics to build stronger teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img 
                src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                alt="PulsePlace Certification" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Objective Measurement</h3>
                    <p className="text-gray-600">
                      Our PulseScore™ algorithm provides a standardized measure of workplace culture quality.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Actionable Insights</h3>
                    <p className="text-gray-600">
                      Every certification includes specific recommendations to improve your workplace culture.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Competitive Advantage</h3>
                    <p className="text-gray-600">
                      Certified organizations attract and retain top talent by showcasing their commitment to culture.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Trust Building</h3>
                    <p className="text-gray-600">
                      Transparency in metrics and methodology helps build lasting trust with teams.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3 Pillars Block */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Three Pillars of PulsePlace</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certification platform is built on three powerful differentiators that redefine how organizations approach workplace culture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Explainable AI</h3>
              <p className="text-gray-600 text-center">
                Unlike "black box" solutions, our AI provides transparent reasoning behind every insight and recommendation.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Certification Not Surveys</h3>
              <p className="text-gray-600 text-center">
                Move beyond traditional pulse surveys to a comprehensive certification system that validates culture quality.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6 mx-auto">
                <BarChart3 className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Benchmarking Built-In</h3>
              <p className="text-gray-600 text-center">
                Compare your culture metrics to industry standards and track improvements over time with integrated benchmarking.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to certify your workplace culture?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Take the first step toward building a stronger, more engaged team with our free PulseScore assessment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/pulse-score-lite">
              <Button 
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 transition-all w-full sm:w-auto"
              >
                Start Free Certification
              </Button>
            </Link>
            <Link to="/demo">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
