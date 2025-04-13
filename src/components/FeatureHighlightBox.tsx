
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Award, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureHighlightBox: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Culture Intelligence
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time workplace insights. Certification-ready signals. One-click PulseBot summaries.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Feature 1: Sentiment & Culture Scoring */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Sentiment & Culture Scoring</h3>
            </div>
            <p className="text-gray-600 mb-4">Trends, alerts, and team health metrics to help you understand your workplace culture.</p>
            
            {/* Mini chart visualization */}
            <div className="h-12 w-full flex items-end space-x-1 mt-4 mb-2">
              {[30, 45, 35, 60, 55, 75, 70, 90, 85].map((height, index) => (
                <div
                  key={index}
                  className="h-full flex-1"
                  style={{ display: 'flex', alignItems: 'flex-end' }}
                >
                  <div
                    className={`w-full rounded-t-sm ${index % 2 === 0 ? 'bg-blue-500' : 'bg-teal-500'}`}
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-right">PulseScore™ trend, last 9 months</p>
          </motion.div>

          {/* Feature 2: Certification Readiness */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Certification Readiness</h3>
            </div>
            <p className="text-gray-600 mb-4">PulseScore eligibility and benchmarks to achieve workplace certification.</p>
            
            {/* Certification visualization */}
            <div className="bg-gray-100 h-12 rounded-full overflow-hidden mt-4 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-full rounded-full" style={{ width: '78%' }}>
                <div className="flex h-full items-center justify-end pr-4">
                  <span className="text-white text-sm font-medium">78%</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-right">Certification readiness status</p>
          </motion.div>

          {/* Feature 3: PulseBot AI Chat */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">PulseBot AI Chat</h3>
            </div>
            <p className="text-gray-600 mb-4">Instant Q&A with embedded team-level insights powered by AI.</p>
            
            {/* Chat visualization */}
            <div className="mt-4 mb-2 space-y-2">
              <div className="bg-gray-100 p-2 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">How is our team's trust score trending?</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg rounded-tr-none max-w-[80%] ml-auto text-blue-800">
                <p className="text-sm">Trust metrics improved 12% this quarter across all departments.</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-right">PulseBot conversation sample</p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link to="/insights">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 px-6 py-6 h-auto">
                <Brain className="mr-2 h-5 w-5" />
                Explore AI Insights
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/pulsebot">
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-6 h-auto">
                <MessageCircle className="mr-2 h-5 w-5" />
                Try PulseBot Live
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlightBox;
