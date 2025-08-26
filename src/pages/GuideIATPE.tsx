import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Lightbulb, 
  Target, 
  DollarSign, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuideIATPE = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Guide IA pour les TPE | Maïa Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Guide pratique en 4 étapes pour identifier et automatiser vos tâches répétitives. Découvrez comment l\'IA peut faire gagner du temps et réduire les coûts pour votre TPE.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Guide pratique en 4 étapes pour identifier et automatiser vos tâches répétitives. Découvrez comment l\'IA peut faire gagner du temps et réduire les coûts pour votre TPE.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const etapesGuide = [
    {
      etape: 1,
      titre: "Identifiez vos Tâches Répétitives",
      description: "Listez les 5 tâches que vous répétez le plus souvent",
      exemples: ["Saisie de factures", "Relances clients", "Planification RDV"],
      temps: "15 min"
    },
    {
      etape: 2,
      titre: "Évaluez le Potentiel d'Économie",
      description: "Calculez le temps passé sur chaque tâche par semaine",
      exemples: ["3h de facturation", "2h de relances", "1h de planification"],
      temps: "10 min"
    },
    {
      etape: 3,
      titre: "Priorisez par Impact/Facilité",
      description: "Classez vos tâches selon leur facilité d'automatisation",
      exemples: ["Facile: emails automatiques", "Moyen: CRM", "Complexe: prise de décision"],
      temps: "10 min"
    },
    {
      etape: 4,
      titre: "Commencez par le Plus Simple",
      description: "Automatisez d'abord la tâche la plus simple mais répétitive",
      exemples: ["Email de confirmation", "Sauvegarde de fichiers", "Notification SMS"],
      temps: "Variable"
    }
  ];

  const beneficesTPE = [
    {
      icon: DollarSign,
      titre: "Réduction des Coûts",
      description: "Économisez 2 000€ à 5 000€ par an en temps de travail",
      impact: "Immédiat"
    },
    {
      icon: Zap,
      titre: "Gain de Temps",
      description: "Libérez 5 à 15h par semaine pour vous concentrer sur l'essentiel",
      impact: "Dès J+1"
    },
    {
      icon: Shield,
      titre: "Réduction des Erreurs",
      description: "Éliminez 95% des erreurs humaines sur les tâches automatisées",
      impact: "Permanent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Header */}
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-success/10 text-success border-success/30">
                <BookOpen className="w-4 h-4 mr-2" />
                GUIDE PRATIQUE
              </Badge>
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                L'IA pour les TPE : <span className="text-primary">Par où Commencer ?</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Guide pratique de 4 étapes pour identifier et automatiser vos premières tâches répétitives
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Guide étapes */}
              <div>
                <h2 className="text-2xl font-bold text-heading mb-8 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-cta-primary" />
                  Méthode en 4 Étapes
                </h2>
                
                <div className="space-y-6">
                  {etapesGuide.map((etape) => (
                    <Card key={etape.etape} className="bg-card/80 backdrop-blur-sm border border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {etape.etape}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-heading">{etape.titre}</h3>
                              <Badge variant="outline" className="text-xs">
                                {etape.temps}
                              </Badge>
                            </div>
                            <p className="text-text-secondary mb-3">{etape.description}</p>
                            <div>
                              <div className="text-xs font-semibold text-primary mb-2">Exemples :</div>
                              <div className="flex flex-wrap gap-2">
                                {etape.exemples.map((exemple, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {exemple}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bénéfices */}
              <div>
                <h2 className="text-2xl font-bold text-heading mb-8 flex items-center gap-3">
                  <Target className="w-6 h-6 text-success" />
                  Bénéfices Clés pour Votre TPE
                </h2>

                <div className="space-y-6 mb-8">
                  {beneficesTPE.map((benefice, index) => (
                    <Card key={index} className="bg-card/60 backdrop-blur-sm border border-success/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-success/20 rounded-lg flex-shrink-0">
                            <benefice.icon className="w-6 h-6 text-success" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-heading">{benefice.titre}</h3>
                              <Badge className="bg-success/10 text-success border-success/30 text-xs">
                                {benefice.impact}
                              </Badge>
                            </div>
                            <p className="text-text-secondary">{benefice.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Checklist */}
                <Card className="bg-gradient-to-r from-primary/5 to-cta-primary/5 border border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-heading">
                      <CheckCircle className="w-5 h-5 text-success" />
                      Checklist Pratique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "✅ J'ai identifié mes 5 tâches les plus répétitives",
                        "✅ J'ai calculé le temps passé sur chacune",
                        "✅ J'ai choisi par laquelle commencer",
                        "✅ Je suis prêt à passer à l'action"
                      ].map((item, idx) => (
                        <li key={idx} className="text-sm text-text-secondary flex items-center gap-2">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-cta-primary/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <h2 className="text-2xl font-bold text-heading mb-4">
                  Prêt à Automatiser Votre Première Tâche ?
                </h2>
                <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                  Notre équipe vous accompagne pour identifier votre cas d'usage prioritaire et calculer votre ROI potentiel
                </p>
                
                <Button
                  onClick={() => navigate('/diagnostic-personnalise')}
                  variant="cta"
                  size="lg"
                  className="px-8 py-4 text-lg group/cta"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Demander mon diagnostic personnalisé
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/cta:translate-x-1" />
                </Button>

                <p className="text-xs text-text-secondary mt-4">
                  Sans engagement • Réponse sous 24h • Accompagnement personnalisé
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuideIATPE;