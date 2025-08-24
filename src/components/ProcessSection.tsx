import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Lightbulb, Rocket, TrendingUp, Sparkles, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import processDiagnosis from "@/assets/process-diagnosis.jpg";
import processStrategy from "@/assets/process-strategy.jpg";
import processDeployment from "@/assets/process-deployment.jpg";
import processMonitoring from "@/assets/process-monitoring.jpg";

const ProcessSection = () => {
  const navigate = useNavigate();
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
      title: "Diagnostic & Analyse Stratégique",
      subtitle: "Analyse complète pour identifier jusqu'à 30% d'économies potentielles et de gains de productivité.",
      icon: Search,
      image: processDiagnosis,
      color: "#0F7F7B",
      bgGradient: "linear-gradient(135deg, rgba(15, 127, 123, 0.15), rgba(15, 127, 123, 0.05))",
      iconBg: "rgba(15, 127, 123, 0.2)",
      details: {
        title: "Diagnostic & Analyse Stratégique",
        description: "Analyse complète pour identifier jusqu'à 30% d'économies potentielles et de gains de productivité.",
        highlight: "",
        conclusion: ""
      }
    },
    {
      number: "02",
      title: "Stratégie & Conception Sur-Mesure",
      subtitle: "Un plan d'automatisation sur-mesure conçu pour générer un ROI rapide (souvent observable en 90 jours).",
      icon: Lightbulb,
      image: processStrategy,
      color: "#D56A1F",
      bgGradient: "linear-gradient(135deg, rgba(213, 106, 31, 0.15), rgba(213, 106, 31, 0.05))",
      iconBg: "rgba(213, 106, 31, 0.2)",
      details: {
        title: "Stratégie & Conception Sur-Mesure",
        description: "Un plan d'automatisation sur-mesure conçu pour générer un ROI rapide (souvent observable en 90 jours).",
        highlight: "",
        conclusion: ""
      }
    },
    {
      number: "03",
      title: "Déploiement & Intégration",
      subtitle: "Mise en place progressive sans rupture opérationnelle, avec formation complète de vos équipes.",
      icon: Rocket,
      image: processDeployment,
      color: "#2563EB",
      bgGradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(37, 99, 235, 0.05))",
      iconBg: "rgba(37, 99, 235, 0.2)",
      details: {
        title: "Déploiement & Intégration",
        description: "Mise en place progressive sans rupture opérationnelle, avec formation complète de vos équipes.",
        highlight: "",
        conclusion: ""
      }
    },
    {
      number: "04",
      title: "Suivi & Optimisation Continue",
      subtitle: "Suivi trimestriel, ajustements stratégiques et optimisation continue pour garantir un ROI croissant dans le temps.",
      icon: TrendingUp,
      image: processMonitoring,
      color: "#16A34A",
      bgGradient: "linear-gradient(135deg, rgba(22, 163, 74, 0.15), rgba(22, 163, 74, 0.05))",
      iconBg: "rgba(22, 163, 74, 0.2)",
      details: {
        title: "Suivi & Optimisation Continue",
        description: "Suivi trimestriel, ajustements stratégiques et optimisation continue pour garantir un ROI croissant dans le temps.",
        highlight: "",
        conclusion: ""
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
                color: phases[i % phases.length]?.color || '#D56A1F',
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
            Notre Méthode : Du Diagnostic à la Performance Mesurable
          </h2>
          
          <p className="text-lg max-w-4xl mx-auto" style={{ color: '#F5F5F5' }}>
            Un processus structuré et transparent pour transformer vos opérations. Nous vous donnons la clarté et la feuille de route pour maximiser votre ROI.
          </p>
        </div>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Colonne gauche - Liste des phases */}
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-500 hover:scale-[1.03] border-0 hover-scale group relative overflow-hidden ${
                  selectedPhase === index ? 'ring-2 animate-scale-in' : ''
                }`}
                style={{ 
                  background: selectedPhase === index 
                    ? `${phase.bgGradient}, #1F2937`
                    : '#1F2937',
                  borderColor: selectedPhase === index ? phase.color : 'transparent',
                  boxShadow: selectedPhase === index 
                    ? `0 12px 30px rgba(${parseInt(phase.color.slice(1, 3), 16)}, ${parseInt(phase.color.slice(3, 5), 16)}, ${parseInt(phase.color.slice(5, 7), 16)}, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)` 
                    : '0 6px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                  transform: selectedPhase === index ? 'translateY(-4px)' : 'translateY(0)',
                  animationDelay: `${index * 0.1}s`,
                  border: `1px solid ${selectedPhase === index ? phase.color + '40' : 'rgba(255, 255, 255, 0.1)'}`
                }}
                onClick={() => setSelectedPhase(index)}
              >
                {/* Image d'illustration centrée */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 h-16 w-16 opacity-30 overflow-hidden rounded-lg">
                  <img 
                    src={phase.image}
                    alt={`Illustration ${phase.title}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      filter: `brightness(${selectedPhase === index ? '1.4' : '1.0'}) contrast(1.2)`
                    }}
                  />
                </div>
                
                {/* Effet lumineux en arrière-plan */}
                {selectedPhase === index && (
                  <div 
                    className="absolute inset-0 opacity-30 animate-pulse"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${phase.color}20, transparent 70%)`
                    }}
                  />
                )}
                
                <CardContent className="p-6 relative z-10">
                  <div className="text-center mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500 group-hover:rotate-12 shadow-lg mx-auto mb-3"
                      style={{ 
                        backgroundColor: selectedPhase === index ? phase.color : phase.iconBg,
                        color: selectedPhase === index ? '#F5F5F5' : phase.color,
                        boxShadow: selectedPhase === index 
                          ? `0 0 25px ${phase.color}60, 0 4px 15px ${phase.color}30` 
                          : `0 2px 10px ${phase.color}20`,
                        animation: selectedPhase === index ? 'pulse 2s infinite' : 'none',
                        border: `2px solid ${selectedPhase === index ? phase.color : phase.color + '40'}`
                      }}
                    >
                      {phase.number}
                    </div>
                    
                    {(() => {
                      const Icon = phase.icon;
                      return (
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 mx-auto"
                          style={{
                            backgroundColor: selectedPhase === index ? phase.color + '25' : 'rgba(255, 255, 255, 0.08)',
                            border: `1px solid ${selectedPhase === index ? phase.color + '50' : 'rgba(255, 255, 255, 0.15)'}`
                          }}
                        >
                          <Icon 
                            className="h-7 w-7 transition-all duration-300"
                            style={{ 
                              color: selectedPhase === index ? phase.color : '#F5F5F5',
                              filter: selectedPhase === index ? `drop-shadow(0 0 8px ${phase.color}80)` : 'none'
                            }}
                          />
                        </div>
                      );
                    })()}
                  </div>
                  
                  <div className="text-center">
                    <h3 
                      className="text-xl font-semibold mb-2 transition-colors duration-300"
                      style={{ 
                        color: selectedPhase === index ? phase.color : '#F5F5F5',
                        textShadow: selectedPhase === index ? `0 0 10px ${phase.color}40` : 'none'
                      }}
                    >
                      {phase.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-90"
                      style={{ 
                        color: selectedPhase === index ? '#F5F5F5' : 'rgba(245, 245, 245, 0.8)',
                        textShadow: selectedPhase === index ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                      }}
                    >
                      {phase.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Colonne droite - Détail de la phase sélectionnée */}
          <div className="lg:pl-8">
            <Card 
              key={animationKey}
              className="h-full border-0 animate-fade-in relative overflow-hidden"
              style={{ 
                backgroundColor: '#1F2937',
                boxShadow: `0 20px 40px rgba(${parseInt(phases[selectedPhase].color.slice(1, 3), 16)}, ${parseInt(phases[selectedPhase].color.slice(3, 5), 16)}, ${parseInt(phases[selectedPhase].color.slice(5, 7), 16)}, 0.1)`
              }}
            >
              {/* Image de fond avec overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={phases[selectedPhase].image}
                  alt={`Illustration ${phases[selectedPhase].title}`}
                  className="w-full h-full object-cover opacity-10 transition-all duration-1000"
                  style={{
                    filter: 'brightness(0.6) contrast(1.2)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/80" />
              </div>
              
              <CardContent className="p-8 relative z-10">
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

                   {/* Tags avec coches pour la phase 4 */}
                   {selectedPhase === 3 && (
                     <div 
                       className="animate-fade-in mt-6"
                       style={{ animationDelay: '0.3s' }}
                     >
                       <div className="grid grid-cols-1 gap-3">
                         {[
                           "Suivi des KPI",
                           "Itérations & Améliorations", 
                           "Nouvelles Automatisations"
                         ].map((item, index) => (
                           <div 
                             key={index}
                             className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                             style={{ 
                               backgroundColor: 'rgba(15, 127, 123, 0.1)',
                               border: '1px solid rgba(15, 127, 123, 0.2)',
                               animationDelay: `${0.4 + index * 0.1}s`
                             }}
                           >
                             <div 
                               className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                               style={{ 
                                 backgroundColor: '#0F7F7B',
                                 boxShadow: '0 0 10px rgba(15, 127, 123, 0.4)'
                               }}
                             >
                               <Check 
                                 className="h-4 w-4" 
                                 style={{ color: '#F5F5F5' }}
                               />
                             </div>
                             <span 
                               className="text-base font-medium"
                               style={{ color: '#F5F5F5' }}
                             >
                               {item}
                             </span>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

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

        {/* Section Technologies Maîtrisées */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
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
              Technologies Maîtrisées
            </Badge>
            
            <p className="text-lg leading-relaxed" style={{ color: '#F5F5F5' }}>
              Nous maîtrisons des solutions leaders comme N8N, Make et Zapier, utilisées par des milliers d'organisations dans le monde. 
              Ces outils nous permettent de connecter vos systèmes et de créer des automatisations adaptées à vos besoins réels.
            </p>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
              Prêt à Transformer votre Entreprise ?
            </h3>
            
            <p className="text-lg mb-8" style={{ color: '#F5F5F5' }}>
              Discutons de vos objectifs et créons ensemble un plan d'action sur-mesure pour maximiser votre ROI.
            </p>
            
            <div className="space-y-4">
              <button
                className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: '#0F7F7B',
                  color: '#F5F5F5',
                  boxShadow: '0 4px 20px rgba(15, 127, 123, 0.3)'
                }}
                onClick={() => {
                  navigate('/contact');
                }}
              >
                Obtenir un plan d'action personnalisé
              </button>
              
              <div className="pt-2">
                  <Button 
                    onClick={() => navigate("/calculateur-roi")}
                    className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 border-2 bg-transparent
                             hover:bg-white/10 border-white text-white opacity-80 hover:opacity-100"
                  >
                    Tester mon ROI
                  </Button>
              </div>
              
              <p className="text-sm pt-2" style={{ color: '#F5F5F5', opacity: 0.8 }}>
                Une première étape claire pour avancer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;