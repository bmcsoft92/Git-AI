import { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Heart, MapPin, ArrowRight, Target, TrendingUp, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CasUsage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cas d'usage de l'IA et de l'automatisation | Maia Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez comment l\'IA transforme PME, ETI, associations et collectivités. Solutions d\'automatisation adaptées à chaque secteur avec ROI mesurable et conformité RGPD.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Découvrez comment l\'IA transforme PME, ETI, associations et collectivités. Solutions d\'automatisation adaptées à chaque secteur avec ROI mesurable et conformité RGPD.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const casUsage = [
    {
      icon: Building,
      title: "IA pour PME",
      subtitle: "Automatisation sur-mesure pour petites entreprises",
      description: "Solutions d'automatisation adaptées aux budgets et besoins spécifiques des PME. Gain de temps immédiat et ROI rapide.",
      benefits: [
        "Automatisation des tâches administratives",
        "Gestion de la relation client simplifiée",
        "Optimisation des processus de vente",
        "Reporting automatisé"
      ],
      ctaText: "Découvrir les solutions PME"
    },
    {
      icon: TrendingUp,
      title: "IA pour ETI",
      subtitle: "Automatisations scalables pour la croissance",
      description: "Déploiements complexes multi-départements avec intégrations avancées. Performance et scalabilité garanties.",
      benefits: [
        "Intégration multi-systèmes",
        "Workflows complexes automatisés",
        "Analytics prédictifs avancés",
        "Déploiement par étapes"
      ],
      ctaText: "Explorer les solutions ETI"
    },
    {
      icon: Heart,
      title: "IA pour Associations",
      subtitle: "Automatisation pour le secteur associatif",
      description: "Solutions adaptées aux contraintes budgétaires des associations avec focus sur l'efficacité opérationnelle.",
      benefits: [
        "Gestion automatisée des adhérents",
        "Communication digitale optimisée",
        "Processus de dons simplifiés",
        "Reporting pour subventions"
      ],
      ctaText: "Solutions pour associations"
    },
    {
      icon: MapPin,
      title: "IA pour Collectivités",
      subtitle: "Modernisation des services publics",
      description: "Automatisation des processus administratifs publics avec respect des normes RGPD et sécurité renforcée.",
      benefits: [
        "Dématérialisation des démarches",
        "Traitement automatisé des demandes",
        "Amélioration de l'accueil citoyen",
        "Conformité RGPD garantie"
      ],
      ctaText: "Solutions pour collectivités"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
                CAS D'USAGE
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                Cas d'usage de l'IA et de{" "}
                <span className="text-primary">l'automatisation</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Découvrez comment nos solutions d'automatisation s'adaptent aux besoins spécifiques 
                de chaque secteur, de la PME à la grande organisation.
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
                      <div className="space-y-3 mb-6">
                        {cas.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-text-secondary">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => navigate("/calculateur-roi")}
                        variant="outline" 
                        className="w-full group/btn border-primary/30 hover:bg-primary/10"
                      >
                        {cas.ctaText}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
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
                    Votre secteur n'est pas listé ?
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    Chaque organisation est unique. Discutons de vos besoins spécifiques 
                    et créons ensemble la solution d'automatisation adaptée à votre contexte.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate("/calculateur-roi")}
                      variant="cta"
                      size="lg"
                      className="px-8 py-4 text-lg group/cta"
                    >
                      Évaluer mon potentiel ROI
                      <Target className="ml-3 h-5 w-5 transition-transform group-hover/cta:scale-110" />
                    </Button>
                    <Button 
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg border-primary/30"
                    >
                      Discuter de mon projet
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="relative bg-gradient-to-br from-card to-card/80 border-t border-border/50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-heading mb-4">
              Prêt à automatiser votre organisation ?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Contactez-nous pour discuter de vos besoins spécifiques et obtenir 
              un plan d'action personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="font-semibold text-primary">📧</span>
                <a href="mailto:contact@maiaelange.fr" className="hover:text-primary transition-colors">
                  contact@maiaelange.fr
                </a>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-text-secondary/50 rounded-full"></div>
              <div className="text-sm text-text-secondary">
                Réponse sous 24h • Consultation gratuite
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CasUsage;