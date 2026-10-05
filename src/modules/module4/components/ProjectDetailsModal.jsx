import React from 'react';
import {
  X,
  GitBranch,
  ExternalLink,
  BookOpen,
  Calendar,
  Users,
  CheckCircle2,
  Award,
  Edit2,
  Trash2,
  Layers,
  Star,
  Target,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ProjectDetailsModal = ({
  project,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onToggleFeatured
}) => {
  if (!isOpen || !project) return null;

  const githubLink = project.links?.find((l) => l.type === 'GITHUB');
  const demoLink = project.links?.find((l) => l.type === 'LIVE_DEMO');
  const docsLink = project.links?.find((l) => l.type === 'DOCUMENTATION');
  const otherLinks = project.links?.filter(
    (l) => !['GITHUB', 'LIVE_DEMO', 'DOCUMENTATION'].includes(l.type)
  );

  const statusClass =
    project.status === 'COMPLETED'
      ? 'status-completed'
      : project.status === 'IN_PROGRESS'
      ? 'status-inprogress'
      : 'status-planning';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container case-study-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover / Hero Image */}
        <div className="case-study-hero">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.name}
              className="case-study-hero-img"
            />
          ) : (
            <div className="case-study-hero-placeholder">
              <Layers size={48} />
              <span>{project.category} Showcase</span>
            </div>
          )}
          <button
            type="button"
            className="modal-close-btn hero-close-btn"
            onClick={onClose}
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>

          <div className="hero-floating-badges">
            <span className="case-study-category-pill">{project.category}</span>
            <span className={`case-study-status-pill ${statusClass}`}>
              {project.status === 'COMPLETED' ? 'Completed' : `${project.progressPercentage}% Complete`}
            </span>
            {project.featured && (
              <span className="case-study-featured-pill">
                <Star size={13} fill="#D97706" /> Featured Portfolio Project
              </span>
            )}
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="case-study-body">
          {/* Header Row */}
          <div className="case-study-header-row">
            <div>
              <h2 className="case-study-title">{project.name}</h2>
              <p className="case-study-tagline">{project.shortDescription}</p>
            </div>
            <div className="case-study-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  onClose();
                  onEdit(project);
                }}
              >
                <Edit2 size={15} /> Edit
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  onClose();
                  onDelete(project);
                }}
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>

          {/* Quick Meta Row */}
          <div className="case-study-meta-bar">
            <div className="meta-box">
              <Calendar size={16} />
              <div>
                <span className="meta-box-label">Timeline</span>
                <span className="meta-box-val">{project.startDate || 'Started'} — {project.endDate || 'Present'}</span>
              </div>
            </div>

            <div className="meta-box">
              <Users size={16} />
              <div>
                <span className="meta-box-label">Your Role</span>
                <span className="meta-box-val">
                  {project.contribution?.role || 'Developer'}
                  {project.contribution?.teamSize > 1 ? ` (${project.contribution.teamSize} team members)` : ' (Solo project)'}
                </span>
              </div>
            </div>

            {/* External Links Buttons */}
            <div className="case-study-links-group">
              {githubLink && (
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-chip github"
                >
                  <GitBranch size={15} /> Repository
                </a>
              )}
              {demoLink && (
                <a
                  href={demoLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-chip live"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
              {docsLink && (
                <a
                  href={docsLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-chip docs"
                >
                  <BookOpen size={15} /> Docs
                </a>
              )}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="case-study-narrative-grid">
            <div className="narrative-box problem-box">
              <div className="narrative-header">
                <Target size={18} />
                <h4>The Problem</h4>
              </div>
              <p>
                {project.problemStatement ||
                  'Identifying core engineering pain points and architectural bottlenecks to solve with this software.'}
              </p>
            </div>

            <div className="narrative-box solution-box">
              <div className="narrative-header">
                <Sparkles size={18} />
                <h4>The Solution</h4>
              </div>
              <p>
                {project.solutionOverview ||
                  'Architected an end-to-end full stack system with modern design patterns and optimized data workflows.'}
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          {project.detailedDescription && (
            <div className="case-study-section">
              <h4 className="section-heading">Detailed Architecture & Implementation</h4>
              <p className="detailed-desc-text">{project.detailedDescription}</p>
            </div>
          )}

          {/* Key Features Checklist */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="case-study-section">
              <h4 className="section-heading">Key Features & Technical Capabilities</h4>
              <div className="features-checklist-grid">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="feature-item">
                    <CheckCircle2 size={16} className="feature-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="case-study-section">
            <h4 className="section-heading">Technologies & Libraries</h4>
            <div className="case-study-tech-wrap">
              {(project.technologies || []).map((t, idx) => {
                const name = typeof t === 'string' ? t : t.name;
                const cat = typeof t === 'string' ? 'Tech' : t.category;
                return (
                  <span key={idx} className="tech-badge-large">
                    <span className="tech-name">{name}</span>
                    {cat && <span className="tech-cat">{cat}</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Personal Technical Contribution */}
          {project.contribution?.contributionDetails && (
            <div className="case-study-section contribution-highlight-box">
              <h4 className="section-heading">Personal Technical Contribution</h4>
              <p className="contribution-text">{project.contribution.contributionDetails}</p>
            </div>
          )}

          {/* Project Achievements & Recognition */}
          {project.achievements && project.achievements.length > 0 && (
            <div className="case-study-section">
              <h4 className="section-heading">Project Achievements & Recognition</h4>
              <div className="achievements-list">
                {project.achievements.map((ach, idx) => (
                  <div key={idx} className="achievement-item-card">
                    <Award size={20} className="achievement-icon" />
                    <div className="achievement-content">
                      <span className="achievement-title">{ach.title}</span>
                      <span className="achievement-meta">
                        {ach.awardType} • {ach.organization} {ach.date ? `(${ach.date})` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Development Milestones Timeline */}
          {project.milestones && project.milestones.length > 0 && (
            <div className="case-study-section">
              <h4 className="section-heading">Development Milestones</h4>
              <div className="milestones-timeline-strip">
                {project.milestones.map((ms, idx) => (
                  <div key={idx} className="milestone-strip-item">
                    <div className="milestone-marker">
                      <span className="marker-dot" />
                      {idx < project.milestones.length - 1 && <span className="marker-line" />}
                    </div>
                    <div className="milestone-details">
                      <span className="milestone-date">{ms.date}</span>
                      <h5 className="milestone-name">{ms.title}</h5>
                      {ms.description && <p className="milestone-desc">{ms.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
