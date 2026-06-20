import { cn } from "@/lib/utils";

interface PageHeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHero({ kicker, title, subtitle, center = true, className, children }: PageHeroProps) {
  return (
    <section className={cn("pt-[clamp(7rem,14vw,10rem)] pb-[clamp(3rem,6vw,5rem)]", className)}>
      <div className={cn("section-shell", center && "text-center")}>
        {kicker && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{kicker}</p>
        )}
        <h1 className="mb-4" style={{ fontSize: "var(--text-hero)" }}>{title}</h1>
        {subtitle && (
          <p className={cn("text-lg text-gray-500 leading-relaxed", center ? "mx-auto max-w-2xl" : "max-w-2xl")}>{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
