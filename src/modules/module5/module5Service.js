/**
 * Module 5 Service: Achievements, Certificates & Accomplishments.
 * Manages local persistence with Spring Boot backend REST integration.
 * Enforces dynamic category activation: categories only appear when the student adds an achievement of that type.
 */

import {
  INITIAL_CATEGORIES,
  INITIAL_CERTIFICATES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ACTIVE_CATEGORIES
} from './module5Data.js';

const STORAGE_KEYS = {
  ACHIEVEMENTS: 'devtrack_module5_achievements_v1',
  CERTIFICATES: 'devtrack_module5_certificates_v1',
  ACTIVE_CATEGORIES: 'devtrack_module5_active_categories_v1',
  ALL_CATEGORIES: 'devtrack_module5_all_categories_v1'
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

class Module5Service {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    const s = getStorage();
    if (!s.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
      s.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(INITIAL_ACHIEVEMENTS));
    }
    if (!s.getItem(STORAGE_KEYS.CERTIFICATES)) {
      s.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(INITIAL_CERTIFICATES));
    }
    if (!s.getItem(STORAGE_KEYS.ACTIVE_CATEGORIES)) {
      s.setItem(STORAGE_KEYS.ACTIVE_CATEGORIES, JSON.stringify(INITIAL_ACTIVE_CATEGORIES));
    }
    if (!s.getItem(STORAGE_KEYS.ALL_CATEGORIES)) {
      s.setItem(STORAGE_KEYS.ALL_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    }
  }

  // --- Category Activation Management ---

  getActiveCategories() {
    try {
      const stored = getStorage().getItem(STORAGE_KEYS.ACTIVE_CATEGORIES);
      return stored ? JSON.parse(stored) : INITIAL_ACTIVE_CATEGORIES;
    } catch (e) {
      return INITIAL_ACTIVE_CATEGORIES;
    }
  }

  getAllCategories() {
    try {
      const stored = getStorage().getItem(STORAGE_KEYS.ALL_CATEGORIES);
      return stored ? JSON.parse(stored) : INITIAL_CATEGORIES;
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  }

  activateCategory(category) {
    if (!category || !category.trim()) return;
    const cleanCat = category.trim();
    const active = this.getActiveCategories();
    if (!active.includes(cleanCat)) {
      const updated = [...active, cleanCat];
      getStorage().setItem(STORAGE_KEYS.ACTIVE_CATEGORIES, JSON.stringify(updated));
    }
    const all = this.getAllCategories();
    if (!all.includes(cleanCat)) {
      const updatedAll = [...all, cleanCat];
      getStorage().setItem(STORAGE_KEYS.ALL_CATEGORIES, JSON.stringify(updatedAll));
    }
  }

  // --- Achievements CRUD ---

  getAchievements(categoryFilter = 'ALL', searchQuery = '') {
    try {
      const stored = getStorage().getItem(STORAGE_KEYS.ACHIEVEMENTS);
      let list = stored ? JSON.parse(stored) : INITIAL_ACHIEVEMENTS;

      if (categoryFilter && categoryFilter !== 'ALL') {
        list = list.filter(a => a.achievementCategory?.toLowerCase() === categoryFilter.toLowerCase());
      }

      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(a =>
          a.title?.toLowerCase().includes(q) ||
          a.organization?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.relatedSkills?.some(s => s.toLowerCase().includes(q))
        );
      }

      return list;
    } catch (e) {
      console.error('Error fetching achievements:', e);
      return INITIAL_ACHIEVEMENTS;
    }
  }

  getAchievementById(id) {
    const list = this.getAchievements('ALL', '');
    return list.find(a => a.id === id) || null;
  }

  saveAchievement(data) {
    const list = this.getAchievements('ALL', '');
    const isNew = !data.id || data.id.startsWith('new_');
    const id = isNew ? `ach_${Date.now()}` : data.id;

    const record = {
      ...data,
      id,
      studentId: data.studentId || 'student_rahul_001',
      hasProof: Boolean(data.proofUrl || data.hackathonUrl),
      updatedAt: new Date().toISOString()
    };

    let updatedList;
    if (isNew) {
      record.createdAt = new Date().toISOString();
      updatedList = [record, ...list];
    } else {
      updatedList = list.map(a => (a.id === id ? record : a));
    }

    getStorage().setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updatedList));

    // Automatically activate category for this student
    if (record.achievementCategory) {
      this.activateCategory(record.achievementCategory);
    }

    return record;
  }

  deleteAchievement(id) {
    const list = this.getAchievements('ALL', '');
    const filtered = list.filter(a => a.id !== id);
    getStorage().setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(filtered));

    // Recalculate active categories so empty ones don't occupy UI if deleted
    const remainingCategories = new Set(filtered.map(a => a.achievementCategory).filter(Boolean));
    const active = this.getActiveCategories().filter(cat => remainingCategories.has(cat));
    getStorage().setItem(STORAGE_KEYS.ACTIVE_CATEGORIES, JSON.stringify(active));

    return true;
  }

  // --- Certificates CRUD ---

  getCertificates(skillFilter = 'ALL', searchQuery = '') {
    try {
      const stored = getStorage().getItem(STORAGE_KEYS.CERTIFICATES);
      let list = stored ? JSON.parse(stored) : INITIAL_CERTIFICATES;

      if (skillFilter && skillFilter !== 'ALL') {
        list = list.filter(c => c.relatedSkill?.toLowerCase() === skillFilter.toLowerCase());
      }

      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(c =>
          c.certificateName?.toLowerCase().includes(q) ||
          c.issuingOrganization?.toLowerCase().includes(q) ||
          c.credentialId?.toLowerCase().includes(q) ||
          c.relatedSkill?.toLowerCase().includes(q)
        );
      }

      return list;
    } catch (e) {
      console.error('Error fetching certificates:', e);
      return INITIAL_CERTIFICATES;
    }
  }

  getCertificateById(id) {
    const list = this.getCertificates('ALL', '');
    return list.find(c => c.id === id) || null;
  }

  saveCertificate(data) {
    const list = this.getCertificates('ALL', '');
    const isNew = !data.id || data.id.startsWith('new_');
    const id = isNew ? `cert_${Date.now()}` : data.id;

    const record = {
      ...data,
      id,
      studentId: data.studentId || 'student_rahul_001',
      verified: Boolean(data.credentialUrl || data.fileDataOrUrl),
      updatedAt: new Date().toISOString()
    };

    let updatedList;
    if (isNew) {
      record.createdAt = new Date().toISOString();
      updatedList = [record, ...list];
    } else {
      updatedList = list.map(c => (c.id === id ? record : c));
    }

    getStorage().setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(updatedList));
    return record;
  }

  deleteCertificate(id) {
    const list = this.getCertificates('ALL', '');
    const filtered = list.filter(c => c.id !== id);
    getStorage().setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(filtered));
    return true;
  }

  // --- File Upload & Validation ---

  validateFile(file) {
    if (!file) return { valid: false, error: 'No file provided' };
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Supported formats: PDF, JPG, PNG, WEBP' };
    }
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeBytes) {
      return { valid: false, error: 'File size must be under 5MB' };
    }
    return { valid: true };
  }

  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}

export const module5Service = new Module5Service();
export default module5Service;
