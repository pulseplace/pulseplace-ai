
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pulse-400 to-teal-400 bg-clip-text text-transparent mb-4">
              PulsePlace.ai
            </h2>
            <p className="text-gray-300 mb-4 max-w-md">
              Quantify, track, and improve workplace trust with AI-powered 
              analytics and certification.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://twitter.com/pulseplace" target="_blank" rel="noreferrer" 
                 className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com/company/pulseplace" target="_blank" rel="noreferrer"
                 className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://facebook.com/pulseplace" target="_blank" rel="noreferrer"
                 className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com/pulseplace" target="_blank" rel="noreferrer"
                 className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/certification" className="text-gray-300 hover:text-white transition-colors">
                  Certification
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-gray-300 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-gray-300 hover:text-white transition-colors">
                  Methodology
                </Link>
              </li>
              <li>
                <Link to="/pulsebot" className="text-gray-300 hover:text-white transition-colors">
                  PulseBot
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-300 hover:text-white transition-colors">
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/join-beta" className="text-gray-300 hover:text-white transition-colors">
                  Join Beta
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} PulsePlace.ai. All rights reserved.
          </p>
          <div className="text-sm text-gray-400">
            <span>Made with ❤️ for organizations that value trust.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
