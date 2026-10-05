import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { module1Service } from './module1Service';
import { ProfileOverviewCard } from './components/ProfileOverviewCard';
import { EditProfileModal } from './components/EditProfileModal';
import { DeveloperLinksSection } from './components/DeveloperLinksSection';
import { HackathonsSection } from './components/HackathonsSection';
import { Toast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';

export const Module1Page = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Load initial data
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [profData, linksData, hackData] = await Promise.all([
          module1Service.getProfile(),
          module1Service.getDeveloperLinks(),
          module1Service.getHackathons()
        ]);

        if (isMounted) {
          setProfile(profData);
          setLinks(linksData);
          setHackathons(hackData);
        }
      } catch (err) {
        console.error('Error loading Module 1 data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Profile actions
  const handleSaveProfile = async (updatedData) => {
    try {
      const saved = await module1Service.updateProfile(updatedData);
      setProfile(saved);
      setIsEditModalOpen(false);
      showToast('Profile updated successfully.');
    } catch (err) {
      showToast(err.message || 'Failed to update profile.', 'error');
    }
  };

  // Developer Link actions
  const handleAddLink = async (linkData) => {
    try {
      const created = await module1Service.addDeveloperLink(linkData);
      setLinks((prev) => [...prev, created]);
      showToast(`Added ${created.platform} link.`);
    } catch (err) {
      showToast(err.message || 'Failed to add link.', 'error');
    }
  };

  const handleEditLink = async (id, linkData) => {
    try {
      const updated = await module1Service.updateDeveloperLink(id, linkData);
      setLinks((prev) => prev.map((l) => (l.id === id ? updated : l)));
      showToast('Developer link updated.');
    } catch (err) {
      showToast(err.message || 'Failed to update link.', 'error');
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      await module1Service.deleteDeveloperLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
      showToast('Developer link removed.');
    } catch (err) {
      showToast(err.message || 'Failed to delete link.', 'error');
    }
  };

  // Hackathon actions
  const handleAddHackathon = async (hackData) => {
    try {
      const created = await module1Service.addHackathon(hackData);
      setHackathons((prev) => [created, ...prev]);
      showToast(`"${created.name}" added to hackathons.`);
    } catch (err) {
      showToast(err.message || 'Failed to add hackathon.', 'error');
    }
  };

  const handleEditHackathon = async (id, hackData) => {
    try {
      const updated = await module1Service.updateHackathon(id, hackData);
      setHackathons((prev) => prev.map((h) => (h.id === id ? updated : h)));
      showToast(`Updated "${updated.name}".`);
    } catch (err) {
      showToast(err.message || 'Failed to update hackathon.', 'error');
    }
  };

  const handleDeleteHackathon = async (id) => {
    try {
      await module1Service.deleteHackathon(id);
      setHackathons((prev) => prev.filter((h) => h.id !== id));
      showToast('Hackathon entry removed.');
    } catch (err) {
      showToast(err.message || 'Failed to delete hackathon.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="module1-loading-skeleton">
        <div className="skeleton-card skeleton-banner" />
        <div className="skeleton-card skeleton-profile" />
        <div className="skeleton-card skeleton-links" />
      </div>
    );
  }

  return (
    <div className="module1-container">
      {/* Toast Notification Container */}
      {toast && (
        <div className="module1-toast-anchor">
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
            duration={4000}
          />
        </div>
      )}

      {/* Module 1 Header Banner */}
      <section className="module-intro-banner">
        <div className="banner-text-block">
          <div className="module-kicker-tag">
            <UserCheck size={14} />
            <span>MODULE 1 • STUDENT IDENTITY & COMPETITION HUB</span>
          </div>
          <h1 className="module-heading">Profile & Portfolio Management</h1>
          <p className="module-desc">
            Maintain your student engineering credentials, public developer profiles, and track all hackathon registrations, deadlines, and awards in one unified workspace.
          </p>
        </div>

        <div className="banner-stats-pill">
          <div className="mini-stat">
            <span className="stat-num">{links.length}</span>
            <span className="stat-label">Profiles</span>
          </div>
          <div className="mini-stat-sep" />
          <div className="mini-stat">
            <span className="stat-num">{hackathons.length}</span>
            <span className="stat-label">Hackathons</span>
          </div>
          <div className="mini-stat-sep" />
          <div className="mini-stat">
            <span className="stat-num">
              {hackathons.filter((h) => ['Won', 'Finalist', 'Runner-up'].includes(h.status)).length}
            </span>
            <span className="stat-label">Podiums</span>
          </div>
        </div>
      </section>

      {/* 1. Student Profile Overview Card */}
      <ProfileOverviewCard
        profile={profile}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      {/* 2. Developer Links Section */}
      <DeveloperLinksSection
        links={links}
        onAddLink={handleAddLink}
        onEditLink={handleEditLink}
        onDeleteLink={handleDeleteLink}
      />

      {/* 3. My Hackathons Section */}
      <HackathonsSection
        hackathons={hackathons}
        onAddHackathon={handleAddHackathon}
        onEditHackathon={handleEditHackathon}
        onDeleteHackathon={handleDeleteHackathon}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        profile={profile}
        onSave={handleSaveProfile}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Module1Page;
