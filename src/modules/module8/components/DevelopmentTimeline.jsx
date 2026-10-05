import React from 'react';
import { History, Calendar, CheckCircle, Award, Code2, FolderGit2, BookOpen } from 'lucide-react';

export const DevelopmentTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  const getCategoryIcon = (cat) => {
    switch (cat?.toUpperCase()) {
      case 'HACKATHON':
      case 'ACADEMIC':
        return <Award size={14} className="timeline-icon-accent" />;
      case 'CERTIFICATE':
        return <CheckCircle size={14} className="timeline-icon-success" />;
      case 'CODING':
        return <Code2 size={14} className="timeline-icon-dark" />;
      case 'PROJECT':
        return <FolderGit2 size={14} className="timeline-icon-warm" />;
      default:
        return <BookOpen size={14} className="timeline-icon-warm" />;
    }
  };

  return (
    <div className="devtrack-analytics-card">
      <div className="card-top-header">
        <div className="card-title-group">
          <History size={18} className="card-icon" />
          <div>
            <h4>Unified Development Journey</h4>
            <p className="card-subtitle">Chronological milestones across Modules 2, 3, 4 & 5</p>
          </div>
        </div>
      </div>

      <div className="timeline-items-flow">
        {timeline.map((item, idx) => (
          <div key={item.id || idx} className="timeline-entry">
            <div className="timeline-spine">
              <div className="timeline-node">
                {getCategoryIcon(item.category)}
              </div>
              {idx < timeline.length - 1 && <div className="timeline-connector"></div>}
            </div>

            <div className="timeline-content-card">
              <div className="timeline-header-row">
                <span className="timeline-title">{item.activityTitle}</span>
                <span className="timeline-date">
                  <Calendar size={11} />
                  <span>{item.date}</span>
                </span>
              </div>
              <div className="timeline-source-badge">{item.moduleSource}</div>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
