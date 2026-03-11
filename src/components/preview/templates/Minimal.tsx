import { ResumeData } from '@/lib/types';

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-12 font-body text-gray-900 bg-white min-h-[1100px] text-center">
      <header className="mb-12">
        {personalInfo.profileImage && (
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-100">
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold uppercase tracking-[0.2em] mb-4">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="flex justify-center flex-wrap gap-x-6 text-[11px] text-gray-500 uppercase tracking-widest">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      <div className="max-w-[640px] mx-auto space-y-12">
        {personalInfo.summary && (
          <section className="text-left">
            <h2 className="text-[10px] font-bold border-b border-gray-200 uppercase tracking-[0.3em] mb-4 pb-2 text-gray-400">Profile</h2>
            <p className="text-[13px] leading-relaxed text-gray-600 text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="text-left">
            <h2 className="text-[10px] font-bold border-b border-gray-200 uppercase tracking-[0.3em] mb-6 pb-2 text-gray-400">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold uppercase text-[14px]">{exp.company || 'COMPANY'}</h3>
                    <span className="text-[11px] text-gray-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-4 italic text-[13px] text-gray-500">
                    <span>{exp.role || 'Job Title'}</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-gray-600">
                    {exp.bulletPoints.length > 0 ? (
                      exp.bulletPoints.map((bp, idx) => (
                        <li key={idx} className="flex gap-4">
                          <span className="text-gray-300">—</span>
                          {bp}
                        </li>
                      ))
                    ) : (
                      <li className="flex gap-4"><span className="text-gray-300">—</span>{exp.description}</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="text-left">
            <h2 className="text-[10px] font-bold border-b border-gray-200 uppercase tracking-[0.3em] mb-6 pb-2 text-gray-400">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[14px] uppercase">{edu.institution}</h3>
                    <span className="text-[11px] text-gray-400">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-[13px] text-gray-600 italic">
                    {edu.degree}{edu.field ? `, ${edu.field}` : ''} {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="text-left">
            <h2 className="text-[10px] font-bold border-b border-gray-200 uppercase tracking-[0.3em] mb-6 pb-2 text-gray-400">Skills</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <h3 className="text-[11px] font-bold uppercase mb-1">{skill.category}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{skill.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
