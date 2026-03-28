import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const url = body?.url;

    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: "Missing video URL" }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    try { new URL(url); } catch {
      return new Response(JSON.stringify({ error: "Invalid video URL" }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ downloadUrl: url }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Download error:", error);
    return new Response(JSON.stringify({ error: "Failed to process download" }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
