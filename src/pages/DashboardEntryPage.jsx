import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2,
  BookOpenCheck,
  FolderGit2,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  rahulDemoProfile,
  rahulCodingData,
  rahulSkills,
  rahulProjects,
  rahulAchievements,
  rahulTasks
} from '../demo/rahulDemoData';

export const DashboardEntryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const profile = user || rahulDemoProfile;

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-tag">
            <GraduationCap size={15} />
            <span>Developer Progress Hub</span>
          </div>
          <h1 className="welcome-heading">
            Welcome back, <span className="highlight-text">{profile.name}</span>
          </h1>
          <p className="welcome-subtext">
            {profile.year} • {profile.branch} • {profile.college}
          </p>
        </div>

        <div className="welcome-badge-card">
          <div className="streak-icon-box">
            <Flame size={24} className="streak-flame" />
          </div>
          <div className="streak-meta">
            <span className="streak-count">{rahulCodingData.streaks.currentStreak} Days</span>
            <span className="streak-label">Active Coding Streak</span>
          </div>
        </div>
      </section>

      {/* Key Metric Highlights Grid */}
      <section className="metrics-grid">
        {/* Metric 1: Coding Solved */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">LeetCode Solved</span>
            <div className="metric-icon-wrap">
              <Code2 size={18} />
            </div>
          </div>
          <div className="metric-body">
            <div className="metric-value-row">
              <span className="metric-number">{rahulCodingData.totalSolved}</span>
              <span className="metric-target">/ {rahulCodingData.targetQuestions} target</span>
            </div>
            <div className="metric-progress-bar">
              <div
                className="metric-progress-fill"
                style={{
                  width: `${(rahulCodingData.totalSolved / rahulCodingData.targetQuestions) * 100}%`
                }}
              />
            </div>
            <div className="metric-breakdown">
              <span className="sub-stat easy">Easy: {rahulCodingData.easy.solved}</span>
              <span className="sub-stat medium">Med: {rahulCodingData.medium.solved}</span>
              <span className="sub-stat hard">Hard: {rahulCodingData.hard.solved}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Skills Tracked */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Tracked Skills</span>
            <div className="metric-icon-wrap">
              <BookOpenCheck size={18} />
            </div>
          </div>
          <div className="metric-body">
            <div className="metric-value-row">
              <span className="metric-number">{rahulSkills.length}</span>
              <span className="metric-target">Core Technologies</span>
            </div>
            <div className="metric-progress-bar">
              <div className="metric-progress-fill" style={{ width: '76%' }} />
            </div>
            <div className="metric-breakdown">
              <span className="sub-stat">Java: 82%</span>
              <span className="sub-stat">OOP: 85%</span>
              <span className="sub-stat">Python: 78%</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Projects */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Engineering Projects</span>
            <div className="metric-icon-wrap">
              <FolderGit2 size={18} />
            </div>
          </div>
          <div className="metric-body">
            <div className="metric-value-row">
              <span className="metric-number">{rahulProjects.length}</span>
              <span className="metric-target">2 In Progress</span>
            </div>
            <div className="metric-progress-bar">
              <div className="metric-progress-fill" style={{ width: '60%' }} />
            </div>
            <div className="metric-breakdown">
              <span className="sub-stat">Smart Fitness</span>
              <span className="sub-stat">AI Study Planner</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Certifications & Awards */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Credentials & Awards</span>
            <div className="metric-icon-wrap">
              <Award size={18} />
            </div>
          </div>
          <div className="metric-body">
            <div className="metric-value-row">
              <span className="metric-number">9</span>
              <span className="metric-target">5 Certs • 4 Awards</span>
            </div>
            <div className="metric-progress-bar">
              <div className="metric-progress-fill" style={{ width: '85%' }} />
            </div>
            <div className="metric-breakdown">
              <span className="sub-stat">Hack Celestial 3.0</span>
              <span className="sub-stat">IBM Coursera</span>
            </div>
          </div>
        </div>
      </section>

      {/* Structural Overview Sections */}
      <div className="dashboard-grid-split">
        {/* Left Column: Active Projects & Focus */}
        <div className="dashboard-col-left">
          <div className="section-card">
            <div className="section-card-header">
              <div>
                <h2 className="section-title">Current Projects</h2>
                <p className="section-sub">Active engineering repositories in development</p>
              </div>
            </div>

            <div className="project-preview-list">
              {rahulProjects.map((project) => (
                <div key={project.id} className="project-preview-item">
                  <div className="project-item-top">
                    <span className="project-item-name">{project.name}</span>
                    <span className={`status-pill ${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="project-item-desc">{project.description}</p>
                  <div className="project-tags-row">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Next Tasks & Recent Achievements */}
        <div className="dashboard-col-right">
          <div className="section-card">
            <div className="section-card-header">
              <div>
                <h2 className="section-title">Pending Action Items</h2>
                <p className="section-sub">Priority learning milestones & DSA practice</p>
              </div>
            </div>

            <div className="task-preview-list">
              {rahulTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="task-item-row">
                  <div className="task-status-indicator">
                    <CheckCircle2 size={16} className={task.status === 'Completed' ? 'done' : 'pending'} />
                  </div>
                  <div className="task-item-content">
                    <span className="task-title-text">{task.title}</span>
                    <div className="task-meta-row">
                      <span className={`priority-tag ${task.priority.toLowerCase()}`}>
                        {task.priority} Priority
                      </span>
                      <span className="due-date">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card" style={{ marginTop: '1.25rem' }}>
            <div className="section-card-header">
              <div>
                <h2 className="section-title">Latest Milestones</h2>
                <p className="section-sub">Validated accomplishments</p>
              </div>
            </div>

            <div className="achievement-preview-list">
              {rahulAchievements.slice(0, 2).map((ach) => (
                <div key={ach.id} className="achievement-item">
                  <div className="achievement-badge-box">
                    <Award size={18} />
                  </div>
                  <div>
                    <span className="achievement-title">{ach.title}</span>
                    <span className="achievement-desc">{ach.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
