
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample activities
const activities = [
  {
    user: "Maria Chen",
    action: "completed pulse survey",
    time: "10 minutes ago",
    department: "Engineering"
  },
  {
    user: "Thomas Wright",
    action: "provided feedback",
    time: "1 hour ago",
    department: "Marketing"
  },
  {
    user: "Sophia Rodriguez",
    action: "acknowledged recognition",
    time: "3 hours ago",
    department: "Sales"
  },
  {
    user: "James Kim",
    action: "completed monthly review",
    time: "Yesterday",
    department: "Support"
  },
];

const ActivityFeed = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest platform interactions</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ScrollArea className="h-64">
          <div className="space-y-0">
            {activities.map((activity, i) => (
              <div key={i} className="py-3 px-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">
                      {activity.user} <span className="font-normal text-gray-500">{activity.action}</span>
                    </p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.department}
                  </Badge>
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
