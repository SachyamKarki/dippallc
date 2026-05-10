import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "navy" | "outline";
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  style,
  type = "button"
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "button-primary shadow-lg",
    secondary: "bg-[#000000] text-white hover:bg-[#1a1a1a] shadow-lg px-8 py-3 button-shape-leaf",
    navy: "bg-[#1E293B] text-white hover:bg-[#2d3748] shadow-lg px-8 py-3 button-shape-leaf",
    outline: "border-2 border-current bg-transparent hover:bg-current hover:text-white px-8 py-3 rounded-full"
  };

  const combinedClassName = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClassName} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
