
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import PWAInstaller from "@/components/PWAInstaller";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MapaVerde from "./pages/MapaVerde";
import MeusPlantios from "./pages/MeusPlantios";
import CriarMicrofloresta from "./pages/CriarMicrofloresta";
import Desafios from "./pages/Desafios";
import Comunidade from "./pages/Comunidade";
import ImpactoAmbiental from "./pages/ImpactoAmbiental";
import Guia from "./pages/Guia";
import GuiaArtigo from "./pages/GuiaArtigo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PWAInstaller />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mapa-verde" element={<MapaVerde />} />
            <Route path="/meus-plantios" element={<MeusPlantios />} />
            <Route path="/criar-microfloresta" element={<CriarMicrofloresta />} />
            <Route path="/desafios" element={<Desafios />} />
            <Route path="/comunidade" element={<Comunidade />} />
            <Route path="/impacto-ambiental" element={<ImpactoAmbiental />} />
            <Route path="/guia" element={<Guia />} />
            <Route path="/guia/artigo/:id" element={<GuiaArtigo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
