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
      subject: "Test Resend - Maia Elange",
      html: `
        <h1>🚀 Test réussi !</h1>
        <p>Resend fonctionne parfaitement.</p>
        <p>Email envoyé le ${new Date().toLocaleString('fr-FR')}</p>
      `,
    });

    console.log("✅ Email sent:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: "Email envoyé avec succès"
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