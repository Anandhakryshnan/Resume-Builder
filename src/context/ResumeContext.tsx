import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData, Basics, WorkExperience, Education, Project, SkillCategory } from '../types/resume';
import { initialData } from '../utils/initialData';

// Action Types
type Action =
  | { type: 'SET_RESUME_DATA'; payload: ResumeData }
  | { type: 'UPDATE_BASICS'; payload: Partial<Basics> }
  | { type: 'ADD_WORK_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'DELETE_WORK_EXPERIENCE'; payload: string }
  | { type: 'REORDER_WORK_EXPERIENCE'; payload: WorkExperience[] }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'REORDER_EDUCATION'; payload: Education[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'REORDER_PROJECT'; payload: Project[] }
  | { type: 'ADD_SKILL_CATEGORY'; payload: SkillCategory }
  | { type: 'UPDATE_SKILL_CATEGORY'; payload: { id: string; data: Partial<SkillCategory> } }
  | { type: 'DELETE_SKILL_CATEGORY'; payload: string }
  | { type: 'REORDER_SKILL_CATEGORY'; payload: SkillCategory[] }
  | { type: 'REORDER_MAIN_SECTIONS'; payload: string[] };

const LOCAL_STORAGE_KEY = 'resume-builder-data';

// Reducer Function
const resumeReducer = (state: ResumeData, action: Action): ResumeData => {
  switch (action.type) {
    case 'SET_RESUME_DATA':
      return action.payload;
    case 'UPDATE_BASICS':
      return { ...state, basics: { ...state.basics, ...action.payload } };
    
    // Work Experience
    case 'ADD_WORK_EXPERIENCE':
      return { ...state, workExperience: [...state.workExperience, action.payload] };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
      };
    case 'DELETE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.filter((exp) => exp.id !== action.payload),
      };
    case 'REORDER_WORK_EXPERIENCE':
      return { ...state, workExperience: action.payload };

    // Education
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
      };
    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
      };
    case 'REORDER_EDUCATION':
      return { ...state, education: action.payload };

    // Projects
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((proj) => proj.id !== action.payload),
      };
    case 'REORDER_PROJECT':
      return { ...state, projects: action.payload };

    // Skills
    case 'ADD_SKILL_CATEGORY':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'UPDATE_SKILL_CATEGORY':
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
        ),
      };
    case 'DELETE_SKILL_CATEGORY':
      return {
        ...state,
        skills: state.skills.filter((skill) => skill.id !== action.payload),
      };
    case 'REORDER_SKILL_CATEGORY':
      return { ...state, skills: action.payload };

    case 'REORDER_MAIN_SECTIONS':
      return { ...state, sectionOrder: action.payload };

    default:
      return state;
  }
};

// Context setup
interface ResumeContextProps {
  state: ResumeData;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

const init = (initialState: ResumeData): ResumeData => {
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) {
      const parsed = JSON.parse(localData);
      if (!parsed.sectionOrder) {
        parsed.sectionOrder = ['workExperience', 'education', 'projects', 'skills'];
      }
      return parsed;
    }
    return initialState;
  } catch (error) {
    console.error('Failed to parse resume data from local storage', error);
    return initialState;
  }
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialData, init);

  // Auto-save to localStorage with a simple debounce via timeout
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }, 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
