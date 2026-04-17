import { cn } from "@/lib/utils";

export function NoMarkLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-9 w-9", className)}
    >
      <rect width="120" height="120" rx="26" fill="#0F0F0F" />
      <defs>
        <linearGradient id="nomark-grad" x1="36" y1="30" x2="84" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <path
        d="M38 48 L60 70 L82 48"
        stroke="url(#nomark-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M40 85 L80 85"
        stroke="url(#nomark-grad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
        }
