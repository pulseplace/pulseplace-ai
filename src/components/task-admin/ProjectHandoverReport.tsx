
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { FileText, Download, CheckCircle, Clock, AlertTriangle, X } from 'lucide-react';
import ValidationButton from '@/components/testing/ValidationButton';
import CultureCompass from '@/components/analytics/CultureCompass';
import { generateCultureCompass } from '@/utils/aiAnalytics';

// Sample culture data for demonstration
const sampleCultureData = [
  { category: 'Psychological Safety', score: 82, benchmark: 75 },
  { category: 'Communication', score: 68, benchmark: 72 },
  { category: 'Trust in Leadership', score: 75, benchmark: 70 },
  { category: 'Growth & Development', score: 63, benchmark: 68 },
  { category: 'Team Collaboration', score: 79, benchmark: 73 },
  { category: 'Work-Life Balance', score: 71, benchmark: 65 }
];

// Generate the culture compass
const cultureCompass = generateCultureCompass(sampleCultureData);

const ProjectHandoverReport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Project Handover Report</h1>
          <p className="text-gray-600">PulsePlace.ai Beta Launch Preparation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <ValidationButton variant="text" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Overall Completion</h3>
          <div className="text-3xl font-bold mb-1">87%</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{width: '87%'}}></div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Target Launch Date</h3>
          <div className="text-3xl font-bold mb-1">April 21, 2025</div>
          <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
            8 days remaining
          </Badge>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">AI Integration</h3>
          <div className="text-3xl font-bold mb-1">85%</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="critical-path">
        <TabsList className="mb-4">
          <TabsTrigger value="critical-path">Critical Path</TabsTrigger>
          <TabsTrigger value="completion">Completion Status</TabsTrigger>
          <TabsTrigger value="ai-integration">AI Integration</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="critical-path" className="space-y-4">
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Complete link validation</div>
                    <div className="text-sm text-gray-500">All internal and external links</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jordan Lee</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Finalize AI analytics dashboard</div>
                    <div className="text-sm text-gray-500">All visuals and insights panels</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 16</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Morgan Chen</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Complete cross-browser testing</div>
                    <div className="text-sm text-gray-500">Chrome, Firefox, Safari, Edge</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 18</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Taylor Wong</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Complete AI engine integration</div>
                    <div className="text-sm text-gray-500">Real-time insights and PulseBot</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 19</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alex Rivera</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="completion" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
              <h3 className="text-base font-medium">Feature Implementation</h3>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Core features</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Dashboard</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Navigation & site structure</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Responsive design</span>
                  <span className="text-sm font-medium">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '96%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-base font-medium mb-3">Launch Preparation Checklist</h3>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Beta user selection complete</p>
                    <p className="text-xs text-gray-500">25 organizations confirmed</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Onboarding documentation</p>
                    <p className="text-xs text-gray-500">User guides, FAQs, and support info</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bug triage and prioritization</p>
                    <p className="text-xs text-gray-500">17 issues identified, 12 resolved</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <X className="h-5 w-5 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Final performance testing</p>
                    <p className="text-xs text-gray-500">Load and stress testing</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <X className="h-5 w-5 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Launch communications prepared</p>
                    <p className="text-xs text-gray-500">Email templates and social media</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-integration" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-base font-medium mb-3">AI Integration Status</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">Sentiment Analysis Pipeline</span>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">Near Complete</Badge>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '88%'}}></div>
                    </div>
                    <p className="text-sm text-gray-600">Text and survey response analysis with theme extraction</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">PulseBot Implementation</span>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">Near Complete</Badge>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <p className="text-sm text-gray-600">Chatbot interface for insights with follow-up suggestions</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">Real-time Insights Engine</span>
                        <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>
                      </div>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '82%'}}></div>
                    </div>
                    <p className="text-sm text-gray-600">Realtime culture trends and predictive analytics</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">Culture Compass Implementation</span>
                        <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">Complete</Badge>
                      </div>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{width: '100%'}}></div>
                    </div>
                    <p className="text-sm text-gray-600">Multidimensional culture analysis with benchmarks</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button asChild>
                    <Link to="/features/ai-engine">
                      View Detailed AI Status
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-base font-medium mb-1">AI Integration Timeline</h3>
                <p className="text-sm text-gray-600 mb-3">Key milestones for AI engine deployment</p>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-gray-800">Base LLM Integration (Mar 28)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-gray-800">Sentiment Pipeline (Apr 5)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="text-gray-800">Real-time Insights (Apr 15)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-gray-800">Final Deployment (Apr 21)</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex-1">
                <CultureCompass {...cultureCompass} />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="risks" className="space-y-4">
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likelihood</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitigation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">AI Engine Integration Delays</div>
                    <div className="text-sm text-gray-500">Real-time processing challenges</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Fallback to simplified version with pre-computed insights if real-time processing isn't ready
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">Performance Issues at Scale</div>
                    <div className="text-sm text-gray-500">Dashboard loading times</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Implement data caching and lazy loading of dashboard components
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">Browser Compatibility</div>
                    <div className="text-sm text-gray-500">Safari rendering issues</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Schedule additional Safari testing and browser-specific fixes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">Beta User Adoption</div>
                    <div className="text-sm text-gray-500">Engagement with new features</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Create interactive tutorials and improved onboarding flows
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" asChild>
          <Link to="/task-summary">
            <FileText className="mr-2 h-4 w-4" />
            View Task Summary
          </Link>
        </Button>
        
        <Button asChild>
          <Link to="/features/ai-engine">
            View AI Engine Status
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectHandoverReport;
