
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Globe, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const CertificationShowcase = () => {
  // Sample certified companies data
  const certifiedCompanies = [
    {
      name: "Acme Innovation",
      industry: "Technology",
      size: "250-500",
      score: 92,
      year: 2023,
      description: "Leading the industry in employee satisfaction and culture transparency.",
      strengths: ["Remote flexibility", "Leadership transparency", "Career growth"]
    },
    {
      name: "Horizon Health",
      industry: "Healthcare",
      size: "1000+",
      score: 88,
      year: 2023,
      description: "Setting new standards for work-life balance in healthcare.",
      strengths: ["Work-life balance", "Inclusive policies", "Mental health support"]
    },
    {
      name: "GreenField Solutions",
      industry: "Sustainability",
      size: "50-249",
      score: 94,
      year: 2023,
      description: "Fostering purpose-driven culture with exceptional team cohesion.",
      strengths: ["Mission alignment", "Team collaboration", "Learning culture"]
    },
    {
      name: "Atlas Finance",
      industry: "Financial Services",
      size: "500-999",
      score: 86,
      year: 2023,
      description: "Transforming traditional finance with people-first approaches.",
      strengths: ["Innovation focus", "Fair compensation", "Diversity initiatives"]
    },
    {
      name: "Spark Creative",
      industry: "Marketing",
      size: "50-249",
      score: 91,
      year: 2023,
      description: "Where creativity meets exceptional workplace culture.",
      strengths: ["Creative freedom", "Flexible hours", "Recognition programs"]
    },
    {
      name: "Nexus Education",
      industry: "Education",
      size: "250-500",
      score: 89,
      year: 2023,
      description: "Building the future of education with a thriving team culture.",
      strengths: ["Professional development", "Work purpose", "Supportive management"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Certified Companies Showcase | PulsePlace.ai"
        description="Explore organizations that have earned the PulsePlace certification for exceptional workplace culture"
      />
      <Navbar />
      
      <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-pulse-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Pulse Certified™ Organizations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the companies setting the standard for exceptional workplace culture and employee experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifiedCompanies.map((company, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                <div className="bg-pulse-gradient h-2"></div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">{company.name}</h2>
                    <div className="bg-pulse-50 text-pulse-700 px-2 py-1 rounded-full text-sm font-medium">
                      {company.score}/100
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="mr-3">{company.industry}</span>
                    <Users className="h-4 w-4 mr-1" />
                    <span>{company.size} employees</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {company.description}
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Culture Strengths:</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.strengths.map((strength, i) => (
                        <div key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Certified {company.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to join these leading companies?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get your organization certified and showcase your commitment to creating a workplace worth working in.
            </p>
            <Link to="/join-beta">
              <Button size="lg" className="bg-pulse-gradient">
                Get Pulse Certified <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Certification Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Being Pulse Certified gives your organization a competitive edge in attracting and retaining top talent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <CheckCircle2 className="h-10 w-10 text-pulse-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Employer Branding</h3>
              <p className="text-gray-600">
                Showcase your certification across social media, career pages, and recruiting materials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <CheckCircle2 className="h-10 w-10 text-pulse-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Talent Attraction</h3>
              <p className="text-gray-600">
                Stand out to job seekers who prioritize positive workplace culture and transparency.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <CheckCircle2 className="h-10 w-10 text-pulse-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Verified Credibility</h3>
              <p className="text-gray-600">
                Third-party validation of your culture based on real employee feedback and data.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CertificationShowcase;
