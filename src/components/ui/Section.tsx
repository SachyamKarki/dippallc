import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  shellClassName?: string;
  id?: string;
}

const Section = ({ children, className, shellClassName, id }: SectionProps) => {
  return (
    <section className={className} id={id}>
      <div className={cn("section-shell", shellClassName)}>
        {children}
      </div>
    </section>
  );
};

export default Section;
