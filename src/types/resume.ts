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

export interface ResumeData {
  basics: Basics;
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  sectionOrder: string[];
}
