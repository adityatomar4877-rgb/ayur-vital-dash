import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PatientAuth from "./pages/PatientAuth";
import Questionnaire from "./pages/Questionnaire";
import PatientProfile from "./pages/PatientProfile";
import FoodDatabase from "./pages/FoodDatabase";
import DietChartBuilder from "./pages/DietChartBuilder";
import Remedies from "./pages/Remedies";
import LifestyleTips from "./pages/LifestyleTips";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="jeevanamrit-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/patient-auth" element={<PatientAuth />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/patients/:id?" element={<PatientProfile />} />
              <Route path="/food-database" element={<FoodDatabase />} />
              <Route path="/diet-builder" element={<DietChartBuilder />} />
              <Route path="/remedies" element={<Remedies />} />
              <Route path="/lifestyle" element={<LifestyleTips />} />
              <Route path="/reports" element={<Reports />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
