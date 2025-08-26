import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
}

// Initialize Supabase client for database operations
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { heures, taux, employes, budget, userEmail, userName, diagnosticData } = await req.json()

    if (!heures || !taux || !employes) {
      return new Response(JSON.stringify({ error: "Données insuffisantes" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    // Calculs ROI
    const gainsDirects = heures * taux * employes * 52 // 52 semaines
    const gainsCroissance = gainsDirects * 0.5
    const totalGains = gainsDirects + gainsCroissance
    const roiPercentage = budget ? ((totalGains - budget) / budget) * 100 : null

    const roiData = {
      total: totalGains,
      directs: gainsDirects,
      croissance: gainsCroissance,
      budget,
      roi: roiPercentage,
      hours_per_week: heures,
      hourly_rate: taux,
      employees: employes,
      investment: budget || 0,
      annual_savings: totalGains
    }

    console.log("Calcul ROI effectué:", roiData)

    // Sauvegarder en base si on a les données utilisateur
    if (userEmail && diagnosticData) {
      try {
        const { data: calculationData, error: insertError } = await supabase
          .from('roi_calculations')
          .insert({
            user_email: userEmail,
            user_name: userName || null,
            hours_per_week: heures,
            hourly_rate: taux,
            employees: employes,
            investment: budget || 0,
            annual_savings: totalGains,
            roi_percentage: roiPercentage || 0,
            team_size: diagnosticData?.taille || null,
            business_type: diagnosticData?.secteur || null,
            main_activities: diagnosticData?.processus_prioritaires || [],
            repetitive_tasks: diagnosticData?.tache_frustrante ? [diagnosticData.tache_frustrante] : [],
            current_tools: diagnosticData?.outils || [],
            pain_points: diagnosticData?.tache_frustrante ? [diagnosticData.tache_frustrante] : [],
            automation_goals: diagnosticData?.processus_prioritaires || [],
            timeline: diagnosticData?.delai || null,
            budget_range: diagnosticData?.budget_annuel || null,
            technical_level: 'standard',
            priority_processes: diagnosticData?.processus_prioritaires || [],
            success_metrics: ['ROI', 'Temps économisé']
          })
          .select()
          .single()

        if (insertError) {
          console.error("Erreur sauvegarde:", insertError)
        } else {
          console.log("Données sauvegardées:", calculationData.id)
          
          // Créer le lead
          await supabase.rpc('upsert_lead', {
            p_email: userEmail,
            p_name: userName || null,
            p_company: diagnosticData?.organisation || null,
            p_team_size: diagnosticData?.taille || null,
            p_business_type: diagnosticData?.secteur || null,
            p_roi_potential: roiPercentage || 0,
            p_annual_savings: totalGains,
            p_status: 'nouveau',
            p_budget_range: diagnosticData?.budget_annuel || null
          })
        }
      } catch (dbError) {
        console.error("Erreur base de données:", dbError)
        // Continue même en cas d'erreur DB
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        roiData,
        message: "Calcul ROI effectué avec succès"
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    )
  } catch (err) {
    console.error("Erreur fonction analyze-roi-data:", err)
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    })
  }
})