
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardContextType } from '@/types/dashboard.types';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useToast } from "@/hooks/use-toast";

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Use the custom hook to handle dashboard data
  const {
    surveys,
    responses,
    stats,
    isLoading,
    error,
    refreshData: refreshDataHook,
    forceRefresh: forceRefreshHook
  } = useDashboardData(user?.id);
  
  // Wrap the refreshData function to return a Promise
  const refreshData = async (): Promise<void> => {
    return Promise.resolve(refreshDataHook());
  };
  
  // Wrap the forceRefresh function to return a Promise
  const forceRefresh = async (): Promise<void> => {
    return Promise.resolve(forceRefreshHook());
  };
  
  // Log data loading status for debugging
  useEffect(() => {
    console.log('Dashboard provider state:', { 
      isLoading, 
      surveysCount: surveys.length,
      hasError: !!error,
      userId: user?.id
    });
    
    if (error) {
      toast({
        title: "Dashboard Error",
        description: "There was a problem loading your dashboard data. Using fallback data.",
        variant: "destructive"
      });
    }
  }, [isLoading, surveys.length, error, user?.id]);

  const value = {
    surveys,
    responses,
    stats,
    isLoading,
    error,
    refreshData,
    forceRefresh
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
