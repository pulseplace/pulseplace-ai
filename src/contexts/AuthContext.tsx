
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    [key: string]: any;
  };
} | null;

interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  department?: string;
  role?: string;
}

interface AuthContextType {
  user: User;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing session on initial load
  useEffect(() => {
    // This is a placeholder for actual auth implementation
    // We'll implement real auth in a future sprint with Supabase
    const checkExistingSession = () => {
      try {
        const userJson = localStorage.getItem('pulseplace_user');
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUser(userData);
          
          // Create a basic profile from the user data
          setProfile({
            id: userData.id,
            email: userData.email,
            first_name: userData.name ? userData.name.split(' ')[0] : undefined,
            last_name: userData.name ? userData.name.split(' ').slice(1).join(' ') : undefined,
            role: userData.role
          });
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
        name: email.split('@')[0],
        user_metadata: {
          first_name: email.split('@')[0],
          last_name: ''
        }
      };
      
      // Store in localStorage for development
      localStorage.setItem('pulseplace_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      // Create a matching profile
      const mockProfile = {
        id: mockUser.id,
        email: mockUser.email,
        first_name: mockUser.user_metadata.first_name,
        last_name: mockUser.user_metadata.last_name,
        role: 'user'
      };
      
      setProfile(mockProfile);
      
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
      const firstName = name ? name.split(' ')[0] : email.split('@')[0];
      const lastName = name ? name.split(' ').slice(1).join(' ') : '';
      
      const mockUser = {
        id: 'mock-user-id',
        email,
        name: name || email.split('@')[0],
        user_metadata: {
          first_name: firstName,
          last_name: lastName
        }
      };
      
      localStorage.setItem('pulseplace_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      // Create a matching profile
      const mockProfile = {
        id: mockUser.id,
        email: mockUser.email,
        first_name: firstName,
        last_name: lastName,
        role: 'user'
      };
      
      setProfile(mockProfile);
      
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
      setProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      // In a real app, this would fetch the user's profile from the backend
      console.log("Refreshing profile for user:", user.id);
      
      // For now, just ensure we have a profile that matches the user
      if (!profile) {
        setProfile({
          id: user.id,
          email: user.email,
          first_name: user.name ? user.name.split(' ')[0] : undefined,
          last_name: user.name ? user.name.split(' ').slice(1).join(' ') : undefined,
          role: user.role
        });
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      isAuthenticated: !!user, 
      isLoading,
      signIn,
      signUp, 
      signOut,
      refreshProfile
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
