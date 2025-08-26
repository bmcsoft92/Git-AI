import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Wrench, 
  Rocket, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Users,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MethodeEtapes = () => {
  const navigate = useNavigate();

  const etapes = [
    {
      numero: "01",
      icon: Search,
      titre: "Diagnostic Personnalisé",
      duree: "1-2 semaines",
      description: "Analyse approfondie de vos processus actuels et identification des opportunités d'automatisation prioritaires",
      activites: [
        "Audit de vos processus métier existants",
        "Identification des goulots d'étranglement",
        "Évaluation du potentiel d'automatisation",
        "Calcul ROI préliminaire personnalisé"
      ],
      livrable: "Rapport d'audit + Roadmap priorisée",
      couleur: "primary"
    },
    {
      numero: "02", 
      icon: Wrench,
      titre: "Prototype & Validation",
      duree: "2-4 semaines",
      description: "Développement d'un prototype fonctionnel sur votre cas d'usage prioritaire pour validation avant déploiement complet",
      activites: [
        "Conception du prototype sur mesure",
        "Tests avec vos équipes utilisatrices",
        "Ajustements basés sur vos retours",
        "Formation initiale des utilisateurs clés"
      ],
      livrable: "Prototype validé + Guide utilisateur",
      couleur: "cta-primary"
    },
    {
      numero: "03",
      icon: Rocket,
      titre: "Déploiement Sécurisé",
      duree: "3-6 semaines",
      description: "Mise en production progressive avec formation complète, suivi performance et support dédié pour garantir l'adoption",
      activites: [
        "Déploiement progressif et sécurisé",
        "Formation complète de vos équipes",
        "Monitoring en temps réel des performances",
        "Support et ajustements post-déploiement"
      ],
      livrable: "Solution en production + Dashboard ROI",
      couleur: "success"
    }
  ];

  const garanties = [
    {
      icon: Clock,
      titre: "ROI Visible en 30 jours",
      description: "Premiers résultats mesurables dès la mise en production"
    },
    {
      icon: Users,
      titre: "Adoption Garantie",
      description: "Formation et accompagnement jusqu'à maîtrise complète"
    },
    {
      icon: Shield,
      titre: "Conformité RGPD",
      description: "Respect total des réglementations européennes"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/30">
            NOTRE MÉTHODE ÉPROUVÉE
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
            3 Étapes vers <span className="text-primary">Votre Succès</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Une approche méthodique et progressive pour garantir le succès de vos projets d'automatisation
          </p>
        </div>

        {/* Étapes */}
        <div className="relative">
          {/* Ligne de connexion */}
          <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-96 bg-gradient-to-b from-primary via-cta-primary to-success opacity-30"></div>
          
          <div className="space-y-12 lg:space-y-20">
            {etapes.map((etape, index) => (
              <div key={etape.numero} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Numéro et icône */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-20 h-20 rounded-full ${
                    etape.couleur === 'primary' ? 'bg-primary/20 border-primary' :
                    etape.couleur === 'cta-primary' ? 'bg-cta-primary/20 border-cta-primary' :
                    'bg-success/20 border-success'
                  } border-2 flex items-center justify-center mb-4`}>
                    <etape.icon className={`w-8 h-8 ${
                      etape.couleur === 'primary' ? 'text-primary' :
                      etape.couleur === 'cta-primary' ? 'text-cta-primary' :
                      'text-success'
                    }`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${
                    etape.couleur === 'primary' ? 'bg-primary' :
                    etape.couleur === 'cta-primary' ? 'bg-cta-primary' :
                    'bg-success'
                  } text-white flex items-center justify-center text-sm font-bold`}>
                    {etape.numero}
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-1 max-w-2xl">
                  <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-heading">{etape.titre}</h3>
                        <Badge variant="outline" className={`${
                          etape.couleur === 'primary' ? 'text-primary border-primary/30' :
                          etape.couleur === 'cta-primary' ? 'text-cta-primary border-cta-primary/30' :
                          'text-success border-success/30'
                        }`}>
                          {etape.duree}
                        </Badge>
                      </div>
                      
                      <p className="text-text-secondary mb-6 text-lg">
                        {etape.description}
                      </p>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-heading flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          Activités clés
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {etape.activites.map((activite, idx) => (
                            <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                              <ArrowRight className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                              {activite}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`mt-6 p-4 ${
                        etape.couleur === 'primary' ? 'bg-primary/5 border-primary/20' :
                        etape.couleur === 'cta-primary' ? 'bg-cta-primary/5 border-cta-primary/20' :
                        'bg-success/5 border-success/20'
                      } rounded-lg border`}>
                        <div className="font-semibold text-heading mb-1">Livrable</div>
                        <div className="text-sm text-text-secondary">{etape.livrable}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garanties */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-heading text-center mb-12">
            Nos <span className="text-primary">Garanties</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {garanties.map((garantie, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-sm border border-success/20 text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-success/20 rounded-full w-fit mx-auto mb-4">
                    <garantie.icon className="w-6 h-6 text-success" />
                  </div>
                  <h4 className="font-bold text-heading mb-2">{garantie.titre}</h4>
                  <p className="text-sm text-text-secondary">{garantie.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={() => navigate('/contact')}
              className="bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground font-semibold px-8 py-4 rounded-lg btn-cta-hover"
              size="lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Démarrer mon diagnostic gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodeEtapes;