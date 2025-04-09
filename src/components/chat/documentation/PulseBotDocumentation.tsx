
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Search, Globe, ThumbsUp, Bot, Info, Download } from 'lucide-react';

interface PulseBotDocumentationProps {
  open: boolean;
  onClose: () => void;
}

export const PulseBotDocumentation: React.FC<PulseBotDocumentationProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Bot className="h-6 w-6 text-pulse-600" />
            PulseBot Documentation
          </DialogTitle>
          <DialogDescription>
            A comprehensive guide to using PulseBot - your AI assistant for workplace culture insights
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            <TabsTrigger value="developers">For Developers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">What is PulseBot?</h3>
              <p>
                PulseBot is an AI assistant designed to help organizations understand, measure, and improve their workplace culture. 
                It provides insights on employee engagement, culture surveys, PulseScore metrics, and certification processes.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Key Capabilities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pulse-100 p-2 rounded-full">
                      <MessageCircle className="h-5 w-5 text-pulse-600" />
                    </div>
                    <h4 className="font-medium">Culture Insights</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get answers about workplace culture best practices, survey methodologies, and industry benchmarks.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pulse-100 p-2 rounded-full">
                      <Info className="h-5 w-5 text-pulse-600" />
                    </div>
                    <h4 className="font-medium">PulseScore Guidance</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Learn how PulseScore is calculated, what it means, and how to improve your organization's score.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pulse-100 p-2 rounded-full">
                      <Bot className="h-5 w-5 text-pulse-600" />
                    </div>
                    <h4 className="font-medium">Platform Navigation</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ask for help with any feature in the PulsePlace platform - from surveys to reports to certification.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pulse-100 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-pulse-600" />
                    </div>
                    <h4 className="font-medium">Multilingual Support</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Communicate with PulseBot in multiple languages for global team support.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Chat Features</h3>
              
              <div className="border-l-4 border-pulse-600 pl-4 py-2">
                <h4 className="font-medium flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Conversational Interface
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Ask questions in natural language just like you would ask a human expert. PulseBot understands context and maintains conversation history.
                </p>
              </div>
              
              <div className="border-l-4 border-pulse-600 pl-4 py-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search Functionality
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Search within your conversation history to quickly find previous answers and information.
                </p>
                <div className="bg-gray-50 p-2 rounded mt-2 text-xs">
                  <strong>Tip:</strong> Use specific keywords for better search results, such as "certification" or "survey".
                </div>
              </div>
              
              <div className="border-l-4 border-pulse-600 pl-4 py-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language Options
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Switch between multiple languages to communicate with PulseBot in your preferred language.
                </p>
                <div className="bg-gray-50 p-2 rounded mt-2 text-xs">
                  <strong>Supported languages:</strong> English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean
                </div>
              </div>
              
              <div className="border-l-4 border-pulse-600 pl-4 py-2">
                <h4 className="font-medium flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Feedback System
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Provide feedback on PulseBot's responses to help improve future interactions.
                </p>
              </div>
              
              <div className="border-l-4 border-pulse-600 pl-4 py-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Conversations
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Export your chat history in JSON or PDF format for record-keeping or sharing.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium mb-2">Privacy Commitment</h3>
              <p>
                PulseBot is designed with privacy and security at its core. Your conversations and data are treated according to our privacy policy.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Handling</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Chat Data Storage</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Conversations are stored securely in your organization's account to provide conversation history and allow for improvements to the system.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Data Retention</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    You can clear your chat history at any time using the "Clear History" option in the menu.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Usage Analytics</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Anonymous usage data may be collected to improve PulseBot's functionality. This never includes the specific content of your conversations.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="text-lg font-medium mb-2">Common Issues & Solutions</h3>
              <p>
                If you're experiencing problems with PulseBot, try these troubleshooting steps.
              </p>
            </div>

            <div className="divide-y">
              <div className="py-3">
                <h4 className="font-medium">PulseBot isn't responding</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Try refreshing your browser or checking your internet connection. If the issue persists, contact support.
                </p>
              </div>
              
              <div className="py-3">
                <h4 className="font-medium">Responses are slow</h4>
                <p className="text-sm text-gray-600 mt-1">
                  During peak usage times, responses may take longer. Complex questions also require more processing time.
                </p>
              </div>
              
              <div className="py-3">
                <h4 className="font-medium">PulseBot doesn't understand my question</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Try rephrasing your question to be more specific or breaking it into smaller parts.
                </p>
              </div>
              
              <div className="py-3">
                <h4 className="font-medium">Browser compatibility issues</h4>
                <p className="text-sm text-gray-600 mt-1">
                  PulseBot works best on modern browsers. We recommend using the latest version of Chrome, Firefox, Safari, or Edge.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="developers" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Developer Information</h3>
              <p>
                Information for developers integrating with PulseBot or customizing its functionality.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Technical Specifications</h3>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Architecture</h4>
                <p className="text-sm text-gray-600 mt-1">
                  PulseBot uses a combination of large language models and specialized knowledge bases to provide accurate
                  responses about workplace culture, employee engagement, and the PulsePlace platform.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Integration Capabilities</h4>
                <p className="text-sm text-gray-600 mt-1">
                  PulseBot can be integrated with your existing communication platforms. Contact your account manager for details on integration options.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Customization</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Enterprise customers can customize PulseBot with organization-specific information and terminology. This requires setting up a custom knowledge base.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close Documentation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
