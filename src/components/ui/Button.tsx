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
  // base only handles flex alignment; glass styles + shape live in buttons.css
  const baseStyles = "inline-flex items-center justify-center";

  const variants: Record<string, string> = {
    primary:  "button-primary",
    secondary:"button-secondary",
    navy:     "button-inverse",
    outline:  "button-secondary",
  };

  const combinedClassName = cn(baseStyles, variants[variant] ?? "button-primary", className);

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
