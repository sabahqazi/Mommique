
import { supabase } from './supabase';
import { createWaitlistTableDirectly, createRpcFunction } from './supabase';

// Type definition for waitlist entries
export interface WaitlistEntry {
  id?: number;
  email: string;
  pricing_option: string | null;
  created_at: string;
}

// Function to check if the waitlist_entries table exists
export const checkWaitlistTableExists = async (): Promise<boolean> => {
  try {
    console.log('Checking if waitlist table exists...');
    
    // Try to query the table information from Postgres information_schema
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'waitlist_entries'
        );
      `
    });
    
    if (error) {
      console.log('Error checking table with RPC:', error);
      
      // Fallback to direct query (less reliable but might work)
      const { data: directData, error: directError } = await supabase
        .from('waitlist_entries')
        .select('id')
        .limit(1);
      
      if (directError && directError.code === '42P01') {
        // Table doesn't exist error
        console.log('Waitlist table confirmed to not exist yet');
        return false;
      } else if (!directError) {
        console.log('Waitlist table exists (confirmed by direct query)');
        return true;
      }
      
      console.error('Could not determine if table exists:', directError);
      return false;
    }
    
    console.log('Table existence check result:', data);
    return true;
  } catch (error) {
    console.error('Exception checking waitlist table:', error);
    return false;
  }
};

// Function to create the waitlist_entries table if it doesn't exist
export const createWaitlistTable = async (): Promise<boolean> => {
  console.log('Attempting to create waitlist table...');
  
  try {
    // First try using the direct SQL approach
    const result = await createWaitlistTableDirectly();
    
    if (result.success) {
      console.log('Waitlist table created successfully via direct SQL');
      return true;
    }
    
    console.log('Direct SQL approach failed, trying RPC method...');
    
    // If that fails, try the RPC function approach as fallback
    // Create and call the RPC function
    const rpcCreated = await createRpcFunction();
    if (rpcCreated) {
      const { error } = await supabase.rpc('create_waitlist_table', {});
      
      if (error) {
        console.error('Error calling waitlist table RPC function:', error);
        return false;
      }
      
      console.log('Waitlist table created successfully via RPC');
      return true;
    }
    
    console.error('All table creation methods failed');
    return false;
  } catch (error) {
    console.error('Exception creating waitlist table:', error);
    return false;
  }
};

// Function to initialize the database schema
export const initializeSchema = async (): Promise<void> => {
  console.log('Initializing database schema...');
  
  try {
    const tableExists = await checkWaitlistTableExists();
    
    if (!tableExists) {
      console.log('Table does not exist, creating it...');
      await createWaitlistTable();
    } else {
      console.log('Waitlist table already exists');
    }
  } catch (error) {
    console.error('Error initializing schema:', error);
  }
};
