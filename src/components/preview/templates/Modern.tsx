import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="flex font-body text-slate-800 bg-white min-h-[1100px]">
      {/* Sidebar */}
      <aside className="w-[280px] bg-slate-50 p-8 border-r">
        {personalInfo.profileImage && (
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="space-y-6">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 border-b pb-1">Contact</h2>
            <div className="space-y-3 text-xs">
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail size={12} className="text-primary mt-0.5" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone size={12} className="text-primary mt-0.5" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-primary mt-0.5" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe size={12} className="text-primary mt-0.5" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 border-b pb-1">Expertise</h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-1">{skill.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, i) => (
                        <span key={i} className="text-[10px] bg-white border px-1.5 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 border-b pb-1">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-1">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-headline font-bold text-slate-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-sm text-primary font-medium tracking-wide uppercase">Professional Candidate</p>
        </header>

        {personalInfo.summary && (
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span>
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span>
              Work Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100">
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-primary"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900">{exp.role || 'Role'}</h3>
                      <p className="text-sm text-primary font-medium">{exp.company || 'Company'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </p>
                      <p className="text-[10px] text-slate-400">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 text-sm text-slate-700">
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
      </main>
    </div>
  );
}
