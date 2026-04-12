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

// TikTok (لم يتغير)
async function fetchTikTok_tikwm(url: string) {
  const res = await fetch("https://www.tikwm.com/api/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `url=${encodeURIComponent(url)}&hd=1`,
  });
  if (!res.ok) throw new Error("tikwm failed");
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

async function fetchTikTok_tikcdn(url: string) {
  const res = await fetch("https://tikcdn.io/ssstik/" + encodeURIComponent(url));
  if (!res.ok) throw new Error("tikcdn failed");
  return { thumbnail: "", title: "TikTok Video", author: "Unknown", duration: "0:00", views: "N/A", downloadUrl: res.url || url, audioUrl: "" };
}

// Instagram - أحدث وأقوى fallbacks (أبريل 2026)
async function fetchInstagram_fastdl(url: string) {
  const res = await fetch(`https://fastdl.app/api/download?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`FastDL HTTP ${res.status}`);
  const json = await res.json();
  const downloadUrl = json.url || json.download_url || json.video_url || (json.data?.url);
  if (!downloadUrl) throw new Error("No download URL from FastDL");
  return {
    thumbnail: json.thumbnail || "",
    title: json.title || "Instagram Reel",
    author: json.author || "Unknown",
    duration: "0:00",
    views: "N/A",
    downloadUrl,
    audioUrl: "",
  };
}

async function fetchInstagram_snapinsta(url: string) {
  const res = await fetch(`https://snapinsta.to/api/download?url=${encodeURIComponent(url)}`);  // تم تحديث الدومين
  if (!res.ok) throw new Error(`SnapInsta.to failed`);
  const json = await res.json();
  let downloadUrl = json.data?.[0]?.url || json.url || json.medias?.[0]?.url || "";
  if (!downloadUrl) throw new Error("No URL from SnapInsta.to");
  return {
    thumbnail: json.data?.[0]?.thumbnail || "",
    title: json.data?.[0]?.title || "Instagram Reel",
    author: json.username || "Unknown",
    duration: "0:00",
    views: "N/A",
    downloadUrl,
    audioUrl: "",
  };
}

async function fetchInstagram_savefromins(url: string) {
  const res = await fetch(`https://api.savefromins.com/v1/download?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("SaveFromIns failed");
  const json = await res.json();
  const video = json.video || json.data?.[0] || json;
  if (!video?.url) throw new Error("No URL from SaveFromIns");
  return {
    thumbnail: video.thumb || "",
    title: video.title || "Instagram Reel",
    author: video.author || "Unknown",
    duration: "0:00",
    views: "N/A",
    downloadUrl: video.url,
    audioUrl: "",
  };
}

async function fetchInstagram_fallback(url: string) {
  const res = await fetch("https://v3.igdownloader.app/api/v1/media-info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error("igdownloader failed");
  const json = await res.json();
  const media = json?.media?.[0] || json;
  if (!media?.url) throw new Error("No media URL");
  return {
    thumbnail: media.thumbnail || "",
    title: json.title || "Instagram Reel",
    author: json.username || "Unknown",
    duration: "0:00",
    views: "N/A",
    downloadUrl: media.url,
    audioUrl: "",
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('cf-connecting-ip') || 'unknown';
    if (!checkRateLimit(clientIP).allowed) {
      return new Response(JSON.stringify({ success: false, error: "Too many requests. Please wait a moment." }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = await req.json().catch(() => ({}));
    const url = body?.url?.trim();
    if (!url) return new Response(JSON.stringify({ success: false, error: "Please provide a valid video URL" }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    try { new URL(url); } catch {
      return new Response(JSON.stringify({ success: false, error: "Invalid URL format." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const platform = detectPlatform(url);
    if (platform === "unknown") {
      return new Response(JSON.stringify({ success: false, error: "Unsupported platform. TikTok & Instagram only." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    let result: any = null;
    const errors: string[] = [];

    if (platform === "tiktok") {
      try { result = await fetchTikTok_tikwm(url); } 
      catch (e) { 
        errors.push(`tikwm: ${e.message}`);
        try { result = await fetchTikTok_tikcdn(url); } catch (e2) { errors.push(`tikcdn: ${e2.message}`); }
      }
    } else {
      // Instagram - ترتيب حسب الاستقرار الحالي
      console.log("Trying FastDL for Instagram...");
      try { result = await fetchInstagram_fastdl(url); } catch (e) { errors.push(`fastdl: ${e.message}`); }

      if (!result?.downloadUrl) {
        console.log("Trying SnapInsta.to...");
        try { result = await fetchInstagram_snapinsta(url); } catch (e) { errors.push(`snapinsta.to: ${e.message}`); }
      }

      if (!result?.downloadUrl) {
        console.log("Trying SaveFromIns...");
        try { result = await fetchInstagram_savefromins(url); } catch (e) { errors.push(`savefromins: ${e.message}`); }
      }

      if (!result?.downloadUrl) {
        console.log("Trying igdownloader fallback...");
        try { result = await fetchInstagram_fallback(url); } catch (e) { errors.push(`igdownloader: ${e.message}`); }
      }
    }

    if (!result?.downloadUrl) {
      console.error("All Instagram methods failed:", errors.join(" | "));
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Failed to analyze video. Please try again in 1-2 minutes or try a different Instagram link." 
      }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const videoData = {
      platform,
      thumbnail: result.thumbnail || "",
      title: result.title || `${platform} Video`,
      author: result.author || "Unknown",
      duration: result.duration || "0:00",
      views: result.views || "N/A",
      downloadUrls: { standard: result.downloadUrl, hd: result.downloadUrl },
      audioUrl: result.audioUrl || "",
    };

    return new Response(JSON.stringify({ success: true, data: videoData }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong. Please try again." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
