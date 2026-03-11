import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SectionHeader } from './SectionHeader';
import { Education } from '@/lib/types';

interface EducationFormProps {
  educations: Education[];
  onAdd: (edu: Education) => void;
  onUpdate: (id: string, edu: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export function EducationForm({ educations, onAdd, onUpdate, onRemove }: EducationFormProps) {
  const handleAdd = () => {
    onAdd({
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      location: '',
      gpa: '',
    });
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
      <SectionHeader icon={GraduationCap} title="Education" />
      
      <div className="space-y-6">
        {educations.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-lg relative group bg-muted/30">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => onRemove(edu.id)}
            >
              <Trash2 size={16} />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Institution</Label>
                <Input
                  placeholder="University of Excellence"
                  value={edu.institution}
                  onChange={(e) => onUpdate(edu.id, { institution: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  placeholder="Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  placeholder="Computer Science"
                  value={edu.field}
                  onChange={(e) => onUpdate(edu.id, { field: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Austin, TX"
                  value={edu.location}
                  onChange={(e) => onUpdate(edu.id, { location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>GPA (Optional)</Label>
                <Input
                  placeholder="3.8 / 4.0"
                  value={edu.gpa}
                  onChange={(e) => onUpdate(edu.id, { gpa: e.target.value })}
                />
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
          Add Education
        </Button>
      </div>
    </section>
  );
}
