
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

const queryClient = new QueryClient();

const App = () => {
  const [schemaInitialized, setSchemaInitialized] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);

  // Test connection first, then initialize schema
  useEffect(() => {
    const setupDatabase = async () => {
      if (!isSupabaseConfigured()) {
        console.error('❌ Supabase is not configured properly. Please check your environment variables.');
        toast({
          title: "Missing Configuration",
          description: "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.",
          variant: "destructive"
        });
        return;
      }
      
      console.log('🔍 Testing Supabase connection from App component...');
      
      const connectionResult = await testSupabaseConnection();
      setConnectionTested(true);
      
      if (!connectionResult.success) {
        console.error('❌ Supabase connection test failed:', connectionResult.error);
        return;
      }
      
      console.log('✅ Supabase connection test successful');
      
      // Initialize schema
      try {
        console.log('⏳ Initializing database schema from App component...');
        await initializeSchema();
        console.log('✅ Schema initialization completed');
        setSchemaInitialized(true);
        
        // Test the table exists after initialization
        const { data, error, count } = await supabase
          .from('waitlist_entries')
          .select('count', { count: 'exact' })
          .limit(0);
        
        if (error) {
          console.error('❌ Table check after init failed:', error);
          toast({
            title: "Table Initialization Issue",
            description: `Could not verify the waitlist table: ${error.message}`,
            variant: "destructive"
          });
        } else {
          console.log(`✅ Table exists with ${count} entries`);
          toast({
            title: "Database Ready",
            description: `Waitlist table initialized with ${count} entries`,
          });
        }
      } catch (err) {
        console.error('❌ Failed to initialize schema from App component:', err);
        toast({
          title: "Database Setup Issue",
          description: "There was an issue setting up the database tables. Please check console for details.",
          variant: "destructive"
        });
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
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
