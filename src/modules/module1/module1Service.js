import {
  rahulDemoProfile,
  rahulDeveloperLinks,
  rahulHackathons
} from '../../demo/rahulDemoData.js';

const STORAGE_KEYS = {
  PROFILE: 'devtrack_m1_profile',
  LINKS: 'devtrack_m1_links',
  HACKATHONS: 'devtrack_m1_hackathons'
};

const API_BASE = '/api/v1';

const memoryCache = new Map();

/**
 * Helper to safely read from localStorage with in-memory & demo data fallback.
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
 * Service for Module 1: Student Profile, Developer Links & Hackathons.
 * Provides full persistence across browser refreshes and syncs with Java backend.
 */
export const module1Service = {
  // -------------------------------------------------------------
  // PROFILE
  // -------------------------------------------------------------

  async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: { 'X-Student-Id': 'stu_rahul_01' }
      });
      if (res.ok) {
        const data = await res.json();
        writeStorage(STORAGE_KEYS.PROFILE, data);
        return data;
      }
    } catch (e) {
      // Backend not reached or offline; fall back to storage
    }
    return readStorage(STORAGE_KEYS.PROFILE, {
      ...rahulDemoProfile,
      developerStatus: 'Active Problem Solver & AI/ML Undergrad'
    });
  },

  async updateProfile(profileData) {
    // 1. Persist to storage immediately
    const current = await this.getProfile();
    const updated = {
      ...current,
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    writeStorage(STORAGE_KEYS.PROFILE, updated);

    // 2. Sync with backend
    try {
      await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Student-Id': updated.id || 'stu_rahul_01'
        },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      // Offline fallback already persisted
    }

    return updated;
  },

  async uploadAvatar(avatarDataUrl) {
    return await this.updateProfile({ avatarUrl: avatarDataUrl });
  },

  async removeAvatar() {
    return await this.updateProfile({ avatarUrl: null });
  },

  // -------------------------------------------------------------
  // DEVELOPER LINKS
  // -------------------------------------------------------------

  async getDeveloperLinks() {
    try {
      const res = await fetch(`${API_BASE}/developer-links`, {
        headers: { 'X-Student-Id': 'stu_rahul_01' }
      });
      if (res.ok) {
        const data = await res.json();
        writeStorage(STORAGE_KEYS.LINKS, data);
        return data;
      }
    } catch (e) {
      // Backend offline fallback
    }
    return readStorage(STORAGE_KEYS.LINKS, rahulDeveloperLinks);
  },

  async addDeveloperLink(linkData) {
    if (!linkData.url || !linkData.url.match(/^https?:\/\//i)) {
      throw new Error('Please enter a valid URL beginning with http:// or https://');
    }

    const currentLinks = await this.getDeveloperLinks();
    const newLink = {
      ...linkData,
      id: 'link_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      studentId: 'stu_rahul_01',
      isCustom: linkData.isCustom ?? true
    };

    const updatedList = [...currentLinks, newLink];
    writeStorage(STORAGE_KEYS.LINKS, updatedList);

    try {
      await fetch(`${API_BASE}/developer-links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Student-Id': 'stu_rahul_01'
        },
        body: JSON.stringify(newLink)
      });
    } catch (e) {
      // Stored locally
    }

    return newLink;
  },

  async updateDeveloperLink(id, linkData) {
    if (!linkData.url || !linkData.url.match(/^https?:\/\//i)) {
      throw new Error('Please enter a valid URL beginning with http:// or https://');
    }

    const currentLinks = await this.getDeveloperLinks();
    const updatedList = currentLinks.map((l) =>
      l.id === id ? { ...l, ...linkData, id } : l
    );
    writeStorage(STORAGE_KEYS.LINKS, updatedList);

    try {
      await fetch(`${API_BASE}/developer-links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Student-Id': 'stu_rahul_01'
        },
        body: JSON.stringify(linkData)
      });
    } catch (e) {
      // Stored locally
    }

    return updatedList.find((l) => l.id === id);
  },

  async deleteDeveloperLink(id) {
    const currentLinks = await this.getDeveloperLinks();
    const updatedList = currentLinks.filter((l) => l.id !== id);
    writeStorage(STORAGE_KEYS.LINKS, updatedList);

    try {
      await fetch(`${API_BASE}/developer-links/${id}`, {
        method: 'DELETE',
        headers: { 'X-Student-Id': 'stu_rahul_01' }
      });
    } catch (e) {
      // Stored locally
    }

    return true;
  },

  // -------------------------------------------------------------
  // HACKATHONS
  // -------------------------------------------------------------

  async getHackathons(statusFilter = 'All', searchQuery = '') {
    let list = [];
    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'All') params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`${API_BASE}/hackathons?${params.toString()}`, {
        headers: { 'X-Student-Id': 'stu_rahul_01' }
      });
      if (res.ok) {
        list = await res.json();
        // Only write to storage if fetching all without filter to preserve complete dataset
        if (statusFilter === 'All' && !searchQuery) {
          writeStorage(STORAGE_KEYS.HACKATHONS, list);
        }
        return list;
      }
    } catch (e) {
      // Offline fallback
    }

    const all = readStorage(STORAGE_KEYS.HACKATHONS, rahulHackathons);

    return all.filter((h) => {
      if (statusFilter && statusFilter !== 'All') {
        if (h.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = h.name && h.name.toLowerCase().includes(q);
        const platMatch = h.platform && h.platform.toLowerCase().includes(q);
        const teamMatch = h.teamName && h.teamName.toLowerCase().includes(q);
        const achMatch = (h.achievement || h.result) && (h.achievement || h.result).toLowerCase().includes(q);
        return nameMatch || platMatch || teamMatch || achMatch;
      }
      return true;
    });
  },

  async addHackathon(hackathonData) {
    if (!hackathonData.name || !hackathonData.name.trim()) {
      throw new Error('Hackathon Name is required.');
    }
    if (hackathonData.eventUrl && !hackathonData.eventUrl.match(/^https?:\/\//i)) {
      throw new Error('Hackathon URL must begin with http:// or https://');
    }

    const current = readStorage(STORAGE_KEYS.HACKATHONS, rahulHackathons);
    const newHackathon = {
      ...hackathonData,
      id: 'hack_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      studentId: 'stu_rahul_01',
      createdAt: new Date().toISOString()
    };

    const updatedList = [newHackathon, ...current];
    writeStorage(STORAGE_KEYS.HACKATHONS, updatedList);

    try {
      await fetch(`${API_BASE}/hackathons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Student-Id': 'stu_rahul_01'
        },
        body: JSON.stringify(newHackathon)
      });
    } catch (e) {
      // Stored locally
    }

    return newHackathon;
  },

  async updateHackathon(id, hackathonData) {
    if (!hackathonData.name || !hackathonData.name.trim()) {
      throw new Error('Hackathon Name is required.');
    }
    if (hackathonData.eventUrl && !hackathonData.eventUrl.match(/^https?:\/\//i)) {
      throw new Error('Hackathon URL must begin with http:// or https://');
    }

    const current = readStorage(STORAGE_KEYS.HACKATHONS, rahulHackathons);
    const updatedList = current.map((h) =>
      h.id === id ? { ...h, ...hackathonData, id, updatedAt: new Date().toISOString() } : h
    );
    writeStorage(STORAGE_KEYS.HACKATHONS, updatedList);

    try {
      await fetch(`${API_BASE}/hackathons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Student-Id': 'stu_rahul_01'
        },
        body: JSON.stringify(hackathonData)
      });
    } catch (e) {
      // Stored locally
    }

    return updatedList.find((h) => h.id === id);
  },

  async deleteHackathon(id) {
    const current = readStorage(STORAGE_KEYS.HACKATHONS, rahulHackathons);
    const updatedList = current.filter((h) => h.id !== id);
    writeStorage(STORAGE_KEYS.HACKATHONS, updatedList);

    try {
      await fetch(`${API_BASE}/hackathons/${id}`, {
        method: 'DELETE',
        headers: { 'X-Student-Id': 'stu_rahul_01' }
      });
    } catch (e) {
      // Stored locally
    }

    return true;
  }
};
