interface LegalSectionProps {
  title: string;
  text: string;
  children?: React.ReactNode;
}

export function LegalSection({ title, text, children }: LegalSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{title}</h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{text}</p>
      {children}
    </div>
  );
}
