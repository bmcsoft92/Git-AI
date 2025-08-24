import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Settings,
  Target,
  Check,
  Building,
  Users,
  Briefcase,
  ArrowRight,
  Zap,
  Clock,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [activeTab, setActiveTab] = useState("growth");
  const navigate = useNavigate();

  const strategicPillars = [
    {
      id: "growth",
      icon: TrendingUp,
      title: "Augmentez vos Ventes de +30%",
      subtitle: "Croissance Commerciale Accélérée",
      description: "Transformez votre processus commercial avec l'automatisation du suivi prospects, des relances et de la qualification. Résultat mesurable : +30% de conversions en 90 jours.",
      ctaText: "Tester mon ROI sur les ventes",
      ctaAction: () => navigate("/calculateur-roi"),
      services: [
        { name: "Génération de Leads Qualifiés", icon: Target, description: "Automatisation capture & scoring" },
        { name: "CRM Intelligent & Suivi", icon: BarChart3, description: "Suivi automatisé des opportunités" },
        { name: "Email Marketing Automatisé", icon: Zap, description: "Séquences personnalisées" },
        { name: "Prise de RDV Automatique", icon: Clock, description: "Planification intelligente 24/7" },
        { name: "Chatbots IA Conversationnels", icon: Users, description: "Qualification automatique" }
      ]
    },
    {
      id: "efficiency", 
      icon: Settings,
      title: "Libérez 15h/Semaine par Employé",
      subtitle: "Efficacité Opérationnelle Maximisée",
      description: "Éliminez les tâches répétitives qui freinent votre équipe. Nos automatisations permettent à vos collaborateurs de se concentrer sur l'innovation et les missions à forte valeur ajoutée.",
      ctaText: "Découvrir mes gains de temps",
      ctaAction: () => navigate("/calculateur-roi"),
      services: [
        { name: "Gestion de Projet Automatisée", icon: Briefcase, description: "Workflows intelligents" },
        { name: "Recrutement & Onboarding", icon: Users, description: "Processus RH optimisés" },
        { name: "Comptabilité Intelligente", icon: BarChart3, description: "Facturation automatisée" },
        { name: "Synchronisation Multi-Outils", icon: Zap, description: "Intégration seamless" }
      ]
    },
    {
      id: "marketing",
      icon: Target, 
      title: "Multipliez par 3 votre Portée Digitale",
      subtitle: "Impact Marketing Décuplé",
      description: "Déployez des campagnes intelligentes pilotées par la data en temps réel. Automatisation complète de vos réseaux sociaux et reporting prédictif pour maximiser votre ROI marketing.",
      ctaText: "Voir mon potentiel marketing",
      ctaAction: () => navigate("/calculateur-roi"),
      services: [
        { name: "Social Media Automation", icon: Users, description: "Publication et engagement automatisés" },
        { name: "Analytics Prédictifs", icon: BarChart3, description: "Insights temps réel & prédictions" }
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Diagnostic & Analyse Stratégique",
      description: "Analyse complète pour identifier jusqu'à 30% d'économies potentielles et de gains de productivité.",
      icon: BarChart3
    },
    {
      step: "02", 
      title: "Stratégie & Conception Sur-Mesure",
      description: "Un plan d'automatisation sur-mesure conçu pour générer un ROI rapide (souvent observable en 90 jours).",
      icon: Target
    },
    {
      step: "03",
      title: "Déploiement & Intégration",
      description: "Mise en place progressive sans rupture opérationnelle, avec formation complète de vos équipes.",
      icon: Settings
    },
    {
      step: "04",
      title: "Suivi Post-Implémentation",
      description: "Un suivi après la mise en place du système pour s'assurer que tout fonctionne comme prévu. Possibilité d'identifier ensuite de nouvelles tâches à automatiser selon vos priorités.",
      icon: TrendingUp
    }
  ];

  const businessSizes = [
    { icon: Building, label: "PME", description: "Solutions adaptées aux budgets et besoins spécifiques" },
    { icon: Briefcase, label: "ETI", description: "Automatisations scalables pour la croissance" },
    { icon: Users, label: "Grandes Entreprises", description: "Déploiements complexes multi-départements" }
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

        {/* Main Title - H1 for SEO */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
            Des Solutions Conçues pour Vos{" "}
            <span className="text-primary">Objectifs Stratégiques</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
            Nous ne vendons pas des outils, nous construisons des avantages concurrentiels. 
            Découvrez comment nous transformons les opérations de nos clients.
          </p>

          {/* Business Size Targeting */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {businessSizes.map((size, index) => {
              const Icon = size.icon;
              return (
                <div key={index} className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary/20">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <div className="text-left">
                    <div className="font-semibold text-heading text-sm">{size.label}</div>
                    <div className="text-xs text-text-secondary">{size.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic Pillars with Enhanced CTAs */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
                    <div className="mb-2 text-xs font-medium text-primary uppercase tracking-wide">
                      {pillar.subtitle}
                    </div>
                    <h2 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isActive 
                        ? 'text-heading' 
                        : 'text-heading group-hover:text-primary'
                    }`}>
                      {pillar.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="text-center pt-0 pb-6">
                    <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-secondary/90 mb-6">
                      {pillar.description}
                    </p>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        pillar.ctaAction();
                      }}
                      variant="cta"
                      size="sm"
                      className="w-full group/btn"
                    >
                      {pillar.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Enhanced Services Details */}
          {strategicPillars.map((pillar) => (
            <div 
              key={pillar.id}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeTab === pillar.id 
                  ? 'max-h-[800px] opacity-100 translate-y-0' 
                  : 'max-h-0 opacity-0 -translate-y-4'
              }`}
            >
              <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-primary/20 shadow-xl shadow-primary/10">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-heading flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Check 
                        className="h-6 w-6 text-primary" 
                        strokeWidth={1.5}
                        style={{
                          filter: 'drop-shadow(0 0 0.5px currentColor)',
                          shapeRendering: 'geometricPrecision'
                        }}
                      />
                    </div>
                    Pack de Services Inclus
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillar.services.map((service, index) => {
                      const ServiceIcon = service.icon;
                      return (
                        <Card 
                          key={index}
                          className="p-4 bg-background/80 backdrop-blur-sm border border-primary/15 
                                   hover:bg-background/90 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10
                                   transition-all duration-300 group/service"
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/15 rounded-lg group-hover/service:bg-primary/25 transition-colors">
                              <ServiceIcon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-heading text-sm mb-1 group-hover/service:text-primary transition-colors">
                                {service.name}
                              </h4>
                              <p className="text-xs text-text-secondary leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Process Section for Trust Building */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">
              Notre Méthode : Du Diagnostic à la <span className="text-primary">Performance Mesurable</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Un processus structuré et transparent pour transformer vos opérations. Nous vous donnons la clarté et la feuille de route pour maximiser votre ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Card key={index} className="text-center p-6 bg-card/60 backdrop-blur-sm border border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group/step">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover/step:bg-primary/30 transition-colors">
                        <StepIcon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-heading mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Global CTA Section */}
        <div className="mb-20">
          <Card className="bg-gradient-to-br from-cta-primary/10 to-primary/10 backdrop-blur-sm border border-primary/30 p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-heading mb-4">
                Prêt à Transformer votre <span className="text-primary">Entreprise</span> ?
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Discutons de vos objectifs et créons ensemble un plan d'action sur-mesure pour maximiser votre ROI
              </p>
              <Button 
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                variant="cta"
                size="lg"
                className="px-8 py-4 text-lg group/cta"
              >
                Obtenir un plan d'action personnalisé
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/cta:translate-x-1" />
              </Button>
              <div className="mt-4 text-sm text-text-secondary/80">
                Consultation personnalisée • Devis sur-mesure • Accompagnement expert
              </div>
            </div>
          </Card>
        </div>

        {/* Expertise Badge */}
        <div className="text-center">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 to-cta-primary/10 backdrop-blur-sm border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Zap className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <div className="font-bold text-heading text-lg text-center">Technologies Maîtrisées</div>
                <div className="text-text-secondary text-sm text-center">Nous maîtrisons les solutions leaders comme n8n, Make et Zapier, utilisées par des milliers d'organisations. Cela nous permet de connecter vos outils existants et de créer des automatisations parfaitement adaptées à votre contexte.</div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default Services;