import { ResumeData } from '@/lib/types';

export function ATSStandardTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-12 font-serif text-black bg-white min-h-[1100px] leading-tight">
      {/* Header - No Graphics, Just Text */}
      <header className="text-center mb-6 border-b border-black pb-4">
        <h1 className="text-2xl font-bold uppercase mb-1">{personalInfo.fullName || 'FULL NAME'}</h1>
        <div className="text-[12px]">
          {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
          {personalInfo.website && ` | ${personalInfo.website}`}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-1">Professional Summary</h2>
          <p className="text-[12px] text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[12px]">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between italic text-[12px] mb-1">
                  <span>{exp.role}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc pl-5 text-[12px] space-y-1">
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
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-1">Skills</h2>
          <div className="space-y-1">
            {skills.map((skill) => (
              <p key={skill.id} className="text-[12px]">
                <span className="font-bold">{skill.category}:</span> {skill.items.join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-2">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-[12px]">
                <div>
                  <span className="font-bold">{edu.institution}</span>, {edu.location}
                  <br />
                  <span className="italic">{edu.degree} in {edu.field}</span>
                  {edu.gpa && <span> | GPA: {edu.gpa}</span>}
                </div>
                <div className="font-bold">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
