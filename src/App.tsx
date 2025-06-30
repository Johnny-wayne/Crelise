import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Simulator from "./pages/Simulator";
import Dashboard from "./pages/Dashboard";
import AnalystDashboard from "./pages/AnalystDashboard";
import LoanDetails from "./pages/LoanDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoanAnalysis from "./pages/LoanAnalysis";
import SobreNos from "./pages/SobreNos";
import Configuracoes from "./pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/analise/:id" element={<LoanAnalysis />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/analyst" element={<AnalystDashboard />} />
          <Route path="/analyst/loan/:id" element={<LoanDetails />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
