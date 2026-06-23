import { useState, useEffect } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { FormEditor } from './components/FormEditor/FormEditor';
import { ResumePreview } from './components/ResumePreview/ResumePreview';
import { FileDown, FileSignature, Sun, Moon, FileText, MailOpen } from 'lucide-react';

export type AppMode = 'resume' | 'cover-letter';

const Header = ({ theme, toggleTheme, mode, setMode }: { theme: string, toggleTheme: () => void, mode: AppMode, setMode: (mode: AppMode) => void }) => {
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="no-print w-full px-2 sm:px-4 pt-4 pb-2 z-50">
      <header className="glass-header max-w-7xl mx-auto rounded-2xl px-4 sm:px-6 py-4 flex flex-col lg:flex-row items-center justify-between shadow-2xl gap-4 lg:gap-0">
        <h1 className="text-xl sm:text-2xl font-black text-[var(--app-text)] flex items-center gap-2 sm:gap-3 tracking-widest uppercase transition-colors">
          <div className="relative flex items-center justify-center bg-transparent w-8 h-8 sm:w-10 sm:h-10 rounded-none border-2 border-[var(--app-text)] transition-colors">
            <FileSignature className="text-[var(--app-text)] absolute transition-colors w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span>
            Resume<span className="font-light text-[var(--app-text-muted)] transition-colors">Builder</span>
          </span>
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <div className="flex bg-[var(--btn-bg)] border border-[var(--btn-border)] rounded-full p-1 sm:mr-2">
            <button
              onClick={() => setMode('resume')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${mode === 'resume' ? 'bg-[var(--accent-color)] text-[var(--accent-color-inverse)] shadow-md' : 'text-[var(--app-text)] hover:text-[var(--accent-color)]'}`}
            >
              <FileText size={16} /> <span className="hidden sm:inline">Resume</span><span className="sm:hidden">CV</span>
            </button>
            <button
              onClick={() => setMode('cover-letter')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${mode === 'cover-letter' ? 'bg-[var(--accent-color)] text-[var(--accent-color-inverse)] shadow-md' : 'text-[var(--app-text)] hover:text-[var(--accent-color)]'}`}
            >
              <MailOpen size={16} /> <span className="hidden sm:inline">Cover Letter</span><span className="sm:hidden">Letter</span>
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] text-[var(--app-text)] border border-[var(--btn-border)] transition-all duration-300 hover:scale-110 flex-shrink-0"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 text-xs font-bold text-[var(--accent-color-inverse)] bg-[var(--accent-color)] rounded-full uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_20px_var(--glass-border)] hover:shadow-[0_0_30px_var(--glass-border)] flex-shrink-0"
          >
            <FileDown size={16} /> <span className="hidden sm:inline">Download</span><span className="sm:hidden">PDF</span>
          </button>
        </div>
      </header>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'dark' | 'light') || 'dark';
  });
  const [mode, setMode] = useState<AppMode>('resume');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-[var(--app-bg-color)] transition-colors duration-300">
        <Header theme={theme} toggleTheme={toggleTheme} mode={mode} setMode={setMode} />
        
        <main className="flex-1 flex flex-col lg:flex-row gap-6 p-4 pb-8 lg:pb-0 max-w-[1600px] mx-auto w-full relative z-10 lg:h-[calc(100vh-130px)]">
          <div className="w-full lg:w-[400px] xl:w-[450px] glass-panel rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[60vh] lg:h-full relative group transition-all duration-300 flex-shrink-0">
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--glass-border)] to-transparent pointer-events-none opacity-50"></div>
            <FormEditor mode={mode} />
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl h-[80vh] lg:h-full scrollbar-thin scrollbar-thumb-[var(--app-text-muted)] scrollbar-track-transparent print-wrapper transition-all duration-300">
            <ResumePreview mode={mode} />
          </div>
        </main>
        
        <footer className="w-full text-center py-4 text-xs text-[var(--app-text-muted)] uppercase tracking-widest relative z-10 no-print transition-colors">
          © 2026 Anandha Krishnan. All rights reserved.
        </footer>
      </div>
    </ResumeProvider>
  );
}

export default App;
