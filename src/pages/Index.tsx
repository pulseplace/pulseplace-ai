
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyPulsePlace from '@/components/WhyPulsePlace';
import FeatureSection from '@/components/FeatureSection';
import LandingPageDemo from '@/components/LandingPageDemo';
import HowItWorks from '@/components/HowItWorks';
import PulseScoreDemo from '@/components/PulseScoreDemo';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CallToAction from '@/components/CallToAction';
import JoinBeta from '@/components/JoinBeta';
import Footer from '@/components/Footer';
import { Users, Building, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TeamPilotSection = () => (
  <section className="py-16 bg-gradient-to-b from-white to-gray-50">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience PulsePlace with Your Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how easy it is to implement our solution with your team and get immediate results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-center">
                <div className="bg-pulse-100 p-4 rounded-full">
                  <Users className="h-10 w-10 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">For HR Leaders</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="bg-pulse-100 rounded-full p-1 mt-1">
                    <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Identify engagement opportunities before they become retention issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pulse-100 rounded-full p-1 mt-1">
                    <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Get AI-generated action plans based on real employee sentiment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pulse-100 rounded-full p-1 mt-1">
                    <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Benchmark your culture against industry standards</span>
                </li>
              </ul>
              <Link to="/demo#pulse-score" className="block w-full">
                <Button className="w-full bg-pulse-gradient">
                  Try HR Leader Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-center">
                <div className="bg-pulse-100 p-4 rounded-full">
                  <Building className="h-10 w-10 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">For CTOs & Engineering Leaders</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="bg-pulse-100 rounded-full p-1 mt-1">
                    <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Track tech team culture metrics with precision</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pulse-100 rounded-full p-1 mt-1">
                    <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Reduce developer churn and improve team stability</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pulse-100 rounded-full p-1 mt-1">
                    <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Data-driven insights to build high-performing tech teams</span>
                </li>
              </ul>
              <Link to="/demo#ai-insights" className="block w-full">
                <Button className="w-full bg-pulse-gradient">
                  Try Tech Team Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyPulsePlace />
      <FeatureSection />
      <TeamPilotSection />
      <LandingPageDemo />
      <HowItWorks />
      <PulseScoreDemo />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <JoinBeta />
      <Footer />
    </div>
  );
};

export default Index;
