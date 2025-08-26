import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Calendar, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    window.location.href = '/appointment';
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
                Discutons de vos besoins et voyons comment Maia elange peut s'intégrer à vos opérations.
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
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Bloc identité */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/6464ae76-963f-4a08-96fb-19127780a208.png" 
                  alt="Logo Maïa Elange" 
                  className="w-12 h-12 rounded-lg" 
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-heading">Maïa Élange</h3>
            </div>
            <p className="text-lg font-medium text-primary">
              Automatisation simple, mesurable et conforme
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            
            {/* Bloc informations légales */}
            <div>
              <h4 className="text-lg font-semibold text-heading mb-6">Informations légales</h4>
              <div className="space-y-3 text-sm text-text-secondary">
                <p><strong className="text-heading">Nom commercial :</strong> Maia elange – Entreprise Individuelle</p>
                <p><strong className="text-heading">SIREN :</strong> 944 929 660 R.C.S. Paris</p>
                <p><strong className="text-heading">Adresse établissement principal :</strong><br />
                   60 rue François Ier, 75008 Paris</p>
                <p><strong className="text-heading">Email :</strong> 
                   <a href="mailto:contact@maiaelange.fr" className="text-primary hover:text-cta-primary ml-1">
                     contact@maiaelange.fr
                   </a>
                </p>
              </div>
            </div>

            {/* Bloc conformité */}
            <div>
              <h4 className="text-lg font-semibold text-heading mb-6">Conformité</h4>
              <div className="space-y-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">Conforme RGPD</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Respect des normes européennes de protection des données
                  </p>
                </div>
                
                <div className="flex flex-col space-y-2 text-sm">
                  <Link 
                    to="/mentions-legales" 
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Mentions légales
                  </Link>
                  <span className="text-text-secondary/50">•</span>
                  <Link 
                    to="/politique-confidentialite" 
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                  <span className="text-text-secondary/50">•</span>
                  <Link 
                    to="/cgu" 
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Politique RGPD
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-border pt-8">
            {/* Bloc bas de page */}
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                © 2025 Maia elange – Tous droits réservés
              </p>
            </div>
          </div>
          
        </div>
      </footer>
    </>
  );
};

export default Footer;