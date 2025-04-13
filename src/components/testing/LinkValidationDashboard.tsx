
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link, CheckCircle2, XCircle, ExternalLink, FileText, Download } from 'lucide-react';
import { 
  validateAllLinks, 
  runLinkValidation, 
  generateLinkValidationReport,
  LinkValidationResult,
  getFixSuggestions
} from '@/utils/linkValidation';
import { Progress } from "@/components/ui/progress";
import ValidationButton from './ValidationButton';
import { toast } from '@/components/ui/use-toast';

// Mock audit functions that would be implemented in your auditAndTesting utility
const auditChecklist = {
  linkValidation: {
    title: "Link Validation",
    items: [
      { description: "All navigation links working", completed: false },
      { description: "All feature card links working", completed: false },
      { description: "All footer links working", completed: false },
      { description: "All CTA button links working", completed: false },
      { description: "All external links have proper attributes", completed: false },
    ],
    runTests: () => ({ success: true, message: "Tests completed" })
  },
  accessibilityChecks: {
    title: "Accessibility",
    items: [
      { description: "All images have alt text", completed: true },
      { description: "Proper heading hierarchy", completed: true },
      { description: "Sufficient color contrast", completed: false },
      { description: "Keyboard navigation working", completed: true },
      { description: "ARIA attributes properly used", completed: false },
    ],
    runTests: () => ({ success: true, message: "Tests completed" })
  },
  responsiveDesign: {
    title: "Responsive Design",
    items: [
      { description: "Displays correctly on mobile", completed: true },
      { description: "Displays correctly on tablet", completed: true },
      { description: "Displays correctly on desktop", completed: true },
      { description: "No horizontal overflow", completed: false },
      { description: "Touch targets adequately sized", completed: true },
    ],
    runTests: () => ({ success: true, message: "Tests completed" })
  }
};

const quickAudit = () => {
  return {
    validationScore: 85,
    accessibilityScore: 92,
    performanceScore: 78,
    seoScore: 88
  };
};

const generateTestReport = () => {
  return "# Test Report\n\nGenerated automatically";
};

const LinkValidationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('links');
  const [results, setResults] = useState<LinkValidationResult[]>([]);
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [reportText, setReportText] = useState('');
  const [showReport, setShowReport] = useState(false);
  
  const handleValidateLinks = async () => {
    setLoading(true);
    try {
      const validationResults = await runLinkValidation();
      setResults(validationResults);
      setLastRunTime(new Date());
      
      toast({
        title: "Link Validation Complete",
        description: `Checked ${validationResults.length} links across the site.`
      });
    } catch (error) {
      console.error('Error validating links:', error);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "An error occurred during link validation."
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateReport = () => {
    const report = generateLinkValidationReport();
    setReportText(report);
    setShowReport(true);
    
    toast({
      title: "Report Generated",
      description: "Link validation report has been generated."
    });
  };
  
  const handleDownloadReport = () => {
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `link-validation-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded."
    });
  };
  
  // Load initial results
  useEffect(() => {
    const initialResults = validateAllLinks();
    setResults(initialResults);
  }, []);
  
  // Calculate statistics
  const totalLinks = results.length;
  const validLinks = results.filter(r => r.isValid).length;
  const invalidLinks = results.filter(r => !r.isValid).length;
  const validPercentage = totalLinks > 0 ? Math.round((validLinks / totalLinks) * 100) : 0;
  
  // Group results by source
  const resultsBySource = results.reduce((acc, result) => {
    const source = result.source;
    if (!acc[source]) {
      acc[source] = [];
    }
    acc[source].push(result);
    return acc;
  }, {} as Record<string, LinkValidationResult[]>);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Link Validation Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor and fix broken links across your site
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleGenerateReport}
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          <Button 
            onClick={handleValidateLinks}
            disabled={loading}
            className="bg-pulse-gradient hover:opacity-90"
          >
            {loading ? (
              <>
                <Link className="h-4 w-4 mr-2 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <Link className="h-4 w-4 mr-2" />
                Validate All Links
              </>
            )}
          </Button>
        </div>
      </div>
      
      {lastRunTime && (
        <p className="text-sm text-gray-500 mb-4">
          Last validation run: {lastRunTime.toLocaleString()}
        </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Links</p>
                <p className="text-3xl font-bold">{totalLinks}</p>
              </div>
              <Link className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Valid Links</p>
                <p className="text-3xl font-bold text-green-600">{validLinks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Invalid Links</p>
                <p className="text-3xl font-bold text-red-600">{invalidLinks}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Link Validation Progress</span>
              <span className="text-sm font-medium">{validPercentage}%</span>
            </div>
            <Progress value={validPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {Object.entries(resultsBySource).map(([source, links]) => {
              const sourceValidLinks = links.filter(l => l.isValid).length;
              const sourcePercentage = Math.round((sourceValidLinks / links.length) * 100);
              
              return (
                <div key={source} className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium">{source}</span>
                    <span className="text-xs">{sourceValidLinks}/{links.length}</span>
                  </div>
                  <Progress value={sourcePercentage} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="links" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="links">All Links</TabsTrigger>
          <TabsTrigger value="invalid">Invalid Links</TabsTrigger>
          <TabsTrigger value="audit">Audit Checklist</TabsTrigger>
          <TabsTrigger value="beta-readiness">Beta Launch Readiness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>All Links</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of all links in the application.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, i) => (
                    <TableRow key={`${result.path}-${i}`}>
                      <TableCell className="font-medium">{result.path}</TableCell>
                      <TableCell>{result.label || 'Unlabeled'}</TableCell>
                      <TableCell>{result.source}</TableCell>
                      <TableCell>
                        {result.isValid ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Valid
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Invalid
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <a 
                          href={result.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Test
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invalid">
          <Card>
            <CardHeader>
              <CardTitle>Invalid Links</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of all invalid links in the application.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Suggestion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.filter(r => !r.isValid).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No invalid links found. Great job!
                      </TableCell>
                    </TableRow>
                  ) : (
                    results.filter(r => !r.isValid).map((result, i) => (
                      <TableRow key={`invalid-${result.path}-${i}`}>
                        <TableCell className="font-medium">{result.path}</TableCell>
                        <TableCell>{result.label || 'Unlabeled'}</TableCell>
                        <TableCell>{result.source}</TableCell>
                        <TableCell>{getFixSuggestions(result.path)}</TableCell>
                        <TableCell className="text-right">
                          <a 
                            href={result.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Test
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {Object.entries(auditChecklist).map(([key, audit]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">{audit.title}</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          const result = audit.runTests();
                          console.log(result);
                          toast({
                            title: `${audit.title} Tests`,
                            description: "Tests completed successfully.",
                          });
                        }}
                      >
                        Run Tests
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {audit.items.map((item, i) => (
                        <div key={i} className="flex items-center py-1 border-b last:border-0">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                            item.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {item.completed ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">{i + 1}</span>
                            )}
                          </div>
                          <span className={item.completed ? 'text-gray-400 line-through' : ''}>
                            {item.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="beta-readiness">
          <Card>
            <CardHeader>
              <CardTitle>Beta Launch Readiness Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Project Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <h4 className="font-medium mb-2 text-gray-600">Core Features</h4>
                    <p className="text-2xl font-bold">85%</p>
                    <Progress value={85} className="h-2 mt-2" />
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <h4 className="font-medium mb-2 text-gray-600">UI Polish</h4>
                    <p className="text-2xl font-bold">92%</p>
                    <Progress value={92} className="h-2 mt-2" />
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <h4 className="font-medium mb-2 text-gray-600">Testing Coverage</h4>
                    <p className="text-2xl font-bold">78%</p>
                    <Progress value={78} className="h-2 mt-2" />
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Beta Launch Task Completion</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Area</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Core Features Implementation</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={85} className="h-2 w-20 mr-2" />
                          <span>85%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          In Progress
                        </Badge>
                      </TableCell>
                      <TableCell>Final AI engine integration pending</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">User Authentication</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={100} className="h-2 w-20 mr-2" />
                          <span>100%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Complete
                        </Badge>
                      </TableCell>
                      <TableCell>Includes email/password and social auth</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dashboard Implementation</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={90} className="h-2 w-20 mr-2" />
                          <span>90%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          In Progress
                        </Badge>
                      </TableCell>
                      <TableCell>Advanced analytics pending final review</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Navigation & Site Structure</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={95} className="h-2 w-20 mr-2" />
                          <span>95%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Near Complete
                        </Badge>
                      </TableCell>
                      <TableCell>Final link validation in progress</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Action Items</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Update all broken links identified in the validation report</li>
                  <li>Fix the Features page navigation to ensure proper routing</li>
                  <li>Ensure all CTAs redirect to their intended destinations</li>
                  <li>Implement remaining UI polish items before beta launch</li>
                  <li>Complete final testing of all navigation paths</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {showReport && (
        <div className="mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Link Validation Report</CardTitle>
              <Button onClick={handleDownloadReport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[400px] text-sm whitespace-pre-wrap">
                {reportText}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LinkValidationDashboard;
