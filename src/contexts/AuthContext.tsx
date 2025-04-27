
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
} | null;

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing session on initial load
  useEffect(() => {
    // This is a placeholder for actual auth implementation
    // We'll implement real auth in a future sprint with Supabase
    const checkExistingSession = () => {
      try {
        const userJson = localStorage.getItem('pulseplace_user');
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkExistingSession();
  }, []);
  
  // Mock auth functions for development - will be replaced with actual Supabase auth
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock successful login for now
      const mockUser = {
        id: 'mock-user-id',
        email,
        name: email.split('@')[0]
      };
      
      // Store in localStorage for development
      localStorage.setItem('pulseplace_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      // Mock successful signup
      const mockUser = {
        id: 'mock-user-id',
        email,
        name: name || email.split('@')[0]
      };
      
      localStorage.setItem('pulseplace_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      localStorage.removeItem('pulseplace_user');
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      signIn,
      signUp, 
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
