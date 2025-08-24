import { useEffect } from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const Solutions = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Solutions d'Automatisation IA | Maia Elange";
    
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;