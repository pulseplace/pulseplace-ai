
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Award } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-purple-700">Build Trust.</span> <br />
                <span>Certify Culture.</span> <br />
                <span className="text-purple-700">Benchmark Transparency.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                PulsePlace helps organizations build and measure workplace trust with our 
                industry-leading certification and analytics platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/pulse-score-lite">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button size="lg" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                alt="PulsePlace Dashboard" 
                className="rounded-lg shadow-xl w-full" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Workplace Trust Matters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Organizations with high trust cultures outperform their competitors across key metrics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-purple-700 mb-2">76%</h3>
              <p className="text-gray-700">Higher engagement in high-trust organizations</p>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-purple-700 mb-2">50%</h3>
              <p className="text-gray-700">Higher productivity among teams with strong trust</p>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-purple-700 mb-2">74%</h3>
              <p className="text-gray-700">Less stress in transparent workplace cultures</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How PulsePlace Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our three-step process helps organizations measure, improve, and showcase their workplace culture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Measure Trust</h3>
              <p className="text-gray-600">
                Take our scientifically-validated PulseScore™ assessment to gauge your organization's trust levels.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Build Culture</h3>
              <p className="text-gray-600">
                Implement targeted improvements based on AI-powered insights and best practices.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Get Certified</h3>
              <p className="text-gray-600">
                Earn Pulse Certified™ status to showcase your commitment to workplace excellence.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/pulse-score-lite">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Your Free Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workplace?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join hundreds of forward-thinking organizations using PulsePlace to build 
            stronger cultures and attract top talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pulse-score-lite">
              <Button size="lg" variant="secondary" className="bg-white text-purple-700 hover:bg-gray-100 px-8">
                Start Free Assessment
              </Button>
            </Link>
            <Link to="/book-demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-600">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
