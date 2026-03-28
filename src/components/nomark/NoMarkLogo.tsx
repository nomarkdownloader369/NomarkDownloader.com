export function NoMarkLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(160, 84%, 39%)" />
          <stop offset="100%" stopColor="hsl(174, 72%, 46%)" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="96" fill="hsl(220, 20%, 4%)" />
      <rect x="16" y="16" width="480" height="480" rx="80" fill="none" stroke="url(#logoGrad)" strokeWidth="3" opacity="0.3" />
      <path d="M256 140 L256 320" stroke="url(#logoGrad)" strokeWidth="36" strokeLinecap="round" />
      <path d="M180 260 L256 336 L332 260" stroke="url(#logoGrad)" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="148" y="352" width="216" height="32" rx="16" fill="url(#logoGrad)" opacity="0.9" />
    </svg>
  );
}
