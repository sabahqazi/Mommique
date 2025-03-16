
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
  const [hasError, setHasError] = useState(false);

  // Test connection first, then initialize schema
  useEffect(() => {
    // Additional debugging to verify environment variables loading
    console.log('App Component - Environment checks:');
    console.log('Running in mode:', import.meta.env.MODE);
    
    const setupDatabase = async () => {
      try {
        // Set loading state
        setIsLoading(true);
        
        // Check if Supabase is configured - if not, continue loading the app anyway
        if (!isSupabaseConfigured()) {
          console.log('Supabase is not configured. App will continue without database functionality.');
          // Continue loading the app even without Supabase
          setIsLoading(false);
          return;
        }
        
        console.log('Testing Supabase connection...');
        
        try {
          // Try to test the connection but don't block app loading on failure
          const connectionResult = await Promise.race([
            testSupabaseConnection(),
            // Timeout after 5 seconds to prevent blocking the app load
            new Promise(resolve => setTimeout(() => resolve({ 
              success: false, 
              error: 'Connection timeout' 
            }), 5000))
          ]);
          
          setConnectionTested(true);
          
          if (!connectionResult.success) {
            console.log('Supabase connection issue, but app will continue working.');
            setIsLoading(false);
            return;
          }
          
          console.log('Supabase connection successful');
          
          // Try to initialize schema but don't block app loading on failure
          try {
            await initializeSchema();
            setSchemaInitialized(true);
          } catch (err) {
            console.log('Schema initialization issue, but app will continue working:', err);
          }
        } catch (connErr) {
          console.log('Connection test error, but app will continue working:', connErr);
        }
      } catch (e) {
        console.log('Unexpected error in setup, but app will continue working:', e);
        setHasError(true);
      } finally {
        // Always ensure app loads regardless of Supabase status
        setIsLoading(false);
      }
    };
    
    // Setup with a short timeout to ensure app loads even if there are issues
    setTimeout(() => {
      setupDatabase().catch(error => {
        console.log('Database setup failed, but app will continue working:', error);
        setIsLoading(false);
      });
      
      // Fallback to ensure app loads even if the above fails
      setTimeout(() => {
        if (isLoading) {
          console.log('Force loading completion after timeout');
          setIsLoading(false);
        }
      }, 8000);
    }, 100);
  }, []);

  // For safety, add a secondary useEffect that will force the app to load if the first one fails
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log('Fallback timer triggered: forcing app to load');
        setIsLoading(false);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

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
