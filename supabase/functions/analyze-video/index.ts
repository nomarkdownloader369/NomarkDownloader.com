import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function detectPlatform(url: string): "tiktok" | "instagram" | "unknown" {
  const lower = url.toLowerCase();
  if (lower.includes("tiktok.com") || lower.includes("vm.tiktok")) return "tiktok";
  if (lower.includes("instagram.com") || lower.includes("instagr.am")) return "instagram";
  return "unknown";
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

// ── TikTok: tikwm.com (free, no key) ──
async function fetchTikTok_tikwm(url: string) {
  const res = await fetch("https://www.tikwm.com/api/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `url=${encodeURIComponent(url)}&hd=1`,
  });
  if (!res.ok) throw new Error("tikwm request failed");
  const json = await res.json();
  if (json.code !== 0 || !json.data) throw new Error(json.msg || "tikwm error");
  const d = json.data;
  return {
    thumbnail: d.cover || d.origin_cover || "",
    title: d.title || "TikTok Video",
    author: d.author?.unique_id || d.author?.nickname || "Unknown",
    duration: d.duration ? formatDuration(d.duration) : "0:00",
    views: d.play_count ? formatViews(d.play_count) : "N/A",
    downloadUrl: d.hdplay || d.play || "",
    audioUrl: d.music || "",
  };
}

// ── TikTok fallback: tikcdn.io ──
async function fetchTikTok_tikcdn(url: string) {
  const res = await fetch("https://tikcdn.io/ssstik/" + encodeURIComponent(url));
  if (!res.ok) throw new Error("tikcdn request failed");
  // tikcdn returns a redirect to video; use the final URL
  const finalUrl = res.url || url;
  return {
    thumbnail: "",
    title: "TikTok Video",
    author: "Unknown",
    duration: "0:00",
    views: "N/A",
    downloadUrl: finalUrl,
    audioUrl: "",
  };
}

// ── Instagram: use RapidAPI as primary ──
async function fetchInstagram_rapidapi(url: string, apiKey: string) {
  const apiHost = 'full-downloader-social-media.p.rapidapi.com';
  const apiUrl = `https://${apiHost}/?url=${encodeURIComponent(url)}`;
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: { 'x-rapidapi-host': apiHost, 'x-rapidapi-key': apiKey },
  });
  if (!res.ok) throw new Error("RapidAPI request failed");
  const json = await res.json();
  if (json.error === true) throw new Error("RapidAPI error");

  // Extract download URL from various response shapes
  let downloadUrl = json.download_url || json.url || json.video_url || "";
  if (!downloadUrl && json.medias && Array.isArray(json.medias)) {
    for (const m of json.medias) {
      if (m?.url) { downloadUrl = m.url; break; }
    }
  }
  if (!downloadUrl && json.links && Array.isArray(json.links)) {
    for (const l of json.links) {
      if (l?.url) { downloadUrl = l.url; break; }
    }
  }
  if (!downloadUrl && json.result?.url) downloadUrl = json.result.url;
  if (!downloadUrl) throw new Error("No download URL found");

  return {
    thumbnail: json.thumb || json.thumbnail || json.cover || json.result?.thumbnail || "",
    title: json.caption || json.title || json.description || "Instagram Video",
    author: json.author || json.username || "Unknown",
    duration: json.duration ? formatDuration(json.duration) : "0:00",
    views: json.views ? formatViews(json.views) : "N/A",
    downloadUrl,
    audioUrl: "",
  };
}

// ── Instagram fallback: igdownloader free endpoint ──
async function fetchInstagram_fallback(url: string) {
  const res = await fetch("https://v3.igdownloader.app/api/v1/media-info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error("igdownloader failed");
  const json = await res.json();
  const media = json?.media?.[0];
  if (!media?.url) throw new Error("No media found");
  return {
    thumbnail: media.thumbnail || json.thumbnail || "",
    title: json.title || "Instagram Video",
    author: json.username || "Unknown",
    duration: "0:00",
    views: "N/A",
    downloadUrl: media.url,
    audioUrl: "",
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: any;
    try { body = await req.json(); } catch {
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

    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY') || '';

    let result: any = null;
    const errors: string[] = [];

    if (platform === "tiktok") {
      // Try tikwm first, then tikcdn fallback
      try {
        console.log("Trying tikwm for TikTok...");
        result = await fetchTikTok_tikwm(url);
      } catch (e) {
        errors.push(`tikwm: ${e.message}`);
        console.error("tikwm failed:", e.message);
      }

      if (!result?.downloadUrl) {
        try {
          console.log("Trying tikcdn fallback...");
          result = await fetchTikTok_tikcdn(url);
        } catch (e) {
          errors.push(`tikcdn: ${e.message}`);
          console.error("tikcdn failed:", e.message);
        }
      }

      // Last resort: RapidAPI
      if (!result?.downloadUrl && rapidApiKey) {
        try {
          console.log("Trying RapidAPI fallback for TikTok...");
          result = await fetchInstagram_rapidapi(url, rapidApiKey);
        } catch (e) {
          errors.push(`rapidapi: ${e.message}`);
          console.error("RapidAPI fallback failed:", e.message);
        }
      }
    } else {
      // Instagram: try RapidAPI first, then fallback
      if (rapidApiKey) {
        try {
          console.log("Trying RapidAPI for Instagram...");
          result = await fetchInstagram_rapidapi(url, rapidApiKey);
        } catch (e) {
          errors.push(`rapidapi: ${e.message}`);
          console.error("RapidAPI failed:", e.message);
        }
      }

      if (!result?.downloadUrl) {
        try {
          console.log("Trying igdownloader fallback...");
          result = await fetchInstagram_fallback(url);
        } catch (e) {
          errors.push(`igdownloader: ${e.message}`);
          console.error("igdownloader failed:", e.message);
        }
      }
    }

    if (!result?.downloadUrl) {
      console.error("All APIs failed:", errors.join("; "));
      return new Response(JSON.stringify({ success: false, error: "Could not extract video. The video may be private or the link is invalid." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const videoData = {
      platform,
      thumbnail: result.thumbnail || "",
      title: result.title || `${platform === 'tiktok' ? 'TikTok' : 'Instagram'} Video`,
      author: result.author || "Unknown",
      duration: result.duration || "0:00",
      views: result.views || "N/A",
      downloadUrls: { standard: result.downloadUrl, hd: result.downloadUrl },
      audioUrl: result.audioUrl || "",
    };

    return new Response(JSON.stringify({ success: true, data: videoData }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong. Please try again." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
