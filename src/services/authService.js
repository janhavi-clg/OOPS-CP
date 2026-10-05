import { rahulDemoProfile } from '../demo/rahulDemoData.js';

const DEMO_USER_NAME = 'Rahul';
const DEMO_USER_PASS = 'Rahul 123';
const STORAGE_KEY = 'devtrack_active_user';

/**
 * Authentication service handling prototype demonstration login
 * with safe extensibility for Supabase authentication in future phases.
 */
export const authService = {
  /**
   * Attempt demo or credential login.
   * Matches exact faculty demo credentials:
   * Name/Email: Rahul
   * Password: Rahul 123
   */
  async login(identifier, password) {
    // Artificial small delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleanIdentifier = (identifier || '').trim();
    const cleanPassword = (password || '').trim();

    // Verify demo credentials
    const isDemoMatch =
      cleanIdentifier.toLowerCase() === DEMO_USER_NAME.toLowerCase() &&
      cleanPassword === DEMO_USER_PASS;

    if (isDemoMatch) {
      const authenticatedUser = {
        ...rahulDemoProfile,
        isDemo: true,
        authenticatedAt: new Date().toISOString()
      };

      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
        }
      } catch (e) {
        console.warn('Storage unavailable:', e);
      }

      return {
        success: true,
        user: authenticatedUser
      };
    }

    return {
      success: false,
      error: 'Invalid demo credentials. Use Rahul and Rahul 123.'
    };
  },

  /**
   * Check if an active session exists.
   */
  getCurrentUser() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.warn('Error reading stored user session:', e);
    }
    // Default to Rahul for seamless faculty preview
    return rahulDemoProfile;
  },

  /**
   * Sign out the active user.
   */
  logout() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Error clearing stored session:', e);
    }
  }
};
