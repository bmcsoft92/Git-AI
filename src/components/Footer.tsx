import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Calendar, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <>
      {/* CTA Final Section */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cta-primary rounded-full blur-3xl transform -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="bg-gradient-to-br from-card/80 to-muted/50 backdrop-blur-sm border border-primary/20 p-8 lg:p-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-heading mb-6">
                Prêt à passer à l'action ?
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Discutons de vos besoins et voyons comment Maia Élange peut s'intégrer à vos opérations.
              </p>
              <Button 
                onClick={handleContactClick}
                variant="cta"
                size="lg"
                className="px-8 py-4 text-lg group/cta"
              >
                Obtenir un plan d'action personnalisé
                <ExternalLink className="ml-3 h-5 w-5 transition-transform group-hover/cta:scale-110" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-card to-card/80 border-t border-border/50 overflow-hidden">
        {/* Éléments décoratifs d'arrière-plan */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Logo et baseline */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-cta-primary/20 backdrop-blur-sm border border-primary/20 shadow-lg">
                <img 
                  src="/lovable-uploads/6464ae76-963f-4a08-96fb-19127780a208.png" 
                  alt="Logo Maia Elange - Agence d'automatisation IA et d'intelligence artificielle" 
                  className="w-8 h-8 rounded-lg" 
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-heading">Maia Élange</h3>
            </div>
            <p className="text-lg font-medium text-primary mb-2">
              L'IA + l'Humain au service des organisations
            </p>
            <p className="text-sm text-text-secondary italic">
              Systèmes d'automatisation simples, mesurables et conformes.
            </p>
          </div>

          {/* 4 Colonnes du Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-8">
            
            {/* Colonne 1: Navigation principale */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-heading relative">
                Navigation principale
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-cta-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Accueil", href: "/" },
                  { name: "Solutions", href: "/solutions" },
                  { name: "Méthode", href: "/methode" },
                  { name: "Cas d'usage", href: "/cas-usage" },
                  { name: "Calculateur ROI", href: "/calculateur-roi" },
                  { name: "Blog & Guides", href: "/blog" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.href} 
                      className="text-text-secondary hover:text-primary transition-all duration-300 group flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 2: Confiance */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-heading relative">
                Confiance
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-cta-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "À propos", href: "/a-propos" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Contact", href: "/contact" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.href} 
                      className="text-text-secondary hover:text-primary transition-all duration-300 group flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3: Légal & conformité */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-heading relative">
                Légal & Conformité
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-cta-primary rounded-full"></div>
              </h4>
              
              {/* Élément de confiance RGPD */}
              <div className="bg-gradient-to-br from-primary/10 to-cta-primary/10 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-heading">RGPD ✅</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Conformité européenne garantie
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  { name: "Mentions légales", href: "/mentions-legales" },
                  { name: "Politique de confidentialité", href: "/politique-confidentialite" },
                  { name: "CGU", href: "/cgu" },
                  { name: "CGV", href: "/cgv", note: "(bientôt)" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.href} 
                      className="text-text-secondary hover:text-primary transition-all duration-300 group flex items-center space-x-2 text-sm"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                        {item.note && <span className="ml-1 text-xs text-text-secondary/70">{item.note}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 4: Call to Action */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-heading relative">
                Prêt à commencer ?
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-cta-primary rounded-full"></div>
              </h4>
              
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Email</p>
                    <a 
                      href="mailto:contact@maiaelange.fr" 
                      className="text-primary hover:text-cta-primary transition-colors font-medium text-sm"
                    >
                      contact@maiaelange.fr
                    </a>
                  </div>
                </div>

                {/* Calendly */}
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Rendez-vous</p>
                    <Link 
                      to="/contact" 
                      className="text-primary hover:text-cta-primary transition-colors font-medium text-sm"
                    >
                      Planifier un échange
                    </Link>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 p-4 bg-gradient-to-br from-cta-primary/10 to-primary/10 rounded-lg border border-cta-primary/20">
                <Button 
                  onClick={() => navigate('/contact')}
                  variant="cta"
                  size="lg"
                  className="w-full text-sm font-medium"
                >
                  Obtenir un plan d'action personnalisé
                </Button>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                    <Linkedin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary mb-1">LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/company/maia-elange" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-cta-primary transition-colors font-medium text-sm"
                    >
                      Suivez-nous
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Séparateur élégant */}
          <div className="my-8">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <div className="text-sm text-text-secondary font-medium mb-2">
              © 2025 Maia Élange – Tous droits réservés.
            </div>
            <div className="text-xs text-text-secondary/80">
              Fait avec ❤️ pour l'automatisation intelligente
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;