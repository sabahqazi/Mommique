
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
let supabaseClient: ReturnType<typeof createClient> | null = null;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase URL or Anonymous key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    throw new Error('Supabase configuration is incomplete. Check console for details.');
  }
  
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client created successfully');
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error);
}

export const supabase = supabaseClient || ({} as ReturnType<typeof createClient>);

// Add a simple function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase environment variables are missing');
    toast({
      title: "Supabase Configuration Error",
      description: "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are required",
      variant: "destructive"
    });
    return false;
  }
  return true;
};

// Simplified version of the connection test
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }
  
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Use the API directly to test connection
    const { data, error } = await supabase
      .from('waitlist_interest')
      .select('id')
      .limit(1);
    
    if (error && error.code !== '42P01') {
      // If error is not "relation does not exist", it's a connection issue
      console.error('❌ Supabase connection test failed:', error);
      toast({
        title: "Database Connection Failed",
        description: `Error: ${error.message}`,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
    
    console.log('✅ Supabase connection test successful');
    toast({
      title: "Database Connected",
      description: "Successfully connected to Supabase API",
    });
    return { success: true };
  } catch (error) {
    console.error('❌ Exception testing Supabase connection:', error);
    toast({
      title: "Database Connection Error",
      description: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
      variant: "destructive"
    });
    return { success: false, error };
  }
};
