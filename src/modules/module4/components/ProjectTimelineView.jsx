import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Layers,
  Flag
} from 'lucide-react';

export const ProjectTimelineView = ({
  projects,
  onAddMilestone,
  onEditMilestone,
  onDeleteMilestone
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState('ALL');

  // Flatten all milestones from projects
  const allMilestones = [];
  projects.forEach((p) => {
    (p.milestones || []).forEach((m) => {
      allMilestones.push({
        ...m,
        projectId: p.id,
        projectName: p.name,
        projectCategory: p.category
      });
    });
  });

  // Filter by selected project
  const filteredMilestones =
    selectedProjectId === 'ALL'
      ? allMilestones
      : allMilestones.filter((m) => m.projectId === selectedProjectId);

  return (
    <div className="project-timeline-view-container">
      {/* 1. Header & Filter Bar */}
      <div className="timeline-header-bar">
        <div>
          <h3 className="section-title">Development Timeline</h3>
          <span className="section-subtitle">
            Chronological log of project milestones, architecture iterations, and releases
          </span>
        </div>

        <div className="timeline-controls-row">
          <div className="filter-select-wrapper">
            <Filter size={14} className="filter-icon" />
            <select
              className="timeline-project-select"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
            >
              <option value="ALL">All Projects ({allMilestones.length} milestones)</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.milestones?.length || 0})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => onAddMilestone(selectedProjectId === 'ALL' ? projects[0]?.id : selectedProjectId)}
          >
            <Plus size={16} /> Add Milestone
          </button>
        </div>
      </div>

      {/* 2. Timeline Strip */}
      {filteredMilestones.length === 0 ? (
        <div className="empty-state-box">
          <Flag size={44} className="empty-state-icon" />
          <h4 className="empty-state-title">No Milestones Recorded</h4>
          <p className="empty-state-desc">
            Keep track of architectural milestones, sprints, deployments, and testing completions.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => onAddMilestone(selectedProjectId === 'ALL' ? projects[0]?.id : selectedProjectId)}
          >
            <Plus size={16} /> Add First Milestone
          </button>
        </div>
      ) : (
        <div className="vertical-timeline-strip">
          {filteredMilestones.map((milestone, idx) => {
            const isCompleted = milestone.completed !== false;

            return (
              <div key={milestone.id || idx} className="timeline-entry-node">
                {/* Marker */}
                <div className="timeline-entry-marker">
                  <div className={`entry-marker-icon ${isCompleted ? 'completed' : 'pending'}`}>
                    {isCompleted ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                  </div>
                  {idx < filteredMilestones.length - 1 && <div className="entry-marker-line" />}
                </div>

                {/* Card */}
                <div className="timeline-entry-card">
                  <div className="entry-card-header">
                    <div className="entry-meta-tags">
                      <span className="entry-project-tag">{milestone.projectName}</span>
                      <span className="entry-date-tag">
                        <Calendar size={13} /> {milestone.date || 'Undated'}
                      </span>
                    </div>

                    <div className="entry-actions-group">
                      <button
                        type="button"
                        className="entry-action-btn"
                        title="Edit Milestone"
                        onClick={() => onEditMilestone(milestone.projectId, milestone)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="entry-action-btn danger"
                        title="Delete Milestone"
                        onClick={() => onDeleteMilestone(milestone.projectId, milestone.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h4 className="entry-title">{milestone.title}</h4>
                  {milestone.description && (
                    <p className="entry-description">{milestone.description}</p>
                  )}

                  <div className="entry-footer">
                    <span className={`entry-status-badge ${isCompleted ? 'achieved' : 'in-flight'}`}>
                      {isCompleted ? 'Milestone Achieved' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectTimelineView;
