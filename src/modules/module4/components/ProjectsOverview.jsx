import React from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Star,
  Cpu,
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';

export const ProjectsOverview = ({
  stats,
  projects,
  onAddProject,
  onViewProject,
  onNavigateTab
}) => {
  const recentProjects = projects.slice(0, 3);

  return (
    <div className="projects-overview-container">
      {/* 1. Metric Cards Grid */}
      <div className="overview-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper total">
            <FolderGit2 size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Projects</span>
            <span className="stat-value">{stats?.totalProjects ?? 0}</span>
            <span className="stat-sub">Across 6+ domains</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper completed">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{stats?.completedCount ?? 0}</span>
            <span className="stat-sub">100% production ready</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper in-progress">
            <Clock size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{stats?.inProgressCount ?? 0}</span>
            <span className="stat-sub">Active development</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper featured">
            <Star size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Featured Projects</span>
            <span className="stat-value">{stats?.featuredCount ?? 0}</span>
            <span className="stat-sub">Selected for portfolio</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper tech">
            <Cpu size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Technologies Used</span>
            <span className="stat-value">{stats?.technologiesCount ?? 0}</span>
            <span className="stat-sub">Unique tech & libraries</span>
          </div>
        </div>
      </div>

      {/* 2. Portfolio Spotlight & Quick Actions Banner */}
      <div className="portfolio-spotlight-banner">
        <div className="spotlight-text">
          <h3>Showcase Ready Developer Portfolio</h3>
          <p>
            Your featured projects are automatically prepared for faculty review, internship applications,
            and future resume exports.
          </p>
        </div>
        <div className="spotlight-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onNavigateTab('preview')}
          >
            <Star size={16} /> Portfolio Preview
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={onAddProject}
          >
            <Plus size={16} /> Add New Project
          </button>
        </div>
      </div>

      {/* 3. Recent Projects Quick Glance */}
      <div className="recent-projects-section">
        <div className="section-header-row">
          <div>
            <h3 className="section-title">Recent Projects</h3>
            <span className="section-subtitle">Latest active development records</span>
          </div>
          <button
            type="button"
            className="link-button"
            onClick={() => onNavigateTab('projects')}
          >
            View All Projects <ArrowRight size={14} />
          </button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="empty-state-mini">
            <p>No projects recorded yet.</p>
            <button type="button" className="btn-primary" onClick={onAddProject}>
              <Plus size={14} /> Add First Project
            </button>
          </div>
        ) : (
          <div className="recent-projects-grid">
            {recentProjects.map((p) => {
              const statusClass =
                p.status === 'COMPLETED'
                  ? 'status-completed'
                  : p.status === 'IN_PROGRESS'
                  ? 'status-inprogress'
                  : 'status-planning';

              return (
                <div key={p.id} className="recent-project-card" onClick={() => onViewProject(p)}>
                  <div className="recent-project-header">
                    <span className="project-category-badge">{p.category}</span>
                    <span className={`project-status-pill ${statusClass}`}>
                      {p.status === 'COMPLETED' ? 'Completed' : `${p.progressPercentage}%`}
                    </span>
                  </div>

                  <h4 className="recent-project-name">{p.name}</h4>
                  <p className="recent-project-desc">{p.shortDescription}</p>

                  <div className="recent-project-tech-row">
                    {(p.technologies || []).slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="tech-chip-sm">
                        {typeof tech === 'string' ? tech : tech.name}
                      </span>
                    ))}
                    {(p.technologies || []).length > 4 && (
                      <span className="tech-chip-sm tech-chip-more">
                        +{(p.technologies || []).length - 4}
                      </span>
                    )}
                  </div>

                  <div className="recent-project-footer">
                    <span className="recent-project-date">{p.startDate} - {p.endDate}</span>
                    <span className="view-case-study-link">
                      Case Study <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Technologies Breakdown */}
      {stats?.technologiesList && stats.technologiesList.length > 0 && (
        <div className="technologies-cloud-section">
          <h3 className="section-title">Mastered Stack & Tools</h3>
          <div className="tech-cloud">
            {stats.technologiesList.map((t, idx) => (
              <span key={idx} className="tech-cloud-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsOverview;
