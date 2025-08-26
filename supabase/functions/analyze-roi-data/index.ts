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

          // Envoyer l'email de recommandations automatiquement
          console.log("📧 Envoi de l'email de recommandations...")
          await supabase.functions.invoke('send-email', {
            body: {
              email: userEmail,
              subject: `🚀 Vos recommandations d'automatisation - ${totalGains.toLocaleString('fr-FR')}€ d'économies/an`,
              message: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 28px; margin: 0;">MAIA ELANGE</h1>
                    <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 8px 0 0 0;">Automatisation Intelligente Premium</p>
                  </div>

                  <div style="padding: 40px 30px; text-align: center;">
                    <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); color: white; padding: 25px; border-radius: 16px; margin-bottom: 30px;">
                      <div style="font-size: 16px; margin-bottom: 8px;">🎯 Économies Annuelles Identifiées</div>
                      <div style="font-size: 42px; font-weight: 800; margin: 0;">${totalGains.toLocaleString('fr-FR')}€</div>
                      <div style="font-size: 14px; margin-top: 8px;">Soit ${Math.round(totalGains/12).toLocaleString('fr-FR')}€ par mois</div>
                    </div>
                    
                    <p style="font-size: 18px; margin: 0 0 10px 0;">Bonjour ${userName || 'Cher Dirigeant'},</p>
                    <p style="color: #4a5568; font-size: 16px;">Votre diagnostic révèle des opportunités concrètes d'automatisation qui peuvent transformer votre entreprise.</p>
                  </div>

                  <div style="padding: 0 30px 40px;">
                    <h2 style="text-align: center; margin-bottom: 25px; color: #2d3748;">⚡ Vos Chantiers Prioritaires</h2>
                    
                    <div style="border: 2px solid #e2e8f0; border-radius: 16px; margin: 20px 0;">
                      <div style="background: #0F7F7B; color: white; padding: 20px; border-radius: 16px 16px 0 0;">
                        <h3 style="margin: 0; font-size: 20px;">#1 CRM automatisé et personnalisé</h3>
                      </div>
                      <div style="padding: 25px;">
                        <p style="color: #4a5568; margin: 0 0 20px 0;">CRM avec automatisation des relances, segmentation intelligente et campagnes personnalisées basées sur l'IA.</p>
                        <div style="background: #f8fbfb; padding: 20px; border-radius: 12px; text-align: center;">
                          <strong style="color: #0F7F7B;">ROI estimé : 200% sur 6 mois</strong>
                        </div>
                      </div>
                    </div>

                    <div style="border: 2px solid #e2e8f0; border-radius: 16px; margin: 20px 0;">
                      <div style="background: #15A5A0; color: white; padding: 20px; border-radius: 16px 16px 0 0;">
                        <h3 style="margin: 0; font-size: 20px;">#2 Automatisation des processus administratifs</h3>
                      </div>
                      <div style="padding: 25px;">
                        <p style="color: #4a5568; margin: 0 0 20px 0;">Digitalisation complète des workflows administratifs avec validation électronique et traçabilité.</p>
                        <div style="background: #f8fbfb; padding: 20px; border-radius: 12px; text-align: center;">
                          <strong style="color: #0F7F7B;">ROI estimé : 160% sur 4 mois</strong>
                        </div>
                      </div>
                    </div>

                    <div style="border: 2px solid #e2e8f0; border-radius: 16px; margin: 20px 0;">
                      <div style="background: #2DD4BF; color: white; padding: 20px; border-radius: 16px 16px 0 0;">
                        <h3 style="margin: 0; font-size: 20px;">#3 Dashboard de pilotage intelligent</h3>
                      </div>
                      <div style="padding: 25px;">
                        <p style="color: #4a5568; margin: 0 0 20px 0;">Tableau de bord en temps réel avec analytics prédictives et alertes automatiques sur les KPIs critiques.</p>
                        <div style="background: #f8fbfb; padding: 20px; border-radius: 12px; text-align: center;">
                          <strong style="color: #0F7F7B;">ROI estimé : 140% sur 3 mois</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); padding: 40px 30px; text-align: center;">
                    <h3 style="color: #ffffff; font-size: 28px; margin: 0 0 15px 0;">🚀 Passez à l'action maintenant</h3>
                    <p style="color: rgba(255,255,255,0.9); margin: 0 0 25px 0;">Toutes les prestations sont réalisées sur devis personnalisé selon vos besoins spécifiques.</p>
                    <a href="https://maiaelange.fr/contact" style="display: inline-block; background: #ffffff; color: #0F7F7B; padding: 18px 35px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 18px;">
                      Demander un devis personnalisé
                    </a>
                  </div>

                  <div style="background: #f7fafc; padding: 25px 30px; text-align: center;">
                    <p style="color: #718096; font-size: 14px; margin: 0;">Maia Elange - Automatisation Intelligente & Transformation Digitale Premium</p>
                  </div>
                </div>
              `
            }
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