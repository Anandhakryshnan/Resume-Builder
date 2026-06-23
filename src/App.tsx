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
    <div className="no-print w-full px-4 pt-4 pb-2 z-50">
      <header className="glass-header max-w-7xl mx-auto rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-2xl">
        <h1 className="text-2xl font-black text-[var(--app-text)] flex items-center gap-3 mb-4 md:mb-0 tracking-widest uppercase transition-colors">
          <div className="relative flex items-center justify-center bg-transparent w-10 h-10 rounded-none border-2 border-[var(--app-text)] transition-colors">
            <FileSignature size={24} className="text-[var(--app-text)] absolute transition-colors" />
          </div>
          <span>
            Resume<span className="font-light text-[var(--app-text-muted)] transition-colors">Builder</span>
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex bg-[var(--btn-bg)] border border-[var(--btn-border)] rounded-full p-1 mr-2">
            <button
              onClick={() => setMode('resume')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'resume' ? 'bg-[var(--accent-color)] text-[var(--accent-color-inverse)] shadow-md' : 'text-[var(--app-text)] hover:text-[var(--accent-color)]'}`}
            >
              <FileText size={16} /> Resume
            </button>
            <button
              onClick={() => setMode('cover-letter')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'cover-letter' ? 'bg-[var(--accent-color)] text-[var(--accent-color-inverse)] shadow-md' : 'text-[var(--app-text)] hover:text-[var(--accent-color)]'}`}
            >
              <MailOpen size={16} /> Cover Letter
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] text-[var(--app-text)] border border-[var(--btn-border)] transition-all duration-300 hover:scale-110"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-[var(--accent-color-inverse)] bg-[var(--accent-color)] rounded-full uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_20px_var(--glass-border)] hover:shadow-[0_0_30px_var(--glass-border)]"
          >
            <FileDown size={16} /> Download
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
        
        <main className="flex-1 flex flex-col lg:flex-row gap-6 p-4 pb-0 max-w-[1600px] mx-auto w-full relative z-10 h-[calc(100vh-130px)]">
          <div className="w-full lg:w-[400px] xl:w-[450px] glass-panel rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full relative group transition-all duration-300">
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--glass-border)] to-transparent pointer-events-none opacity-50"></div>
            <FormEditor mode={mode} />
          </div>
          
          <div className="flex-1 overflow-y-auto rounded-2xl shadow-2xl h-full scrollbar-thin scrollbar-thumb-[var(--app-text-muted)] scrollbar-track-transparent print-wrapper transition-all duration-300">
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
