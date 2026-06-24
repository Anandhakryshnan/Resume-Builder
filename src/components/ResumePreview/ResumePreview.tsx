import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Globe, ExternalLink, Settings2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
  const { basics, workExperience, education, projects, skills, certifications = [], languages = [], references = [], hobbies = [], customSections = [] } = state;

  const [headingFont, setHeadingFont] = useState(FONTS[0]);
  const [bodyFont, setBodyFont] = useState(FONTS[0]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [headingColor, setHeadingColor] = useState(COLORS[0]);
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0]);

  const [layoutMargin, setLayoutMargin] = useState(20);
  const [layoutFontSize, setLayoutFontSize] = useState(14);
  const [layoutLineHeight, setLayoutLineHeight] = useState(1.5);
  const [sectionSpacing, setSectionSpacing] = useState(1.5);
  const [headerAlignment, setHeaderAlignment] = useState<'left'|'center'|'right'>('left');
  const [bulletStyle, setBulletStyle] = useState<'disc'|'circle'|'square'|'none'>('disc');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Apply CSS Variables for the preview
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', activeColor.hex);
  }, [activeColor]);

  const renderContactInfo = (isSidebar = false, inverted = false, forceCenter = false) => {
    const textColorClass = inverted ? 'text-white/90' : 'text-gray-600';
    const iconColor = inverted ? 'white' : 'var(--color-primary)';
    
    const align = forceCenter ? 'center' : headerAlignment;
    let justifyClass = 'justify-start';
    if (align === 'center') justifyClass = 'justify-center';
    if (align === 'right') justifyClass = 'justify-end';
    
    return (
      <div className={`flex ${isSidebar ? 'flex-col gap-3' : `flex-wrap gap-x-4 gap-y-2 ${justifyClass}`} text-sm ${textColorClass}`}>
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
              {exp.summary && (
                <div className={`text-sm text-gray-700 mb-2 leading-relaxed ${centered ? 'text-center' : ''} [&>p]:inline`}>
                  <ReactMarkdown components={{ p: React.Fragment }}>{exp.summary}</ReactMarkdown>
                </div>
              )}
              {exp.bulletPoints.length > 0 && (
                <ul className={`list-disc ${centered ? 'list-inside text-center' : 'pl-5'} text-sm text-gray-700 space-y-1.5`}>
                  {exp.bulletPoints.map((bullet) => (
                    <li key={bullet.id}>
                      <ReactMarkdown components={{ p: React.Fragment }}>{bullet.text}</ReactMarkdown>
                    </li>
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
              {proj.description && (
                <div className={`text-sm text-gray-700 leading-relaxed ${centered ? 'text-center' : ''} [&>p]:inline`}>
                  <ReactMarkdown components={{ p: React.Fragment }}>{proj.description}</ReactMarkdown>
                </div>
              )}
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

  const renderCertifications = (compact = false, timeline = false, centered = false) => {
    if (certifications.length === 0) return null;
    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'}`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-3' : 'mb-4'} ${centered ? 'text-center border-b pb-2' : ''}`} style={{ color: 'var(--color-primary)' }}>
          Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className={`avoid-break relative ${timeline ? 'pl-6 border-l-2' : ''}`} style={{ borderColor: timeline ? 'var(--color-primary)' : 'transparent' }}>
              {timeline && (
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              )}
              <div className={`flex ${centered ? 'flex-col items-center' : 'justify-between items-baseline'} mb-1`}>
                <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
                  {cert.name}
                  {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 no-print"><ExternalLink size={14}/></a>}
                </h3>
                <span className={`text-sm font-semibold text-gray-500 whitespace-nowrap ${centered ? 'mt-0.5' : 'ml-4'}`}>{cert.date}</span>
              </div>
              <div className={`text-sm text-gray-700 font-medium ${centered ? 'text-center' : ''}`}>
                {cert.issuer}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderLanguages = (inverted = false, compact = false, centered = false) => {
    if (languages.length === 0) return null;
    const textColorClass = inverted ? 'text-white' : 'text-gray-900';
    const subTextColorClass = inverted ? 'text-white/80' : 'text-gray-700';
    const primaryColor = inverted ? 'white' : 'var(--color-primary)';

    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'}`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-2' : 'mb-3'} ${centered ? 'text-center' : ''}`} style={{ color: primaryColor }}>
          Languages
        </h2>
        <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-3'} ${centered ? 'items-center text-center' : ''}`}>
          {languages.map((lang) => (
            <div key={lang.id} className={`avoid-break w-full flex ${centered ? 'flex-col' : 'justify-between'} items-baseline`}>
              <h3 className={`text-sm font-bold ${textColorClass} mb-0.5`}>{lang.name}</h3>
              <p className={`text-sm font-semibold ${subTextColorClass} leading-snug`}>
                {lang.proficiency}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderReferences = (compact = false, timeline = false, centered = false) => {
    if (!references || references.length === 0) return null;
    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'} section-spacing`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-3' : 'mb-4'} ${centered ? 'text-center border-b pb-2' : ''}`} style={{ color: 'var(--color-primary)' }}>
          References
        </h2>
        <div className={`grid ${centered ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 gap-4'}`}>
          {references.map((ref) => (
            <div key={ref.id} className={`avoid-break relative ${timeline ? 'pl-6 border-l-2' : ''}`} style={{ borderColor: timeline ? 'var(--color-primary)' : 'transparent' }}>
              {timeline && (
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              )}
              <h3 className={`text-md font-bold text-gray-900 ${centered ? 'text-center' : ''}`}>{ref.name}</h3>
              <div className={`text-sm font-semibold text-gray-600 mb-1 ${centered ? 'text-center' : ''}`}>{ref.position}{ref.company ? `, ${ref.company}` : ''}</div>
              {ref.contactInfo && <div className={`text-sm text-gray-500 ${centered ? 'text-center' : ''}`}>{ref.contactInfo}</div>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderHobbies = (inverted = false, compact = false, centered = false) => {
    if (!hobbies || hobbies.length === 0) return null;
    const textColorClass = inverted ? 'text-white' : 'text-gray-900';
    const subTextColorClass = inverted ? 'text-white/80' : 'text-gray-700';
    const primaryColor = inverted ? 'white' : 'var(--color-primary)';

    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'} section-spacing`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-2' : 'mb-3'} ${centered ? 'text-center' : ''}`} style={{ color: primaryColor }}>
          Hobbies & Interests
        </h2>
        <div className={`flex flex-wrap ${centered ? 'justify-center' : ''} gap-2`}>
          {hobbies.map((hobby) => (
            <div key={hobby.id} className="avoid-break mb-1">
              <span className={`text-sm font-bold ${textColorClass}`}>{hobby.name}</span>
              {hobby.keywords && <span className={`text-sm ${subTextColorClass} ml-1`}>({hobby.keywords})</span>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCustomSection = (customSectionId: string, compact = false, timeline = false, centered = false) => {
    const section = customSections.find(s => s.id === customSectionId);
    if (!section || section.items.length === 0) return null;
    return (
      <section className={`avoid-break ${compact ? 'mt-4' : 'mt-6'}`}>
        <h2 className={`text-lg font-bold uppercase tracking-widest ${compact ? 'mb-3' : 'mb-4'} ${centered ? 'text-center border-b pb-2' : ''}`} style={{ color: 'var(--color-primary)' }}>
          {section.name}
        </h2>
        <div className="space-y-5">
          {section.items.map((item) => (
            <div key={item.id} className={`avoid-break relative ${timeline ? 'pl-6 border-l-2' : ''}`} style={{ borderColor: timeline ? 'var(--color-primary)' : 'transparent' }}>
              {timeline && (
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              )}
              <div className={`flex ${centered ? 'flex-col items-center' : 'justify-between items-baseline'} mb-1`}>
                <h3 className="text-md font-bold text-gray-900">{item.title}</h3>
                {item.date && <span className={`text-sm font-semibold text-gray-500 whitespace-nowrap ${centered ? 'mt-0.5' : 'ml-4'}`}>{item.date}</span>}
              </div>
              {item.subtitle && (
                <div className={`text-sm font-bold mb-2 ${centered ? 'text-center' : ''}`} style={{ color: 'var(--color-primary)' }}>
                  {item.subtitle}
                </div>
              )}
              {item.description && (
                <div className={`text-sm text-gray-700 leading-relaxed ${centered ? 'text-center' : ''} [&>p]:inline`}>
                  <ReactMarkdown components={{ p: React.Fragment }}>{item.description}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSectionById = (id: string, options: { compact?: boolean; timeline?: boolean; centered?: boolean; inverted?: boolean } = {}) => {
    switch (id) {
      case 'workExperience': return <div key={id}>{renderExperience(options.compact, options.timeline, options.centered)}</div>;
      case 'education': return <div key={id}>{renderEducation(options.compact, options.timeline, options.centered)}</div>;
      case 'projects': return <div key={id}>{renderProjects(options.compact, options.timeline, options.centered)}</div>;
      case 'skills': return <div key={id}>{renderSkills(options.inverted, options.compact, options.centered)}</div>;
      case 'certifications': return <div key={id}>{renderCertifications(options.compact, options.timeline, options.centered)}</div>;
      case 'languages': return <div key={id}>{renderLanguages(options.inverted, options.compact, options.centered)}</div>;
      case 'references': return <div key={id}>{renderReferences(options.compact, options.timeline, options.centered)}</div>;
      case 'hobbies': return <div key={id}>{renderHobbies(options.inverted, options.compact, options.centered)}</div>;
      default: 
        if (id.startsWith('custom_')) {
          const customId = id.replace('custom_', '');
          return <div key={id}>{renderCustomSection(customId, options.compact, options.timeline, options.centered)}</div>;
        }
        return null;
    }
  };

  const renderLayout = () => {
    switch (activeTemplate.id) {

      case 'centered':
        return (
          <div className="bg-white flex-1">
            <header className="border-b-4 pb-6 mb-6 avoid-break flex flex-col" style={{ borderColor: 'var(--color-primary)', textAlign: headerAlignment, alignItems: headerAlignment === 'center' ? 'center' : headerAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
              <h1 className="text-5xl font-bold tracking-wider mb-3 text-black" style={{ fontFamily: 'var(--resume-heading-font)', color: 'var(--resume-heading-color)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <div className="mt-5 text-sm text-gray-700 leading-relaxed max-w-2xl italic font-serif [&>p]:inline">
                  <ReactMarkdown components={{ p: React.Fragment }}>{basics.summary}</ReactMarkdown>
                </div>
              )}
            </header>
            <div className="space-y-8">
              {state.sectionOrder.map(id => renderSectionById(id, { centered: true }))}
            </div>
          </div>
        );

      case 'compact':
        return (
          <div className="bg-white flex-1 flex flex-col">
            <header className="border-b-2 pb-4 mb-4 avoid-break flex flex-col" style={{ borderColor: 'var(--color-primary)', textAlign: headerAlignment, alignItems: headerAlignment === 'center' ? 'center' : headerAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
              <h1 className="text-3xl font-black uppercase tracking-wider mb-2 text-black" style={{ fontFamily: 'var(--resume-heading-font)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <div className="mt-4 text-sm text-gray-700 leading-relaxed [&>p]:inline">
                  <ReactMarkdown components={{ p: React.Fragment }}>{basics.summary}</ReactMarkdown>
                </div>
              )}
            </header>
            <div className="flex gap-6 flex-1">
              <div className="w-[60%]">
                {state.sectionOrder.filter(id => id === 'workExperience').map(id => renderSectionById(id, { compact: true }))}
              </div>
              <div className="w-[40%] flex flex-col gap-2">
                {state.sectionOrder.filter(id => id !== 'workExperience').map(id => renderSectionById(id, { compact: true }))}
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="bg-white flex-1">
            <header className="mb-8 avoid-break flex flex-col" style={{ textAlign: headerAlignment, alignItems: headerAlignment === 'center' ? 'center' : headerAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
              <h1 className="text-4xl font-black uppercase tracking-wider mb-4 text-black" style={{ fontFamily: 'var(--resume-heading-font)', color: 'var(--resume-heading-color)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <div className="mt-4 text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md border-l-4 [&>p]:inline" style={{ borderColor: 'var(--color-primary)' }}>
                  <ReactMarkdown components={{ p: React.Fragment }}>{basics.summary}</ReactMarkdown>
                </div>
              )}
            </header>
            <div className="grid grid-cols-1 gap-6">
              {state.sectionOrder.filter(id => id === 'workExperience' || id === 'education').map(id => renderSectionById(id, { timeline: true }))}
              <div className="grid grid-cols-2 gap-6">
                {state.sectionOrder.filter(id => id === 'projects' || id === 'skills').map(id => renderSectionById(id))}
              </div>
            </div>
          </div>
        );

      case 'creative-duo':
        return (
          <div className="flex flex-1 gap-8 bg-white">
            <div className="w-1/2 flex flex-col" style={{ textAlign: headerAlignment, alignItems: headerAlignment === 'center' ? 'center' : headerAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
              <h1 className="text-4xl font-black uppercase tracking-wider mb-2 text-black" style={{ fontFamily: 'var(--resume-heading-font)', color: 'var(--resume-heading-color)' }}>
                {basics.name || 'Your Name'}
              </h1>
              <div className="mb-6">{renderContactInfo(true)}</div>
              {basics.summary && (
                <div className="text-sm text-gray-700 leading-relaxed mb-6 font-medium [&>p]:inline">
                  <ReactMarkdown components={{ p: React.Fragment }}>{basics.summary}</ReactMarkdown>
                </div>
              )}
              <div className="w-full text-left">
                {state.sectionOrder.filter(id => id === 'workExperience').map(id => renderSectionById(id))}
              </div>
            </div>
            <div className="w-1/2 border-l pl-8 border-gray-200">
              {state.sectionOrder.filter(id => id !== 'workExperience').map(id => renderSectionById(id))}
            </div>
          </div>
        );

      case 'modern':
        return (
          <div className="flex gap-8 bg-white flex-1">
            <div className="w-1/3 flex flex-col" style={{ textAlign: headerAlignment, alignItems: headerAlignment === 'center' ? 'center' : headerAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
              <h1 className="text-4xl font-black uppercase tracking-wider mb-6 text-black" style={{ fontFamily: 'var(--resume-heading-font)', color: 'var(--resume-heading-color)' }}>
                {basics.name || 'Your Name'}
              </h1>
              <div className="mb-6">{renderContactInfo(true)}</div>
              <div className="w-full text-left">
                {state.sectionOrder.filter(id => id === 'skills').map(id => renderSectionById(id, { inverted: false }))}
              </div>
            </div>
            <div className="w-2/3 border-l-2 pl-8 pb-10" style={{ borderColor: 'var(--color-primary)' }}>
              {basics.summary && (
                <div className="text-sm text-gray-700 leading-relaxed mb-6 font-medium [&>p]:inline">
                  <ReactMarkdown components={{ p: React.Fragment }}>{basics.summary}</ReactMarkdown>
                </div>
              )}
              {state.sectionOrder.filter(id => id !== 'skills').map(id => renderSectionById(id))}
            </div>
          </div>
        );
      
      case 'minimalist':
        return (
          <div className="bg-white flex-1">
            <header className="mb-6 avoid-break flex flex-col" style={{ textAlign: headerAlignment, alignItems: headerAlignment === 'center' ? 'center' : headerAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
              <h1 className="text-3xl font-black uppercase tracking-widest mb-3 text-black" style={{ fontFamily: 'var(--resume-heading-font)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <div className="mt-4 text-sm text-gray-700 leading-relaxed max-w-3xl [&>p]:inline">
                  <ReactMarkdown components={{ p: React.Fragment }}>{basics.summary}</ReactMarkdown>
                </div>
              )}
            </header>
            <div className="space-y-4">
              <div className={activeTemplate.id === 'minimalist' ? 'border-t border-gray-300 pt-2' : ''}></div>
              {state.sectionOrder.map(id => renderSectionById(id))}
            </div>
          </div>
        );
      
      case 'classic':
      default:
        return (
          <div className="bg-white flex-1">
            <header className="border-b-4 pb-6 mb-6 avoid-break flex flex-col" style={{ borderColor: 'var(--color-primary)', textAlign: headerAlignment, alignItems: headerAlignment === 'center' ? 'center' : headerAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
              <h1 className="text-4xl font-bold uppercase tracking-wider mb-3 text-black" style={{ fontFamily: 'var(--resume-heading-font)', color: 'var(--resume-heading-color)' }}>
                {basics.name || 'Your Name'}
              </h1>
              {renderContactInfo(false)}
              {basics.summary && (
                <div className="mt-5 text-sm text-gray-700 leading-relaxed max-w-2xl [&>p]:inline">
                  <ReactMarkdown components={{ p: React.Fragment }}>{basics.summary}</ReactMarkdown>
                </div>
              )}
            </header>
            <div className="space-y-2">
              {state.sectionOrder.map(id => renderSectionById(id))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-full">
      {/* Controls Bar */}
      <div className="no-print w-full max-w-[210mm] mb-8 p-4 glass-panel rounded-2xl flex flex-wrap justify-between items-center gap-4 relative z-50 before:absolute before:inset-0 before:bg-[var(--glass-bg)] before:-z-10 before:rounded-2xl backdrop-blur-xl transition-colors duration-300">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--app-text)] tracking-wide transition-colors">Template:</span>
          <select 
            className="text-sm border border-[var(--input-border)] rounded-none py-2 px-4 bg-[var(--input-bg)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] backdrop-blur-sm transition-all focus:bg-[var(--input-focus-bg)] hover:bg-[var(--btn-hover-bg)] outline-none cursor-pointer uppercase tracking-wider"
            value={activeTemplate.id}
            onChange={(e) => setActiveTemplate(TEMPLATES.find(t => t.id === e.target.value) || TEMPLATES[0])}
          >
            {TEMPLATES.map(t => <option key={t.id} value={t.id} className="bg-[var(--app-bg-color)] text-[var(--app-text)]">{t.name}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--app-text)] tracking-wide transition-colors">Body Font:</span>
          <select 
            className="text-sm border border-[var(--input-border)] rounded-none py-2 px-4 bg-[var(--input-bg)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] backdrop-blur-sm transition-all focus:bg-[var(--input-focus-bg)] hover:bg-[var(--btn-hover-bg)] outline-none cursor-pointer tracking-wider w-36"
            value={bodyFont.name}
            onChange={(e) => setBodyFont(FONTS.find(f => f.name === e.target.value) || FONTS[0])}
          >
            {FONTS.map(f => <option key={f.name} value={f.name} className="bg-[var(--app-bg-color)] text-[var(--app-text)]">{f.name}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--app-text)] tracking-wide transition-colors">Heading Font:</span>
          <select 
            className="text-sm border border-[var(--input-border)] rounded-none py-2 px-4 bg-[var(--input-bg)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] backdrop-blur-sm transition-all focus:bg-[var(--input-focus-bg)] hover:bg-[var(--btn-hover-bg)] outline-none cursor-pointer tracking-wider w-36"
            value={headingFont.name}
            onChange={(e) => setHeadingFont(FONTS.find(f => f.name === e.target.value) || FONTS[0])}
          >
            {FONTS.map(f => <option key={f.name} value={f.name} className="bg-[var(--app-bg-color)] text-[var(--app-text)]">{f.name}</option>)}
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
        
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-bold tracking-wide uppercase ${isSettingsOpen ? 'bg-[var(--accent-color)] text-[var(--accent-color-inverse)] shadow-lg' : 'bg-[var(--btn-bg)] border border-[var(--btn-border)] text-[var(--app-text)] hover:bg-[var(--btn-hover-bg)]'}`}
          >
            <Settings2 size={16} /> Layout
          </button>
          
          {isSettingsOpen && typeof document !== 'undefined' && createPortal(
            <div className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center items-center pointer-events-none">
              {/* Overlay */}
              <div 
                className="absolute inset-0 bg-black/50 md:bg-black/40 backdrop-blur-sm transition-opacity pointer-events-auto" 
                onClick={() => setIsSettingsOpen(false)}
              ></div>
              
              {/* Settings Panel */}
              <div className="relative w-full md:w-[420px] bg-[var(--app-bg-color)] p-5 md:p-6 rounded-t-3xl md:rounded-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] md:shadow-2xl border-t md:border border-[var(--glass-border)] max-h-[85vh] flex flex-col pointer-events-auto">
                <div className="w-12 h-1.5 bg-gray-300/30 rounded-full mx-auto mb-4 md:hidden"></div>
                
                <div className="flex justify-between items-center mb-5 shrink-0">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[var(--app-text)] flex items-center gap-2"><Settings2 size={16}/> Settings</h3>
                  <button onClick={() => setIsSettingsOpen(false)} className="text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors p-1.5 bg-[var(--input-bg)] rounded-full hover:bg-[var(--btn-hover-bg)]"><X size={18}/></button>
                </div>
                
                <div className="space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[var(--app-text-muted)] scrollbar-track-transparent pb-8 md:pb-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                      <span className="text-[var(--app-text-muted)]">Page Margin</span>
                      <span className="text-[var(--app-text)]">{layoutMargin}mm</span>
                    </div>
                    <input type="range" min="10" max="30" step="1" value={layoutMargin} onChange={(e) => setLayoutMargin(Number(e.target.value))} className="w-full h-1.5 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                      <span className="text-[var(--app-text-muted)]">Base Font Size</span>
                      <span className="text-[var(--app-text)]">{layoutFontSize}px</span>
                    </div>
                    <input type="range" min="11" max="18" step="1" value={layoutFontSize} onChange={(e) => setLayoutFontSize(Number(e.target.value))} className="w-full h-1.5 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                      <span className="text-[var(--app-text-muted)]">Line Height</span>
                      <span className="text-[var(--app-text)]">{layoutLineHeight}x</span>
                    </div>
                    <input type="range" min="1.1" max="2.0" step="0.05" value={layoutLineHeight} onChange={(e) => setLayoutLineHeight(Number(e.target.value))} className="w-full h-1.5 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                      <span className="text-[var(--app-text-muted)]">Section Spacing</span>
                      <span className="text-[var(--app-text)]">{sectionSpacing}x</span>
                    </div>
                    <input type="range" min="0.5" max="3.0" step="0.1" value={sectionSpacing} onChange={(e) => setSectionSpacing(Number(e.target.value))} className="w-full h-1.5 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]" />
                  </div>
                  
                  <div className="pt-4 border-t border-[var(--glass-border)]">
                    <label className="block text-xs font-bold mb-3 uppercase tracking-wider text-[var(--app-text-muted)]">Header Alignment</label>
                    <div className="flex gap-2">
                      {['left', 'center', 'right'].map((align) => (
                        <button 
                          key={align}
                          onClick={() => setHeaderAlignment(align as any)}
                          className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg border transition-all ${headerAlignment === align ? 'bg-[var(--app-text)] text-[var(--app-bg-color)] border-[var(--app-text)] shadow-md' : 'bg-transparent text-[var(--app-text)] border-[var(--input-border)] hover:bg-[var(--btn-hover-bg)]'}`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-3 uppercase tracking-wider text-[var(--app-text-muted)]">Bullet Style</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['disc', 'circle', 'square', 'none'].map((style) => (
                        <button 
                          key={style}
                          onClick={() => setBulletStyle(style as any)}
                          className={`py-2 text-xs font-bold capitalize rounded-lg border transition-all ${bulletStyle === style ? 'bg-[var(--app-text)] text-[var(--app-bg-color)] border-[var(--app-text)] shadow-md' : 'bg-transparent text-[var(--app-text)] border-[var(--input-border)] hover:bg-[var(--btn-hover-bg)]'}`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[var(--glass-border)] pb-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[var(--app-text-muted)]">
                      <span>Heading Color</span>
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-[var(--input-border)] cursor-pointer hover:border-[var(--app-text)] transition-colors shadow-sm">
                        <input 
                          type="color" 
                          value={headingColor.hex}
                          onChange={(e) => setHeadingColor({ name: 'Custom', hex: e.target.value })}
                          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
        </div>
      </div>

      {/* A4 Canvas */}
      <div className="w-full overflow-x-auto pb-8 print:pb-0 print:mx-0 print:px-0 print:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-[var(--app-text-muted)] scrollbar-track-transparent">
        <div className="min-w-[210mm] flex justify-center print:block print:min-w-0">
          <div className="resume-canvas flex flex-col w-[210mm] min-h-[297mm] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] print:shadow-none box-border text-[var(--color-primary-text)] relative group"
               style={{
                 padding: `${layoutMargin}mm`,
                 fontFamily: bodyFont.sans,
                 '--resume-font-size': `${layoutFontSize}px`,
                 '--resume-line-height': layoutLineHeight,
                 '--resume-section-spacing': `${sectionSpacing}rem`,
                 '--resume-heading-color': headingColor.hex,
                 '--resume-heading-font': headingFont.sans,
                 '--resume-bullet-style': bulletStyle
               } as React.CSSProperties}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white to-gray-50 opacity-50 pointer-events-none no-print"></div>
            <div className="relative z-10 flex flex-col flex-1 w-full h-full">
              {renderLayout()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
