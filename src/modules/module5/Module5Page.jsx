import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  Trophy,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { module5Service } from './module5Service';
import { CertificateCard } from './components/CertificateCard';
import { AchievementCard } from './components/AchievementCard';
import { CertificateModal } from './components/CertificateModal';
import { AddAchievementModal } from './components/AddAchievementModal';
import { ProofViewerModal } from './components/ProofViewerModal';
import { CategoryFilterPills } from './components/CategoryFilterPills';
import { Toast } from '../../components/common/Toast';
import './module5.css';

export const Module5Page = () => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'CERTIFICATES', 'ACHIEVEMENTS'
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [skillFilter, setSkillFilter] = useState('ALL');

  // Modals state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certToEdit, setCertToEdit] = useState(null);

  const [isAchModalOpen, setIsAchModalOpen] = useState(false);
  const [achToEdit, setAchToEdit] = useState(null);

  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [proofItem, setProofItem] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadData = () => {
    setAchievements(module5Service.getAchievements('ALL', ''));
    setCertificates(module5Service.getCertificates('ALL', ''));
    setActiveCategories(module5Service.getActiveCategories());
    setAllCategories(module5Service.getAllCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered achievements
  const filteredAchievements = useMemo(() => {
    return module5Service.getAchievements(selectedCategory, searchQuery);
  }, [achievements, selectedCategory, searchQuery]);

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    return module5Service.getCertificates(skillFilter, searchQuery);
  }, [certificates, skillFilter, searchQuery]);

  // Unique skills from certificates for quick filtering
  const availableSkills = useMemo(() => {
    const set = new Set();
    certificates.forEach(c => {
      if (c.relatedSkill) set.add(c.relatedSkill);
    });
    return Array.from(set);
  }, [certificates]);

  // Handlers for Certificates
  const handleSaveCertificate = (certData) => {
    module5Service.saveCertificate(certData);
    setIsCertModalOpen(false);
    setCertToEdit(null);
    loadData();
    showToast(certToEdit ? 'Certificate updated successfully' : 'Certificate added successfully', 'success');
  };

  const handleDeleteCertificate = (id) => {
    module5Service.deleteCertificate(id);
    loadData();
    showToast('Certificate removed', 'info');
  };

  // Handlers for Achievements
  const handleSaveAchievement = (achData) => {
    module5Service.saveAchievement(achData);
    setIsAchModalOpen(false);
    setAchToEdit(null);
    loadData();
    showToast(achToEdit ? 'Achievement updated successfully' : 'Achievement added successfully', 'success');
  };

  const handleDeleteAchievement = (id) => {
    module5Service.deleteAchievement(id);
    loadData();
    showToast('Achievement removed', 'info');
  };

  const handleAddCustomCategory = (catName) => {
    module5Service.activateCategory(catName);
    loadData();
    setSelectedCategory(catName);
    showToast(`Category "${catName}" activated!`, 'success');
  };

  return (
    <div className="module5-page-container">
      {/* Toast Feedback */}
      {toast && (
        <div className="module5-toast-anchor">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      {/* Hero Header */}
      <header className="module5-hero-header">
        <div className="hero-left">
          <div className="hero-badge">
            <Award size={14} />
            <span>MODULE 5 • VERIFIED CREDENTIALS</span>
          </div>
          <h1 className="hero-title">Achievements & Certifications</h1>
          <p className="hero-subtitle">
            Curate and manage your competitive hackathons, collegiate awards, and industry certificates with verified credentials.
          </p>
        </div>

        <div className="hero-action-buttons">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setAchToEdit(null);
              setIsAchModalOpen(true);
            }}
          >
            <Plus size={16} />
            <span>+ Add Achievement</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setCertToEdit(null);
              setIsCertModalOpen(true);
            }}
          >
            <Award size={16} />
            <span>+ Add Certificate</span>
          </button>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="module5-metrics-bar">
        <div className="metric-pill">
          <span className="metric-label">Certificates Stored</span>
          <span className="metric-value">{certificates.length}</span>
        </div>
        <div className="metric-pill">
          <span className="metric-label">Hackathons & Wins</span>
          <span className="metric-value">
            {achievements.filter(a => a.achievementCategory === 'Hackathon Achievement').length}
          </span>
        </div>
        <div className="metric-pill">
          <span className="metric-label">Active Categories</span>
          <span className="metric-value">{activeCategories.length}</span>
        </div>
        <div className="metric-pill">
          <span className="metric-label">Verified Proofs</span>
          <span className="metric-value">
            {certificates.filter(c => c.verified).length + achievements.filter(a => a.hasProof).length}
          </span>
        </div>
      </section>

      {/* Filter and Tab Toolbar */}
      <section className="module5-controls-section">
        <div className="tab-pills-row">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            Overview (All)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'CERTIFICATES' ? 'active' : ''}`}
            onClick={() => setActiveTab('CERTIFICATES')}
          >
            Certificates ({certificates.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'ACHIEVEMENTS' ? 'active' : ''}`}
            onClick={() => setActiveTab('ACHIEVEMENTS')}
          >
            Achievements & Hackathons ({achievements.length})
          </button>
        </div>

        <div className="search-filter-row">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, organization, or skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {availableSkills.length > 0 && (
            <div className="skill-filter-wrapper">
              <Filter size={14} className="filter-icon" />
              <select
                value={skillFilter}
                onChange={e => setSkillFilter(e.target.value)}
              >
                <option value="ALL">All Skills</option>
                {availableSkills.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Dynamic Category Filter Pills */}
        <CategoryFilterPills
          activeCategories={activeCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddCustomCategory={handleAddCustomCategory}
        />
      </section>

      {/* Main Content Sections */}
      <main className="module5-content-body">
        {/* Section 1: Certificates Grid (if Tab is ALL or CERTIFICATES) */}
        {(activeTab === 'ALL' || activeTab === 'CERTIFICATES') && (
          <section className="section-block">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <Award size={18} className="sec-icon" />
                <h2>Accredited Certificates ({filteredCertificates.length})</h2>
              </div>
              <button
                type="button"
                className="section-add-btn"
                onClick={() => {
                  setCertToEdit(null);
                  setIsCertModalOpen(true);
                }}
              >
                <Plus size={14} /> Add Certificate
              </button>
            </div>

            {filteredCertificates.length === 0 ? (
              <div className="empty-state-card">
                <Award size={36} className="empty-icon" />
                <h4>No Certificates Found</h4>
                <p>No certificates match your search filters or active criteria.</p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsCertModalOpen(true)}
                >
                  + Add First Certificate
                </button>
              </div>
            ) : (
              <div className="cert-cards-grid">
                {filteredCertificates.map(cert => (
                  <CertificateCard
                    key={cert.id}
                    certificate={cert}
                    onView={(c) => {
                      setProofItem(c);
                      setIsProofModalOpen(true);
                    }}
                    onEdit={(c) => {
                      setCertToEdit(c);
                      setIsCertModalOpen(true);
                    }}
                    onDelete={handleDeleteCertificate}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section 2: Achievements & Hackathons Grid (if Tab is ALL or ACHIEVEMENTS) */}
        {(activeTab === 'ALL' || activeTab === 'ACHIEVEMENTS') && (
          <section className="section-block">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <Trophy size={18} className="sec-icon" />
                <h2>Achievements & Hackathons ({filteredAchievements.length})</h2>
              </div>
              <button
                type="button"
                className="section-add-btn"
                onClick={() => {
                  setAchToEdit(null);
                  setIsAchModalOpen(true);
                }}
              >
                <Plus size={14} /> Add Achievement
              </button>
            </div>

            {filteredAchievements.length === 0 ? (
              <div className="empty-state-card">
                <Trophy size={36} className="empty-icon" />
                <h4>No Achievements Found</h4>
                <p>Add your first hackathon or competition accolade to showcase on your profile.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsAchModalOpen(true)}
                >
                  + Add Achievement
                </button>
              </div>
            ) : (
              <div className="achievement-cards-grid">
                {filteredAchievements.map(ach => (
                  <AchievementCard
                    key={ach.id}
                    achievement={ach}
                    onView={(a) => {
                      setProofItem(a);
                      setIsProofModalOpen(true);
                    }}
                    onEdit={(a) => {
                      setAchToEdit(a);
                      setIsAchModalOpen(true);
                    }}
                    onDelete={handleDeleteAchievement}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => {
          setIsCertModalOpen(false);
          setCertToEdit(null);
        }}
        certificateToEdit={certToEdit}
        onSave={handleSaveCertificate}
      />

      <AddAchievementModal
        isOpen={isAchModalOpen}
        onClose={() => {
          setIsAchModalOpen(false);
          setAchToEdit(null);
        }}
        achievementToEdit={achToEdit}
        availableCategories={allCategories}
        onSave={handleSaveAchievement}
      />

      <ProofViewerModal
        isOpen={isProofModalOpen}
        onClose={() => {
          setIsProofModalOpen(false);
          setProofItem(null);
        }}
        item={proofItem}
      />
    </div>
  );
};

export default Module5Page;
