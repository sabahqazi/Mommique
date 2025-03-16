
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add a simple function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Direct SQL execution through Supabase API
export const executeSql = async (sql: string) => {
  try {
    console.log('Executing SQL:', sql);
    const { data, error } = await supabase.rpc('execute_sql', { sql_query: sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      return { success: false, error };
    }
    
    console.log('SQL execution success:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception executing SQL:', error);
    return { success: false, error };
  }
};

// Create waitlist table using direct SQL approach with more debugging
export const createWaitlistTableDirectly = async () => {
  console.log('ATTEMPT: Creating waitlist table directly with SQL...');
  
  const createTableSql = `
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
    
    -- Create policy for reading data (restricted to authenticated users)
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
  `;
  
  return await executeSql(createTableSql);
};

// Create function for direct SQL execution if the RPC method doesn't exist
export const createSqlExecFunction = async () => {
  console.log('ATTEMPT: Creating SQL execution function...');
  
  const createFunctionSql = `
    CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT)
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
    BEGIN
      EXECUTE sql_query;
      RETURN '{"success": true}'::JSONB;
    EXCEPTION WHEN OTHERS THEN
      RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM,
        'error_detail', SQLSTATE
      );
    END;
    $$;
  `;
  
  try {
    // Attempt to create the function using direct SQL
    // We need to use fetch API directly since we're bootstrapping the SQL execution
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({ sql_query: createFunctionSql })
    });
    
    const result = await response.json();
    console.log('SQL function creation response:', result);
    
    if (response.ok) {
      console.log('✅ SQL execution function created successfully via direct API');
      return true;
    } else {
      // If we get here, the function might already exist or we need to try a different approach
      // Let's try to use the function (it might already exist)
      const testResult = await executeSql('SELECT 1 as test');
      return testResult.success;
    }
  } catch (error) {
    console.error('Exception creating SQL execution function:', error);
    return false;
  }
};

// Create RPC function for table creation as a fallback
export const createRpcFunction = async () => {
  console.log('ATTEMPT: Creating waitlist table RPC function...');
  
  // Ensure the execute_sql function exists first
  const sqlExecExists = await createSqlExecFunction();
  if (!sqlExecExists) {
    console.error('❌ Could not create or verify SQL execution function');
    return false;
  }
  
  const createWaitlistRpcSql = `
    CREATE OR REPLACE FUNCTION create_waitlist_table()
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
    BEGIN
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
      
      -- Create policy for reading data (restricted to authenticated users)
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
      
      RETURN '{"success": true}'::JSONB;
    EXCEPTION WHEN OTHERS THEN
      RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM,
        'detail', SQLSTATE
      );
    END;
    $$;
  `;
  
  const result = await executeSql(createWaitlistRpcSql);
  if (!result.success) {
    console.error('❌ Error creating waitlist table RPC function:', result.error);
    return false;
  }
  
  console.log('✅ Waitlist table RPC function created successfully');
  return true;
};

// Manually create the table using PSQL approach
export const createTableDirectly = async () => {
  console.log('ATTEMPT: Creating table directly via REST API...');
  
  try {
    // Try creating the table directly via REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        command: `
          CREATE TABLE IF NOT EXISTS public.waitlist_entries (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL,
            pricing_option TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(email)
          );
        `
      })
    });
    
    if (response.ok) {
      console.log('✅ Table created directly via REST API');
      return true;
    } else {
      console.error('❌ Failed to create table via REST API:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Exception creating table directly:', error);
    return false;
  }
};
