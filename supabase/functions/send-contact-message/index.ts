import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string; // 'contact_page' ou 'contact_modal'
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, message, source }: ContactRequest = await req.json();

    console.log("Processing contact message from:", name, email);

    // Save contact message to database
    const { data: contactData, error: insertError } = await supabase
      .from('contact_messages')
      .insert({
        name: name,
        email: email,
        phone: phone || null,
        company: company || null,
        message: message,
        source: source || 'contact_page',
        status: 'nouveau'
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to save contact message");
    }

    // Send notification email to Maia Elange
    await resend.emails.send({
      from: "Maia Elange <contact@maiaelange.fr>",
      to: ["contact@maiaelange.fr"],
      subject: `Nouveau message de contact - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau Message de Contact
          </h1>
          
          <div style="background: #dc3545; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <h2 style="margin: 0;">🚨 NOUVEAU PROSPECT - ACTION IMMÉDIATE REQUISE</h2>
            <p style="margin: 10px 0 0 0;">Un prospect vous a contacté via ${source === 'contact_modal' ? 'le formulaire modal' : 'la page contact'}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Informations du Contact</h3>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</p>
            <p><strong>Entreprise:</strong> ${company || 'Non renseignée'}</p>
          </div>

          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Message</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="background: #28a745; color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="margin: 0 0 10px 0;">⚡ PLAN D'ACTION</h3>
            <p style="margin: 0;"><strong>1.</strong> Répondre sous 2h maximum</p>
            <p style="margin: 5px 0 0 0;"><strong>2.</strong> Proposer un échange téléphonique</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
            ID Message: ${contactData.id} | ${new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      `,
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "Maia Elange <contact@maiaelange.fr>",
      to: [email],
      subject: "Confirmation de réception de votre message - Maia Elange",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Message Bien Reçu !
          </h1>
          
          <p>Bonjour ${name},</p>
          
          <p>Nous avons bien reçu votre message et vous remercions pour votre intérêt pour nos solutions d'automatisation.</p>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Votre demande</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              "${message}"
            </div>
          </div>

          <div style="background: #28a745; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: white; margin-top: 0;">✅ Prochaines étapes</h3>
            <p><strong>Notre équipe vous recontactera sous 24h</strong> pour :</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Analyser vos besoins spécifiques</li>
              <li>Vous proposer des solutions adaptées</li>
              <li>Planifier un échange personnalisé</li>
            </ul>
            <p style="margin: 15px 0 0 0;">Merci pour votre confiance !</p>
          </div>

          <p>En attendant, n'hésitez pas à :</p>
          <ul>
            <li>Tester notre <a href="https://votre-domaine.com/calculateur-roi" style="color: #007bff;">calculateur ROI</a></li>
            <li>Découvrir nos <a href="https://votre-domaine.com/cas-usage" style="color: #007bff;">cas d'usage</a> par secteur</li>
          </ul>

          <p>Si vous avez des questions urgentes, contactez-nous directement à <a href="mailto:contact@maiaelange.fr">contact@maiaelange.fr</a></p>
          
          <p>À bientôt,<br>
          <strong>L'équipe Maia Elange</strong></p>
          
          <div style="color: #666; font-size: 12px; margin-top: 30px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
            Maia Elange - L'IA + l'Humain au service des organisations<br>
            contact@maiaelange.fr
          </div>
        </div>
      `,
    });

    // Update or create lead in CRM
    console.log("Updating lead status in CRM...");
    
    const { data: leadData, error: leadError } = await supabase
      .rpc('upsert_lead', {
        p_email: email,
        p_name: name,
        p_phone: phone || null,
        p_status: 'contact_recu'
      });

    if (leadError) {
      console.error("Error updating lead status:", leadError);
    } else {
      console.log("Lead updated with ID:", leadData);
      
      // Link contact message to lead
      if (leadData) {
        await supabase
          .from('contact_messages')
          .update({ lead_id: leadData })
          .eq('id', contactData.id);
      }
    }

    console.log("Contact message processed and emails sent successfully");

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: contactData.id,
      message: "Message envoyé avec succès" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-contact-message function:", error);
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