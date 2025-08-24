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
                  <strong className="text-heading">Utilisation des données :</strong> Les informations collectées via nos formulaires (diagnostic ROI, prise de contact, réservation d'entretien) sont utilisées uniquement pour répondre à vos demandes et établir des devis personnalisés.
                </p>
                
                <p>
                  <strong className="text-heading">Base légale :</strong> Le traitement de vos données personnelles repose sur votre consentement libre et éclairé lors de la soumission des formulaires.
                </p>
                
                <p>
                  <strong className="text-heading">Données collectées :</strong> Nom, prénom, email, téléphone, entreprise, informations sur vos processus métier (pour les diagnostics ROI uniquement).
                </p>
                
                <p>
                  <strong className="text-heading">Sous-traitants :</strong> Nous faisons appel aux sous-traitants suivants qui peuvent traiter vos données :
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Supabase :</strong> Hébergement sécurisé de la base de données (Irlande, conformité RGPD)</li>
                  <li><strong>Resend :</strong> Envoi des emails transactionnels (États-Unis, Privacy Shield)</li>
                  <li><strong>Hostinger :</strong> Hébergement du site web (Union Européenne)</li>
                </ul>
                
                <p>
                  <strong className="text-heading">Engagement :</strong> Vos données sont utilisées uniquement dans le cadre de nos services et ne sont jamais partagées avec des tiers à des fins commerciales.
                </p>
                
                <p>
                  <strong className="text-heading">Durée de conservation :</strong> Vos données sont conservées pour une durée maximale de 3 ans, sauf demande de suppression de votre part.
                </p>
                
                <p>
                  <strong className="text-heading">Vos droits RGPD :</strong> Conformément au Règlement Général sur la Protection des Données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.
                </p>
                
                <p>
                  <strong className="text-heading">Cookies :</strong> Nous utilisons uniquement des cookies essentiels pour le bon fonctionnement du site. Aucun cookie publicitaire ou de suivi tiers n'est utilisé.
                </p>
                
                <p className="bg-primary/10 p-4 rounded-lg">
                  <strong className="text-primary">Pour exercer vos droits :</strong> Contactez-nous à <strong className="text-primary">contact@maiaelange.fr</strong>
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