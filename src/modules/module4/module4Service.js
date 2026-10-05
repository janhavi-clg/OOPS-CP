/**
 * Module 4 Service Layer: Project & Portfolio Management.
 * Handles CRUD operations, search/filtering, timeline milestones, achievements,
 * image processing, local storage persistence, and portfolio showcase generation.
 */

import {
  INITIAL_DEMO_PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  POPULAR_TECHNOLOGIES,
  STANDARD_ROLES,
  ACHIEVEMENT_TYPES
} from './module4Data.js';

const STORAGE_KEY = 'devtrack_m4_projects';
const memoryCache = new Map();

function readStorage(key, fallback) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
  }
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  return fallback;
}

function writeStorage(key, value) {
  memoryCache.set(key, value);
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e);
  }
}

export const module4Service = {
  // -------------------------------------------------------------
  // METADATA CATALOGS
  // -------------------------------------------------------------
  getCategories() {
    return PROJECT_CATEGORIES;
  },

  getStatuses() {
    return PROJECT_STATUSES;
  },

  getPopularTechnologies() {
    return POPULAR_TECHNOLOGIES;
  },

  getStandardRoles() {
    return STANDARD_ROLES;
  },

  getAchievementTypes() {
    return ACHIEVEMENT_TYPES;
  },

  // -------------------------------------------------------------
  // PROJECTS CRUD
  // -------------------------------------------------------------
  async getProjects(filters = {}) {
    const { search, status, category, tech, sort = 'RECENT' } = filters;
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);

    let filtered = all.filter((p) => {
      // 1. Search Query (Name, shortDescription, category, role, tech)
      if (search && search.trim()) {
        const query = search.toLowerCase().trim();
        const matchName = p.name?.toLowerCase().includes(query);
        const matchDesc = p.shortDescription?.toLowerCase().includes(query);
        const matchCat = p.category?.toLowerCase().includes(query);
        const matchRole = p.contribution?.role?.toLowerCase().includes(query);
        const matchTech = p.technologies?.some((t) =>
          (typeof t === 'string' ? t : t.name)?.toLowerCase().includes(query)
        );
        if (!matchName && !matchDesc && !matchCat && !matchRole && !matchTech) {
          return false;
        }
      }

      // 2. Status Filter
      if (status && status !== 'ALL') {
        if (p.status?.toUpperCase() !== status.toUpperCase()) {
          return false;
        }
      }

      // 3. Category Filter
      if (category && category !== 'ALL') {
        if (!p.category?.toLowerCase().includes(category.toLowerCase())) {
          return false;
        }
      }

      // 4. Technology Filter
      if (tech && tech !== 'ALL') {
        const hasTech = p.technologies?.some((t) => {
          const name = typeof t === 'string' ? t : t.name;
          return name?.toLowerCase() === tech.toLowerCase();
        });
        if (!hasTech) return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sort === 'ALPHABETICAL') {
        return a.name.localeCompare(b.name);
      }
      if (sort === 'PROGRESS') {
        return (b.progressPercentage || 0) - (a.progressPercentage || 0);
      }
      if (sort === 'OLDEST') {
        return (a.startDate || '').localeCompare(b.startDate || '');
      }
      if (sort === 'NEWEST') {
        return (b.startDate || '').localeCompare(a.startDate || '');
      }
      // Default: RECENT (updatedAt or order in array)
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });

    return filtered;
  },

  async getProjectById(id) {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    return all.find((p) => p.id === id) || null;
  },

  async createProject(projectData) {
    this.validateProjectInput(projectData);

    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const newId = 'proj_' + Math.random().toString(36).substring(2, 9);

    const sanitizedProgress =
      projectData.status === 'COMPLETED'
        ? 100
        : Math.min(100, Math.max(0, Number(projectData.progressPercentage) || 0));

    const newProject = {
      id: newId,
      name: projectData.name.trim(),
      shortDescription: projectData.shortDescription?.trim() || '',
      detailedDescription: projectData.detailedDescription?.trim() || '',
      problemStatement: projectData.problemStatement?.trim() || '',
      solutionOverview: projectData.solutionOverview?.trim() || '',
      category: projectData.category?.trim() || 'Web Development',
      status: projectData.status?.toUpperCase() || 'IN_PROGRESS',
      progressPercentage: sanitizedProgress,
      startDate: projectData.startDate || '',
      endDate: projectData.status === 'COMPLETED' ? (projectData.endDate || 'Completed') : (projectData.endDate || 'Present'),
      imageUrl: projectData.imageUrl?.trim() || '',
      featured: Boolean(projectData.featured),
      contribution: {
        role: projectData.contribution?.role?.trim() || 'Developer',
        contributionDetails: projectData.contribution?.contributionDetails?.trim() || '',
        teamSize: Math.max(1, Number(projectData.contribution?.teamSize) || 1)
      },
      technologies: (projectData.technologies || []).map((t) =>
        typeof t === 'string' ? { name: t, category: 'General', primary: false } : t
      ),
      links: (projectData.links || []).filter((l) => l.url && l.url.trim()),
      keyFeatures: (projectData.keyFeatures || []).filter((f) => f && f.trim()),
      achievements: projectData.achievements || [],
      milestones: projectData.milestones || [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    all.unshift(newProject);
    writeStorage(STORAGE_KEY, all);
    return newProject;
  },

  async updateProject(id, updatedData) {
    this.validateProjectInput(updatedData);

    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const index = all.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    const existing = all[index];
    const sanitizedProgress =
      updatedData.status === 'COMPLETED'
        ? 100
        : Math.min(100, Math.max(0, Number(updatedData.progressPercentage) || 0));

    const updated = {
      ...existing,
      ...updatedData,
      id: existing.id, // Immutable ID
      name: updatedData.name.trim(),
      progressPercentage: sanitizedProgress,
      contribution: {
        role: updatedData.contribution?.role?.trim() || existing.contribution?.role || 'Developer',
        contributionDetails: updatedData.contribution?.contributionDetails?.trim() || existing.contribution?.contributionDetails || '',
        teamSize: Math.max(1, Number(updatedData.contribution?.teamSize) || existing.contribution?.teamSize || 1)
      },
      technologies: (updatedData.technologies || existing.technologies).map((t) =>
        typeof t === 'string' ? { name: t, category: 'General', primary: false } : t
      ),
      links: (updatedData.links || existing.links).filter((l) => l.url && l.url.trim()),
      keyFeatures: (updatedData.keyFeatures || existing.keyFeatures).filter((f) => f && f.trim()),
      achievements: updatedData.achievements || existing.achievements,
      milestones: updatedData.milestones || existing.milestones,
      updatedAt: Date.now()
    };

    all[index] = updated;
    writeStorage(STORAGE_KEY, all);
    return updated;
  },

  async deleteProject(id) {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const filtered = all.filter((p) => p.id !== id);

    if (filtered.length === all.length) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    writeStorage(STORAGE_KEY, filtered);
    return { success: true, id };
  },

  async toggleFeatured(id) {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const project = all.find((p) => p.id === id);

    if (!project) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    project.featured = !project.featured;
    project.updatedAt = Date.now();
    writeStorage(STORAGE_KEY, all);
    return project;
  },

  // -------------------------------------------------------------
  // MILESTONES MANAGEMENT
  // -------------------------------------------------------------
  async addMilestone(projectId, milestone) {
    if (!milestone.title || !milestone.title.trim()) {
      throw new Error('Milestone title is required.');
    }

    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const project = all.find((p) => p.id === projectId);
    if (!project) throw new Error(`Project with ID ${projectId} not found.`);

    if (!project.milestones) project.milestones = [];

    const newMilestone = {
      id: 'ms_' + Math.random().toString(36).substring(2, 8),
      title: milestone.title.trim(),
      description: milestone.description?.trim() || '',
      date: milestone.date || '',
      completed: milestone.completed !== undefined ? Boolean(milestone.completed) : true,
      orderIndex: project.milestones.length + 1
    };

    project.milestones.push(newMilestone);
    project.updatedAt = Date.now();
    writeStorage(STORAGE_KEY, all);
    return newMilestone;
  },

  async updateMilestone(projectId, milestoneId, updatedData) {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const project = all.find((p) => p.id === projectId);
    if (!project || !project.milestones) {
      throw new Error(`Project or milestone not found.`);
    }

    const m = project.milestones.find((item) => item.id === milestoneId);
    if (!m) throw new Error(`Milestone with ID ${milestoneId} not found.`);

    if (updatedData.title) m.title = updatedData.title.trim();
    if (updatedData.description !== undefined) m.description = updatedData.description.trim();
    if (updatedData.date !== undefined) m.date = updatedData.date;
    if (updatedData.completed !== undefined) m.completed = Boolean(updatedData.completed);

    project.updatedAt = Date.now();
    writeStorage(STORAGE_KEY, all);
    return m;
  },

  async deleteMilestone(projectId, milestoneId) {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const project = all.find((p) => p.id === projectId);
    if (!project || !project.milestones) {
      throw new Error(`Project with ID ${projectId} not found.`);
    }

    project.milestones = project.milestones.filter((m) => m.id !== milestoneId);
    project.updatedAt = Date.now();
    writeStorage(STORAGE_KEY, all);
    return { success: true, id: milestoneId };
  },

  // -------------------------------------------------------------
  // ACHIEVEMENTS MANAGEMENT
  // -------------------------------------------------------------
  async addAchievement(projectId, achievement) {
    if (!achievement.title || !achievement.title.trim()) {
      throw new Error('Achievement title is required.');
    }

    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const project = all.find((p) => p.id === projectId);
    if (!project) throw new Error(`Project with ID ${projectId} not found.`);

    if (!project.achievements) project.achievements = [];

    const newAch = {
      id: 'ach_' + Math.random().toString(36).substring(2, 8),
      title: achievement.title.trim(),
      awardType: achievement.awardType?.trim() || 'Recognition',
      organization: achievement.organization?.trim() || '',
      date: achievement.date || ''
    };

    project.achievements.push(newAch);
    project.updatedAt = Date.now();
    writeStorage(STORAGE_KEY, all);
    return newAch;
  },

  async deleteAchievement(projectId, achievementId) {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    const project = all.find((p) => p.id === projectId);
    if (!project || !project.achievements) {
      throw new Error(`Project not found.`);
    }

    project.achievements = project.achievements.filter((a) => a.id !== achievementId);
    project.updatedAt = Date.now();
    writeStorage(STORAGE_KEY, all);
    return { success: true, id: achievementId };
  },

  // -------------------------------------------------------------
  // OVERVIEW METRICS & PORTFOLIO PREVIEW
  // -------------------------------------------------------------
  async getOverviewStats() {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);

    const total = all.length;
    const completed = all.filter((p) => p.status === 'COMPLETED').length;
    const inProgress = all.filter((p) => p.status === 'IN_PROGRESS').length;
    const planning = all.filter((p) => p.status === 'PLANNING').length;
    const featured = all.filter((p) => p.featured).length;

    const uniqueTechs = new Set();
    all.forEach((p) => {
      (p.technologies || []).forEach((t) => {
        const name = typeof t === 'string' ? t : t.name;
        if (name) uniqueTechs.add(name);
      });
    });

    return {
      totalProjects: total,
      completedCount: completed,
      inProgressCount: inProgress,
      planningCount: planning,
      featuredCount: featured,
      technologiesCount: uniqueTechs.size,
      technologiesList: Array.from(uniqueTechs).sort(),
      recentProjects: all.slice(0, 3)
    };
  },

  async getPortfolioPreview() {
    const all = readStorage(STORAGE_KEY, INITIAL_DEMO_PROJECTS);
    let featured = all.filter((p) => p.featured);

    if (featured.length === 0 && all.length > 0) {
      featured = all.slice(0, 3);
    }

    const techSet = new Set();
    const allAchievements = [];

    featured.forEach((p) => {
      (p.technologies || []).forEach((t) => {
        const name = typeof t === 'string' ? t : t.name;
        if (name) techSet.add(name);
      });
    });

    all.forEach((p) => {
      if (p.achievements) {
        p.achievements.forEach((ach) => {
          allAchievements.push({
            ...ach,
            projectName: p.name,
            projectId: p.id
          });
        });
      }
    });

    return {
      studentName: 'Rahul',
      headline: 'Second Year CSE (AI/ML) Developer & Full Stack Builder',
      college: 'Apex Institute of Technology',
      featuredProjects: featured,
      techStack: Array.from(techSet).sort(),
      achievements: allAchievements,
      totalProjects: all.length,
      featuredCount: featured.length
    };
  },

  // -------------------------------------------------------------
  // VALIDATION & HELPERS
  // -------------------------------------------------------------
  validateProjectInput(project) {
    if (!project || typeof project !== 'object') {
      throw new Error('Invalid project data provided.');
    }
    if (!project.name || !project.name.trim()) {
      throw new Error('Project name is required.');
    }
    if (project.progressPercentage !== undefined) {
      const num = Number(project.progressPercentage);
      if (isNaN(num) || num < 0 || num > 100) {
        throw new Error('Progress must be a valid percentage between 0 and 100.');
      }
    }
    if (project.contribution && project.contribution.teamSize !== undefined) {
      const size = Number(project.contribution.teamSize);
      if (isNaN(size) || size < 1) {
        throw new Error('Team size must be at least 1.');
      }
    }
    if (project.links && Array.isArray(project.links)) {
      project.links.forEach((link) => {
        if (link.url && link.url.trim()) {
          const urlStr = link.url.trim();
          if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
            throw new Error(`Invalid URL scheme for ${link.label || 'link'}. Must start with http:// or https://`);
          }
        }
      });
    }
    return true;
  },

  processImageUpload(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('No file provided.'));
      }
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        return reject(new Error('Invalid image type. Please upload JPG, PNG, or WEBP.'));
      }
      // Max 4MB size check
      if (file.size > 4 * 1024 * 1024) {
        return reject(new Error('Image file size must be less than 4MB.'));
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  }
};

export default module4Service;
