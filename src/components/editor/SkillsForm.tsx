import { Code, Plus, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from './SectionHeader';
import { Skill } from '@/lib/types';
import { useState } from 'react';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Skill) => void;
  onUpdate: (id: string, skill: Partial<Skill>) => void;
  onRemove: (id: string) => void;
}

export function SkillsForm({ skills, onAdd, onUpdate, onRemove }: SkillsFormProps) {
  const [newItemText, setNewItemText] = useState<{ [id: string]: string }>({});

  const handleAdd = () => {
    onAdd({
      id: crypto.randomUUID(),
      category: '',
      items: [],
    });
  };

  const handleAddItem = (skillId: string) => {
    const text = newItemText[skillId]?.trim();
    if (!text) return;
    
    const skill = skills.find(s => s.id === skillId);
    if (skill && !skill.items.includes(text)) {
      onUpdate(skillId, { items: [...skill.items, text] });
    }
    setNewItemText({ ...newItemText, [skillId]: '' });
  };

  const handleRemoveItem = (skillId: string, itemToRemove: string) => {
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      onUpdate(skillId, { items: skill.items.filter(item => item !== itemToRemove) });
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
      <SectionHeader icon={Code} title="Skills" />
      
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border rounded-lg relative group bg-muted/30">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => onRemove(skill.id)}
            >
              <Trash2 size={16} />
            </Button>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  placeholder="Programming Languages / Frameworks"
                  value={skill.category}
                  onChange={(e) => onUpdate(skill.id, { category: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label>Items</Label>
                <div className="flex flex-wrap gap-2 mb-2 min-h-[32px]">
                  {skill.items.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="pl-3 pr-2 py-1 flex gap-1 items-center bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all">
                      {item}
                      <button 
                        onClick={() => handleRemoveItem(skill.id, item)}
                        className="p-0.5 hover:bg-primary/20 rounded-full transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add item..."
                    value={newItemText[skill.id] || ''}
                    onChange={(e) => setNewItemText({ ...newItemText, [skill.id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem(skill.id))}
                  />
                  <Button size="sm" onClick={() => handleAddItem(skill.id)}>Add</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          className="w-full border-dashed border-2 hover:border-primary hover:text-primary h-12 flex gap-2"
          onClick={handleAdd}
        >
          <Plus size={18} />
          Add Skill Category
        </Button>
      </div>
    </section>
  );
}
