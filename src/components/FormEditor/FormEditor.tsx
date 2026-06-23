import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { BasicsForm } from './BasicsForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './EducationForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';
import { CertificationsForm } from './CertificationsForm';
import { LanguagesForm } from './LanguagesForm';
import { CustomSectionForm } from './CustomSectionForm';
import { CoverLetterForm } from './CoverLetterForm';
import { DataActions } from './DataActions';
import { ChevronDown, ChevronUp, User, Briefcase, GraduationCap, FolderDot, Wrench, Award, Languages, GripVertical, LayoutList, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  dragHandleProps?: any;
}

const AccordionSection = ({ title, icon, isOpen, onToggle, children, dragHandleProps }: AccordionSectionProps) => {
  return (
    <div className="border-b border-[var(--glass-border)] last:border-0 transition-colors duration-300 bg-[var(--app-bg-color)]">
      <div className="flex items-center w-full px-2 hover:bg-[var(--btn-hover-bg)] transition-all duration-300">
        {dragHandleProps && (
          <div {...dragHandleProps} className="text-[var(--app-text-muted)] hover:text-slate-200 cursor-grab active:cursor-grabbing p-2 pl-4">
            <GripVertical size={18} />
          </div>
        )}
        <button
          onClick={onToggle}
          className={`flex-1 flex items-center justify-between py-5 bg-transparent focus:outline-none ${dragHandleProps ? 'pr-4' : 'px-4'}`}
        >
          <div className="flex items-center gap-3">
            <div className="text-[var(--app-text)] bg-[var(--btn-bg)] border border-[var(--btn-border)] p-2 rounded-none transition-colors">{icon}</div>
            <h2 className="text-lg font-bold text-[var(--app-text)] tracking-widest uppercase transition-colors">{title}</h2>
          </div>
          <div className="text-[var(--app-text-muted)] transition-colors">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
      </div>
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

export const FormEditor = ({ mode }: { mode: 'resume' | 'cover-letter' }) => {
  const { state, dispatch } = useResume();
  const [openSection, setOpenSection] = useState<string>('basics');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(state.sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_MAIN_SECTIONS', payload: items });
  };

  const sectionConfig: Record<string, { title: string; icon: React.ReactNode; component: React.ReactNode }> = {
    workExperience: { title: "Work Experience", icon: <Briefcase size={20} />, component: <WorkExperienceForm /> },
    education: { title: "Education", icon: <GraduationCap size={20} />, component: <EducationForm /> },
    projects: { title: "Projects", icon: <FolderDot size={20} />, component: <ProjectsForm /> },
    certifications: { title: "Certifications", icon: <Award size={20} />, component: <CertificationsForm /> },
    skills: { title: "Skills", icon: <Wrench size={20} />, component: <SkillsForm /> },
    languages: { title: "Languages", icon: <Languages size={20} />, component: <LanguagesForm /> },
  };

  const handleAddCustomSection = () => {
    const newId = uuidv4();
    dispatch({ 
      type: 'ADD_CUSTOM_SECTION', 
      payload: { id: newId, name: 'New Section', items: [] } 
    });
    setOpenSection(`custom_${newId}`);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-6 border-b border-[var(--glass-border)] bg-[var(--glass-header-bg)] backdrop-blur-md sticky top-0 z-10 flex items-center justify-between transition-colors duration-300">
        <div>
          <h2 className="text-2xl font-black text-[var(--app-text)] tracking-widest uppercase transition-colors">{mode === 'cover-letter' ? 'Cover Letter' : 'Editor'}</h2>
          <p className="text-xs text-[var(--app-text-muted)] mt-1 uppercase tracking-wider transition-colors">Real-time dynamic updates</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pb-20 scrollbar-thin scrollbar-thumb-[var(--app-text-muted)] scrollbar-track-transparent">
        {mode === 'cover-letter' ? (
          <div className="p-2">
            <CoverLetterForm />
          </div>
        ) : (
          <>
            <DataActions />
            
            <AccordionSection
          title="Personal Details"
          icon={<User size={20} />}
          isOpen={openSection === 'basics'}
          onToggle={() => toggleSection('basics')}
        >
          <BasicsForm />
        </AccordionSection>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="main-sections-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {state.sectionOrder.map((sectionId, index) => {
                  let config = sectionConfig[sectionId];
                  
                  if (sectionId.startsWith('custom_')) {
                    const customId = sectionId.replace('custom_', '');
                    const customSection = state.customSections?.find(s => s.id === customId);
                    if (customSection) {
                      config = {
                        title: customSection.name || 'Untitled Section',
                        icon: <LayoutList size={20} />,
                        component: <CustomSectionForm sectionId={customId} />
                      };
                    }
                  }

                  if (!config) return null;
                  
                  return (
                    <Draggable key={sectionId} draggableId={sectionId} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={snapshot.isDragging ? 'shadow-2xl z-50 relative' : ''}
                        >
                          <AccordionSection
                            title={config.title}
                            icon={config.icon}
                            isOpen={openSection === sectionId}
                            onToggle={() => toggleSection(sectionId)}
                            dragHandleProps={provided.dragHandleProps}
                          >
                            {config.component}
                          </AccordionSection>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-6">
          <button
            onClick={handleAddCustomSection}
            className="w-full py-4 border-2 border-dashed border-[var(--glass-border)] rounded-xl text-[var(--app-text)] hover:bg-[var(--glass-border)] transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          >
            <Plus size={18} /> Add Custom Section
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  );
};
