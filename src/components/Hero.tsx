import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroAiBg from "@/assets/hero-professional-ai.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-background overflow-hidden min-h-screen flex items-center">
      {/* Subtle AI Network Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-primary"/>
              <circle cx="80" cy="30" r="1.5" fill="currentColor" className="text-primary"/>
              <circle cx="50" cy="70" r="1" fill="currentColor" className="text-primary"/>
              <line x1="20" y1="20" x2="80" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-primary/30"/>
              <line x1="20" y1="20" x2="50" y2="70" stroke="currentColor" strokeWidth="0.5" className="text-primary/30"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>
      
      {/* IA + Human Visual Element */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-10 hidden lg:block">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Human silhouette */}
          <path d="M70 80 C80 70, 90 70, 100 80 L100 120 C100 130, 90 140, 80 140 C70 140, 60 130, 60 120 Z" fill="currentColor" className="text-primary/40"/>
          <circle cx="80" cy="60" r="15" fill="currentColor" className="text-primary/40"/>
          
          {/* AI Brain network */}
          <circle cx="120" cy="60" r="3" fill="currentColor" className="text-primary"/>
          <circle cx="140" cy="70" r="2" fill="currentColor" className="text-primary"/>
          <circle cx="130" cy="85" r="2" fill="currentColor" className="text-primary"/>
          <line x1="120" y1="60" x2="140" y2="70" stroke="currentColor" strokeWidth="1" className="text-primary/60"/>
          <line x1="140" y1="70" x2="130" y2="85" stroke="currentColor" strokeWidth="1" className="text-primary/60"/>
          
          {/* Connection between human and AI */}
          <line x1="95" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="2" className="text-primary/50" strokeDasharray="5,5"/>
        </svg>
      </div>
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

            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2 justify-center">
              <Button 
                size="lg" 
                className="group font-semibold btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground px-6 py-4"
                onClick={() => navigate('/contact')}
              >
                Obtenir un plan d'action personnalisé
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex flex-col items-center gap-2">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-4"
                  onClick={() => {
                    navigate('/calculateur-roi');
                  }}
                >
                  Tester mon ROI
                </Button>
                <span className="text-xs text-text-secondary/80 italic">
                  Résultat instantané en 30 secondes
                </span>
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