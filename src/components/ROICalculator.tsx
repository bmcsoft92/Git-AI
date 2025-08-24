import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, Clock, DollarSign } from "lucide-react";

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    employees: 10,
    hourlyRate: 35,
    hoursPerWeek: 40,
    automationPercentage: 30
  });
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateROI = () => {
    const weeklyLaborCost = formData.employees * formData.hourlyRate * formData.hoursPerWeek;
    const annualLaborCost = weeklyLaborCost * 52;
    const automatedHours = (formData.hoursPerWeek * formData.automationPercentage) / 100;
    const weeklySavings = formData.employees * formData.hourlyRate * automatedHours;
    const annualSavings = weeklySavings * 52;
    const implementationCost = 25000; // Coût moyen d'implémentation
    const roi = ((annualSavings - implementationCost) / implementationCost) * 100;

    return {
      annualSavings: Math.round(annualSavings),
      weeklySavings: Math.round(weeklySavings),
      automatedHours: Math.round(automatedHours * formData.employees),
      roi: Math.round(roi),
      paybackMonths: Math.round((implementationCost / (annualSavings / 12)) * 10) / 10
    };
  };

  const results = calculateROI();

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Calculez votre ROI
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Découvrez combien vous pourriez économiser avec nos solutions d'automatisation IA
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulaire */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-heading">
                <Calculator className="h-5 w-5 text-primary" />
                Paramètres de votre entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="employees" className="text-heading font-semibold">
                  Nombre d'employés
                </Label>
                <Input
                  id="employees"
                  type="number"
                  value={formData.employees}
                  onChange={(e) => handleInputChange('employees', e.target.value)}
                  className="mt-1 bg-background border-border text-foreground"
                  min="1"
                />
              </div>

              <div>
                <Label htmlFor="hourlyRate" className="text-heading font-semibold">
                  Coût horaire moyen (€)
                </Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="mt-1 bg-background border-border text-foreground"
                  min="10"
                />
              </div>

              <div>
                <Label htmlFor="hoursPerWeek" className="text-heading font-semibold">
                  Heures travaillées par semaine
                </Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  value={formData.hoursPerWeek}
                  onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                  className="mt-1 bg-background border-border text-foreground"
                  min="20"
                  max="50"
                />
              </div>

              <div>
                <Label htmlFor="automationPercentage" className="text-heading font-semibold">
                  % de tâches automatisables
                </Label>
                <Input
                  id="automationPercentage"
                  type="number"
                  value={formData.automationPercentage}
                  onChange={(e) => handleInputChange('automationPercentage', e.target.value)}
                  className="mt-1 bg-background border-border text-foreground"
                  min="10"
                  max="80"
                />
              </div>

              <Button 
                onClick={() => setShowResults(true)}
                className="w-full bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground btn-cta-hover"
              >
                Calculer mon ROI
              </Button>
            </CardContent>
          </Card>

          {/* Résultats */}
          <div className="space-y-6">
            <Card className={`border-l-4 border-l-success transition-all duration-500 ${showResults ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-heading">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Vos économies projetées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <DollarSign className="h-6 w-6 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-success">
                      {results.annualSavings.toLocaleString()}€
                    </div>
                    <div className="text-sm text-text-secondary">Par an</div>
                  </div>
                  
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">
                      {results.automatedHours}h
                    </div>
                    <div className="text-sm text-text-secondary">Économisées/sem.</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-text-secondary">ROI sur 12 mois :</span>
                    <span className="font-bold text-success">+{results.roi}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-text-secondary">Retour sur investissement :</span>
                    <span className="font-bold text-primary">{results.paybackMonths} mois</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary/5 to-cta-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-heading mb-2">
                  Prêt à concrétiser ces économies ?
                </h3>
                <p className="text-text-secondary mb-4">
                  Discutons de votre projet et créons ensemble votre plan d'action sur-mesure
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="default" 
                    className="bg-cta-primary hover:bg-cta-primary/90 btn-cta-hover flex-1"
                  >
                    Obtenir un plan d'action personnalisé
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                  >
                    Tester mon ROI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;