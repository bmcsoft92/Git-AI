import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ROIResults } from '@/components/ROIResults';
import { ArrowLeft, Home, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ROICalculatorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hoursPerWeek: "10",
    hourlyRate: "40",
    employees: "5",
    investissement: "5000"
  });

  const [showResults, setShowResults] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  
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
        // Le champ 'taille' est pré-rempli donc pas de validation nécessaire
        break;
      case 2:
        if (!diagnosticData.secteur.trim()) errors.push("secteur");
        // Si "Autre" est sélectionné, le champ secteur_autre devient obligatoire
        if (diagnosticData.secteur === "autre" && !diagnosticData.secteur_autre.trim()) {
          errors.push("secteur_autre");
        }
        if (!diagnosticData.chiffre_affaires.trim()) errors.push("chiffre_affaires");
        break;
      case 3:
        if (diagnosticData.processus_prioritaires.length === 0) errors.push("processus_prioritaires");
        break;
      case 4:
        if (!diagnosticData.heures_repetitives.trim()) errors.push("heures_repetitives");
        if (!diagnosticData.cout_horaire.trim()) errors.push("cout_horaire");
        break;
      case 5:
        if (diagnosticData.outils.length === 0) errors.push("outils");
        break;
      case 6:
        if (!diagnosticData.consentement) errors.push("consentement");
        if (!diagnosticData.delai.trim()) errors.push("delai");
        if (!diagnosticData.budget_annuel.trim()) errors.push("budget_annuel");
        break;
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const hasFieldError = (fieldName: string) => {
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

      // Appeler l'edge function d'analyse
      const { data: analysisResponse, error: analysisError } = await supabase.functions.invoke('analyze-roi-data', {
        body: analysisData
      });

      if (analysisError) throw analysisError;

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

  // Gestion des checkboxes multiples
  const handleCheckboxChange = (field: 'processus_prioritaires' | 'outils', value: string, checked: boolean) => {
    setDiagnosticData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
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
        gains_croissance: 0,
        roi_strategique: 0,
        multiplicateur: 0,
        temps_total_economise: 0
      };
    }
    
    // Formules corrigées selon les spécifications
    // 1. Économies Directes (€/an) = Heures × Taux horaire × 52 × Nb employés
    const economies_directes = hoursPerWeek * hourlyRate * 52 * employees;
    
    // 2. Gains de Croissance (€/an) = Économies Directes × 0,5 (temps réinvesti)
    const gains_croissance = economies_directes * 0.5;
    
    // 3. Total Gains = Économies Directes + Gains de Croissance
    const total_gains = economies_directes + gains_croissance;
    
    // 4. ROI (%) = (Total Gains ÷ Budget estimé) × 100
    const roi_strategique = (total_gains / investissement) * 100;
    
    // 5. Multiplicateur = Total Gains ÷ Budget estimé
    const multiplicateur = total_gains / investissement;
    
    // Temps total économisé pour info
    const temps_total_economise = hoursPerWeek * employees * 52;

    return {
      economies_directes: Math.round(economies_directes),
      gains_croissance: Math.round(gains_croissance),
      roi_strategique: Math.round(roi_strategique),
      multiplicateur: Math.round(multiplicateur * 100) / 100, // Deux décimales pour plus de précision
      temps_total_economise: Math.round(temps_total_economise),
      // Versions plafonnées pour l'affichage
      roi_affiche: roi_strategique > 300 ? "300+" : Math.round(roi_strategique).toString(),
      multiplicateur_affiche: multiplicateur > 3 ? "3+" : (Math.round(multiplicateur * 100) / 100).toString()
    };
  };

  const results = calculateROI();

  // Si on affiche les résultats d'analyse IA
  if (showAnalysisResults && analysisResults) {
    return (
      <div className="min-h-screen">
        <Header />
        {/* Bouton de retour pour les résultats */}
        <div className="container mx-auto px-4 pt-4">
          <Button 
            onClick={() => navigate("/")}
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
        <div className="container mx-auto px-4 py-8">
          <ROIResults 
            calculationId={analysisResults.calculationId}
            recommendations={analysisResults.recommendations}
            roiData={{
              annual_savings: calculateROI().economies_directes,
              roi_percentage: calculateROI().roi_strategique,
              investment: parseFloat(formData.investissement)
            }}
            userInfo={{
              name: diagnosticData.nom,
              email: diagnosticData.email
            }}
          />
        </div>
      </div>
    );
  }

  // Affichage normal du calculateur ROI
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Bouton de retour */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex justify-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Button>
        </div>
      </div>
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
                className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
                style={{ color: '#B0B0B0' }}
              >
                Découvrez combien l'automatisation peut vous faire économiser et générer de revenus supplémentaires
              </p>
            </div>

            {/* Calculateur ROI */}
            <Card 
              className="max-w-2xl mx-auto border-0 shadow-2xl animate-fade-in"
              style={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(74, 158, 255, 0.3)'
              }}
            >
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label 
                        htmlFor="heures" 
                        className="block text-sm font-semibold h-5 flex items-center"
                        style={{ color: '#F5F5F5' }}
                      >
                        Heures/semaine à automatiser
                      </Label>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                            <p>Nombre d'heures économisées chaque semaine grâce à l'automatisation.</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="heures"
                      type="number"
                      value={formData.hoursPerWeek}
                      onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                      onFocus={handleInputFocus}
                      className="text-lg font-bold text-center h-14"
                      style={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                        border: '2px solid rgba(74, 158, 255, 0.4)',
                        color: '#F5F5F5',
                        borderRadius: '8px'
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label 
                        htmlFor="taux" 
                        className="block text-sm font-semibold h-5 flex items-center"
                        style={{ color: '#F5F5F5' }}
                      >
                        Taux horaire (€)
                      </Label>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                            <p>Valeur moyenne du temps pour votre organisation (salaire + charges).</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="taux"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      onFocus={handleInputFocus}
                      className="text-lg font-bold text-center h-14"
                      style={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                        border: '2px solid rgba(74, 158, 255, 0.4)',
                        color: '#F5F5F5',
                        borderRadius: '8px'
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label 
                        htmlFor="employes" 
                        className="block text-sm font-semibold h-5 flex items-center"
                        style={{ color: '#F5F5F5' }}
                      >
                        Nombre d'employés concernés
                      </Label>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                            <p>Nombre de collaborateurs concernés par ce gain de temps.</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="employes"
                      type="number"
                      value={formData.employees}
                      onChange={(e) => handleInputChange('employees', e.target.value)}
                      onFocus={handleInputFocus}
                      className="text-lg font-bold text-center h-14"
                      style={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                        border: '2px solid rgba(74, 158, 255, 0.4)',
                        color: '#F5F5F5',
                        borderRadius: '8px'
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label 
                        htmlFor="investissement" 
                        className="block text-sm font-semibold h-5 flex items-center"
                        style={{ color: '#F5F5F5' }}
                      >
                        Budget estimé (€)
                      </Label>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                            <p>Investissement initial estimé dans l'automatisation.</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="investissement"
                      type="number"
                      value={formData.investissement}
                      onChange={(e) => handleInputChange('investissement', e.target.value)}
                      onFocus={handleInputFocus}
                      placeholder="1 000 - 15 000"
                      className="text-lg font-bold text-center h-14"
                      style={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                        border: '2px solid rgba(74, 158, 255, 0.4)',
                        color: '#F5F5F5',
                        borderRadius: '8px'
                      }}
                    />
                    <p className="text-xs opacity-60 mt-1" style={{ color: '#F5F5F5' }}>
                      Fourchette réaliste : 1 000€ - 15 000€ (ajustable selon votre projet)
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => setShowResults(true)}
                          size="lg"
                          className="px-12 py-6 text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
                            color: '#FFFFFF',
                            borderRadius: '12px',
                            boxShadow: '0 8px 25px rgba(255, 140, 66, 0.4)'
                          }}
                        >
                          Découvrir mon ROI
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-4">
                        <div className="text-sm">
                          <div className="font-semibold mb-2">Formule de calcul :</div>
                          <div className="space-y-1 text-xs">
                            <div>• <strong>Économies directes/an :</strong><br />Heures/sem × 46 semaines × Employés × Taux horaire</div>
                            <div>• <strong>Gains croissance/an :</strong><br />25% du temps économisé × Taux horaire × 1.5</div>
                            <div>• <strong>ROI :</strong><br />((Gains totaux - Investissement) / Investissement) × 100</div>
                          </div>
                        </div>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                  <p className="mt-4 text-sm opacity-80" style={{ color: '#F5F5F5' }}>
                    Le calcul est basé sur vos économies de temps estimées × votre coût horaire × le nombre d'employés, comparé à votre budget initial.
                  </p>
                  <p className="mt-2 text-sm opacity-60" style={{ color: '#F5F5F5' }}>
                    Résultat instantané
                  </p>
                </div>
              </CardContent>
              </Card>

            {/* Résultats ROI */}
            {showResults && (
              <Card 
                className="max-w-5xl mx-auto mt-12 border-0 shadow-2xl animate-slide-up"
                style={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(74, 158, 255, 0.3)'
                }}
              >
                <CardContent className="p-10">
                  {/* En-tête des résultats */}
                  <div className="text-center mb-10">
                    <h2 
                      className="text-3xl font-bold mb-4"
                      style={{ color: '#F5F5F5' }}
                    >
                      🎯 Votre Potentiel d'Automatisation
                    </h2>
                    <p 
                      className="text-lg max-w-2xl mx-auto leading-relaxed"
                      style={{ color: '#B0B0B0' }}
                    >
                      Voici l'impact financier que l'automatisation peut avoir sur votre entreprise
                    </p>
                  </div>

                  {/* Total Gains - Métrique principale mise en évidence */}
                  <div className="mb-8">
                    <Card 
                      className="max-w-md mx-auto border-0 shadow-xl"
                      style={{ 
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        border: '2px solid #22C55E'
                      }}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div 
                            className="text-5xl font-bold"
                            style={{ color: '#22C55E' }}
                          >
                            {(results.economies_directes + results.gains_croissance).toLocaleString('fr-FR')}€
                          </div>
                          <TooltipProvider>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-5 w-5 opacity-70 cursor-help" style={{ color: '#F5F5F5' }} />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                                <p>Total des bénéfices annuels : Économies Directes + Gains de Croissance</p>
                              </TooltipContent>
                            </UITooltip>
                          </TooltipProvider>
                        </div>
                        <div className="text-lg font-semibold mb-1" style={{ color: '#F5F5F5' }}>
                          🎯 Total Gains par an
                        </div>
                        <div className="text-sm opacity-80" style={{ color: '#B0B0B0' }}>
                          Bénéfices totaux de l'automatisation
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Métriques principales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div 
                      className="text-center p-6 rounded-xl"
                      style={{ backgroundColor: 'rgba(15, 127, 123, 0.15)' }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div 
                          className="text-4xl font-bold"
                          style={{ color: '#0F7F7B' }}
                        >
                          {results.economies_directes.toLocaleString('fr-FR')}€
                        </div>
                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                              <p>Évaluation en euros du temps économisé sur une année.</p>
                            </TooltipContent>
                          </UITooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                        Économies Directes / an
                      </div>
                    </div>

                    <div 
                      className="text-center p-6 rounded-xl"
                      style={{ backgroundColor: 'rgba(255, 140, 66, 0.15)' }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div 
                          className="text-4xl font-bold"
                          style={{ color: '#FF8C42' }}
                        >
                          {results.gains_croissance.toLocaleString('fr-FR')}€
                        </div>
                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                              <p>Temps libéré réinvesti dans des tâches à plus forte valeur (50% par défaut).</p>
                            </TooltipContent>
                          </UITooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                        Gains de Croissance / an
                      </div>
                    </div>

                    <div 
                      className="text-center p-6 rounded-xl"
                      style={{ backgroundColor: 'rgba(74, 158, 255, 0.15)' }}
                    >
                       <div className="flex items-center justify-center gap-2 mb-2">
                         <div 
                           className="text-4xl font-bold"
                           style={{ color: '#4A9EFF' }}
                         >
                           {results.roi_affiche}%
                         </div>
                         <TooltipProvider>
                           <UITooltip>
                             <TooltipTrigger asChild>
                               <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                             </TooltipTrigger>
                             <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                               <p>Retour sur investissement = (Total Gains ÷ Budget) × 100.</p>
                             </TooltipContent>
                           </UITooltip>
                         </TooltipProvider>
                       </div>
                       <div className="text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                         ROI Stratégique
                       </div>
                       <div className="text-xs italic" style={{ color: '#B0B0B0' }}>
                         ⚠️ Ces résultats sont des estimations indicatives, calculées à partir des données saisies. Les résultats réels peuvent varier selon votre contexte.
                       </div>
                    </div>

                    <div 
                      className="text-center p-6 rounded-xl"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                    >
                       <div className="flex items-center justify-center gap-2 mb-2">
                         <div 
                           className="text-4xl font-bold"
                           style={{ color: '#22C55E' }}
                         >
                           {results.multiplicateur_affiche}x
                         </div>
                         <TooltipProvider>
                           <UITooltip>
                             <TooltipTrigger asChild>
                               <HelpCircle className="h-4 w-4 opacity-60 cursor-help" style={{ color: '#F5F5F5' }} />
                             </TooltipTrigger>
                             <TooltipContent side="top" className="max-w-xs bg-gray-900 text-white p-3 rounded-lg border-0 z-50">
                               <p>Facteur de rentabilité : combien de fois votre investissement est récupéré.</p>
                             </TooltipContent>
                           </UITooltip>
                         </TooltipProvider>
                       </div>
                       <div className="text-sm font-medium mb-2" style={{ color: '#F5F5F5' }}>
                         Multiplicateur
                       </div>
                       <div className="text-xs italic" style={{ color: '#B0B0B0' }}>
                         ⚠️ Ces résultats sont des estimations indicatives, calculées à partir des données saisies. Les résultats réels peuvent varier selon votre contexte.
                       </div>
                    </div>
                  </div>

                  {/* Graphique évolutif */}
                  <div className="mb-10">
                    <h3 
                      className="text-xl font-semibold mb-6 text-center"
                      style={{ color: '#F5F5F5' }}
                    >
                      📊 Évolution de vos économies
                    </h3>
                    
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { periode: 'Semaine', economies: Math.round((results.economies_directes + results.gains_croissance) / 52) },
                            { periode: 'Mois', economies: Math.round((results.economies_directes + results.gains_croissance) / 12) },
                            { periode: 'Année', economies: results.economies_directes + results.gains_croissance }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <XAxis 
                            dataKey="periode" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#B0B0B0', fontSize: 12 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#B0B0B0', fontSize: 12 }}
                            tickFormatter={(value) => `${value.toLocaleString('fr-FR')}€`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [`${value.toLocaleString('fr-FR')}€`, 'Économies']}
                            labelStyle={{ color: '#333' }}
                            contentStyle={{ 
                              backgroundColor: 'rgba(31, 41, 55, 0.95)',
                              border: '1px solid rgba(74, 158, 255, 0.3)',
                              borderRadius: '8px',
                              color: '#F5F5F5'
                            }}
                          />
                          <Bar 
                            dataKey="economies" 
                            fill="url(#barGradient)"
                            radius={[4, 4, 0, 0]}
                          />
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0F7F7B" />
                              <stop offset="100%" stopColor="#FF8C42" />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Bloc explicatif des règles de calcul */}
                  <div className="mb-8 mx-auto max-w-4xl">
                    <Card 
                      className="border-0 shadow-lg"
                      style={{ 
                        backgroundColor: 'rgba(74, 158, 255, 0.05)',
                        border: '1px solid rgba(74, 158, 255, 0.2)'
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">ℹ️</div>
                          <div>
                            <h4 
                              className="text-lg font-semibold mb-3"
                              style={{ color: '#F5F5F5' }}
                            >
                              Comment sont calculés vos résultats ?
                            </h4>
                            <p 
                              className="text-sm mb-3 leading-relaxed"
                              style={{ color: '#B0B0B0' }}
                            >
                              Les résultats sont des estimations calculées à partir des données que vous avez saisies.
                            </p>
                            <div 
                              className="text-sm space-y-2"
                              style={{ color: '#B0B0B0' }}
                            >
                              <div><strong style={{ color: '#4A9EFF' }}>Formules utilisées :</strong></div>
                              <div>• <strong>Économies Directes</strong> = Heures × Taux horaire × 52 × Nb employés</div>
                              <div>• <strong>Gains de Croissance</strong> = Économies Directes × 0,5</div>
                              <div>• <strong>ROI (%)</strong> = (Total Gains ÷ Budget) × 100</div>
                              <div>• <strong>Multiplicateur</strong> = Total Gains ÷ Budget</div>
                            </div>
                            <p 
                              className="text-xs mt-3 italic"
                              style={{ color: '#B0B0B0' }}
                            >
                              Ces chiffres sont des estimations indicatives, calculées à partir des données saisies. Les résultats réels peuvent varier selon votre contexte.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Mention explicite sous les résultats */}
                  <div className="mb-8 text-center">
                    <p 
                      className="text-sm px-6 py-3 rounded-lg border"
                      style={{ 
                        color: '#B0B0B0',
                        backgroundColor: 'rgba(74, 158, 255, 0.05)',
                        borderColor: 'rgba(74, 158, 255, 0.2)'
                      }}
                    >
                      ⚠️ Ces chiffres sont des estimations indicatives, calculées à partir des données saisies. Les résultats réels peuvent varier selon votre contexte.
                    </p>
                  </div>

                  {/* Call to Action intermédiaire */}
                  <div className="text-center mb-8">
                    <Button
                      onClick={() => setShowDetailedResults(true)}
                      size="lg"
                      className="px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 mr-4"
                      style={{
                        backgroundColor: '#4A9EFF',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        border: 'none'
                      }}
                    >
                      Voir l'analyse détaillée
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Résultats détaillés avec graphiques avancés */}
            {showDetailedResults && (
              <Card 
                className="max-w-6xl mx-auto mt-12 border-0 shadow-2xl animate-slide-up"
                style={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(74, 158, 255, 0.3)'
                }}
              >
                <CardContent className="p-10">
                  {/* Titre de la section détaillée */}
                  <div className="text-center mb-12">
                    <h2 
                      className="text-4xl font-bold mb-6"
                      style={{ color: '#F5F5F5' }}
                    >
                      📈 Analyse Financière Complète
                    </h2>
                    <p 
                      className="text-lg max-w-3xl mx-auto leading-relaxed"
                      style={{ color: '#B0B0B0' }}
                    >
                      Découvrez le détail de votre retour sur investissement et les leviers de croissance activés par l'automatisation
                    </p>
                  </div>

                  {/* Métriques détaillées en grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div 
                      className="text-center p-6 rounded-xl border"
                      style={{ 
                        backgroundColor: 'rgba(15, 127, 123, 0.1)',
                        borderColor: '#0F7F7B'
                      }}
                    >
                      <div className="text-3xl mb-2">💰</div>
                      <div 
                        className="text-2xl font-bold mb-1"
                        style={{ color: '#0F7F7B' }}
                      >
                        {Math.round((results.economies_directes + results.gains_croissance) / 52).toLocaleString('fr-FR')}€
                      </div>
                      <div className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                        Par semaine
                      </div>
                    </div>

                    <div 
                      className="text-center p-6 rounded-xl border"
                      style={{ 
                        backgroundColor: 'rgba(255, 140, 66, 0.1)',
                        borderColor: '#FF8C42'
                      }}
                    >
                      <div className="text-3xl mb-2">📅</div>
                      <div 
                        className="text-2xl font-bold mb-1"
                        style={{ color: '#FF8C42' }}
                      >
                        {Math.round((results.economies_directes + results.gains_croissance) / 12).toLocaleString('fr-FR')}€
                      </div>
                      <div className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                        Par mois
                      </div>
                    </div>

                    <div 
                      className="text-center p-6 rounded-xl border"
                      style={{ 
                        backgroundColor: 'rgba(74, 158, 255, 0.1)',
                        borderColor: '#4A9EFF'
                      }}
                    >
                      <div className="text-3xl mb-2">🎯</div>
                      <div 
                        className="text-2xl font-bold mb-1"
                        style={{ color: '#4A9EFF' }}
                      >
                        {(results.economies_directes + results.gains_croissance).toLocaleString('fr-FR')}€
                      </div>
                      <div className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                        Gain total/an
                      </div>
                    </div>

                    <div 
                      className="text-center p-6 rounded-xl border"
                      style={{ 
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        borderColor: '#22C55E'
                      }}
                    >
                      <div className="text-3xl mb-2">⚡</div>
                      <div 
                        className="text-2xl font-bold mb-1"
                        style={{ color: '#22C55E' }}
                      >
                        {results.multiplicateur}x
                      </div>
                      <div className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                        Multiplicateur
                      </div>
                    </div>
                  </div>

                  {/* Explication des calculs avec tooltip */}
                  <div 
                    className="p-8 rounded-xl mb-10 border"
                    style={{ 
                      backgroundColor: 'rgba(74, 158, 255, 0.08)',
                      borderColor: '#4A9EFF'
                    }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <h3 
                        className="text-2xl font-bold mr-3"
                        style={{ color: '#F5F5F5' }}
                      >
                        🔍 Comment nous calculons votre ROI
                      </h3>
                      <div className="relative group">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center cursor-help"
                          style={{ backgroundColor: '#4A9EFF' }}
                        >
                          <span className="text-white text-sm font-bold">?</span>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
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
                      Diagnostic personnalisé • 3 minutes
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
                        <div className="text-center mb-10">
                          <Badge 
                            variant="outline" 
                            className="mb-6 px-4 py-2 text-sm font-medium uppercase tracking-wider"
                            style={{ 
                              borderColor: '#FF8C42', 
                              color: '#FF8C42',
                              backgroundColor: 'rgba(255, 140, 66, 0.1)'
                            }}
                          >
                            ÉTAPE 2 : DIAGNOSTIC PERSONNALISÉ
                          </Badge>
                          
                          <h2 
                            className="text-3xl font-bold mb-4"
                            style={{ color: '#F5F5F5' }}
                          >
                            Obtenez vos 3 chantiers prioritaires
                          </h2>
                          
                          <p 
                            className="text-lg leading-relaxed max-w-2xl mx-auto"
                            style={{ color: '#B0B0B0' }}
                          >
                            Répondez à quelques questions pour recevoir vos recommandations d'automatisation personnalisées
                          </p>
                          
                          {/* Barre de progression */}
                          <div className="mt-8 max-w-md mx-auto">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                                Étape {currentStep} sur 6
                              </span>
                              <span className="text-sm font-medium" style={{ color: '#4A9EFF' }}>
                                {Math.round(getProgressValue())}%
                              </span>
                            </div>
                            <Progress 
                              value={getProgressValue()} 
                              className="h-3"
                              style={{
                                backgroundColor: 'rgba(74, 158, 255, 0.2)'
                              }}
                            />
                          </div>
                        </div>

                        {/* Étapes du diagnostic */}
                        {currentStep === 1 && (
                          <div className="space-y-6">
                            <h3 
                              className="text-2xl font-semibold text-center mb-8"
                              style={{ color: '#F5F5F5' }}
                            >
                              👋 Parlez-nous de vous
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label 
                                  htmlFor="nom" 
                                  className="block text-sm font-semibold mb-3"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Nom et Prénom *
                                </Label>
                                <Input
                                  id="nom"
                                  value={diagnosticData.nom}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, nom: e.target.value }))}
                                  placeholder="Votre nom complet"
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('nom')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                />
                                {hasFieldError('nom') && (
                                  <p className="text-red-400 text-sm mt-2 font-semibold">
                                    ⚠️ Nom obligatoire
                                  </p>
                                )}
                              </div>

                              <div>
                                <Label 
                                  htmlFor="email" 
                                  className="block text-sm font-semibold mb-3"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Email professionnel *
                                </Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={diagnosticData.email}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, email: e.target.value }))}
                                  placeholder="votre@entreprise.com"
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('email')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                />
                                {hasFieldError('email') && (
                                  <p className="text-red-400 text-sm mt-2 font-semibold">
                                    ⚠️ Email valide obligatoire
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <Label 
                                htmlFor="organisation" 
                                className="block text-sm font-semibold mb-3"
                                style={{ color: '#F5F5F5' }}
                              >
                                Nom de votre entreprise/organisation *
                              </Label>
                              <Input
                                id="organisation"
                                value={diagnosticData.organisation}
                                onChange={(e) => setDiagnosticData(prev => ({ ...prev, organisation: e.target.value }))}
                                placeholder="Nom de votre entreprise"
                                className="h-12 text-base"
                                style={{ 
                                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                  border: `2px solid ${getFieldBorderStyle('organisation')}`,
                                  color: '#F5F5F5',
                                  borderRadius: '8px'
                                }}
                              />
                              {hasFieldError('organisation') && (
                                <p className="text-red-400 text-sm mt-2 font-semibold">
                                  ⚠️ Nom d'entreprise obligatoire
                                </p>
                              )}
                            </div>

                            <div>
                              <Label 
                                htmlFor="taille" 
                                className="block text-sm font-semibold mb-3"
                                style={{ color: '#F5F5F5' }}
                              >
                                Taille de l'équipe *
                              </Label>
                              <Select
                                value={diagnosticData.taille}
                                onValueChange={(value) => setDiagnosticData(prev => ({ ...prev, taille: value }))}
                              >
                                <SelectTrigger 
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('taille')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Moi uniquement (solo)</SelectItem>
                                  <SelectItem value="2-5">2-5 employés</SelectItem>
                                  <SelectItem value="6-20">6-20 employés</SelectItem>
                                  <SelectItem value="21-100">21-100 employés</SelectItem>
                                  <SelectItem value="100+">Plus de 100 employés</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="space-y-6">
                            <h3 
                              className="text-2xl font-semibold text-center mb-8"
                              style={{ color: '#F5F5F5' }}
                            >
                              🏢 Votre secteur d'activité
                            </h3>
                            
                            <div>
                              <Label 
                                htmlFor="secteur" 
                                className="block text-sm font-semibold mb-3"
                                style={{ color: '#F5F5F5' }}
                              >
                                Dans quel secteur évoluez-vous ? *
                              </Label>
                              <Select
                                value={diagnosticData.secteur}
                                onValueChange={(value) => setDiagnosticData(prev => ({ ...prev, secteur: value }))}
                              >
                                <SelectTrigger 
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('secteur')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                >
                                  <SelectValue placeholder="Choisissez votre secteur" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="services-b2b">Services B2B</SelectItem>
                                  <SelectItem value="e-commerce">E-commerce / Retail</SelectItem>
                                  <SelectItem value="industrie">Industrie / Manufacturing</SelectItem>
                                  <SelectItem value="sante">Santé / Médical</SelectItem>
                                  <SelectItem value="finance">Finance / Assurance</SelectItem>
                                  <SelectItem value="immobilier">Immobilier</SelectItem>
                                  <SelectItem value="education">Éducation / Formation</SelectItem>
                                  <SelectItem value="marketing">Marketing / Communication</SelectItem>
                                  <SelectItem value="juridique">Juridique</SelectItem>
                                  <SelectItem value="autre">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                              {hasFieldError('secteur') && (
                                <p className="text-red-400 text-sm mt-2 font-semibold">
                                  ⚠️ Secteur obligatoire
                                </p>
                              )}
                            </div>

                            {/* Champ conditionnel si "Autre" est sélectionné */}
                            {diagnosticData.secteur === "autre" && (
                              <div>
                                <Label 
                                  htmlFor="secteur_autre" 
                                  className="block text-sm font-semibold mb-3"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Précisez votre secteur *
                                </Label>
                                <Input
                                  id="secteur_autre"
                                  value={diagnosticData.secteur_autre}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, secteur_autre: e.target.value }))}
                                  placeholder="Décrivez votre secteur d'activité"
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('secteur_autre')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                />
                                {hasFieldError('secteur_autre') && (
                                  <p className="text-red-400 text-sm mt-2 font-semibold">
                                    ⚠️ Description du secteur obligatoire
                                  </p>
                                )}
                              </div>
                            )}

                            <div>
                              <Label 
                                htmlFor="chiffre_affaires" 
                                className="block text-sm font-semibold mb-3"
                                style={{ color: '#F5F5F5' }}
                              >
                                Chiffre d'affaires annuel approximatif *
                              </Label>
                              <Select
                                value={diagnosticData.chiffre_affaires}
                                onValueChange={(value) => setDiagnosticData(prev => ({ ...prev, chiffre_affaires: value }))}
                              >
                                <SelectTrigger 
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('chiffre_affaires')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                >
                                  <SelectValue placeholder="Choisissez votre tranche de CA" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0-50k">0 - 50k€</SelectItem>
                                  <SelectItem value="50k-200k">50k - 200k€</SelectItem>
                                  <SelectItem value="200k-500k">200k - 500k€</SelectItem>
                                  <SelectItem value="500k-1m">500k - 1M€</SelectItem>
                                  <SelectItem value="1m-5m">1M - 5M€</SelectItem>
                                  <SelectItem value="5m+">Plus de 5M€</SelectItem>
                                </SelectContent>
                              </Select>
                              {hasFieldError('chiffre_affaires') && (
                                <p className="text-red-400 text-sm mt-2 font-semibold">
                                  ⚠️ Chiffre d'affaires obligatoire
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="space-y-6">
                            <h3 
                              className="text-2xl font-semibold text-center mb-8"
                              style={{ color: '#F5F5F5' }}
                            >
                              🎯 Quels processus vous préoccupent le plus ?
                            </h3>
                            
                            <div>
                              <Label 
                                className="block text-sm font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Sélectionnez tous les processus que vous aimeriez automatiser * :
                              </Label>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  'Gestion des emails et communications',
                                  'Facturation et devis automatiques', 
                                  'Gestion de la relation client (CRM)',
                                  'Comptabilité et finances',
                                  'Planification et rendez-vous',
                                  'Réseaux sociaux et marketing',
                                  'Gestion des stocks/inventaire',
                                  'Reporting et tableaux de bord',
                                  'Ressources humaines et paie',
                                  'Suivi de projets',
                                  'Service client et support',
                                  'Génération de leads'
                                ].map((processus) => (
                                  <label key={processus} className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-blue-900/20 transition-colors">
                                    <input
                                      type="checkbox"
                                      checked={diagnosticData.processus_prioritaires.includes(processus)}
                                      onChange={(e) => handleCheckboxChange('processus_prioritaires', processus, e.target.checked)}
                                      className="w-5 h-5 rounded border-2 border-blue-400 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                                      {processus}
                                    </span>
                                  </label>
                                ))}
                              </div>
                              
                              {hasFieldError('processus_prioritaires') && (
                                <p className="text-red-400 text-sm mt-3 font-semibold">
                                  ⚠️ Sélectionnez au moins un processus
                                </p>
                              )}
                            </div>

                            <div>
                              <Label 
                                htmlFor="tache_frustrante" 
                                className="block text-sm font-semibold mb-3"
                                style={{ color: '#F5F5F5' }}
                              >
                                Y a-t-il une tâche particulièrement chronophage ou frustrante ? (optionnel)
                              </Label>
                              <Input
                                id="tache_frustrante"
                                value={diagnosticData.tache_frustrante}
                                onChange={(e) => setDiagnosticData(prev => ({ ...prev, tache_frustrante: e.target.value }))}
                                placeholder="Ex: Relancer les clients en retard de paiement..."
                                className="h-12 text-base"
                                style={{ 
                                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                  border: '2px solid rgba(74, 158, 255, 0.4)',
                                  color: '#F5F5F5',
                                  borderRadius: '8px'
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {currentStep === 4 && (
                          <div className="space-y-6">
                            <h3 
                              className="text-2xl font-semibold text-center mb-8"
                              style={{ color: '#F5F5F5' }}
                            >
                              ⏱️ Impact temps et coûts
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label 
                                  htmlFor="heures_repetitives" 
                                  className="block text-sm font-semibold mb-3"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Heures par semaine consacrées aux tâches répétitives *
                                </Label>
                                <Input
                                  id="heures_repetitives"
                                  type="number"
                                  value={diagnosticData.heures_repetitives}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, heures_repetitives: e.target.value }))}
                                  placeholder="Ex: 15"
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('heures_repetitives')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                />
                                {hasFieldError('heures_repetitives') && (
                                  <p className="text-red-400 text-sm mt-2 font-semibold">
                                    ⚠️ Nombre d'heures obligatoire
                                  </p>
                                )}
                              </div>

                              <div>
                                <Label 
                                  htmlFor="cout_horaire" 
                                  className="block text-sm font-semibold mb-3"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Coût horaire moyen chargé (€) *
                                </Label>
                                <Input
                                  id="cout_horaire"
                                  type="number"
                                  value={diagnosticData.cout_horaire}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, cout_horaire: e.target.value }))}
                                  placeholder="Ex: 45"
                                  className="h-12 text-base"
                                  style={{ 
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    border: `2px solid ${getFieldBorderStyle('cout_horaire')}`,
                                    color: '#F5F5F5',
                                    borderRadius: '8px'
                                  }}
                                />
                                {hasFieldError('cout_horaire') && (
                                  <p className="text-red-400 text-sm mt-2 font-semibold">
                                    ⚠️ Coût horaire obligatoire
                                  </p>
                                )}
                              </div>
                            </div>

                            <div 
                              className="p-4 rounded-lg"
                              style={{ backgroundColor: 'rgba(74, 158, 255, 0.1)' }}
                            >
                              <h4 className="font-semibold mb-2" style={{ color: '#4A9EFF' }}>
                                💡 Calcul automatique de vos économies potentielles
                              </h4>
                              <p className="text-sm" style={{ color: '#B0B0B0' }}>
                                Sur la base de vos données : {diagnosticData.heures_repetitives || '0'}h/semaine × {diagnosticData.cout_horaire || '0'}€/h = 
                                <span className="font-bold" style={{ color: '#F5F5F5' }}>
                                  {' '}{((parseFloat(diagnosticData.heures_repetitives) || 0) * (parseFloat(diagnosticData.cout_horaire) || 0) * 46).toLocaleString('fr-FR')}€ d'économies potentielles par an
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                        {currentStep === 5 && (
                          <div className="space-y-6">
                            <h3 
                              className="text-2xl font-semibold text-center mb-8"
                              style={{ color: '#F5F5F5' }}
                            >
                              🛠️ Vos outils actuels
                            </h3>
                            
                            <div>
                              <Label 
                                className="block text-sm font-semibold mb-4"
                                style={{ color: '#F5F5F5' }}
                              >
                                Quels outils utilisez-vous actuellement ? * :
                              </Label>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  'Excel / Google Sheets',
                                  'CRM (Salesforce, HubSpot, etc.)',
                                  'ERP (SAP, Oracle, etc.)',
                                  'Outils comptables (Sage, Cegid, etc.)',
                                  'Email marketing (Mailchimp, etc.)',
                                  'Réseaux sociaux natifs',
                                  'Outils de gestion de projets',
                                  'Solutions e-commerce',
                                  'Logiciels métiers spécialisés',
                                  'Outils de communication (Teams, Slack)',
                                  'Systèmes de tickets/helpdesk',
                                  'Aucun outil particulier'
                                ].map((outil) => (
                                  <label key={outil} className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-blue-900/20 transition-colors">
                                    <input
                                      type="checkbox"
                                      checked={diagnosticData.outils.includes(outil)}
                                      onChange={(e) => handleCheckboxChange('outils', outil, e.target.checked)}
                                      className="w-5 h-5 rounded border-2 border-blue-400 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                                      {outil}
                                    </span>
                                  </label>
                                ))}
                              </div>
                              
                              {hasFieldError('outils') && (
                                <p className="text-red-400 text-sm mt-3 font-semibold">
                                  ⚠️ Sélectionnez au moins un outil
                                </p>
                              )}
                            </div>

                            <div>
                              <Label 
                                htmlFor="autre_outil" 
                                className="block text-sm font-semibold mb-3"
                                style={{ color: '#F5F5F5' }}
                              >
                                Autres outils non listés ? (optionnel)
                              </Label>
                              <Input
                                id="autre_outil"
                                value={diagnosticData.autre_outil}
                                onChange={(e) => setDiagnosticData(prev => ({ ...prev, autre_outil: e.target.value }))}
                                placeholder="Nommez d'autres outils que vous utilisez..."
                                className="h-12 text-base"
                                style={{ 
                                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                  border: '2px solid rgba(74, 158, 255, 0.4)',
                                  color: '#F5F5F5',
                                  borderRadius: '8px'
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {currentStep === 6 && (
                          <div className="space-y-6">
                            <h3 
                              className="text-2xl font-semibold text-center mb-8"
                              style={{ color: '#F5F5F5' }}
                            >
                              🎯 Dernière étape : vos objectifs
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label 
                                  htmlFor="delai" 
                                  className="block text-sm font-semibold mb-3"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Dans quel délai souhaitez-vous automatiser ? *
                                </Label>
                                <Select
                                  value={diagnosticData.delai}
                                  onValueChange={(value) => setDiagnosticData(prev => ({ ...prev, delai: value }))}
                                >
                                  <SelectTrigger 
                                    className="h-12 text-base"
                                    style={{ 
                                      backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                      border: `2px solid ${getFieldBorderStyle('delai')}`,
                                      color: '#F5F5F5',
                                      borderRadius: '8px'
                                    }}
                                  >
                                    <SelectValue placeholder="Choisissez un délai" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="asap">Le plus rapidement possible</SelectItem>
                                    <SelectItem value="1-3-months">Dans 1-3 mois</SelectItem>
                                    <SelectItem value="3-6-months">Dans 3-6 mois</SelectItem>
                                    <SelectItem value="6-12-months">Dans 6-12 mois</SelectItem>
                                    <SelectItem value="exploring">J'explore les possibilités</SelectItem>
                                  </SelectContent>
                                </Select>
                                {hasFieldError('delai') && (
                                  <p className="text-red-400 text-sm mt-2 font-semibold">
                                    ⚠️ OBLIGATOIRE : Sélectionnez un délai
                                  </p>
                                )}
                              </div>

                              <div>
                                <Label 
                                  htmlFor="budget_annuel" 
                                  className="block text-sm font-semibold mb-3"
                                  style={{ color: '#F5F5F5' }}
                                >
                                  Budget annuel envisagé pour l'automatisation ? *
                                </Label>
                                <Select
                                  value={diagnosticData.budget_annuel}
                                  onValueChange={(value) => setDiagnosticData(prev => ({ ...prev, budget_annuel: value }))}
                                >
                                  <SelectTrigger 
                                    className="h-12 text-base"
                                    style={{ 
                                      backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                      border: `2px solid ${getFieldBorderStyle('budget_annuel')}`,
                                      color: '#F5F5F5',
                                      borderRadius: '8px'
                                    }}
                                  >
                                    <SelectValue placeholder="Choisissez un budget" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0-5k">0 - 5 000€</SelectItem>
                                    <SelectItem value="5k-15k">5 000 - 15 000€</SelectItem>
                                    <SelectItem value="15k-30k">15 000 - 30 000€</SelectItem>
                                    <SelectItem value="30k-50k">30 000 - 50 000€</SelectItem>
                                    <SelectItem value="50k+">Plus de 50 000€</SelectItem>
                                    <SelectItem value="depends-roi">Ça dépend du ROI démontré</SelectItem>
                                  </SelectContent>
                                </Select>
                                {hasFieldError('budget_annuel') && (
                                  <p className="text-red-400 text-sm mt-2 font-semibold">
                                    ⚠️ OBLIGATOIRE : Sélectionnez un budget
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Consentement RGPD obligatoire */}
                            <div 
                              className="p-6 rounded-xl border-2"
                              style={{ 
                                backgroundColor: 'rgba(255, 140, 66, 0.1)',
                                borderColor: hasFieldError('consentement') ? 'rgba(239, 68, 68, 0.8)' : '#FF8C42'
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <input
                                  id="consentement"
                                  type="checkbox"
                                  checked={diagnosticData.consentement}
                                  onChange={(e) => setDiagnosticData(prev => ({ ...prev, consentement: e.target.checked }))}
                                  className={`w-6 h-6 rounded border-2 text-orange-600 focus:ring-orange-500 cursor-pointer ${
                                    hasFieldError('consentement') ? 'border-red-500' : 'border-orange-400'
                                  }`}
                                  style={{
                                    accentColor: '#FF8C42'
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
                              disabled={isAnalyzing}
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
    </div>
  );
};

export default ROICalculatorPage;