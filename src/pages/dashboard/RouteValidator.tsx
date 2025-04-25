
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { runLinkValidation, validateInternalLink } from '@/utils/linkValidation';

const RouteValidator = () => {
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  
  // Define key application routes to test
  const routesToTest = [
    { path: '/', name: 'Home' },
    { path: '/auth/signin', name: 'Sign In' },
    { path: '/auth/signup', name: 'Sign Up' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/dashboard/pulsebot', name: 'PulseBot' },
    { path: '/dashboard/tasktracker', name: 'Task Tracker' },
    { path: '/dashboard/llminsights', name: 'LLM Insights' },
    { path: '/nonexistentpage', name: '404 Test', expectError: true }
  ];
  
  const validateRoutes = async () => {
    setIsValidating(true);
    
    // Run the link validation utility
    const results = runLinkValidation();
    
    // Add the status of our key routes
    const routeResults = routesToTest.map(route => ({
      path: route.path,
      name: route.name,
      isValid: route.expectError ? !validateInternalLink(route.path) : validateInternalLink(route.path),
      source: 'Route Test',
      expectError: route.expectError || false
    }));
    
    setValidationResults([...results, ...routeResults]);
    setIsValidating(false);
    
    toast({
      title: "Route Validation Complete",
      description: "All routes have been checked for validity."
    });
  };
  
  // Run validation on component mount
  useEffect(() => {
    validateRoutes();
  }, []);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Route Validator</h2>
      
      <div className="mb-6 flex items-center gap-4">
        <Button 
          onClick={validateRoutes} 
          disabled={isValidating}
          variant="outline"
        >
          {isValidating ? 'Validating...' : 'Validate All Routes'}
        </Button>
        <Button asChild variant="outline">
          <Link to="/this-does-not-exist">Test 404 Page</Link>
        </Button>
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Validation Results</h3>
        
        {isValidating ? (
          <p className="text-muted-foreground">Validating routes...</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {routesToTest.map((route, index) => {
                const result = validationResults.find(r => r.path === route.path);
                const isValid = result?.isValid;
                const expectError = route.expectError;
                const isCorrect = expectError ? !isValid : isValid;
                
                return (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md border flex items-center justify-between ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div>
                      <p className="font-medium">{route.name}</p>
                      <p className="text-sm text-gray-500">{route.path}</p>
                      {route.expectError && <p className="text-xs text-gray-500">(Expected to fail)</p>}
                    </div>
                    <div>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8">
              <h4 className="text-md font-medium mb-2">Other Links from Navigation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {validationResults
                  .filter(result => !routesToTest.some(route => route.path === result.path))
                  .map((result, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-md border ${
                        result.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{result.label || 'Unlabeled'}</p>
                        {result.isValid ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{result.path}</p>
                      <p className="text-xs text-gray-500">{result.source}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RouteValidator;
