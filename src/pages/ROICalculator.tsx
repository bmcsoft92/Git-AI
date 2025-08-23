import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Header from "@/components/Header";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ROIResults } from '@/components/ROIResults';

const ROICalculatorPage = () => {
  const [formData, setFormData] = useState({
    hoursPerWeek: "10",
    hourlyRate: "40",
    employees: "5",
    investissement: "7500"
  });

  const [showResults, setShowResults] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  
  // États pour le formulaire de diagnostic
  const [diagnosticData, setDiagnosticData] = useState({
    // Étape 1
    nom: "",
    email: "",
    organisation: "",
    taille: "1", // Prérempli avec "Moi uniquement (solo)"
    // Étape 2
    secteur: "",
    secteur_autre: "", // Nouveau champ pour "autre"
    chiffre_affaires: "",
    // Étape 3
    processus_prioritaires: [] as string[], // Checkboxes multiples
    tache_frustrante: "", // Champ optionnel
    // Étape 4
    heures_repetitives: "", // Heures par semaine sur tâches répétitives
    cout_horaire: "", // Coût horaire moyen chargé
    // Étape 5
    outils: [] as string[], // Checkboxes outils
    autre_outil: "", // Champ optionnel pour autre outil
    // Étape 6
    consentement: false, // Checkbox obligatoire pour RGPD
    delai: "", // Délai souhaité
    budget_annuel: "" // Budget annuel
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // Nouveaux états pour les résultats et l'analyse IA
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    calculationId: string;
    recommendations: Array<{
      title: string;
      description: string;
      estimatedROI: string;
      timeline: string;
      impact: string;
      priority: number;
    }>;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Référence pour le scroll vers le diagnostic
  const diagnosticRef = useRef<HTMLDivElement>(null);

  // Synchroniser les données du calculateur ROI avec le diagnostic
  useEffect(() => {
    if (showDiagnostic && !diagnosticData.heures_repetitives && !diagnosticData.cout_horaire) {
      setDiagnosticData(prev => ({
        ...prev,
        heures_repetitives: formData.hoursPerWeek,
        cout_horaire: formData.hourlyRate
      }));
    }
  }, [showDiagnostic, formData.hoursPerWeek, formData.hourlyRate, diagnosticData.heures_repetitives, diagnosticData.cout_horaire]);

  // Validation des étapes
  const validateStep = (step: number): boolean => {
    const errors: string[] = [];
    
    switch (step) {
      case 1:
        if (!diagnosticData.nom.trim()) errors.push("nom");
        if (!diagnosticData.email.trim()) errors.push("email");
        // Validation stricte du format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (diagnosticData.email.trim() && !emailRegex.test(diagnosticData.email)) errors.push("email");
        if (!diagnosticData.organisation.trim()) errors.push("organisation");
        if (!diagnosticData.taille) errors.push("taille");
        break;
      case 2:
        if (!diagnosticData.secteur) errors.push("secteur");
        // Si "autre" est sélectionné, le champ secteur_autre devient obligatoire
        if (diagnosticData.secteur === "autre" && !diagnosticData.secteur_autre.trim()) errors.push("secteur_autre");
        if (!diagnosticData.chiffre_affaires) errors.push("chiffre_affaires");
        break;
      case 3:
        if (diagnosticData.processus_prioritaires.length === 0) errors.push("processus_prioritaires");
        break;
      case 4:
        if (!diagnosticData.heures_repetitives.trim()) errors.push("heures_repetitives");
        if (!diagnosticData.cout_horaire.trim()) errors.push("cout_horaire");
        break;
      case 5:
        // Au moins un outil doit être sélectionné
        if (diagnosticData.outils.length === 0 && !diagnosticData.autre_outil.trim()) errors.push("outils");
        break;
      case 6:
        if (!diagnosticData.delai) errors.push("delai");
        if (!diagnosticData.budget_annuel) errors.push("budget_annuel");
        if (!diagnosticData.consentement) errors.push("consentement");
        break;
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Fonction pour vérifier si un champ a une erreur
  const hasFieldError = (fieldName: string): boolean => {
    return validationErrors.includes(fieldName);
  };

  // Fonction pour obtenir le style de bordure en fonction de l'état du champ
  const getFieldBorderStyle = (fieldName: string) => {
    if (hasFieldError(fieldName)) {
      return 'rgba(239, 68, 68, 0.8)'; // Rouge pour les erreurs
    }
    return 'rgba(74, 158, 255, 0.4)'; // Bleu normal
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
      } else {
        // Soumission finale
        handleDiagnosticSubmit();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
    }
  };

  const handleDiagnosticSubmit = async () => {
    setIsAnalyzing(true);
    
    try {
      // Calculer les données ROI
      const roiCalculation = calculateROI();
      
      // Préparer les données pour l'analyse IA
      const analysisData = {
        roiData: {
          hours_per_week: parseFloat(formData.hoursPerWeek),
          hourly_rate: parseFloat(formData.hourlyRate),
          employees: parseInt(formData.employees),
          investment: parseFloat(formData.investissement),
          annual_savings: roiCalculation.economies_directes,
          roi_percentage: roiCalculation.roi_strategique
        },
        diagnosticData: {
          team_size: diagnosticData.taille,
          business_type: diagnosticData.secteur,
          main_activities: diagnosticData.processus_prioritaires,
          repetitive_tasks: diagnosticData.processus_prioritaires,
          current_tools: diagnosticData.outils,
          pain_points: [diagnosticData.tache_frustrante].filter(Boolean),
          automation_goals: diagnosticData.processus_prioritaires,
          timeline: diagnosticData.delai,
          budget_range: diagnosticData.budget_annuel,
          technical_level: "intermediate", // Valeur par défaut
          priority_processes: diagnosticData.processus_prioritaires,
          success_metrics: ["ROI", "time_savings", "efficiency"]
        },
        userEmail: diagnosticData.email,
        userName: diagnosticData.nom,
        userPhone: "" // Pas de téléphone dans le formulaire actuel
      };

      console.log("Sending analysis data:", analysisData);

      // Appeler l'edge function d'analyse
      const { data: analysisResponse, error: analysisError } = await supabase.functions.invoke('analyze-roi-data', {
        body: analysisData
      });

      if (analysisError) throw analysisError;

      console.log("Analysis response:", analysisResponse);

      // Envoyer l'email avec les résultats
      const emailData = {
        calculationId: analysisResponse.calculationId,
        userEmail: diagnosticData.email,
        userName: diagnosticData.nom,
        roiData: analysisData.roiData,
        diagnosticData: analysisData.diagnosticData,
        recommendations: analysisResponse.recommendations
      };

      const { error: emailError } = await supabase.functions.invoke('send-roi-email', {
        body: emailData
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Continue même si l'email échoue
      }

      // Sauvegarder les résultats et afficher
      setAnalysisResults({
        calculationId: analysisResponse.calculationId,
        recommendations: analysisResponse.recommendations
      });

      setShowAnalysisResults(true);
      toast.success("Analyse terminée ! Vos résultats sont prêts et un rapport a été envoyé par email.");

      // Scroll vers les résultats
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);

    } catch (error: any) {
      console.error("Error in diagnostic submission:", error);
      toast.error("Erreur lors de l'analyse. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getProgressValue = () => {
    return (currentStep / 6) * 100;
  };

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
    const investissement = parseFloat(formData.investissement) || 0;
    
    // Validation des données
    if (hoursPerWeek <= 0 || hourlyRate <= 0 || employees <= 0 || investissement <= 0) {
      return {
        economies_directes: 0,
        economies_semaine: 0,
        economies_mois: 0,
        gains_indirects: 0,
        investissement: 0,
        roi_strategique: 0,
        gain_total: 0
      };
    }
    
    // Heures annuelles totales économisées (formule directe)
    const heures_annuelles_totales = hoursPerWeek * 46 * employees;
    
    // Économies Directes (formule standard)
    const economies_directes = heures_annuelles_totales * hourlyRate;
    
    // Phase 2 - Levier 2 : Gains de Croissance (25% du temps réinvesti à plus forte valeur)
    const heures_reinvesties = heures_annuelles_totales * 0.25;
    const gains_indirects = heures_reinvesties * (hourlyRate * 1.5);
    
    // Calculs par période pour le graphique (basés sur les économies directes)
    const economies_semaine = Math.round(economies_directes / 46);
    const economies_mois = Math.round(economies_directes / 12);
    
    const gain_total = economies_directes + gains_indirects;
    const roi_strategique = ((gain_total - investissement) / investissement) * 100;

    return {
      economies_directes: Math.round(economies_directes),
      economies_semaine,
      economies_mois,
      gains_indirects: Math.round(gains_indirects),
      investissement: Math.round(investissement),
      roi_strategique: Math.round(roi_strategique),
      gain_total: Math.round(gain_total)
    };
  };

  const results = calculateROI();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Affichage conditionnel : Résultats d'analyse IA ou Calculateur ROI */}
      {showAnalysisResults && analysisResults ? (
        <div className="container mx-auto px-4 py-8">
          <ROIResults 
            calculationId={analysisResults.calculationId}
            recommendations={analysisResults.recommendations}
            roiData={{
              annual_savings: calculateROI().economies_directes,
              roi_percentage: calculateROI().roi_strategique,
              investment: parseFloat(formData.investissement)
            }}
          />
        </div>
      ) : (
        <>
          <main className="py-20">
        {/* Étape 1 - Simulateur ROI */}
        <div style={{ backgroundColor: '#0E1A1A', minHeight: 'calc(100vh - 80px)', padding: '3rem 0' }}>
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
                ÉTAPE 1 : SIMULATEUR ROI
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
                Saisissez vos données d'entreprise et votre investissement prévu pour calculer votre ROI personnalisé d'automatisation.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-end max-w-2xl mx-auto">
                  {/* Heures automatisables */}
                  <div>
                    <Label 
                      className="text-sm font-medium mb-3 block"
                      style={{ color: '#F5F5F5', minHeight: '40px' }}
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
                      className="text-sm font-medium mb-3 block"
                      style={{ color: '#F5F5F5', minHeight: '40px' }}
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
                      className="text-sm font-medium mb-3 block"
                      style={{ color: '#F5F5F5', minHeight: '40px' }}
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
                  {/* Investissement estimé */}
                  <div>
                    <Label 
                      className="text-sm font-medium mb-3 block"
                      style={{ color: '#F5F5F5', minHeight: '40px' }}
                    >
                      Investissement annuel<br />estimé (€)
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.investissement}
                        onChange={(e) => handleInputChange('investissement', e.target.value)}
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
                        max="100000"
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton de calcul avec tooltip explicatif */}
                <div className="relative group">
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
                    Calculer mes Économies
                  </Button>
                  
                  {/* Tooltip explicatif de la formule */}
                  <div className="absolute -top-72 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-md text-white p-6 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 w-96 border border-gray-700 shadow-2xl">
                    <div className="font-semibold text-primary mb-3 text-center">📊 Formule des Économies Directes</div>
                    
                    <div className="bg-gray-800 p-3 rounded-md font-mono text-xs text-center mb-4 border border-gray-600">
                      Économies = (Heures/sem) × (Coût horaire) × 46 × (Employés)
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div><strong>• Heures/semaine :</strong> Temps automatisable par personne</div>
                      <div><strong>• Coût horaire :</strong> Valeur d'une heure de travail</div>
                      <div><strong>• 46 semaines :</strong> Année de travail (hors congés)</div>
                      <div><strong>• Employés :</strong> Nombre de personnes concernées</div>
                    </div>
                    
                    <div className="mt-4 p-2 bg-primary/10 rounded text-xs border border-primary/20">
                      <strong>Exemple :</strong> 4h × 20€ × 46 × 1 = <span className="text-primary font-bold">3 680€</span>
                    </div>
                    
                    {/* Flèche du tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900/95"></div>
                  </div>
                </div>
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
                      Ce chiffre représente la valeur du temps que votre équipe peut récupérer. Mais ce n'est que le début.
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
                          margin={{ top: 20, right: 80, left: 80, bottom: 5 }}
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
                      L'automatisation n'est pas une dépense, c'est un investissement qui réduit les coûts et accélère votre croissance.
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
                             <strong>Sortie d'argent représentée en négatif</strong> selon la convention financière. Ce coût d'investissement annuel est affiché avec le signe (-) pour symboliser une dépense.
                           </div>
                           <div className="mt-3 p-3 bg-gray-700 rounded text-xs">
                             <strong>Convention visuelle :</strong><br/>
                             Gains (+) vs Coûts (-) = Vision claire du ROI
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
                         Votre ROI stratégique sur 12 mois
                       </h3>
                       <div className="text-6xl font-bold animate-pulse" style={{ 
                         color: '#0F7F7B',
                         textShadow: '0 0 30px rgba(15, 127, 123, 0.5)',
                         animation: 'pulse 2s infinite'
                       }}>
                         {results.roi_strategique >= 0 ? '+' : ''}{results.roi_strategique}%
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
                          <strong>Pour chaque euro investi</strong>, combien d'euros vous gagnez réellement en retour, en comptant les économies et la croissance générée.
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
                      onClick={() => {
                        setShowDiagnostic(true);
                        setTimeout(() => {
                          diagnosticRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      size="lg"
                      className="px-12 py-5 text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground"
                      style={{
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(255, 140, 66, 0.4)'
                      }}
                    >
                      Continuer vers le diagnostic détaillé
                    </Button>
                    <p className="mt-4 text-sm opacity-80" style={{ color: '#F5F5F5' }}>
                      Diagnostic personnalisé • Sans engagement • 3 minutes
                    </p>
                  </div>
                </CardContent>
              </Card>
              )}
            </div>
          </div>
        </div>

        {/* Étape 2 - Diagnostic Détaillé */}
        {showDiagnostic && (
          <div ref={diagnosticRef} style={{ backgroundColor: '#1A1F2E', padding: '3rem 0' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                    <Card 
                      className="border-0 shadow-2xl max-w-3xl mx-auto animate-fade-in"
                      style={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.9)',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(74, 158, 255, 0.3)'
                      }}
                    >
                      <CardContent className="p-12">
                        {/* En-tête du diagnostic */}
                        <div className="text-center mb-8">
                          <Badge 
                            variant="outline" 
                            className="mb-4 px-4 py-2 text-sm font-medium uppercase tracking-wider"
                            style={{ 
                              borderColor: '#4A9EFF', 
                              color: '#4A9EFF',
                              backgroundColor: 'rgba(74, 158, 255, 0.1)'
                            }}
                          >
                            ÉTAPE 2 : DIAGNOSTIC DÉTAILLÉ
                          </Badge>
                          
                          <h2 
                            className="text-3xl lg:text-4xl font-bold mb-4"
                            style={{ color: '#F5F5F5' }}
                          >
                            Affinez votre potentiel
                          </h2>
                          
                          <p 
                            className="text-lg mb-6 opacity-90 max-w-2xl mx-auto"
                            style={{ color: '#F5F5F5' }}
                          >
                            Remplissez ce formulaire pour recevoir un rapport personnalisé et des recommandations sur-mesure.
                          </p>

                          {/* Badges de confiance */}
                          <div className="flex justify-center gap-4 mb-8 flex-wrap">
                            <Badge className="px-3 py-2" style={{ backgroundColor: 'rgba(15, 127, 123, 0.2)', color: '#0F7F7B', border: '1px solid rgba(15, 127, 123, 0.3)' }}>
                              ✓ Conforme RGPD
                            </Badge>
                            <Badge className="px-3 py-2" style={{ backgroundColor: 'rgba(15, 127, 123, 0.2)', color: '#0F7F7B', border: '1px solid rgba(15, 127, 123, 0.3)' }}>
                              ✓ &lt;3 min
                            </Badge>
                            <Badge className="px-3 py-2" style={{ backgroundColor: 'rgba(15, 127, 123, 0.2)', color: '#0F7F7B', border: '1px solid rgba(15, 127, 123, 0.3)' }}>
                              ✓ Sans engagement
                            </Badge>
                          </div>

                          {/* Barre de progression */}
                          <div className="mb-8">
                            <Progress value={getProgressValue()} className="h-2 mb-2" style={{ backgroundColor: 'rgba(15, 127, 123, 0.2)' }} />
                            <p className="text-sm opacity-70" style={{ color: '#F5F5F5' }}>
                              Étape {currentStep} sur 6
                            </p>
                          </div>
                        </div>

                        {/* Étape 1 */}
                        {currentStep === 1 && (
                          <div className="space-y-8">
                            <div className="text-center mb-8">
                              <h3 
                                className="text-2xl font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Étape 1/6 – Pour commencer, qui êtes-vous ?
                              </h3>
                              <p 
                                className="text-base opacity-80"
                                style={{ color: '#F5F5F5' }}
                              >
                                Ces premières informations nous permettent d'ajuster le diagnostic à votre réalité.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Nom & prénom */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Nom & prénom *
                                </Label>
                                <Input
                                  type="text"
                                  value={diagnosticData.nom}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, nom: e.target.value }))}
                                  placeholder="Jean Dupont"
                                  className="text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50 w-full"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    color: '#F5F5F5',
                                    borderColor: getFieldBorderStyle('nom'),
                                    borderRadius: '8px'
                                  }}
                                />
                              </div>

                              {/* Email professionnel */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Email professionnel *
                                </Label>
                                <Input
                                  type="email"
                                  value={diagnosticData.email}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, email: e.target.value }))}
                                  placeholder="jean.dupont@entreprise.fr"
                                  className="text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50 w-full"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    color: '#F5F5F5',
                                    borderColor: getFieldBorderStyle('email'),
                                    borderRadius: '8px'
                                  }}
                                />
                                <p className="text-xs mt-2 opacity-70" style={{ color: '#F5F5F5' }}>
                                  C'est à cette adresse que nous enverrons votre rapport confidentiel.
                                </p>
                              </div>

                              {/* Organisation */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Organisation *
                                </Label>
                                <Input
                                  type="text"
                                  value={diagnosticData.organisation}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, organisation: e.target.value }))}
                                  placeholder="Nom de votre société"
                                  className="text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50 w-full"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    color: '#F5F5F5',
                                    borderColor: getFieldBorderStyle('organisation'),
                                    borderRadius: '8px'
                                  }}
                                />
                              </div>

                              {/* Taille de l'équipe */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Taille de l'équipe *
                                </Label>
                                <Select 
                                  value={diagnosticData.taille} 
                                  onValueChange={(value) => setDiagnosticData(prev => ({ ...prev, taille: value }))}
                                >
                                  <SelectTrigger 
                                    className="text-base py-3 px-4 border-2 w-full"
                                    style={{ 
                                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                      color: '#F5F5F5',
                                      borderColor: getFieldBorderStyle('taille'),
                                      borderRadius: '8px'
                                    }}
                                  >
                                    <SelectValue placeholder="Moi uniquement (solo)" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="1">Moi uniquement (solo)</SelectItem>
                                    <SelectItem value="2-5">2-5 employés</SelectItem>
                                    <SelectItem value="6-20">6-20 employés</SelectItem>
                                    <SelectItem value="21-50">21-50 employés</SelectItem>
                                    <SelectItem value="51-100">51-100 employés</SelectItem>
                                    <SelectItem value="100+">100+ employés</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Étape 2 */}
                        {currentStep === 2 && (
                          <div className="space-y-8">
                            <div className="text-center mb-8">
                              <h3 
                                className="text-2xl font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Étape 2/6 – Votre secteur d'activité
                              </h3>
                              <p 
                                className="text-base opacity-80"
                                style={{ color: '#F5F5F5' }}
                              >
                                Parlez-nous de votre entreprise pour des recommandations personnalisées.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {/* Secteur d'activité */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Secteur d'activité *
                                </Label>
                                <Select 
                                  value={diagnosticData.secteur} 
                                  onValueChange={(value) => {
                                    setDiagnosticData(prev => ({ 
                                      ...prev, 
                                      secteur: value,
                                      // Réinitialiser le champ "autre" si on change de sélection
                                      secteur_autre: value !== "autre" ? "" : prev.secteur_autre
                                    }));
                                    // Enlever l'erreur dès qu'une valeur est sélectionnée
                                    if (value && validationErrors.includes('secteur')) {
                                      setValidationErrors(prev => prev.filter(error => error !== 'secteur'));
                                    }
                                  }}
                                >
                                  <SelectTrigger 
                                    className="text-base py-3 px-4 border-2 w-full"
                                    style={{ 
                                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                      color: '#F5F5F5',
                                      borderColor: getFieldBorderStyle('secteur'),
                                      borderRadius: '8px'
                                    }}
                                  >
                                    <SelectValue placeholder="Sélectionnez votre secteur" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="tech">Technologies / IT</SelectItem>
                                    <SelectItem value="service">Services aux entreprises</SelectItem>
                                    <SelectItem value="commerce">Commerce / E-commerce</SelectItem>
                                    <SelectItem value="industrie">Industrie / Manufacturing</SelectItem>
                                    <SelectItem value="sante">Santé / Pharmaceutique</SelectItem>
                                    <SelectItem value="finance">Finance / Assurance</SelectItem>
                                    <SelectItem value="education">Éducation / Formation</SelectItem>
                                    <SelectItem value="autre">Autre</SelectItem>
                                  </SelectContent>
                                </Select>
                                {hasFieldError('secteur') && (
                                  <p className="text-red-400 text-sm mt-2">
                                    ⚠️ Ce champ est obligatoire
                                  </p>
                                )}
                                
                                {/* Champ qui s'affiche quand "Autre" est sélectionné */}
                                {diagnosticData.secteur === "autre" && (
                                  <div className="mt-4">
                                    <Label 
                                      className="text-sm font-medium mb-3 block"
                                      style={{ color: '#F5F5F5' }}
                                    >
                                      Précisez votre secteur d'activité *
                                    </Label>
                                    <Input
                                      type="text"
                                      value={diagnosticData.secteur_autre}
                                      onChange={(e) => {
                                        setDiagnosticData(prev => ({ ...prev, secteur_autre: e.target.value }));
                                        // Enlever l'erreur dès qu'on commence à taper
                                        if (e.target.value.trim() && validationErrors.includes('secteur_autre')) {
                                          setValidationErrors(prev => prev.filter(error => error !== 'secteur_autre'));
                                        }
                                      }}
                                      placeholder="Ex: Agriculture, Immobilier, Transport..."
                                      className="text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50 w-full"
                                      style={{ 
                                        backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                        color: '#F5F5F5',
                                        borderColor: getFieldBorderStyle('secteur_autre'),
                                        borderRadius: '8px'
                                      }}
                                    />
                                    {hasFieldError('secteur_autre') && (
                                      <p className="text-red-400 text-sm mt-2">
                                        ⚠️ Veuillez préciser votre secteur d'activité
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Chiffre d'affaires */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Chiffre d'affaires annuel *
                                </Label>
                                <Select 
                                  value={diagnosticData.chiffre_affaires} 
                                  onValueChange={(value) => {
                                    setDiagnosticData(prev => ({ ...prev, chiffre_affaires: value }));
                                    // Enlever l'erreur dès qu'une valeur est sélectionnée
                                    if (value && validationErrors.includes('chiffre_affaires')) {
                                      setValidationErrors(prev => prev.filter(error => error !== 'chiffre_affaires'));
                                    }
                                  }}
                                >
                                  <SelectTrigger 
                                    className="text-base py-3 px-4 border-2 w-full"
                                    style={{ 
                                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                      color: '#F5F5F5',
                                      borderColor: getFieldBorderStyle('chiffre_affaires'),
                                      borderRadius: '8px'
                                    }}
                                  >
                                    <SelectValue placeholder="Sélectionnez une tranche" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="0-100k">0 - 100k €</SelectItem>
                                    <SelectItem value="100k-500k">100k - 500k €</SelectItem>
                                    <SelectItem value="500k-1M">500k - 1M €</SelectItem>
                                    <SelectItem value="1M-5M">1M - 5M €</SelectItem>
                                    <SelectItem value="5M-20M">5M - 20M €</SelectItem>
                                    <SelectItem value="20M+">Plus de 20M €</SelectItem>
                                  </SelectContent>
                                </Select>
                                {hasFieldError('chiffre_affaires') && (
                                  <p className="text-red-400 text-sm mt-2">
                                    ⚠️ Ce champ est obligatoire
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                         {/* Étape 3 */}
                        {currentStep === 3 && (
                          <div className="space-y-8">
                            <div className="text-center mb-8">
                              <h3 
                                className="text-2xl font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Étape 3/6 – Où se situent vos points de friction ?
                              </h3>
                              <p 
                                className="text-base opacity-80 mb-2"
                                style={{ color: '#F5F5F5' }}
                              >
                                Indiquez les 1 à 3 processus qui vous freinent le plus.
                              </p>
                            </div>

                            <div className="space-y-6">
                              {/* Question avec choix multiples */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-4 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Quels processus clés souhaitez-vous optimiser en priorité ? *
                                </Label>
                                
                                <div className="space-y-3">
                                  {[
                                    'Prospection & prise de RDV',
                                    'Création et suivi des devis',
                                    'Facturation & relances de paiement',
                                    'Support client & FAQ',
                                    'Reporting & tâches administratives'
                                  ].map((option) => (
                                    <div key={option} className="flex items-center space-x-3">
                                      <input
                                        type="checkbox"
                                        id={option}
                                        checked={diagnosticData.processus_prioritaires.includes(option)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setDiagnosticData(prev => ({
                                              ...prev,
                                              processus_prioritaires: [...prev.processus_prioritaires, option]
                                            }));
                                          } else {
                                            setDiagnosticData(prev => ({
                                              ...prev,
                                              processus_prioritaires: prev.processus_prioritaires.filter(item => item !== option)
                                            }));
                                          }
                                        }}
                                        className="w-4 h-4 rounded border-2 focus:ring-2 focus:ring-primary/50"
                                        style={{
                                          accentColor: '#4F46E5',
                                          borderColor: validationErrors.includes('processus_prioritaires') ? '#EF4444' : '#6B7280'
                                        }}
                                      />
                                      <label 
                                        htmlFor={option}
                                        className="text-base cursor-pointer"
                                        style={{ color: '#F5F5F5' }}
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Tâche la plus frustrante - champ optionnel */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Décrivez la tâche la plus frustrante de votre semaine (optionnel)
                                </Label>
                                <textarea
                                  value={diagnosticData.tache_frustrante}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, tache_frustrante: e.target.value }))}
                                  placeholder="Ex: Saisie manuelle de données, relances clients, création de rapports..."
                                  className="w-full text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50 h-24 resize-none"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    color: '#F5F5F5',
                                    borderColor: '#6B7280', // Pas de bordure rouge car optionnel
                                    borderRadius: '8px'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Étape 4 */}
                        {currentStep === 4 && (
                          <div className="space-y-8">
                            <div className="text-center mb-8">
                              <h3 
                                className="text-2xl font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Étape 4/6 – Quantifions ensemble votre potentiel
                              </h3>
                              <p 
                                className="text-base opacity-80"
                                style={{ color: '#F5F5F5' }}
                              >
                                Cette étape reprend les données du simulateur. Vous pouvez les ajuster si besoin.
                              </p>
                            </div>

                            <div className="space-y-6">
                              {/* Heures répétitives */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Heures par semaine passées sur des tâches répétitives *
                                </Label>
                                <Input
                                  type="number"
                                  value={diagnosticData.heures_repetitives || formData.hoursPerWeek}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, heures_repetitives: e.target.value }))}
                                  placeholder="10"
                                  className="text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    color: '#F5F5F5',
                                    borderColor: getFieldBorderStyle('heures_repetitives'),
                                    borderRadius: '8px'
                                  }}
                                  min="1"
                                  max="40"
                                />
                              </div>

                              {/* Coût horaire */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Coût horaire moyen chargé (€) *
                                </Label>
                                <Input
                                  type="number"
                                  value={diagnosticData.cout_horaire || formData.hourlyRate}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, cout_horaire: e.target.value }))}
                                  placeholder="30"
                                  className="text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    color: '#F5F5F5',
                                    borderColor: getFieldBorderStyle('cout_horaire'),
                                    borderRadius: '8px'
                                  }}
                                  min="1"
                                  max="200"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Étape 5 */}
                        {currentStep === 5 && (
                          <div className="space-y-8">
                            <div className="text-center mb-8">
                              <h3 
                                className="text-2xl font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Étape 5/6 – Quels sont vos outils du quotidien ?
                              </h3>
                              <p 
                                className="text-base opacity-80"
                                style={{ color: '#F5F5F5' }}
                              >
                                Cochez vos outils principaux pour identifier les connexions possibles.
                              </p>
                            </div>

                            <div className="space-y-6">
                              {/* Outils principaux */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-4 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Quels outils utilisez-vous actuellement ? *
                                </Label>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    'Google Workspace',
                                    'Microsoft 365',
                                    'Slack',
                                    'LinkedIn'
                                  ].map((outil) => (
                                    <div key={outil} className="flex items-center space-x-3">
                                      <input
                                        type="checkbox"
                                        id={outil}
                                        checked={diagnosticData.outils.includes(outil)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setDiagnosticData(prev => ({
                                              ...prev,
                                              outils: [...prev.outils, outil]
                                            }));
                                            // Enlever l'erreur si au moins un outil est sélectionné
                                            if (validationErrors.includes('outils')) {
                                              setValidationErrors(prev => prev.filter(error => error !== 'outils'));
                                            }
                                          } else {
                                            setDiagnosticData(prev => ({
                                              ...prev,
                                              outils: prev.outils.filter(item => item !== outil)
                                            }));
                                          }
                                        }}
                                        className="w-4 h-4 rounded border-2 focus:ring-2 focus:ring-primary/50"
                                        style={{
                                          accentColor: '#4F46E5',
                                          borderColor: validationErrors.includes('outils') ? '#EF4444' : '#6B7280'
                                        }}
                                      />
                                      <label 
                                        htmlFor={outil}
                                        className="text-base cursor-pointer"
                                        style={{ color: '#F5F5F5' }}
                                      >
                                        {outil}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                {hasFieldError('outils') && (
                                  <p className="text-red-400 text-sm mt-2">
                                    ⚠️ Veuillez sélectionner au moins un outil ou préciser un autre outil
                                  </p>
                                )}
                              </div>

                              {/* Autre outil - champ optionnel */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Autre outil important (optionnel)
                                </Label>
                                <Input
                                  type="text"
                                  value={diagnosticData.autre_outil}
                                  onChange={(e) => {
                                    setDiagnosticData(prev => ({ ...prev, autre_outil: e.target.value }));
                                    // Enlever l'erreur si on commence à taper dans le champ autre outil
                                    if (e.target.value.trim() && validationErrors.includes('outils')) {
                                      setValidationErrors(prev => prev.filter(error => error !== 'outils'));
                                    }
                                  }}
                                  placeholder="Ex: Notion, Trello, CRM spécifique..."
                                  className="text-base py-3 px-4 border-2 focus:ring-2 focus:ring-primary/50"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    color: '#F5F5F5',
                                    borderColor: '#6B7280', // Pas de bordure rouge car optionnel
                                    borderRadius: '8px'
                                  }}
                                />
                                <p className="text-sm mt-2 opacity-70" style={{ color: '#F5F5F5' }}>
                                  Si vous n'utilisez aucun des outils ci-dessus, vous pouvez préciser le vôtre ici
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Étape 6 */}
                        {currentStep === 6 && (
                          <div className="space-y-8">
                            <div className="text-center mb-8">
                              <h3 
                                className="text-2xl font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Étape 6/6 – Derniers réglages
                              </h3>
                              <p 
                                className="text-base opacity-80"
                                style={{ color: '#F5F5F5' }}
                              >
                                Fixons l'urgence et le cadre de votre projet.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Délai souhaité */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Délai souhaité *
                                </Label>
                                <Select 
                                  value={diagnosticData.delai} 
                                  onValueChange={(value) => {
                                    setDiagnosticData(prev => ({ ...prev, delai: value }));
                                    // Enlever l'erreur dès qu'une valeur est sélectionnée
                                    if (value && validationErrors.includes('delai')) {
                                      setValidationErrors(prev => prev.filter(error => error !== 'delai'));
                                    }
                                  }}
                                >
                                  <SelectTrigger 
                                    className="text-base py-3 px-4 border-2 w-full"
                                    style={{ 
                                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                      color: '#F5F5F5',
                                      borderColor: getFieldBorderStyle('delai'),
                                      borderRadius: '8px'
                                    }}
                                  >
                                    <SelectValue placeholder="Sélectionnez votre délai" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="au-plus-vite">Au plus vite</SelectItem>
                                    <SelectItem value="7-jours">7 jours</SelectItem>
                                    <SelectItem value="15-jours">15 jours</SelectItem>
                                    <SelectItem value="1-mois">Dans le mois</SelectItem>
                                    <SelectItem value="2-3-mois">2-3 mois</SelectItem>
                                    <SelectItem value="3-6-mois">3-6 mois</SelectItem>
                                    <SelectItem value="plus-6-mois">Plus de 6 mois</SelectItem>
                                  </SelectContent>
                                </Select>
                                {hasFieldError('delai') && (
                                  <p className="text-red-400 text-sm mt-2">
                                    ⚠️ Ce champ est obligatoire
                                  </p>
                                )}
                              </div>

                              {/* Budget annuel */}
                              <div className="w-full">
                                <Label 
                                  className="text-sm font-medium mb-3 block"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Budget annuel *
                                </Label>
                                <Select 
                                  value={diagnosticData.budget_annuel} 
                                  onValueChange={(value) => {
                                    setDiagnosticData(prev => ({ ...prev, budget_annuel: value }));
                                    // Enlever l'erreur dès qu'une valeur est sélectionnée
                                    if (value && validationErrors.includes('budget_annuel')) {
                                      setValidationErrors(prev => prev.filter(error => error !== 'budget_annuel'));
                                    }
                                  }}
                                >
                                  <SelectTrigger 
                                    className="text-base py-3 px-4 border-2 w-full"
                                    style={{ 
                                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                      color: '#F5F5F5',
                                      borderColor: getFieldBorderStyle('budget_annuel'),
                                      borderRadius: '8px'
                                    }}
                                  >
                                    <SelectValue placeholder="Sélectionnez votre budget" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="non-defini">Non défini</SelectItem>
                                    <SelectItem value="moins-5k">Moins de 5k €</SelectItem>
                                    <SelectItem value="5k-10k">5k - 10k €</SelectItem>
                                    <SelectItem value="10k-25k">10k - 25k €</SelectItem>
                                    <SelectItem value="25k-50k">25k - 50k €</SelectItem>
                                    <SelectItem value="50k-100k">50k - 100k €</SelectItem>
                                    <SelectItem value="100k+">Plus de 100k €</SelectItem>
                                  </SelectContent>
                                </Select>
                                {hasFieldError('budget_annuel') && (
                                  <p className="text-red-400 text-sm mt-2">
                                    ⚠️ Ce champ est obligatoire
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Checkbox de consentement RGPD */}
                            <div className="w-full">
                              <div className="flex items-start space-x-3 p-4 rounded-lg border-2" style={{
                                borderColor: validationErrors.includes('consentement') ? '#EF4444' : 'rgba(107, 114, 128, 0.3)',
                                backgroundColor: validationErrors.includes('consentement') ? 'rgba(239, 68, 68, 0.05)' : 'rgba(31, 41, 55, 0.3)'
                              }}>
                                <input
                                  type="checkbox"
                                  id="consentement"
                                  checked={diagnosticData.consentement}
                                  onChange={(e) => {
                                    setDiagnosticData(prev => ({ ...prev, consentement: e.target.checked }));
                                    // Enlever l'erreur dès que la checkbox est cochée
                                    if (e.target.checked && validationErrors.includes('consentement')) {
                                      setValidationErrors(prev => prev.filter(error => error !== 'consentement'));
                                    }
                                  }}
                                  className="w-5 h-5 rounded border-2 focus:ring-2 focus:ring-primary/50 mt-1"
                                  style={{
                                    accentColor: '#4F46E5',
                                    borderColor: validationErrors.includes('consentement') ? '#EF4444' : '#6B7280'
                                  }}
                                />
                                <label 
                                  htmlFor="consentement"
                                  className="text-sm cursor-pointer leading-relaxed font-medium"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  J'accepte que mes données soient traitées pour établir ce diagnostic et être recontacté(e) à ce sujet. *
                                </label>
                              </div>
                              {hasFieldError('consentement') && (
                                <p className="text-red-400 text-sm mt-2 font-semibold">
                                  ⚠️ OBLIGATOIRE : Vous devez accepter le traitement de vos données pour recevoir votre diagnostic personnalisé
                                </p>
                              )}
                              <p className="text-xs mt-2 opacity-70" style={{ color: '#F5F5F5' }}>
                                En cochant cette case, vous acceptez que vos informations soient utilisées uniquement dans le cadre de ce diagnostic d'automatisation.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Boutons de navigation */}
                        <div className="flex justify-between items-center mt-10">
                          {currentStep > 1 && (
                            <Button
                              onClick={handlePrevStep}
                              variant="outline"
                              size="lg"
                              className="px-8 py-3 text-lg font-semibold transition-all duration-300"
                              style={{
                                borderColor: '#4A9EFF',
                                color: '#4A9EFF',
                                backgroundColor: 'transparent'
                              }}
                            >
                              Précédent
                            </Button>
                          )}
                          
                          <div className={currentStep === 1 ? "mx-auto" : "ml-auto"}>
                            <Button
                              onClick={handleNextStep}
                              size="lg"
                              className="px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-cta-primary hover:bg-cta-primary/90 text-cta-primary-foreground"
                              style={{
                                borderRadius: '8px'
                              }}
                            >
                               {currentStep === 6 ? (
                                 isAnalyzing ? 'Analyse en cours...' : 'Voir mes Résultats & Recevoir mon Rapport'
                               ) : 'Suivant'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
              </div>
            </div>
          </div>
        )}
        </main>
        </>
      )}
    </div>
  );
};

export default ROICalculatorPage;