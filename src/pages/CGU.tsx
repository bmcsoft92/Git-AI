import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CGU = () => {
  useEffect(() => {
    document.title = "Conditions Générales d'Utilisation | Maia elange";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conditions générales d\'utilisation de Maia elange. Utilisation du simulateur ROI, diagnostic automatisation et services d\'accompagnement.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-heading mb-8">
            Conditions Générales d'Utilisation
          </h1>
          
          <div className="space-y-12">
            {/* Objet du site */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">1. Objet du site</h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Le site Maia elange a pour objet de fournir des informations sur l'automatisation intelligente et de proposer les services suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Informations et conseils sur l'automatisation des processus</li>
                  <li>Diagnostic personnalisé d'automatisation</li>
                  <li>Réservation d'entretiens de conseil</li>
                  <li>Simulateur ROI pour évaluer le potentiel d'automatisation</li>
                </ul>
              </div>
            </section>

            {/* Accès gratuit */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">2. Accès aux services</h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  <strong className="text-heading">Accès gratuit :</strong> Le simulateur ROI et les informations générales sont accessibles gratuitement à tous les visiteurs du site.
                </p>
                <p>
                  <strong className="text-heading">Services personnalisés :</strong> Les diagnostics personnalisés et les entretiens de conseil font l'objet de devis sur mesure.
                </p>
              </div>
            </section>

            {/* Engagement utilisateur */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">3. Engagement de l'utilisateur</h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  En utilisant ce site, l'utilisateur s'engage à :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fournir des informations exactes et à jour dans les formulaires</li>
                  <li>Utiliser le site dans le respect des lois en vigueur</li>
                  <li>Ne pas porter atteinte au fonctionnement du site</li>
                  <li>Respecter les droits de propriété intellectuelle</li>
                </ul>
              </div>
            </section>

            {/* Limitation de responsabilité */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">4. Limitation de responsabilité</h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <strong className="text-amber-800">Important :</strong> Les résultats fournis par nos outils (simulateur ROI, diagnostics d'automatisation) sont <strong>indicatifs et non contractuels</strong>.
                </p>
                <p>
                  Ces outils sont conçus pour donner une première estimation et orientation. Seul un diagnostic personnalisé réalisé par nos experts peut aboutir à des recommandations précises et contractuelles.
                </p>
                <p>
                  Maia elange ne saurait être tenue responsable des décisions prises par l'utilisateur sur la base des informations indicatives fournies par le site.
                </p>
              </div>
            </section>

            {/* Modification des CGU */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">5. Modification des conditions</h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Maia elange se réserve le droit de modifier ces conditions générales d'utilisation à tout moment. 
                  Les nouvelles conditions seront applicables dès leur mise en ligne sur le site.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-br from-primary/10 to-cta-primary/10 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-heading mb-4">Questions sur ces conditions ?</h3>
              <p className="text-text-secondary">
                Pour toute question concernant ces conditions d'utilisation, contactez-nous à : 
                <strong className="text-primary"> contact@maiaelange.fr</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CGU;