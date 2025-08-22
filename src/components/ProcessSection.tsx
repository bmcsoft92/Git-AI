import { CheckCircle, MessageSquare, Cog, BarChart3 } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Diagnostic Gratuit",
      description: "Analyse complète de vos processus sur site (2h)",
      details: "Identification des tâches automatisables"
    },
    {
      icon: CheckCircle,
      title: "Proposition Personnalisée",
      description: "Devis détaillé avec ROI projeté",
      details: "Plan d'implémentation sur mesure"
    },
    {
      icon: Cog,
      title: "Implémentation",
      description: "Déploiement en 2 semaines sans code",
      details: "Formation de vos équipes incluse"
    },
    {
      icon: BarChart3,
      title: "Suivi & Optimisation",
      description: "Monitoring 24/7 et amélioration continue",
      details: "Support technique dédié"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Notre Processus
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Une approche éprouvée pour transformer vos processus en 
            <strong className="text-primary"> solutions automatisées performantes</strong> en moins de 2 semaines.
          </p>
        </div>

        <div className="relative">
          {/* Ligne de connexion */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-primary/20"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Numéro de l'étape */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>
                
                {/* Carte de l'étape */}
                <div className="bg-card border border-border rounded-lg p-6 h-full card-hover group-hover:border-primary/30 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <step.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-2 group-hover:text-heading transition-colors duration-300">
                    {step.description}
                  </p>
                  
                  <p className="text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;