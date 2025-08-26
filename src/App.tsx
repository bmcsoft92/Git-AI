import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookieConsent } from "@/components/CookieConsent";
import { SkipNavigation } from "@/components/SkipNavigation";
// Performance: Lazy loading des composants pour réduire le bundle initial
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy load des pages non critiques pour améliorer le First Contentful Paint
const ROICalculatorPage = lazy(() => import("./pages/ROICalculator"));
const CRM = lazy(() => import("./pages/CRM"));
const Methode = lazy(() => import("./pages/Methode"));
const Solutions = lazy(() => import("./pages/Solutions"));
const CasUsage = lazy(() => import("./pages/CasUsage"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const APropos = lazy(() => import("./pages/APropos"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const CGU = lazy(() => import("./pages/CGU"));
const CGV = lazy(() => import("./pages/CGV"));
const AdminTest = lazy(() => import("./pages/AdminTest"));
const DiagnosticPersonnalise = lazy(() => import("./pages/DiagnosticPersonnalise"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Appointment = lazy(() => import("./pages/Appointment"));

// Loading component pour le lazy loading
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse text-primary">Chargement...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  console.log('App: Démarrage de l\'application...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SkipNavigation />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CookieConsent />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculateur-roi" element={
            <Suspense fallback={<PageLoader />}>
              <ROICalculatorPage />
            </Suspense>
          } />
          <Route path="/crm" element={
            <Suspense fallback={<PageLoader />}>
              <CRM />
            </Suspense>
          } />
          <Route path="/methode" element={
            <Suspense fallback={<PageLoader />}>
              <Methode />
            </Suspense>
          } />
          <Route path="/solutions" element={
            <Suspense fallback={<PageLoader />}>
              <Solutions />
            </Suspense>
          } />
          <Route path="/cas-usage" element={
            <Suspense fallback={<PageLoader />}>
              <CasUsage />
            </Suspense>
          } />
          <Route path="/faq" element={
            <Suspense fallback={<PageLoader />}>
              <FAQ />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<PageLoader />}>
              <Blog />
            </Suspense>
          } />
          <Route path="/a-propos" element={
            <Suspense fallback={<PageLoader />}>
              <APropos />
            </Suspense>
          } />
          <Route path="/mentions-legales" element={
            <Suspense fallback={<PageLoader />}>
              <MentionsLegales />
            </Suspense>
          } />
          <Route path="/politique-confidentialite" element={
            <Suspense fallback={<PageLoader />}>
              <PolitiqueConfidentialite />
            </Suspense>
          } />
          <Route path="/cgu" element={
            <Suspense fallback={<PageLoader />}>
              <CGU />
            </Suspense>
          } />
          <Route path="/cgv" element={
            <Suspense fallback={<PageLoader />}>
              <CGV />
            </Suspense>
          } />
          <Route path="/admin-test" element={
            <Suspense fallback={<PageLoader />}>
              <AdminTest />
            </Suspense>
          } />
          <Route path="/diagnostic-personnalise" element={
            <Suspense fallback={<PageLoader />}>
              <DiagnosticPersonnalise />
            </Suspense>
          } />
          <Route path="/appointment" element={
            <Suspense fallback={<PageLoader />}>
              <Appointment />
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          } />
         </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
}

export default App;
