import { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Heart, MapPin, ArrowRight, Target, TrendingUp, Shield, Zap, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const CasUsage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cas d'usage Automatisation IA | Maia elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez comment l\'automatisation IA s\'applique aux PME, ETI, associations et collectivités : devis, factures, CRM, inscriptions, demandes administratives. Maia elange adapte ses solutions à chaque organisation.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Découvrez comment l\'automatisation IA s\'applique aux PME, ETI, associations et collectivités : devis, factures, CRM, inscriptions, demandes administratives. Maia elange adapte ses solutions à chaque organisation.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const casUsage = [
    {
      icon: Building,
      title: "PME artisanale",
      subtitle: "Automatisation comptable et commerciale",
      description: "Automatisation des devis, factures et relances de paiement.",
      benefits: [
        "Génération automatique des devis",
        "Facturation automatisée",
        "Relances de paiement programmées",
        "Suivi de trésorerie simplifié"
      ],
      roiData: "Jusqu'à 90% de temps gagné sur la facturation",
      gain: "Gain attendu : moins de temps administratif et meilleure trésorerie.",
      ctaText: "Tester mon ROI"
    },
    {
      icon: TrendingUp,
      title: "ETI industrielle",
      subtitle: "Optimisation commerciale et reporting",
      description: "Intégration CRM + reporting automatisé pour le suivi des équipes commerciales.",
      benefits: [
        "Synchronisation CRM automatique",
        "Tableaux de bord en temps réel",
        "Suivi performance équipes",
        "Reporting commercial automatisé"
      ],
      roiData: "Reporting accéléré de 70%",
      gain: "Gain attendu : meilleure visibilité sur les ventes et pilotage simplifié.",
      ctaText: "Tester mon ROI"
    },
    {
      icon: Heart,
      title: "Association",
      subtitle: "Gestion automatisée des membres",
      description: "Gestion automatisée des inscriptions, relances email et suivi des bénévoles.",
      benefits: [
        "Inscriptions en ligne automatiques",
        "Relances email programmées",
        "Suivi des bénévoles actifs",
        "Communication ciblée par groupes"
      ],
      roiData: "+30% de temps libéré pour les missions sociales",
      gain: "Gain attendu : plus de temps pour les missions sociales et moins de tâches répétitives.",
      ctaText: "Tester mon ROI"
    },
    {
      icon: MapPin,
      title: "Collectivité locale",
      subtitle: "Digitalisation des services publics",
      description: "Digitalisation des demandes administratives simples et automatisation des réponses.",
      benefits: [
        "Demandes en ligne 24h/24",
        "Réponses automatiques standardisées",
        "Suivi des dossiers citoyens",
        "Réduction de la charge agents"
      ],
      roiData: "Temps de traitement réduit de 60%",
      gain: "Gain attendu : meilleure expérience citoyenne et réduction de la charge des agents.",
      ctaText: "Tester mon ROI"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
                CAS D'USAGE
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                Découvrez comment l'IA{" "}
                <span className="text-primary">booste la performance</span>{" "}
                de chaque type d'organisation
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Chaque organisation est unique. Voici quelques exemples concrets de situations où 
                l'automatisation IA apporte des gains immédiats de productivité, de temps et de clarté.
              </p>
            </div>

            {/* Grid des cas d'usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {casUsage.map((cas, index) => {
                const Icon = cas.icon;
                return (
                  <Card key={index} className="bg-card/80 backdrop-blur-sm border border-primary/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                          <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-heading mb-1">
                            {cas.title}
                          </CardTitle>
                          <p className="text-sm text-primary font-medium">
                            {cas.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {cas.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        {cas.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-text-secondary">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Chiffre ROI */}
                      <div className="mb-4 p-3 bg-cta-primary/10 rounded-lg border border-cta-primary/30">
                        <p className="text-sm font-bold text-cta-primary">
                          📊 {cas.roiData}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-primary">
                          {cas.gain}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Section CTA globale */}
            <div className="text-center">
              <Card className="bg-gradient-to-br from-cta-primary/10 to-primary/10 backdrop-blur-sm border border-primary/30 p-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-heading mb-4">
                    Et votre organisation ?
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    Parlons de vos besoins et créons ensemble un plan d'action adapté à votre contexte.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate("/calculateur-roi")}
                      variant="cta"
                      size="lg"
                      className="px-6 sm:px-8 py-4 text-base sm:text-lg group/cta"
                    >
                      Tester mon ROI
                      <Target className="ml-3 h-5 w-5 transition-transform group-hover/cta:scale-110" />
                    </Button>
                    <Button
                      onClick={() => navigate('/appointment')}
                      variant="cta"
                      size="lg"
                      className="px-6 sm:px-8 py-4 text-base sm:text-lg"
                    >
                      Obtenir un plan d'action personnalisé
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CasUsage;