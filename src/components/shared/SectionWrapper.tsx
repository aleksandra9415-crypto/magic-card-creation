import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  titleAs?: "h1" | "h2";
  centered?: boolean;
}

export default function SectionWrapper({
  children,
  className,
  id,
  eyebrow,
  title,
  description,
  titleAs = "h2",
  centered = false,
}: SectionWrapperProps) {
  const TitleTag = titleAs;

  return (
    <section id={id} className={cn("section-wrapper", className)}>
      <div className="container">
        {(eyebrow || title || description) && (
          <div className={cn("section-header", centered && "section-header--centered")}>
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
            {title && <TitleTag className={titleAs}>{title}</TitleTag>}
            {description && <p className="section-description">{description}</p>}
          </div>
        )}
        <div className="section-content">
          {children}
        </div>
      </div>
    </section>
  );
}
