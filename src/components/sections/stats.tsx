import { Award, Users, Zap, LucideIcon } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

interface StatsProps {
  items: StatItem[];
}

const defaultStats: StatItem[] = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    value: '98%',
    label: 'Page Speed Score',
    description: 'Blazing-fast load times to keep your users engaged.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    value: '150+',
    label: 'Clients Served',
    description: 'Trusted by businesses across various industries.',
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    value: '300%',
    label: 'Avg. Conversion Uplift',
    description: 'Our conversion-focused designs deliver measurable results.',
  },
];

export function StatsSection({ items }: StatsProps) {
  return (
    <section id="stats" className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 text-center animate-in fade-in slide-in-from-bottom-5"
              style={{animationDelay: `${index * 150}ms`, animationFillMode: 'backwards'}}
            >
              <div className="mb-4">{stat.icon}</div>
              <p className="text-5xl font-bold text-foreground">{stat.value}</p>
              <h3 className="mt-2 text-lg font-semibold">{stat.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return <StatsSection items={defaultStats} />;
}
