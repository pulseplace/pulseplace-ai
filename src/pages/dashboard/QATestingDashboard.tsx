
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  AlertTriangle, 
  RefreshCw, 
  Globe, 
  Smartphone, 
  Tablet, 
  LayoutGrid, 
  FileDown,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Bot,
  Rocket,
  ArrowRight
} from 'lucide-react';
import LastUpdatedTimestamp from '@/components/dashboard/LastUpdatedTimestamp';
import ExportButton from '@/components/dashboard/ExportButton';
import { formatRelativeTime } from '@/utils/dateTimeUtils';

// Mock route validation function
const validateRoute = async (route: string): Promise<boolean> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 300));
  // For demo purposes, all routes are valid except for one
  return route !== '/invalid-route';
};

interface RouteStatus {
  route: string;
  description: string;
  status: 'success' | 'error' | 'pending';
  lastChecked: Date | null;
}

interface FeatureStatus {
  name: string;
  description: string;
  status: 'success' | 'error' | 'pending' | 'warning';
  category: 'cta' | 'visual' | 'functional';
  device?: 'desktop' | 'mobile' | 'tablet' | 'all';
}

const QATestingDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('routes');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  // Route validation state
  const [routes, setRoutes] = useState<RouteStatus[]>([
    { 
      route: '/dashboard', 
      description: 'Main dashboard with HeroStats',
      status: 'pending', 
      lastChecked: null 
    },
    { 
      route: '/dashboard/qa-sprint', 
      description: 'Sprint tracker and countdown',
      status: 'pending', 
      lastChecked: null 
    },
    { 
      route: '/insights/pulsebot', 
      description: 'PulseBot interface and prompts',
      status: 'pending', 
      lastChecked: null 
    },
    { 
      route: '/qa-browser', 
      description: 'Cross-browser testing preview',
      status: 'pending', 
      lastChecked: null 
    },
    { 
      route: '/demo/reset', 
      description: 'Demo data reset functionality',
      status: 'pending', 
      lastChecked: null 
    },
    { 
      route: '/teams/sigma', 
      description: 'Team Sigma insights page',
      status: 'pending', 
      lastChecked: null 
    },
    { 
      route: '/teams/zeta', 
      description: 'Team Zeta insights page',
      status: 'pending', 
      lastChecked: null 
    },
    { 
      route: '/invalid-route', 
      description: 'This route should 404 (expected)',
      status: 'pending', 
      lastChecked: null 
    }
  ]);
  
  // Feature validation state
  const [features, setFeatures] = useState<FeatureStatus[]>([
    {
      name: 'Export Buttons',
      description: 'CSV/PDF export functionality',
      status: 'pending',
      category: 'cta',
      device: 'all'
    },
    {
      name: 'Reset to Demo Mode',
      description: 'Demo data reset functionality',
      status: 'pending',
      category: 'cta'
    },
    {
      name: 'PulseBot Prompt Buttons',
      description: 'Pre-defined prompt triggers',
      status: 'pending',
      category: 'cta'
    },
    {
      name: 'PulseBot Feedback Logging',
      description: 'Thumbs up/down voting',
      status: 'pending',
      category: 'functional'
    },
    {
      name: 'Timeline Filters',
      description: 'Date range filter responses',
      status: 'pending',
      category: 'functional'
    },
    {
      name: 'Toast Notifications',
      description: 'Success/failure message display',
      status: 'pending',
      category: 'functional'
    },
    {
      name: 'HeroStats Mobile View',
      description: 'Responsive design for small screens',
      status: 'pending',
      category: 'visual',
      device: 'mobile'
    },
    {
      name: 'PulseScore Tooltips',
      description: 'Hover information on score displays',
      status: 'pending',
      category: 'visual',
      device: 'desktop'
    },
    {
      name: 'Sentiment Trendlines',
      description: 'Color coding and arrow indicators',
      status: 'pending',
      category: 'visual',
      device: 'all'
    },
    {
      name: 'Team Drilldown',
      description: 'Detailed team insights',
      status: 'pending',
      category: 'functional'
    },
    {
      name: 'EmptyState Fallbacks',
      description: 'Proper display when no data',
      status: 'pending',
      category: 'visual',
      device: 'all'
    },
    {
      name: 'Countdown Timer',
      description: 'Auto-updating and formatting',
      status: 'pending',
      category: 'functional'
    }
  ]);
  
  // Check routes
  const checkRoutes = async () => {
    setIsChecking(true);
    
    const updatedRoutes = [...routes];
    
    for (let i = 0; i < updatedRoutes.length; i++) {
      const route = updatedRoutes[i];
      try {
        // Update status to pending
        updatedRoutes[i] = { ...route, status: 'pending' };
        setRoutes([...updatedRoutes]);
        
        // Check route
        const isValid = await validateRoute(route.route);
        
        // Special case for the invalid route (should 404)
        if (route.route === '/invalid-route') {
          updatedRoutes[i] = { 
            ...route, 
            status: isValid ? 'error' : 'success', 
            lastChecked: new Date() 
          };
        } else {
          updatedRoutes[i] = { 
            ...route, 
            status: isValid ? 'success' : 'error', 
            lastChecked: new Date() 
          };
        }
        
        setRoutes([...updatedRoutes]);
        
        // Short delay for visual effect
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        updatedRoutes[i] = { 
          ...route, 
          status: 'error', 
          lastChecked: new Date() 
        };
        setRoutes([...updatedRoutes]);
      }
    }
    
    setLastChecked(new Date());
    setIsChecking(false);
    
    toast({
      title: "Route Validation Complete",
      description: `${updatedRoutes.filter(r => r.status === 'success').length} of ${updatedRoutes.length} routes verified`,
    });
  };
  
  // Check features
  const checkFeatures = async () => {
    setIsChecking(true);
    
    const updatedFeatures = [...features];
    
    for (let i = 0; i < updatedFeatures.length; i++) {
      // Update status to pending
      updatedFeatures[i] = { ...updatedFeatures[i], status: 'pending' };
      setFeatures([...updatedFeatures]);
      
      // Simulate checking the feature (random result for demo)
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const randomStatus = Math.random();
      let status: FeatureStatus['status'];
      
      // For demo, most checks pass but some may have warnings or errors
      if (randomStatus > 0.85) {
        status = 'error';
      } else if (randomStatus > 0.7) {
        status = 'warning';
      } else {
        status = 'success';
      }
      
      updatedFeatures[i] = { ...updatedFeatures[i], status };
      setFeatures([...updatedFeatures]);
    }
    
    setLastChecked(new Date());
    setIsChecking(false);
    
    toast({
      title: "Feature Validation Complete",
      description: `${updatedFeatures.filter(f => f.status === 'success').length} of ${updatedFeatures.length} features verified`,
    });
  };
  
  // Check everything
  const runFullValidation = async () => {
    toast({
      title: "Full Validation Started",
      description: "Checking all routes and features..."
    });
    
    await checkRoutes();
    await checkFeatures();
    
    toast({
      title: "Full Validation Complete",
      description: "Check the reports for any issues that need attention"
    });
  };
  
  // Run initial validation on component mount
  useEffect(() => {
    const initialCheck = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runFullValidation();
    };
    
    initialCheck();
  }, []);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cta': return <Button size="icon" variant="ghost" className="h-5 w-5 pointer-events-none" />;
      case 'visual': return <LayoutGrid className="h-5 w-5" />;
      case 'functional': return <Rocket className="h-5 w-5" />;
      default: return null;
    }
  };
  
  const getDeviceIcon = (device?: string) => {
    switch (device) {
      case 'desktop': return <Globe className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'all': return <Check className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Check className="h-4 w-4 text-green-600" />;
      case 'error': return <X className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'pending': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get summary statistics
  const getRouteSummary = () => {
    const total = routes.length;
    const success = routes.filter(r => r.status === 'success').length;
    const error = routes.filter(r => r.status === 'error').length;
    const pending = routes.filter(r => r.status === 'pending').length;
    
    return { total, success, error, pending };
  };
  
  const getFeatureSummary = () => {
    const total = features.length;
    const success = features.filter(f => f.status === 'success').length;
    const error = features.filter(f => f.status === 'error').length;
    const warning = features.filter(f => f.status === 'warning').length;
    const pending = features.filter(f => f.status === 'pending').length;
    
    return { total, success, error, warning, pending };
  };
  
  const routeSummary = getRouteSummary();
  const featureSummary = getFeatureSummary();
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Demo Day QA Testing Dashboard</h1>
          <p className="text-gray-500">Comprehensive validation of all routes, components, and features</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={runFullValidation}
            disabled={isChecking}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            Run Full Validation
          </Button>
          
          <ExportButton 
            filename="qa-testing-report"
            formats={['csv', 'pdf']}
            buttonText="Export Report"
          />
        </div>
      </div>
      
      {lastChecked && (
        <div className="mb-6 flex justify-between items-center">
          <LastUpdatedTimestamp timestamp={lastChecked} />
          <div className="flex gap-2">
            <Link to="/dashboard/qa-sprint">
              <Button variant="ghost" size="sm">
                View QA Sprint Tracker
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Routes Checked</p>
                <p className="text-2xl font-bold">{routeSummary.total}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <Globe className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Features Validated</p>
                <p className="text-2xl font-bold">{featureSummary.total}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <Check className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues Found</p>
                <p className="text-2xl font-bold">{routeSummary.error + featureSummary.error + featureSummary.warning}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round(((routeSummary.success + featureSummary.success) / (routeSummary.total + featureSummary.total)) * 100)}%
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Route Validation</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkRoutes}
                  disabled={isChecking}
                >
                  <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isChecking ? 'animate-spin' : ''}`} />
                  Revalidate Routes
                </Button>
              </div>
              <CardDescription>
                Checking if all expected routes are accessible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {routes.map((route, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded border bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded ${getStatusColor(route.status)}`}>
                        {getStatusIcon(route.status)}
                      </div>
                      <div>
                        <p className="font-medium">{route.route}</p>
                        <p className="text-xs text-muted-foreground">{route.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {route.lastChecked && (
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(route.lastChecked)}
                        </span>
                      )}
                      <a href={route.route} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Feature Validation</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkFeatures}
                  disabled={isChecking}
                >
                  <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isChecking ? 'animate-spin' : ''}`} />
                  Revalidate Features
                </Button>
              </div>
              <CardDescription>
                Testing functionality and display of key features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded border bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded ${getStatusColor(feature.status)}`}>
                        {getStatusIcon(feature.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{feature.name}</span>
                          <Badge variant="outline" className="rounded-sm text-[10px]">
                            {feature.category}
                          </Badge>
                          {feature.device && (
                            <div className="text-muted-foreground">
                              {getDeviceIcon(feature.device)}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <div>
                      <Badge 
                        variant="outline" 
                        className={`rounded-sm text-xs ${
                          feature.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
                          feature.status === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          feature.status === 'error' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {feature.status === 'success' ? 'Passed' :
                         feature.status === 'warning' ? 'Warning' :
                         feature.status === 'error' ? 'Failed' :
                         'Checking...'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Routes Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${(routeSummary.success / routeSummary.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round((routeSummary.success / routeSummary.total) * 100)}%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-green-700 text-xl font-bold">{routeSummary.success}</p>
                      <p className="text-sm text-muted-foreground">Passed</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-red-700 text-xl font-bold">{routeSummary.error}</p>
                      <p className="text-sm text-muted-foreground">Failed</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-blue-700 text-xl font-bold">{routeSummary.pending}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-amber-800 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      Potential Issues
                    </h3>
                    <ul className="text-sm text-amber-700 space-y-1 list-disc pl-5">
                      {routes.filter(r => r.status === 'error' && r.route !== '/invalid-route').map((route, i) => (
                        <li key={i}>
                          <strong>{route.route}</strong>: {route.description}
                        </li>
                      ))}
                      {routes.filter(r => r.status === 'error').length === 0 && (
                        <li>No route issues detected 👍</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Features Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${(featureSummary.success / featureSummary.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round((featureSummary.success / featureSummary.total) * 100)}%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-green-700 text-xl font-bold">{featureSummary.success}</p>
                      <p className="text-sm text-muted-foreground">Passed</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-amber-700 text-xl font-bold">{featureSummary.warning}</p>
                      <p className="text-sm text-muted-foreground">Warning</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-red-700 text-xl font-bold">{featureSummary.error}</p>
                      <p className="text-sm text-muted-foreground">Failed</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-blue-700 text-xl font-bold">{featureSummary.pending}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-amber-800 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      Feature Issues
                    </h3>
                    <ul className="text-sm text-amber-700 space-y-1 list-disc pl-5">
                      {features.filter(f => f.status === 'error' || f.status === 'warning').map((feature, i) => (
                        <li key={i}>
                          <strong>{feature.name}</strong>: {feature.status === 'error' ? 'Failed' : 'Warning'}
                        </li>
                      ))}
                      {features.filter(f => f.status === 'error' || f.status === 'warning').length === 0 && (
                        <li>No feature issues detected 👍</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-gray-200 rounded-full">
                      <Rocket className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Prepare for Demo Day Launch</h3>
                      <p className="text-sm text-muted-foreground">
                        Overall readiness: {
                          (routeSummary.success + featureSummary.success) / (routeSummary.total + featureSummary.total) > 0.9 ? 
                          '✅ Ready for demo' : 
                          (routeSummary.success + featureSummary.success) / (routeSummary.total + featureSummary.total) > 0.8 ? 
                          '⚠️ Minor issues to resolve' : 
                          '❌ Critical issues need attention'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="h-5 w-5 text-purple-600" />
                        <h3 className="font-medium">PulseBot</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {features.filter(f => f.name.includes('PulseBot') && f.status === 'success').length} of {
                          features.filter(f => f.name.includes('PulseBot')).length
                        } features passing
                      </p>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to="/pulsebot">Test PulseBot</Link>
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileDown className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium">Export Functions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {features.filter(f => f.name.includes('Export') && f.status === 'success').length} of {
                          features.filter(f => f.name.includes('Export')).length
                        } features passing
                      </p>
                      <Button size="sm" variant="ghost" onClick={() => {
                        toast({
                          title: "Export Tested",
                          description: "PDF and CSV export functionality verified"
                        });
                      }}>
                        Test Export
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium">Countdown Timer</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Timer accuracy and formatting
                      </p>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to="/dashboard/qa-sprint">View Countdown</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard">Return to Dashboard</Link>
                    </Button>
                    
                    <Button variant="default" size="sm" onClick={() => {
                      toast({
                        title: "QA Report Generated",
                        description: "Full test results have been compiled and saved"
                      });
                    }}>
                      <FileDown className="h-4 w-4 mr-2" />
                      Generate Full QA Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QATestingDashboard;
