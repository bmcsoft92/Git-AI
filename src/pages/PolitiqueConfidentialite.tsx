import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  useEffect(() => {
    document.title = "Politique de Confidentialité & Mentions Légales | Maia Elange";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Politique de confidentialité et mentions légales de Maia Elange. Cookies essentiels, protection RGPD et informations légales sur l\'automatisation intelligente.');
    }
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-heading mb-8">
            Politique de Confidentialité & Mentions Légales
          </h1>
          
          <div className="space-y-12">
            {/* Politique de Confidentialité */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">Politique de Confidentialité</h2>
              
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p>
                  Nous utilisons uniquement des cookies essentiels pour améliorer votre expérience de navigation.
                </p>
                
                <p>
                  Aucun cookie publicitaire ou de suivi tiers n'est utilisé.
                </p>
                
                <p>
                  Les informations que vous saisissez dans nos formulaires (diagnostic, contact, réservation) servent uniquement à répondre à vos demandes et établir des devis personnalisés.
                </p>
                
                <p>
                  Conformément au RGPD, vous pouvez demander à tout moment la suppression de vos données en nous écrivant à <strong className="text-primary">contact@maiaelange.fr</strong>.
                </p>
              </div>
            </section>

            {/* Mentions Légales */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">Mentions Légales</h2>
              
              <div className="space-y-4 text-text-secondary">
                <div>
                  <span className="font-semibold text-heading">Entreprise :</span> Maïa Elange – Entreprise Individuelle
                </div>
                
                <div>
                  <span className="font-semibold text-heading">Responsable de publication :</span> Anne Carine Mandjana
                </div>
                
                <div>
                  <span className="font-semibold text-heading">Email :</span> <span className="text-primary">contact@maiaelange.fr</span>
                </div>
                
                <div>
                  <span className="font-semibold text-heading">Hébergeur :</span> Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Chypre
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;