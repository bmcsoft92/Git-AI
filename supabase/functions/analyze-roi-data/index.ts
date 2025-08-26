import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Credentials': 'false',
};

// Types et interfaces
interface RecommendationTemplate {
  title: string;
  description: string;
  baseROI: number;
  baseTimeline: string;
  baseImpact: string;
  sectors: string[];
  processes: string[];
  minBudget: number;
  complexity: 'low' | 'medium' | 'high';
}

interface DiagnosticData {
  taille: string;
  secteur: string;
  chiffre_affaires: string;
  processus_prioritaires: string[];
  tache_frustrante: string;
  heures_repetitives: number;
  cout_horaire: number;
  outils: string[];
  autre_outil?: string;
  delai: string;
  budget_annuel: string;
  organisation?: string;
}

interface AnalyzeRequest {
  roiData: {
    hours_per_week: number;
    hourly_rate: number;
    employees: number;
    investment: number;
    annual_savings: number;
    roi_percentage: number;
  };
  diagnosticData: DiagnosticData;
  userEmail: string;
  userName?: string;
  userPhone?: string;
}

// Base de données des recommandations avec scoring intelligent
const RECOMMENDATION_TEMPLATES: RecommendationTemplate[] = [
  {
    title: "Automatisation de la gestion des commandes",
    description: "Système automatisé pour traiter les commandes, gérer les stocks et synchroniser les inventaires en temps réel.",
    baseROI: 180,
    baseTimeline: "4-6 semaines",
    baseImpact: "Réduction de 70% des erreurs",
    sectors: ['E-commerce', 'Retail'],
    processes: ['relation-client', 'gestion-administrative'],
    minBudget: 15000,
    complexity: 'medium'
  },
  {
    title: "CRM automatisé et personnalisé",
    description: "CRM avec automatisation des relances, segmentation intelligente et campagnes personnalisées basées sur l'IA.",
    baseROI: 200,
    baseTimeline: "4-6 semaines",
    baseImpact: "Augmentation de 35% du taux de conversion",
    sectors: ['Services', 'E-commerce', 'default'],
    processes: ['relation-client', 'commercial'],
    minBudget: 12000,
    complexity: 'medium'
  },
  {
    title: "Automatisation des processus administratifs",
    description: "Digitalisation complète des workflows administratifs avec validation électronique et traçabilité.",
    baseROI: 160,
    baseTimeline: "3-5 semaines",
    baseImpact: "Réduction de 65% du temps administratif",
    sectors: ['default'],
    processes: ['gestion-administrative', 'comptabilite'],
    minBudget: 8000,
    complexity: 'low'
  },
  {
    title: "Dashboard de pilotage intelligent",
    description: "Tableau de bord en temps réel avec analytics prédictives et alertes automatiques sur les KPIs critiques.",
    baseROI: 140,
    baseTimeline: "2-4 semaines",
    baseImpact: "Amélioration de 50% de la prise de décision",
    sectors: ['default'],
    processes: ['gestion-administrative', 'production'],
    minBudget: 5000,
    complexity: 'low'
  },
  {
    title: "Automatisation du contrôle qualité",
    description: "Monitoring automatique des process avec IA de détection d'anomalies et maintenance prédictive.",
    baseROI: 220,
    baseTimeline: "6-8 semaines",
    baseImpact: "Réduction de 45% des défauts",
    sectors: ['Manufacturing', 'Production'],
    processes: ['production', 'controle-qualite'],
    minBudget: 25000,
    complexity: 'high'
  },
  {
    title: "Chatbot de service client intelligent",
    description: "Assistant virtuel avec traitement automatique des demandes et escalade intelligente vers les humains.",
    baseROI: 150,
    baseTimeline: "3-4 semaines",
    baseImpact: "Réduction de 60% du volume de support",
    sectors: ['E-commerce', 'Services', 'default'],
    processes: ['relation-client', 'support'],
    minBudget: 7000,
    complexity: 'medium'
  },
  {
    title: "Solutions No-Code pour gains rapides",
    description: "Automatisation des tâches répétitives avec des outils No-Code pour des résultats immédiats.",
    baseROI: 120,
    baseTimeline: "1-2 semaines",
    baseImpact: "Quick wins immédiats",
    sectors: ['default'],
    processes: ['default'],
    minBudget: 2000,
    complexity: 'low'
  },
  {
    title: "Transformation digitale complète",
    description: "Refonte globale des processus avec IA intégrée, analytics avancées et workflows intelligents.",
    baseROI: 300,
    baseTimeline: "8-12 semaines",
    baseImpact: "Révolution complète des méthodes de travail",
    sectors: ['default'],
    processes: ['default'],
    minBudget: 50000,
    complexity: 'high'
  }
];

