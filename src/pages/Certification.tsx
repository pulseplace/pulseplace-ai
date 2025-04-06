
import React from 'react';
import { BadgeCheck, BadgeDollarSign, BadgePercent, FileCheck, ShieldAlert, ShieldCheck, StarIcon, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Certification = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
              Get Pulse Certified
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Stand out as a culture-first organization. PulsePlace certification is awarded to workplaces where trust, wellbeing, and inclusion are measured — not just marketed.
            </p>
          </div>
        </section>

        {/* Why Get Certified Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">Why Get Certified?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pulse-100 text-pulse-600 mb-6 mx-auto">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Build Trust with Top Talent</h3>
                <p className="text-gray-700 text-center">
                  Show candidates and current employees that you're committed to transparent culture measurement.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pulse-100 text-pulse-600 mb-6 mx-auto">
                  <BadgePercent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Benchmark Against the Best</h3>
                <p className="text-gray-700 text-center">
                  Compare your culture metrics with leading organizations in your industry.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pulse-100 text-pulse-600 mb-6 mx-auto">
                  <FileCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Show Real Progress</h3>
                <p className="text-gray-700 text-center">
                  Demonstrate measured improvement on culture, not just policies and intentions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Measure Section */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4">What We Measure</h2>
            <h3 className="text-xl text-center text-gray-700 mb-12">The 3 Core Signals Behind Certification</h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-pulse-100 text-pulse-600 p-2 rounded-full mr-3">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  Emotion Index
                </h3>
                <p className="text-gray-700">
                  Measure real-time sentiment through pulse surveys and feedback analysis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-pulse-100 text-pulse-600 p-2 rounded-full mr-3">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  Engagement Stability
                </h3>
                <p className="text-gray-700">
                  Track retention, absenteeism and engagement metrics over time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-pulse-100 text-pulse-600 p-2 rounded-full mr-3">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  Culture Trust Score
                </h3>
                <p className="text-gray-700">
                  Evaluate DEI initiatives, flexibility policies, and onboarding effectiveness.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center my-8">
              <img 
                src="/lovable-uploads/802f6b9e-42e3-4397-ba07-c035bd53a988.png" 
                alt="How PulseScore™ Measures What Matters" 
                className="max-w-full md:max-w-2xl rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Certification Tiers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4">Certification Tiers</h2>
            <h3 className="text-xl text-center text-gray-700 mb-12">Where Does Your Organization Rank?</h3>
            
            <div className="flex flex-wrap justify-center gap-5 mb-10">
              <img 
                src="/lovable-uploads/39c4a4a6-826a-4eb5-a2d1-2eada2e61e6f.png" 
                alt="PulsePlace Certification Tiers" 
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mt-10">
              <div className="bg-blue-50 rounded-xl p-6 transition-all hover:shadow-md flex flex-col items-center text-center">
                <div className="text-blue-900 mb-4">
                  <Trophy className="h-14 w-14 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">85–100</h3>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Pulse Certified</h4>
                <p className="text-blue-800 font-medium">Lovable Workplace</p>
                <p className="text-blue-700 mt-3 text-sm">
                  Top-tier organizations with exceptional employee trust and culture metrics
                </p>
              </div>
              
              <div className="bg-blue-200 rounded-xl p-6 transition-all hover:shadow-md flex flex-col items-center text-center">
                <div className="text-blue-800 mb-4">
                  <ShieldCheck className="h-14 w-14 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800">70–84</h3>
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Growth Culture</h4>
                <p className="text-blue-700 font-medium">On the Rise</p>
                <p className="text-blue-600 mt-3 text-sm">
                  Organizations with strong momentum and clear improvement trajectories
                </p>
              </div>
              
              <div className="bg-blue-600 rounded-xl p-6 transition-all hover:shadow-md flex flex-col items-center text-center">
                <div className="text-white mb-4">
                  <BadgePercent className="h-14 w-14 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white">50–69</h3>
                <h4 className="text-lg font-semibold text-white mb-2">Developing</h4>
                <p className="text-blue-100 font-medium">Needs Attention</p>
                <p className="text-blue-100 mt-3 text-sm">
                  Organizations with inconsistent culture metrics that need focused improvement
                </p>
              </div>
              
              <div className="bg-blue-900 rounded-xl p-6 transition-all hover:shadow-md flex flex-col items-center text-center">
                <div className="text-white mb-4">
                  <ShieldAlert className="h-14 w-14 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white">Below 50</h3>
                <h4 className="text-lg font-semibold text-white mb-2">At Risk</h4>
                <p className="text-blue-100 font-medium">Critical Culture Risk</p>
                <p className="text-blue-100 mt-3 text-sm">
                  Organizations facing significant workplace culture challenges
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Story Section */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-pulse-600">
                  <StarIcon className="h-12 w-12" />
                </div>
                <blockquote className="text-xl italic text-gray-700 mb-4">
                  "PulsePlace helped us uncover what really mattered to our team. The certification process wasn't just a badge — it gave us actionable insights we've used to transform our workplace culture."
                </blockquote>
                <cite className="text-sm font-semibold">
                  — Sarah Chen, Chief People Officer at FutureTech Solutions
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to See Where You Stand?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join forward-thinking organizations that prioritize culture measurement and continuous improvement.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg"
              onClick={() => window.location.href = "mailto:certify@pulseplace.ai"}
            >
              Apply to Get Certified
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Certification;
