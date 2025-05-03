
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { auth, db } from '@/integrations/firebase/client';
import { UserData } from '@/types/auth.types';

// Extend Firebase user type to include metadata
interface ExtendedUser extends User {
  id: string; // Add this for compatibility with components expecting id
}

interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  company: string | null;
  department: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: ExtendedUser | null;
  profile: ProfileData | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: UserData) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser ? 'logged in' : 'logged out');
      
      if (currentUser) {
        // Extend the user object with id property
        const extendedUser = {
          ...currentUser,
          id: currentUser.uid // Map uid to id for compatibility
        };
        setUser(extendedUser);
        
        // Use setTimeout to avoid potential recursive loops
        setTimeout(() => {
          fetchProfile(currentUser.uid);
        }, 0);
      } else {
        setUser(null);
        setProfile(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const docRef = doc(db, 'profiles', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Profile fetched:', docSnap.data());
        setProfile({
          id: userId,
          ...docSnap.data() as Omit<ProfileData, 'id'>
        });
      } else {
        console.log('No profile found for this user');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.uid);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully');
    } catch (error: any) {
      let message = 'Failed to sign in';
      if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password';
      } else if (error.code === 'auth/user-not-found') {
        message = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      }
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: UserData) => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create profile document in Firestore
      const newUser = userCredential.user;
      await setDoc(doc(db, 'profiles', newUser.uid), {
        first_name: userData.first_name,
        last_name: userData.last_name,
        company: userData.company,
        department: userData.department || null,
        role: userData.role || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      let message = 'Failed to create account';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
