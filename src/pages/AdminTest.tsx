import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminTestPanel } from "@/components/AdminTestPanel";

const AdminTest = () => {
  useEffect(() => {
    // SEO pour la page de test admin
    document.title = "Test Funnel Admin - Maia elange";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Panel de test administrateur pour vérifier le funnel utilisateur complet de Maia elange');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          
          {/* Header avec avertissement */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-4">
                Panel Test Funnel
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                Interface de test pour vérifier le bon fonctionnement du funnel utilisateur complet
              </p>
              
              {/* Avertissement admin */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    ⚠️
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Accès Admin uniquement</strong> - Cette page permet de tester l'ensemble du funnel utilisateur :
                      emails client, emails internes, mise à jour CRM, et fonctionnement des edge functions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de test */}
          <AdminTestPanel />

          {/* Instructions d'utilisation */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Instructions d'utilisation</h3>
               <div className="space-y-3 text-blue-800">
                <div className="flex items-start gap-3">
                  <span className="font-semibold min-w-[120px]">Test ROI :</span>
                  <span>Vérifie l'analyse IA, l'email client avec recommandations, l'email interne équipe, et la création du lead CRM avec scoring automatique</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold min-w-[120px]">Test RDV :</span>
                  <span>Vérifie la réservation, l'email de confirmation client, l'email interne équipe, et la mise à jour du statut lead</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold min-w-[120px]">Test Contact :</span>
                  <span>Vérifie l'envoi du message, l'accusé de réception client, l'email interne équipe, et la création/mise à jour du lead</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold min-w-[120px]">Test Complet :</span>
                  <span>Lance les 3 tests + vérification CRM automatique pour valider l'optimisation complète</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold min-w-[120px]">Vérif CRM :</span>
                  <span>Analyse les tables Supabase : scoring automatique (CHAUD/TIEDE/FROID), relations entre tables, détection doublons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations techniques */}
          <div className="max-w-4xl mx-auto mt-8">
            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-semibold text-gray-700 cursor-pointer">🔧 Informations techniques</summary>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p><strong>Edge Functions testées :</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><code>analyze-roi-data</code> - Analyse ROI + recommandations IA + emails</li>
                  <li><code>book-appointment</code> - Réservation RDV + emails + CRM</li>
                  <li><code>send-contact-message</code> - Messages contact + emails + CRM</li>
                  <li><code>send-roi-email</code> - Envoi emails ROI (appelé par analyze-roi-data)</li>
                </ul>
                <p className="mt-3"><strong>Vérifications effectuées :</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Fonctionnement des edge functions</li>
                  <li>Envoi des emails clients (via Resend)</li>
                  <li>Envoi des emails internes équipe</li>
                  <li>Mise à jour du CRM (fonction upsert_lead avec scoring automatique)</li>
                  <li>Sauvegarde en base de données (leads, roi_calculations, appointments, contact_messages)</li>
                  <li>Vérification scoring automatique (CHAUD/TIEDE/FROID selon budget et ROI)</li>
                  <li>Contrôle relations entre tables via lead_id</li>
                  <li>Détection et prévention des doublons d'email</li>
                  <li>Gestion des erreurs et temps de réponse</li>
                </ul>
              </div>
            </details>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminTest;