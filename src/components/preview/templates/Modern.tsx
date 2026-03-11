import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-10 font-body text-slate-800 bg-white min-h-[1100px]">
      <header className="mb-8 border-b-4 border-primary pb-6 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-4xl font-headline font-bold text-slate-900 mb-4">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} className="text-primary" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-primary" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-primary" />
                {personalInfo.location}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe size={14} className="text-primary" />
                {personalInfo.website}
              </div>
            )}
          </div>
        </div>
        {personalInfo.profileImage && (
          <div className="ml-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10 shadow-sm">
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-slate-900">{exp.role || 'Role'}</h3>
                    <p className="text-sm text-primary font-medium">{exp.company || 'Company'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="text-xs text-slate-400">{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-700">
                  {exp.bulletPoints.length > 0 ? (
                    exp.bulletPoints.map((bp, idx) => <li key={idx}>{bp}</li>)
                  ) : (
                    <li>{exp.description}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{edu.institution || 'University'}</h3>
                  <p className="text-sm text-slate-700">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase">
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-xs text-primary font-medium">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {skills.map((skill) => (
              <div key={skill.id}>
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-1">{skill.category || 'Category'}</h3>
                <p className="text-sm text-slate-700">{skill.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
