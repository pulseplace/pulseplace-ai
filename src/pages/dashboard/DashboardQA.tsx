
import React, { useState } from 'react';
import { dashboardQATests, QATestCase, generateQAChecklistMarkdown } from '@/utils/dashboardQA';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ClipboardCopy, Filter, Check, ListFilter } from 'lucide-react';

const DashboardQA = () => {
  const { toast } = useToast();
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedComponent, setSelectedComponent] = useState<string>('all');
  const [completedTests, setCompletedTests] = useState<Set<number>>(new Set());
  
  // Get unique components
  const components = ['all', ...new Set(dashboardQATests.map(test => test.component))];
  
  // Filter tests based on selections
  const filteredTests = dashboardQATests.filter(test => 
    (selectedPriority === 'all' || test.priority === selectedPriority) &&
    (selectedComponent === 'all' || test.component === selectedComponent)
  );
  
  const handleTestToggle = (index: number) => {
    const newCompletedTests = new Set(completedTests);
    if (newCompletedTests.has(index)) {
      newCompletedTests.delete(index);
    } else {
      newCompletedTests.add(index);
    }
    setCompletedTests(newCompletedTests);
  };
  
  const generateMarkdown = () => {
    const markdown = generateQAChecklistMarkdown();
    navigator.clipboard.writeText(markdown);
    toast({
      title: "Checklist Copied",
      description: "QA checklist markdown has been copied to clipboard",
    });
  };
  
  const priorityColors = {
    high: "destructive",
    medium: "warning",
    low: "default"
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard QA Plan</h1>
          <p className="text-gray-500">Interactive testing plan for dashboard components</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={generateMarkdown}
          className="flex items-center gap-2"
        >
          <ClipboardCopy className="h-4 w-4" />
          Copy as Markdown
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <Select
            value={selectedPriority}
            onValueChange={setSelectedPriority}
          >
            <SelectTrigger className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/2">
          <Select
            value={selectedComponent}
            onValueChange={setSelectedComponent}
          >
            <SelectTrigger className="w-full">
              <ListFilter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by component" />
            </SelectTrigger>
            <SelectContent>
              {components.map(component => (
                <SelectItem key={component} value={component}>
                  {component === 'all' ? 'All Components' : component}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTests.map((test, index) => (
          <Card key={index} className={completedTests.has(index) ? "opacity-60" : ""}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <div className="flex items-center">
                  <Checkbox 
                    id={`test-${index}`}
                    checked={completedTests.has(index)}
                    onCheckedChange={() => handleTestToggle(index)}
                    className="mr-2"
                  />
                  <CardTitle>{test.component}</CardTitle>
                </div>
                <CardDescription>{test.description}</CardDescription>
              </div>
              <Badge 
                variant={priorityColors[test.priority] as any} 
                className="ml-2"
              >
                {test.priority}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Steps:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {test.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm">{step}</li>
                  ))}
                </ul>
                <h3 className="text-sm font-medium mt-2">Expected Result:</h3>
                <p className="text-sm">{test.expectedResult}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredTests.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No tests match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardQA;
