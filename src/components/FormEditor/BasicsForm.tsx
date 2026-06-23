import React from 'react';
import { useResume } from '../../context/ResumeContext';

export const BasicsForm = () => {
  const { state, dispatch } = useResume();
  const { basics } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_BASICS',
      payload: { [name]: value },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={basics.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="John Doe"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={basics.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="john@example.com"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={basics.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="+1 234 567 890"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={basics.location}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="City, Country"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Website / Portfolio</label>
          <input
            type="text"
            name="website"
            value={basics.website}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
            placeholder="https://johndoe.com"
          />
        </div>
        {/* Social Profile links can be added here, for now mapping LinkedIn/Github from initial data */}
        {basics.socialProfiles.map((profile, index) => (
          <div key={index} className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-[var(--app-text)] mb-1">{profile.network}</label>
            <input
              type="text"
              value={profile.url}
              onChange={(e) => {
                const newProfiles = [...basics.socialProfiles];
                newProfiles[index] = { ...newProfiles[index], url: e.target.value };
                dispatch({ type: 'UPDATE_BASICS', payload: { socialProfiles: newProfiles } });
              }}
              className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
              placeholder={`https://${profile.network.toLowerCase()}.com/in/username`}
            />
          </div>
        ))}
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Professional Summary</label>
          <textarea
            name="summary"
            value={basics.summary}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300 resize-y"
            placeholder="A brief summary of your professional background and goals..."
          />
        </div>
      </div>
    </div>
  );
};
