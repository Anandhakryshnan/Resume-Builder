import type { ResumeData } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export const initialData: ResumeData = {
  basics: {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://janedoe.com',
    summary: 'A passionate Frontend Developer with 5+ years of experience building modern web applications. Specialized in React, TypeScript, and modern CSS frameworks.',
    location: 'San Francisco, CA',
    socialProfiles: [
      {
        network: 'LinkedIn',
        url: 'https://linkedin.com/in/janedoe',
      },
      {
        network: 'GitHub',
        url: 'https://github.com/janedoe',
      },
    ],
  },
  workExperience: [
    {
      id: uuidv4(),
      company: 'Tech Innovators Inc.',
      position: 'Senior Frontend Developer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      summary: 'Led the frontend team in developing the core web application, improving performance and user experience.',
      bulletPoints: [
        { id: uuidv4(), text: 'Migrated legacy React application to modern React with Hooks and Context API.' },
        { id: uuidv4(), text: 'Improved web vitals by 30% through code splitting and lazy loading.' },
        { id: uuidv4(), text: 'Mentored junior developers and established code review guidelines.' },
      ],
    },
    {
      id: uuidv4(),
      company: 'Creative Web Agency',
      position: 'Frontend Developer',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      summary: 'Developed responsive and pixel-perfect websites for clients across various industries.',
      bulletPoints: [
        { id: uuidv4(), text: 'Built 15+ custom web applications using React and Tailwind CSS.' },
        { id: uuidv4(), text: 'Integrated RESTful APIs and optimized state management.' },
      ],
    },
  ],
  projects: [
    {
      id: uuidv4(),
      title: 'E-commerce Platform Redesign',
      role: 'Lead Developer',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      description: 'A complete overhaul of the main e-commerce storefront, resulting in a 25% increase in conversion rate.',
      link: 'https://example.com/ecommerce',
    },
    {
      id: uuidv4(),
      title: 'Open Source UI Library',
      role: 'Creator & Maintainer',
      techStack: ['React', 'Storybook', 'Framer Motion'],
      description: 'A popular open-source library providing accessible and customizable React components.',
      link: 'https://github.com/janedoe/ui-library',
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      areaOfStudy: 'Computer Science',
      graduationDate: 'May 2018',
    },
  ],
  skills: [
    {
      id: uuidv4(),
      name: 'Languages & Frameworks',
      skills: [
        { id: uuidv4(), name: 'JavaScript (ES6+)' },
        { id: uuidv4(), name: 'TypeScript' },
        { id: uuidv4(), name: 'React' },
        { id: uuidv4(), name: 'Next.js' },
      ],
    },
    {
      id: uuidv4(),
      name: 'Tools & Technologies',
      skills: [
        { id: uuidv4(), name: 'Tailwind CSS' },
        { id: uuidv4(), name: 'Git & GitHub' },
        { id: uuidv4(), name: 'Vite' },
        { id: uuidv4(), name: 'Figma' },
      ],
    },
  ],
  sectionOrder: ['workExperience', 'education', 'projects', 'skills'],
};
