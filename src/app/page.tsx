'use client';

import { useResumeData } from '@/hooks/use-resume-data';
import { PersonalInfoForm } from '@/components/editor/PersonalInfoForm';
import { ExperienceForm } from '@/components/editor/ExperienceForm';
import { EducationForm } from '@/components/editor/EducationForm';
import { SkillsForm } from '@/components/editor/SkillsForm';
import { TemplateSelector } from '@/components/editor/TemplateSelector';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { Sparkles, Zap } from 'lucide-react';

export default function Home() {
  const {
    data,
    isLoaded,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    setTemplate,
    setTemplateMode,
  } = useResumeData();

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-[#F0F2F5] pb-20">
      {/* Header */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md no-print">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 ring-4 ring-primary/10">
              <Zap size={22} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-headline text-xl font-bold tracking-tight text-foreground">
                Resume<span className="text-primary">Spark</span>
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/70 -mt-1">
                AI Powered Career Suite
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/5 border border-secondary/10 rounded-full text-secondary text-xs font-semibold">
              <Sparkles size={14} />
              AI Draft Assistant Active
            </div>
          </div>
        </div>
      </nav>

      {/* Editor Content */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          
          {/* Left Column: Editor */}
          <div className="space-y-8 no-print">
            <div className="space-y-1">
              <h2 className="font-headline text-2xl font-bold text-slate-900">Build Your Resume</h2>
              <p className="text-slate-500 text-sm">Follow the sections to build your professional profile.</p>
            </div>

            <TemplateSelector 
              selectedId={data.templateId} 
              selectedMode={data.templateMode}
              onSelect={setTemplate} 
              onModeChange={setTemplateMode}
            />
            
            <PersonalInfoForm 
              data={data.personalInfo} 
              onChange={updatePersonalInfo} 
            />

            <ExperienceForm 
              experiences={data.experience} 
              onAdd={addExperience}
              onUpdate={updateExperience}
              onRemove={removeExperience}
            />

            <EducationForm 
              educations={data.education}
              onAdd={addEducation}
              onUpdate={updateEducation}
              onRemove={removeEducation}
            />

            <SkillsForm 
              skills={data.skills}
              onAdd={addSkill}
              onUpdate={updateSkill}
              onRemove={removeSkill}
            />
          </div>

          {/* Right Column: Preview */}
          <div className="lg:block">
            <ResumePreview data={data} />
          </div>

        </div>
      </div>

      {/* Footer / Status */}
      <footer className="mt-20 border-t bg-white pt-10 pb-8 no-print">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ResumeSpark AI. Your data is stored locally for session continuity.
          </p>
        </div>
      </footer>
    </main>
  );
}
