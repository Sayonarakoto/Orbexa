import { ResumeData } from '@/lib/types';

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="font-body text-slate-900 bg-white min-h-[1100px] flex">
      {/* Decorative Side Column */}
      <div className="w-16 bg-primary flex flex-col items-center justify-center py-12 gap-8 shrink-0">
        <div className="rotate-[-90deg] whitespace-nowrap text-white font-headline font-bold uppercase tracking-[0.5em] opacity-30 text-4xl">
          RESUME • {new Date().getFullYear()}
        </div>
      </div>

      <div className="flex-1 p-12">
        <header className="mb-16 flex justify-between items-start">
          <div className="space-y-4">
            <h1 className="text-6xl font-headline font-black uppercase tracking-tighter leading-none text-primary">
              {personalInfo.fullName?.split(' ')[0] || 'FIRST'}<br/>
              <span className="text-slate-900">{personalInfo.fullName?.split(' ')[1] || 'LAST'}</span>
            </h1>
            <div className="h-2 w-24 bg-primary"></div>
          </div>

          <div className="space-y-2 text-right">
            {personalInfo.profileImage && (
              <div className="mb-6 flex justify-end">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-xl">
                  <img src={personalInfo.profileImage} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            <p className="text-sm font-bold">{personalInfo.email}</p>
            <p className="text-sm text-slate-500">{personalInfo.phone}</p>
            <p className="text-sm text-slate-500">{personalInfo.location}</p>
            {personalInfo.website && <p className="text-sm font-black text-primary">{personalInfo.website}</p>}
          </div>
        </header>

        <div className="grid grid-cols-12 gap-12">
          {/* Left Side: Summary & Skills */}
          <div className="col-span-4 space-y-12">
            {personalInfo.summary && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  About <div className="h-px flex-1 bg-slate-100"></div>
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                  Skills <div className="h-px flex-1 bg-slate-100"></div>
                </h2>
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <h3 className="text-[10px] font-bold text-primary uppercase mb-2">{skill.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-50 border rounded-lg text-xs font-medium">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Side: Exp & Edu */}
          <div className="col-span-8 space-y-12">
            {experience.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                  Experience <div className="h-px flex-1 bg-slate-100"></div>
                </h2>
                <div className="space-y-12">
                  {experience.map((exp) => (
                    <div key={exp.id} className="group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                        <span className="text-xs font-black text-slate-300">
                          {exp.startDate} – {exp.current ? 'NOW' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-400 mb-4">{exp.company} • {exp.location}</p>
                      <ul className="space-y-2">
                        {exp.bulletPoints.map((bp, i) => (
                          <li key={i} className="text-sm text-slate-600 flex gap-2">
                            <span className="text-primary font-black">/</span> {bp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                  Learning <div className="h-px flex-1 bg-slate-100"></div>
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-xs text-slate-500 mt-1">{edu.institution}</p>
                      <p className="text-[10px] font-black text-primary uppercase mt-2">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
