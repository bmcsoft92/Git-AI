import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Prepare the AI analysis prompt
    const analysisPrompt = `
En tant qu'expert en automatisation et transformation digitale, analysez ces données et générez exactement 3 recommandations prioritaires d'automatisation.

DONNÉES ROI:
- Heures par semaine: ${roiData.hours_per_week}h
- Taux horaire: ${roiData.hourly_rate}€
- Employés: ${roiData.employees}
- Investissement: ${roiData.investment}€
- Économies annuelles: ${roiData.annual_savings}€
- ROI: ${roiData.roi_percentage}%

DONNÉES DIAGNOSTIC:
- Taille équipe: ${diagnosticData.team_size}
- Type d'entreprise: ${diagnosticData.business_type}
- Activités principales: ${diagnosticData.main_activities?.join(', ')}
- Tâches répétitives: ${diagnosticData.repetitive_tasks?.join(', ')}
- Outils actuels: ${diagnosticData.current_tools?.join(', ')}
- Points de douleur: ${diagnosticData.pain_points?.join(', ')}
- Objectifs d'automatisation: ${diagnosticData.automation_goals?.join(', ')}
- Timeline: ${diagnosticData.timeline}
- Budget: ${diagnosticData.budget_range}
- Niveau technique: ${diagnosticData.technical_level}
- Processus prioritaires: ${diagnosticData.priority_processes?.join(', ')}
- Métriques de succès: ${diagnosticData.success_metrics?.join(', ')}

INSTRUCTIONS:
Générez exactement 3 recommandations en format JSON avec cette structure:
{
  "recommendations": [
    {
      "title": "Titre du chantier",
      "description": "Description détaillée de la solution d'automatisation recommandée",
      "estimatedROI": "ROI estimé avec pourcentage et délai",
      "timeline": "Délai de mise en œuvre estimé",
      "impact": "Impact concret sur l'entreprise",
      "priority": 1
    }
  ]
}

Priorisez selon:
1. ROI le plus élevé
2. Facilité d'implémentation 
3. Impact immédiat sur les processus métier

Soyez spécifique et concret dans vos recommandations.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'Tu es un expert consultant en automatisation et transformation digitale chez Maia Elange. Tu analyses les données ROI et diagnostic pour générer des recommandations précises et actionnables.' 
          },
          { role: 'user', content: analysisPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const aiData = await response.json();
    console.log("OpenAI response:", aiData);

    let recommendations;
    try {
      const aiContent = aiData.choices[0].message.content;
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        recommendations = parsedData.recommendations;
      } else {
        throw new Error("No valid JSON found in AI response");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      // Fallback recommendations
      recommendations = [
        {
          title: "Automatisation de la Gestion des Emails",
          description: "Mise en place d'un système de tri et réponse automatique des emails pour réduire le temps de traitement",
          estimatedROI: "150% sur 6 mois",
          timeline: "2-3 semaines",
          impact: "Réduction de 60% du temps passé sur les emails",
          priority: 1
        },
        {
          title: "Automatisation des Processus de Facturation",
          description: "Intégration d'un système de facturation automatique avec suivi des paiements",
          estimatedROI: "200% sur 8 mois",
          timeline: "4-6 semaines",
          impact: "Élimination des erreurs de facturation et gain de temps significatif",
          priority: 2
        },
        {
          title: "Dashboard de Suivi en Temps Réel",
          description: "Création d'un tableau de bord automatisé pour le suivi des KPIs business",
          estimatedROI: "120% sur 4 mois",
          timeline: "3-4 semaines",
          impact: "Prise de décision accélérée et visibilité complète",
          priority: 3
        }
      ];
    }

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
        team_size: diagnosticData.team_size,
        business_type: diagnosticData.business_type,
        main_activities: diagnosticData.main_activities,
        repetitive_tasks: diagnosticData.repetitive_tasks,
        current_tools: diagnosticData.current_tools,
        pain_points: diagnosticData.pain_points,
        automation_goals: diagnosticData.automation_goals,
        timeline: diagnosticData.timeline,
        budget_range: diagnosticData.budget_range,
        technical_level: diagnosticData.technical_level,
        priority_processes: diagnosticData.priority_processes,
        success_metrics: diagnosticData.success_metrics,
        priority_projects: recommendations
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to save analysis to database");
    }

    console.log("Analysis saved with ID:", calculationData.id);

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