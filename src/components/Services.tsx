import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Settings,
  Target,
  Check
} from "lucide-react";
import { useState } from "react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("growth");

  const strategicPillars = [
    {
      id: "growth",
      icon: TrendingUp,
      title: "Accélérer la Croissance Commerciale",
      description: "Automatisez votre cycle de vente pour transformer plus de prospects en clients et augmenter votre chiffre d'affaires de 30%.",
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
      description: "Libérez jusqu'à 15h par semaine par employé en automatisant les tâches répétitives pour qu'ils se concentrent sur l'innovation et la valeur ajoutée.",
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
      description: "Multipliez par 3 votre portée digitale avec des campagnes intelligentes et des décisions basées sur des données automatisées en temps réel.",
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

        {/* Interactive Cards */}
        <div className="mb-16">
          {/* Strategic Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {strategicPillars.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activeTab === pillar.id;
              
              return (
                <Card 
                  key={pillar.id}
                  className={`group cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
                    isActive 
                      ? 'bg-card/90 border-primary/60 shadow-xl shadow-primary/25 scale-[1.02]' 
                      : 'bg-card/50 border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15'
                  }`}
                  onClick={() => setActiveTab(pillar.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                        isActive 
                          ? 'bg-primary/25 shadow-lg shadow-primary/20' 
                          : 'bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/15'
                      }`}>
                        <Icon className={`h-8 w-8 transition-all duration-300 ${
                          isActive 
                            ? 'text-primary drop-shadow-md' 
                            : 'text-primary group-hover:text-primary group-hover:drop-shadow-sm'
                        }`} 
                        strokeWidth={1.5}
                        style={{
                          filter: 'drop-shadow(0 0 0.5px currentColor)',
                          shapeRendering: 'geometricPrecision'
                        }}
                        />
                      </div>
                    </div>
                    <CardTitle className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                      isActive 
                        ? 'text-heading' 
                        : 'text-heading group-hover:text-primary'
                    }`}>
                      {pillar.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-secondary/90">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Services Details */}
          {strategicPillars.map((pillar) => (
            <div 
              key={pillar.id}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeTab === pillar.id 
                  ? 'max-h-[500px] opacity-100 translate-y-0' 
                  : 'max-h-0 opacity-0 -translate-y-4'
              }`}
            >
              <Card className="bg-card/60 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-heading flex items-center gap-2">
                    <Check 
                      className="h-5 w-5 text-primary" 
                      strokeWidth={1.5}
                      style={{
                        filter: 'drop-shadow(0 0 0.5px currentColor)',
                        shapeRendering: 'geometricPrecision'
                      }}
                    />
                    Services inclus :
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pillar.services.map((service, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-background/60 rounded-lg border border-primary/10 
                                 hover:bg-background/80 hover:border-primary/20 transition-all duration-200"
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <Check 
                          className="h-4 w-4 text-primary flex-shrink-0" 
                          strokeWidth={1.5}
                          style={{
                            filter: 'drop-shadow(0 0 0.5px currentColor)',
                            shapeRendering: 'geometricPrecision'
                          }}
                        />
                        <span className="text-text-secondary font-medium text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
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