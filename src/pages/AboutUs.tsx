
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Target, Users, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Head of People Ops at Fortune 500 companies with 15+ years experience in workplace culture transformation.",
      avatar: "SJ"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "AI researcher and engineer specializing in NLP and sentiment analysis with experience at leading AI labs.",
      avatar: "MR"
    },
    {
      name: "Priya Patel",
      role: "Chief Data Scientist",
      bio: "PhD in Organizational Psychology with expertise in quantitative measures of workplace sentiment and culture.",
      avatar: "PP"
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Former product leader at HR tech startups with focus on creating simple, intuitive workplace tools.",
      avatar: "DK"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Redefining How Companies <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">Measure Workplace Culture</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                We're a team of workplace culture experts, data scientists, and AI engineers with a mission to create workplaces people love.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-gray-700 mb-6">
                    PulsePlace was born out of frustration with outdated "Best Places to Work" lists that relied on lengthy annual surveys, subjective testimonials, and pay-to-play recognitions.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    Our founders experienced firsthand how these traditional methods failed to capture the true day-to-day experience of employees, often showcasing companies with excellent PR but mixed workplace realities.
                  </p>
                  <p className="text-lg text-gray-700">
                    We set out to create a more transparent, data-driven approach to workplace culture measurement—one that actually reflects the lived experiences of employees, updated in real-time, and backed by AI-powered insights.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-6 text-center">Our Core Values</h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-12 w-12 bg-pulse-100 rounded-full flex items-center justify-center text-pulse-600">
                          <Target className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Transparency Above All</h4>
                        <p className="text-gray-600">We believe in radical transparency in how we measure and report workplace culture.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-12 w-12 bg-pulse-100 rounded-full flex items-center justify-center text-pulse-600">
                          <Users className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">People-First Data</h4>
                        <p className="text-gray-600">Our metrics focus on the human experience, not just corporate achievements.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-12 w-12 bg-pulse-100 rounded-full flex items-center justify-center text-pulse-600">
                          <HeartHandshake className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Continuous Improvement</h4>
                        <p className="text-gray-600">We believe workplace culture is a journey, not a destination.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-14 w-14 bg-pulse-100 text-pulse-700 rounded-full flex items-center justify-center text-xl font-semibold mr-4">
                          {member.avatar}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{member.name}</h3>
                          <p className="text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission and Vision Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-gradient-to-br from-pulse-50 to-blue-50 p-8 rounded-xl">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 bg-pulse-100 rounded-full flex items-center justify-center text-pulse-600 mr-4">
                      <Building className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    To bring transparency and accountability to workplace culture claims through continuous, AI-powered measurement and recognition of truly exceptional workplaces.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-xl">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mr-4">
                      <Target className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    A world where every company is empowered with the tools and insights to create workplaces people genuinely love—measured by real experiences, not just intentions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pulse-600 to-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Workplace?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join forward-thinking organizations using PulsePlace.ai to measure, understand, and improve their workplace culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-beta">
                <Button className="bg-white text-pulse-600 hover:bg-gray-100 transition-colors px-8 py-6 h-auto">
                  Join the Beta <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
