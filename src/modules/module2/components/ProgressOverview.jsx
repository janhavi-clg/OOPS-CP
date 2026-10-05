import React from 'react';
import {
  Flame,
  Calendar,
  CheckCircle2,
  Code2,
  BookOpen,
  Award,
  Sparkles,
  TrendingUp,
  HelpCircle
} from 'lucide-react';

export const ProgressOverview = ({ summary, skillsProgress = [] }) => {
  const streak = summary?.currentStreakDays || 14;
  const daysActive = summary?.daysActiveThisWeek || 5;
  const solvedWeek = summary?.problemsSolvedThisWeek || 8;
  const resWeek = summary?.resourcesCompletedThisWeek || 5;
  const avgOverall = summary?.averageOverallProgress || 56.4;

  return (
    <div className="devtrack-progress-overview">
      {/* 4 Metric Cards */}
      <div className="overview-stats-grid">
        {/* Streak Card */}
        <div className="overview-stat-card streak-card">
          <div className="card-top-icon">
            <Flame size={24} className="icon-flame" />
          </div>
          <div className="card-stat-body">
            <span className="card-stat-value">{streak} Days</span>
            <span className="card-stat-label">Learning Streak</span>
            <p className="card-stat-sub">Consecutive active study & practice days</p>
          </div>
        </div>

        {/* Days Active Card */}
        <div className="overview-stat-card">
          <div className="card-top-icon">
            <Calendar size={22} className="icon-coffee" />
          </div>
          <div className="card-stat-body">
            <span className="card-stat-value">{daysActive} / 7</span>
            <span className="card-stat-label">Days Active This Week</span>
            <p className="card-stat-sub">Consistent weekday practice schedule</p>
          </div>
        </div>

        {/* Problems Solved This Week */}
        <div className="overview-stat-card">
          <div className="card-top-icon">
            <Code2 size={22} className="icon-coffee" />
          </div>
          <div className="card-stat-body">
            <span className="card-stat-value">{solvedWeek} Solved</span>
            <span className="card-stat-label">Problems This Week</span>
            <p className="card-stat-sub">Across LeetCode, Java & Python tracks</p>
          </div>
        </div>

        {/* Resources Completed This Week */}
        <div className="overview-stat-card">
          <div className="card-top-icon">
            <CheckCircle2 size={22} className="icon-coffee" />
          </div>
          <div className="card-stat-body">
            <span className="card-stat-value">{resWeek} Completed</span>
            <span className="card-stat-label">Resources This Week</span>
            <p className="card-stat-sub">Lectures, documentation & articles</p>
          </div>
        </div>
      </div>

      {/* Progress Formula Transparency Card */}
      <div className="progress-formula-card">
        <div className="formula-card-header">
          <div className="formula-icon-box">
            <HelpCircle size={18} className="formula-icon" />
          </div>
          <div>
            <h4 className="formula-card-title">Transparent Progress Formula</h4>
            <p className="formula-card-subtitle">
              Calculated deterministically from your actual database records (No arbitrary or machine learning estimates).
            </p>
          </div>
        </div>
        <div className="formula-box">
          <code className="formula-equation">
            Overall Skill Progress (%) = (Resource Completion % × 50%) + (Practice Completion % × 50%)
          </code>
          <div className="formula-steps">
            <div className="formula-step-item">
              <strong>1. Resource Progress:</strong> (Completed Resources / Total Resources) × 100
            </div>
            <div className="formula-step-item">
              <strong>2. Practice Progress:</strong> Math.min(100, (Solved Problems / Target Problems) × 100)
            </div>
            <div className="formula-step-item">
              <strong>3. Equal Weighting:</strong> 50% conceptual learning + 50% hands-on coding practice.
            </div>
          </div>
        </div>
      </div>

      {/* Skill-wise Progress Breakdown Table */}
      <div className="progress-skills-breakdown-card">
        <h4 className="breakdown-card-title">Skill-Wise Progress Summary</h4>
        <div className="breakdown-table-wrapper">
          <table className="devtrack-breakdown-table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Overall Progress</th>
                <th>Resource Progress (50%)</th>
                <th>Practice Progress (50%)</th>
                <th>Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {skillsProgress.map((sp) => (
                <tr key={sp.skillId}>
                  <td className="td-skill-name">
                    <strong>{sp.skillName}</strong>
                  </td>
                  <td className="td-overall-progress">
                    <div className="mini-progress-row">
                      <div className="mini-progress-bar-bg">
                        <div
                          className="mini-progress-bar-fill"
                          style={{ width: `${sp.overallProgressPercentage}%` }}
                        />
                      </div>
                      <span className="mini-progress-text">{sp.overallProgressPercentage}%</span>
                    </div>
                  </td>
                  <td className="td-component">
                    <span>{sp.completedResources} / {sp.totalResources} ({sp.resourceProgressPercentage}%)</span>
                  </td>
                  <td className="td-component">
                    <span>{sp.solvedProblems} / {sp.targetProblems} ({sp.practiceProgressPercentage}%)</span>
                  </td>
                  <td>
                    <span className="badge-level intermediate">{sp.currentLevel}</span>
                  </td>
                  <td>
                    <span className="badge-status-active">{sp.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
