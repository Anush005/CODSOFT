import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookshelfProvider } from "@/contexts/BookshelfContext";
import Index from "./pages/Index";
import Bookshelf from "./pages/Bookshelf";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookshelfProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BookshelfProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
