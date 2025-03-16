
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { initializeSchema } from "./lib/supabase-schema";
import { isSupabaseConfigured } from "./lib/supabase";

const queryClient = new QueryClient();

const App = () => {
  // Initialize schema at the app level for faster table creation
  useEffect(() => {
    if (isSupabaseConfigured()) {
      console.log('Initializing database schema from App component...');
      initializeSchema().catch(err => {
        console.error('Failed to initialize schema from App component:', err);
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
