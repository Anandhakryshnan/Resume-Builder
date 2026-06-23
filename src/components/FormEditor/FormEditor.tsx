import React, { useState } from 'react';
import { BasicsForm } from './BasicsForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './EducationForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';
import { ChevronDown, ChevronUp, User, Briefcase, GraduationCap, FolderDot, Wrench } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection = ({ title, icon, isOpen, onToggle, children }: AccordionSectionProps) => {
  return (
    <div className="border-b border-[var(--glass-border)] last:border-0 transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 bg-transparent hover:bg-[var(--btn-hover-bg)] transition-all duration-300 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="text-[var(--app-text)] bg-[var(--btn-bg)] border border-[var(--btn-border)] p-2 rounded-none transition-colors">{icon}</div>
          <h2 className="text-lg font-bold text-[var(--app-text)] tracking-widest uppercase transition-colors">{title}</h2>
        </div>
        <div className="text-[var(--app-text-muted)] transition-colors">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export const FormEditor = () => {
  const [openSection, setOpenSection] = useState<string>('basics');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-6 border-b border-[var(--glass-border)] bg-[var(--glass-header-bg)] backdrop-blur-md sticky top-0 z-10 flex items-center justify-between transition-colors duration-300">
        <div>
          <h2 className="text-2xl font-black text-[var(--app-text)] tracking-widest uppercase transition-colors">Editor</h2>
          <p className="text-xs text-[var(--app-text-muted)] mt-1 uppercase tracking-wider transition-colors">Real-time dynamic updates</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-[var(--app-text-muted)] scrollbar-track-transparent">
        <AccordionSection
          title="Personal Details"
          icon={<User size={20} />}
          isOpen={openSection === 'basics'}
          onToggle={() => toggleSection('basics')}
        >
          <BasicsForm />
        </AccordionSection>

        <AccordionSection
          title="Work Experience"
          icon={<Briefcase size={20} />}
          isOpen={openSection === 'work'}
          onToggle={() => toggleSection('work')}
        >
          <WorkExperienceForm />
        </AccordionSection>

        <AccordionSection
          title="Education"
          icon={<GraduationCap size={20} />}
          isOpen={openSection === 'education'}
          onToggle={() => toggleSection('education')}
        >
          <EducationForm />
        </AccordionSection>

        <AccordionSection
          title="Projects"
          icon={<FolderDot size={20} />}
          isOpen={openSection === 'projects'}
          onToggle={() => toggleSection('projects')}
        >
          <ProjectsForm />
        </AccordionSection>

        <AccordionSection
          title="Skills"
          icon={<Wrench size={20} />}
          isOpen={openSection === 'skills'}
          onToggle={() => toggleSection('skills')}
        >
          <SkillsForm />
        </AccordionSection>
      </div>
    </div>
  );
};
