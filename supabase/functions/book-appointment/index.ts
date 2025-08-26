import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
      .maybeSingle();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to save appointment");
    }

    if (!appointmentData) {
      console.error("No appointment data returned after insert");
      throw new Error("Failed to get appointment data");
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

    // Get RESEND_API_KEY
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY manquante");
    }

    // Send emails using Resend API directly
    await Promise.all([
      // Email to Maia Elange
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Maïa Elange <contact@maiaelange.fr>",
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

              <div style="background: #007bff; color: white; padding: 20px; border-radius: 8px; text-align: center;">
                <p style="margin: 0;"><strong>Action requise:</strong> Contactez ce prospect pour confirmer le rendez-vous</p>
              </div>
            </div>
          `,
        }),
      }),

      // Confirmation email to client
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Maïa Elange <contact@maiaelange.fr>",
          to: [userEmail],
          subject: "Votre demande de rendez-vous est bien enregistrée – Maia elange",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #2c3e50; font-size: 28px; text-align: center;">Votre entretien est confirmé</h1>
              
              <div style="background: #f8fafb; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; margin: 32px 0;">
                <p style="font-size: 18px; margin: 0 0 24px 0;">
                  Bonjour <strong>${userName.split(' ')[0] || userName}</strong>,
                </p>
                
                <p style="margin: 0 0 24px 0; color: #4a5568;">
                  Votre entretien personnalisé est confirmé. Notre équipe vous recontactera sous 24h pour confirmer définitivement votre créneau.
                </p>

                <div style="background: white; border-radius: 8px; padding: 24px; border-left: 4px solid #3b82f6;">
                  <p><strong>📅 Date :</strong> ${new Date(appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p><strong>🕐 Heure :</strong> ${new Date(appointmentDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p><strong>💼 Type :</strong> Entretien Personnalisé</p>
                </div>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <p style="color: #64748b;">
                  Pour toute question : <a href="mailto:contact@maiaelange.fr">contact@maiaelange.fr</a>
                </p>
              </div>
            </div>
          `,
        }),
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
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in book-appointment function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);