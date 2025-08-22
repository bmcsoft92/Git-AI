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
              Systèmes d'Automatisation
              <span className="text-primary block">
                IA pour Organisations
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Transformez vos processus organisationnels avec nos solutions d'intelligence artificielle 
              avancées. Automatisation intelligente des workflows, prise de décision augmentée et 
              optimisation continue de vos opérations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="cta" size="lg" className="group">
                Demander une démo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Découvrir nos solutions
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-2" />
                Efficacité +80% avec IA
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-2" />
                Automatisation intelligente
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-2" />
                Déploiement en 30 jours
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
              <div className="text-2xl font-bold text-primary">+300%</div>
              <div className="text-sm text-text-secondary">Efficacité organisationnelle</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;