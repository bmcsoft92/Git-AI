import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CGV = () => {
  useEffect(() => {
    document.title = "Conditions Générales de Vente | Maia elange";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conditions générales de vente de Maia elange. Modalités de devis, paiement et prestations d\'automatisation intelligente.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-heading mb-8">
            Conditions Générales de Vente
          </h1>
          
          <div className="space-y-12">
            {/* Statut placeholder */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-amber-800 mb-4">
                Page en cours de rédaction
              </h2>
              <p className="text-amber-700 leading-relaxed mb-6">
                Les Conditions Générales de Vente seront publiées dès le lancement officiel des prestations facturées. 
                Actuellement, tous les diagnostics et conseils sont fournis à titre informatif.
              </p>
            </div>

            {/* Contenu à venir */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">Contenu à venir</h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Les futures Conditions Générales de Vente préciseront :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-heading">Modalités de devis :</strong> Processus d'établissement et de validation des devis personnalisés</li>
                  <li><strong className="text-heading">Paiement :</strong> Modes de paiement acceptés, échéances et conditions</li>
                  <li><strong className="text-heading">Facturation :</strong> Modalités d'émission et de traitement des factures</li>
                  <li><strong className="text-heading">Délais :</strong> Délais de livraison et d'exécution des prestations</li>
                  <li><strong className="text-heading">Droit de rétractation :</strong> Conditions d'exercice du droit de rétractation légal</li>
                  <li><strong className="text-heading">Garanties :</strong> Garanties commerciales et conditions de mise en œuvre</li>
                </ul>
              </div>
            </section>

            {/* Services actuels */}
            <section className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">Services actuellement disponibles</h2>
              
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-green-800">
                    <strong>Gratuit :</strong> Simulateur ROI, informations générales et premier niveau de conseil
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Sur devis :</strong> Diagnostics personnalisés et accompagnement spécialisé
                  </p>
                </div>
              </div>
            </section>

            {/* Contact temporaire */}
            <section className="bg-gradient-to-br from-primary/10 to-cta-primary/10 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-heading mb-4">Besoin d'informations ?</h3>
              <p className="text-text-secondary">
                Pour toute question sur nos futures prestations ou conditions commerciales : 
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

export default CGV;