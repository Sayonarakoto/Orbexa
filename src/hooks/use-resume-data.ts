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
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const expiration = localStorage.getItem(EXPIRATION_KEY);

      if (savedData && expiration) {
        const expTime = parseInt(expiration);
        if (!isNaN(expTime) && Date.now() < expTime) {
          setData(JSON.parse(savedData));
        } else {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(EXPIRATION_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to parse resume data from storage:', error);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRATION_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const serialized = JSON.stringify(data);
        localStorage.setItem(STORAGE_KEY, serialized);
        localStorage.setItem(EXPIRATION_KEY, (Date.now() + TTL_MS).toString());
      } catch (error) {
        // Handle QuotaExceededError or other storage failures gracefully
        console.warn('LocalStorage save failed:', error);
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          // If quota is exceeded, we might want to alert the user or try saving without the image
          console.error('Storage quota exceeded. Resume data might be too large (likely the profile image).');
        }
      }
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
