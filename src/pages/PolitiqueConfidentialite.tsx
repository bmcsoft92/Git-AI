import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  useEffect(() => {
    document.title = "Politique de Confidentialité | Maia Élange";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Politique de confidentialité RGPD de Maia Élange. Protection et traitement des données personnelles en conformité européenne.');
    }
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-heading mb-8">
            Politique de confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">1. Collecte des données</h2>
              <p className="text-text-secondary">
                Nous collectons uniquement les informations nécessaires via nos formulaires (nom, email, informations transmises volontairement).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">2. Finalité</h2>
              <div className="text-text-secondary">
                <p>Les données sont utilisées pour :</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>répondre aux demandes de contact,</li>
                  <li>fournir des diagnostics et plans d'action,</li>
                  <li>améliorer nos services.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">3. Conservation</h2>
              <p className="text-text-secondary">
                Les données sont conservées pendant une durée maximale de 3 ans, sauf demande de suppression par l'utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">4. Partage</h2>
              <p className="text-text-secondary">
                Les données ne sont jamais vendues ni cédées. Elles peuvent être partagées uniquement avec nos prestataires techniques (hébergeur, outils d'automatisation).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">5. Sécurité</h2>
              <p className="text-text-secondary">
                Nous mettons en place des mesures de sécurité pour protéger vos données.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">6. Droits des utilisateurs</h2>
              <div className="text-text-secondary space-y-2">
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données.
                </p>
                <p className="font-medium">👉 Pour exercer vos droits : contact@maiaelange.fr</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading mb-4">7. Cookies</h2>
              <div className="text-text-secondary space-y-2">
                <p>
                  Le site peut utiliser des cookies techniques et analytiques pour améliorer l'expérience utilisateur.
                </p>
                <p>
                  Vous pouvez les refuser ou les gérer via votre navigateur.
                </p>
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