import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, TrendingUp, Star } from "lucide-react";
import heroImage from "@/assets/hero-ai-automation.jpg";
import AnimatedCounter from "./AnimatedCounter";

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-10 lg:mb-0 animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30">
                Innovation • IA Avancée
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-heading mb-6 leading-tight">
              Solutions IA
              <span className="text-primary block">
                pour Entreprises Visionnaires
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              <strong className="text-heading">Maia Elange</strong> révolutionne votre organisation avec des 
              <strong className="text-primary"> agents IA sur mesure</strong> et une automatisation intelligente. 
              Excellence technologique, résultats mesurables.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up-delay">
              <Button variant="cta" size="lg" className="group font-semibold btn-cta-hover uppercase tracking-wide">
                Découvrir l'Excellence IA
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Expertise Technique
              </Button>
            </div>
            
          </div>
          
          <div className="relative animate-fade-in-up-delay">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-border">
              <img
                src={heroImage}
                alt="Intelligence artificielle premium et automatisation organisationnelle de pointe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">Excellence</div>
              <div className="text-sm text-text-secondary">Design & IA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;