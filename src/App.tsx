
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { initializeSchema } from "./lib/supabase-schema";
import { isSupabaseConfigured, supabase } from "./lib/supabase";
import { toast } from "./hooks/use-toast";

const queryClient = new QueryClient();

const App = () => {
  const [schemaInitialized, setSchemaInitialized] = useState(false);

  // Initialize schema at the app level for faster table creation
  useEffect(() => {
    if (isSupabaseConfigured()) {
      console.log('⏳ Initializing database schema from App component...');
      
      // Test connection first
      supabase.from('_tables').select('*').limit(1)
        .then(({ error }) => {
          if (error) {
            console.error('❌ Supabase connection test failed:', error);
            toast({
              title: "Database Connection Issue",
              description: "Could not connect to the database. Check your Supabase credentials.",
              variant: "destructive"
            });
            return;
          }
          
          console.log('✅ Supabase connection test successful');
          
          // Initialize schema
          initializeSchema()
            .then(() => {
              console.log('✅ Schema initialization completed');
              setSchemaInitialized(true);
              
              // Check if the table exists after initialization
              supabase.from('waitlist_entries').select('count', { count: 'exact' }).limit(0)
                .then(({ data, error, count }) => {
                  if (error) {
                    console.error('❌ Table check after init failed:', error);
                  } else {
                    console.log(`✅ Table exists with ${count} entries`);
                  }
                });
            })
            .catch(err => {
              console.error('❌ Failed to initialize schema from App component:', err);
              toast({
                title: "Database Setup Issue",
                description: "There was an issue setting up the database tables. Please try again or contact support.",
                variant: "destructive"
              });
            });
        });
    }
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
