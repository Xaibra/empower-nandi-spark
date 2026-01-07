import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTeam from "./pages/AdminTeam";
import AdminNews from "./pages/AdminNews";
import AdminExperts from "./pages/AdminExperts";
import AdminPartnerships from "./pages/AdminPartnerships";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminSettings from "./pages/AdminSettings";
import Experts from "./pages/Experts";
import BecomeExpert from "./pages/BecomeExpert";
import AdminLayout from "@/components/admin/AdminLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AdminProvider } from "@/contexts/AdminContext";
import { DataProvider } from "@/contexts/DataContext";
import { ExpertsProvider } from "@/contexts/ExpertsContext";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <ExpertsProvider>
            <AdminProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/experts" element={<Experts />} />
                <Route path="/become-expert" element={<BecomeExpert />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="news" element={<AdminNews />} />
                  <Route path="experts" element={<AdminExperts />} />
                  <Route path="partnerships" element={<AdminPartnerships />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route index element={<AdminDashboard />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AdminProvider>
          </ExpertsProvider>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
