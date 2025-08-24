import { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Target, Eye, Award, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const APropos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "À propos de Maia Elange | Automatisation Intelligente & Transformation Digitale";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez Maia Elange : notre mission, vision et valeurs pour l\'automatisation intelligente et la transformation digitale des organisations.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Découvrez Maia Elange : notre mission, vision et valeurs pour l\'automatisation intelligente et la transformation digitale des organisations.');
      document.head.appendChild(metaDescription);
    }
  }, []);

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
                À PROPOS
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                À propos de{" "}
                <span className="text-primary">Maia Elange</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Une approche humaine de l'automatisation intelligente pour transformer 
                durablement les organisations.
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
              {/* Mission */}
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-heading">
                    <Target className="h-6 w-6 text-primary" />
                    Notre Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    Accompagner les organisations dans leur transformation digitale en 
                    démocratisant l'accès à l'intelligence artificielle et à l'automatisation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-heading mb-1">Automatisation Intelligente</h4>
                          <p className="text-sm text-text-secondary">
                            Optimiser les processus répétitifs pour libérer le potentiel humain.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-heading mb-1">Approche Humaine</h4>
                          <p className="text-sm text-text-secondary">
                            Placer l'humain au cœur de chaque solution technologique.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-heading mb-1">Conformité RGPD</h4>
                          <p className="text-sm text-text-secondary">
                            Garantir la sécurité et la conformité de toutes nos solutions.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-heading mb-1">Excellence Opérationnelle</h4>
                          <p className="text-sm text-text-secondary">
                            Délivrer des résultats mesurables et durables.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="bg-gradient-to-br from-primary/5 to-cta-primary/5 border border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-heading">
                    <Eye className="h-6 w-6 text-primary" />
                    Notre Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    Démocratiser l'intelligence artificielle pour que chaque organisation, 
                    quelle que soit sa taille, puisse bénéficier des avantages de 
                    l'automatisation intelligente.
                  </p>
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                    <h4 className="font-bold text-heading mb-4 text-center">
                      L'IA + l'Humain au service des organisations
                    </h4>
                    <p className="text-text-secondary text-center leading-relaxed">
                      Nous croyons en une technologie qui augmente les capacités humaines 
                      plutôt que de les remplacer. Notre approche privilégie la collaboration 
                      entre l'intelligence artificielle et l'expertise humaine pour créer 
                      des solutions durables et éthiques.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Valeurs */}
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-heading">
                    <Award className="h-6 w-6 text-primary" />
                    Nos Valeurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-lg border border-primary/10">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bold text-heading mb-2">Transparence</h4>
                      <p className="text-sm text-text-secondary">
                        Clarté totale sur nos méthodes, nos prix et nos résultats.
                      </p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-cta-primary/10 to-transparent rounded-lg border border-cta-primary/10">
                      <div className="w-12 h-12 bg-cta-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-6 w-6 text-cta-primary" />
                      </div>
                      <h4 className="font-bold text-heading mb-2">Collaboration</h4>
                      <p className="text-sm text-text-secondary">
                        Travail en étroite collaboration avec vos équipes.
                      </p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-lg border border-primary/10">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bold text-heading mb-2">Innovation</h4>
                      <p className="text-sm text-text-secondary">
                        Solutions sur mesure adaptées à vos enjeux spécifiques.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notre Approche */}
              <Card className="bg-gradient-to-br from-muted/50 to-card border border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-heading mb-6 text-center">
                    Notre Approche Premium
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">01</div>
                      <h4 className="font-semibold text-heading mb-2">Analyse Personnalisée</h4>
                      <p className="text-sm text-text-secondary">
                        Audit approfondi de vos processus et identification des opportunités.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">02</div>
                      <h4 className="font-semibold text-heading mb-2">Implémentation sur Mesure</h4>
                      <p className="text-sm text-text-secondary">
                        Développement et déploiement de solutions adaptées à votre contexte.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">03</div>
                      <h4 className="font-semibold text-heading mb-2">Accompagnement Continu</h4>
                      <p className="text-sm text-text-secondary">
                        Support technique et optimisation continue de vos automatisations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default APropos;