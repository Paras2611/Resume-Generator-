import React, { useState } from 'react';
import { ResumeData, Experience, Education, Skill, Project } from '../types';
import { Input, TextArea } from './ui/Input';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const SectionHeader: React.FC<{ 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  action?: React.ReactNode 
}> = ({ title, isOpen, onToggle, action }) => (
  <div className="flex items-center justify-between py-3 px-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer select-none" onClick={onToggle}>
    <div className="flex items-center gap-2 font-medium text-gray-700">
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      {title}
    </div>
    <div onClick={e => e.stopPropagation()}>
      {action}
    </div>
  </div>
);

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string | null>('personal');

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: 'New Company',
      position: 'Job Title',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
    setActiveSection('experience');
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: 'University',
      degree: 'Degree',
      fieldOfStudy: 'Field',
      startDate: '',
      endDate: '',
      current: false
    };
    onChange({ ...data, education: [newEdu, ...data.education] });
    setActiveSection('education');
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = { id: Date.now().toString(), name: 'New Skill', level: 'Intermediate' };
    onChange({ ...data, skills: [...data.skills, newSkill] });
    setActiveSection('skills');
  };

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  const updateSkill = (id: string, name: string) => {
    onChange({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, name } : s)
    });
  };
  
  const addProject = () => {
    const newProj: Project = { 
        id: Date.now().toString(), 
        name: 'New Project', 
        description: '', 
        link: '', 
        technologies: '' 
    };
    onChange({ ...data, projects: [newProj, ...data.projects] });
    setActiveSection('projects');
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-sm border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Editor</h2>
        <p className="text-xs text-gray-500">Edit your details below</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Personal Info */}
        <div className="border-b border-gray-100">
          <SectionHeader 
            title="Personal Information" 
            isOpen={activeSection === 'personal'} 
            onToggle={() => toggleSection('personal')} 
          />
          {activeSection === 'personal' && (
            <div className="p-4 space-y-4 bg-white animate-in slide-in-from-top-2 duration-200">
              <Input label="Full Name" value={data.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} />
              <Input label="Job Title" value={data.personalInfo.jobTitle} onChange={e => updatePersonalInfo('jobTitle', e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email" value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
                <Input label="Phone" value={data.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
              </div>
              <Input label="Location" value={data.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Website" value={data.personalInfo.website} onChange={e => updatePersonalInfo('website', e.target.value)} />
                <Input label="LinkedIn" value={data.personalInfo.linkedin} onChange={e => updatePersonalInfo('linkedin', e.target.value)} />
              </div>
              <Input label="GitHub" value={data.personalInfo.github} onChange={e => updatePersonalInfo('github', e.target.value)} />
              <TextArea label="Professional Summary" value={data.personalInfo.summary} onChange={e => updatePersonalInfo('summary', e.target.value)} />
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="border-b border-gray-100">
          <SectionHeader 
            title="Experience" 
            isOpen={activeSection === 'experience'} 
            onToggle={() => toggleSection('experience')}
            action={<button onClick={addExperience} className="p-1 hover:bg-blue-50 text-blue-600 rounded"><Plus size={16} /></button>}
          />
          {activeSection === 'experience' && (
            <div className="p-2 space-y-2 bg-gray-50">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">#{index + 1} {exp.company}</h4>
                    <button onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                  <div className="space-y-3">
                    <Input label="Company" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                    <Input label="Position" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Start Date" type="month" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} />
                        <div className="flex flex-col gap-1.5">
                            <Input 
                                label="End Date" 
                                type="month" 
                                value={exp.endDate} 
                                disabled={exp.current}
                                onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} 
                            />
                            <div className="flex items-center gap-2 mt-1">
                                <input 
                                    type="checkbox" 
                                    id={`current-${exp.id}`}
                                    checked={exp.current}
                                    onChange={e => updateExperience(exp.id, 'current', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor={`current-${exp.id}`} className="text-xs text-gray-600">I currently work here</label>
                            </div>
                        </div>
                    </div>
                    <Input label="Location" value={exp.location} onChange={e => updateExperience(exp.id, 'location', e.target.value)} />
                    <TextArea label="Description" value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} placeholder="• Achieved X by doing Y..." />
                  </div>
                </div>
              ))}
              {data.experience.length === 0 && <p className="text-center text-sm text-gray-400 py-4">No experience added yet.</p>}
            </div>
          )}
        </div>

        {/* Education */}
        <div className="border-b border-gray-100">
          <SectionHeader 
            title="Education" 
            isOpen={activeSection === 'education'} 
            onToggle={() => toggleSection('education')}
            action={<button onClick={addEducation} className="p-1 hover:bg-blue-50 text-blue-600 rounded"><Plus size={16} /></button>}
          />
          {activeSection === 'education' && (
            <div className="p-2 space-y-2 bg-gray-50">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">#{index + 1} {edu.institution}</h4>
                    <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                  <div className="space-y-3">
                    <Input label="Institution" value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} />
                    <Input label="Degree" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                    <Input label="Field of Study" value={edu.fieldOfStudy} onChange={e => updateEducation(edu.id, 'fieldOfStudy', e.target.value)} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Start Date" type="month" value={edu.startDate} onChange={e => updateEducation(edu.id, 'startDate', e.target.value)} />
                        <Input label="End Date" type="month" value={edu.endDate} onChange={e => updateEducation(edu.id, 'endDate', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="border-b border-gray-100">
          <SectionHeader 
            title="Projects" 
            isOpen={activeSection === 'projects'} 
            onToggle={() => toggleSection('projects')}
            action={<button onClick={addProject} className="p-1 hover:bg-blue-50 text-blue-600 rounded"><Plus size={16} /></button>}
          />
          {activeSection === 'projects' && (
            <div className="p-2 space-y-2 bg-gray-50">
              {data.projects.map((proj, index) => (
                <div key={proj.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">#{index + 1} {proj.name}</h4>
                    <button onClick={() => removeProject(proj.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                  <div className="space-y-3">
                    <Input label="Project Name" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} />
                    <Input label="Technologies" value={proj.technologies} onChange={e => updateProject(proj.id, 'technologies', e.target.value)} />
                    <Input label="Link" value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)} />
                    <TextArea label="Description" value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="border-b border-gray-100">
          <SectionHeader 
            title="Skills" 
            isOpen={activeSection === 'skills'} 
            onToggle={() => toggleSection('skills')}
            action={<button onClick={addSkill} className="p-1 hover:bg-blue-50 text-blue-600 rounded"><Plus size={16} /></button>}
          />
          {activeSection === 'skills' && (
            <div className="p-4 bg-gray-50">
              <div className="grid grid-cols-1 gap-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                    <GripVertical size={14} className="text-gray-300 cursor-move" />
                    <input 
                      className="flex-1 text-sm outline-none"
                      value={skill.name}
                      onChange={e => updateSkill(skill.id, e.target.value)}
                      placeholder="Skill name"
                    />
                    <button onClick={() => removeSkill(skill.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};