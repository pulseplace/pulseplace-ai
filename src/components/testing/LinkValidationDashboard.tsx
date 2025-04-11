
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  runLinkValidation, 
  validateAllLinks, 
  generateLinkValidationReport, 
  type LinkValidationResult 
} from '@/utils/linkValidation';
import { Check, X, ClipboardCopy, Download } from 'lucide-react';
import { toast } from "sonner";

const LinkValidationDashboard: React.FC = () => {
  const [results, setResults] = useState<LinkValidationResult[]>([]);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  
  const handleRunValidation = () => {
    const validationResults = validateAllLinks();
    setResults(validationResults);
    setLastChecked(new Date().toLocaleString());
  };
  
  const handleCopyReport = () => {
    const report = generateLinkValidationReport();
    navigator.clipboard.writeText(report);
    toast.success('Report copied to clipboard');
  };
  
  const handleDownloadReport = () => {
    const report = generateLinkValidationReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `link-validation-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Report downloaded');
  };
  
  const validLinks = results.filter(result => result.isValid);
  const invalidLinks = results.filter(result => !result.isValid);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Link Validation Dashboard</h2>
      
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Links</CardTitle>
            <CardDescription>All application links</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{results.length || '-'}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Valid Links</CardTitle>
            <CardDescription>Links that resolve correctly</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <p className="text-3xl font-bold text-green-600">{validLinks.length || '-'}</p>
            {validLinks.length > 0 && <Check className="h-5 w-5 text-green-600" />}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Invalid Links</CardTitle>
            <CardDescription>Links that need attention</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <p className="text-3xl font-bold text-red-600">{invalidLinks.length || '-'}</p>
            {invalidLinks.length > 0 && <X className="h-5 w-5 text-red-600" />}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Last Checked</CardTitle>
            <CardDescription>Date and time of validation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{lastChecked || 'Not checked yet'}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex gap-4 mb-8">
        <Button onClick={handleRunValidation} className="bg-pulse-gradient">
          Run Link Validation
        </Button>
        <Button variant="outline" onClick={handleCopyReport} disabled={results.length === 0}>
          <ClipboardCopy className="mr-2 h-4 w-4" />
          Copy Report
        </Button>
        <Button variant="outline" onClick={handleDownloadReport} disabled={results.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
      
      {results.length > 0 && (
        <>
          <h3 className="text-xl font-bold mb-4">Invalid Links</h3>
          {invalidLinks.length === 0 ? (
            <p className="text-green-600 mb-8">No invalid links found!</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Label
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Path
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invalidLinks.map((link, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {link.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {link.label || 'Unlabeled'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        {link.path}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-4">All Validated Links</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Label
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Path
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((link, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {link.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {link.label || 'Unlabeled'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {link.path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {link.isValid ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Valid
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Invalid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Testing Checklist</CardTitle>
          <CardDescription>
            Follow this checklist to ensure all links are working properly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-bold mb-2">Development Environment Testing</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Run automated link validation using this dashboard</li>
                <li>Manually test all navigation menu links</li>
                <li>Verify all feature card buttons work correctly</li>
                <li>Test footer links across different pages</li>
                <li>Check mobile navigation menu links</li>
              </ul>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-bold mb-2">Production Environment Testing</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Run link validation after deployment</li>
                <li>Test all links in incognito/private browsing mode</li>
                <li>Verify links work across different browsers (Chrome, Firefox, Safari)</li>
                <li>Test on mobile devices to ensure responsive behavior</li>
                <li>Check authentication-protected links with logged in/out states</li>
              </ul>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-bold mb-2">Documentation</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Generate and save validation report</li>
                <li>Document any fixes applied to broken links</li>
                <li>Update known routes list when adding new pages</li>
                <li>Include link validation in pre-deployment checklist</li>
                <li>Schedule regular audits (weekly/bi-weekly)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkValidationDashboard;
