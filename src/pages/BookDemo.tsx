
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-toastify';

// Define the window interface to include Calendly
declare global {
  interface Window {
    Calendly?: any;
  }
}

const BookDemo = () => {
  const [isBooked, setIsBooked] = useState(false);

  // Load Calendly script and set up event listener
  useEffect(() => {
    // Create and load the Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Set up event listener for booking confirmation
    const handleMessage = async (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        setIsBooked(true);
        
        try {
          // Log the booking to our Supabase function
          const { error } = await supabase.functions.invoke('log-booking', {
            body: e.data,
          });
          
          if (error) {
            console.error('Error logging booking:', error);
          }
        } catch (err) {
          console.error('Failed to log booking:', err);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Clean up
      document.body.removeChild(script);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Book a Demo | PulsePlace.ai</title>
        <meta 
          name="description" 
          content="Schedule a personalized walkthrough of PulsePlace™ and explore how workplace certification works." 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
              Book a Demo
            </h1>
            
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Schedule a personalized walkthrough of PulsePlace™ and explore how workplace certification works.
            </p>
            
            <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Let's Talk Culture
            </h2>
            
            {/* Calendly Widget with pulse animation */}
            <motion.div 
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2,
                repeat: 0,
                ease: "easeOut"
              }}
              className="shadow-xl rounded-lg overflow-hidden border border-gray-200"
            >
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/vishal-pulseplace/30min" 
                style={{ minWidth: "320px", height: "700px" }}
              ></div>
            </motion.div>
            
            {/* Booking confirmation message */}
            {isBooked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 p-4 rounded-md border border-green-300 bg-green-50 text-green-900 text-center"
              >
                <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
                <p>We're excited to show you around PulsePlace. You'll receive a confirmation email shortly.</p>
              </motion.div>
            )}
            
            <div className="mt-8 text-center">
              <p className="flex items-center justify-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-pulse-500" />
                Can't find a slot? Email us at <a href="mailto:hello@pulseplace.ai" className="ml-1 text-pulse-600 hover:text-pulse-700 font-medium">hello@pulseplace.ai</a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BookDemo;
