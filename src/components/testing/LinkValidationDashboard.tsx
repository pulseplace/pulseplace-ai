
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
  LinkValidationResult
} from '@/utils/linkValidation';
import { 
  auditChecklist, 
  quickAudit, 
  generateTestReport 
} from '@/utils/auditAndTesting';
import { Progress } from "@/components/ui/progress";
import ValidationButton from './ValidationButton';

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
    } catch (error) {
      console.error('Error validating links:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateReport = () => {
    const report = generateLinkValidationReport();
    setReportText(report);
    setShowReport(true);
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.filter(r => !r.isValid).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No invalid links found. Great job!
                      </TableCell>
                    </TableRow>
                  ) : (
                    results.filter(r => !r.isValid).map((result, i) => (
                      <TableRow key={`invalid-${result.path}-${i}`}>
                        <TableCell className="font-medium">{result.path}</TableCell>
                        <TableCell>{result.label || 'Unlabeled'}</TableCell>
                        <TableCell>{result.source}</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Responsive Design</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={96} className="h-2 w-20 mr-2" />
                          <span>96%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Near Complete
                        </Badge>
                      </TableCell>
                      <TableCell>Minor tablet breakpoint adjustments needed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Content & Messaging</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={82} className="h-2 w-20 mr-2" />
                          <span>82%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          In Progress
                        </Badge>
                      </TableCell>
                      <TableCell>Final review and polish underway</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Testing & QA</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={78} className="h-2 w-20 mr-2" />
                          <span>78%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          In Progress
                        </Badge>
                      </TableCell>
                      <TableCell>Integration tests and UX reviews ongoing</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Deployment Pipeline</TableCell>
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
                      <TableCell>CI/CD pipeline fully configured</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pitch Deck & Demo Materials</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={88} className="h-2 w-20 mr-2" />
                          <span>88%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          In Progress
                        </Badge>
                      </TableCell>
                      <TableCell>Financial projections being finalized</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Critical Path to Beta Launch</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Complete link validation across site</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
                      </TableCell>
                      <TableCell>In Progress</TableCell>
                      <TableCell>Dev Team</TableCell>
                      <TableCell>Apr 15, 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Finalize AI analytics dashboard</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
                      </TableCell>
                      <TableCell>In Progress</TableCell>
                      <TableCell>Data Science Team</TableCell>
                      <TableCell>Apr 18, 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Complete comprehensive cross-browser testing</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
                      </TableCell>
                      <TableCell>Not Started</TableCell>
                      <TableCell>QA Team</TableCell>
                      <TableCell>Apr 20, 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Update pricing tier information</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
                      </TableCell>
                      <TableCell>Not Started</TableCell>
                      <TableCell>Marketing</TableCell>
                      <TableCell>Apr 22, 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Complete onboarding flow optimizations</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
                      </TableCell>
                      <TableCell>In Progress</TableCell>
                      <TableCell>UX Team</TableCell>
                      <TableCell>Apr 25, 2025</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end gap-2 mt-8">
                <Button variant="outline" onClick={handleGenerateReport}>Generate Detailed Report</Button>
                <Button onClick={handleDownloadReport} disabled={!showReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {showReport && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Validation Report</span>
              <Button size="sm" variant="outline" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm overflow-auto max-h-96 font-mono">
              {reportText}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LinkValidationDashboard;
