import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

const FONTS = [
  { name: 'Modern Clean', sans: "'Inter', sans-serif", serif: "'Inter', sans-serif" },
  { name: 'Professional Classic', sans: "'Open Sans', sans-serif", serif: "'Roboto', sans-serif" },
  { name: 'Elegant', sans: "'Source Sans 3', sans-serif", serif: "'Playfair Display', serif" },
  { name: 'Executive', sans: "'Montserrat', sans-serif", serif: "'EB Garamond', serif" },
  { name: 'Tech Minimal', sans: "'Lato', sans-serif", serif: "'PT Serif', serif" },
];

const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'Charcoal', hex: '#333333' },
  { name: 'Slate', hex: '#64748b' },
  { name: 'Silver', hex: '#a1a1aa' },
];

const TEMPLATES = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern Two-Column' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'centered', name: 'Centered Elegant' },
  { id: 'compact', name: 'Compact Split' },
  { id: 'timeline', name: 'Timeline' },
  { id: 'creative-duo', name: 'Creative Duo' }
];

export const ResumePreview = () => {
  const { state } = useResume();
  const { basics, workExperience, education, projects, skills } = state;

  const [activeFont, setActiveFont] = useState(FONTS[0]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0]);

  // Apply CSS Variables for the preview
  useEffect(() => {
    document.documentElement.style.setProperty('--font-sans', activeFont.sans);
    document.documentElement.style.setProperty('--font-serif', activeFont.serif);
    document.documentElement.style.setProperty('--color-primary', activeColor.hex);
  }, [activeFont, activeColor]);

  const renderContactInfo = (isSidebar = false, inverted = false, centered = false) => {
    const textColorClass = inverted ? 'text-white/90' : 'text-gray-600';
    const iconColor = inverted ? 'white' : 'var(--color-primary)';
    
    return (
      <div className={`flex ${isSidebar ? 'flex-col gap-3' : `flex-wrap gap-x-4 gap-y-2 ${centered ? 'justify-center' : ''}`} text-sm ${textColorClass}`}>
        {basics.email && (
          <div className="flex items-center gap-1.5">
            <Mail size={14} style={{ color: iconColor }} />
            <span>{basics.email}</span>
          </div>
        )}
        {basics.phone && (
          <div className="flex items-center gap-1.5">
            <Phone size={14} style={{ color: iconColor }} />
            <span>{basics.phone}</span>
          </div>
        )}
        {basics.location && (
          <div className="flex items-center gap-1.5">
            <MapPin size={14} style={{ color: iconColor }} />
            <span>{basics.location}</span>
          </div>
        )}
        {basics.website && (
          <div className="flex items-center gap-1.5">
            <Globe size={14} style={{ color: iconColor }} />
            <span>{basics.website.replace(/^https?:\/\//, '')}</span>
          </div>
        )}
        {basics.socialProfiles.map((profile, i) => profile.url && (
          <div key={i} className="flex items-center gap-1.5">
            <ExternalLink size={14} style={{ color: iconColor }} />
            <span>{profile.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = (inverted = false, compact = false, centered = false) => {
    if (skills.length === 0) return null;
    const textColorClass = inverted ? 'text-white' : 'text-gray-900';
    const subTextColorClass = inverted ? 'text-white/80' : 'text-gray-700';
    const primaryColor = inverted ? 'white' : 'var(--color-primary)';

    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'}`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-2' : 'mb-3'} ${centered ? 'text-center' : ''}`} style={{ color: primaryColor }}>
          Skills
        </h2>
        <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-3'} ${centered ? 'items-center text-center' : ''}`}>
          {skills.map((category) => (
            <div key={category.id} className="avoid-break w-full">
              <h3 className={`text-sm font-bold ${textColorClass} mb-0.5`}>{category.name}</h3>
              <p className={`text-sm ${subTextColorClass} leading-snug`}>
                {category.skills.map(s => s.name).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderExperience = (compact = false, timeline = false, centered = false) => {
    if (workExperience.length === 0) return null;
    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'}`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-3' : 'mb-4'} ${centered ? 'text-center border-b pb-2' : ''}`} style={{ color: 'var(--color-primary)' }}>
          Experience
        </h2>
        <div className="space-y-5">
          {workExperience.map((exp) => (
            <div key={exp.id} className={`avoid-break relative ${timeline ? 'pl-6 border-l-2' : ''}`} style={{ borderColor: timeline ? 'var(--color-primary)' : 'transparent' }}>
              {timeline && (
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              )}
              <div className={`flex ${centered ? 'flex-col items-center' : 'justify-between items-baseline'} mb-1`}>
                <h3 className="text-md font-bold text-gray-900">{exp.position}</h3>
                <span className={`text-sm font-semibold text-gray-500 whitespace-nowrap ${centered ? 'mt-0.5' : 'ml-4'}`}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className={`text-sm font-bold mb-2 ${centered ? 'text-center' : ''}`} style={{ color: 'var(--color-primary)' }}>
                {exp.company}
              </div>
              {exp.summary && <p className={`text-sm text-gray-700 mb-2 leading-relaxed ${centered ? 'text-center' : ''}`}>{exp.summary}</p>}
              {exp.bulletPoints.length > 0 && (
                <ul className={`list-disc ${centered ? 'list-inside text-center' : 'pl-5'} text-sm text-gray-700 space-y-1.5`}>
                  {exp.bulletPoints.map((bullet) => (
                    <li key={bullet.id}>{bullet.text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = (compact = false, timeline = false, centered = false) => {
    if (projects.length === 0) return null;
    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'}`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-3' : 'mb-4'} ${centered ? 'text-center border-b pb-2' : ''}`} style={{ color: 'var(--color-primary)' }}>
          Projects
        </h2>
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className={`avoid-break relative ${timeline ? 'pl-6 border-l-2' : ''}`} style={{ borderColor: timeline ? 'var(--color-primary)' : 'transparent' }}>
              {timeline && (
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              )}
              <div className={`flex ${centered ? 'flex-col items-center' : 'justify-between items-baseline'} mb-1`}>
                <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
                  {proj.title}
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 no-print"><ExternalLink size={14}/></a>}
                </h3>
                <span className={`text-sm font-semibold text-gray-500 whitespace-nowrap ${centered ? 'mt-0.5' : 'ml-4'}`}>{proj.role}</span>
              </div>
              {proj.techStack.length > 0 && (
                <div className={`text-xs font-bold mb-2 text-gray-500 uppercase tracking-wider ${centered ? 'text-center' : ''}`}>
                  {proj.techStack.join(' • ')}
                </div>
              )}
              {proj.description && <p className={`text-sm text-gray-700 leading-relaxed ${centered ? 'text-center' : ''}`}>{proj.description}</p>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = (compact = false, timeline = false, centered = false) => {
    if (education.length === 0) return null;
    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'}`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-3' : 'mb-4'} ${centered ? 'text-center border-b pb-2' : ''}`} style={{ color: 'var(--color-primary)' }}>
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className={`avoid-break relative ${timeline ? 'pl-6 border-l-2' : ''}`} style={{ borderColor: timeline ? 'var(--color-primary)' : 'transparent' }}>
              {timeline && (
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              )}
              <div className={`flex ${centered ? 'flex-col items-center text-center' : 'justify-between items-baseline'}`}>
                <div>
                  <h3 className="text-md font-bold text-gray-900">{edu.institution}</h3>
                  <div className="text-sm text-gray-700 font-medium mt-0.5">
                    {edu.degree}{edu.areaOfStudy && `, ${edu.areaOfStudy}`}
                  </div>
                </div>
                <span className={`text-sm font-semibold text-gray-500 whitespace-nowrap ${centered ? 'mt-1' : 'ml-4'}`}>{edu.graduationDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderLayout = () => {
    switch (activeTemplate.id) {

      case 'centered':
        return (
          <div className="bg-white flex-1">
            <header className="border-b-4 pb-6 mb-6 avoid-break flex flex-col items-center text-center" style={{ borderColor: 'var(--color-primary)' }}>
              <h1 className="text-5xl font-bold tracking-wider mb-3 text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false, false, true)}
              {basics.summary && (
                <p className="mt-5 text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto italic font-serif">
                  {basics.summary}
                </p>
              )}
            </header>
            <div className="space-y-8">
              {renderExperience(false, false, true)}
              {renderEducation(false, false, true)}
              {renderProjects(false, false, true)}
              {renderSkills(false, false, true)}
            </div>
          </div>
        );

      case 'compact':
        return (
          <div className="bg-white flex-1 flex flex-col">
            <header className="border-b-2 pb-4 mb-4 avoid-break" style={{ borderColor: 'var(--color-primary)' }}>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-wider mb-2 text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
                    {basics.name || 'Your Name'}
                  </h1>
                  {renderContactInfo(false)}
                </div>
              </div>
              {basics.summary && (
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                  {basics.summary}
                </p>
              )}
            </header>
            <div className="flex gap-6 flex-1">
              <div className="w-[60%]">
                {renderExperience(true)}
              </div>
              <div className="w-[40%] flex flex-col gap-2">
                {renderEducation(true)}
                {renderProjects(true)}
                {renderSkills(false, true)}
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="bg-white flex-1">
            <header className="mb-8 avoid-break">
              <h1 className="text-4xl font-black uppercase tracking-wider mb-4 text-gray-900" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <p className="mt-4 text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md border-l-4" style={{ borderColor: 'var(--color-primary)' }}>
                  {basics.summary}
                </p>
              )}
            </header>
            <div className="grid grid-cols-1 gap-6">
              {renderExperience(false, true)}
              {renderEducation(false, true)}
              <div className="grid grid-cols-2 gap-6">
                {renderProjects(false, false)}
                {renderSkills()}
              </div>
            </div>
          </div>
        );

      case 'creative-duo':
        return (
          <div className="flex flex-1 gap-8 bg-white">
            <div className="w-1/2 flex flex-col">
              <h1 className="text-4xl font-black uppercase tracking-wider mb-2 text-gray-900" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                {basics.name || 'Your Name'}
              </h1>
              <div className="mb-6">{renderContactInfo(true)}</div>
              {basics.summary && (
                <p className="text-sm text-gray-700 leading-relaxed mb-6 font-medium">
                  {basics.summary}
                </p>
              )}
              {renderExperience()}
            </div>
            <div className="w-1/2 border-l pl-8 border-gray-200">
              {renderEducation()}
              {renderProjects()}
              {renderSkills()}
            </div>
          </div>
        );

      case 'modern':
        return (
          <div className="flex gap-8 bg-white flex-1">
            <div className="w-1/3">
              <h1 className="text-4xl font-black uppercase tracking-wider mb-6 text-gray-900" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(true)}
              {renderSkills()}
            </div>
            <div className="w-2/3 border-l-2 pl-8 pb-10" style={{ borderColor: 'var(--color-primary)' }}>
              {basics.summary && (
                <p className="text-sm text-gray-700 leading-relaxed mb-6 font-medium">
                  {basics.summary}
                </p>
              )}
              {renderExperience()}
              {renderEducation()}
              {renderProjects()}
            </div>
          </div>
        );
      
      case 'minimalist':
        return (
          <div className="bg-white flex-1">
            <header className="mb-6 avoid-break">
              <h1 className="text-3xl font-black uppercase tracking-widest mb-3 text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <p className="mt-4 text-sm text-gray-700 leading-relaxed max-w-3xl">
                  {basics.summary}
                </p>
              )}
            </header>
            <div className="space-y-4">
              <div className={activeTemplate.id === 'minimalist' ? 'border-t border-gray-300 pt-2' : ''}></div>
              {renderExperience()}
              {renderEducation()}
              {renderProjects()}
              {renderSkills()}
            </div>
          </div>
        );
      
      case 'classic':
      default:
        return (
          <div className="bg-white flex-1">
            <header className="border-b-4 pb-6 mb-6 avoid-break flex flex-col items-center text-center" style={{ borderColor: 'var(--color-primary)' }}>
              <h1 className="text-4xl font-bold uppercase tracking-wider mb-3 text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <p className="mt-5 text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  {basics.summary}
                </p>
              )}
            </header>
            <div className="space-y-2">
              {renderExperience()}
              {renderEducation()}
              {renderProjects()}
              {renderSkills()}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-full">
      {/* Controls Bar */}
      <div className="no-print w-full max-w-[210mm] mb-8 p-4 glass-panel rounded-2xl flex flex-wrap justify-between items-center gap-4 relative z-10 before:absolute before:inset-0 before:bg-[var(--glass-bg)] before:-z-10 before:rounded-2xl backdrop-blur-xl transition-colors duration-300">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--app-text)] tracking-wide transition-colors">Template:</span>
          <select 
            className="text-sm border border-[var(--input-border)] rounded-none py-2 px-4 bg-[var(--input-bg)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] backdrop-blur-sm transition-all focus:bg-[var(--input-focus-bg)] hover:bg-[var(--btn-hover-bg)] outline-none cursor-pointer uppercase tracking-wider"
            value={activeTemplate.id}
            onChange={(e) => setActiveTemplate(TEMPLATES.find(t => t.id === e.target.value) || TEMPLATES[0])}
          >
            {TEMPLATES.map(t => <option key={t.id} value={t.id} className="text-gray-900">{t.name}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--app-text)] tracking-wide transition-colors">Typography:</span>
          <select 
            className="text-sm border border-[var(--input-border)] rounded-none py-2 px-4 bg-[var(--input-bg)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] backdrop-blur-sm transition-all focus:bg-[var(--input-focus-bg)] hover:bg-[var(--btn-hover-bg)] outline-none cursor-pointer uppercase tracking-wider"
            value={activeFont.name}
            onChange={(e) => setActiveFont(FONTS.find(f => f.name === e.target.value) || FONTS[0])}
          >
            {FONTS.map(f => <option key={f.name} value={f.name} className="text-gray-900">{f.name}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--app-text)] tracking-wide transition-colors">Accent Color:</span>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-none overflow-hidden border border-[var(--input-border)] cursor-pointer group">
              <input 
                type="color" 
                value={activeColor.hex}
                onChange={(e) => setActiveColor({ name: 'Custom', hex: e.target.value })}
                className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
              />
            </div>
            <input 
              type="text"
              value={activeColor.hex.toUpperCase()}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#[0-9A-F]{0,6}$/i.test(val)) {
                  setActiveColor({ name: 'Custom', hex: val });
                }
              }}
              className="w-24 text-sm border border-[var(--input-border)] rounded-none py-1.5 px-2 bg-[var(--input-bg)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] backdrop-blur-sm transition-all focus:bg-[var(--input-focus-bg)] hover:bg-[var(--btn-hover-bg)] outline-none uppercase tracking-wider text-center"
              placeholder="#000000"
              maxLength={7}
            />
          </div>
        </div>
      </div>

      {/* A4 Canvas */}
      <div className="resume-canvas flex flex-col w-[210mm] min-h-[297mm] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] print:shadow-none p-[20mm] box-border text-[var(--color-primary-text)] mx-auto relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-white to-gray-50 opacity-50 pointer-events-none no-print"></div>
        <div className="relative z-10 flex flex-col flex-1 w-full">
          {renderLayout()}
        </div>
      </div>
    </div>
  );
};
