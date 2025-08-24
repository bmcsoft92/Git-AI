import { useEffect } from "react";
import Header from "@/components/Header";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

const Methode = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Notre Méthode | Du Diagnostic à la Performance Mesurable";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Une approche structurée : diagnostic, stratégie sur-mesure, intégration progressive et suivi. Maia Elange vous apporte clarté et ROI observable.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Une approche structurée : diagnostic, stratégie sur-mesure, intégration progressive et suivi. Maia Elange vous apporte clarté et ROI observable.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
};

export default Methode;