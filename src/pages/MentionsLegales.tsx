import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  useEffect(() => {
    document.title = "Mentions Légales | Maia Elange - Automatisation Intelligente & IA";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mentions légales de Maia Elange, spécialiste en automatisation intelligente et transformation digitale par IA. Conformité RGPD et informations légales.');
    }
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-heading mb-8">
            Mentions légales
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Éditeur du site</h2>
              <div className="text-text-secondary space-y-2">
                <p>Maia Élange – Entreprise Individuelle</p>
                <p>Dirigeante : Anne-Carine Mandjana</p>
                <p>Adresse de l'établissement principal : 60 rue François Ier, 75008 Paris</p>
                <p>Immatriculée au RCS de Paris sous le numéro 944 929 660</p>
                <p>Email : contact@maiaelange.fr</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Directrice de la publication</h2>
              <p className="text-text-secondary">Anne-Carine Mandjana</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Hébergement</h2>
              <div className="text-text-secondary space-y-2">
                <p>Site hébergé par Hostinger International Ltd.</p>
                <p>61 Lordou Vironos, 6023 Larnaca, Chypre</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Propriété intellectuelle</h2>
              <p className="text-text-secondary">
                Tout le contenu (textes, images, graphismes, logo, code) est la propriété de Maia Élange sauf mention contraire.
                Toute reproduction est interdite sans autorisation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Responsabilité</h2>
              <p className="text-text-secondary">
                Maia Élange s'efforce de fournir une information fiable mais ne saurait être tenue responsable d'erreurs ou omissions, 
                ni des dommages liés à l'utilisation du site.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentionsLegales;