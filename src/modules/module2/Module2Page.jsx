import React, { useState, useEffect } from 'react';
import {
  BookOpenCheck,
  Plus,
  Layers,
  BookOpen,
  Code2,
  TrendingUp,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';
import { module2Service } from './module2Service';
import { SkillCard } from './components/SkillCard';
import { SkillModal } from './components/SkillModal';
import { ResourceTable } from './components/ResourceTable';
import { ResourceModal } from './components/ResourceModal';
import { PracticeProblemsSection } from './components/PracticeProblemsSection';
import { ProblemModal } from './components/ProblemModal';
import { ProblemViewModal } from './components/ProblemViewModal';
import { SkillDetailView } from './components/SkillDetailView';
import { ProgressOverview } from './components/ProgressOverview';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Skill3DHeader } from './components/Skill3DHeader';
import { Toast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';

export const Module2Page = () => {
  const { user } = useAuth();

  // Navigation State: 'overview' | 'my-skills' | 'resources' | 'practice' | 'progress'
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSkill, setSelectedSkill] = useState(null); // When viewing detailed skill page

  // Data States
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [resources, setResources] = useState([]);
  const [problems, setProblems] = useState([]);
  const [skillsProgress, setSkillsProgress] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Search in Skills Overview
  const [skillSearch, setSkillSearch] = useState('');

  // Modal States
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [resourceModalSkillId, setResourceModalSkillId] = useState(null);

  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [problemModalSkillId, setProblemModalSkillId] = useState(null);
  const [editingProblem, setEditingProblem] = useState(null);

  const [viewingProblem, setViewingProblem] = useState(null);

  // Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    type: null, // 'skill' | 'resource' | 'problem'
    item: null,
    title: '',
    message: ''
  });

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load all Module 2 data
  const loadData = async () => {
    try {
      const [skillsData, availData, resData, probData, progData, sumData] =
        await Promise.all([
          module2Service.getSkills(),
          module2Service.getAvailableSkills(),
          module2Service.getResources(),
          module2Service.getProblems(),
          module2Service.getAllSkillsProgress(),
          module2Service.getOverallSummary()
        ]);

      setSkills(skillsData);
      setAvailableSkills(availData);
      setResources(resData);
      setProblems(probData);
      setSkillsProgress(progData);
      setSummary(sumData);

      // If a skill was selected, keep it updated
      if (selectedSkill) {
        const found = skillsData.find((s) => s.id === selectedSkill.id);
        if (found) setSelectedSkill(found);
      }
    } catch (err) {
      console.error('Error loading Module 2 data:', err);
      showToast('Error loading skills & learning data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------------------------------------------------------------
  // SKILL ACTIONS
  // -------------------------------------------------------------

  const handleAddSkill = async (skillData) => {
    try {
      const created = await module2Service.addSkill(skillData);
      showToast(`Added "${created.name}" to your learning tracker.`);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to add skill.', 'error');
      throw err;
    }
  };

  const handleAddCustomSkill = async ({ name, category, currentLevel, targetLevel }) => {
    try {
      const created = await module2Service.addCustomSkill(
        name,
        category,
        currentLevel,
        targetLevel
      );
      showToast(`Custom skill "${created.name}" created and added.`);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to create custom skill.', 'error');
      throw err;
    }
  };

  const promptRemoveSkill = (skill) => {
    setDeleteConfirm({
      isOpen: true,
      type: 'skill',
      item: skill,
      title: `Remove ${skill.name}?`,
      message: `Are you sure you want to remove "${skill.name}" from your learning tracker? Associated resources and practice problems will also be removed.`
    });
  };

  // -------------------------------------------------------------
  // RESOURCE ACTIONS
  // -------------------------------------------------------------

  const handleAddResource = async (resData) => {
    try {
      const created = await module2Service.addResource(resData);
      showToast(`Added learning resource "${created.title}".`);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to add resource.', 'error');
      throw err;
    }
  };

  const handleToggleCompleteResource = async (resourceId) => {
    try {
      const updated = await module2Service.toggleResourceComplete(resourceId);
      showToast(
        updated.completed
          ? `✓ Completed: "${updated.title}"`
          : `Marked incomplete: "${updated.title}"`,
        'success'
      );
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to update resource completion.', 'error');
    }
  };

  const promptDeleteResource = (resource) => {
    setDeleteConfirm({
      isOpen: true,
      type: 'resource',
      item: resource,
      title: 'Delete Learning Resource?',
      message: `Delete "${resource.title}" from your resources list?`
    });
  };

  // -------------------------------------------------------------
  // PROBLEM ACTIONS
  // -------------------------------------------------------------

  const handleSaveProblem = async (problemData) => {
    try {
      if (problemData.id) {
        await module2Service.updateProblem(problemData.id, problemData);
        showToast(`Updated solved problem "${problemData.title}".`);
      } else {
        const created = await module2Service.addProblem(problemData);
        showToast(`Recorded solved problem "${created.title}".`);
      }
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save practice problem.', 'error');
      throw err;
    }
  };

  const handleEditProblem = (prob) => {
    setEditingProblem(prob);
    setIsProblemModalOpen(true);
  };

  const promptDeleteProblem = (prob) => {
    setDeleteConfirm({
      isOpen: true,
      type: 'problem',
      item: prob,
      title: 'Delete Practice Problem?',
      message: `Delete "${prob.title}" and its saved solution code?`
    });
  };

  // -------------------------------------------------------------
  // DELETE CONFIRMATION HANDLER
  // -------------------------------------------------------------

  const handleConfirmDelete = async () => {
    const { type, item } = deleteConfirm;
    try {
      if (type === 'skill') {
        await module2Service.removeSkill(item.id);
        showToast(`Removed "${item.name}" from learning tracker.`);
        if (selectedSkill?.id === item.id) {
          setSelectedSkill(null);
        }
      } else if (type === 'resource') {
        await module2Service.deleteResource(item.id);
        showToast(`Deleted resource "${item.title}".`);
      } else if (type === 'problem') {
        await module2Service.deleteProblem(item.id);
        showToast(`Deleted problem "${item.title}".`);
      }
      setDeleteConfirm({ isOpen: false, type: null, item: null, title: '', message: '' });
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to complete deletion.', 'error');
    }
  };

  // Filter skills for Skills Overview
  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const getProgressForSkill = (skillId) => {
    return skillsProgress.find((p) => p.skillId === skillId) || null;
  };

  if (loading) {
    return (
      <div className="devtrack-module-loading">
        <div className="coffee-spinner" />
        <p className="loading-text">Loading Skills & Learning Tracker...</p>
      </div>
    );
  }

  return (
    <div className="devtrack-module-container module2-theme">
      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* If drilling down into a single skill detail view */}
      {selectedSkill ? (
        <SkillDetailView
          skill={selectedSkill}
          progress={getProgressForSkill(selectedSkill.id)}
          resources={resources}
          problems={problems}
          onBack={() => setSelectedSkill(null)}
          onToggleCompleteResource={handleToggleCompleteResource}
          onAddResource={(skillId) => {
            setResourceModalSkillId(skillId);
            setIsResourceModalOpen(true);
          }}
          onDeleteResource={promptDeleteResource}
          onAddProblem={(skillId) => {
            setEditingProblem(null);
            setProblemModalSkillId(skillId);
            setIsProblemModalOpen(true);
          }}
          onEditProblem={handleEditProblem}
          onDeleteProblem={promptDeleteProblem}
          onViewProblem={(prob) => setViewingProblem(prob)}
        />
      ) : (
        <>
          {/* Module Header with 3D Canvas Decoration */}
          <div className="module2-hero-header">
            <div className="hero-header-left">
              <div className="module-badge-row">
                <span className="module-number-pill">Module 2</span>
                <span className="module-name-pill">Skills & Learning Tracker</span>
                <span className="module-live-tag">
                  <Flame size={13} className="text-amber" />
                  <span>{summary?.currentStreakDays || 14}-Day Streak</span>
                </span>
              </div>
              <h1 className="module2-main-heading">Skills & Learning Tracker</h1>
              <p className="module2-subtitle">
                Select only the skills you actually want to learn. Track course completion, video lectures, and store your solved coding problem solutions in one unified place.
              </p>
            </div>

            <div className="hero-header-right">
              <Skill3DHeader />
            </div>
          </div>

          {/* Internal Navigation Sub-Bar */}
          <div className="module2-navigation-bar">
            <div className="nav-tabs-group">
              <button
                type="button"
                className={`module-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <BookOpenCheck size={16} />
                <span>Skills Overview</span>
              </button>
              <button
                type="button"
                className={`module-nav-btn ${activeTab === 'my-skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('my-skills')}
              >
                <Layers size={16} />
                <span>My Skills ({skills.length})</span>
              </button>
              <button
                type="button"
                className={`module-nav-btn ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                <BookOpen size={16} />
                <span>Learning Resources ({resources.length})</span>
              </button>
              <button
                type="button"
                className={`module-nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
                onClick={() => setActiveTab('practice')}
              >
                <Code2 size={16} />
                <span>Practice ({problems.length})</span>
              </button>
              <button
                type="button"
                className={`module-nav-btn ${activeTab === 'progress' ? 'active' : ''}`}
                onClick={() => setActiveTab('progress')}
              >
                <TrendingUp size={16} />
                <span>Progress & Consistency</span>
              </button>
            </div>

            <div className="nav-actions-group">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsSkillModalOpen(true)}
              >
                <Plus size={16} />
                <span>+ Add Skill</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Skills Overview */}
          {activeTab === 'overview' && (
            <div className="tab-pane-container">
              {/* Quick Summary Strip */}
              <div className="overview-summary-strip">
                <div className="summary-strip-card">
                  <span className="strip-val">{skills.length}</span>
                  <span className="strip-lbl">Tracked Skills</span>
                </div>
                <div className="summary-strip-card">
                  <span className="strip-val">{summary?.averageOverallProgress || 0}%</span>
                  <span className="strip-lbl">Avg Skill Mastery</span>
                </div>
                <div className="summary-strip-card">
                  <span className="strip-val">{summary?.completedResources || 0} / {resources.length}</span>
                  <span className="strip-lbl">Resources Completed</span>
                </div>
                <div className="summary-strip-card">
                  <span className="strip-val">{problems.length}</span>
                  <span className="strip-lbl">Problems Solved</span>
                </div>
              </div>

              {/* Search & Actions Bar */}
              <div className="skills-search-bar-row">
                <div className="search-input-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search your tracked skills by name or category..."
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    className="skills-search-input"
                  />
                  {skillSearch && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSkillSearch('')}
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="btn-secondary-outline"
                  onClick={() => setIsSkillModalOpen(true)}
                >
                  <Plus size={15} />
                  <span>Track Another Skill</span>
                </button>
              </div>

              {/* Skills Card Grid */}
              {filteredSkills.length === 0 ? (
                <div className="skills-empty-state">
                  <BookOpenCheck size={48} className="empty-icon" />
                  <h3 className="empty-title">
                    {skills.length === 0
                      ? 'No skills added yet'
                      : 'No skills match your search'}
                  </h3>
                  <p className="empty-desc">
                    {skills.length === 0
                      ? 'Choose what you actually want to learn. Select languages, frameworks, or add custom technical domains.'
                      : 'Try searching for a different keyword or add a new skill.'}
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setIsSkillModalOpen(true)}
                  >
                    <Plus size={16} />
                    <span>+ Add Skill</span>
                  </button>
                </div>
              ) : (
                <div className="skills-card-grid">
                  {filteredSkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      progress={getProgressForSkill(skill.id)}
                      onSelect={(s) => setSelectedSkill(s)}
                      onDelete={promptRemoveSkill}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: My Skills (Management & Custom Skill Creation) */}
          {activeTab === 'my-skills' && (
            <div className="tab-pane-container">
              <div className="pane-header-row">
                <div>
                  <h3 className="pane-title">My Tracked Skills</h3>
                  <p className="pane-subtitle">
                    Manage the technical proficiencies you have opted to track and advance.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsSkillModalOpen(true)}
                >
                  <Plus size={16} />
                  <span>+ Add Skill</span>
                </button>
              </div>

              {skills.length === 0 ? (
                <div className="skills-empty-state">
                  <Layers size={48} className="empty-icon" />
                  <h3 className="empty-title">No skills in your tracker</h3>
                  <p className="empty-desc">
                    Add standard skills from our catalog or define custom competencies.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setIsSkillModalOpen(true)}
                  >
                    <Plus size={16} />
                    <span>+ Add Skill</span>
                  </button>
                </div>
              ) : (
                <div className="skills-card-grid">
                  {skills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      progress={getProgressForSkill(skill.id)}
                      onSelect={(s) => setSelectedSkill(s)}
                      onDelete={promptRemoveSkill}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Learning Resources */}
          {activeTab === 'resources' && (
            <div className="tab-pane-container">
              <div className="pane-header-row">
                <div>
                  <h3 className="pane-title">Learning Resources</h3>
                  <p className="pane-subtitle">
                    Checklist of courses, playlists, documentation, and tutorials grouped by skill.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setResourceModalSkillId(null);
                    setIsResourceModalOpen(true);
                  }}
                >
                  <Plus size={16} />
                  <span>+ Add Learning Resource</span>
                </button>
              </div>

              <ResourceTable
                resources={resources}
                skills={skills}
                onToggleComplete={handleToggleCompleteResource}
                onAddResource={() => {
                  setResourceModalSkillId(null);
                  setIsResourceModalOpen(true);
                }}
                onDeleteResource={promptDeleteResource}
              />
            </div>
          )}

          {/* Tab 4: Practice Problems */}
          {activeTab === 'practice' && (
            <div className="tab-pane-container">
              <div className="pane-header-row">
                <div>
                  <h3 className="pane-title">Programming Practice</h3>
                  <p className="pane-subtitle">
                    Solved coding questions across LeetCode, CodeChef, and HackerRank with saved solution code.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setEditingProblem(null);
                    setProblemModalSkillId(null);
                    setIsProblemModalOpen(true);
                  }}
                >
                  <Plus size={16} />
                  <span>+ Add Problem</span>
                </button>
              </div>

              <PracticeProblemsSection
                problems={problems}
                skills={skills}
                onAddProblem={() => {
                  setEditingProblem(null);
                  setProblemModalSkillId(null);
                  setIsProblemModalOpen(true);
                }}
                onEditProblem={handleEditProblem}
                onDeleteProblem={promptDeleteProblem}
                onViewProblem={(prob) => setViewingProblem(prob)}
              />
            </div>
          )}

          {/* Tab 5: Progress & Consistency */}
          {activeTab === 'progress' && (
            <div className="tab-pane-container">
              <ProgressOverview
                summary={summary}
                skillsProgress={skillsProgress}
              />
            </div>
          )}
        </>
      )}

      {/* Skill Modal (Catalog & Custom) */}
      <SkillModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        availableSkills={availableSkills}
        trackedSkills={skills}
        onAddExisting={handleAddSkill}
        onAddCustom={handleAddCustomSkill}
      />

      {/* Resource Modal */}
      <ResourceModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        skills={skills}
        defaultSkillId={resourceModalSkillId}
        onSave={handleAddResource}
      />

      {/* Problem Modal (Add/Edit) */}
      <ProblemModal
        isOpen={isProblemModalOpen}
        onClose={() => {
          setIsProblemModalOpen(false);
          setEditingProblem(null);
        }}
        skills={skills}
        defaultSkillId={problemModalSkillId}
        initialData={editingProblem}
        onSave={handleSaveProblem}
      />

      {/* Problem View Modal (Code Viewer) */}
      <ProblemViewModal
        isOpen={Boolean(viewingProblem)}
        onClose={() => setViewingProblem(null)}
        problem={viewingProblem}
        onEdit={(prob) => {
          setViewingProblem(null);
          handleEditProblem(prob);
        }}
        onDelete={(prob) => {
          setViewingProblem(null);
          promptDeleteProblem(prob);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        title={deleteConfirm.title}
        message={deleteConfirm.message}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteConfirm({ isOpen: false, type: null, item: null, title: '', message: '' })
        }
        confirmLabel="Remove"
      />
    </div>
  );
};

export default Module2Page;
