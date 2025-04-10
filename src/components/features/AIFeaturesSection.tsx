
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ChartBar, LineChart, MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const AIFeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pulse-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI-Powered Intelligence
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our advanced AI engine transforms workplace feedback into actionable insights for meaningful culture change.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-gray-100 hover:border-pulse-300 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <div className="bg-pulse-100 p-3 rounded-full w-fit mb-6">
                  <Brain className="h-6 w-6 text-pulse-600" />
                </div>
                <CardTitle className="mb-3">Sentiment Analysis</CardTitle>
                <CardDescription className="text-base flex-grow">
                  Our AI analyzes text responses to identify emotional tones, satisfaction levels, and emerging patterns across teams and departments.
                </CardDescription>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <Link to="/ai-engine">
                    <Button variant="ghost" className="text-pulse-600 hover:text-pulse-700 p-0 hover:bg-transparent">
                      Learn more <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-gray-100 hover:border-pulse-300 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <div className="bg-teal-100 p-3 rounded-full w-fit mb-6">
                  <ChartBar className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="mb-3">Comparative Benchmarking</CardTitle>
                <CardDescription className="text-base flex-grow">
                  Compare your organization against industry peers with AI-powered contextual scoring that accounts for company size, structure, and sector.
                </CardDescription>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <Link to="/dashboard-preview">
                    <Button variant="ghost" className="text-teal-600 hover:text-teal-700 p-0 hover:bg-transparent">
                      View demo <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-gray-100 hover:border-pulse-300 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <div className="bg-pulse-100 p-3 rounded-full w-fit mb-6">
                  <MessageCircle className="h-6 w-6 text-pulse-600" />
                </div>
                <CardTitle className="mb-3">PulseBot AI Assistant</CardTitle>
                <CardDescription className="text-base flex-grow">
                  Our conversational AI assistant answers questions about workplace culture, gathers feedback, and provides real-time insights.
                </CardDescription>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <Link to="/pulsebot">
                    <Button variant="ghost" className="text-pulse-600 hover:text-pulse-700 p-0 hover:bg-transparent">
                      Chat with PulseBot <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
