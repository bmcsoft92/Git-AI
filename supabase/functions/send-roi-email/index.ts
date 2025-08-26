import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { calculationId, userEmail, userName, roiData, diagnosticData, recommendations } = await req.json();

    console.log("📧 Sending ROI email to:", userEmail);

    // Email au client
    const clientEmailResponse = await resend.emails.send({
      from: "Maia elange <onboarding@resend.dev>",
      to: [userEmail],
      subject: `🚀 Vos recommandations d'automatisation - ${roiData.annual_savings.toLocaleString('fr-FR')}€ d'économies/an`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0;">MAIA ELANGE</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 8px 0 0 0;">Automatisation Intelligente Premium</p>
          </div>

          <div style="padding: 40px 30px; text-align: center;">
            <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); color: white; padding: 25px; border-radius: 16px; margin-bottom: 30px;">
              <div style="font-size: 16px; margin-bottom: 8px;">🎯 Économies Annuelles Identifiées</div>
              <div style="font-size: 42px; font-weight: 800; margin: 0;">${roiData.annual_savings.toLocaleString('fr-FR')}€</div>
            </div>
            
            <p style="font-size: 18px; margin: 0 0 10px 0;">Bonjour ${userName || 'Cher Dirigeant'},</p>
            <p style="color: #4a5568; font-size: 16px;">Votre diagnostic révèle des opportunités concrètes d'automatisation.</p>
          </div>

          <div style="padding: 0 30px 40px;">
            <h2 style="text-align: center; margin-bottom: 25px;">⚡ Vos 3 Chantiers Prioritaires</h2>
            ${recommendations.map((rec, index) => `
              <div style="border: 2px solid #e2e8f0; border-radius: 16px; margin: 20px 0;">
                <div style="background: #0F7F7B; color: white; padding: 20px; border-radius: 16px 16px 0 0;">
                  <h3 style="margin: 0; font-size: 20px;">#${rec.priority} ${rec.title}</h3>
                </div>
                <div style="padding: 25px;">
                  <p style="color: #4a5568; margin: 0 0 20px 0;">${rec.description}</p>
                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; background: #f8fbfb; padding: 20px; border-radius: 12px; text-align: center;">
                    <div>
                      <div style="font-size: 12px; color: #718096; margin-bottom: 5px;">💰 ROI</div>
                      <div style="color: #0F7F7B; font-weight: 700;">${rec.estimatedROI}</div>
                    </div>
                    <div>
                      <div style="font-size: 12px; color: #718096; margin-bottom: 5px;">⏱️ DÉLAI</div>
                      <div style="color: #0F7F7B; font-weight: 700;">${rec.timeline}</div>
                    </div>
                    <div>
                      <div style="font-size: 12px; color: #718096; margin-bottom: 5px;">🎯 IMPACT</div>
                      <div style="color: #0F7F7B; font-weight: 700;">Élevé</div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); padding: 40px 30px; text-align: center;">
            <h3 style="color: #ffffff; font-size: 28px; margin: 0 0 15px 0;">🚀 Passez à l'action</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 25px 0;">Toutes les prestations sont réalisées sur devis personnalisé.</p>
            <a href="https://maiaelange.fr/contact" style="display: inline-block; background: #ffffff; color: #0F7F7B; padding: 18px 35px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 18px;">
              Demander un devis
            </a>
          </div>

          <div style="background: #f7fafc; padding: 25px 30px; text-align: center;">
            <p style="color: #718096; font-size: 14px; margin: 0;">Maia Elange - Automatisation Intelligente</p>
          </div>
        </div>
      `,
    });

    // Email à l'équipe
    await resend.emails.send({
      from: "Maia elange <onboarding@resend.dev>",
      to: ["contact@maiaelange.fr"],
      subject: `🚨 LEAD ROI: ${roiData.annual_savings.toLocaleString('fr-FR')}€/an - ${userName || userEmail}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc2626; color: white; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
            <h2 style="margin: 0; font-size: 24px;">🔥 NOUVEAU LEAD QUALIFIÉ</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>👤 Informations Client</h3>
            <p><strong>Nom:</strong> ${userName || 'Non renseigné'}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Économies annuelles:</strong> ${roiData.annual_savings.toLocaleString('fr-FR')}€</p>
            <p><strong>ROI:</strong> ${roiData.roi_percentage}%</p>
            <p><strong>Budget:</strong> ${diagnosticData.budget_annuel}</p>
          </div>

          <div style="background: #007bff; color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="margin: 0;"><strong>Action:</strong> Contacter ce prospect sous 24h</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      clientEmailId: clientEmailResponse.data?.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("❌ Email error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});