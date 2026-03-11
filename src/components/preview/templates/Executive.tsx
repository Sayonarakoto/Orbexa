import { ResumeData } from '@/lib/types';

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-16 font-body text-slate-900 bg-white min-h-[1100px]">
      <header className="mb-12 flex justify-between items-end border-b-4 border-slate-900 pb-8">
        <div className="max-w-[60%]">
          <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter mb-2 leading-none">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          {personalInfo.summary && (
            <p className="text-sm text-slate-600 italic font-medium mt-4 line-clamp-3">
              {personalInfo.summary}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-1 text-xs font-bold uppercase tracking-wider text-slate-500">
          {personalInfo.profileImage && (
            <div className="mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-900">
                <img src={personalInfo.profileImage} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.website && <span className="text-slate-900 border-b border-slate-900">{personalInfo.website}</span>}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
              Experience
              <div className="flex-1 h-px bg-slate-200"></div>
            </h2>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold uppercase">{exp.company || 'COMPANY NAME'}</h3>
                    <span className="text-sm font-bold bg-slate-100 px-3 py-1 rounded">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-4">
                    <p className="text-lg font-medium text-slate-700">{exp.role || 'Job Position'}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exp.location}</p>
                  </div>
                  <ul className="grid grid-cols-1 gap-3 text-[13px] leading-relaxed text-slate-600">
                    {exp.bulletPoints.length > 0 ? (
                      exp.bulletPoints.map((bp, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-slate-900 font-bold">•</span>
                          {bp}
                        </li>
                      ))
                    ) : (
                      <li>{exp.description}</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b-2 border-slate-900 pb-2">Education</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900 uppercase">{edu.institution}</h3>
                    <p className="text-sm font-medium text-slate-600 mt-1">{edu.degree} in {edu.field}</p>
                    <p className="text-xs text-slate-400 mt-1 uppercase font-bold">{edu.startDate} — {edu.endDate}</p>
                    {edu.gpa && <p className="text-xs font-bold text-slate-900 mt-2">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b-2 border-slate-900 pb-2">Competencies</h2>
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span key={i} className="text-xs font-bold text-slate-900">
                          {item}{i < skill.items.length - 1 ? ' / ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
