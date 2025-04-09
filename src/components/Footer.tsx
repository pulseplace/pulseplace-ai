
import React from 'react';
import { Github, Twitter, Linkedin, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button } from '@/components/ui/button';

const Footer = () => {
  // Helper function for smooth scrolling with hash links
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">PulsePlace.ai</h2>
            <p className="mb-4 max-w-md">
              Redefining what it means to be a 'Best Place to Work' through AI-powered tools and insights.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/pulseplace" className="hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://x.com/PulsePlaceAi" className="hover:text-white transition-colors" aria-label="X (Twitter)">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/pulseplaceai/" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:hello@pulseplace.ai" className="hover:text-white transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/certification" className="hover:text-white transition-colors">Certification</Link></li>
              <li><Link to="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/join-beta" className="hover:text-white transition-colors">Join Beta</Link></li>
              <li><Link to="/book-demo" className="hover:text-white transition-colors flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Book a Demo
              </Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><HashLink to="/#join-beta" scroll={scrollWithOffset} className="hover:text-white transition-colors">Request Demo</HashLink></li>
              <li><Link to="/join-beta" className="hover:text-white transition-colors">Join Beta</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
            
            <div className="mt-6">
              <Link to="/book-demo">
                <Button 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} PulsePlace.ai. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
