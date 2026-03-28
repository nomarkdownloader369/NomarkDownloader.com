export interface VideoInfo {
  success: boolean;
  platform: "tiktok" | "instagram" | "unknown";
  thumbnail: string;
  title: string;
  author: string;
  duration: string;
  views: string;
  downloadUrls: {
    standard: string;
    hd: string;
  };
  error?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  data?: VideoInfo;
  error?: string;
}
