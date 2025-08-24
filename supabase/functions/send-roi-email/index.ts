import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ROIEmailRequest {
  calculationId: string;
  userEmail: string;
  userName?: string;
  roiData: {
    hours_per_week: number;
    hourly_rate: number;
    employees: number;
    investment: number;
    annual_savings: number;
    roi_percentage: number;
  };
  diagnosticData: any;
  recommendations: any[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { calculationId, userEmail, userName, roiData, diagnosticData, recommendations }: ROIEmailRequest = await req.json();

    console.log("Sending ROI email to:", userEmail);
    
    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      console.error("Invalid email format:", userEmail);
      throw new Error(`Format d'email invalide: ${userEmail}`);
    }

    // Vérification des domaines Gmail
    if (userEmail.includes('@gmail.') && !userEmail.includes('@gmail.com')) {
      console.warn("Suspicious Gmail domain detected:", userEmail);
    }

    // Icons pour les recommandations
    const getRecommendationIcon = (title: string) => {
      if (title.toLowerCase().includes('email') || title.toLowerCase().includes('communication')) return '📧';
      if (title.toLowerCase().includes('crm') || title.toLowerCase().includes('client')) return '👥';
      if (title.toLowerCase().includes('reporting') || title.toLowerCase().includes('tableau')) return '📊';
      if (title.toLowerCase().includes('comptab') || title.toLowerCase().includes('finance')) return '💰';
      if (title.toLowerCase().includes('stock') || title.toLowerCase().includes('inventaire')) return '📦';
      if (title.toLowerCase().includes('marketing') || title.toLowerCase().includes('lead')) return '🎯';
      return '⚡';
    };

    // Format recommendations for email
    const recommendationsHtml = recommendations.map((rec, index) => {
      const priorityColors = {
        1: '#0F7F7B',
        2: '#15A5A0', 
        3: '#2DD4BF'
      };
      const priorityLabels = {
        1: 'PRIORITÉ MAXIMALE',
        2: 'PRIORITÉ ÉLEVÉE',
        3: 'PRIORITÉ STANDARD'
      };
      
      return `
        <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; margin: 20px 0; box-shadow: 0 8px 25px rgba(15, 127, 123, 0.08); transition: all 0.3s ease;">
          <div style="background: linear-gradient(135deg, ${priorityColors[rec.priority as keyof typeof priorityColors]} 0%, ${priorityColors[rec.priority as keyof typeof priorityColors]}dd 100%); color: white; padding: 20px; border-radius: 16px 16px 0 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
              <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 25px; font-size: 12px; font-weight: 600; backdrop-filter: blur(10px);">
                ${priorityLabels[rec.priority as keyof typeof priorityLabels]}
              </div>
              <div style="font-size: 32px;">${getRecommendationIcon(rec.title)}</div>
            </div>
            <h3 style="margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3;">#${rec.priority} ${rec.title}</h3>
          </div>
          
          <div style="padding: 25px;">
            <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">${rec.description}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; background: #f8fbfb; padding: 20px; border-radius: 12px;">
              <div style="text-align: center;">
                <div style="font-size: 12px; color: #718096; font-weight: 600; margin-bottom: 5px;">💰 ROI ESTIMÉ</div>
                <div style="color: #0F7F7B; font-size: 14px; font-weight: 700;">${rec.estimatedROI}</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 12px; color: #718096; font-weight: 600; margin-bottom: 5px;">⏱️ DÉLAI</div>
                <div style="color: #0F7F7B; font-size: 14px; font-weight: 700;">${rec.timeline}</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 12px; color: #718096; font-weight: 600; margin-bottom: 5px;">🎯 IMPACT</div>
                <div style="color: #0F7F7B; font-size: 14px; font-weight: 700;">Élevé</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Envoyer l'email au client
    const clientEmailResponse = await resend.emails.send({
      from: "Maia Elange <contact@maiaelange.fr>",
      to: [userEmail],
      subject: `🚀 Libérez ${Math.round(roiData.annual_savings/10000)}h/mois et économisez ${roiData.annual_savings.toLocaleString('fr-FR')}€/an - Maia Elange`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vos Recommandations d'Automatisation Premium</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0E1A1A 0%, #1A2F2F 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          
          <!-- Container principal -->
          <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.15);">
            
            <!-- Header avec logo et branding premium -->
            <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); padding: 40px 30px; text-align: center; position: relative;">
              <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                <div style="color: #ffffff; font-size: 32px; font-weight: 800;">M</div>
              </div>
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">MAIA ELANGE</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0; font-weight: 500;">Automatisation Intelligente Premium</p>
            </div>

            <!-- Bloc Hero avec gains annuels -->
            <div style="padding: 40px 30px 30px; text-align: center; background: linear-gradient(135deg, #f8fbfb 0%, #ffffff 100%);">
              <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); color: white; padding: 25px; border-radius: 16px; margin-bottom: 30px; box-shadow: 0 15px 35px rgba(15, 127, 123, 0.2);">
                <div style="font-size: 16px; opacity: 0.9; margin-bottom: 8px;">🎯 Total Gains Annuels Identifiés</div>
                <div style="font-size: 42px; font-weight: 800; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">${roiData.annual_savings.toLocaleString('fr-FR')}€</div>
                <div style="font-size: 14px; opacity: 0.85; margin-top: 8px;">Soit ${Math.round(roiData.annual_savings/12).toLocaleString('fr-FR')}€ économisés chaque mois</div>
              </div>
              
              <p style="color: #2d3748; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">Bonjour ${userName || 'Cher Dirigeant'},</p>
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0;">Votre diagnostic révèle des opportunités concrètes pour <strong>libérer du temps précieux</strong> et <strong>booster votre rentabilité</strong>.</p>
            </div>

            <!-- Recommandations prioritaires -->
            <div style="padding: 0 30px 40px;">
              <h2 style="color: #2d3748; font-size: 24px; font-weight: 700; margin: 0 0 25px 0; text-align: center;">⚡ Vos 3 Chantiers Prioritaires</h2>
              ${recommendationsHtml}
            </div>

            <!-- Call to Action Premium -->
            <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); padding: 40px 30px; text-align: center;">
              <h3 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 15px 0;">🚀 Transformez votre entreprise maintenant</h3>
              <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0 0 25px 0; line-height: 1.5;">Libérez <strong>${Math.round((roiData.annual_savings/52)/40)}h par semaine</strong> de tâches répétitives.<br>Réinvestissez ce temps dans la croissance de votre entreprise.</p>
              
              <a href="https://maiaelange.fr/contact" 
                 style="display: inline-block; background: #ffffff; color: #0F7F7B; padding: 18px 35px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 18px; margin: 15px 0; box-shadow: 0 8px 25px rgba(0,0,0,0.15); transition: all 0.3s ease; border: 2px solid transparent;">
                📅 Audit Gratuit de 30min
              </a>
              
              <div style="margin-top: 20px; font-size: 14px; color: rgba(255,255,255,0.8);">
                <div style="margin: 5px 0;">✅ Consultation strategy personnalisée</div>
                <div style="margin: 5px 0;">✅ Plan d'action concret et prioritisé</div>
                <div style="margin: 5px 0;">✅ Estimation précise des gains</div>
              </div>
            </div>

            <!-- Footer premium -->
            <div style="background: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">Maia Elange</p>
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">Automatisation Intelligente & Transformation Digitale Premium</p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    // Envoyer une copie pour l'équipe Maia Elange
    const teamEmailResponse = await resend.emails.send({
      from: "Maia Elange <contact@maiaelange.fr>",
      to: ["contact@maiaelange.fr"],
      subject: `🚨 LEAD CHAUD ROI: ${roiData.annual_savings.toLocaleString('fr-FR')}€/an - ${userName || userEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #f7fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          
          <div style="max-width: 800px; margin: 0 auto; background: #ffffff; padding: 20px;">
            
            <!-- Alert Banner -->
            <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; text-align: center; box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);">
              <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800;">🔥 LEAD CHAUD - ACTION REQUISE</h2>
              <p style="margin: 0; font-size: 16px; opacity: 0.9;">Diagnostic ROI complet terminé - Prospect qualifié</p>
            </div>

            <!-- Récap Express -->
            <div style="background: linear-gradient(135deg, #0F7F7B 0%, #15A5A0 100%); color: white; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; text-align: center;">📊 RÉCAP EXPRESS</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 15px; text-align: center;">
                <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; backdrop-filter: blur(10px);">
                  <div style="font-size: 18px; font-weight: 800; margin-bottom: 5px;">${roiData.annual_savings.toLocaleString('fr-FR')}€</div>
                  <div style="font-size: 11px; opacity: 0.8;">Gains/an</div>
                </div>
                <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; backdrop-filter: blur(10px);">
                  <div style="font-size: 18px; font-weight: 800; margin-bottom: 5px;">${roiData.roi_percentage}%</div>
                  <div style="font-size: 11px; opacity: 0.8;">ROI</div>
                </div>
                <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; backdrop-filter: blur(10px);">
                  <div style="font-size: 18px; font-weight: 800; margin-bottom: 5px;">${roiData.investment.toLocaleString('fr-FR')}€</div>
                  <div style="font-size: 11px; opacity: 0.8;">Budget</div>
                </div>
                <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; backdrop-filter: blur(10px);">
                  <div style="font-size: 18px; font-weight: 800; margin-bottom: 5px;">${diagnosticData.automation_timeline || '3-6 mois'}</div>
                  <div style="font-size: 11px; opacity: 0.8;">Délai</div>
                </div>
              </div>
            </div>
            
            <!-- Informations Client -->
            <div style="background: #f8fbfb; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #0F7F7B; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">👤 INFORMATIONS CLIENT</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                <div>
                  <strong style="color: #4a5568;">Nom:</strong><br>
                  <span style="color: #2d3748;">${userName || 'Non renseigné'}</span>
                </div>
                <div>
                  <strong style="color: #4a5568;">Email:</strong><br>
                  <span style="color: #2d3748;">${userEmail}</span>
                </div>
                <div>
                  <strong style="color: #4a5568;">ID Calcul:</strong><br>
                  <span style="color: #2d3748; font-family: monospace; font-size: 12px;">${calculationId}</span>
                </div>
              </div>
            </div>

            <!-- Données Diagnostics -->
            <div style="background: #f8fbfb; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #0F7F7B; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">🔍 PROFIL ENTREPRISE</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Taille équipe:</strong> ${diagnosticData.team_size || 'Non renseigné'}</div>
                <div><strong>Type:</strong> ${diagnosticData.business_type || 'Non renseigné'}</div>
                <div><strong>Activités:</strong> ${diagnosticData.main_activities?.join(', ') || 'Non renseigné'}</div>
                <div><strong>Tâches répétitives:</strong> ${diagnosticData.repetitive_tasks?.join(', ') || 'Non renseigné'}</div>
                <div><strong>Budget:</strong> ${diagnosticData.budget_range || 'Non renseigné'}</div>
                <div><strong>Niveau technique:</strong> ${diagnosticData.technical_level || 'Non renseigné'}</div>
              </div>
            </div>

            <!-- Recommandations Simplifiées -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #0F7F7B; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">📋 RECOMMANDATIONS ENVOYÉES</h3>
              ${recommendations.map((rec, index) => `
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 10px 0;">
                  <div style="font-weight: 700; color: #2d3748; margin-bottom: 8px;">#${rec.priority} ${rec.title}</div>
                  <div style="font-size: 14px; color: #4a5568;">${rec.estimatedROI} - ${rec.timeline}</div>
                </div>
              `).join('')}
            </div>

            <!-- Action Plan -->
            <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 25px; border-radius: 12px; text-align: center;">
              <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">⚡ PLAN D'ACTION IMMÉDIAT</h3>
              <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 15px 0; backdrop-filter: blur(10px);">
                <p style="margin: 5px 0; font-weight: 600;">1️⃣ Contacter ce prospect dans les 2H maximum</p>
                <p style="margin: 5px 0; font-weight: 600;">2️⃣ Proposer un audit approfondi gratuit</p>
                <p style="margin: 5px 0; font-weight: 600;">3️⃣ Présenter une offre sur-mesure</p>
              </div>
            </div>
            
            <p style="color: #718096; font-size: 12px; margin: 20px 0 0 0; text-align: center;">
              Email automatique généré par le système d'analyse ROI Maia Elange
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Client email sent successfully:", clientEmailResponse);
    
    // Vérifier s'il y a eu une erreur dans l'envoi client
    if (clientEmailResponse.error) {
      console.error("Error sending client email:", clientEmailResponse.error);
      throw new Error(`Erreur envoi email client: ${clientEmailResponse.error.message}`);
    }
    
    console.log("Team email sent successfully:", teamEmailResponse);
    
    // Vérifier s'il y a eu une erreur dans l'envoi équipe
    if (teamEmailResponse.error) {
      console.error("Error sending team email:", teamEmailResponse.error);
      // Ne pas faire échouer si seulement l'email équipe a un problème
    }

    return new Response(JSON.stringify({ 
      success: true, 
      clientEmailId: clientEmailResponse.data?.id,
      teamEmailId: teamEmailResponse.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-roi-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);