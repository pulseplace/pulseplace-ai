
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureSection from '@/components/FeatureSection';
import { Button } from "@/components/ui/button";
import { BrandMessage } from '@/components/BrandMessage';
import MetaTags from '@/components/MetaTags';
import { ArrowRight, PlayCircle, MessageSquare, CheckCircle2, BarChart2, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="PulsePlace.ai | Make Workplaces Worth Working In"
        description="AI-powered certification for workplace culture that puts people first. Get your PulseScore™ and become PulsePlace Certified."
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Make Workplaces
              <span className="block">Worth Working In</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
              AI-powered certification for culture that puts people first.
            </p>
            <Link to="/certification">
              <Button size="lg" className="bg-pulse-gradient hover:opacity-90 text-lg px-8 py-6">
                Get Pulse Certified
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Work Feels Broken
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Workplaces talk about culture, but employees feel the disconnect.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Burnout is up. Trust is down. Employee engagement has become a spreadsheet metric.
              </p>
              <BrandMessage 
                message="PulsePlace gives people a voice — and holds leaders accountable." 
                variant="highlight"
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Introducing PulseScore™
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A next-gen score built on emotion, engagement, and trust.<br />
              Backed by AI. Designed by humans. Built for workplaces with soul.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="border-2 border-pulse-100 rounded-xl p-6 transition-all hover:border-pulse-300 hover:shadow-md">
                <div className="w-16 h-16 bg-pulse-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-pulse-600 text-2xl font-bold">E</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Emotion Index</h3>
                <p className="text-gray-600">Measuring the authentic feelings that drive workplace behavior</p>
              </div>
              
              <div className="border-2 border-pulse-100 rounded-xl p-6 transition-all hover:border-pulse-300 hover:shadow-md">
                <div className="w-16 h-16 bg-pulse-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-pulse-600 text-2xl font-bold">S</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Engagement Stability</h3>
                <p className="text-gray-600">Tracking consistency of connection across teams and time</p>
              </div>
              
              <div className="border-2 border-pulse-100 rounded-xl p-6 transition-all hover:border-pulse-300 hover:shadow-md">
                <div className="w-16 h-16 bg-pulse-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-pulse-600 text-2xl font-bold">T</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Culture Trust</h3>
                <p className="text-gray-600">Evaluating psychological safety and leadership credibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 px-4" id="how-it-works">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From Pulse to Certification
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Journey to Greatness, Quantified.
            </p>
          </div>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pulse-gradient rounded-full p-2 flex-shrink-0">
                <PlayCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Employees respond to an anonymous pulse survey</h3>
                <p className="text-gray-600">Quick, thoughtful questions that respect people's time while capturing real sentiment</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pulse-gradient rounded-full p-2 flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Our AI analyzes sentiment, emotion, and themes</h3>
                <p className="text-gray-600">Advanced machine learning uncovers patterns humans might miss</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pulse-gradient rounded-full p-2 flex-shrink-0">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">You receive your PulseScore™</h3>
                <p className="text-gray-600">A comprehensive metric showing where your workplace culture stands</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pulse-gradient rounded-full p-2 flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">If you meet the standard, you get Certified by PulsePlace™</h3>
                <p className="text-gray-600">Showcase your achievement with our recognized certification badge</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pulse-gradient rounded-full p-2 flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Insights + benchmarks help you grow stronger over time</h3>
                <p className="text-gray-600">Continuous improvement with actionable recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" id="join-beta">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-pulse-gradient text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Be part of the first wave. <br /> Shape the future of work.
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Get early access to our AI engine, pilot the platform with your team, and become Pulse Certified.
            </p>
            <Link to="/join-beta">
              <Button size="lg" className="bg-white text-pulse-600 hover:bg-gray-100 text-lg px-8 py-6">
                Join the Private Beta <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Optional Founder's Note Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why We Built PulsePlace</h2>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <blockquote className="text-lg text-gray-600 italic">
              "We believe workplaces should bring out the best in people, not burn them out. 
              PulsePlace was born from our conviction that the future of work must be more human, 
              more transparent, and more emotionally intelligent. 
              Our mission is to help organizations build cultures where people truly thrive."
            </blockquote>
            <div className="mt-6 text-right">
              <p className="font-semibold">— The PulsePlace Team</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
