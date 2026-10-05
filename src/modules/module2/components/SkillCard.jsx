import React from 'react';
import {
  BookOpen,
  Code2,
  Clock,
  Trash2,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const SkillCard = ({ skill, progress, onSelect, onDelete }) => {
  const overallPct = progress ? progress.overallProgressPercentage : 0;
  const totalRes = progress ? progress.totalResources : 0;
  const completedRes = progress ? progress.completedResources : 0;
  const solvedCount = progress ? progress.solvedProblems : 0;

  // Level badge styling helper
  const getLevelBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 'badge-level expert';
      case 'advanced': return 'badge-level advanced';
      case 'intermediate': return 'badge-level intermediate';
      default: return 'badge-level beginner';
    }
  };

  return (
    <div className="devtrack-skill-card" onClick={() => onSelect(skill)}>
      <div className="skill-card-top">
        <div className="skill-meta-left">
          <span className="skill-category-tag">{skill.category || 'General'}</span>
          <h3 className="skill-card-title">{skill.name}</h3>
        </div>
        <div className="skill-meta-right" onClick={(e) => e.stopPropagation()}>
          <span className={getLevelBadgeClass(skill.currentLevel)}>
            {skill.currentLevel || 'Beginner'}
          </span>
          <button
            type="button"
            className="btn-icon-danger"
            title={`Remove ${skill.name} from tracker`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(skill);
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="skill-progress-container">
        <div className="skill-progress-header">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-value">{overallPct}%</span>
        </div>
        <div className="skill-progress-bar-bg">
          <div
            className="skill-progress-bar-fill"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Stat Grid */}
      <div className="skill-card-stats">
        <div className="stat-pill" title="Learning Resources completed">
          <BookOpen size={14} className="stat-icon" />
          <span>{completedRes}/{totalRes} Resources</span>
        </div>
        <div className="stat-pill" title="Programming Problems solved">
          <Code2 size={14} className="stat-icon" />
          <span>{solvedCount} Problems</span>
        </div>
      </div>

      {/* Footer */}
      <div className="skill-card-footer">
        <div className="skill-last-activity">
          <Clock size={12} className="activity-icon" />
          <span>{skill.lastActivity || 'Recently active'}</span>
        </div>
        <button
          type="button"
          className="btn-view-skill"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skill);
          }}
        >
          <span>View Details</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
