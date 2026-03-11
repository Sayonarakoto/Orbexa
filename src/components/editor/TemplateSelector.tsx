import { Layout, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean, professional, and tech-friendly.' },
  { id: 'executive', name: 'Executive', description: 'Traditional, centered, and high-impact.' },
  { id: 'creative', name: 'Creative', description: 'Bold, side-aligned, and modern-artsy.' },
  { id: 'minimal', name: 'Minimal', description: 'Essential, airy, and focused on text.' },
];

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
      <SectionHeader icon={Layout} title="Choose Template" />
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => {
          const isActive = selectedId === template.id;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={cn(
                "group relative p-4 rounded-xl border-2 text-left transition-all",
                isActive 
                  ? "border-primary bg-primary/5 ring-4 ring-primary/10" 
                  : "border-border/60 hover:border-primary/40 hover:bg-muted/50"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={cn("font-headline font-bold text-sm", isActive ? "text-primary" : "text-foreground")}>
                  {template.name}
                </h3>
                {isActive && <CheckCircle2 size={16} className="text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                {template.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
