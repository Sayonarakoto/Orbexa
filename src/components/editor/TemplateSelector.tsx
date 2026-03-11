import { Layout, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';
import { TemplateMode } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fresherTemplates = [
  { id: 'modern', name: 'Modern', description: 'Clean, professional, and tech-friendly.' },
  { id: 'executive', name: 'Executive', description: 'Traditional, centered, and high-impact.' },
  { id: 'creative', name: 'Creative', description: 'Bold, side-aligned, and modern-artsy.' },
  { id: 'minimal', name: 'Minimal', description: 'Essential, airy, and focused on text.' },
];

const atsTemplates = [
  { id: 'ats-standard', name: 'ATS Standard', description: 'Maximum parsing accuracy for hiring systems.' },
  { id: 'ats-pro', name: 'ATS Professional', description: 'Clean layout that balances design and scan-ability.' },
];

interface TemplateSelectorProps {
  selectedId: string;
  selectedMode: TemplateMode;
  onSelect: (id: string) => void;
  onModeChange: (mode: TemplateMode) => void;
}

export function TemplateSelector({ selectedId, selectedMode, onSelect, onModeChange }: TemplateSelectorProps) {
  const templates = selectedMode === 'ats' ? atsTemplates : fresherTemplates;

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
      <SectionHeader icon={Layout} title="Choose Template" />
      
      <div className="mb-6">
        <Tabs value={selectedMode} onValueChange={(v) => onModeChange(v as TemplateMode)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="fresher" className="flex gap-2">
              <Zap size={16} />
              Fresher
            </TabsTrigger>
            <TabsTrigger value="ats" className="flex gap-2">
              <ShieldCheck size={16} />
              ATS Friendly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

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
