import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", align === "center" && "text-center", className)}>
      <h2 className="section-title" style={{ textAlign: align }}>{title}</h2>
      {subtitle && <p className="section-subtitle" style={{ textAlign: align, marginLeft: align === "left" ? 0 : undefined }}>{subtitle}</p>}
    </div>
  );
}
