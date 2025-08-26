import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('🚀 Fonction démarrée')
    
    const { heures, taux, employes, budget } = await req.json()
    console.log('Données reçues:', { heures, taux, employes, budget })

    if (!heures || !taux || !employes) {
      return new Response(JSON.stringify({ error: "Données insuffisantes" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    // Calculs ROI simples
    const gainsDirects = heures * taux * employes * 52
    const gainsCroissance = gainsDirects * 0.5
    const totalGains = gainsDirects + gainsCroissance
    const roiPercentage = budget ? ((totalGains - budget) / budget) * 100 : null

    const result = {
      success: true,
      roiData: {
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
    }

    console.log('✅ Calcul terminé:', result)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    })

  } catch (err) {
    console.error("❌ Erreur:", err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    })
  }
})