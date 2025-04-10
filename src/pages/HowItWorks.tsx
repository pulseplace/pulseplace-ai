import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MetaTags from '@/components/MetaTags';
import { CheckCircle, ArrowRight, BarChart3, Search, Compass, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <Search className="h-10 w-10 text-pulse-600" />,
      title: "Assess Trust Metrics",
      description: "Measure trust factors across your organization using our scientifically-validated assessment tools."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-pulse-600" />,
      title: "Analyze Results",
      description: "Our AI engine analyzes response patterns to identify trust strengths and opportunities."
    },
    {
      icon: <Compass className="h-10 w-10 text-pulse-600" />,
      title: "Get Actionable Insights",
      description: "Receive personalized recommendations and strategies to improve trust metrics."
    },
    {
      icon: <Award className="h-10 w-10 text-pulse-600" />,
      title: "Earn Certification",
      description: "Achieve PulseScore™ certification to showcase your organization's commitment to trust."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <div className="min-h-screen">
      <MetaTags
        title="How It Works | PulsePlace.ai"
        description="Learn how PulsePlace helps you measure, track, and improve workplace trust through our simple 4-step process."
        keywords="workplace trust measurement, trust certification, AI insights, workplace analytics"
      />
      
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-pulse-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How PulsePlace Works</h1>
            <p className="text-xl text-gray-600 mb-8">
              Our simple, data-driven approach to measuring and improving workplace trust
            </p>
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our 4-Step Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple, effective approach to measuring and improving workplace trust
            </p>
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 relative">
                  <div className="h-20 w-20 rounded-full bg-pulse-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 hidden lg:block">
                    {index < steps.length - 1 && (
                      <ChevronRight className="h-8 w-8 text-gray-300" />
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* PulseScore Framework */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The PulseScore™ Framework</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our proprietary assessment methodology measures key dimensions of workplace trust
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Trust Dimensions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-pulse-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Psychological Safety</h4>
                      <p className="text-gray-600">How safe employees feel taking risks and being vulnerable</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-pulse-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Transparency</h4>
                      <p className="text-gray-600">Open communication and information-sharing practices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-pulse-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Reliability</h4>
                      <p className="text-gray-600">Consistency between words and actions across the organization</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Assessment Methods</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-pulse-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Pulse Surveys</h4>
                      <p className="text-gray-600">Regular, lightweight feedback from team members</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-pulse-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Leadership Assessments</h4>
                      <p className="text-gray-600">Evaluation of leadership behaviors that impact trust</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-pulse-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">AI-Powered Sentiment Analysis</h4>
                      <p className="text-gray-600">Advanced language processing to identify trust signals</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-pulse-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Workplace Trust?</h2>
            <p className="text-xl mb-8">
              Start measuring and improving trust metrics at your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-pulse-600 hover:bg-gray-100" asChild>
                <Link to="/join-beta">Join the Beta</Link>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20" asChild>
                <Link to="/demo">Book a Demo <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
