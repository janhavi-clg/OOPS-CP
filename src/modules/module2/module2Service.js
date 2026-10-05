import {
  INITIAL_SKILLS,
  INITIAL_RESOURCES,
  INITIAL_PROBLEMS,
  AVAILABLE_STANDARD_SKILLS
} from './module2Data.js';

const STORAGE_KEYS = {
  SKILLS: 'devtrack_m2_skills',
  RESOURCES: 'devtrack_m2_resources',
  PROBLEMS: 'devtrack_m2_problems'
};

const memoryCache = new Map();

/**
 * Helper to safely read from localStorage with in-memory fallback.
 */
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

/**
 * Helper to safely write to localStorage and in-memory cache.
 */
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

/**
 * Transparent Faculty-Explainable Progress Calculation Formula:
 * -------------------------------------------------------------
 * 1. Resource Completion % = (completedResources / totalResources) * 100
 * 2. Practice Problem % = Math.min(100.0, (solvedProblems / targetProblems) * 100)
 * 3. Overall Progress % = (Resource % * 0.50) + (Practice % * 0.50)
 * -------------------------------------------------------------
 */
export function calculateSkillProgress(skill, resources, problems) {
  const skillId = skill.id;
  const skillResources = resources.filter((r) => r.skillId === skillId);
  const totalResources = skillResources.length;
  const completedResources = skillResources.filter((r) => r.completed).length;

  const resourceProgressPercentage = totalResources > 0
    ? Math.round((completedResources / totalResources) * 1000) / 10
    : 0.0;

  const skillProblems = problems.filter((p) => p.skillId === skillId);
  const solvedProblems = skillProblems.length;
  const targetProblems = skill.targetProblemsCount > 0 ? skill.targetProblemsCount : 30;

  const practiceProgressPercentage = targetProblems > 0
    ? Math.min(100.0, Math.round((solvedProblems / targetProblems) * 1000) / 10)
    : 0.0;

  const rawOverall = (resourceProgressPercentage * 0.5) + (practiceProgressPercentage * 0.5);
  const overallProgressPercentage = Math.min(100.0, Math.max(0.0, Math.round(rawOverall * 10) / 10));

  return {
    skillId,
    skillName: skill.name,
    totalResources,
    completedResources,
    resourceProgressPercentage,
    solvedProblems,
    targetProblems,
    practiceProgressPercentage,
    overallProgressPercentage,
    currentLevel: skill.currentLevel,
    targetLevel: skill.targetLevel,
    status: skill.status || 'Active',
    lastActivity: skill.lastActivity || 'Recently active'
  };
}

