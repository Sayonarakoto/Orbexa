import { ResumeData } from '@/lib/types';

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-12 font-body text-gray-900 bg-white min-h-[1100px] text-center">
      <header className="mb-8 pb-4 border-b">
        {personalInfo.profileImage && (
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200">
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="flex justify-center flex-wrap gap-x-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8 text-left">
          <h2 className="text-sm font-bold border-b-2 border-gray-900 uppercase tracking-widest mb-3 pb-1">Professional Profile</h2>
          <p className="text-sm italic leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8 text-left">
          <h2 className="text-sm font-bold border-b-2 border-gray-900 uppercase tracking-widest mb-4 pb-1">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold uppercase text-gray-900">{exp.company || 'COMPANY'}</h3>
                  <span className="text-sm font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2 italic text-sm text-gray-700">
                  <span>{exp.role || 'Job Title'}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
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
        <section className="mb-8 text-left">
          <h2 className="text-sm font-bold border-b-2 border-gray-900 uppercase tracking-widest mb-4 pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900 uppercase">{edu.institution || 'INSTITUTION'}</h3>
                <span className="text-sm">{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className="text-sm italic text-gray-700">
                {edu.degree}{edu.field ? `, ${edu.field}` : ''} {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
              </p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="text-left">
          <h2 className="text-sm font-bold border-b-2 border-gray-900 uppercase tracking-widest mb-4 pb-1">Key Competencies</h2>
          <div className="flex flex-wrap gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="w-1/2 flex gap-2 text-sm pr-4">
                <span className="font-bold">{skill.category}:</span>
                <span className="text-gray-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
