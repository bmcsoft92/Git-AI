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
        from: "Maia Elange <contact@maiaelange.fr>",
        to: ["contact@maiaelange.fr"],
        subject: `Nouvelle demande de rendez-vous - ${userName}`,
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

      // Confirmation email to client
      resend.emails.send({
        from: "Maia Elange <contact@maiaelange.fr>",
        to: [userEmail],
        subject: "Confirmation de votre demande de rendez-vous - Maia Elange",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Demande de Rendez-vous Reçue
            </h1>
            
            <p>Bonjour ${userName},</p>
            
            <p>Nous avons bien reçu votre demande de rendez-vous pour le <strong>${formattedDate}</strong>.</p>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Récapitulatif</h3>
              <p><strong>Type de consultation:</strong> ${appointmentType}</p>
              <p><strong>Date demandée:</strong> ${formattedDate}</p>
            </div>

            <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #155724; margin-top: 0;">✅ Prochaines étapes</h3>
              <p><strong>Notre équipe vous recontactera sous 24h</strong> pour :</p>
              <ul>
                <li>Confirmer votre créneau de rendez-vous</li>
                <li>Vous envoyer le lien de connexion</li>
                <li>Préparer votre consultation personnalisée</li>
              </ul>
              <p>Merci pour votre confiance !</p>
            </div>

            <p>Si vous avez des questions urgentes, n'hésitez pas à nous contacter directement à <a href="mailto:contact@maiaelange.fr">contact@maiaelange.fr</a></p>
            
            <p>À bientôt,<br>
            <strong>L'équipe Maia Elange</strong></p>
            
            <div style="color: #666; font-size: 12px; margin-top: 30px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
              Maia Elange - Automatisation & Transformation Digitale<br>
              contact@maiaelange.fr
            </div>
          </div>
        `,
      })
    ]);

    console.log("Appointment booked and emails sent successfully");

    // Mettre à jour le lead avec le statut RDV demandé
    console.log("Updating lead status to rdv_demande...");
    
    const { data: leadUpdateData, error: leadUpdateError } = await supabase
      .rpc('upsert_lead', {
        p_email: userEmail,
        p_name: userName,
        p_phone: userPhone || null,
        p_status: 'rdv_demande'
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