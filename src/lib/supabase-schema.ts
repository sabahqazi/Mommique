
import { supabase } from './supabase';

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
    const { data, error } = await supabase
      .from('waitlist_entries')
      .select('id')
      .limit(1);
    
    if (error && error.code === '42P01') {
      // Table doesn't exist error
      console.log('Waitlist table does not exist yet');
      return false;
    }
    
    // Table exists
    return true;
  } catch (error) {
    console.error('Error checking waitlist table:', error);
    return false;
  }
};

// Function to create the waitlist_entries table if it doesn't exist
export const createWaitlistTable = async (): Promise<boolean> => {
  try {
    // We'll use raw SQL to create the table with all required columns
    const { error } = await supabase.rpc('create_waitlist_table', {});
    
    if (error) {
      console.error('Error creating waitlist table:', error);
      return false;
    }
    
    console.log('Waitlist table created successfully');
    return true;
  } catch (error) {
    console.error('Error creating waitlist table:', error);
    return false;
  }
};

// Function to initialize the database schema
export const initializeSchema = async (): Promise<void> => {
  const tableExists = await checkWaitlistTableExists();
  
  if (!tableExists) {
    // Create the RPC function first that will create our table
    const { error: rpcError } = await supabase.rpc('create_rpc_function', {});
    
    if (rpcError) {
      console.error('Error creating RPC function:', rpcError);
      return;
    }
    
    // Now create the table
    await createWaitlistTable();
  } else {
    console.log('Waitlist table already exists');
  }
};
