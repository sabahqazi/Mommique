
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
let supabaseClient: ReturnType<typeof createClient> | null = null;

// Logging environment variables presence for debugging
console.log('Environment variables check:');
console.log('VITE_SUPABASE_URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase URL or Anonymous key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    console.error('Current values - URL:', supabaseUrl ? 'Exists (hidden)' : 'Missing', 'Key:', supabaseAnonKey ? 'Exists (hidden)' : 'Missing');
    throw new Error('Supabase configuration is incomplete. Check console for details.');
  }
  
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public',
    },
  });
  console.log('✅ Supabase client created successfully');
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error);
}

export const supabase = supabaseClient || ({} as ReturnType<typeof createClient>);

// Add a simple function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase environment variables are missing');
    console.error('Current environment:', import.meta.env.MODE);
    
    toast({
      title: "Supabase Configuration Error",
      description: "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are required",
      variant: "destructive"
    });
    return false;
  }
  return true;
};

// Improved connection test
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }
  
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Use a simple query to test connection
    const { data, error } = await supabase
      .from('waitlist_interest')
      .select('id')
      .limit(1);
    
    if (error && error.code !== '42P01') {
      // If error is not "relation does not exist", it's a connection issue
      console.error('❌ Supabase connection test failed:', error);
      console.error('Error details:', error.code, error.message, error.details);
      
      toast({
        title: "Database Connection Failed",
        description: `Error: ${error.message}`,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
    
    // Check permissions by trying a write operation
    try {
      const testResponse = await supabase
        .from('waitlist_interest')
        .insert([{ 
          email_address: 'permission_test@example.com',
          pricing: 'test',
          created_at: new Date().toISOString()
        }])
        .select();
        
      if (testResponse.error) {
        console.warn('Write permission test failed:', testResponse.error);
        
        if (testResponse.error.code === '42501' || testResponse.error.message.includes('permission')) {
          toast({
            title: "Database Permission Issue",
            description: "Your anonymous role doesn't have permission to write to the table. Check your RLS policies.",
            variant: "destructive"
          });
        }
      } else {
        console.log('✅ Write permission test successful');
        
        // Clean up test data
        await supabase
          .from('waitlist_interest')
          .delete()
          .eq('email_address', 'permission_test@example.com');
      }
    } catch (e) {
      console.warn('Error during permission test:', e);
    }
    
    console.log('✅ Supabase connection test successful');
    toast({
      title: "Database Connected",
      description: "Successfully connected to Supabase API",
    });
    return { success: true, data };
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
