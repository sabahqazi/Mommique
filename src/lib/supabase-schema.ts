
import { supabase, testSupabaseConnection } from './supabase';
import { toast } from '@/hooks/use-toast';

// Type definition for waitlist entries
export interface WaitlistEntry {
  id?: number;
  email: string;
  pricing_option: string | null;
  created_at: string;
  [key: string]: unknown; // Index signature to make it compatible with Record<string, unknown>
}

// Simplify the table check to just use the Supabase API directly
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

// Simplified table creation using Supabase API directly
export const createWaitlistTable = async (): Promise<boolean> => {
  console.log('⏳ Creating waitlist_entries table...');
  
  try {
    // We'll use the REST API directly to create the table
    const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // First try to create the table using the REST API
    const response = await fetch(`${url}rpc/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        query: `
          CREATE TABLE IF NOT EXISTS public.waitlist_entries (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL,
            pricing_option TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(email)
          );
          
          -- Add RLS policies
          ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;
          
          -- Create policy for inserting data if it doesn't exist
          DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT FROM pg_policies 
              WHERE tablename = 'waitlist_entries' AND policyname = 'Allow anonymous inserts'
            ) THEN
              CREATE POLICY "Allow anonymous inserts"
              ON public.waitlist_entries
              FOR INSERT
              TO authenticated, anon
              WITH CHECK (true);
            END IF;
          END
          $$;
          
          -- Create policy for reading data if it doesn't exist
          DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT FROM pg_policies 
              WHERE tablename = 'waitlist_entries' AND policyname = 'Allow authenticated read'
            ) THEN
              CREATE POLICY "Allow authenticated read"
              ON public.waitlist_entries
              FOR SELECT
              TO authenticated
              USING (true);
            END IF;
          END
          $$;
        `
      })
    });
    
    // Check if the SQL execution was successful
    if (response.ok) {
      console.log('✅ Table created via SQL API');
      toast({
        title: "Table Created",
        description: "Waitlist table created successfully.",
      });
      return true;
    }
    
    console.log('SQL API response:', await response.text());
    
    // As a fallback, try to insert a record directly and let Supabase auto-create the table
    // This won't work for all Supabase projects, but it's worth trying
    const insertResponse = await fetch(`${url}waitlist_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        pricing_option: 'test',
        created_at: new Date().toISOString()
      })
    });
    
    if (insertResponse.ok) {
      console.log('✅ Table created via insertion');
      toast({
        title: "Table Created",
        description: "Waitlist table created successfully via direct insertion.",
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
