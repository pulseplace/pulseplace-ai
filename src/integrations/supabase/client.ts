
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hamqupvdhlfznwnuohsh.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbXF1cHZkaGxmem53bnVvaHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjQzMzMsImV4cCI6MjA1OTYwMDMzM30.xmNAGYVGwbTwLqqMPkdR-iYUfdfoteW755M2i3S_Klo'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
