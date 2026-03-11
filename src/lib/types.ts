export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  bulletPoints: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
};

export type Skill = {
  id: string;
  category: string;
  items: string[];
};

export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  profileImage?: string;
};

export type ResumeData = {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  templateId: string;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
};
