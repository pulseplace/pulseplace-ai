
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import MetaTags from "@/components/MetaTags";

const InvestorDeck = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <MetaTags
        title="Investor Deck | PulsePlace.ai"
        description="Download our investor deck to learn more about our AI-powered workplace trust platform."
      />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Investor Deck</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn more about our vision, market opportunity, and product roadmap
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">PulsePlace.ai Pitch Deck</h2>
            <p className="text-gray-700 mb-6">
              Get an in-depth look at our mission to quantify and improve workplace trust with AI-powered analytics and certification.
            </p>
            
            {user ? (
              <Link to="/pitch-deck-request">
                <Button size="lg" className="bg-pulse-600 hover:bg-pulse-700">
                  <FileText className="mr-2 h-5 w-5" />
                  Request Access
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-pulse-600 hover:bg-pulse-700">
                  <Lock className="mr-2 h-5 w-5" />
                  Sign in to Request Access
                </Button>
              </Link>
            )}
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 transition-transform hover:rotate-0">
              <img 
                src="/lovable-uploads/802f6b9e-42e3-4397-ba07-c035bd53a988.png" 
                alt="Pitch Deck Preview" 
                className="w-full h-auto max-w-md rounded border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Are you an investor interested in learning more about PulsePlace.ai?
        </p>
        <Link to="/contact">
          <Button variant="outline" size="lg">
            Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InvestorDeck;
