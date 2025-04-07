
import { User, Session } from '@supabase/supabase-js';
import { Tables } from './database.types';

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Tables<'profiles'> | null;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: UserData) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export interface UserData {
  first_name: string;
  last_name: string;
  company: string;
  department?: string;
  role?: string;
}
