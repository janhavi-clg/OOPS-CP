import React, { useState, useEffect, useCallback } from 'react';
import {
  FolderGit2,
  Plus,
  Star,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { module4Service } from './module4Service';
import { ProjectsOverview } from './components/ProjectsOverview';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { ProjectFormModal } from './components/ProjectFormModal';
import { ProjectTimelineView } from './components/ProjectTimelineView';
import { MilestoneModal } from './components/MilestoneModal';
import { PortfolioPreview } from './components/PortfolioPreview';
import { ProjectFilters } from './components/ProjectFilters';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Project3DShowcase } from './components/Project3DShowcase';

export const Module4Page = () => {
  // Navigation tabs: 'overview', 'projects', 'timeline', 'preview'
  const [activeTab, setActiveTab] = useState('overview');

  // Data state
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('RECENT');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [milestoneProjectId, setMilestoneProjectId] = useState(null);
  const [milestoneToEdit, setMilestoneToEdit] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load projects & statistics
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [fetchedProjects, fetchedStats, fetchedPortfolio] = await Promise.all([
        module4Service.getProjects({
          search: searchQuery,
          status: statusFilter,
          category: categoryFilter,
          sort: sortBy
        }),
        module4Service.getOverviewStats(),
        module4Service.getPortfolioPreview()
      ]);
      setProjects(fetchedProjects);
      setStats(fetchedStats);
      setPortfolioData(fetchedPortfolio);
    } catch (err) {
      console.error('Error loading projects data:', err);
      showToast('Failed to load projects. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, categoryFilter, sortBy]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Project CRUD Actions
  const handleSaveProject = async (formData, id) => {
    try {
      if (id) {
        await module4Service.updateProject(id, formData);
        showToast(`Project "${formData.name}" updated successfully.`);
      } else {
        await module4Service.createProject(formData);
        showToast(`Project "${formData.name}" created successfully.`);
      }
      await loadData();
    } catch (err) {
      showToast(err.message || 'Error saving project.', 'error');
      throw err;
    }
  };

  const handleOpenAdd = () => {
    setProjectToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project) => {
    setProjectToEdit(project);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (project) => {
    setProjectToDelete(project);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await module4Service.deleteProject(projectToDelete.id);
      showToast(`Project "${projectToDelete.name}" deleted.`);
      setIsDeleteOpen(false);
      setProjectToDelete(null);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Error deleting project.', 'error');
    }
  };

  const handleToggleFeatured = async (projectId) => {
    try {
      const updated = await module4Service.toggleFeatured(projectId);
      showToast(
        updated.featured
          ? `Marked "${updated.name}" as Featured in Portfolio!`
          : `Removed "${updated.name}" from Featured.`
      );
      await loadData();
    } catch (err) {
      showToast('Failed to update featured state.', 'error');
    }
  };

  const handleViewCaseStudy = (project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  // Milestone Actions
  const handleAddMilestone = (projectId) => {
    setMilestoneProjectId(projectId);
    setMilestoneToEdit(null);
    setIsMilestoneModalOpen(true);
  };

  const handleEditMilestone = (projectId, milestone) => {
    setMilestoneProjectId(projectId);
    setMilestoneToEdit(milestone);
    setIsMilestoneModalOpen(true);
  };

  const handleSaveMilestone = async (milestoneData, milestoneId) => {
    try {
      if (milestoneId) {
        await module4Service.updateMilestone(
          milestoneData.projectId,
          milestoneId,
          milestoneData
        );
        showToast('Milestone updated.');
      } else {
        await module4Service.addMilestone(
          milestoneData.projectId,
          milestoneData
        );
        showToast('Milestone added to timeline.');
      }
      await loadData();
    } catch (err) {
      showToast(err.message || 'Error saving milestone.', 'error');
    }
  };

  const handleDeleteMilestone = async (projectId, milestoneId) => {
    try {
      await module4Service.deleteMilestone(projectId, milestoneId);
      showToast('Milestone removed from timeline.');
      await loadData();
    } catch (err) {
      showToast(err.message || 'Error deleting milestone.', 'error');
    }
  };

  return (
    <div className="module4-page-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.type === 'error' ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle size={18} />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="module-header-container">
        <div className="module-title-meta">
          <div className="module-badge-tag">
            <span className="dot-pulse" />
            <span>MODULE 4 • REAL FULL-STACK</span>
          </div>
          <h1 className="module-main-title">Project & Portfolio Management</h1>
          <p className="module-subtitle">
            Maintain high-impact software case studies, technical contributions, milestones, and your
            public developer portfolio.
          </p>
        </div>

        <div className="header-right-controls">
          <Project3DShowcase />
          <button
            type="button"
            className="btn-primary btn-header-cta"
            onClick={handleOpenAdd}
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
      </header>

      {/* Internal Navigation Tabs */}
      <nav className="module-tabs-nav" aria-label="Module 4 Sub Navigation">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'overview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Layers size={16} /> Overview
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'projects' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <FolderGit2 size={16} /> My Projects
          <span className="tab-count-badge">{stats?.totalProjects ?? projects.length}</span>
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'timeline' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <Calendar size={16} /> Project Timeline
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'preview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <Star size={16} /> Portfolio Preview
          <span className="tab-highlight-badge">Showcase</span>
        </button>
      </nav>

      {/* Main Tab Content */}
      <main className="module-content-area">
        {loading ? (
          <div className="loading-state-container">
            <div className="spinner-coffee" />
            <p>Loading projects & technical portfolio...</p>
          </div>
        ) : (
          <>
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <ProjectsOverview
                stats={stats}
                projects={projects}
                onAddProject={handleOpenAdd}
                onViewProject={handleViewCaseStudy}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {/* TAB 2: MY PROJECTS */}
            {activeTab === 'projects' && (
              <div className="my-projects-tab-wrapper">
                <ProjectFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  statusFilter={statusFilter}
                  onStatusChange={setStatusFilter}
                  categoryFilter={categoryFilter}
                  onCategoryChange={setCategoryFilter}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalResults={projects.length}
                />

                {projects.length === 0 ? (
                  <div className="empty-state-box">
                    <FolderGit2 size={44} className="empty-state-icon" />
                    <h4 className="empty-state-title">No Projects Found</h4>
                    <p className="empty-state-desc">
                      {searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL'
                        ? 'No projects match your current filter criteria. Try clearing filters.'
                        : 'You haven\'t added any projects yet. Start building your portfolio now!'}
                    </p>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleOpenAdd}
                    >
                      <Plus size={16} /> Add First Project
                    </button>
                  </div>
                ) : (
                  <div className="projects-grid">
                    {projects.map((p) => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        onView={handleViewCaseStudy}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                        onToggleFeatured={handleToggleFeatured}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PROJECT TIMELINE */}
            {activeTab === 'timeline' && (
              <ProjectTimelineView
                projects={projects}
                onAddMilestone={handleAddMilestone}
                onEditMilestone={handleEditMilestone}
                onDeleteMilestone={handleDeleteMilestone}
              />
            )}

            {/* TAB 4: PORTFOLIO PREVIEW */}
            {activeTab === 'preview' && (
              <PortfolioPreview
                portfolioData={portfolioData}
                onViewProject={handleViewCaseStudy}
              />
            )}
          </>
        )}
      </main>

      {/* Case Study Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onToggleFeatured={handleToggleFeatured}
      />

      {/* Add / Edit Project Form Modal */}
      <ProjectFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />

      {/* Add / Edit Milestone Modal */}
      <MilestoneModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        onSave={handleSaveMilestone}
        projects={projects}
        selectedProjectId={milestoneProjectId}
        milestoneToEdit={milestoneToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.name || 'this project'}
      />
    </div>
  );
};

export default Module4Page;
