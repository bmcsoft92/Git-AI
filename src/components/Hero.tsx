import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroAiBg from "@/assets/hero-ai-brain-bg.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-background overflow-hidden min-h-screen flex items-center">
      {/* Optimized AI Background with proper alt text */}
        <img 
          src={heroAiBg}
          alt="Réseau de neurones représentant l'intelligence artificielle au service des entreprises"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16 animate-fade-in-up">
            <div className="mb-12">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold bg-primary/20 text-primary border border-primary/30">
                Innovation • IA Avancée
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-heading mb-8 lg:mb-12 leading-tight">
              L'IA + l'Humain
              <span className="text-primary block">
                au service de votre organisation
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl xl:text-2xl text-text-secondary mb-8 lg:mb-12 leading-relaxed max-w-4xl mx-auto">
              Nous concevons des systèmes d'automatisation <strong className="text-primary">simples, mesurables et conformes</strong>, permettant aux organisations de toutes tailles de <strong className="text-primary">réduire leurs coûts</strong> et d'<strong className="text-primary">augmenter leur impact</strong>.
            </p>

            {/* Credibility Badge */}
            <div className="mb-12 animate-fade-in-up-delay-1">
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-success/10 text-success border border-success/30">
                <span className="mr-2">🛡️</span>
                Aligné avec les standards européens (RGPD, IA responsable)
              </div>
            </div>

            
            <div className="flex flex-col gap-6 animate-fade-in-up-delay-2 max-w-2xl mx-auto">
              {/* Deux choix principaux à égalité */}
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  className="group font-semibold btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground px-8 py-4 text-lg h-20 flex flex-col items-center justify-center"
                  onClick={() => navigate('/calculateur-roi')}
                >
                  <span className="text-base font-semibold">Calculer mon ROI</span>
                  <span className="text-sm opacity-90">Estimation rapide en 30s</span>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg h-20 flex flex-col items-center justify-center"
                  onClick={() => navigate('/diagnostic-personnalise')}
                >
                  <span className="text-base font-semibold">Diagnostic Personnalisé</span>
                  <span className="text-sm opacity-90">3 recommandations ciblées</span>
                </Button>
              </div>
              
              {/* Action secondaire centrée */}
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  size="default" 
                  className="text-text-secondary hover:text-primary hover:bg-primary/5 px-6 py-3"
                  onClick={() => navigate('/contact')}
                >
                  Ou nous contacter directement
                </Button>
              </div>
            </div>

            {/* Garanties */}
            <div className="flex flex-wrap gap-4 mt-6 animate-fade-in-up-delay-2 justify-center">
              <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                ✓ Facturation au temps passé
              </Badge>
              <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                ✓ Sur devis personnalisé
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;