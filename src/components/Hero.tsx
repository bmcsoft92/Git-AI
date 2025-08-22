import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-automation.jpg";

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-10 lg:mb-0">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Innovation & Confiance
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-heading mb-6 leading-tight">
              L'IA + l'Humain au service
              <span className="text-primary block">
                de votre entreprise
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed font-medium">
              <strong className="text-heading">Nous libérons vos équipes des tâches répétitives en 2 semaines</strong> grâce à une automatisation sans code, 
              vous permettant de <strong className="text-primary">réduire vos coûts de 40%</strong> et d'<strong className="text-primary">augmenter votre productivité</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="cta" size="lg" className="group font-semibold">
                Réserver mon diagnostic gratuit (2h sur site)
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Calculer mes économies
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-primary mb-1">+500</div>
                <div className="text-sm text-text-secondary">Processus automatisés</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-primary mb-1">ROI +340%</div>
                <div className="text-sm text-text-secondary">En moyenne</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-text-secondary">Satisfaction client</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Automatisation industrielle moderne"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-primary">2 semaines</div>
              <div className="text-sm text-text-secondary">Automatisation sans code</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;