import { useEffect } from "react";
import Header from "@/components/Header";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Methode = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Notre Méthode | Du Diagnostic à la Performance Mesurable";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Une approche structurée : diagnostic, stratégie sur-mesure, intégration progressive et suivi. Maia elange vous apporte clarté et ROI observable.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Une approche structurée : diagnostic, stratégie sur-mesure, intégration progressive et suivi. Maia elange vous apporte clarté et ROI observable.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Button>
        </div>
      </div>
      <main>
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
};

export default Methode;