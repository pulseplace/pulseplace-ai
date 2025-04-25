
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface IntegrationTileProps {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  isConnected: boolean;
  connectHandler: () => Promise<void>;
  disconnectHandler: () => Promise<void>;
}

export function IntegrationTile({
  name,
  description,
  icon: Icon,
  isConnected,
  connectHandler,
  disconnectHandler
}: IntegrationTileProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectHandler();
      toast({
        title: `${name} Connected!`,
        description: `Successfully connected to ${name}.`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Unable to connect to ${name}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await disconnectHandler();
      toast({
        title: `${name} Disconnected`,
        description: `Successfully disconnected from ${name}.`,
      });
    } catch (error) {
      toast({
        title: "Disconnect Failed",
        description: `Unable to disconnect from ${name}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-md">
              <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="font-medium">{name}</CardTitle>
          </div>
          <Badge 
            variant={isConnected ? "outline" : "secondary"}
            className={isConnected ? "bg-green-50 text-green-700 hover:bg-green-50" : ""}
          >
            {isConnected ? "Connected" : "Not Connected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={isConnected ? handleDisconnect : handleConnect}
          disabled={isLoading}
          variant={isConnected ? "outline" : "default"}
          className="w-full"
        >
          {isLoading ? "Processing..." : isConnected ? "Disconnect" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
}
