
import React from 'react';
import { ResumeData, TemplateType } from '../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

interface PreviewProps {
  data: ResumeData;
  template: TemplateType;
  themeColor: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + '-01'); // Append day to make it parsable
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// --- Modern Template Components ---
const ModernTemplate: React.FC<{ data: ResumeData; themeColor: string }> = ({ data, themeColor }) => {
  const EducationBlock = () => (
    <>
      {data.education.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-1 mb-3">Education</h3>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="font-bold text-white">{edu.institution}</div>
                <div className="text-xs text-slate-400">{edu.degree} in {edu.fieldOfStudy}</div>
                <div className="text-xs text-slate-500 italic">
                  {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const SkillsBlock = () => (
    <>
      {data.skills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-1 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span key={skill.id} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-200">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const ExperienceBlock = () => (
    <>
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">
            {data.experienceLevel === 'fresher' ? 'Internships' : 'Experience'}
          </h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>
                    {exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span>
                </div>
                <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed pl-1 border-l-2 border-slate-100 transition-colors" style={{ borderLeftColor: themeColor + '40' }}>
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );

  const ProjectsBlock = () => (
    <>
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">{proj.name}</h3>
                    {proj.link && <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: themeColor }}><ExternalLink size={12}/></a>}
                </div>
                {proj.technologies && <div className="text-xs mb-1 font-mono" style={{ color: themeColor }}>{proj.technologies}</div>}
                <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );

  return (
    <div className="w-full min-h-full bg-white flex flex-row print:h-auto">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-white p-6 flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold uppercase tracking-wide break-words">{data.personalInfo.fullName}</h1>
          <p className="font-medium" style={{ color: themeColor }}>{data.personalInfo.jobTitle}</p>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} className="shrink-0" /> <span className="break-all">{data.personalInfo.email}</span></div>}
          {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} className="shrink-0" /> <span>{data.personalInfo.phone}</span></div>}
          {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} className="shrink-0" /> <span>{data.personalInfo.location}</span></div>}
          {data.personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} className="shrink-0" /> <span className="break-all">{data.personalInfo.website}</span></div>}
          {data.personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} className="shrink-0" /> <span className="break-all">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span></div>}
          {data.personalInfo.github && <div className="flex items-center gap-2"><Github size={14} className="shrink-0" /> <span className="break-all">{data.personalInfo.github.replace(/^https?:\/\//, '')}</span></div>}
        </div>

        <EducationBlock />
        <SkillsBlock />
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 flex flex-col gap-6 text-slate-800">
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-3">Profile</h2>
            <p className="text-sm leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Logic for Fresher vs Experienced Order */}
        {data.experienceLevel === 'fresher' ? (
          <>
            <ProjectsBlock />
            <ExperienceBlock />
          </>
        ) : (
          <>
            <ExperienceBlock />
            <ProjectsBlock />
          </>
        )}
      </div>
    </div>
  );
};

// --- Classic Template Components ---
const ClassicTemplate: React.FC<{ data: ResumeData; themeColor: string }> = ({ data, themeColor }) => {
  const ExperienceSection = () => (
    <>
      {data.experience.length > 0 && (
        <section>
          <h3 className="font-sans font-bold text-sm uppercase tracking-widest border-b border-gray-300 mb-4 text-gray-500">
            {data.experienceLevel === 'fresher' ? 'Internships' : 'Professional Experience'}
          </h3>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1 font-sans">
                  <h4 className="font-bold text-gray-900" style={{ color: themeColor }}>{exp.company}</h4>
                  <span className="text-sm text-gray-500 italic">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                    <div className="text-base font-semibold italic text-gray-700">{exp.position}</div>
                    <div className="text-xs text-gray-500">{exp.location}</div>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-line pl-2">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );

  const EducationSection = () => (
    <>
      {data.education.length > 0 && (
          <section>
          <h3 className="font-sans font-bold text-sm uppercase tracking-widest border-b border-gray-300 mb-3 text-gray-500">Education</h3>
          <div className="space-y-3">
              {data.education.map(edu => (
              <div key={edu.id}>
                  <div className="font-bold">{edu.institution}</div>
                  <div className="text-sm italic">{edu.degree}, {edu.fieldOfStudy}</div>
                  <div className="text-xs text-gray-500 font-sans mt-1">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
              </div>
              ))}
          </div>
          </section>
      )}
    </>
  );

  const ProjectsAndSkillsSection = () => (
    <>
      {(data.skills.length > 0 || data.projects.length > 0) && (
             <section>
                {data.skills.length > 0 && (
                    <div className="mb-5">
                        <h3 className="font-sans font-bold text-sm uppercase tracking-widest border-b border-gray-300 mb-3 text-gray-500">Skills</h3>
                        <div className="text-sm leading-relaxed">
                            {data.skills.map(s => s.name).join(' • ')}
                        </div>
                    </div>
                )}
                {data.projects.length > 0 && (
                    <div>
                         <h3 className="font-sans font-bold text-sm uppercase tracking-widest border-b border-gray-300 mb-3 text-gray-500">Projects</h3>
                         <div className="space-y-3">
                            {data.projects.map(p => (
                                <div key={p.id}>
                                    <div className="font-bold text-sm">{p.name}</div>
                                    <p className="text-xs text-gray-600">{p.description}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                )}
             </section>
        )}
    </>
  );

  return (
    <div className="w-full min-h-full bg-white p-8 md:p-12 text-gray-800 font-serif print:h-auto">
      <header className="border-b-2 pb-6 mb-6 text-center" style={{ borderColor: themeColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2" style={{ color: themeColor }}>{data.personalInfo.fullName}</h1>
        <p className="text-lg italic text-gray-600 mb-3">{data.personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 font-sans">
          {data.personalInfo.email && <span className="flex items-center gap-1"><Mail size={12}/> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-1 border-l border-gray-300 pl-3"><Phone size={12}/> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="flex items-center gap-1 border-l border-gray-300 pl-3"><MapPin size={12}/> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span className="flex items-center gap-1 border-l border-gray-300 pl-3"><Linkedin size={12}/> LinkedIn</span>}
        </div>
      </header>

      <div className="space-y-6">
        {data.personalInfo.summary && (
          <section>
              <h3 className="font-sans font-bold text-sm uppercase tracking-widest border-b border-gray-300 mb-3 text-gray-500">Summary</h3>
              <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Fresher/Experienced Layout Switching */}
        {data.experienceLevel === 'fresher' ? (
           <>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EducationSection />
                <ProjectsAndSkillsSection />
             </div>
             <ExperienceSection />
           </>
        ) : (
           <>
             <ExperienceSection />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <EducationSection />
               <ProjectsAndSkillsSection />
             </div>
           </>
        )}
      </div>
    </div>
  );
};

// --- Minimal Template Components ---
const MinimalTemplate: React.FC<{ data: ResumeData; themeColor: string }> = ({ data, themeColor }) => {
  
  const ExperienceBlock = () => (
    <>
       {data.experience.length > 0 && (
            <section>
                <h6 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: themeColor }}>
                  {data.experienceLevel === 'fresher' ? 'Internships' : 'Experience'}
                </h6>
                <div className="space-y-6 border-l border-gray-200 pl-6 ml-1">
                    {data.experience.map(exp => (
                        <div key={exp.id} className="relative">
                            <div className="absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                                <span className="text-xs text-gray-400 font-mono">{formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">{exp.company}, {exp.location}</div>
                            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</div>
                        </div>
                    ))}
                </div>
            </section>
        )}
    </>
  );

  const EducationBlock = () => (
    <>
      {data.education.length > 0 && (
        <section>
            <h6 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: themeColor }}>Education</h6>
            <div className="space-y-4">
                {data.education.map(edu => (
                    <div key={edu.id}>
                        <div className="font-medium text-sm">{edu.institution}</div>
                        <div className="text-sm text-gray-600">{edu.degree}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{edu.fieldOfStudy}</div>
                    </div>
                ))}
            </div>
        </section>
      )}
    </>
  );

  const SkillsBlock = () => (
    <>
      {data.skills.length > 0 && (
          <section>
            <h6 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: themeColor }}>Skills</h6>
            <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                    <span key={skill.id} className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-sm">
                        {skill.name}
                    </span>
                ))}
            </div>
          </section>
      )}
    </>
  );

  const ProjectsBlock = () => (
     <>
        {data.projects.length > 0 && (
           <section>
              <h6 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: themeColor }}>Projects</h6>
              <div className="space-y-4 border-l border-gray-200 pl-6 ml-1">
                 {data.projects.map(proj => (
                    <div key={proj.id} className="relative">
                       <div className="absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                       <div className="font-medium text-sm text-gray-900 mb-1">{proj.name}</div>
                       <div className="text-xs text-gray-500 mb-2">{proj.technologies}</div>
                       <p className="text-sm text-gray-600">{proj.description}</p>
                    </div>
                 ))}
              </div>
           </section>
        )}
     </>
  );

  return (
    <div className="w-full min-h-full bg-white p-10 text-gray-900 font-sans print:h-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-light mb-1" style={{ color: themeColor }}>{data.personalInfo.fullName}</h1>
        <div className="text-xl font-light text-gray-500 mb-4">{data.personalInfo.jobTitle}</div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.linkedin && <span>linkedin.com/in/{data.personalInfo.linkedin.split('/').pop()}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </header>
  
      <div className="flex flex-col gap-8">
        {data.personalInfo.summary && (
            <div>
                <p className="text-sm leading-6 text-gray-700 max-w-2xl">{data.personalInfo.summary}</p>
            </div>
        )}

        {/* Fresher vs Experienced Order */}
        {data.experienceLevel === 'fresher' ? (
           <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <EducationBlock />
                 <SkillsBlock />
              </div>
              <ProjectsBlock />
              <ExperienceBlock />
           </>
        ) : (
           <>
              <ExperienceBlock />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <EducationBlock />
                 <SkillsBlock />
              </div>
              <ProjectsBlock />
           </>
        )}
      </div>
    </div>
  );
};

// --- Elegant Template Components ---
const ElegantTemplate: React.FC<{ data: ResumeData; themeColor: string }> = ({ data, themeColor }) => {
  const ExperienceSection = () => (
    <>
      {data.experience.length > 0 && (
           <section className="mb-8">
             <h2 className="text-xs font-bold uppercase tracking-wider mb-4 pb-1 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                {data.experienceLevel === 'fresher' ? 'Internships' : 'Experience'}
             </h2>
             <div className="space-y-6">
               {data.experience.map(exp => (
                 <div key={exp.id}>
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                   </div>
                   <div className="text-sm font-medium mb-2 text-gray-600" style={{ color: themeColor }}>{exp.company}</div>
                   <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">{exp.description}</p>
                 </div>
               ))}
             </div>
           </section>
        )}
    </>
  );

  const ProjectsSection = () => (
    <>
      {data.projects.length > 0 && (
           <section className="mb-8">
             <h2 className="text-xs font-bold uppercase tracking-wider mb-4 pb-1 border-b" style={{ color: themeColor, borderColor: themeColor }}>Projects</h2>
             <div className="space-y-4">
               {data.projects.map(proj => (
                 <div key={proj.id}>
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{proj.name}</h3>
                      {proj.link && <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={{ color: themeColor }}>Link</a>}
                   </div>
                   <div className="text-xs text-gray-500 mb-1">{proj.technologies}</div>
                   <p className="text-sm leading-relaxed text-gray-600">{proj.description}</p>
                 </div>
               ))}
             </div>
           </section>
        )}
    </>
  );

  const EducationSideBlock = () => (
    <>
      {data.education.length > 0 && (
           <section className="mb-8">
             <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-400">Education</h2>
             <div className="space-y-4">
               {data.education.map(edu => (
                <div key={edu.id}>
                    <div className="font-bold text-sm text-gray-800">{edu.institution}</div>
                    <div className="text-xs text-gray-600 mb-1">{edu.degree}</div>
                    <div className="text-xs text-gray-400">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</div>
                </div>
               ))}
             </div>
           </section>
         )}
    </>
  );

  const EducationMainBlock = () => (
     <>
        {data.education.length > 0 && (
           <section className="mb-8">
             <h2 className="text-xs font-bold uppercase tracking-wider mb-4 pb-1 border-b" style={{ color: themeColor, borderColor: themeColor }}>Education</h2>
             <div className="space-y-4">
               {data.education.map(edu => (
                <div key={edu.id}>
                    <div className="font-bold text-gray-900">{edu.institution}</div>
                    <div className="text-sm text-gray-600 mb-1" style={{ color: themeColor }}>{edu.degree}</div>
                    <div className="text-sm text-gray-500">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</div>
                </div>
               ))}
             </div>
           </section>
        )}
     </>
  );

  return (
    <div className="w-full min-h-full bg-white flex flex-col font-sans text-gray-800 print:h-auto">
      {/* Header */}
      <header className="px-8 pt-10 pb-6 text-center border-b border-gray-100">
        <h1 className="text-4xl font-bold font-serif mb-2" style={{ color: themeColor }}>{data.personalInfo.fullName}</h1>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 mb-6">{data.personalInfo.jobTitle}</div>
      </header>

      <div className="flex flex-1">
        {/* Left Column (Main Content) */}
        <div className="w-2/3 p-8 pr-6 border-r border-gray-100">
          {data.personalInfo.summary && (
             <section className="mb-8">
               <h2 className="text-xs font-bold uppercase tracking-wider mb-4 pb-1 border-b" style={{ color: themeColor, borderColor: themeColor }}>Profile</h2>
               <p className="text-sm leading-relaxed text-gray-600">{data.personalInfo.summary}</p>
             </section>
          )}

          {/* Fresher vs Experienced Order for Elegant */}
          {data.experienceLevel === 'fresher' ? (
             <>
                <EducationMainBlock />
                <ProjectsSection />
                <ExperienceSection />
             </>
          ) : (
             <>
                <ExperienceSection />
                <ProjectsSection />
             </>
          )}
        </div>

        {/* Right Column (Sidebar info) */}
        <div className="w-1/3 p-8 pl-6 bg-gray-50/50">
           <section className="mb-8">
               <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-400">Contact</h2>
               <div className="space-y-3 text-sm text-gray-600">
                  {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} className="shrink-0 text-gray-400" /> <span className="break-all">{data.personalInfo.email}</span></div>}
                  {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} className="shrink-0 text-gray-400" /> <span>{data.personalInfo.phone}</span></div>}
                  {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} className="shrink-0 text-gray-400" /> <span>{data.personalInfo.location}</span></div>}
                  {data.personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} className="shrink-0 text-gray-400" /> <span className="break-all">{data.personalInfo.website}</span></div>}
                  {data.personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} className="shrink-0 text-gray-400" /> <span className="break-all">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span></div>}
                  {data.personalInfo.github && <div className="flex items-center gap-2"><Github size={14} className="shrink-0 text-gray-400" /> <span className="break-all">{data.personalInfo.github.replace(/^https?:\/\//, '')}</span></div>}
               </div>
           </section>

           {/* In Elegant, Experienced has Edu in sidebar. Fresher has it in Main. */}
           {data.experienceLevel === 'experienced' && (
              <EducationSideBlock />
           )}

           {data.skills.length > 0 && (
             <section>
               <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-400">Skills</h2>
               <div className="flex flex-col gap-2">
                 {data.skills.map(skill => (
                   <div key={skill.id} className="text-sm text-gray-700 pb-2 border-b border-gray-100 last:border-0">
                      {skill.name}
                   </div>
                 ))}
               </div>
             </section>
           )}
        </div>
      </div>
    </div>
  );
};

export const Preview: React.FC<PreviewProps> = ({ data, template, themeColor }) => {
  return (
    <div id="resume-preview" className="w-full min-h-full bg-white shadow-2xl print:shadow-none overflow-hidden text-left origin-top transform-gpu print:overflow-visible print:h-auto">
      {template === TemplateType.MODERN && <ModernTemplate data={data} themeColor={themeColor} />}
      {template === TemplateType.CLASSIC && <ClassicTemplate data={data} themeColor={themeColor} />}
      {template === TemplateType.MINIMAL && <MinimalTemplate data={data} themeColor={themeColor} />}
      {template === TemplateType.ELEGANT && <ElegantTemplate data={data} themeColor={themeColor} />}
    </div>
  );
};
