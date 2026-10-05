import React from 'react';
import {
  GitBranch,
  ExternalLink,
  Star,
  Users,
  Eye,
  Edit2,
  Trash2,
  Layers,
  Award
} from 'lucide-react';

export const ProjectCard = ({
  project,
  onView,
  onEdit,
  onDelete,
  onToggleFeatured
}) => {
  const isCompleted = project.status === 'COMPLETED';
  const statusClass =
    project.status === 'COMPLETED'
      ? 'status-completed'
      : project.status === 'IN_PROGRESS'
      ? 'status-inprogress'
      : project.status === 'PLANNING'
      ? 'status-planning'
      : project.status === 'PAUSED'
      ? 'status-paused'
      : 'status-archived';

  const statusLabel =
    project.status === 'COMPLETED'
      ? 'Completed'
      : project.status === 'IN_PROGRESS'
      ? 'In Progress'
      : project.status === 'PLANNING'
      ? 'Planning'
      : project.status === 'PAUSED'
      ? 'Paused'
      : 'Archived';

  const githubLink = project.links?.find((l) => l.type === 'GITHUB');
  const demoLink = project.links?.find((l) => l.type === 'LIVE_DEMO');

  return (
    <div className={`project-card ${project.featured ? 'is-featured' : ''}`}>
      {/* 1. Thumbnail Header with Badges */}
      <div className="project-card-media" onClick={() => onView(project)}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="project-card-img"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="project-placeholder-cover"
          style={{ display: project.imageUrl ? 'none' : 'flex' }}
        >
          <Layers size={36} className="placeholder-icon" />
          <span className="placeholder-category">{project.category}</span>
        </div>

        <div className="card-top-overlay">
          <span className="card-category-pill">{project.category}</span>
          <button
            type="button"
            className={`btn-featured-star ${project.featured ? 'active' : ''}`}
            title={project.featured ? 'Remove from Featured' : 'Mark as Featured Portfolio Project'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFeatured(project.id);
            }}
          >
            <Star size={16} fill={project.featured ? '#D97706' : 'none'} />
          </button>
        </div>
      </div>

      {/* 2. Body Details */}
      <div className="project-card-body">
        <div className="project-title-row">
          <h3 className="project-name" onClick={() => onView(project)}>
            {project.name}
          </h3>
          <span className={`project-status-pill ${statusClass}`}>{statusLabel}</span>
        </div>

        {/* Progress Bar */}
        <div className="project-progress-wrapper" title={`Progress: ${project.progressPercentage}%`}>
          <div className="progress-info-row">
            <span className="progress-caption">Progress</span>
            <span className="progress-pct">{project.progressPercentage}%</span>
          </div>
          <div className="progress-track">
            <div
              className={`progress-fill ${isCompleted ? 'fill-completed' : 'fill-active'}`}
              style={{ width: `${Math.min(100, Math.max(5, project.progressPercentage))}%` }}
            />
          </div>
        </div>

        <p className="project-short-desc">{project.shortDescription}</p>

        {/* Role & Team Size */}
        <div className="project-meta-row">
          <span className="meta-item role-item">
            <Users size={13} /> {project.contribution?.role || 'Developer'}
            {project.contribution?.teamSize > 1 ? ` (Team of ${project.contribution.teamSize})` : ' (Solo)'}
          </span>
          {project.achievements && project.achievements.length > 0 && (
            <span className="meta-item award-item" title={project.achievements[0].title}>
              <Award size={13} /> {project.achievements[0].awardType || 'Accolade'}
            </span>
          )}
        </div>

        {/* Tech Chips */}
        <div className="project-tech-chips">
          {(project.technologies || []).slice(0, 5).map((tech, idx) => (
            <span key={idx} className="tech-chip">
              {typeof tech === 'string' ? tech : tech.name}
            </span>
          ))}
          {(project.technologies || []).length > 5 && (
            <span className="tech-chip tech-chip-overflow">
              +{(project.technologies || []).length - 5}
            </span>
          )}
        </div>
      </div>

      {/* 3. Card Footer with Quick Links & Action Buttons */}
      <div className="project-card-footer">
        <div className="external-links-group">
          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link-btn"
              title="Open GitHub Repository"
              onClick={(e) => e.stopPropagation()}
            >
              <GitBranch size={16} />
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link-btn"
              title="Open Live Deployment"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        <div className="actions-group">
          <button
            type="button"
            className="card-action-btn view-btn"
            title="View Full Case Study"
            onClick={() => onView(project)}
          >
            <Eye size={15} /> Case Study
          </button>
          <button
            type="button"
            className="card-action-btn edit-btn"
            title="Edit Project Details"
            onClick={() => onEdit(project)}
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            className="card-action-btn delete-btn"
            title="Delete Project"
            onClick={() => onDelete(project)}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
