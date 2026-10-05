import React from 'react';
import { FolderGit2, CheckCircle2, Clock, Star } from 'lucide-react';

export const ProjectAnalyticsCard = ({ projectData }) => {
  if (!projectData) return null;

  return (
    <div className="devtrack-analytics-card">
      <div className="card-top-header">
        <div className="card-title-group">
          <FolderGit2 size={18} className="card-icon" />
          <div>
            <h4>Project Delivery & Velocity</h4>
            <p className="card-subtitle">Module 4 project completion milestones</p>
          </div>
        </div>

        <div className="rate-badge">
          <span className="rate-num">{projectData.completionRate}%</span>
          <span className="rate-label">Completion</span>
        </div>
      </div>

      <div className="project-stat-counters">
        <div className="p-stat-box">
          <div className="p-stat-icon-wrap completed">
            <CheckCircle2 size={16} />
          </div>
          <div className="p-stat-info">
            <span className="p-stat-val">{projectData.completed}</span>
            <span className="p-stat-desc">Completed</span>
          </div>
        </div>

        <div className="p-stat-box">
          <div className="p-stat-icon-wrap in-progress">
            <Clock size={16} />
          </div>
          <div className="p-stat-info">
            <span className="p-stat-val">{projectData.inProgress}</span>
            <span className="p-stat-desc">In Development</span>
          </div>
        </div>

        <div className="p-stat-box">
          <div className="p-stat-icon-wrap featured">
            <Star size={16} />
          </div>
          <div className="p-stat-info">
            <span className="p-stat-val">{projectData.featured}</span>
            <span className="p-stat-desc">Featured</span>
          </div>
        </div>
      </div>

      <div className="completion-bar-wrap">
        <div className="completion-bar-track">
          <div
            className="completion-bar-fill"
            style={{ width: `${projectData.completionRate}%` }}
          ></div>
        </div>
        <div className="completion-caption">
          <span>{projectData.completed} of {projectData.total} software projects shipped</span>
          <span>{projectData.completionRate}% Delivered</span>
        </div>
      </div>
    </div>
  );
};
