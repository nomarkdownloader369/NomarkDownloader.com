import { cn } from "@/lib/utils";
import logoSrc from "@/assets/nomark-logo.png";

export function NoMarkLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="NoMark Logo"
      className={cn("h-9 w-9 object-contain", className)}
      draggable={false}
    />
  );
}
