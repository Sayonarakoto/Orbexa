import { useState, useEffect } from 'react';
import type { ResumeData, PersonalInfo, Experience, Education, Skill, TemplateMode } from '@/lib/types';

const STORAGE_KEY = 'resumespark_data';
const EXPIRATION_KEY = 'resumespark_expiration';
const TTL_MS = 2 * 60 * 1000; // 2 minutes

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  templateId: 'modern',
  templateMode: 'fresher',
};

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const expiration = localStorage.getItem(EXPIRATION_KEY);

    if (savedData && expiration) {
      if (Date.now() < parseInt(expiration)) {
        setData(JSON.parse(savedData));
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(EXPIRATION_KEY, (Date.now() + TTL_MS).toString());
    }
  }, [data, isLoaded]);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
  };

  const addExperience = (exp: Experience) => {
    setData(prev => ({ ...prev, experience: [...prev.experience, exp] }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e.id === id ? { ...e, ...exp } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const addEducation = (edu: Education) => {
    setData(prev => ({ ...prev, education: [...prev.education, edu] }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, ...edu } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const addSkill = (skill: Skill) => {
    setData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...skill } : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  };

  const setTemplate = (id: string) => {
    setData(prev => ({ ...prev, templateId: id }));
  };

  const setTemplateMode = (mode: TemplateMode) => {
    setData(prev => {
      const defaultTemplate = mode === 'ats' ? 'ats-standard' : 'modern';
      return { ...prev, templateMode: mode, templateId: defaultTemplate };
    });
  };

  return {
    data,
    isLoaded,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    setTemplate,
    setTemplateMode,
  };
}
