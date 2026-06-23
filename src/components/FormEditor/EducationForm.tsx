import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';
import type { Education } from '../../types/resume';

export const EducationForm = () => {
  const { state, dispatch } = useResume();
  const { education } = state;

  const handleAdd = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      areaOfStudy: '',
      graduationDate: '',
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEdu });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, data: { [field]: value } },
    });
  };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="p-5 border border-[var(--glass-border)] rounded-2xl bg-white/5 relative group hover:bg-white/10 transition-colors">
          <button
            onClick={() => handleDelete(edu.id)}
            className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
            title="Delete Education"
          >
            <Trash2 size={18} />
          </button>
          
          <h3 className="text-sm font-semibold text-slate-200 mb-4 pr-8">Education {index + 1}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="University Name"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="Bachelor of Science"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Area of Study</label>
              <input
                type="text"
                value={edu.areaOfStudy}
                onChange={(e) => handleChange(edu.id, 'areaOfStudy', e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="Computer Science"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Graduation Date</label>
              <input
                type="text"
                value={edu.graduationDate}
                onChange={(e) => handleChange(edu.id, 'graduationDate', e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="May 2024"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-3.5 border-2 border-dashed border-white/20 rounded-xl text-[var(--app-text)] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        <Plus size={18} /> Add Education
      </button>
    </div>
  );
};
