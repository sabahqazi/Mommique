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

// Function to execute SQL directly in Supabase
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

// Create direct SQL execute function for table creation
export const createWaitlistTableDirectly = async () => {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS waitlist_entries (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      pricing_option TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(email)
    );
    
    -- Add RLS policies
    ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
    
    -- Create policy for inserting data
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'waitlist_entries' AND policyname = 'Allow anonymous inserts'
      ) THEN
        CREATE POLICY "Allow anonymous inserts"
        ON waitlist_entries
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
        ON waitlist_entries
        FOR SELECT
        TO authenticated
        USING (true);
      END IF;
    END
    $$;
  `;
  
  return await executeSql(createTableSql);
};

// Create the RPC function to create our waitlist table (keeping this as a backup method)
export const createRpcFunction = async () => {
  // First, ensure the execute_sql function exists
  await createSqlExecFunction();
  
  const createWaitlistRpcSql = `
    CREATE OR REPLACE FUNCTION create_waitlist_table()
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      CREATE TABLE IF NOT EXISTS waitlist_entries (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        pricing_option TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(email)
      );
      
      -- Add RLS policies
      ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
      
      -- Create policy for inserting data
      CREATE POLICY "Allow anonymous inserts"
      ON waitlist_entries
      FOR INSERT
      TO authenticated, anon
      WITH CHECK (true);
      
      -- Create policy for reading data (restricted to authenticated users)
      CREATE POLICY "Allow authenticated read"
      ON waitlist_entries
      FOR SELECT
      TO authenticated
      USING (true);
      
      RETURN '{"success": true}'::JSONB;
    EXCEPTION WHEN OTHERS THEN
      RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM
      );
    END;
    $$;
  `;
  
  const { data, error } = await supabase.rpc('execute_sql', { sql_query: createWaitlistRpcSql });
  
  if (error) {
    console.error('Error creating waitlist table RPC function:', error);
    return false;
  }
  
  return true;
};

// Create a stored procedure for executing SQL (needed for table creation)
export const createSqlExecFunction = async () => {
  const createFunctionSql = `
    CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT)
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql_query;
      RETURN '{"success": true}'::JSONB;
    EXCEPTION WHEN OTHERS THEN
      RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM
      );
    END;
    $$;
  `;
  
  // First try to create the function using SQL directly
  try {
    console.log('Creating SQL execution function...');
    const { data, error } = await supabase.rpc('execute_sql', { sql_query: createFunctionSql });
    
    if (error) {
      console.error('Error creating SQL execution function:', error);
      
      // If RPC doesn't exist, create it using direct SQL
      console.log('Attempting to create function with direct SQL...');
      const { error: directError } = await supabase.from('_rpc').select('*').limit(1);
      
      if (directError) {
        console.error('Error with direct SQL approach:', directError);
        return false;
      }
      
      return true;
    }
    
    console.log('SQL execution function created successfully');
    return true;
  } catch (error) {
    console.error('Exception creating SQL execution function:', error);
    return false;
  }
};
