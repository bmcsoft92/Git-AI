import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Integrations from "@/components/Integrations";
import ProcessSection from "@/components/ProcessSection";
import AutomationCTA from "@/components/AutomationCTA";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Maia Elange | L'IA + l'Humain au service de votre organisation";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez comment Maia Elange connecte vos outils existants (Google Workspace, Outlook, Salesforce, Slack, Teams, LinkedIn…) à ses solutions d\'automatisation. Des intégrations fluides, évolutives et sans refonte technique.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Découvrez comment Maia Elange connecte vos outils existants (Google Workspace, Outlook, Salesforce, Slack, Teams, LinkedIn…) à ses solutions d\'automatisation. Des intégrations fluides, évolutives et sans refonte technique.');
      document.head.appendChild(metaDescription);
    }
  }, []);
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
      <footer id="contact" className="relative bg-gradient-to-br from-card to-card/80 border-t border-border/50 overflow-hidden">
        {/* Éléments décoratifs d'arrière-plan */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Section Maia Elange */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-cta-primary/20 backdrop-blur-sm border border-primary/20 shadow-lg">
                  <img 
                    src="/lovable-uploads/6464ae76-963f-4a08-96fb-19127780a208.png" 
                    alt="Logo Maia Elange - Agence d'automatisation IA et d'intelligence artificielle" 
                    className="w-8 h-8 rounded-lg" 
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-heading">Maia Elange</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-text-secondary leading-relaxed font-medium">
                  Agence d'IA & d'automatisation pour organisations.
                </p>
                <p className="text-sm text-text-secondary italic border-l-2 border-primary/30 pl-3">
                  Simples, mesurables, financables.
                </p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2 group hover:text-primary transition-colors">
                  <span className="font-semibold text-primary min-w-0 flex-shrink-0">📍</span>
                  <span className="text-text-secondary group-hover:text-primary transition-colors">60 rue François Ier, 75008 Paris, France</span>
                </div>
                <div className="flex items-center space-x-2 group hover:text-primary transition-colors">
                  <span className="font-semibold text-primary">📧</span>
                  <a href="mailto:contact@maiaelange.fr" className="text-text-secondary group-hover:text-primary transition-colors hover:underline">
                    contact@maiaelange.fr
                  </a>
                </div>
                <div className="flex items-start space-x-2 group">
                  <span className="font-semibold text-primary min-w-0 flex-shrink-0">🕒</span>
                  <div className="text-text-secondary">
                    <div>Lun-Ven 9h-18h</div>
                    <div>Sam 9h-12h • Dim fermé</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Solutions */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-heading relative">
                Solutions
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-cta-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Automatisation admin", href: "#" },
                  { name: "Assistants IA", href: "#" },
                  { name: "Marketing & croissance", href: "#" },
                  { name: "Business Intelligence", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="text-text-secondary hover:text-primary transition-all duration-300 group flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Parcours */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-heading relative">
                Parcours
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-cta-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Processus", href: "#processus" },
                  { name: "Résultats", href: "#" },
                  { name: "Simulateur ROI", href: "#" },
                  { name: "FAQ", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="text-text-secondary hover:text-primary transition-all duration-300 group flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Ressources */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-heading relative">
                Ressources
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-cta-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "RGPD & sécurité", href: "#" },
                  { name: "Intégrations", href: "#" },
                  { name: "Financements", href: "#" },
                  { name: "Contact", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="text-text-secondary hover:text-primary transition-all duration-300 group flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Séparateur élégant */}
          <div className="my-8">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>

          {/* Copyright et liens légaux */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-sm text-text-secondary font-medium">
                © 2025 Maia Elange – Tous droits réservés.
              </div>
              <div className="hidden md:block w-1 h-1 bg-text-secondary/50 rounded-full"></div>
              <div className="text-xs text-text-secondary/80">
                Fait avec ❤️ pour l'automatisation intelligente
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              {[
                { name: "Mentions légales", href: "#" },
                { name: "Politique de confidentialité", href: "#" },
                { name: "CGV", href: "#" }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-primary hover:text-cta-primary transition-colors duration-300 font-medium hover:underline underline-offset-4 decoration-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;