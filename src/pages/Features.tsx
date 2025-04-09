
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Calendar, Clock, CreditCard, FileText, 
  Globe, MessageSquare, Smile, Users, Brain, 
  Zap, Cpu, ChevronRight, Star, Sparkles, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const FeatureCard = ({ icon, title, description, isNew = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
        {isNew && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-pulse-500 to-teal-500 text-white text-xs px-3 py-1 rounded-bl-lg">
            NEW
          </div>
        )}
        <CardHeader>
          <div className="mb-2 text-pulse-600">
            {icon}
          </div>
          <CardTitle className="flex items-center">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                <span className="text-gray-600">{getRandomFeaturePoint(title, i)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const getRandomFeaturePoint = (featureType, index) => {
  const points = {
    'AI Analytics': [
      'Advanced sentiment analysis of employee feedback',
      'Trend detection across historical data',
      'Predictive insights for future workplace dynamics'
    ],
    'PulseBot AI': [
      'Natural language processing for conversational feedback',
      'Personalized responses based on employee history',
      'Continuous learning from organization-specific data'
    ],
    'Real-Time Dashboard': [
      'Live metrics updated as feedback is collected',
      'Interactive visualizations for deeper analysis',
      'Customizable views for different stakeholders'
    ],
    'Pulse Surveys': [
      'Smart question sequencing based on previous answers',
      'Adaptive survey length to maximize completion',
      'Multi-format response options for rich data collection'
    ],
    'Certification Engine': [
      'Data-driven certification based on verified metrics',
      'Transparent validation process with third-party oversight',
      'Customizable badge generation for marketing materials'
    ],
    'Custom Reports': [
      'AI-generated executive summaries of key findings',
      'Department-specific insights and recommendations',
      'Exportable visualizations for presentations'
    ],
    'LLM Powered Insights': [
      'Deep learning models trained on workplace culture data',
      'Cross-industry benchmarking with contextual analysis',
      'Actionable recommendations with implementation guidance'
    ],
    'Trust Scoring': [
      'Proprietary algorithm measuring multiple trust dimensions',
      'Transparent calculation methodology backed by research',
      'Comparative analysis against industry standards'
    ]
  };
  
  // Default points if the feature type isn't found
  const defaultPoints = [
    'Advanced AI-powered analytics and insights',
    'Seamless integration with existing systems',
    'Data-driven recommendations for improvement'
  ];
  
  return (points[featureType] || defaultPoints)[index] || defaultPoints[index];
};

const Features = () => {
  const [activeTab, setActiveTab] = useState('core');
  const [demoActive, setDemoActive] = useState(false);
  
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const toggleDemo = () => {
    setDemoActive(!demoActive);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="AI-Powered Features | PulsePlace.ai" 
        description="Explore the powerful AI and LLM capabilities of PulsePlace.ai for measuring and improving workplace culture."
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Powered by <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">Advanced AI</span>
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Our suite of tools combines cutting-edge language models with organizational psychology to measure, understand, and enhance workplace trust.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/join-beta">
                    <Button className="bg-pulse-gradient hover:opacity-90">
                      Get Started
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 flex items-center"
                    onClick={toggleDemo}
                  >
                    {demoActive ? 'Hide Demo' : 'Watch Demo'} 
                    <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${demoActive ? 'rotate-90' : ''}`} />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Interactive Demo Section */}
        {demoActive && (
          <motion.section 
            className="py-12 bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl p-6 shadow-md">
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="PulsePlace.ai Demo" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  See how our AI technology works in real-time to transform workplace feedback into actionable insights
                </div>
              </div>
            </div>
          </motion.section>
        )}
        
        {/* Features Tabs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Advanced Technology Platform</h2>
            
            <Tabs defaultValue="core" value={activeTab} onValueChange={handleTabChange} className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="core" className="px-6">Core Features</TabsTrigger>
                  <TabsTrigger value="ai" className="px-6">AI & LLM Technology</TabsTrigger>
                  <TabsTrigger value="integrations" className="px-6">Integrations</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="core" className="space-y-8">
                <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                  Our core platform features are designed to provide a comprehensive solution for measuring and improving workplace trust.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  <FeatureCard 
                    icon={<MessageSquare className="h-8 w-8" />}
                    title="Pulse Surveys" 
                    description="Continuous micro-surveys to gather real-time feedback." 
                  />
                  
                  <FeatureCard 
                    icon={<BarChart className="h-8 w-8" />}
                    title="AI Analytics" 
                    description="Transform feedback into actionable insights." 
                    isNew={true}
                  />
                  
                  <FeatureCard 
                    icon={<Users className="h-8 w-8" />}
                    title="Certification Engine" 
                    description="Validate and showcase your workplace culture." 
                  />
                  
                  <FeatureCard 
                    icon={<Clock className="h-8 w-8" />}
                    title="Real-Time Dashboard" 
                    description="Monitor your culture metrics as they evolve." 
                  />
                  
                  <FeatureCard 
                    icon={<Smile className="h-8 w-8" />}
                    title="PulseBot AI" 
                    description="AI assistant for employee engagement and insights." 
                    isNew={true}
                  />
                  
                  <FeatureCard 
                    icon={<FileText className="h-8 w-8" />}
                    title="Custom Reports" 
                    description="Generate detailed reports for stakeholders." 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="ai" className="space-y-8">
                <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                  Our advanced AI and LLM technologies power the insights and recommendations that make PulsePlace unique.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <FeatureCard 
                    icon={<Brain className="h-8 w-8" />}
                    title="LLM Powered Insights" 
                    description="Deep learning models that understand the nuances of workplace culture." 
                    isNew={true}
                  />
                  
                  <FeatureCard 
                    icon={<Zap className="h-8 w-8" />}
                    title="Trust Scoring" 
                    description="Proprietary algorithms that quantify workplace trust with precision." 
                  />
                  
                  <FeatureCard 
                    icon={<Cpu className="h-8 w-8" />}
                    title="Sentiment Analysis" 
                    description="Natural language processing that captures the true feeling behind feedback." 
                  />
                  
                  <FeatureCard 
                    icon={<Sparkles className="h-8 w-8" />}
                    title="Predictive Analytics" 
                    description="AI models that forecast culture trends before they impact performance." 
                    isNew={true}
                  />
                </div>
                
                <div className="mt-12 bg-gradient-to-r from-pulse-50 to-teal-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 text-center">The PulsePlace AI Difference</h3>
                  <p className="text-center mb-6">
                    Our AI doesn't just analyze data—it understands the complex dynamics of human relationships in the workplace.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center mb-3">
                        <Star className="h-5 w-5 text-pulse-600 mr-2" />
                        <h4 className="font-semibold">Trained on Workplace Data</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Models fine-tuned specifically for workplace culture dynamics
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center mb-3">
                        <Star className="h-5 w-5 text-pulse-600 mr-2" />
                        <h4 className="font-semibold">Contextual Understanding</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Analyzes feedback in the context of your specific industry and company size
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center mb-3">
                        <Star className="h-5 w-5 text-pulse-600 mr-2" />
                        <h4 className="font-semibold">Continuous Learning</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Models that improve with every interaction across our platform
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-8">
                <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                  Connect PulsePlace with your existing tools and workflows for a seamless experience.
                </p>
                
                <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <Globe className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold">HR Platforms</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Seamlessly connect with major HR software.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold">Communication Tools</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Integrate with Slack, Teams, and more.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold">Calendar Apps</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Schedule surveys and reports automatically.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <CreditCard className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold">SSO & Identity</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Secure login with your existing provider.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-10 flex justify-center">
                  <Link to="/contact">
                    <Button className="bg-pulse-gradient">
                      Request Custom Integration
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Technology Stack Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Technology Stack</h2>
            <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Built with cutting-edge technologies to ensure performance, security, and scalability.
            </p>
            
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Layers className="h-12 w-12 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center">Enterprise LLMs</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    State-of-the-art language models
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Brain className="h-12 w-12 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center">Neural Networks</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    Advanced pattern recognition
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Cpu className="h-12 w-12 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center">Cloud Computing</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    Scalable infrastructure
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Lock className="h-12 w-12 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center">Enterprise Security</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    SOC 2 compliant systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-pulse-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience PulsePlace?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our beta program today and be among the first to transform your workplace culture with AI.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/join-beta">
                <Button className="bg-white text-pulse-600 hover:bg-gray-100 transition-colors px-6">
                  Join the Beta
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 transition-colors px-6">
                  Contact Sales
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 max-w-lg mx-auto">
              <p className="text-sm text-white/80 mb-2">Special beta program for Tayana users</p>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="font-medium">Use code <span className="font-bold">TAYANA25</span> for priority access</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
