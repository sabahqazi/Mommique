
import { supabase } from './supabase';
import { createWaitlistTableDirectly, createRpcFunction, createTableDirectly, createSqlExecFunction } from './supabase';

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
    
    // Most direct approach first - just query the table
    const { data: directData, error: directError } = await supabase
      .from('waitlist_entries')
      .select('id')
      .limit(1);
    
    if (!directError) {
      console.log('✅ Waitlist table exists (confirmed by direct query)');
      return true;
    }
    
    console.log('Direct query error:', directError);
    
    // If that didn't work, try checking via SQL if we have the SQL function available
    try {
      // See if our SQL execution function works
      const sqlExecWorks = await createSqlExecFunction();
      
      if (sqlExecWorks) {
        const { data, error } = await supabase.rpc('execute_sql', {
          sql_query: `
            SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_schema = 'public'
              AND table_name = 'waitlist_entries'
            );
          `
        });
        
        if (!error && data && data.success) {
          console.log('✅ SQL check for table existence succeeded:', data);
          return true;
        }
        
        console.log('Error checking table with RPC:', error);
      }
    } catch (sqlCheckError) {
      console.error('Exception during SQL check:', sqlCheckError);
    }
    
    return false;
  } catch (error) {
    console.error('Exception checking waitlist table:', error);
    return false;
  }
};

// Function to create the waitlist_entries table if it doesn't exist
export const createWaitlistTable = async (): Promise<boolean> => {
  console.log('⏳ Creating waitlist_entries table...');
  
  try {
    // First, ensure we have the SQL execution function
    await createSqlExecFunction();
    
    // Try approaches in sequence until one works
    
    // 1. First try using direct SQL execution
    console.log('👉 Approach 1: Using direct SQL execution...');
    const directResult = await createWaitlistTableDirectly();
    if (directResult.success) {
      console.log('✅ Waitlist table created successfully via direct SQL');
      return true;
    }
    
    console.log('Direct SQL approach failed, trying RPC method...');
    
    // 2. Try the RPC function approach
    console.log('👉 Approach 2: Creating and calling RPC function...');
    const rpcCreated = await createRpcFunction();
    if (rpcCreated) {
      const { error } = await supabase.rpc('create_waitlist_table', {});
      
      if (!error) {
        console.log('✅ Waitlist table created successfully via RPC');
        return true;
      }
      
      console.error('Error calling waitlist table RPC function:', error);
    }
    
    // 3. Try direct REST API approach
    console.log('👉 Approach 3: Using direct REST API...');
    const restResult = await createTableDirectly();
    if (restResult) {
      console.log('✅ Waitlist table created successfully via REST API');
      return true;
    }
    
    // If we get here, all methods failed
    console.error('❌ All table creation methods failed');
    return false;
  } catch (error) {
    console.error('Exception creating waitlist table:', error);
    return false;
  }
};

// Function to initialize the database schema
export const initializeSchema = async (): Promise<void> => {
  console.log('⏳ Initializing database schema...');
  
  try {
    const tableExists = await checkWaitlistTableExists();
    
    if (!tableExists) {
      console.log('❗ Table does not exist, creating it...');
      const created = await createWaitlistTable();
      
      if (created) {
        console.log('✅ Table creation successful!');
        // Verify table was created
        const verifyExists = await checkWaitlistTableExists();
        console.log('Table existence after creation attempt:', verifyExists);
      } else {
        console.error('❌ Failed to create table after all attempts');
        
        // Create a manual SQL to show the user
        const manualSQL = `
-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.waitlist_entries (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  pricing_option TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email)
);

-- Add RLS policies
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting data
CREATE POLICY "Allow anonymous inserts"
ON public.waitlist_entries
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Create policy for reading data (restricted to authenticated users)
CREATE POLICY "Allow authenticated read"
ON public.waitlist_entries
FOR SELECT
TO authenticated
USING (true);
`;
        console.log('Manual SQL for table creation:', manualSQL);
      }
    } else {
      console.log('✅ Waitlist table already exists');
    }
  } catch (error) {
    console.error('Error initializing schema:', error);
  }
};
