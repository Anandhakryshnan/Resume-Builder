import { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { initialData } from '../../utils/initialData';
import { Download, Upload, Trash2, Wand2 } from 'lucide-react';
import type { ResumeData } from '../../types/resume';

export const DataActions = () => {
  const { state, dispatch } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resume_data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content) as ResumeData;
        
        // Basic validation
        if (parsedData && parsedData.basics && parsedData.workExperience) {
          dispatch({ type: 'SET_RESUME_DATA', payload: parsedData });
        } else {
          alert('Invalid resume data file.');
        }
      } catch (error) {
        alert('Failed to parse the file. Please ensure it is a valid JSON.');
      }
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be loaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadDemo = () => {
    if (window.confirm('This will overwrite your current resume data with the demo data. Are you sure?')) {
      dispatch({ type: 'SET_RESUME_DATA', payload: initialData });
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear ALL your resume data? This cannot be undone.')) {
      const emptyData: ResumeData = {
        basics: {
          name: '',
          email: '',
          phone: '',
          website: '',
          summary: '',
          location: '',
          socialProfiles: [],
        },
        workExperience: [],
        projects: [],
        education: [],
        skills: [],
        certifications: [],
        languages: [],
        sectionOrder: ['workExperience', 'education', 'projects', 'certifications', 'skills', 'languages'],
      };
      dispatch({ type: 'SET_RESUME_DATA', payload: emptyData });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-6 p-4 border border-[var(--glass-border)] rounded-2xl bg-white/5">
      <h3 className="col-span-2 text-sm font-bold text-[var(--app-text)] tracking-widest uppercase mb-2">Data Management</h3>
      
      <button
        onClick={handleExport}
        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] border border-[var(--btn-border)] rounded-xl text-xs font-semibold text-[var(--app-text)] transition-colors duration-300"
      >
        <Download size={14} /> Export JSON
      </button>
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] border border-[var(--btn-border)] rounded-xl text-xs font-semibold text-[var(--app-text)] transition-colors duration-300"
      >
        <Upload size={14} /> Import JSON
      </button>
      <input 
        type="file" 
        accept=".json" 
        ref={fileInputRef} 
        onChange={handleImport} 
        className="hidden" 
      />

      <button
        onClick={handleLoadDemo}
        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-400 transition-colors duration-300"
      >
        <Wand2 size={14} /> Load Demo
      </button>

      <button
        onClick={handleClearAll}
        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-400 transition-colors duration-300"
      >
        <Trash2 size={14} /> Clear All
      </button>
    </div>
  );
};
