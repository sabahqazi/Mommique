
import { supabase, testSupabaseConnection } from './supabase';
import { toast } from '@/hooks/use-toast';

// Type definition for waitlist entries to match the existing waitlist_interest table
export interface WaitlistEntry {
  id?: number;
  email_address: string;  // Changed from email to email_address to match the table
  pricing: string | null; // Changed from pricing_option to pricing to match the table
  created_at: string;
  [key: string]: unknown; // Index signature to make it compatible with Record<string, unknown>
}

// Check if waitlist_interest table exists
export const checkWaitlistTableExists = async (): Promise<boolean> => {
  try {
    console.log('🔍 Checking if waitlist table exists...');
    
    // First, ensure we have a working Supabase connection
    const connectionTest = await testSupabaseConnection();
    if (!connectionTest.success) {
      console.error('❌ Cannot check waitlist table: Supabase connection failed');
      return false;
    }
    
    // Check if the waitlist_interest table exists (based on API response)
    const { data, error } = await supabase
      .from('waitlist_interest')
      .select('id')
      .limit(1);
    
    if (!error) {
      console.log('✅ Waitlist table exists (waitlist_interest)');
      return true;
    }
    
    // If table doesn't exist, it will return an error with code 42P01
    if (error && error.code === '42P01') {
      console.log('❌ Table does not exist yet (confirmed by error code)');
      return false;
    }
    
    console.error('Unexpected error checking table:', error);
    return false;
  } catch (error) {
    console.error('Exception checking waitlist table:', error);
    return false;
  }
};

// Create waitlist table using the waitlist_interest table that exists in the database
export const createWaitlistTable = async (): Promise<boolean> => {
  console.log('⏳ Setting up waitlist table...');
  
  try {
    // First check if the table exists
    const tableExists = await checkWaitlistTableExists();
    
    // If it exists, nothing to do
    if (tableExists) {
      console.log('✅ Waitlist table already exists (waitlist_interest)');
      toast({
        title: "Table Ready",
        description: "Waitlist table is already set up and ready to use.",
      });
      return true;
    }
    
    // We cannot directly create tables via the API, so we'll notify the user
    console.log('ℹ️ Cannot create new tables via API. Make sure the waitlist_interest table exists in Supabase.');
    toast({
      title: "Table Required",
      description: "Please create a 'waitlist_interest' table in your Supabase project with columns: id, email_address, pricing, created_at.",
      variant: "destructive"
    });
    
    return false;
  } catch (error) {
    console.error('Exception creating waitlist table:', error);
    toast({
      title: "Table Setup Issue",
      description: `Error: ${error instanceof Error ? error.message : String(error)}`,
      variant: "destructive"
    });
    return false;
  }
};

// Function to initialize the database schema
export const initializeSchema = async (): Promise<void> => {
  console.log('⏳ Initializing database schema...');
  
  try {
    // First, test the Supabase connection
    const connectionTest = await testSupabaseConnection();
    if (!connectionTest.success) {
      console.error('❌ Cannot initialize schema: Supabase connection failed');
      return;
    }
    
    // Try to setup the table
    const tableReady = await createWaitlistTable();
    
    if (tableReady) {
      console.log('✅ Waitlist table is ready to use!');
      toast({
        title: "Database Ready",
        description: "Waitlist table is ready to receive entries.",
      });
    } else {
      console.error('❌ Could not setup waitlist table');
      toast({
        title: "Table Setup Failed",
        description: "Could not setup the waitlist table. Form will save locally only.",
        variant: "destructive"
      });
    }
  } catch (error) {
    console.error('Error initializing schema:', error);
  }
};
