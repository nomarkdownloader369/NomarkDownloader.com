import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function detectPlatform(url: string): "tiktok" | "instagram" | "unknown" {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("tiktok.com") || lowerUrl.includes("vm.tiktok")) return "tiktok";
  if (lowerUrl.includes("instagram.com") || lowerUrl.includes("instagr.am")) return "instagram";
  return "unknown";
}

function extractNoWatermarkUrl(data: any): string | null {
  if (data?.download_url) return data.download_url;
  if (data?.url) return data.url;
  if (data?.video_url) return data.video_url;
  // Try nested structures
  if (data?.medias && Array.isArray(data.medias)) {
    for (const media of data.medias) {
      if (media?.url) return media.url;
    }
  }
  if (data?.links && Array.isArray(data.links)) {
    for (const link of data.links) {
      if (link?.url) return link.url;
    }
  }
  if (data?.result?.url) return data.result.url;
  if (data?.result?.download_url) return data.result.download_url;
  return null;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatViews(views: number | string): string {
  const num = typeof views === 'string' ? parseInt(views) : views;
  if (isNaN(num)) return 'N/A';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ success: false, error: "Invalid request body." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const url = body?.url;

    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ success: false, error: "Please provide a valid video URL" }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    try { new URL(url); } catch {
      return new Response(JSON.stringify({ success: false, error: "Invalid URL format." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const platform = detectPlatform(url);
    if (platform === "unknown") {
      return new Response(JSON.stringify({ success: false, error: "Unsupported platform. Currently we support TikTok and Instagram only." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!rapidApiKey) {
      console.error("RAPIDAPI_KEY not configured");
      return new Response(JSON.stringify({ success: false, error: "Server configuration error." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const apiHost = 'full-downloader-social-media.p.rapidapi.com';
    const apiUrl = `https://${apiHost}/?url=${encodeURIComponent(url)}`;

    console.log("Calling RapidAPI:", apiUrl);

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': rapidApiKey,
      },
    });

    console.log("RapidAPI status:", apiResponse.status);

    const responseText = await apiResponse.text();
    console.log("RapidAPI response (first 500 chars):", responseText.substring(0, 500));

    if (!apiResponse.ok) {
      return new Response(JSON.stringify({ success: false, error: "Failed to analyze video. The video may be private or unavailable." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    let apiData: any;
    try {
      apiData = JSON.parse(responseText);
    } catch {
      console.error("Failed to parse API response as JSON");
      return new Response(JSON.stringify({ success: false, error: "Failed to process video data. Please try again." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    console.log("Parsed API data keys:", Object.keys(apiData));

    if (apiData?.error === true) {
      return new Response(JSON.stringify({ success: false, error: "Could not analyze video. Please check the URL and try again." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const hdDownloadUrl = extractNoWatermarkUrl(apiData);
    if (!hdDownloadUrl) {
      console.error("Could not extract download URL from:", JSON.stringify(apiData).substring(0, 1000));
      return new Response(JSON.stringify({ success: false, error: "Could not extract video download link." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const videoData = {
      success: true,
      platform,
      thumbnail: apiData?.thumb || apiData?.thumbnail || apiData?.cover || apiData?.result?.thumbnail || '',
      title: apiData?.caption || apiData?.title || apiData?.description || apiData?.result?.title || `${platform === 'tiktok' ? 'TikTok' : 'Instagram'} Video`,
      author: apiData?.author || apiData?.username || apiData?.result?.author || 'Unknown',
      duration: apiData?.duration ? formatDuration(apiData.duration) : '0:00',
      views: apiData?.views ? formatViews(apiData.views) : 'N/A',
      downloadUrls: { standard: hdDownloadUrl, hd: hdDownloadUrl },
    };

    return new Response(JSON.stringify({ success: true, data: videoData }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong. Please try again." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
