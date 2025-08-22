import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { useState } from "react";

const ProcessSection = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const phases = [
    {
      number: "01",
      title: "Diagnostiquer",
      subtitle: "Identifier ensemble votre potentiel d'automatisation.",
      icon: Search,
      details: {
        title: "Phase 1 : Diagnostic & Stratégie",
        description: "Nous commençons par un audit complet de vos processus. L'objectif est d'identifier les tâches chronophages et les goulots d'étranglement qui peuvent être automatisés. Cette phase est souvent éligible au",
        highlight: "Diag Data IA de Bpifrance",
        conclusion: "Le livrable : une feuille de route claire avec des priorités et un ROI estimé."
      }
    },
    {
      number: "02",
      title: "Prototyper",
      subtitle: "Construire une première version simple et efficace.",
      icon: Lightbulb,
      details: {
        title: "Phase 2 : Prototypage & Validation",
        description: "Développement rapide d'un prototype fonctionnel pour valider l'approche technique et l'expérience utilisateur. Cette phase permet de",
        highlight: "tester et ajuster avant le déploiement complet",
        conclusion: "Le livrable : un prototype opérationnel avec validation métier."
      }
    },
    {
      number: "03",
      title: "Déployer",
      subtitle: "Intégrer la solution dans votre quotidien.",
      icon: Rocket,
      details: {
        title: "Phase 3 : Déploiement & Formation",
        description: "Mise en production sécurisée avec accompagnement de vos équipes. Formation complète et",
        highlight: "transfert de compétences",
        conclusion: "Le livrable : solution déployée avec équipes autonomes."
      }
    },
    {
      number: "04",
      title: "Optimiser",
      subtitle: "Assurer une performance durable & évolutive.",
      icon: TrendingUp,
      details: {
        title: "Phase 4 : Optimisation Continue",
        description: "Monitoring des performances et amélioration continue basée sur les données d'usage réelles. Support technique et",
        highlight: "évolutions fonctionnelles",
        conclusion: "Le livrable : système optimisé avec roadmap d'évolution."
      }
    }
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#0E1A1A' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge et titre principal */}
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 text-sm font-medium uppercase tracking-wider"
            style={{ 
              borderColor: '#0F7F7B', 
              color: '#0F7F7B',
              backgroundColor: 'rgba(15, 127, 123, 0.1)'
            }}
          >
            Notre Méthode
          </Badge>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
            Plus qu'un prestataire, votre partenaire de croissance
          </h2>
          
          <p className="text-lg max-w-4xl mx-auto" style={{ color: '#F5F5F5' }}>
            Parcours simple et transparent en 4 étapes : 
            <span style={{ color: '#0F7F7B' }}> Diagnostiquer → Prototyper → Déployer → Optimiser</span>.
          </p>
        </div>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Colonne gauche - Liste des phases */}
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] border-0 ${
                  selectedPhase === index ? 'ring-2 ring-[#0F7F7B]' : ''
                }`}
                style={{ 
                  backgroundColor: '#1F2937'
                }}
                onClick={() => setSelectedPhase(index)}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ 
                      backgroundColor: selectedPhase === index ? '#0F7F7B' : 'rgba(15, 127, 123, 0.2)',
                      color: selectedPhase === index ? '#F5F5F5' : '#0F7F7B'
                    }}
                  >
                    {phase.number}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-xl font-semibold mb-1"
                      style={{ 
                        color: selectedPhase === index ? '#0F7F7B' : '#F5F5F5'
                      }}
                    >
                      {phase.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: '#F5F5F5' }}
                    >
                      {phase.subtitle}
                    </p>
                  </div>
                  
                  {(() => {
                    const Icon = phase.icon;
                    return (
                      <Icon 
                        className="flex-shrink-0 h-6 w-6"
                        style={{ 
                          color: selectedPhase === index ? '#0F7F7B' : '#F5F5F5'
                        }}
                      />
                    );
                  })()}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Colonne droite - Détail de la phase sélectionnée */}
          <div className="lg:pl-8">
            <Card 
              className="h-full border-0"
              style={{ backgroundColor: '#1F2937' }}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: '#0F7F7B' }}
                  >
                    {phases[selectedPhase].details.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: '#F5F5F5' }}
                  >
                    {phases[selectedPhase].details.description}{' '}
                    <strong style={{ color: '#0F7F7B' }}>
                      {phases[selectedPhase].details.highlight}
                    </strong>
                    . {phases[selectedPhase].details.conclusion}
                  </p>

                  {/* Indicateur visuel */}
                  <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(15, 127, 123, 0.2)' }}>
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const Icon = phases[selectedPhase].icon;
                        return (
                          <Icon 
                            className="h-5 w-5"
                            style={{ color: '#0F7F7B' }}
                          />
                        );
                      })()}
                      <span 
                        className="text-sm font-medium"
                        style={{ color: '#0F7F7B' }}
                      >
                        Phase {phases[selectedPhase].number} sur 04
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;