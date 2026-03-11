import { useState } from 'react';
import { Briefcase, Plus, Trash2, Sparkles, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SectionHeader } from './SectionHeader';
import { Experience } from '@/lib/types';
import { generateExperienceBulletPoints } from '@/ai/flows/ai-generated-experience-bullet-points';

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: (exp: Experience) => void;
  onUpdate: (id: string, exp: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

export function ExperienceForm({ experiences, onAdd, onUpdate, onRemove }: ExperienceFormProps) {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleAdd = () => {
    onAdd({
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
      bulletPoints: [],
    });
  };

  const handleAiBullets = async (exp: Experience) => {
    if (!exp.role || !exp.company) return;
    setIsGenerating(exp.id);
    try {
      const result = await generateExperienceBulletPoints({
        role: exp.role,
        company: exp.company,
        responsibilities: exp.description || "General duties of the role",
      });
      onUpdate(exp.id, { bulletPoints: result.bulletPoints });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
      <SectionHeader icon={Briefcase} title="Experience" />
      
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-lg relative group bg-muted/30">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => onRemove(exp.id)}
            >
              <Trash2 size={16} />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  placeholder="Acme Corp"
                  value={exp.company}
                  onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  placeholder="Software Engineer"
                  value={exp.role}
                  onChange={(e) => onUpdate(exp.id, { role: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  disabled={exp.current}
                  value={exp.endDate}
                  onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => onUpdate(exp.id, { current: !!checked, endDate: checked ? '' : exp.endDate })}
                />
                <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Remote / New York, NY"
                  value={exp.location}
                  onChange={(e) => onUpdate(exp.id, { location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Description / Responsibilities</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAiBullets(exp)}
                  disabled={isGenerating === exp.id || !exp.role || !exp.company}
                  className="text-secondary border-secondary/20 hover:bg-secondary/10 flex gap-2 h-8 px-2"
                >
                  <Sparkles size={14} />
                  {isGenerating === exp.id ? 'Optimizing...' : 'AI Bullet Points'}
                </Button>
              </div>
              <Textarea
                placeholder="Briefly describe your main responsibilities..."
                className="min-h-[100px] resize-none mb-4"
                value={exp.description}
                onChange={(e) => onUpdate(exp.id, { description: e.target.value })}
              />
              
              {exp.bulletPoints.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Preview Bullet Points</Label>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {exp.bulletPoints.map((bp, idx) => (
                      <li key={idx}>{bp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          className="w-full border-dashed border-2 hover:border-primary hover:text-primary h-12 flex gap-2"
          onClick={handleAdd}
        >
          <Plus size={18} />
          Add Experience
        </Button>
      </div>
    </section>
  );
}
