
import React, { useState, useEffect } from 'react';
import MetaTags from '@/components/MetaTags';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Calendar, Bot, LineChart, BarChart, Brain, Award, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const Features = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'ai-features', 'pulsebot', 'dashboard', 'certification'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main features data
  const mainFeatures = [
    {
      id: 'ai-analytics',
      icon: <Brain className="h-16 w-16 text-pulse-600" />,
      title: "AI-Powered Analytics",
      description: "Our advanced AI analyzes workplace sentiment, identifies trends, and provides actionable recommendations to improve culture.",
      benefits: [
        "Real-time sentiment analysis",
        "Predictive retention modeling",
        "Customized improvement plans",
        "Culture benchmarking"
      ]
    },
    {
      id: 'pulse-surveys',
      icon: <Activity className="h-16 w-16 text-teal-600" />,
      title: "Pulse Surveys",
      description: "Lightweight, frequent surveys that measure employee sentiment and trust in real-time without survey fatigue.",
      benefits: [
        "5-question micro-surveys",
        "AI-powered question selection",
        "Multilingual support",
        "Anonymous feedback options"
      ]
    },
    {
      id: 'certification',
      icon: <Award className="h-16 w-16 text-pulse-600" />,
      title: "Trust Certification",
      description: "Data-driven certification that proves your commitment to creating a trustworthy workplace.",
      benefits: [
        "Shareable trust badges",
        "Verified by real employee data",
        "Competitive employer branding",
        "Annual recertification"
      ]
    },
    {
      id: 'dashboard',
      icon: <BarChart className="h-16 w-16 text-teal-600" />,
      title: "Interactive Dashboards",
      description: "Beautiful, intuitive dashboards that make it easy to understand and act on your culture data.",
      benefits: [
        "Department-level filtering",
        "Trend analysis over time",
        "Exportable reports",
        "Custom visualization options"
      ]
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <MetaTags 
        title="AI-Powered Features | PulsePlace.ai" 
        description="Explore the powerful AI and LLM capabilities of PulsePlace.ai for measuring and improving workplace culture."
      />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-pulse-600 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Hero Section */}
      <section id="hero" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features to Transform Your <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">Workplace Culture</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Everything you need to measure, improve, and showcase your organization's commitment to building a culture of trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button className="bg-pulse-gradient hover:opacity-90 transition-all flex items-center gap-2 h-12 px-6 text-base">
                  Book a Demo <Calendar className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pulsebot">
                <Button variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 flex items-center gap-2 h-12 px-6 text-base">
                  Try PulseBot <Bot className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines AI, analytics, and human-centered design to help you build a culture of trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <div key={index} id={feature.id} className="scroll-mt-20">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 h-full border border-gray-100">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <div>
                    <h4 className="font-semibold mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="bg-pulse-100 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="bg-pulse-600 h-2 w-2 rounded-full"></div>
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* PulseBot Section */}
      <section id="pulsebot" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet PulseBot: Your AI Culture Assistant
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                A revolutionary AI assistant that helps you understand and improve your workplace culture through natural conversations.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <div className="bg-pulse-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Natural Conversations</h4>
                    <p className="text-gray-600">Ask questions about your culture data in plain language</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-pulse-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">AI-Powered Insights</h4>
                    <p className="text-gray-600">Get actionable recommendations based on your specific challenges</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-pulse-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <LineChart className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Trend Analysis</h4>
                    <p className="text-gray-600">Understand how your culture is changing over time</p>
                  </div>
                </li>
              </ul>
              <Link to="/pulsebot">
                <Button className="bg-pulse-gradient hover:opacity-90 transition-all">
                  Try PulseBot Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-xl">
              {/* Placeholder for PulseBot Demo/Screenshot */}
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">PulseBot Demo Interface</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Section */}
      <section id="dashboard" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive Culture Dashboards
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beautiful, intuitive dashboards that make it easy to understand and improve your workplace culture.
            </p>
          </div>
          
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
            {/* Placeholder for Dashboard Screenshot */}
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Interactive Dashboard Preview</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Trust Metrics</h3>
                    <p className="text-sm text-gray-600">Track key indicators of workplace trust across your organization</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Department Analytics</h3>
                    <p className="text-sm text-gray-600">Compare culture metrics across teams and departments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Trend Analysis</h3>
                    <p className="text-sm text-gray-600">See how your culture metrics evolve over time</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 text-center">
                <Link to="/dashboard-preview">
                  <Button className="bg-pulse-gradient hover:opacity-90 transition-all">
                    Explore Dashboard Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Certification Section */}
      <section id="certification" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-6 rounded-xl shadow-xl">
                {/* Placeholder for Certification Badge */}
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">PulsePlace Certification Badge</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get Certified for Trust Excellence
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Showcase your commitment to building a trustworthy workplace culture with our data-backed certification.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <div className="bg-teal-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Trusted Employer Badge</h4>
                    <p className="text-gray-600">Display your certification on your careers page and recruitment materials</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-teal-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <BarChart className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Data-Backed Verification</h4>
                    <p className="text-gray-600">Certification based on real employee feedback, not just testimonials</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-teal-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <Activity className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Continuous Improvement</h4>
                    <p className="text-gray-600">Annual recertification keeps you focused on maintaining trust</p>
                  </div>
                </li>
              </ul>
              <Link to="/certification">
                <Button className="bg-pulse-gradient hover:opacity-90 transition-all">
                  Learn About Certification <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-pulse-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Workplace Culture?
            </h2>
            <p className="text-xl mb-8">
              Join hundreds of organizations using PulsePlace to build more trustworthy workplaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button className="bg-white text-pulse-600 hover:bg-gray-100 transition-all h-12 px-6 text-base">
                  Book a Demo <Calendar className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/join-beta">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-6 text-base">
                  Join the Beta Program
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
