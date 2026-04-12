import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit } from "./rate-limiter.ts";

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

// ── Instagram Primary: SnapInsta (أفضل وأسرع في 2026) ──
async function fetchInstagram_snapinsta(url: string) {
  const apiUrl = `https://api.snapinsta.app/v2/download?url=${encodeURIComponent(url)}`;
  
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) throw new Error(`SnapInsta failed: ${res.status}`);

  const json = await res.json();
  
  let downloadUrl = "";
  let thumbnail = "";
  let title = "Instagram Video";
  let author = "Unknown";

  if (json.data && Array.isArray(json.data) && json.data[0]?.url) {
    downloadUrl = json.data[0].url;
    thumbnail = json.data[0].thumbnail || "";
    title = json.data[0].title || title;
    author = json.data[0].username || author;
  } else if (json.url) {
    downloadUrl = json.url;
    thumbnail = json.thumbnail || "";
  } else if (json.medias && Array.isArray(json.medias) && json.medias[0]?.url) {
    downloadUrl = json.medias[0].url;
    thumbnail = json.medias[0].thumbnail || "";
  }

  if (!downloadUrl) throw new Error("No download URL from SnapInsta");

  return {
    thumbnail,
    title,
    author,
    duration: "0:00",
    views: "N/A",
    downloadUrl,
    audioUrl: "",
  };
}

// ── Instagram Fallback 1: SaveFromIns ──
async function fetchInstagram_savefromins(url: string) {
  const res = await fetch(`https://api.savefromins.com/v1/download?url=${encodeURIComponent(url)}`, {
    method: 'GET',
  });

  if (!res.ok) throw new Error("SaveFromIns failed");

  const json = await res.json();
  const video = json.video || json.data?.[0] || json;

  if (!video?.url) throw new Error("No video URL from SaveFromIns");

  return {
    thumbnail: video.thumb || video.thumbnail || "",
    title: video.title || "Instagram Video",
    author: video.author || "Unknown",
    duration: "0:00",
    views: "N/A",
    downloadUrl: video.url,
    audioUrl: "",
  };
}

// ── Instagram Fallback 2: igdownloader (محسن) ──
async function fetchInstagram_fallback(url: string) {
  const res = await fetch("https://v3.igdownloader.app/api/v1/media-info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error("igdownloader failed");

  const json = await res.json();
  const media = json?.media?.[0] || json;

  if (!media?.url) throw new Error("No media URL from igdownloader");

  return {
    thumbnail: media.thumbnail || "",
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
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 'unknown';
    const rateCheck = checkRateLimit(clientIP);
    if (!rateCheck.allowed) {
      return new Response(JSON.stringify({ success: false, error: "Too many requests. Please wait a moment and try again." }), { 
        status: 429, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' } 
      });
    }

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

    let result: any = null;
    const errors: string[] = [];

    if (platform === "tiktok") {
      // TikTok logic (لم يتغير أبداً)
      try {
        console.log("Trying tikwm for TikTok...");
        result = await fetchTikTok_tikwm(url);
      } catch (e) {
        errors.push(`tikwm: ${e.message}`);
        console.error("tikwm failed:", e.message);
      }

      if (!result?.downloadUrl) {
        try {
          console.log("Trying tikcdn fallback for TikTok...");
          result = await fetchTikTok_tikcdn(url);
        } catch (e) {
          errors.push(`tikcdn: ${e.message}`);
          console.error("tikcdn failed:", e.message);
        }
      }
    } else {
      // Instagram logic (محسن ومنظم)
      console.log("Trying SnapInsta for Instagram...");
      try {
        result = await fetchInstagram_snapinsta(url);
      } catch (e) {
        errors.push(`snapinsta: ${e.message}`);
        console.error("SnapInsta failed:", e.message);
      }

      if (!result?.downloadUrl) {
        console.log("Trying SaveFromIns fallback...");
        try {
          result = await fetchInstagram_savefromins(url);
        } catch (e) {
          errors.push(`savefromins: ${e.message}`);
          console.error("SaveFromIns failed:", e.message);
        }
      }

      if (!result?.downloadUrl) {
        console.log("Trying igdownloader fallback...");
        try {
          result = await fetchInstagram_fallback(url);
        } catch (e) {
          errors.push(`igdownloader: ${e.message}`);
          console.error("igdownloader failed:", e.message);
        }
      }
    }

    if (!result?.downloadUrl) {
      console.error("All methods failed for", platform, ":", errors.join("; "));
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Could not extract video. The video may be private, deleted, or the service is temporarily down. Try again later." 
      }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
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

    return new Response(JSON.stringify({ success: true, data: videoData }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong. Please try again." }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
