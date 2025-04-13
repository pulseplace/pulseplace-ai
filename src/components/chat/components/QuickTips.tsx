
import React, { useState, useEffect } from 'react';
import { X, HelpCircle, MessageSquare, Bot, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const samplePrompts = [
  "What trust metrics do you track?",
  "How can I improve team collaboration?",
  "Generate a quick report on employee retention",
  "What's a good survey response rate?",
  "Show me insights from our latest data",
  "How does the certification process work?"
];

interface QuickTipsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const QuickTips: React.FC<QuickTipsProps> = ({ onSelectPrompt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show tips when chat opens for the first time
  useEffect(() => {
    // Check if this is the first time we're showing tips
    const tipsShown = localStorage.getItem('pulsebot_tips_shown');
    
    if (!tipsShown && !hasBeenShown) {
      // Delay showing tips slightly to let chat animation complete
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
        localStorage.setItem('pulsebot_tips_shown', 'true');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasBeenShown]);

  const handleSelectPrompt = (prompt: string) => {
    onSelectPrompt(prompt);
    setIsVisible(false);
    setHasInteracted(true);
  };

  const toggleTips = () => {
    setIsVisible(!isVisible);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Tips Toggle Button */}
      <button
        onClick={toggleTips}
        className="absolute right-4 top-4 z-10 p-1 rounded-full text-gray-500 hover:text-pulse-600 hover:bg-gray-100 transition-colors"
        aria-label="Show Quick Tips"
      >
        <HelpCircle className="h-5 w-5" />
      </button>
      
      {/* Quick Tips Popover */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-12 z-20 bg-white rounded-lg shadow-lg border border-gray-200 w-72 max-w-[calc(100%-2rem)]"
          >
            <div className="p-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-sm flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-pulse-600" />
                What can I ask PulseBot?
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close Quick Tips"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-3">
              <p className="text-xs text-gray-500 mb-2">
                Try these sample prompts or ask anything about workplace trust, surveys, or the PulsePlace platform:
              </p>
              
              <ul className="space-y-2 mb-3">
                {samplePrompts.map((prompt, index) => (
                  <li key={index}>
                    <button
                      className="text-xs w-full text-left px-2 py-1.5 rounded hover:bg-pulse-50 text-gray-700 hover:text-pulse-700 flex items-center gap-1.5 transition-colors"
                      onClick={() => handleSelectPrompt(prompt)}
                    >
                      <Command className="h-3 w-3 text-pulse-400" />
                      {prompt}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Demo Mode Toggle */}
              <div className="text-xs text-center text-gray-500 pt-2 border-t border-gray-100">
                <button 
                  className="text-pulse-600 hover:text-pulse-800 hover:underline transition-colors"
                  onClick={() => {
                    setIsVisible(false);
                    // This would trigger demo mode in a real implementation
                    window.localStorage.setItem('pulsebot_demo_mode', 'true');
                    window.location.reload();
                  }}
                >
                  Reset to Demo Mode
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* First-time use animation */}
      {!hasInteracted && !isVisible && hasBeenShown && (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ 
            repeat: 2,
            repeatType: "reverse",
            duration: 1,
            repeatDelay: 1
          }}
          className="absolute right-4 top-4 z-5 bg-pulse-100 rounded-full h-10 w-10 pointer-events-none"
        />
      )}
    </>
  );
};
