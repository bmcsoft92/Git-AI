import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  useEffect(() => {
    document.title = "Mentions Légales | Maïa Elange - Automatisation Intelligente & IA";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mentions légales de Maïa Elange, spécialiste en automatisation intelligente et transformation digitale par IA. Conformité RGPD et informations légales.');
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
              <h2 className="text-2xl font-bold text-heading mb-4">Dénomination sociale</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong>Dénomination sociale :</strong> Maïa Elange</p>
                <p><strong>Statut :</strong> Entreprise Individuelle</p>
                <p><strong>Responsable :</strong> Anne Carine Ndoh Mandjana</p>
                <p><strong>Contact :</strong> contact@maiaelange.fr</p>
                <p><strong>Forme juridique :</strong> Entreprise individuelle en cours d'immatriculation</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Responsable de publication</h2>
              <p className="text-text-secondary">Anne Carine (CEO)</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Hébergement</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong>Hébergeur :</strong> Hostinger</p>
                <p><strong>Site web :</strong> <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.hostinger.fr</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Propriété intellectuelle</h2>
              <p className="text-text-secondary">
                Tout le contenu (textes, images, graphismes, logo, code) est la propriété de Maïa Elange sauf mention contraire.
                Toute reproduction est interdite sans autorisation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">Responsabilité</h2>
              <p className="text-text-secondary">
                Maïa Elange s'efforce de fournir une information fiable mais ne saurait être tenue responsable d'erreurs ou omissions, 
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