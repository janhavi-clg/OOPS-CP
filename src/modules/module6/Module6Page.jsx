import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Plus,
  Download,
  Save,
  Trash2,
  Sparkles,
  Layers,
  CheckCircle,
  Briefcase,
  BookOpen,
  Award,
  ChevronRight,
  Printer
} from 'lucide-react';
import { module6Service } from './module6Service';
import { RESUME_TEMPLATES } from './module6Data';
import { ResumePreview } from './components/ResumePreview';
import { JobRecommendationPanel } from './components/JobRecommendationPanel';
import { SectionManager } from './components/SectionManager';
import { ProjectSelectorModal } from './components/ProjectSelectorModal';
import { AchievementSelectorModal } from './components/AchievementSelectorModal';
import { ManualItemModal } from './components/ManualItemModal';
import { Toast } from '../../components/common/Toast';
import './module6.css';

export const Module6Page = () => {
  const [resumes, setResumes] = useState([]);
  const [activeResume, setActiveResume] = useState(null);

  // Recommendation State
  const [targetRole, setTargetRole] = useState('Software Development Engineer (SDE)');
  const [jobDescription, setJobDescription] = useState('');
  const [matchData, setMatchData] = useState(null);

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAchModalOpen, setIsAchModalOpen] = useState(false);
  const [manualModalConfig, setManualModalConfig] = useState({ isOpen: false, type: 'EDUCATION' });

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadResumes = () => {
    const list = module6Service.getResumes();
    setResumes(list);
    const activeId = module6Service.getActiveResumeId();
    const current = list.find(r => r.id === activeId) || list[0];
    setActiveResume(current);
    if (current?.targetRole) {
      setTargetRole(current.targetRole);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  // Re-calculate match score when activeResume, targetRole, or jobDescription change
  useEffect(() => {
    if (activeResume) {
      const match = module6Service.analyzeMatch(targetRole, jobDescription, activeResume);
      setMatchData(match);
    }
  }, [activeResume, targetRole, jobDescription]);

  // Handlers for Resume Switching & Creation
  const handleSelectResume = (id) => {
    module6Service.setActiveResumeId(id);
    const found = resumes.find(r => r.id === id);
    if (found) {
      setActiveResume(found);
      if (found.targetRole) setTargetRole(found.targetRole);
    }
  };

  const handleCreateNewResume = () => {
    const title = prompt('Enter a title for your new resume:', 'New Career Resume');
    if (!title) return;
    const created = module6Service.createResume(title, activeResume?.template || 'modern');
    loadResumes();
    setActiveResume(created);
    showToast(`Created resume: "${created.title}"`, 'success');
  };

  const handleDeleteCurrentResume = () => {
    if (!activeResume) return;
    if (window.confirm(`Are you sure you want to delete "${activeResume.title}"?`)) {
      try {
        module6Service.deleteResume(activeResume.id);
        loadResumes();
        showToast('Resume removed', 'info');
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleSaveResume = () => {
    if (!activeResume) return;
    const updated = {
      ...activeResume,
      targetRole,
      jobDescription,
      profileMatchScore: matchData?.overallScore || activeResume.profileMatchScore
    };
    module6Service.saveResume(updated);
    setActiveResume(updated);
    showToast('Resume saved successfully!', 'success');
  };

  // Section Layout Handlers
  const handleReorderSection = (sectionId, delta) => {
    if (!activeResume) return;
    const list = [...(activeResume.sections || [])];
    const index = list.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    const targetIdx = index + delta;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const [moved] = list.splice(index, 1);
    list.splice(targetIdx, 0, moved);

    const reindexed = list.map((s, idx) => ({ ...s, orderIndex: idx }));
    setActiveResume({ ...activeResume, sections: reindexed });
  };

  const handleToggleSectionVisibility = (sectionId) => {
    if (!activeResume) return;
    const updated = (activeResume.sections || []).map(s => {
      if (s.id === sectionId) return { ...s, visible: !s.visible };
      return s;
    });
    setActiveResume({ ...activeResume, sections: updated });
  };

  const handleAddCustomSection = (title) => {
    if (!activeResume) return;
    const newSec = {
      id: `sec_custom_${Date.now()}`,
      sectionKey: 'custom',
      title,
      visible: true,
      orderIndex: (activeResume.sections || []).length,
      customContent: 'Add your custom details here...'
    };
    setActiveResume({
      ...activeResume,
      sections: [...(activeResume.sections || []), newSec]
    });
    showToast(`Added custom section: "${title}"`, 'success');
  };

  const handleDeleteSection = (sectionId) => {
    if (!activeResume) return;
    const updated = (activeResume.sections || []).filter(s => s.id !== sectionId);
    setActiveResume({ ...activeResume, sections: updated });
  };

  // Recommendation Actions
  const handleAcceptSkill = (skillName) => {
    if (!activeResume) return;
    const skills = [...(activeResume.skills || [])];
    if (skills.length === 0) {
      skills.push({ id: 'sk_1', category: 'Technical Skills', skills: [skillName] });
    } else {
      const firstGroup = { ...skills[0], skills: [...skills[0].skills, skillName] };
      skills[0] = firstGroup;
    }
    setActiveResume({ ...activeResume, skills });
    showToast(`Added "${skillName}" to resume skills`, 'success');
  };

  const handleDownload = () => {
    module6Service.printResume(activeResume?.title);
  };

  return (
    <div className="module6-page-container">
      {/* Toast Feedback */}
      {toast && (
        <div className="module6-toast-anchor">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}

      {/* Hero Header */}
      <header className="module6-hero-header">
        <div className="hero-left">
          <div className="hero-badge">
            <FileText size={14} />
            <span>MODULE 6 • RESUME BUILDER & RECOMMENDATIONS</span>
          </div>
          <h1 className="hero-title">Developer Resume Builder</h1>
          <p className="hero-subtitle">
            Generate clean, professional placement resumes with automated cross-module profile matching and skill gap insights.
          </p>
        </div>

        <div className="hero-action-buttons">
          <button type="button" className="btn-secondary" onClick={handleDownload} title="Print or Save as PDF">
            <Printer size={15} />
            <span>Download PDF</span>
          </button>
          <button type="button" className="btn-primary" onClick={handleSaveResume}>
            <Save size={15} />
            <span>Save Resume</span>
          </button>
        </div>
      </header>

      {/* Resume Switcher Bar */}
      <section className="resume-selector-bar">
        <div className="resumes-tabs-list">
          {resumes.map(r => (
            <button
              key={r.id}
              type="button"
              className={`resume-tab-btn ${activeResume?.id === r.id ? 'active' : ''}`}
              onClick={() => handleSelectResume(r.id)}
            >
              <FileText size={14} />
              <span>{r.title}</span>
              {r.profileMatchScore && (
                <span className="tab-score-chip">{r.profileMatchScore}%</span>
              )}
            </button>
          ))}
          <button
            type="button"
            className="resume-tab-btn add-btn"
            onClick={handleCreateNewResume}
            title="Create a new resume"
          >
            <Plus size={13} />
            <span>+ Create Resume</span>
          </button>
        </div>

        <div className="template-picker-group">
          <span className="tpl-label">Template:</span>
          {RESUME_TEMPLATES.map(tpl => (
            <button
              key={tpl.id}
              type="button"
              className={`tpl-btn ${activeResume?.template === tpl.id ? 'active' : ''}`}
              onClick={() => setActiveResume({ ...activeResume, template: tpl.id })}
              title={tpl.description}
            >
              {tpl.name}
            </button>
          ))}
          {resumes.length > 1 && (
            <button
              type="button"
              className="action-icon-btn danger"
              onClick={handleDeleteCurrentResume}
              title="Delete this resume"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="module6-workspace-grid">
        {/* Left Column: Editor Controls & Recommendations */}
        <aside className="editor-sidebar-column">
          {/* Recommendation Engine Component */}
          <JobRecommendationPanel
            targetRole={targetRole}
            onTargetRoleChange={setTargetRole}
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            matchData={matchData}
            onAcceptSkill={handleAcceptSkill}
            onAddProjectRecommendation={() => setIsProjectModalOpen(true)}
            onAddAchievementRecommendation={() => setIsAchModalOpen(true)}
          />

          {/* Personal Information Accordion Card */}
          <div className="editor-card">
            <h4 className="editor-card-title">Personal Information</h4>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={activeResume?.fullName || ''}
                  onChange={e => setActiveResume({ ...activeResume, fullName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={activeResume?.email || ''}
                  onChange={e => setActiveResume({ ...activeResume, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={activeResume?.phone || ''}
                  onChange={e => setActiveResume({ ...activeResume, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={activeResume?.location || ''}
                  onChange={e => setActiveResume({ ...activeResume, location: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="text"
                  value={activeResume?.githubUrl || ''}
                  onChange={e => setActiveResume({ ...activeResume, githubUrl: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="text"
                  value={activeResume?.linkedinUrl || ''}
                  onChange={e => setActiveResume({ ...activeResume, linkedinUrl: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Portfolio</label>
                <input
                  type="text"
                  value={activeResume?.portfolioUrl || ''}
                  onChange={e => setActiveResume({ ...activeResume, portfolioUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Professional Summary</label>
              <textarea
                rows={3}
                value={activeResume?.summary || ''}
                onChange={e => setActiveResume({ ...activeResume, summary: e.target.value })}
              />
            </div>
          </div>

          {/* Section Layout & Reorder Manager */}
          <SectionManager
            sections={activeResume?.sections || []}
            onReorderSection={handleReorderSection}
            onToggleSectionVisibility={handleToggleSectionVisibility}
            onAddCustomSection={handleAddCustomSection}
            onDeleteSection={handleDeleteSection}
          />

          {/* Cross-Module Reusable Content Hub */}
          <div className="editor-card">
            <h4 className="editor-card-title">DevTrack Cross-Module Content</h4>
            <p className="card-sub-hint">Reuse verified data stored in other modules without retyping.</p>

            <div className="module-import-buttons">
              <button
                type="button"
                className="import-hub-btn"
                onClick={() => setIsProjectModalOpen(true)}
              >
                <Briefcase size={16} />
                <div className="btn-content">
                  <span className="btn-main">Manage Featured Projects</span>
                  <span className="btn-sub">{activeResume?.projects?.length || 0} Projects Selected</span>
                </div>
                <ChevronRight size={14} className="arrow" />
              </button>

              <button
                type="button"
                className="import-hub-btn"
                onClick={() => setIsAchModalOpen(true)}
              >
                <Award size={16} />
                <div className="btn-content">
                  <span className="btn-main">Manage Hackathons & Accolades</span>
                  <span className="btn-sub">{activeResume?.achievements?.length || 0} Achievements Selected</span>
                </div>
                <ChevronRight size={14} className="arrow" />
              </button>

              <button
                type="button"
                className="import-hub-btn"
                onClick={() => setManualModalConfig({ isOpen: true, type: 'EXPERIENCE' })}
              >
                <Plus size={16} />
                <div className="btn-content">
                  <span className="btn-main">+ Add Manual Experience</span>
                  <span className="btn-sub">Add internship or leadership entry</span>
                </div>
                <ChevronRight size={14} className="arrow" />
              </button>

              <button
                type="button"
                className="import-hub-btn"
                onClick={() => setManualModalConfig({ isOpen: true, type: 'EDUCATION' })}
              >
                <BookOpen size={16} />
                <div className="btn-content">
                  <span className="btn-main">+ Add Education Entry</span>
                  <span className="btn-sub">Degree, college or secondary record</span>
                </div>
                <ChevronRight size={14} className="arrow" />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Live Printable Sheet Preview */}
        <main className="resume-preview-column">
          <div className="preview-sticky-wrap">
            <div className="preview-top-toolbar">
              <div className="sheet-meta">
                <span className="sheet-indicator-dot"></span>
                <span>Live Document Preview (A4 Standard)</span>
              </div>
              <div className="preview-actions">
                <button type="button" className="btn-secondary btn-small" onClick={handleDownload}>
                  <Printer size={13} />
                  <span>Print / PDF</span>
                </button>
                <button type="button" className="btn-primary btn-small" onClick={handleSaveResume}>
                  <Save size={13} />
                  <span>Save</span>
                </button>
              </div>
            </div>

            <div className="preview-viewport-scroll">
              <ResumePreview resume={activeResume} />
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <ProjectSelectorModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        currentResumeProjects={activeResume?.projects || []}
        onSaveProjects={(projs) => {
          setActiveResume({ ...activeResume, projects: projs });
          showToast(`Updated resume with ${projs.length} projects!`, 'success');
        }}
      />

      <AchievementSelectorModal
        isOpen={isAchModalOpen}
        onClose={() => setIsAchModalOpen(false)}
        currentResumeAchievements={activeResume?.achievements || []}
        onSaveAchievements={(achs) => {
          setActiveResume({ ...activeResume, achievements: achs });
          showToast(`Updated resume with ${achs.length} achievements!`, 'success');
        }}
      />

      <ManualItemModal
        isOpen={manualModalConfig.isOpen}
        modalType={manualModalConfig.type}
        onClose={() => setManualModalConfig({ isOpen: false, type: 'EDUCATION' })}
        onSave={(item) => {
          if (manualModalConfig.type === 'EDUCATION') {
            setActiveResume({
              ...activeResume,
              education: [...(activeResume.education || []), item]
            });
            showToast('Added education entry', 'success');
          } else if (manualModalConfig.type === 'EXPERIENCE') {
            setActiveResume({
              ...activeResume,
              experience: [...(activeResume.experience || []), item]
            });
            showToast('Added experience entry', 'success');
          }
        }}
      />
    </div>
  );
};

export default Module6Page;
