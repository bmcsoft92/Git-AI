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

interface BookingRequest {
  calculationId?: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  appointmentDate: string;
  appointmentType: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { calculationId, userEmail, userName, userPhone, appointmentDate, appointmentType, notes }: BookingRequest = await req.json();

    console.log("Booking appointment for:", userName, userEmail);

    // Save appointment to database
    const { data: appointmentData, error: insertError } = await supabase
      .from('appointments')
      .insert({
        roi_calculation_id: calculationId,
        user_email: userEmail,
        user_name: userName,
        user_phone: userPhone,
        appointment_date: appointmentDate,
        appointment_type: appointmentType,
        notes: notes,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to save appointment");
    }

    // Format date for email
    const formattedDate = new Date(appointmentDate).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Send confirmation emails
    await Promise.all([
      // Email to Maia Elange
      resend.emails.send({
        from: "Maia elange <contact@maiaelange.fr>",
        to: ["contact@maiaelange.fr"],
        subject: "Nouvelle demande de rendez-vous – Action requise",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Nouvelle Demande de Rendez-vous
            </h1>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Détails du Client</h3>
              <p><strong>Nom:</strong> ${userName}</p>
              <p><strong>Email:</strong> ${userEmail}</p>
              <p><strong>Téléphone:</strong> ${userPhone || 'Non renseigné'}</p>
            </div>

            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Détails du Rendez-vous</h3>
              <p><strong>Type:</strong> ${appointmentType}</p>
              <p><strong>Date souhaitée:</strong> ${formattedDate}</p>
              <p><strong>Notes:</strong> ${notes || 'Aucune note'}</p>
              ${calculationId ? `<p><strong>ID Calcul ROI:</strong> ${calculationId}</p>` : ''}
            </div>

            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="margin: 0 0 16px 0; color: #1e40af; font-size: 16px; font-weight: 600;">
                Merci de contacter ce prospect sous 24h pour confirmer ou ajuster le créneau demandé.
              </p>
            </div>

            <div style="background: #007bff; color: white; padding: 20px; border-radius: 8px; text-align: center;">
              <p style="margin: 0;"><strong>Action requise:</strong> Contactez ce prospect pour confirmer le rendez-vous</p>
            </div>
          </div>
        `,
      }),

      // Confirmation email to client
      resend.emails.send({
        from: "Maia elange <contact@maiaelange.fr>",
        to: [userEmail],
        subject: "Votre demande de rendez-vous est bien enregistrée – Maia elange",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; line-height: 1.6; color: #333;">
            
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #2c3e50; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">
                Votre entretien est confirmé
              </h1>
            </div>
            
            <div style="background: linear-gradient(135deg, #f8fafb 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; margin: 32px 0;">
              <p style="font-size: 18px; margin: 0 0 24px 0; color: #1a202c;">
                Bonjour <strong>${userName.split(' ')[0] || userName}</strong>,
              </p>
              
              <p style="margin: 0 0 24px 0; color: #4a5568; font-size: 16px;">
                Votre entretien personnalisé est confirmé. Voici les détails de votre rendez-vous :
              </p>

              <p style="margin: 0 0 24px 0; color: #1a202c; font-size: 16px; font-weight: 500; background: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                Notre équipe vous recontactera sous 24h pour confirmer définitivement votre créneau.
              </p>

              <div style="background: white; border-radius: 8px; padding: 24px; border-left: 4px solid #3b82f6; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #6b7280; font-weight: 500; min-width: 80px;">📅 Date :</span>
                    <span style="color: #1a202c; font-weight: 600;">${new Date(appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #6b7280; font-weight: 500; min-width: 80px;">🕐 Heure :</span>
                    <span style="color: #1a202c; font-weight: 600;">${new Date(appointmentDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #6b7280; font-weight: 500; min-width: 80px;">⏱️ Durée :</span>
                    <span style="color: #1a202c; font-weight: 600;">à définir ensemble</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #6b7280; font-weight: 500; min-width: 80px;">💼 Type :</span>
                    <span style="color: #1a202c; font-weight: 600;">Entretien Personnalisé</span>
                  </div>
                </div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #0369a1; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">📋 Prochaines étapes</h3>
              <ul style="margin: 0; padding-left: 20px; color: #475569;">
                <li style="margin-bottom: 8px;">Confirmation de votre créneau sous 24h</li>
                <li style="margin-bottom: 8px;">Envoi du lien de visioconférence</li>
                <li style="margin-bottom: 0;">Préparation personnalisée de votre entretien</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 32px 0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Pour toute question, contactez-nous à 
                <a href="mailto:contact@maiaelange.fr" style="color: #3b82f6; text-decoration: none;">contact@maiaelange.fr</a>
              </p>
            </div>

            <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0; margin-top: 40px;">
              <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0;">
                <strong>Maia elange</strong> – Automatisation & Transformation Digitale
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0; font-style: italic;">
                Toutes les prestations sont établies sur devis personnalisé
              </p>
            </div>
            
          </div>
        `,
      })
    ]);

    console.log("Appointment booked and emails sent successfully");

    // Mettre à jour le lead avec le statut RDV en attente de confirmation
    console.log("Updating lead status to rdv_en_attente_confirmation...");
    
    const { data: leadUpdateData, error: leadUpdateError } = await supabase
      .rpc('upsert_lead', {
        p_email: userEmail,
        p_name: userName,
        p_phone: userPhone || null,
        p_status: 'rdv_en_attente_confirmation'
      });

    if (leadUpdateError) {
      console.error("Error updating lead status:", leadUpdateError);
    } else {
      console.log("Lead updated with ID:", leadUpdateData);
      
      // Lier le rendez-vous au lead si on a un lead_id
      if (leadUpdateData && calculationId) {
        await supabase
          .from('appointments')
          .update({ lead_id: leadUpdateData })
          .eq('id', appointmentData.id);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      appointmentId: appointmentData.id,
      message: "Rendez-vous enregistré avec succès" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in book-appointment function:", error);
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