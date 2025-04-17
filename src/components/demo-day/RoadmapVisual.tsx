
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Milestone, Calendar, Rocket, Users, Globe } from 'lucide-react';

const milestones = [
  {
    date: "April 21, 2025",
    title: "Demo Day",
    description: "Core Feature Completion",
    status: "upcoming",
    icon: <Milestone className="h-5 w-5" />
  },
  {
    date: "April 28, 2025",
    title: "Beta Launch",
    description: "Initial User Onboarding",
    status: "planned",
    icon: <Users className="h-5 w-5" />
  },
  {
    date: "July 15, 2025",
    title: "Public Launch",
    description: "General Availability",
    status: "planned",
    icon: <Globe className="h-5 w-5" />
  }
];

const RoadmapVisual: React.FC = () => {
  return (
    <Card className="border-t-4 border-t-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          Product Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          
          {/* Milestones */}
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-start gap-4">
                <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200" />
                <div className="z-10 flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600">
                  {milestone.icon}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-medium flex items-center gap-2">
                    {milestone.title}
                    <Badge variant="outline" className="ml-2">
                      {milestone.date}
                    </Badge>
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapVisual;
