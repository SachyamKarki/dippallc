import { cn } from "@/lib/utils";

type DippaLogoProps = {
  className?: string;
};

export default function DippaLogo({ className }: DippaLogoProps) {
  return (
    <span className={cn("dippa-logo", className)} aria-hidden="true">
      <span className="dippa-logo-text">DIPPA.</span>
    </span>
  );
}
