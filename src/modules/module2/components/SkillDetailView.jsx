import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Plus,
  Clock,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  TrendingUp
} from 'lucide-react';
import { ResourceTable } from './ResourceTable';
import { PracticeProblemsSection } from './PracticeProblemsSection';

export const SkillDetailView = ({
  skill,
  progress,
  resources = [],
  problems = [],
  onBack,
  onToggleCompleteResource,
  onAddResource,
  onDeleteResource,
  onAddProblem,
  onEditProblem,
  onDeleteProblem,
  onViewProblem
}) => {
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'practice'

  const overallPct = progress ? progress.overallProgressPercentage : 0;
  const resPct = progress ? progress.resourceProgressPercentage : 0;
  const pracPct = progress ? progress.practiceProgressPercentage : 0;
  const totalRes = progress ? progress.totalResources : 0;
  const compRes = progress ? progress.completedResources : 0;
  const solvedCount = progress ? progress.solvedProblems : 0;
  const targetProblems = progress ? progress.targetProblems : 30;

  // Filter items specifically for this skill
  const skillResources = resources.filter((r) => r.skillId === skill.id);
  const skillProblems = problems.filter((p) => p.skillId === skill.id);

  return (
    <div className="devtrack-skill-detail-view">
      {/* Back button and navigation breadcrumb */}
      <div className="detail-nav-bar">
        <button type="button" className="btn-back-breadcrumb" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Skills Overview</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="skill-detail-hero-card">
        <div className="hero-content-top">
          <div className="hero-left">
            <div className="hero-category-row">
              <span className="skill-category-tag">{skill.category}</span>
              <span className="badge-level intermediate">
                {skill.currentLevel} → {skill.targetLevel}
              </span>
              <span className="badge-status-active">{skill.status || 'Active'}</span>
            </div>
            <h1 className="hero-skill-title">{skill.name}</h1>
            <p className="hero-skill-desc">
              Dedicated tracking dashboard for {skill.name}. Progress is calculated from your completed learning materials and solved coding challenges.
            </p>
          </div>

          <div className="hero-right-progress">
            <div className="hero-progress-ring-card">
              <div className="hero-progress-score-row">
                <span className="hero-score-number">{overallPct}%</span>
                <span className="hero-score-label">Overall Progress</span>
              </div>
              <div className="hero-progress-bar-bg">
                <div
                  className="hero-progress-bar-fill"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <span className="hero-formula-hint">
                50% Resources ({resPct}%) + 50% Practice ({pracPct}%)
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Metric Tiles */}
        <div className="detail-breakdown-tiles">
          <div className="breakdown-tile">
            <div className="tile-icon-box">
              <BookOpen size={18} className="tile-icon" />
            </div>
            <div className="tile-info">
              <span className="tile-title">Learning Resources</span>
              <div className="tile-val-row">
                <strong className="tile-val">{compRes} / {totalRes}</strong>
                <span className="tile-pct">({resPct}%)</span>
              </div>
              <span className="tile-sub">Weighted at 50% of skill mastery</span>
            </div>
          </div>

          <div className="breakdown-tile">
            <div className="tile-icon-box">
              <Code2 size={18} className="tile-icon" />
            </div>
            <div className="tile-info">
              <span className="tile-title">Problems Solved</span>
              <div className="tile-val-row">
                <strong className="tile-val">{solvedCount} / {targetProblems}</strong>
                <span className="tile-pct">({pracPct}%)</span>
              </div>
              <span className="tile-sub">Target: {targetProblems} practice questions</span>
            </div>
          </div>

          <div className="breakdown-tile">
            <div className="tile-icon-box">
              <Clock size={18} className="tile-icon" />
            </div>
            <div className="tile-info">
              <span className="tile-title">Last Activity</span>
              <div className="tile-val-row">
                <strong className="tile-val">{skill.lastActivity || 'Today'}</strong>
              </div>
              <span className="tile-sub">Active learning session</span>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Sub-Tabs */}
      <div className="detail-tabs-header">
        <button
          type="button"
          className={`detail-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <BookOpen size={16} />
          <span>Learning Resources ({skillResources.length})</span>
        </button>
        <button
          type="button"
          className={`detail-tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <Code2 size={16} />
          <span>Practice Problems ({skillProblems.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="detail-tab-content">
        {activeTab === 'resources' ? (
          <ResourceTable
            resources={skillResources}
            skills={[skill]}
            selectedSkillId={skill.id}
            onToggleComplete={onToggleCompleteResource}
            onAddResource={() => onAddResource(skill.id)}
            onDeleteResource={onDeleteResource}
          />
        ) : (
          <PracticeProblemsSection
            problems={skillProblems}
            skills={[skill]}
            selectedSkillId={skill.id}
            onAddProblem={() => onAddProblem(skill.id)}
            onEditProblem={onEditProblem}
            onDeleteProblem={onDeleteProblem}
            onViewProblem={onViewProblem}
          />
        )}
      </div>
    </div>
  );
};
