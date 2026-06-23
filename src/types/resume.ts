export interface Basics {
  name: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  location: string;
  socialProfiles: {
    network: string;
    url: string;
  }[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  bulletPoints: {
    id: string;
    text: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  techStack: string[];
  description: string;
  link: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  areaOfStudy: string;
  graduationDate: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    id: string;
    name: string;
  }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  name: string;
  items: CustomItem[];
}

export interface CoverLetter {
  date: string;
  recipientName: string;
  recipientCompany: string;
  recipientAddress: string;
  subject: string;
  body: string;
}

export interface ResumeData {
  basics: Basics;
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  certifications: Certification[];
  languages: Language[];
  customSections: CustomSection[];
  coverLetter: CoverLetter;
  sectionOrder: string[];
}
