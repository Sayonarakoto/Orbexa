import { Layout, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
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
    <section className="bg-white p-6 rounded-xl shadow-sm border border-border/50 transition-all hover:shadow-md">
      <SectionHeader icon={Layout} title="Design & Compliance" />
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            Target Strategy
            <Sparkles size={12} className="text-primary animate-pulse" />
          </label>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full uppercase">
            {selectedMode === 'fresher' ? 'Visual First' : 'System Optimized'}
          </span>
        </div>

        <Tabs 
          value={selectedMode} 
          onValueChange={(v) => onModeChange(v as TemplateMode)} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 h-14 p-1.5 bg-slate-100/80 rounded-2xl border-2 border-slate-200/50">
            <TabsTrigger 
              value="fresher" 
              className={cn(
                "flex items-center justify-center gap-2.5 h-full rounded-xl transition-all duration-300 font-bold text-sm",
                "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 data-[state=active]:scale-[1.02]",
                "data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:bg-slate-200/50"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                selectedMode === 'fresher' ? "bg-primary text-white" : "bg-slate-200 text-slate-400"
              )}>
                <Zap size={14} fill={selectedMode === 'fresher' ? "currentColor" : "none"} />
              </div>
              Fresher Design
            </TabsTrigger>
            <TabsTrigger 
              value="ats" 
              className={cn(
                "flex items-center justify-center gap-2.5 h-full rounded-xl transition-all duration-300 font-bold text-sm",
                "data-[state=active]:bg-white data-[state=active]:text-secondary data-[state=active]:shadow-lg data-[state=active]:shadow-secondary/10 data-[state=active]:scale-[1.02]",
                "data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:bg-slate-200/50"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                selectedMode === 'ats' ? "bg-secondary text-white" : "bg-slate-200 text-slate-400"
              )}>
                <ShieldCheck size={14} fill={selectedMode === 'ats' ? "currentColor" : "none"} />
              </div>
              ATS Optimized
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => {
          const isActive = selectedId === template.id;
          const modeColor = selectedMode === 'ats' ? 'secondary' : 'primary';
          
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={cn(
                "group relative p-4 rounded-xl border-2 text-left transition-all duration-300 overflow-hidden",
                isActive 
                  ? `border-${modeColor} bg-${modeColor}/5 ring-4 ring-${modeColor}/10 translate-y-[-2px]` 
                  : "border-border/60 hover:border-slate-300 hover:bg-slate-50 hover:translate-y-[-1px]"
              )}
            >
              {isActive && (
                <div className={`absolute top-0 left-0 w-1 h-full bg-${modeColor}`} />
              )}
              <div className="flex justify-between items-start mb-2">
                <h3 className={cn(
                  "font-headline font-bold text-sm transition-colors", 
                  isActive ? `text-${modeColor}` : "text-foreground group-hover:text-slate-900"
                )}>
                  {template.name}
                </h3>
                {isActive && <CheckCircle2 size={16} className={`text-${modeColor} animate-in zoom-in duration-300`} />}
              </div>
              <p className="text-xs text-muted-foreground leading-snug group-hover:text-slate-500 transition-colors">
                {template.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
