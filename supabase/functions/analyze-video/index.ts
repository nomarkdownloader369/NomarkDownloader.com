import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
  return null;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatViews(views: number | string): string {
  const num = typeof views === 'string' ? parseInt(views) : views;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

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
      return new Response(JSON.stringify({ success: false, error: "Server configuration error." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const apiHost = 'full-downloader-social-media.p.rapidapi.com';
    const apiUrl = `https://${apiHost}/?url=${encodeURIComponent(url)}`;

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': rapidApiKey,
      },
    });

    if (!apiResponse.ok) {
      return new Response(JSON.stringify({ success: false, error: "Failed to analyze video. The video may be private or unavailable." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const apiData = await apiResponse.json();

    if (apiData?.error === true) {
      return new Response(JSON.stringify({ success: false, error: "Could not analyze video. Please check the URL and try again." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const hdDownloadUrl = extractNoWatermarkUrl(apiData);
    if (!hdDownloadUrl) {
      return new Response(JSON.stringify({ success: false, error: "Could not extract video download link." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const videoData = {
      success: true,
      platform,
      thumbnail: apiData?.thumb || apiData?.thumbnail || apiData?.cover || '',
      title: apiData?.caption || apiData?.title || apiData?.description || `${platform === 'tiktok' ? 'TikTok' : 'Instagram'} Video`,
      author: apiData?.author || apiData?.username || 'Unknown',
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
