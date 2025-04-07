
import React from 'react';
import { TrendingUp, Users, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatsRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">PulseScore™</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">86</h3>
              <Badge className="ml-2 bg-green-100 text-green-700">+3</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Engagement Rate</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">92%</h3>
              <Badge className="ml-2 bg-green-100 text-green-700">+5%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Response Rate</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">88%</h3>
              <Badge className="ml-2 bg-green-100 text-green-700">+2%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <Calendar className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Retention Rate</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">95%</h3>
              <Badge className="ml-2 bg-green-100 text-green-700">+1%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsRow;
