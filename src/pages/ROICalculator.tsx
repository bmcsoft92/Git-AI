import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Header from "@/components/Header";

const ROICalculatorPage = () => {
  const [formData, setFormData] = useState({
    hoursPerWeek: "10",
    hourlyRate: "40",
    employees: "5"
  });

  const [showResults, setShowResults] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const calculateROI = () => {
    // Convertir les strings en nombres avec valeurs par défaut
    const hoursPerWeek = parseFloat(formData.hoursPerWeek) || 0;
    const hourlyRate = parseFloat(formData.hourlyRate) || 0;
    const employees = parseFloat(formData.employees) || 0;
    
    // Phase 1 - Levier 1 : Économies Directes
    const economies_directes = hoursPerWeek * hourlyRate * 46 * employees;
    
    // Calculs par période pour le graphique
    const economies_semaine = Math.round(economies_directes / 46);
    const economies_mois = Math.round(economies_directes / 12);
    
    // Phase 2 - Calculs stratégiques complets
    const heures_annuelles_liberees = hoursPerWeek * 46 * employees;
    const gains_indirects = heures_annuelles_liberees * 0.25 * (hourlyRate * 1.5);
    
    let investissement;
    if (employees === 1) {
      investissement = 2500;
    } else if (employees > 1 && employees <= 10) {
      investissement = 7500;
    } else {
      investissement = 15000;
    }
    
    const gain_total = economies_directes + gains_indirects;
    const roi_strategique = ((gain_total - investissement) / investissement) * 100;

    return {
      economies_directes: Math.round(economies_directes),
      economies_semaine,
      economies_mois,
      gains_indirects: Math.round(gains_indirects),
      investissement,
      roi_strategique: Math.round(roi_strategique),
      gain_total: Math.round(gain_total)
    };
  };

  const results = calculateROI();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20" style={{ backgroundColor: '#0E1A1A', minHeight: 'calc(100vh - 80px)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge et titre */}
            <div className="mb-12">
              <Badge 
                variant="outline" 
                className="mb-6 px-4 py-2 text-sm font-medium uppercase tracking-wider"
                style={{ 
                  borderColor: '#0F7F7B', 
                  color: '#0F7F7B',
                  backgroundColor: 'rgba(15, 127, 123, 0.1)'
                }}
              >
                SIMULATEUR
              </Badge>
              
              <h1 
                className="text-4xl lg:text-6xl font-bold mb-8"
                style={{ color: '#F5F5F5' }}
              >
                Calculez votre ROI en{' '}
                <span style={{ color: '#0F7F7B' }}>30 secondes</span>
              </h1>
              
              <p 
                className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
                style={{ color: '#F5F5F5' }}
              >
                Saisissez les variables clés de votre entreprise et découvrez le potentiel financier de l'automatisation.
              </p>
            </div>

            {/* Formulaire principal */}
            <Card 
              className="border-0 shadow-2xl max-w-2xl mx-auto mb-12"
              style={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(15, 127, 123, 0.2)'
              }}
            >
              <CardContent className="p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-end">
                  {/* Heures automatisables */}
                  <div>
                    <Label 
                      className="text-base font-medium mb-3 block"
                      style={{ color: '#F5F5F5', minHeight: '48px' }}
                    >
                      Heures/sem.<br />automatisables
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.hoursPerWeek}
                        onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                        onFocus={handleInputFocus}
                        className="text-left text-xl font-medium py-5 px-5 border-2 focus:ring-2 focus:ring-primary/50 w-full"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.9)',
                          color: '#F5F5F5',
                          borderColor: 'rgba(74, 158, 255, 0.4)',
                          borderRadius: '8px',
                          height: '64px'
                        }}
                        min="1"
                        max="40"
                      />
                    </div>
                  </div>

                  {/* Coût horaire */}
                  <div>
                    <Label 
                      className="text-base font-medium mb-3 block"
                      style={{ color: '#F5F5F5', minHeight: '48px' }}
                    >
                      Coût horaire<br />moyen (€)
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                        onFocus={handleInputFocus}
                        className="text-left text-xl font-medium py-5 px-5 border-2 focus:ring-2 focus:ring-primary/50 w-full"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.9)',
                          color: '#F5F5F5',
                          borderColor: 'rgba(74, 158, 255, 0.4)',
                          borderRadius: '8px',
                          height: '64px'
                        }}
                        min="1"
                        max="200"
                      />
                    </div>
                  </div>

                  {/* Nombre d'employés */}
                  <div>
                    <Label 
                      className="text-base font-medium mb-3 block"
                      style={{ color: '#F5F5F5', minHeight: '48px' }}
                    >
                      Nombre<br />d'employés
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.employees}
                        onChange={(e) => handleInputChange('employees', e.target.value)}
                        onFocus={handleInputFocus}
                        className="text-left text-xl font-medium py-5 px-5 border-2 focus:ring-2 focus:ring-primary/50 w-full"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.9)',
                          color: '#F5F5F5',
                          borderColor: 'rgba(74, 158, 255, 0.4)',
                          borderRadius: '8px',
                          height: '64px'
                        }}
                        min="1"
                        max="1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton de calcul */}
                <Button
                  onClick={() => setShowResults(true)}
                  size="lg"
                  className="w-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    backgroundColor: '#0F7F7B',
                    color: '#F5F5F5',
                    borderRadius: '12px',
                    boxShadow: '0 8px 25px rgba(15, 127, 123, 0.3)'
                  }}
                >
                  Calculer mon ROI
                </Button>
              </CardContent>
            </Card>

            {/* Phase 1 - Résultats Initiaux */}
            {showResults && (
              <Card 
                className="border-0 shadow-2xl max-w-2xl mx-auto mb-8 animate-fade-in animate-scale-in"
                style={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(15, 127, 123, 0.2)'
                }}
              >
                <CardContent className="p-10">
                  <div className="text-center mb-8">
                    <div className="mb-4" style={{ color: '#F5F5F5', fontSize: '16px', opacity: 0.8 }}>
                      Économies annuelles estimées
                    </div>
                    <div 
                      className="text-5xl font-bold mb-4 animate-pulse"
                      style={{ 
                        color: '#0F7F7B',
                        textShadow: '0 0 20px rgba(15, 127, 123, 0.5)',
                        animation: 'pulse 2s infinite'
                      }}
                    >
                      {results.economies_directes.toLocaleString('fr-FR')} €
                    </div>
                    <div className="text-sm mb-6" style={{ color: '#F5F5F5', opacity: 0.7 }}>
                      ROI attendu en <strong>45-60 jours</strong> selon usage.
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={() => setShowDetailedResults(true)}
                      size="lg"
                      className="w-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground"
                      style={{
                        borderRadius: '12px',
                        border: 'none'
                      }}
                    >
                      Voir comment récupérer cet argent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Phase Graphique Interactive */}
            {showDetailedResults && (
              <Card 
                className="border-0 shadow-2xl max-w-4xl mx-auto mb-8 animate-fade-in"
                style={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(15, 127, 123, 0.2)'
                }}
              >
                <CardContent className="p-10">
                  <div className="text-center mb-8">
                    <h3 className="text-xl mb-6" style={{ color: '#F5F5F5' }}>
                      Vous laissez potentiellement <strong>{results.economies_directes.toLocaleString('fr-FR')} €</strong> sur la table chaque année.
                    </h3>
                    
                    <div className="text-sm mb-6" style={{ color: '#F5F5F5', opacity: 0.8 }}>
                      Basé sur vos entrées ROI (heures × coût horaire × employés). Ajustez ci-dessous si besoin.
                    </div>

                    <div className="flex justify-center gap-6 mb-8 flex-wrap">
                      <div className="relative group">
                        <Badge 
                          className="px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                          style={{ 
                            backgroundColor: 'rgba(15, 127, 123, 0.2)',
                            color: '#0F7F7B',
                            border: '1px solid rgba(15, 127, 123, 0.3)'
                          }}
                        >
                          📅 Semaine : {results.economies_semaine.toLocaleString('fr-FR')} €
                        </Badge>
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                          Économie hebdomadaire avec l'automatisation
                        </div>
                      </div>
                      <div className="relative group">
                        <Badge 
                          className="px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                          style={{ 
                            backgroundColor: 'rgba(15, 127, 123, 0.2)',
                            color: '#0F7F7B',
                            border: '1px solid rgba(15, 127, 123, 0.3)'
                          }}
                        >
                          🗓️ Mois : {results.economies_mois.toLocaleString('fr-FR')} €
                        </Badge>
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                          Économie mensuelle récurrente
                        </div>
                      </div>
                      <div className="relative group">
                        <Badge 
                          className="px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                          style={{ 
                            backgroundColor: 'rgba(15, 127, 123, 0.2)',
                            color: '#0F7F7B',
                            border: '1px solid rgba(15, 127, 123, 0.3)'
                          }}
                        >
                          📊 Année : {results.economies_directes.toLocaleString('fr-FR')} €
                        </Badge>
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                          Total annuel des économies possibles
                        </div>
                      </div>
                    </div>

                    <div className="h-64 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Semaine', value: results.economies_semaine },
                            { name: 'Mois', value: results.economies_mois },
                            { name: 'Année', value: results.economies_directes }
                          ]}
                          margin={{ top: 20, right: 50, left: 100, bottom: 5 }}
                        >
                          <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#F5F5F5', fontSize: 14, fontWeight: 'bold' }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#F5F5F5', fontSize: 11, fontWeight: 'bold' }}
                            tickFormatter={(value) => `${value.toLocaleString('fr-FR')} €`}
                            domain={[0, 'dataMax']}
                            width={90}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(31, 41, 55, 0.95)',
                              border: '1px solid rgba(15, 127, 123, 0.3)',
                              borderRadius: '8px',
                              color: '#F5F5F5',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                            labelStyle={{ color: '#0F7F7B', fontWeight: 'bold' }}
                            formatter={(value, name) => [`${value.toLocaleString('fr-FR')} €`, '']}
                            labelFormatter={(label) => `${label}`}
                            cursor={{ fill: 'rgba(15, 127, 123, 0.1)' }}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="url(#barGradient)"
                            radius={[6, 6, 0, 0]}
                            style={{
                              filter: 'drop-shadow(0 4px 8px rgba(74, 158, 255, 0.3))'
                            }}
                          />
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#4A9EFF" />
                              <stop offset="100%" stopColor="#0F7F7B" />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Phase 2 - Diagnostic Stratégique Complet */}
            {showDetailedResults && (
              <Card 
                className="border-0 shadow-2xl max-w-4xl mx-auto animate-fade-in"
                style={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(15, 127, 123, 0.3)'
                }}
              >
                <CardContent className="p-12">
                  <div className="text-center mb-10">
                    <h2 
                      className="text-3xl font-bold mb-4"
                      style={{ color: '#0F7F7B' }}
                    >
                      Analyse financière détaillée sur 3 leviers de croissance
                    </h2>
                    <p className="text-lg opacity-90 mb-6" style={{ color: '#F5F5F5' }}>
                      L'automatisation n'est pas une dépense, c'est un investissement qui réduit les coûts ET accélère votre croissance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Levier 1 - Économies de Productivité */}
                    <div className="relative group">
                      <div className="text-center p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in cursor-help h-64 flex flex-col justify-center" 
                           style={{ 
                             backgroundColor: 'rgba(15, 127, 123, 0.1)', 
                             borderColor: 'rgba(15, 127, 123, 0.3)',
                             animationDelay: '0.1s'
                           }}>
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse" 
                               style={{ backgroundColor: '#0F7F7B' }}>
                            <span className="text-2xl">📈</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F7F7B' }}>
                          Levier 1 : Productivité
                        </h3>
                        <div className="text-sm mb-3" style={{ color: '#F5F5F5', opacity: 0.8 }}>
                          Économies Directes
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ 
                          color: '#0F7F7B',
                          textShadow: '0 0 10px rgba(15, 127, 123, 0.3)'
                        }}>
                          {results.economies_directes.toLocaleString()} €
                        </div>
                        <div className="text-sm" style={{ color: '#F5F5F5' }}>par an</div>
                      </div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 border border-gray-600 text-white p-6 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 shadow-2xl" 
                           style={{ 
                             width: '320px', 
                             marginLeft: '-160px',
                             backgroundColor: '#1F2937',
                             border: '2px solid #374151'
                           }}>
                        <div className="text-center">
                          <div className="font-bold text-green-400 text-lg mb-3">
                            🎯 Levier 1 : La Productivité
                          </div>
                          <div className="text-sm leading-relaxed">
                            <strong>Valeur brute du temps de travail économisé</strong> en automatisant les tâches manuelles répétitives.
                          </div>
                          <div className="mt-3 p-3 bg-gray-700 rounded text-xs">
                            <strong>Calcul :</strong><br/>
                            (Heures/sem.) × (Coût horaire) × 46 sem. × (Employés)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Levier 2 - Potentiel de Croissance */}
                    <div className="relative group">
                      <div className="text-center p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in cursor-help h-64 flex flex-col justify-center" 
                           style={{ 
                             backgroundColor: 'rgba(255, 140, 66, 0.1)', 
                             borderColor: 'rgba(255, 140, 66, 0.3)',
                             animationDelay: '0.2s'
                           }}>
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse" 
                               style={{ backgroundColor: '#FF8C42' }}>
                            <span className="text-2xl">🚀</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#FF8C42' }}>
                          Levier 2 : Croissance
                        </h3>
                        <div className="text-sm mb-3" style={{ color: '#F5F5F5', opacity: 0.8 }}>
                          Gains Indirects
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ 
                          color: '#FF8C42',
                          textShadow: '0 0 10px rgba(255, 140, 66, 0.3)'
                        }}>
                          +{results.gains_indirects.toLocaleString()} €
                        </div>
                        <div className="text-sm" style={{ color: '#F5F5F5' }}>par an</div>
                      </div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 border border-gray-600 text-white p-6 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 shadow-2xl" 
                           style={{ 
                             width: '340px', 
                             marginLeft: '-170px',
                             backgroundColor: '#1F2937',
                             border: '2px solid #374151'
                           }}>
                        <div className="text-center">
                          <div className="font-bold text-orange-400 text-lg mb-3">
                            🚀 Levier 2 : La Croissance
                          </div>
                          <div className="text-sm leading-relaxed">
                            <strong>Revenus supplémentaires</strong> générés en réinvestissant 25% du temps économisé dans des activités à forte valeur ajoutée.
                          </div>
                          <div className="mt-3 p-3 bg-gray-700 rounded text-xs">
                            <strong>L'automatisation comme moteur de croissance !</strong><br/>
                            Valorisé à 1,5x votre coût horaire
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Levier 3 - Investissement */}
                    <div className="relative group">
                      <div className="text-center p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in cursor-help h-64 flex flex-col justify-center" 
                           style={{ 
                             backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                             borderColor: 'rgba(239, 68, 68, 0.3)',
                             animationDelay: '0.3s'
                           }}>
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse" 
                               style={{ backgroundColor: '#EF4444' }}>
                            <span className="text-2xl">💰</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#EF4444' }}>
                          Levier 3 : Investissement
                        </h3>
                        <div className="text-sm mb-3" style={{ color: '#F5F5F5', opacity: 0.8 }}>
                          Coût Estimé
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ 
                          color: '#EF4444',
                          textShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
                        }}>
                          -{results.investissement.toLocaleString()} €
                        </div>
                        <div className="text-sm" style={{ color: '#F5F5F5' }}>par an</div>
                      </div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 border border-gray-600 text-white p-6 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 shadow-2xl" 
                           style={{ 
                             width: '350px', 
                             marginLeft: '-175px',
                             backgroundColor: '#1F2937',
                             border: '2px solid #374151'
                           }}>
                        <div className="text-center">
                          <div className="font-bold text-red-400 text-lg mb-3">
                            💰 Levier 3 : L'Investissement
                          </div>
                          <div className="text-sm leading-relaxed">
                            <strong>Estimation transparente</strong> de l'investissement annuel en outils et accompagnement, ajusté selon la taille de votre équipe.
                          </div>
                          <div className="mt-3 p-3 bg-gray-700 rounded text-xs">
                            <strong>Un calcul crédible et réaliste !</strong><br/>
                            Pas de gains magiques, un investissement rentable
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ROI Stratégique Final */}
                  <div className="text-center mb-10 animate-fade-in relative group" style={{ animationDelay: '0.5s' }}>
                    <div className="max-w-md mx-auto p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-help" 
                         style={{ 
                           background: 'linear-gradient(135deg, rgba(15, 127, 123, 0.2), rgba(255, 140, 66, 0.1))',
                           border: '2px solid rgba(15, 127, 123, 0.4)'
                         }}>
                      <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>
                        Votre ROI Stratégique sur 12 mois
                      </h3>
                      <div className="text-6xl font-bold animate-pulse" style={{ 
                        color: '#0F7F7B',
                        textShadow: '0 0 30px rgba(15, 127, 123, 0.5)',
                        animation: 'pulse 2s infinite'
                      }}>
                        +{results.roi_strategique}%
                      </div>
                      <p className="text-lg mt-4 opacity-90" style={{ color: '#F5F5F5' }}>
                        C'est la véritable mesure de la valeur créée pour votre entreprise.
                      </p>
                    </div>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 border border-gray-600 text-white p-6 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 shadow-2xl" 
                         style={{ 
                           width: '380px', 
                           marginLeft: '-190px',
                           backgroundColor: '#1F2937',
                           border: '2px solid #374151'
                         }}>
                      <div className="text-center">
                        <div className="font-bold text-blue-400 text-lg mb-3">
                          🎯 ROI Stratégique Final
                        </div>
                        <div className="text-sm leading-relaxed">
                          <strong>Pour chaque euro investi</strong>, combien d'euros vous gagnez réellement en retour, en comptant les économies ET la croissance générée.
                        </div>
                        <div className="mt-3 p-3 bg-gray-700 rounded text-xs">
                          <strong>Formule :</strong> (Économies + Croissance - Investissement) / Investissement × 100<br/>
                          <em>Vision complète et transparente !</em>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appel à l'action final */}
                  <div className="text-center">
                    <Button
                      size="lg"
                      className="px-12 py-5 text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      style={{
                        backgroundColor: '#FF8C42',
                        color: '#F5F5F5',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(255, 140, 66, 0.4)'
                      }}
                    >
                      Votre diagnostic stratégique personnalisé
                    </Button>
                    <p className="mt-4 text-sm opacity-80" style={{ color: '#F5F5F5' }}>
                      Diagnostic personnalisé • Sans engagement • 30 minutes
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ROICalculatorPage;