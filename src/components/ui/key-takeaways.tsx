import { Sparkles, CheckCircle2 } from "lucide-react";

interface KeyTakeawaysProps {
  title?: string;
  items: string[];
  className?: string;
}

export function KeyTakeaways({
  title = "Key Takeaways & Executive Summary",
  items,
  className = "",
}: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside
      aria-label="Executive Summary & Key Takeaways"
      className={`my-8 p-6 rounded-2xl bg-accent/5 border border-accent/20 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-base font-bold text-foreground tracking-wide font-headline">
          {title}
        </h3>
      </div>
      <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
