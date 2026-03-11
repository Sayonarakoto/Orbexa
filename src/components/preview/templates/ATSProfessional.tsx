import { ResumeData } from '@/lib/types';

export function ATSProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-12 font-sans text-slate-900 bg-white min-h-[1100px] leading-normal">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-4 text-sm text-slate-600">
          <span>{personalInfo.email}</span>
          <span className="text-slate-300">•</span>
          <span>{personalInfo.phone}</span>
          <span className="text-slate-300">•</span>
          <span>{personalInfo.location}</span>
          {personalInfo.website && (
            <>
              <span className="text-slate-300">•</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 border-b-2 border-slate-100 pb-1">Profile</h2>
          <p className="text-[13px] leading-relaxed text-slate-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b-2 border-slate-100 pb-1">Work History</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.company}</h3>
                  <span className="text-xs font-semibold text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">{exp.role}</span>
                  <span className="text-xs text-slate-400">{exp.location}</span>
                </div>
                <ul className="list-disc pl-5 text-[13px] text-slate-600 space-y-1.5">
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

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b-2 border-slate-100 pb-1">Core Competencies</h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id}>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase mb-1">{skill.category}</h3>
                <p className="text-[13px] text-slate-600">{skill.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b-2 border-slate-100 pb-1">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                  <p className="text-[13px] text-slate-600">{edu.degree} in {edu.field}</p>
                  {edu.gpa && <p className="text-xs font-bold text-slate-400 mt-1">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-xs font-semibold text-slate-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
