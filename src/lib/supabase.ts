
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
let supabaseClient = null;

// Logging environment variables presence for debugging
console.log('Environment variables check:');
console.log('VITE_SUPABASE_URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('Supabase URL or Anonymous key is missing. Some features will be limited.');
  } else {
    // Only create the client if both URL and key are provided
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    console.log('Supabase client created successfully');
  }
} catch (error) {
  console.log('Failed to create Supabase client:', error);
}

// Create a mock client that won't cause errors when methods are called on it
const createMockClient = () => {
  const mockResponse = { data: null, error: { message: 'Supabase not configured' } };
  
  return {
    from: () => ({
      select: () => Promise.resolve(mockResponse),
      insert: () => Promise.resolve(mockResponse),
      update: () => Promise.resolve(mockResponse),
      delete: () => Promise.resolve(mockResponse),
      eq: () => ({ select: () => Promise.resolve(mockResponse) }),
      limit: () => ({ select: () => Promise.resolve(mockResponse) }),
    }),
    auth: {
      signUp: () => Promise.resolve(mockResponse),
      signIn: () => Promise.resolve(mockResponse),
      signOut: () => Promise.resolve(mockResponse),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve(mockResponse),
        download: () => Promise.resolve(mockResponse),
        remove: () => Promise.resolve(mockResponse),
      }),
    },
    rpc: () => Promise.resolve(mockResponse),
  };
};

// Provide a fallback client that won't crash the app when methods are called
export const supabase = supabaseClient || createMockClient();

// Add a simple function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('Supabase environment variables are missing');
    console.log('Current environment:', import.meta.env.MODE);
    return false;
  }
  return true;
};

// Improved connection test with timeout and error handling
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }
  
  try {
    console.log('Testing Supabase connection...');
    
    // Use a simple query to test connection with a timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 5000)
    );
    
    const queryPromise = supabase
      .from('waitlist_interest')
      .select('id')
      .limit(1);
    
    const response = await Promise.race([queryPromise, timeoutPromise]);
    
    if (response.error && response.error.code !== '42P01') {
      // If error is not "relation does not exist", it's a connection issue
      console.log('Supabase connection test failed:', response.error);
      return { success: false, error: response.error.message };
    }
    
    console.log('Supabase connection test successful');
    return { success: true };
  } catch (error) {
    console.log('Exception testing Supabase connection:', error);
    return { success: false, error };
  }
};
