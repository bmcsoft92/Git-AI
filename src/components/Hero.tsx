import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-ai-automation.jpg";
import AnimatedCounter from "./AnimatedCounter";

const Hero = () => {
  const stats = [
    { value: "500+", label: "processus automatisés" },
    { value: "340", label: "ROI moyen", suffix: "%" },
    { value: "98", label: "satisfaction client", suffix: "%" }
  ];

  return (
    <section className="relative bg-background overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0 animate-fade-in-up">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30">
                Innovation • IA Avancée
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-heading mb-8 leading-tight">
              L'IA + l'Humain
              <span className="text-primary block">
                au service de votre entreprise
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl">
              Nous libérons vos équipes des tâches répétitives en <strong className="text-primary">2 semaines</strong> grâce à une 
              automatisation sans code, vous permettant de <strong className="text-primary">réduire vos coûts de 40%</strong> et 
              d'augmenter votre productivité.
            </p>

            {/* Preuves sociales avec stats animées */}
            <div className="flex flex-wrap gap-6 mb-10 animate-fade-in-up-delay">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-baseline justify-center">
                    <AnimatedCounter 
                      value={stat.value}
                      className="text-2xl font-bold text-primary"
                    />
                    {stat.suffix && (
                      <span className="text-2xl font-bold text-primary">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-sm text-text-secondary font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
              <Button 
                size="lg" 
                className="group font-semibold btn-cta-hover bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground"
              >
                Réserver mon diagnostic gratuit (2h sur site)
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
            <div className="flex flex-wrap gap-4 mt-6 animate-fade-in-up-delay-2">
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
          
          <div className="relative animate-fade-in-up-delay lg:justify-self-end">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img
                src={heroImage}
                alt="Intelligence artificielle et automatisation organisationnelle de pointe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;