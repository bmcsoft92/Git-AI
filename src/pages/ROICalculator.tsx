import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Header from "@/components/Header";

const ROICalculatorPage = () => {
  const [formData, setFormData] = useState({
    hoursPerWeek: 10,
    hourlyRate: 40,
    employees: 5
  });

  const [showResults, setShowResults] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateROI = () => {
    // Phase 1 - Levier 1 : Économies Directes
    const economies_directes = formData.hoursPerWeek * formData.hourlyRate * 46 * formData.employees;
    
    // Calculs par période pour le graphique
    const economies_semaine = Math.round(economies_directes / 46);
    const economies_mois = Math.round(economies_directes / 12);
    
    // Phase 2 - Calculs stratégiques complets
    const heures_annuelles_liberees = formData.hoursPerWeek * 46 * formData.employees;
    const gains_indirects = heures_annuelles_liberees * 0.25 * (formData.hourlyRate * 1.5);
    
    let investissement;
    if (formData.employees === 1) {
      investissement = 2500;
    } else if (formData.employees > 1 && formData.employees <= 10) {
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
                Utilisez les curseurs pour ajuster les variables clés de votre entreprise et découvrez le potentiel financier de l'automatisation.
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Heures automatisables */}
                  <div className="text-center">
                    <Label 
                      className="text-sm font-medium mb-3 block"
                      style={{ color: '#F5F5F5' }}
                    >
                      Heures/sem. automatisables
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.hoursPerWeek}
                        onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                        className="text-center text-xl font-bold py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.8)',
                          color: '#4A9EFF',
                          borderColor: 'rgba(74, 158, 255, 0.3)',
                          borderRadius: '12px'
                        }}
                        min="1"
                        max="40"
                      />
                      <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium"
                        style={{ color: '#4A9EFF' }}
                      >
                        h
                      </span>
                    </div>
                  </div>

                  {/* Coût horaire */}
                  <div className="text-center">
                    <Label 
                      className="text-sm font-medium mb-3 block"
                      style={{ color: '#F5F5F5' }}
                    >
                      Coût horaire moyen (€)
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                        className="text-center text-xl font-bold py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.8)',
                          color: '#4A9EFF',
                          borderColor: 'rgba(74, 158, 255, 0.3)',
                          borderRadius: '12px'
                        }}
                        min="1"
                        max="200"
                      />
                    </div>
                  </div>

                  {/* Nombre d'employés */}
                  <div className="text-center">
                    <Label 
                      className="text-sm font-medium mb-3 block"
                      style={{ color: '#F5F5F5' }}
                    >
                      Nombre d'employés
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.employees}
                        onChange={(e) => handleInputChange('employees', e.target.value)}
                        className="text-center text-xl font-bold py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.8)',
                          color: '#4A9EFF',
                          borderColor: 'rgba(74, 158, 255, 0.3)',
                          borderRadius: '12px'
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
                className="border-0 shadow-2xl max-w-2xl mx-auto mb-8 animate-fade-in"
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
                      className="text-5xl font-bold mb-4"
                      style={{ color: '#0F7F7B' }}
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
                      className="w-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4)',
                        color: '#F5F5F5',
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
                      <Badge 
                        className="px-4 py-2 text-sm font-medium"
                        style={{ 
                          backgroundColor: 'rgba(15, 127, 123, 0.2)',
                          color: '#0F7F7B',
                          border: '1px solid rgba(15, 127, 123, 0.3)'
                        }}
                      >
                        📅 Semaine : {results.economies_semaine.toLocaleString('fr-FR')} €
                      </Badge>
                      <Badge 
                        className="px-4 py-2 text-sm font-medium"
                        style={{ 
                          backgroundColor: 'rgba(15, 127, 123, 0.2)',
                          color: '#0F7F7B',
                          border: '1px solid rgba(15, 127, 123, 0.3)'
                        }}
                      >
                        🗓️ Mois : {results.economies_mois.toLocaleString('fr-FR')} €
                      </Badge>
                      <Badge 
                        className="px-4 py-2 text-sm font-medium"
                        style={{ 
                          backgroundColor: 'rgba(15, 127, 123, 0.2)',
                          color: '#0F7F7B',
                          border: '1px solid rgba(15, 127, 123, 0.3)'
                        }}
                      >
                        📊 Année : {results.economies_directes.toLocaleString('fr-FR')} €
                      </Badge>
                    </div>

                    <div className="h-64 mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Semaine', value: results.economies_semaine },
                            { name: 'Mois', value: results.economies_mois },
                            { name: 'Année', value: results.economies_directes }
                          ]}
                          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                        >
                          <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#F5F5F5', fontSize: 14 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#F5F5F5', fontSize: 12 }}
                            tickFormatter={(value) => `${value.toLocaleString('fr-FR')} €`}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#4A9EFF"
                            radius={[4, 4, 0, 0]}
                          />
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
                      Votre Diagnostic Stratégique Complet
                    </h2>
                    <p className="text-lg opacity-90" style={{ color: '#F5F5F5' }}>
                      Analyse financière détaillée sur 3 leviers de croissance
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Levier 1 - Économies de Productivité */}
                    <div className="text-center p-6 rounded-xl border-2" 
                         style={{ 
                           backgroundColor: 'rgba(15, 127, 123, 0.1)', 
                           borderColor: 'rgba(15, 127, 123, 0.3)' 
                         }}>
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                             style={{ backgroundColor: '#0F7F7B' }}>
                          <span className="text-2xl">📈</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F7F7B' }}>
                        Vos Économies de Productivité
                      </h3>
                      <div className="text-3xl font-bold mb-2" style={{ color: '#0F7F7B' }}>
                        {results.economies_directes.toLocaleString()} €
                      </div>
                      <div className="text-sm" style={{ color: '#F5F5F5' }}>par an</div>
                    </div>

                    {/* Levier 2 - Potentiel de Croissance */}
                    <div className="text-center p-6 rounded-xl border-2" 
                         style={{ 
                           backgroundColor: 'rgba(255, 140, 66, 0.1)', 
                           borderColor: 'rgba(255, 140, 66, 0.3)' 
                         }}>
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                             style={{ backgroundColor: '#FF8C42' }}>
                          <span className="text-2xl">🚀</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#FF8C42' }}>
                        Votre Potentiel de Croissance
                      </h3>
                      <div className="text-3xl font-bold mb-2" style={{ color: '#FF8C42' }}>
                        +{results.gains_indirects.toLocaleString()} €
                      </div>
                      <div className="text-sm" style={{ color: '#F5F5F5' }}>par an</div>
                    </div>

                    {/* Levier 3 - Investissement */}
                    <div className="text-center p-6 rounded-xl border-2" 
                         style={{ 
                           backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                           borderColor: 'rgba(239, 68, 68, 0.3)' 
                         }}>
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                             style={{ backgroundColor: '#EF4444' }}>
                          <span className="text-2xl">💰</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#EF4444' }}>
                        Pour un Investissement Estimé
                      </h3>
                      <div className="text-3xl font-bold mb-2" style={{ color: '#EF4444' }}>
                        -{results.investissement.toLocaleString()} €
                      </div>
                      <div className="text-sm" style={{ color: '#F5F5F5' }}>investissement unique</div>
                    </div>
                  </div>

                  {/* ROI Stratégique Final */}
                  <div className="text-center mb-10">
                    <div className="max-w-md mx-auto p-8 rounded-xl" 
                         style={{ 
                           background: 'linear-gradient(135deg, rgba(15, 127, 123, 0.2), rgba(255, 140, 66, 0.1))',
                           border: '2px solid rgba(15, 127, 123, 0.4)'
                         }}>
                      <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>
                        Votre ROI Stratégique sur 12 mois
                      </h3>
                      <div className="text-6xl font-bold" style={{ color: '#0F7F7B' }}>
                        +{results.roi_strategique}%
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
                      Réserver mon diagnostic gratuit pour activer ce ROI
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