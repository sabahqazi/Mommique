
import { supabase, testSupabaseConnection } from './supabase';
import { createWaitlistTableDirectly, createRpcFunction, createTableDirectly, createSqlExecFunction } from './supabase';
import { toast } from '@/hooks/use-toast';

// Type definition for waitlist entries
export interface WaitlistEntry {
  id?: number;
  email: string;
  pricing_option: string | null;
  created_at: string;
  [key: string]: unknown; // Add index signature to make it compatible with Record<string, unknown>
}

// Function to check if the waitlist_entries table exists
export const checkWaitlistTableExists = async (): Promise<boolean> => {
  try {
    console.log('🔍 Checking if waitlist table exists...');
    
    // First, ensure we have a working Supabase connection
    const connectionTest = await testSupabaseConnection();
    if (!connectionTest.success) {
      console.error('❌ Cannot check waitlist table: Supabase connection failed');
      return false;
    }
    
    // Most direct approach - just query the table
    const { data, error } = await supabase
      .from('waitlist_entries')
      .select('id')
      .limit(1);
    
    if (!error) {
      console.log('✅ Waitlist table exists (confirmed by direct query)');
      return true;
    }
    
    console.log('Table query check result:', error);
    
    // If table doesn't exist, it will return an error with code 42P01
    if (error && error.code === '42P01') {
      console.log('❌ Table does not exist yet (confirmed by error code)');
      return false;
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
    // First try using direct SQL execution 
    console.log('👉 Using direct table creation...');
    
    // Create the table using raw SQL via Supabase's REST API
    const createTableSQL = `
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
    
    // Try calling a stored function to execute SQL if it exists
    const { data: functionResult, error: functionError } = await supabase.rpc('exec_sql', {
      sql: createTableSQL
    });
    
    if (!functionError) {
      console.log('✅ Table created via RPC function');
      toast({
        title: "Table Created",
        description: "Waitlist table created successfully via RPC function.",
      });
      return true;
    }
    
    console.log('RPC function failed, trying direct SQL with custom function...');
    
    // Try creating the function first
    await createSqlExecFunction();
    
    // Then try executing the SQL
    const directResult = await createWaitlistTableDirectly();
    if (directResult.success) {
      console.log('✅ Table created via direct SQL');
      toast({
        title: "Table Created",
        description: "Waitlist table created successfully.",
      });
      return true;
    }
    
    // If all else fails, try a simple POST request
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/waitlist_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({})
    });
    
    // If we got a 201 Created or a 409 Conflict (already exists), then it worked
    if (response.status === 201 || response.status === 409) {
      console.log('✅ Table confirmed via REST API');
      toast({
        title: "Table Ready",
        description: "Waitlist table is ready to use.",
      });
      return true;
    }
    
    console.error('❌ All table creation methods failed');
    toast({
      title: "Table Creation Failed",
      description: "Could not create the waitlist table. Please check console for details.",
      variant: "destructive"
    });
    return false;
  } catch (error) {
    console.error('Exception creating waitlist table:', error);
    toast({
      title: "Table Creation Error",
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
      }
    } else {
      console.log('✅ Waitlist table already exists');
    }
  } catch (error) {
    console.error('Error initializing schema:', error);
  }
};
