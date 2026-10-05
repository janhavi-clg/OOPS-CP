/**
 * Module 6 Service: Resume Builder & Job-Specific Recommendations.
 * Manages resume state, cross-module data autofill (from M1, M2, M3, M4, M5),
 * and transparent profile match analysis.
 */

import { INITIAL_RESUMES, STANDARD_JOB_ROLES } from './module6Data.js';
import { module5Service } from '../module5/module5Service.js';

const STORAGE_KEYS = {
  RESUMES: 'devtrack_module6_resumes_v1',
  ACTIVE_RESUME_ID: 'devtrack_module6_active_id_v1'
};

const getStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) return globalThis.localStorage;
  return {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  };
};

class Module6Service {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    const s = getStorage();
    if (!s.getItem(STORAGE_KEYS.RESUMES)) {
      s.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(INITIAL_RESUMES));
    }
    if (!s.getItem(STORAGE_KEYS.ACTIVE_RESUME_ID)) {
      s.setItem(STORAGE_KEYS.ACTIVE_RESUME_ID, INITIAL_RESUMES[0].id);
    }
  }

  getResumes() {
    try {
      const stored = getStorage().getItem(STORAGE_KEYS.RESUMES);
      return stored ? JSON.parse(stored) : INITIAL_RESUMES;
    } catch (e) {
      console.error('Error reading resumes:', e);
      return INITIAL_RESUMES;
    }
  }

  getActiveResumeId() {
    return getStorage().getItem(STORAGE_KEYS.ACTIVE_RESUME_ID) || INITIAL_RESUMES[0].id;
  }

  setActiveResumeId(id) {
    getStorage().setItem(STORAGE_KEYS.ACTIVE_RESUME_ID, id);
  }

  getResumeById(id) {
    const list = this.getResumes();
    return list.find(r => r.id === id) || list[0] || null;
  }

  saveResume(resumeData) {
    const list = this.getResumes();
    const id = resumeData.id || `res_${Date.now()}`;
    const existingIndex = list.findIndex(r => r.id === id);

    const record = {
      ...resumeData,
      id,
      studentId: resumeData.studentId || 'student_rahul_001',
      updatedAt: new Date().toISOString()
    };

    let updatedList;
    if (existingIndex === -1) {
      record.createdAt = new Date().toISOString();
      updatedList = [record, ...list];
    } else {
      updatedList = list.map(r => (r.id === id ? record : r));
    }

    getStorage().setItem(STORAGE_KEYS.RESUMES, JSON.stringify(updatedList));
    this.setActiveResumeId(id);
    return record;
  }

  deleteResume(id) {
    const list = this.getResumes();
    if (list.length <= 1) {
      throw new Error('At least one resume must be maintained in your profile.');
    }
    const filtered = list.filter(r => r.id !== id);
    getStorage().setItem(STORAGE_KEYS.RESUMES, JSON.stringify(filtered));
    this.setActiveResumeId(filtered[0].id);
    return true;
  }

  createResume(title, template = 'modern') {
    const base = this.autofillFromProfile(title, template);
    return this.saveResume(base);
  }

  // --- Cross-Module Auto-Fill ---

  autofillFromProfile(title = 'Custom Resume', template = 'modern') {
    // 1. Module 4 Projects
    let m4Projects = [];
    try {
      const storedM4 = localStorage.getItem('devtrack_module4_projects_v1');
      if (storedM4) {
        m4Projects = JSON.parse(storedM4).slice(0, 3).map(p => ({
          id: `rp_${p.id || Date.now()}`,
          sourceProjectId: p.id,
          title: p.title,
          role: p.contribution?.role || 'Lead Developer',
          technologies: (p.technologies || []).map(t => typeof t === 'string' ? t : t.name),
          liveUrl: p.links?.find(l => l.type === 'LIVE' || l.type === 'DEMO')?.url || '',
          githubUrl: p.links?.find(l => l.type === 'GITHUB')?.url || '',
          highlights: p.keyFeatures || [p.shortDescription]
        }));
      }
    } catch (e) {
      console.warn('M4 projects fallback:', e);
    }

    // 2. Module 5 Achievements & Certificates
    const m5Achievements = module5Service.getAchievements('ALL', '').slice(0, 3).map(a => ({
      id: `ra_${a.id}`,
      title: a.title,
      organization: a.organization,
      date: a.achievementDate || '',
      description: a.description
    }));

    const m5Certificates = module5Service.getCertificates('ALL', '').slice(0, 3).map(c => ({
      id: `rc_${c.id}`,
      certificateName: c.certificateName,
      issuingOrganization: c.issuingOrganization,
      issueDate: c.issueDate,
      credentialId: c.credentialId
    }));

    // Default template structure
    return {
      id: `res_${Date.now()}`,
      studentId: 'student_rahul_001',
      title: title || 'New Placement Resume',
      template: template || 'modern',
      targetRole: 'Software Development Engineer (SDE)',
      jobDescription: '',
      profileMatchScore: 82,
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@pict.edu',
      phone: '+91 98765 43210',
      location: 'Pune, Maharashtra, India',
      githubUrl: 'https://github.com/rahulsharma',
      linkedinUrl: 'https://linkedin.com/in/rahul-sharma-dev',
      portfolioUrl: 'https://rahulsharma.dev',
      summary: 'Second-year Computer Science & Engineering (AI/ML) undergraduate with solid foundations in Data Structures & Algorithms, Java OOP, PostgreSQL, and full-stack web engineering. Experienced in building end-to-end platforms and active hackathon contributor.',
      sections: [
        { id: 'sec_summary', sectionKey: 'summary', title: 'Professional Summary', visible: true, orderIndex: 0 },
        { id: 'sec_education', sectionKey: 'education', title: 'Education', visible: true, orderIndex: 1 },
        { id: 'sec_skills', sectionKey: 'skills', title: 'Technical Skills', visible: true, orderIndex: 2 },
        { id: 'sec_projects', sectionKey: 'projects', title: 'Featured Projects', visible: true, orderIndex: 3 },
        { id: 'sec_experience', sectionKey: 'experience', title: 'Experience & Leadership', visible: true, orderIndex: 4 },
        { id: 'sec_achievements', sectionKey: 'achievements', title: 'Achievements & Hackathons', visible: true, orderIndex: 5 },
        { id: 'sec_certificates', sectionKey: 'certificates', title: 'Certifications', visible: true, orderIndex: 6 }
      ],
      education: [
        {
          id: 'edu_1',
          institution: 'Pune Institute of Computer Technology (PICT)',
          degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
          startYear: '2023',
          endYear: '2027',
          score: 'CGPA: 8.92 / 10.0',
          location: 'Pune, India'
        }
      ],
      experience: [
        {
          id: 'exp_1',
          company: 'DevTrack Open Core',
          role: 'Lead Frontend Contributor',
          location: 'Pune, India',
          startDate: 'Jan 2024',
          endDate: 'Present',
          current: true,
          highlights: [
            'Engineered modular state tracking for student engineering portfolios with reactive components.',
            'Integrated RESTful Spring Boot microservices with Supabase PostgreSQL.'
          ]
        }
      ],
      projects: m4Projects.length > 0 ? m4Projects : INITIAL_RESUMES[0].projects,
      skills: INITIAL_RESUMES[0].skills,
      achievements: m5Achievements.length > 0 ? m5Achievements : INITIAL_RESUMES[0].achievements,
      certificates: m5Certificates.length > 0 ? m5Certificates : INITIAL_RESUMES[0].certificates
    };
  }

  // --- Recommendation & Match Engine ---

  analyzeMatch(targetRole, jobDescription, currentResume) {
    const roleKey = (targetRole || 'sde').toLowerCase();
    let benchmark = STANDARD_JOB_ROLES.find(r =>
      roleKey.includes(r.roleKey) ||
      roleKey.includes(r.title.toLowerCase())
    );

    if (!benchmark) {
      benchmark = STANDARD_JOB_ROLES[0]; // Default to SDE
    }

    const targetSkills = new Set([...benchmark.requiredSkills, ...benchmark.preferredSkills]);

    // Parse custom job description keywords if present
    if (jobDescription && jobDescription.trim()) {
      const jdLower = jobDescription.toLowerCase();
      const candidates = ['python', 'java', 'sql', 'react', 'pytorch', 'tensorflow', 'docker', 'git', 'c++', 'fastapi', 'spring boot', 'pandas'];
      candidates.forEach(c => {
        if (jdLower.includes(c)) {
          targetSkills.add(c.charAt(0).toUpperCase() + c.slice(1));
        }
      });
    }

    // Extract student skills from resume
    const studentSkillsFlat = [];
    (currentResume?.skills || []).forEach(group => {
      (group.skills || []).forEach(s => {
        studentSkillsFlat.push(s.toLowerCase());
      });
    });

    const matchedSkills = [];
    const missingSkills = [];

    targetSkills.forEach(req => {
      const isMatched = studentSkillsFlat.some(s => s.includes(req.toLowerCase()));
      if (isMatched) {
        matchedSkills.push(req);
      } else {
        missingSkills.push(req);
      }
    });

    // Score calculations
    const skillScore = Math.round((matchedSkills.length / Math.max(1, targetSkills.size)) * 100);

    // Project matches
    const projectKeywords = benchmark.relevantProjectKeywords;
    const currentProjects = currentResume?.projects || [];
    let relevantProjectsCount = 0;
    currentProjects.forEach(p => {
      const text = `${p.title} ${(p.technologies || []).join(' ')}`.toLowerCase();
      if (projectKeywords.some(kw => text.includes(kw.toLowerCase()))) {
        relevantProjectsCount++;
      }
    });
    const projectScore = Math.min(100, relevantProjectsCount * 35);

    // Achievements matches
    const achKeywords = benchmark.relevantAchievementKeywords;
    const currentAch = currentResume?.achievements || [];
    let relevantAchCount = 0;
    currentAch.forEach(a => {
      const text = `${a.title} ${a.organization}`.toLowerCase();
      if (achKeywords.some(kw => text.includes(kw.toLowerCase()))) {
        relevantAchCount++;
      }
    });
    const achScore = Math.min(100, relevantAchCount * 35);

    // Transparent weighted match formula: 50% Skills, 30% Projects, 20% Achievements
    const overallScore = Math.max(15, Math.min(98, Math.round((skillScore * 0.5) + (projectScore * 0.3) + (achScore * 0.2))));

    return {
      targetRole: benchmark.title,
      overallScore,
      skillScore,
      projectScore,
      achScore,
      matchedSkills,
      missingSkills,
      recommendedSkills: Array.from(targetSkills),
      recommendedProjectKeywords: benchmark.relevantProjectKeywords,
      recommendedAchievementKeywords: benchmark.relevantAchievementKeywords
    };
  }

  // --- Professional PDF Printing/Export ---
  printResume(resumeTitle = 'Resume') {
    window.print();
  }
}

export const module6Service = new Module6Service();
export default module6Service;
