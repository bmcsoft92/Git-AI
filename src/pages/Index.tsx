import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Integrations from "@/components/Integrations";
import ProcessSection from "@/components/ProcessSection";
import AutomationCTA from "@/components/AutomationCTA";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Maia Elange | L'IA + l'Humain au service des organisations";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Maia Elange aide les organisations à réduire leurs coûts et augmenter leur impact grâce à des systèmes d\'automatisation simples, mesurables et conformes.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Maia Elange aide les organisations à réduire leurs coûts et augmenter leur impact grâce à des systèmes d\'automatisation simples, mesurables et conformes.');
      document.head.appendChild(metaDescription);
    }
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Integrations />
        <ProcessSection />
        <AutomationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;