export const module2Service = {
  // -------------------------------------------------------------
  // SKILLS CRUD
  // -------------------------------------------------------------

  async getSkills() {
    return readStorage(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  },

  async getAvailableSkills() {
    return AVAILABLE_STANDARD_SKILLS;
  },

  async addSkill(skillInput) {
    const skills = await this.getSkills();
    const title = (skillInput.name || skillInput.title || '').trim();
    if (!title) {
      throw new Error('Skill name is required.');
    }

    const alreadyExists = skills.some(
      (s) => s.name.toLowerCase() === title.toLowerCase()
    );
    if (alreadyExists) {
      throw new Error(`Skill "${title}" is already in your learning tracker.`);
    }

    const newSkill = {
      id: skillInput.id || `skill_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: title,
      category: skillInput.category || 'Programming',
      currentLevel: skillInput.currentLevel || 'Beginner',
      targetLevel: skillInput.targetLevel || 'Advanced',
      status: 'Active',
      isCustom: Boolean(skillInput.isCustom),
      targetProblemsCount: skillInput.targetProblemsCount || 25,
      lastActivity: 'Just added'
    };

    const updated = [newSkill, ...skills];
    writeStorage(STORAGE_KEYS.SKILLS, updated);
    return newSkill;
  },

  async addCustomSkill(name, category, currentLevel, targetLevel) {
    return this.addSkill({
      name,
      category: category || 'Custom',
      currentLevel: currentLevel || 'Beginner',
      targetLevel: targetLevel || 'Advanced',
      isCustom: true,
      targetProblemsCount: 25
    });
  },

  async removeSkill(skillId) {
    const skills = await this.getSkills();
    const updated = skills.filter((s) => s.id !== skillId);
    writeStorage(STORAGE_KEYS.SKILLS, updated);

    // Also remove associated resources and problems cleanly
    const resources = await this.getResources();
    const filteredResources = resources.filter((r) => r.skillId !== skillId);
    writeStorage(STORAGE_KEYS.RESOURCES, filteredResources);

    const problems = await this.getProblems();
    const filteredProblems = problems.filter((p) => p.skillId !== skillId);
    writeStorage(STORAGE_KEYS.PROBLEMS, filteredProblems);

    return true;
  },

  async updateSkill(skillId, updatedFields) {
    const skills = await this.getSkills();
    const index = skills.findIndex((s) => s.id === skillId);
    if (index === -1) {
      throw new Error(`Skill not found with ID ${skillId}`);
    }

    skills[index] = {
      ...skills[index],
      ...updatedFields,
      lastActivity: 'Updated recently'
    };

    writeStorage(STORAGE_KEYS.SKILLS, [...skills]);
    return skills[index];
  },

  // -------------------------------------------------------------
  // LEARNING RESOURCES CRUD
  // -------------------------------------------------------------

  async getResources(skillId = null) {
    const resources = readStorage(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
    if (skillId) {
      return resources.filter((r) => r.skillId === skillId);
    }
    return resources;
  },

  async addResource(resourceInput) {
    const title = (resourceInput.title || '').trim();
    if (!title) {
      throw new Error('Resource title is required.');
    }
    if (!resourceInput.skillId) {
      throw new Error('Please select a skill for this resource.');
    }

    const resources = await this.getResources();
    const newResource = {
      id: resourceInput.id || `res_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      skillId: resourceInput.skillId,
      skillName: resourceInput.skillName || 'Skill',
      title,
      platform: resourceInput.platform || 'YouTube',
      url: resourceInput.url ? resourceInput.url.trim() : '',
      type: resourceInput.type || 'Video',
      description: resourceInput.description || '',
      completed: Boolean(resourceInput.completed),
      completedDate: resourceInput.completed ? new Date().toISOString().split('T')[0] : null
    };

    const updated = [newResource, ...resources];
    writeStorage(STORAGE_KEYS.RESOURCES, updated);

    // Touch the skill's last activity
    await this.touchSkillActivity(newResource.skillId, 'Added resource');

    return newResource;
  },

  async toggleResourceComplete(resourceId, forceState = null) {
    const resources = await this.getResources();
    const index = resources.findIndex((r) => r.id === resourceId);
    if (index === -1) {
      throw new Error(`Resource not found with ID ${resourceId}`);
    }

    const current = resources[index];
    const nextCompleted = forceState !== null ? forceState : !current.completed;

    resources[index] = {
      ...current,
      completed: nextCompleted,
      completedDate: nextCompleted ? new Date().toISOString().split('T')[0] : null
    };

    writeStorage(STORAGE_KEYS.RESOURCES, [...resources]);

    // Touch the skill's last activity
    await this.touchSkillActivity(current.skillId, nextCompleted ? 'Completed resource' : 'Updated resource');

    return resources[index];
  },

  async updateResource(resourceId, updatedFields) {
    const resources = await this.getResources();
    const index = resources.findIndex((r) => r.id === resourceId);
    if (index === -1) {
      throw new Error(`Resource not found with ID ${resourceId}`);
    }

    resources[index] = {
      ...resources[index],
      ...updatedFields
    };

    writeStorage(STORAGE_KEYS.RESOURCES, [...resources]);
    return resources[index];
  },

  async deleteResource(resourceId) {
    const resources = await this.getResources();
    const found = resources.find((r) => r.id === resourceId);
    const updated = resources.filter((r) => r.id !== resourceId);
    writeStorage(STORAGE_KEYS.RESOURCES, updated);

    if (found) {
      await this.touchSkillActivity(found.skillId, 'Deleted resource');
    }
    return true;
  },

  // -------------------------------------------------------------
  // PRACTICE PROBLEMS CRUD
  // -------------------------------------------------------------

  async getProblems(skillId = null) {
    const problems = readStorage(STORAGE_KEYS.PROBLEMS, INITIAL_PROBLEMS);
    if (skillId) {
      return problems.filter((p) => p.skillId === skillId);
    }
    return problems;
  },

  async addProblem(problemInput) {
    const title = (problemInput.title || '').trim();
    if (!title) {
      throw new Error('Problem title is required.');
    }
    if (!problemInput.skillId) {
      throw new Error('Please select a skill for this practice problem.');
    }

    const problems = await this.getProblems();
    const newProblem = {
      id: problemInput.id || `prob_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title,
      skillId: problemInput.skillId,
      skillName: problemInput.skillName || 'Skill',
      platform: problemInput.platform || 'LeetCode',
      problemUrl: problemInput.problemUrl ? problemInput.problemUrl.trim() : '',
      difficulty: problemInput.difficulty || 'Medium',
      dateSolved: problemInput.dateSolved || new Date().toISOString().split('T')[0],
      notes: problemInput.notes || '',
      solution: {
        language: (problemInput.solution && problemInput.solution.language) || 'Java',
        code: (problemInput.solution && problemInput.solution.code) || '',
        notes: (problemInput.solution && problemInput.solution.notes) || ''
      }
    };

    const updated = [newProblem, ...problems];
    writeStorage(STORAGE_KEYS.PROBLEMS, updated);

    // Touch the skill's last activity
    await this.touchSkillActivity(newProblem.skillId, 'Solved problem');

    return newProblem;
  },

  async updateProblem(problemId, updatedFields) {
    const problems = await this.getProblems();
    const index = problems.findIndex((p) => p.id === problemId);
    if (index === -1) {
      throw new Error(`Problem not found with ID ${problemId}`);
    }

    problems[index] = {
      ...problems[index],
      ...updatedFields,
      solution: {
        ...problems[index].solution,
        ...(updatedFields.solution || {})
      }
    };

    writeStorage(STORAGE_KEYS.PROBLEMS, [...problems]);
    return problems[index];
  },

  async deleteProblem(problemId) {
    const problems = await this.getProblems();
    const found = problems.find((p) => p.id === problemId);
    const updated = problems.filter((p) => p.id !== problemId);
    writeStorage(STORAGE_KEYS.PROBLEMS, updated);

    if (found) {
      await this.touchSkillActivity(found.skillId, 'Deleted problem');
    }
    return true;
  },

  // -------------------------------------------------------------
  // PROGRESS & METRICS
  // -------------------------------------------------------------

  async getSkillProgress(skillId) {
    const skills = await this.getSkills();
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) {
      throw new Error(`Skill with ID ${skillId} not found.`);
    }

    const resources = await this.getResources();
    const problems = await this.getProblems();
    return calculateSkillProgress(skill, resources, problems);
  },

  async getAllSkillsProgress() {
    const skills = await this.getSkills();
    const resources = await this.getResources();
    const problems = await this.getProblems();

    return skills.map((skill) => calculateSkillProgress(skill, resources, problems));
  },

  async getOverallSummary() {
    const skills = await this.getSkills();
    const resources = await this.getResources();
    const problems = await this.getProblems();
    const progressList = skills.map((s) => calculateSkillProgress(s, resources, problems));

    const totalCompletedResources = resources.filter((r) => r.completed).length;
    const totalProblemsSolved = problems.length;

    const avgProgress = progressList.length > 0
      ? Math.round(
          (progressList.reduce((acc, p) => acc + p.overallProgressPercentage, 0) / progressList.length) * 10
        ) / 10
      : 0.0;

    return {
      totalTrackedSkills: skills.length,
      averageOverallProgress: avgProgress,
      totalResources: resources.length,
      completedResources: totalCompletedResources,
      totalProblemsSolved,
      problemsSolvedThisWeek: 8,
      resourcesCompletedThisWeek: 5,
      learningSessionsThisWeek: 6,
      currentStreakDays: 14,
      daysActiveThisWeek: 5
    };
  },

  async touchSkillActivity(skillId, activityText) {
    try {
      const skills = await this.getSkills();
      const index = skills.findIndex((s) => s.id === skillId);
      if (index !== -1) {
        skills[index].lastActivity = activityText;
        writeStorage(STORAGE_KEYS.SKILLS, [...skills]);
      }
    } catch (e) {
      // Non-blocking
    }
  },

  /**
   * Reset data to Rahul's pristine demo baseline.
   */
  async resetToDemoData() {
    writeStorage(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
    writeStorage(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
    writeStorage(STORAGE_KEYS.PROBLEMS, INITIAL_PROBLEMS);
    return true;
  }
};
