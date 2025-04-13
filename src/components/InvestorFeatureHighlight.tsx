
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Award, MessageCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const InvestorFeatureHighlight: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-12">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
          <Brain className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">AI-Powered Culture Intelligence</h3>
        <p className="text-gray-600">
          Real-time workplace insights. Certification-ready signals. One-click PulseBot summaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Feature 1 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold">Sentiment & Culture Scoring</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Trends, alerts, and team health metrics</p>
          
          {/* Mini chart */}
          <div className="h-8 w-full flex items-end space-x-0.5">
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
        </div>
        
        {/* Feature 2 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold">Certification Readiness</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">PulseScore eligibility and benchmarks</p>
          
          {/* Progress bar */}
          <div className="bg-gray-200 h-8 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-full rounded-full" style={{ width: '78%' }}>
              <div className="flex h-full items-center justify-end pr-4">
                <span className="text-white text-xs font-medium">78%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold">PulseBot AI Chat</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Instant Q&A with team-level insights</p>
          
          {/* Chat bubbles */}
          <div className="space-y-1.5">
            <div className="bg-gray-200 p-1.5 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-xs">Team trust score?</p>
            </div>
            <div className="bg-blue-100 p-1.5 rounded-lg rounded-tr-none max-w-[80%] ml-auto text-blue-800">
              <p className="text-xs">Up 12% this quarter</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Link to="/investor-demo">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
            View AI Demo <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InvestorFeatureHighlight;
