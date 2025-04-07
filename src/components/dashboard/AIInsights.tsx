
import React from 'react';
import { Info, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// Sample insights data
const insights = [
  {
    title: "Recognition opportunity in Engineering",
    description: "Engineer sentiment around recognition is 24% lower than company average. Consider implementing structured peer recognition program.",
    impact: "high",
    type: "action"
  },
  {
    title: "Positive trend in work-life balance",
    description: "Work-life balance satisfaction has increased 18% over the last quarter across all departments.",
    impact: "medium",
    type: "highlight"
  },
  {
    title: "New hire engagement risk",
    description: "Employees with <6 months tenure show 15% lower engagement. Review onboarding process.",
    impact: "high",
    type: "risk"
  },
  {
    title: "Management effectiveness improving",
    description: "Trust in leadership scores have increased 12% since implementing monthly town halls.",
    impact: "medium",
    type: "highlight"
  },
];

const AIInsights = () => {
  const { toast } = useToast();
  
  const handleViewDetail = () => {
    toast({
      description: "Insight details would open in a full view",
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          AI Insights
          <Info className="h-4 w-4 ml-2 text-gray-400" />
        </CardTitle>
        <CardDescription>Generated from your latest data</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ScrollArea className="h-64 pr-6">
          <div className="space-y-3 px-6">
            {insights.map((insight, i) => {
              const bgColor = insight.type === 'action' 
                ? 'bg-blue-50 border-blue-200' 
                : insight.type === 'risk' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-green-50 border-green-200';
              
              const iconColor = insight.type === 'action' 
                ? 'text-blue-600 bg-blue-100' 
                : insight.type === 'risk' 
                  ? 'text-red-600 bg-red-100' 
                  : 'text-green-600 bg-green-100';
              
              const icon = insight.type === 'action' 
                ? <Info className="h-4 w-4" /> 
                : insight.type === 'risk' 
                  ? <AlertCircle className="h-4 w-4" /> 
                  : <Check className="h-4 w-4" />;
              
              return (
                <div key={i} className={`p-3 rounded-md border ${bgColor}`}>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${iconColor} mr-2 mt-0.5`}>
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <Badge className={insight.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}>
                      {insight.impact} impact
                    </Badge>
                    <Button 
                      variant="ghost" 
                      className="text-xs h-6 px-2"
                      onClick={handleViewDetail}
                    >
                      View Detail
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
