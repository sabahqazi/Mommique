
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { initializeSchema } from "./lib/supabase-schema";
import { isSupabaseConfigured, supabase, testSupabaseConnection } from "./lib/supabase";
import { toast } from "./hooks/use-toast";

// Create the QueryClient instance outside the component
const queryClient = new QueryClient();

const App = () => {
  const [schemaInitialized, setSchemaInitialized] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Test connection first, then initialize schema
  useEffect(() => {
    // Additional debugging to verify environment variables loading
    console.log('App Component - Environment checks:');
    console.log('Running in mode:', import.meta.env.MODE);
    console.log('VITE_SUPABASE_URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
    console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    
    const setupDatabase = async () => {
      try {
        setIsLoading(true);
        
        if (!isSupabaseConfigured()) {
          console.warn('⚠️ Supabase is not configured properly. App will continue without database functionality.');
          setIsLoading(false);
          return;
        }
        
        console.log('🔍 Testing Supabase connection from App component...');
        
        try {
          const connectionResult = await testSupabaseConnection();
          setConnectionTested(true);
          
          if (!connectionResult.success) {
            console.warn('⚠️ Supabase connection test failed:', connectionResult.error);
            toast({
              title: "Connection Failed",
              description: `Could not connect to Supabase, but app will continue working. Error: ${connectionResult.error}`,
              variant: "destructive"
            });
            setIsLoading(false);
            return;
          }
          
          console.log('✅ Supabase connection test successful');
          toast({
            title: "Connected to Supabase",
            description: "Successfully connected to your Supabase project"
          });
          
          // Initialize schema
          try {
            console.log('⏳ Initializing database schema from App component...');
            await initializeSchema();
            console.log('✅ Schema initialization completed');
            setSchemaInitialized(true);
            
            // Test the table exists after initialization
            const { data, error, count } = await supabase
              .from('waitlist_interest')
              .select('count', { count: 'exact' })
              .limit(0);
            
            if (error) {
              console.warn('⚠️ Table check after init failed:', error);
              toast({
                title: "Table Access Issue",
                description: `Could not verify the waitlist table, but app will continue. ${error.message}`,
              });
            } else {
              console.log(`✅ Table exists with ${count} entries`);
              toast({
                title: "Database Ready",
                description: `Waitlist table initialized with ${count} entries`,
              });
            }
          } catch (err) {
            console.warn('⚠️ Schema initialization issue:', err);
            toast({
              title: "Database Setup Note",
              description: "There was an issue with database tables, but app will continue working.",
            });
          }
        } catch (connErr) {
          console.warn('⚠️ Error during connection test:', connErr);
          toast({
            title: "Connection Issue",
            description: "Could not test database connection, but app will continue working.",
          });
        }
      } catch (e) {
        console.warn('⚠️ Unexpected error in setup:', e);
      } finally {
        setIsLoading(false);
      }
    };
    
    setupDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isLoading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Loading...</h2>
                <p className="text-gray-500">Setting up the application</p>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
