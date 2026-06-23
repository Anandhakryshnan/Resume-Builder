import React from 'react';
import { useResume } from '../../context/ResumeContext';

export const CoverLetterForm = () => {
  const { state, dispatch } = useResume();
  const { coverLetter } = state;

  if (!coverLetter) return null;

  const handleChange = (field: keyof typeof coverLetter, value: string) => {
    dispatch({ type: 'UPDATE_COVER_LETTER', payload: { [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Date</label>
          <input
            type="text"
            value={coverLetter.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="September 15, 2024"
          />
        </div>
        
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Recipient Name</label>
          <input
            type="text"
            value={coverLetter.recipientName}
            onChange={(e) => handleChange('recipientName', e.target.value)}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="Hiring Manager"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Company Name</label>
          <input
            type="text"
            value={coverLetter.recipientCompany}
            onChange={(e) => handleChange('recipientCompany', e.target.value)}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="Tech Corp Inc."
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Recipient Address (Optional)</label>
          <textarea
            value={coverLetter.recipientAddress}
            onChange={(e) => handleChange('recipientAddress', e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300 resize-none"
            placeholder="123 Innovation Drive&#10;San Francisco, CA 94105"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Subject (Optional)</label>
          <input
            type="text"
            value={coverLetter.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="Application for Software Engineer Position"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Body (Markdown Supported)</label>
          <textarea
            value={coverLetter.body}
            onChange={(e) => handleChange('body', e.target.value)}
            rows={15}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300 resize-y"
            placeholder="Dear Hiring Manager,&#10;&#10;I am writing to express my interest in..."
          />
        </div>
      </div>
    </div>
  );
};
