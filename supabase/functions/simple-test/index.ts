import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("🧪 Simple test function called");
    
    const resendKey = Deno.env.get("RESEND_API_KEY");
    console.log("🔑 RESEND_API_KEY présente:", !!resendKey);
    
    if (resendKey) {
      console.log("🔑 RESEND_API_KEY commence par:", resendKey.substring(0, 10) + "...");
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: "Fonction simple OK",
      hasResendKey: !!resendKey,
      timestamp: new Date().toISOString()
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