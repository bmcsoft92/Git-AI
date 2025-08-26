import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Receipt, 
  Brain, 
  TrendingUp, 
  Clock, 
  Euro, 
  CheckCircle,
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CasUsageConcrets = () => {
  const navigate = useNavigate();

  const casUsage = [
    {
      id: "facturation",
      icon: Receipt,
      title: "Automatisation de la Facturation",
      sector: "TPE/PME Tous secteurs",
      problem: "Perte de temps sur les factures répétitives",
      solution: "Génération automatique des factures récurrentes, relances clients et rapprochement bancaire",
      results: [
        "90% de temps gagné sur la facturation",
        "Réduction des impayés de 60%",
        "0 erreur de calcul ou d'oubli"
      ],
      timeToRoi: "3 semaines",
      investissement: "Dès 890€",
      economies: "4 500€/an minimum"
    },
    {
      id: "tresorerie",
      icon: TrendingUp,
      title: "Suivi de Trésorerie Intelligent",
      sector: "PME & ETI",
      problem: "Visibilité financière limitée, prévisions complexes",
      solution: "Dashboard temps réel + prévisions automatiques de cashflow basées sur l'IA",
      results: [
        "Prévisions à 30j avec 95% de précision",
        "Alertes proactives sur les risques",
        "Réduction des découverts de 80%"
      ],
      timeToRoi: "6 semaines",
      investissement: "Dès 1 490€",
      economies: "12 000€/an minimum"
    },
    {
      id: "diagnostic-tpe",
      icon: Brain,
      title: "Diagnostic IA pour TPE",
      sector: "Artisans, Consultants, TPE",
      problem: "Manque de temps pour analyser les performances",
      solution: "Assistant IA qui analyse vos données et propose des améliorations concrètes",
      results: [
        "Identification de 5-8 optimisations/mois",
        "Gain de productivité +25%",
        "Décisions basées sur la data"
      ],
      timeToRoi: "2 semaines",
      investissement: "Dès 390€",
      economies: "2 800€/an minimum"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-cta-primary/10 text-cta-primary border-cta-primary/30">
            CAS D'USAGE CONCRETS
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
            Des Solutions <span className="text-primary">Éprouvées</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Découvrez comment nos clients automatisent leurs processus métier et génèrent un ROI mesurable
          </p>
        </div>

        {/* Cas d'usage */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {casUsage.map((cas) => (
            <Card key={cas.id} className="bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all card-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <cas.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {cas.sector}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-heading">
                  {cas.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Problème */}
                <div>
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Défi initial
                  </h4>
                  <p className="text-sm text-text-secondary">{cas.problem}</p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Notre solution
                  </h4>
                  <p className="text-sm text-text-secondary">{cas.solution}</p>
                </div>

                {/* Résultats */}
                <div>
                  <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Résultats obtenus
                  </h4>
                  <ul className="space-y-2">
                    {cas.results.map((result, index) => (
                      <li key={index} className="text-sm text-text-secondary flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Métriques */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
                  <div className="text-center">
                    <div className="font-bold text-primary">{cas.timeToRoi}</div>
                    <div className="text-xs text-text-secondary">Temps ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-success">{cas.economies}</div>
                    <div className="text-xs text-text-secondary">Économies/an</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-center text-sm text-text-secondary">
                    Investissement: <span className="font-semibold text-heading">{cas.investissement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/calculateur-roi')}
            className="bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground font-semibold px-8 py-4 rounded-lg btn-cta-hover"
            size="lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculez votre ROI personnalisé
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CasUsageConcrets;