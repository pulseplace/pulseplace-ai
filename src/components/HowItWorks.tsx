
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Search, Compass, Award, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

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
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How PulsePlace Works</h2>
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

        <div className="mt-16 text-center">
          <div className="inline-block bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-pulse-600" />
                <span className="text-lg font-medium">Ready to improve workplace trust?</span>
              </div>
              <Button className="bg-pulse-gradient">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
