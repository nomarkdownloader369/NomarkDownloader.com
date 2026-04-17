import { cn } from "@/lib/utils";
import logo from "../assets/logo.png";

export function NoMarkLogo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="NoMark Logo"
      className={cn("h-9 w-9 object-contain", className)}
    />
  );
}
