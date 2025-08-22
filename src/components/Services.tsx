import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Settings,
  Target,
  Check
} from "lucide-react";

const Services = () => {
  const strategicPillars = [
    {
      id: "growth",
      icon: TrendingUp,
      title: "Accélérer la Croissance Commerciale",
      description: "Automatisez votre cycle de vente, de la génération de leads à la fidélisation client, pour ne plus jamais manquer une opportunité.",
      services: [
        "Génération de Leads",
        "CRM & Suivi des Clients", 
        "Gestion des Emails",
        "Planification & Prise de Rendez-vous",
        "Chatbots IA"
      ]
    },
    {
      id: "efficiency", 
      icon: Settings,
      title: "Optimiser l'Efficacité Opérationnelle",
      description: "Libérez vos équipes des tâches administratives et répétitives pour qu'elles puissent se concentrer sur ce qui compte vraiment : l'innovation et la valeur ajoutée.",
      services: [
        "Gestion de Projet",
        "Recrutement & Onboarding",
        "Comptabilité & Facturation", 
        "Synchronisation d'Outils"
      ]
    },
    {
      id: "marketing",
      icon: Target, 
      title: "Augmenter l'Impact Marketing",
      description: "Déployez des campagnes intelligentes, gérez votre présence en ligne et prenez des décisions basées sur des données claires et automatisées.",
      services: [
        "Gestion des Réseaux Sociaux",
        "Analyse & Reporting Automatisés"
      ]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Badge SOLUTIONS */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
            SOLUTIONS
          </Badge>
        </div>

        {/* New Strategic Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
            Des Solutions Conçues pour Vos{" "}
            <span className="text-primary">Objectifs Stratégiques</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Nous ne vendons pas des outils, nous construisons des avantages concurrentiels. 
            Découvrez comment nous pouvons transformer vos opérations.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="growth" className="w-full">
            {/* Tabs List - The three main pillars */}
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 bg-transparent h-auto p-0">
              {strategicPillars.map((pillar) => (
                <TabsTrigger
                  key={pillar.id}
                  value={pillar.id}
                  className="flex flex-col items-center p-6 bg-card border border-border/50 rounded-lg 
                            hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10
                            data-[state=active]:bg-card/80 data-[state=active]:border-primary/50 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20
                            text-left space-y-4 h-auto"
                >
                  <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <pillar.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-heading text-center">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed text-center">
                      {pillar.description}
                    </p>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs Content - Services details */}
            {strategicPillars.map((pillar) => (
              <TabsContent 
                key={pillar.id} 
                value={pillar.id} 
                className="mt-8 animate-fade-in"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-heading mb-4">
                    Services inclus :
                  </h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pillar.services.map((service, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg"
                      >
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-text-secondary">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Badge COMPATIBILITÉ */}
        <div className="flex justify-center mb-12">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
            COMPATIBILITÉ
          </Badge>
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" className="btn-cta-hover">
            Parler à un expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;