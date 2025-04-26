
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import Navbar from '@/components/navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Award, Download, ArrowRight } from 'lucide-react';

const PulseScoreThankYou = () => {
  const location = useLocation();
  const { pulseScore, categoryScores, isCertificationEligible } = 
    location.state || { pulseScore: 0, categoryScores: [], isCertificationEligible: false };

  // Get score tier
  const getScoreTier = (score: number) => {
    if (score >= 85) return { name: "Thriving", color: "text-green-600" };
    if (score >= 70) return { name: "Stable", color: "text-blue-600" };
    if (score >= 50) return { name: "At Risk", color: "text-amber-600" };
    return { name: "Critical", color: "text-red-600" };
  };

  const scoreTier = getScoreTier(pulseScore);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pulse-50 to-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Thank You for Completing the PulseScore™
          </h1>
          <p className="text-lg text-gray-600">
            Your feedback helps measure and improve workplace culture.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-8">
          <div className="text-center">
            <div className="inline-block p-3 bg-gray-100 rounded-full mb-6">
              <Award className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Workplace Culture is</h2>
            <div className="flex justify-center mb-6">
              <span className={`text-3xl font-bold px-4 py-2 rounded-md ${scoreTier.color}`}>
                {scoreTier.name}
              </span>
            </div>
            <div className="flex justify-center items-center mb-8">
              <div className="text-center">
                <span className="block text-4xl font-bold">{pulseScore}</span>
                <span className="text-sm text-gray-500">PulseScore™</span>
              </div>
            </div>

            {isCertificationEligible ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  You May Qualify for Pulse Certified™
                </h3>
                <p className="text-green-700 mb-4">
                  Your workplace shows strong culture metrics. Unlock the full certification to showcase your commitment to workplace trust.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    size="lg"
                  >
                    <Award className="h-4 w-4" />
                    Unlock Full Certification
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50 flex items-center gap-2"
                    size="lg"
                  >
                    <Download className="h-4 w-4" />
                    Download Badge
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  Room for Improvement
                </h3>
                <p className="text-amber-700 mb-4">
                  Your PulseScore™ shows opportunities to strengthen your workplace culture. Get a personalized improvement plan.
                </p>
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                  size="lg"
                >
                  Get Improvement Plan
                </Button>
              </div>
            )}
            
            <div className="border-t pt-6 mt-6">
              <p className="text-gray-600 mb-4">
                Ready to explore more insights about your workplace culture?
              </p>
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  View Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PulseScoreThankYou;
