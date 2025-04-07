
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DashboardFilterProps {
  onClose: () => void;
}

const DashboardFilter: React.FC<DashboardFilterProps> = ({ onClose }) => {
  return (
    <Card className="mb-6 relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2" 
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle className="text-lg">Dashboard Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Label>Department</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label>Location</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="hq">Headquarters</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label>Team Size</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Small (1-10)</SelectItem>
                <SelectItem value="medium">Medium (11-50)</SelectItem>
                <SelectItem value="large">Large (51+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Data Display</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="comparison" defaultChecked />
              <Label htmlFor="comparison">Show benchmark comparison</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="trends" defaultChecked />
              <Label htmlFor="trends">Show trends</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="ai-insights" defaultChecked />
              <Label htmlFor="ai-insights">Show AI insights</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="predictions" defaultChecked />
              <Label htmlFor="predictions">Show predictions</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Reset</Button>
        <Button className="bg-pulse-gradient">Apply Filters</Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardFilter;
