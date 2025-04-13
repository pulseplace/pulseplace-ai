
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const RealTimeTriggers: React.FC = () => (
  <Card className="bg-gray-50">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-sm font-medium">Real-Time Insight Triggers</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-0 text-xs text-gray-600">
      <ul className="space-y-1">
        <li className="flex items-center justify-between">
          <span>Culture Summary:</span>
          <Badge variant="outline" className="text-xs">Survey Completion (5+ responses)</Badge>
        </li>
        <li className="flex items-center justify-between">
          <span>Risk Alert:</span>
          <Badge variant="outline" className="text-xs">Sentiment Drop (15%+)</Badge>
        </li>
        <li className="flex items-center justify-between">
          <span>Certification:</span>
          <Badge variant="outline" className="text-xs">PulseScore (75+ points)</Badge>
        </li>
        <li className="flex items-center justify-between">
          <span>Fallback:</span>
          <Badge variant="outline" className="text-xs">Demo Content</Badge>
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default RealTimeTriggers;
