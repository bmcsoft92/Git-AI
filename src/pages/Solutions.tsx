import { useEffect } from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Solutions = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Solutions d'Automatisation IA | Maia elange";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez nos solutions d\'automatisation pour accélérer votre croissance, optimiser votre efficacité et renforcer votre impact marketing. Adaptées aux PME, ETI et grandes organisations.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Découvrez nos solutions d\'automatisation pour accélérer votre croissance, optimiser votre efficacité et renforcer votre impact marketing. Adaptées aux PME, ETI et grandes organisations.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <div className="container mx-auto px-4 pt-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10 hover-scale"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10 hover-scale"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Button>
        </div>
      </div>
      <main>
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;