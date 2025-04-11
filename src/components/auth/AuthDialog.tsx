
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const navigate = useNavigate();
  
  const handleFullPageAuth = (tab: string) => {
    onOpenChange(false);
    navigate(`/auth${tab === "signup" ? "?tab=signup" : ""}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Welcome to PulsePlace</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to your account or create a new one
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                For a complete sign in experience with all features
              </p>
              <Button 
                className="w-full rounded-full"
                onClick={() => handleFullPageAuth("signin")}
              >
                Go to Sign In Page
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                For a complete sign up experience with all features
              </p>
              <Button 
                className="w-full rounded-full"
                onClick={() => handleFullPageAuth("signup")}
              >
                Go to Sign Up Page
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center pt-4 mt-4 border-t">
          <span className="text-sm text-muted-foreground">Need more information?</span>
          <Link to="/demo" className="text-sm ml-auto text-pulse-600 hover:underline">
            Book a Demo
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
