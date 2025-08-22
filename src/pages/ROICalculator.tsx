import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const ROICalculatorPage = () => {
  const [formData, setFormData] = useState({
    hoursPerWeek: 10,
    hourlyRate: 40,
    employees: 5
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateROI = () => {
    const annualAutomatedHours = formData.hoursPerWeek * 52;
    const totalAnnualSavings = annualAutomatedHours * formData.hourlyRate * formData.employees;
    const implementationCost = 25000; // Coût moyen d'implémentation
    const roi = ((totalAnnualSavings - implementationCost) / implementationCost) * 100;
    const paybackMonths = Math.round((implementationCost / (totalAnnualSavings / 12)) * 10) / 10;

    return {
      totalAnnualSavings: Math.round(totalAnnualSavings),
      roi: Math.round(roi),
      paybackMonths,
      monthlyHours: formData.hoursPerWeek * 4.33 * formData.employees
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
                        className="text-center text-2xl font-bold py-4 border-0 focus:ring-2 focus:ring-primary/50"
                        style={{ 
                          backgroundColor: 'rgba(15, 127, 123, 0.1)',
                          color: '#F5F5F5',
                          borderRadius: '12px'
                        }}
                        min="1"
                        max="40"
                      />
                      <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm opacity-70"
                        style={{ color: '#F5F5F5' }}
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
                        className="text-center text-2xl font-bold py-4 border-0 focus:ring-2 focus:ring-primary/50"
                        style={{ 
                          backgroundColor: 'rgba(15, 127, 123, 0.1)',
                          color: '#F5F5F5',
                          borderRadius: '12px'
                        }}
                        min="10"
                        max="200"
                      />
                      <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm opacity-70"
                        style={{ color: '#F5F5F5' }}
                      >
                        €
                      </span>
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
                        className="text-center text-2xl font-bold py-4 border-0 focus:ring-2 focus:ring-primary/50"
                        style={{ 
                          backgroundColor: 'rgba(15, 127, 123, 0.1)',
                          color: '#F5F5F5',
                          borderRadius: '12px'
                        }}
                        min="1"
                        max="1000"
                      />
                      <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm opacity-70"
                        style={{ color: '#F5F5F5' }}
                      >
                        👥
                      </span>
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

            {/* Résultats */}
            {showResults && (
              <Card 
                className="border-0 shadow-2xl max-w-3xl mx-auto animate-fade-in"
                style={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(15, 127, 123, 0.2)'
                }}
              >
                <CardContent className="p-12">
                  <h2 
                    className="text-3xl font-bold mb-8"
                    style={{ color: '#0F7F7B' }}
                  >
                    Vos économies projetées
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'rgba(15, 127, 123, 0.1)' }}>
                      <div 
                        className="text-4xl font-bold mb-2"
                        style={{ color: '#0F7F7B' }}
                      >
                        {results.totalAnnualSavings.toLocaleString()}€
                      </div>
                      <div style={{ color: '#F5F5F5' }}>Économies annuelles</div>
                    </div>

                    <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 140, 66, 0.1)' }}>
                      <div 
                        className="text-4xl font-bold mb-2"
                        style={{ color: '#FF8C42' }}
                      >
                        {results.roi > 0 ? '+' : ''}{results.roi}%
                      </div>
                      <div style={{ color: '#F5F5F5' }}>ROI sur 12 mois</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div 
                      className="flex justify-between items-center p-4 rounded-lg"
                      style={{ backgroundColor: 'rgba(15, 127, 123, 0.05)' }}
                    >
                      <span style={{ color: '#F5F5F5' }}>Retour sur investissement :</span>
                      <span className="font-bold" style={{ color: '#0F7F7B' }}>
                        {results.paybackMonths} mois
                      </span>
                    </div>
                    
                    <div 
                      className="flex justify-between items-center p-4 rounded-lg"
                      style={{ backgroundColor: 'rgba(15, 127, 123, 0.05)' }}
                    >
                      <span style={{ color: '#F5F5F5' }}>Heures économisées/mois :</span>
                      <span className="font-bold" style={{ color: '#0F7F7B' }}>
                        {Math.round(results.monthlyHours)}h
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: '#FF8C42',
                        color: '#F5F5F5',
                        borderRadius: '12px'
                      }}
                    >
                      Réserver mon diagnostic gratuit
                    </Button>
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