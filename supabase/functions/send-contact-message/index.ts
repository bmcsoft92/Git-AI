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
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": "false",
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

    // Send notification email to Maia elange
    await resend.emails.send({
        from: "Maia elange <contact@maiaelange.fr>",
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
      from: "Maia elange <contact@maiaelange.fr>",
      to: [email],
      subject: "Nous avons bien reçu votre message – Maia elange",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; line-height: 1.6; color: #333;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2c3e50; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">
              Message bien reçu
            </h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8fafb 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; margin: 32px 0;">
            <p style="font-size: 18px; margin: 0 0 24px 0; color: #1a202c;">
              Bonjour <strong>${name.split(' ')[0] || name}</strong>,
            </p>
            
            <p style="margin: 0 0 24px 0; color: #4a5568; font-size: 16px;">
              Merci beaucoup pour votre message 🙏. Nous l'avons bien reçu et notre équipe reviendra vers vous sous <strong>48h ouvrées</strong>.
            </p>

            <div style="background: white; border-radius: 8px; padding: 24px; border-left: 4px solid #3b82f6; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin: 24px 0;">
              <h3 style="color: #1a202c; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Votre message :</h3>
              <p style="color: #64748b; margin: 0; font-style: italic; line-height: 1.5;">
                "${message}"
              </p>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0 0 16px 0; color: #0369a1; font-size: 16px; font-weight: 500;">
                En attendant, n'hésitez pas à découvrir nos solutions :
              </p>
              <div style="text-align: center;">
                <a href="https://maiaelange.fr/solutions" style="display: inline-block; background: #3b82f6; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; transition: all 0.2s;">
                  Découvrir nos Solutions
                </a>
              </div>
            </div>
          </div>

          <div style="text-align: center; margin: 32px 0; padding: 24px 0; border-top: 1px solid #e2e8f0;">
            <p style="color: #1a202c; margin: 0 0 8px 0; font-size: 16px;">
              À très bientôt,
            </p>
            <p style="color: #3b82f6; margin: 0; font-size: 16px; font-weight: 600;">
              L'équipe Maia elange – Automatisation Intelligente & Transformation Digitale Premium
            </p>
          </div>

          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0; font-style: italic;">
              Vos données sont utilisées uniquement pour répondre à votre message.<br />
              Elles ne seront jamais partagées.
            </p>
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