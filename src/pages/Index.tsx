import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Integrations from "@/components/Integrations";
import ProcessSection from "@/components/ProcessSection";
import AutomationCTA from "@/components/AutomationCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Integrations />
        <ProcessSection />
        <AutomationCTA />
      </main>
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Section Maia Elange */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/8d8704c1-3e0c-4716-b520-20779aef37e0.png" 
                    alt="Maia Elange Logo" 
                    className="w-full h-full rounded-lg" 
                  />
                </div>
                <h3 className="text-xl font-bold text-heading">Maia Elange</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Agence d'IA & d'automatisation pour organisations.
              </p>
              <p className="text-text-secondary mb-6">
                Simples, mesurables, finanables.
              </p>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="font-medium">Adresse :</span> 60 rue François Ier, 75008 Paris, France</p>
                <p><span className="font-medium">Email :</span> contact@maiaelange.fr</p>
                <p><span className="font-medium">Horaires :</span> Lun-Ven 9h-18h • Sam 9h-12h • Dim fermé</p>
              </div>
            </div>

            {/* Section Solutions */}
            <div>
              <h4 className="text-lg font-semibold text-heading mb-4">Solutions</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Automatisation admin</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Assistants IA</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Marketing & croissance</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Business Intelligence</a></li>
              </ul>
            </div>

            {/* Section Parcours */}
            <div>
              <h4 className="text-lg font-semibold text-heading mb-4">Parcours</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#processus" className="hover:text-primary transition-colors">Processus</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Résultats</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Simulateur ROI</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Section Ressources */}
            <div>
              <h4 className="text-lg font-semibold text-heading mb-4">Ressources</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">RGPD & sécurité</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Intégrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Financements</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright et liens légaux */}
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-text-secondary mb-4 md:mb-0">
              © 2025 Maia Elange – Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary hover:text-primary-foreground transition-colors">Mentions légales</a>
              <a href="#" className="text-primary hover:text-primary-foreground transition-colors">Politique de confidentialité</a>
              <a href="#" className="text-primary hover:text-primary-foreground transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;