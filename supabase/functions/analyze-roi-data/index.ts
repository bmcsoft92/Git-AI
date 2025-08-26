import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

// Fonction pour générer des recommandations basées sur des règles métier
function generateRecommendations(diagnosticData: any, roiData: any) {
  const recommendations = [];
  
  // Base de recommandations selon le secteur
  const sectorRecommendations = {
    'E-commerce': [
      {
        title: "Automatisation de la gestion des commandes",
        description: "Mise en place d'un système automatisé pour traiter les commandes, gérer les stocks et synchroniser les inventaires.",
        estimatedROI: "180% sur 6 mois",
        timeline: "4-6 semaines",
        impact: "Réduction de 70% des erreurs de commande",
        priority: 1
      },
      {
        title: "Chatbot de service client intelligent",
        description: "Déploiement d'un assistant virtuel pour traiter automatiquement les demandes clients les plus fréquentes.",
        estimatedROI: "150% sur 4 mois",
        timeline: "3-4 semaines",
        impact: "Réduction de 60% du volume de support",
        priority: 2
      }
    ],
    'Services': [
      {
        title: "Automatisation de la planification",
        description: "Système automatisé de réservation et de gestion des créneaux avec synchronisation calendrier.",
        estimatedROI: "160% sur 5 mois",
        timeline: "3-5 semaines",
        impact: "Gain de 40% sur la gestion du temps",
        priority: 1
      },
      {
        title: "Workflow de suivi client automatisé",
        description: "Automatisation du suivi post-service avec relances et collecte de feedback.",
        estimatedROI: "120% sur 3 mois",
        timeline: "2-3 semaines",
        impact: "Amélioration de 50% de la satisfaction client",
        priority: 2
      }
    ],
    'Manufacturing': [
      {
        title: "Automatisation du contrôle qualité",
        description: "Système de monitoring automatique des process de production avec alertes en temps réel.",
        estimatedROI: "200% sur 8 mois",
        timeline: "6-8 semaines",
        impact: "Réduction de 45% des défauts",
        priority: 1
      },
      {
        title: "Optimisation de la chaîne logistique",
        description: "Automatisation du tracking des matières premières et gestion prédictive des stocks.",
        estimatedROI: "175% sur 6 mois",
        timeline: "4-6 semaines",
        impact: "Réduction de 30% des coûts de stock",
        priority: 2
      }
    ],
    'default': [
      {
        title: "Automatisation de la gestion documentaire",
        description: "Système de classement et archivage automatique des documents avec OCR et indexation.",
        estimatedROI: "140% sur 4 mois",
        timeline: "3-4 semaines",
        impact: "Gain de 50% sur la recherche de documents",
        priority: 1
      },
      {
        title: "Dashboard de pilotage en temps réel",
        description: "Création d'un tableau de bord automatisé consolidant toutes les métriques business importantes.",
        estimatedROI: "130% sur 3 mois",
        timeline: "2-4 semaines",
        impact: "Amélioration de 40% de la prise de décision",
        priority: 2
      }
    ]
  };

  // Recommandations spécifiques selon les processus prioritaires
  const processRecommendations = {
    'gestion-administrative': {
      title: "Automatisation des processus administratifs",
      description: "Digitalisation et automatisation complète des workflows administratifs avec validation électronique.",
      estimatedROI: "160% sur 5 mois",
      timeline: "4-5 semaines",
      impact: "Réduction de 65% du temps administratif",
      priority: 1
    },
    'relation-client': {
      title: "CRM automatisé et personnalisé",
      description: "Mise en place d'un CRM avec automatisation des relances, segmentation et campagnes personnalisées.",
      estimatedROI: "180% sur 6 mois",
      timeline: "4-6 semaines",
      impact: "Augmentation de 35% du taux de conversion",
      priority: 1
    },
    'production': {
      title: "Optimisation des processus de production",
      description: "Automatisation du monitoring production avec optimisation des rendements et maintenance prédictive.",
      estimatedROI: "220% sur 8 mois",
      timeline: "6-8 semaines",
      impact: "Augmentation de 25% de la productivité",
      priority: 1
    }
  };

  // Sélectionner les recommandations selon le secteur
  const sector = diagnosticData.secteur || 'default';
  const sectorRecs = sectorRecommendations[sector] || sectorRecommendations['default'];
  
  // Ajouter une recommandation sectorielle
  recommendations.push(sectorRecs[0]);

  // Ajouter une recommandation basée sur les processus prioritaires
  if (diagnosticData.processus_prioritaires && diagnosticData.processus_prioritaires.length > 0) {
    const mainProcess = diagnosticData.processus_prioritaires[0];
    if (processRecommendations[mainProcess]) {
      recommendations.push(processRecommendations[mainProcess]);
    } else {
      recommendations.push(sectorRecs[1] || sectorRecommendations['default'][1]);
    }
  }

  // Recommandation budgétaire adaptée
  const budget = diagnosticData.budget_annuel;
  let budgetRecommendation;
  
  if (budget === 'moins-10k') {
    budgetRecommendation = {
      title: "Solutions No-Code accessibles",
      description: "Mise en place d'outils No-Code pour automatiser rapidement les tâches répétitives sans développement.",
      estimatedROI: "120% sur 2 mois",
      timeline: "2-3 semaines",
      impact: "Quick wins immédiats sur l'efficacité",
      priority: 3
    };
  } else if (budget === '10k-50k') {
    budgetRecommendation = {
      title: "Intégrations API et workflows avancés",
      description: "Développement de connecteurs entre vos outils existants avec workflows automatisés personnalisés.",
      estimatedROI: "155% sur 4 mois",
      timeline: "4-6 semaines",
      impact: "Synchronisation complète de l'écosystème",
      priority: 3
    };
  } else {
    budgetRecommendation = {
      title: "Transformation digitale complète",
      description: "Refonte globale des processus avec IA intégrée et analytics avancées pour une transformation complète.",
      estimatedROI: "250% sur 12 mois",
      timeline: "8-12 semaines",
      impact: "Révolution des méthodes de travail",
      priority: 3
    };
  }

  recommendations.push(budgetRecommendation);

  return recommendations;
}
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Credentials': 'false',
};

interface AnalyzeRequest {
  roiData: {
    hours_per_week: number;
    hourly_rate: number;
    employees: number;
    investment: number;
    annual_savings: number;
    roi_percentage: number;
  };
  diagnosticData: any;
  userEmail: string;
  userName?: string;
  userPhone?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { roiData, diagnosticData, userEmail, userName, userPhone }: AnalyzeRequest = await req.json();

    console.log("Analyzing ROI data for:", userEmail);
    console.log("Diagnostic data:", diagnosticData);

    // Générer les recommandations avec la logique locale
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