
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
    console.warn('⚠️ Supabase URL or Anonymous key is missing. Some features will be limited.');
    console.warn('Current values - URL:', supabaseUrl ? 'Exists (hidden)' : 'Missing', 'Key:', supabaseAnonKey ? 'Exists (hidden)' : 'Missing');
  } else {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    console.log('✅ Supabase client created successfully');
  }
} catch (error) {
  console.warn('⚠️ Failed to create Supabase client:', error);
}

// Provide a fallback client - this won't actually connect to Supabase,
// but it prevents the app from crashing when methods are called on it
export const supabase = supabaseClient || createClient('', '', {});

// Add a simple function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables are missing');
    console.warn('Current environment:', import.meta.env.MODE);
    
    toast({
      title: "Supabase Configuration Note",
      description: "Environment variables are missing. Some features will be limited.",
      variant: "default"
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
    
    // Check if supabaseClient exists
    if (!supabaseClient) {
      console.warn('⚠️ Supabase client is null or undefined');
      return { success: false, error: 'Supabase client is not initialized' };
    }
    
    // Use a simple query to test connection
    console.log('Running test query on waitlist_interest table...');
    const { data, error, status } = await supabase
      .from('waitlist_interest')
      .select('id')
      .limit(1);
    
    console.log('Query response status:', status);
    
    if (error) {
      console.warn('⚠️ Supabase connection test query failed:', error);
      console.warn('Error details:', {
        code: error.code, 
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      if (error.code === '42P01') {
        console.log('This error means the table does not exist yet');
      } else if (error.code === '42501') {
        console.log('This error means permission denied (RLS policy issue)');
      }
      
      if (error.code !== '42P01') {
        // If error is not "relation does not exist", it's a connection issue
        toast({
          title: "Database Connection Note",
          description: `Error: ${error.message}. Some features may be limited.`,
          variant: "default"
        });
        return { success: false, error: error.message };
      }
    } else {
      console.log('✅ Read query successful, received data:', data);
    }
    
    // Check permissions by trying a write operation
    try {
      console.log('Running test INSERT to check write permissions...');
      const testResponse = await supabase
        .from('waitlist_interest')
        .insert([{ 
          email_address: 'permission_test@example.com',
          pricing: 'test',
          created_at: new Date().toISOString()
        }])
        .select();
      
      console.log('Test insert response status:', testResponse.status);
        
      if (testResponse.error) {
        console.warn('Write permission test failed:', testResponse.error);
        console.warn('Error details:', {
          code: testResponse.error.code,
          message: testResponse.error.message,
          details: testResponse.error.details,
          hint: testResponse.error.hint
        });
        
        if (testResponse.error.code === '42501' || testResponse.error.message.includes('permission')) {
          console.warn('🔐 This is a Row Level Security (RLS) issue. You need to update your table policies.');
          console.warn('🔐 Make sure you have a policy that allows anonymous inserts to the waitlist_interest table');
          toast({
            title: "Database Permission Note",
            description: "Your anonymous role doesn't have permission to write to the table. Check your RLS policies.",
            variant: "default"
          });
        }
      } else {
        console.log('✅ Write permission test successful, data:', testResponse.data);
        
        // Clean up test data
        console.log('Cleaning up test data...');
        await supabase
          .from('waitlist_interest')
          .delete()
          .eq('email_address', 'permission_test@example.com');
      }
    } catch (e) {
      console.warn('Error during permission test:', e);
    }
    
    console.log('✅ Supabase connection test completed');
    toast({
      title: "Database Connected",
      description: "Successfully connected to Supabase API",
    });
    return { success: true, data };
  } catch (error) {
    console.warn('⚠️ Exception testing Supabase connection:', error);
    console.warn('Error type:', typeof error);
    console.warn('Error details:', error instanceof Error ? error.message : String(error));
    
    toast({
      title: "Database Connection Note",
      description: `Issue connecting to database: ${error instanceof Error ? error.message : String(error)}`,
      variant: "default"
    });
    return { success: false, error };
  }
};
