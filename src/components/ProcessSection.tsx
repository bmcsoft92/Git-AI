import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Lightbulb, Rocket, TrendingUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const ProcessSection = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedPhase]);

  const phases = [
    {
      number: "01",
      title: "Diagnostiquer",
      subtitle: "Identifier ensemble votre potentiel d'automatisation.",
      icon: Search,
      color: "#FF8C42",
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
      color: "#FF6B35",
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
      color: "#FF5722",
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
      color: "#FF4500",
      details: {
        title: "Phase 4 : Optimisation Continue",
        description: "Monitoring des performances et amélioration continue basée sur les données d'usage réelles. Support technique et",
        highlight: "évolutions fonctionnelles",
        conclusion: "Le livrable : système optimisé avec roadmap d'évolution."
      }
    }
  ];

  return (
    <section id="processus" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0E1A1A' }}>
      {/* Particules animées d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            <Sparkles 
              size={16} 
              style={{ 
                color: phases[i % phases.length]?.color || '#FF8C42',
                opacity: 0.3
              }} 
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Badge et titre principal */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 text-sm font-medium uppercase tracking-wider hover:scale-105 transition-transform duration-300"
            style={{ 
              borderColor: '#0F7F7B', 
              color: '#0F7F7B',
              backgroundColor: 'rgba(15, 127, 123, 0.1)',
              boxShadow: '0 0 20px rgba(255, 140, 66, 0.1)'
            }}
          >
            Notre Méthode
          </Badge>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 hover:scale-[1.02] transition-transform duration-500" style={{ color: '#F5F5F5' }}>
            Plus qu'un prestataire, votre partenaire de croissance
          </h2>
          
          <p className="text-lg max-w-4xl mx-auto" style={{ color: '#F5F5F5' }}>
            Parcours simple et transparent en 4 étapes : 
            <span 
              className="animate-pulse"
              style={{ 
                color: '#0F7F7B',
                textShadow: '0 0 10px rgba(255, 140, 66, 0.3)'
              }}
            > 
              Diagnostiquer → Prototyper → Déployer → Optimiser
            </span>.
          </p>
        </div>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Colonne gauche - Liste des phases */}
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-500 hover:scale-[1.03] border-0 hover-scale group ${
                  selectedPhase === index ? 'ring-2 animate-scale-in' : ''
                }`}
                style={{ 
                  backgroundColor: '#1F2937',
                  borderColor: selectedPhase === index ? phase.color : 'transparent',
                  boxShadow: selectedPhase === index 
                    ? `0 8px 25px rgba(${parseInt(phase.color.slice(1, 3), 16)}, ${parseInt(phase.color.slice(3, 5), 16)}, ${parseInt(phase.color.slice(5, 7), 16)}, 0.2)` 
                    : '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transform: selectedPhase === index ? 'translateY(-2px)' : 'translateY(0)',
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => setSelectedPhase(index)}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 group-hover:rotate-12"
                    style={{ 
                      backgroundColor: selectedPhase === index ? phase.color : 'rgba(15, 127, 123, 0.2)',
                      color: selectedPhase === index ? '#F5F5F5' : '#0F7F7B',
                      boxShadow: selectedPhase === index ? `0 0 20px ${phase.color}40` : 'none',
                      animation: selectedPhase === index ? 'pulse 2s infinite' : 'none'
                    }}
                  >
                    {phase.number}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-xl font-semibold mb-1 transition-colors duration-300"
                      style={{ 
                        color: selectedPhase === index ? '#0F7F7B' : '#F5F5F5'
                      }}
                    >
                      {phase.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-90"
                      style={{ color: '#F5F5F5' }}
                    >
                      {phase.subtitle}
                    </p>
                  </div>
                  
                  {(() => {
                    const Icon = phase.icon;
                    return (
                      <Icon 
                        className="flex-shrink-0 h-6 w-6 transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          color: selectedPhase === index ? '#0F7F7B' : '#F5F5F5',
                          filter: selectedPhase === index ? `drop-shadow(0 0 8px ${phase.color}80)` : 'none'
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
              key={animationKey}
              className="h-full border-0 animate-fade-in"
              style={{ 
                backgroundColor: '#1F2937',
                boxShadow: `0 20px 40px rgba(${parseInt(phases[selectedPhase].color.slice(1, 3), 16)}, ${parseInt(phases[selectedPhase].color.slice(3, 5), 16)}, ${parseInt(phases[selectedPhase].color.slice(5, 7), 16)}, 0.1)`
              }}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {(() => {
                      const Icon = phases[selectedPhase].icon;
                      return (
                        <Icon 
                          className="h-8 w-8 animate-pulse"
                          style={{ 
                            color: '#0F7F7B',
                            filter: `drop-shadow(0 0 10px ${phases[selectedPhase].color}60)`
                          }}
                        />
                      );
                    })()}
                    <h3 
                      className="text-2xl font-bold transition-colors duration-500"
                      style={{ 
                        color: '#0F7F7B',
                        textShadow: `0 0 15px ${phases[selectedPhase].color}40`
                      }}
                    >
                      {phases[selectedPhase].details.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <p 
                    className="text-lg leading-relaxed animate-fade-in"
                    style={{ 
                      color: '#F5F5F5',
                      animationDelay: '0.2s'
                    }}
                  >
                    {phases[selectedPhase].details.description}{' '}
                    <strong 
                      className="transition-colors duration-300 hover:animate-pulse"
                      style={{ 
                        color: '#0F7F7B',
                        textShadow: `0 0 8px ${phases[selectedPhase].color}60`
                      }}
                    >
                      {phases[selectedPhase].details.highlight}
                    </strong>
                    . {phases[selectedPhase].details.conclusion}
                  </p>

                  {/* Indicateur visuel */}
                  <div 
                    className="mt-8 pt-6 border-t animate-fade-in" 
                    style={{ 
                      borderColor: `${phases[selectedPhase].color}40`,
                      animationDelay: '0.4s'
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const Icon = phases[selectedPhase].icon;
                        return (
                          <Icon 
                            className="h-5 w-5 animate-pulse"
                            style={{ 
                              color: '#0F7F7B',
                              filter: `drop-shadow(0 0 6px ${phases[selectedPhase].color}60)`
                            }}
                          />
                        );
                      })()}
                      <span 
                        className="text-sm font-medium transition-colors duration-300"
                        style={{ 
                          color: '#0F7F7B',
                          textShadow: `0 0 8px ${phases[selectedPhase].color}40`
                        }}
                      >
                        Phase {phases[selectedPhase].number} sur 04
                      </span>
                    </div>
                    
                    {/* Barre de progression */}
                    <div className="mt-4 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                      <div 
                        className="h-1 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${((selectedPhase + 1) / phases.length) * 100}%`,
                          backgroundColor: phases[selectedPhase].color,
                          boxShadow: `0 0 10px ${phases[selectedPhase].color}80`
                        }}
                      />
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