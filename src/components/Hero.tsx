import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroAiBg from "@/assets/hero-ai-brain-bg.jpg";

const Hero = () => {

  return (
    <section className="relative bg-background overflow-hidden min-h-screen flex items-center">
      {/* Subtle AI Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroAiBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16 animate-fade-in-up">
            <div className="mb-12">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold bg-primary/20 text-primary border border-primary/30">
                Expertise Technique • Excellence IA
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-heading mb-12 leading-tight">
              L'IA + l'Humain
              <span className="text-primary block">
                au service de votre entreprise
              </span>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-text-secondary mb-16 leading-relaxed max-w-4xl mx-auto">
              Nous concevons des systèmes d'automatisation <strong className="text-primary">simples, mesurables et finançables</strong>. vous permettant de <strong className="text-primary">réduire vos coûts</strong> et d'<strong className="text-primary">augmenter votre productivité</strong>.
            </p>

            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2 justify-center">
              <Button 
                size="lg" 
                className="group font-semibold btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground"
              >
                Diagnostic gratuit
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Calculer mon ROI
              </Button>
            </div>

            {/* Garanties */}
            <div className="flex flex-wrap gap-4 mt-6 animate-fade-in-up-delay-2 justify-center">
              <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                ✓ Sans engagement
              </Badge>
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