// Utilitaires de scoring et calcul
class RecommendationEngine {
  static getBudgetRange(budget: string): number {
    const budgetMap: Record<string, number> = {
      'moins-10k': 5000,
      '10k-50k': 25000,
      '50k-plus': 100000,
      'default': 15000
    };
    return budgetMap[budget] || budgetMap['default'];
  }

  static calculateAdaptiveROI(template: RecommendationTemplate, diagnosticData: DiagnosticData, roiData: any): number {
    let adaptedROI = template.baseROI;
    
    // Ajustement selon les heures répétitives
    const repetitiveHours = diagnosticData.heures_repetitives || 0;
    if (repetitiveHours > 20) adaptedROI *= 1.3;
    else if (repetitiveHours > 10) adaptedROI *= 1.15;
    
    // Ajustement selon le coût horaire
    const hourlyRate = diagnosticData.cout_horaire || 0;
    if (hourlyRate > 50) adaptedROI *= 1.2;
    else if (hourlyRate > 30) adaptedROI *= 1.1;
    
    // Ajustement selon la complexité vs budget
    const budget = this.getBudgetRange(diagnosticData.budget_annuel);
    if (template.complexity === 'low' && budget < 10000) adaptedROI *= 1.1;
    if (template.complexity === 'high' && budget > 50000) adaptedROI *= 1.2;
    
    return Math.round(adaptedROI);
  }

  static scoreRecommendation(template: RecommendationTemplate, diagnosticData: DiagnosticData): number {
    let score = 0;
    
    // Score secteur (40%)
    if (template.sectors.includes(diagnosticData.secteur) || template.sectors.includes('default')) {
      score += template.sectors.includes(diagnosticData.secteur) ? 40 : 20;
    }
    
    // Score processus (35%)
    const processes = diagnosticData.processus_prioritaires || [];
    const processMatch = processes.some(p => template.processes.includes(p));
    if (processMatch) score += 35;
    else if (template.processes.includes('default')) score += 15;
    
    // Score budget (20%)
    const budget = this.getBudgetRange(diagnosticData.budget_annuel);
    const budgetRatio = budget / template.minBudget;
    if (budgetRatio >= 1) score += 20;
    else if (budgetRatio >= 0.5) score += 10;
    
    // Score ROI potentiel (5%)
    score += Math.min(template.baseROI / 40, 5);
    
    return score;
  }
}

// Fonction principale optimisée
function generateRecommendations(diagnosticData: DiagnosticData, roiData: any) {
  // Scorer toutes les recommandations
  const scoredTemplates = RECOMMENDATION_TEMPLATES
    .map(template => ({
      template,
      score: RecommendationEngine.scoreRecommendation(template, diagnosticData),
      adaptedROI: RecommendationEngine.calculateAdaptiveROI(template, diagnosticData, roiData)
    }))
    .sort((a, b) => b.score - a.score);

  // Sélectionner les 3 meilleures avec diversité
  const selectedRecommendations = [];
  const usedComplexities = new Set();
  
  for (const item of scoredTemplates) {
    if (selectedRecommendations.length >= 3) break;
    
    // Assurer la diversité de complexité
    if (selectedRecommendations.length < 2 || !usedComplexities.has(item.template.complexity)) {
      usedComplexities.add(item.template.complexity);
      
      selectedRecommendations.push({
        title: item.template.title,
        description: item.template.description,
        estimatedROI: `${item.adaptedROI}% sur ${item.template.baseTimeline.split(' ').pop()}`,
        timeline: item.template.baseTimeline,
        impact: item.template.baseImpact,
        priority: selectedRecommendations.length + 1
      });
    }
  }
  
  // Compléter avec les meilleures si nécessaire
  while (selectedRecommendations.length < 3) {
    const remaining = scoredTemplates.find(item => 
      !selectedRecommendations.some(rec => rec.title === item.template.title)
    );
    
    if (remaining) {
      selectedRecommendations.push({
        title: remaining.template.title,
        description: remaining.template.description,
        estimatedROI: `${remaining.adaptedROI}% sur ${remaining.template.baseTimeline.split(' ').pop()}`,
        timeline: remaining.template.baseTimeline,
        impact: remaining.template.baseImpact,
        priority: selectedRecommendations.length + 1
      });
    } else {
      break;
    }
  }

  return selectedRecommendations;
}

// Serveur principal
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { roiData, diagnosticData, userEmail, userName, userPhone }: AnalyzeRequest = await req.json();

    console.log("Analyzing ROI data for:", userEmail);
    console.log("Diagnostic data:", diagnosticData);

    // Générer les recommandations avec la logique locale optimisée
    const recommendations = generateRecommendations(diagnosticData, roiData);
    console.log("Generated recommendations:", recommendations);

    // Save to database
    const { data: calculationData, error: insertError } = await supabase
      .from('roi_calculations')
      .insert({
        user_email: userEmail,
        user_name: userName,
        user_phone: userPhone,
        hours_per_week: roiData.hours_per_week,
        hourly_rate: roiData.hourly_rate,
        employees: roiData.employees,
        investment: roiData.investment,
        annual_savings: roiData.annual_savings,
        roi_percentage: roiData.roi_percentage,
        team_size: diagnosticData.taille,
        business_type: diagnosticData.secteur,
        main_activities: diagnosticData.processus_prioritaires,
        repetitive_tasks: [diagnosticData.tache_frustrante].filter(Boolean),
        current_tools: diagnosticData.outils,
        pain_points: [diagnosticData.tache_frustrante].filter(Boolean),
        automation_goals: diagnosticData.processus_prioritaires,
        timeline: diagnosticData.delai,
        budget_range: diagnosticData.budget_annuel,
        technical_level: 'standard',
        priority_processes: diagnosticData.processus_prioritaires,
        success_metrics: ['ROI', 'Temps économisé'],
        priority_projects: recommendations
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to save analysis to database");
    }

    console.log("Analysis saved with ID:", calculationData.id);

    // Créer ou mettre à jour le lead dans le CRM
    console.log("Creating/updating lead in CRM...");
    
    const { data: leadData, error: leadError } = await supabase
      .rpc('upsert_lead', {
        p_email: userEmail,
        p_name: userName || null,
        p_phone: userPhone || null,
        p_company: diagnosticData.organisation || null,
        p_team_size: diagnosticData.taille || null,
        p_business_type: diagnosticData.secteur || null,
        p_roi_potential: roiData.roi_percentage,
        p_annual_savings: roiData.annual_savings,
        p_status: 'nouveau',
        p_budget_range: diagnosticData.budget_annuel || null
      });

    if (leadError) {
      console.error("Error creating/updating lead:", leadError);
    } else {
      console.log("Lead created/updated with ID:", leadData);
      
      // Lier l'analyse ROI au lead
      await supabase
        .from('roi_calculations')
        .update({ lead_id: leadData })
        .eq('id', calculationData.id);
      
      // Envoyer l'email avec les recommandations via l'edge function
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-roi-email', {
        body: {
          calculationId: calculationData.id,
          userEmail,
          userName,
          roiData,
          diagnosticData,
          recommendations
        }
      });

      if (emailError) {
        console.error("Error sending email:", emailError);
      } else {
        console.log("Email sent successfully");
        
        // Mettre à jour le statut du lead après envoi de l'email (reste nouveau)
        console.log("Email ROI sent successfully to lead:", userEmail);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      calculationId: calculationData.id,
      recommendations: recommendations
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in analyze-roi-data function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: "Failed to analyze ROI data"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});