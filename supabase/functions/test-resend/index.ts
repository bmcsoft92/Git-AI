import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("🧪 Testing Resend API...");
    
    const { email } = await req.json();
    
    if (!email) {
      throw new Error("Email requis");
    }
    
    const emailResponse = await resend.emails.send({
      from: "Maia elange <onboarding@resend.dev>",
      to: [email],
      subject: "✅ Test Resend réussi - Maia Elange",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0F7F7B;">🚀 Test Resend réussi !</h1>
          <p>Parfait ! Resend fonctionne maintenant correctement.</p>
          <p><strong>Email envoyé le:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          <p>Vous pouvez maintenant utiliser le système d'envoi d'emails.</p>
        </div>
      `,
    });

    console.log("✅ Email sent:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: "Email de test envoyé avec succès !"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('❌ Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});