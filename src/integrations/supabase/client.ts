
// This file is kept for compatibility but no longer used
// The application has been migrated to Firebase
// See @/integrations/firebase/client.ts for the active implementation

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database.types';

const SUPABASE_URL = "https://hamqupvdhlfznwnuohsh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbXF1cHZkaGxmem53bnVvaHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjQzMzMsImV4cCI6MjA1OTYwMDMzM30.xmNAGYVGwbTwLqqMPkdR-iYUfdfoteW755M2i3S_Klo";

// DEPRECATED: Application now uses Firebase
// Import the firebase client from "@/integrations/firebase/client" instead
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
