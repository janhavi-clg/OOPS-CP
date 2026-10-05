import React from 'react';
import {
  Code2,
  Flame,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  Target
} from 'lucide-react';

export const CodingOverview = ({ overview, onConnectClick, onAddGoalClick }) => {
  const total = overview?.totalSolved || 0;
  const easy = overview?.easySolved || 0;
  const medium = overview?.mediumSolved || 0;
  const hard = overview?.hardSolved || 0;

  const easyPct = total > 0 ? Math.round((easy / total) * 100) : 0;
  const medPct = total > 0 ? Math.round((medium / total) * 100) : 0;
  const hardPct = total > 0 ? Math.max(0, 100 - easyPct - medPct) : 0;

  const currentStreak = overview?.currentStreakDays || 23;
  const longestStreak = overview?.longestStreakDays || 45;
  const dailyTarget = overview?.dailyTarget || 2;
  const dailySolved = overview?.dailySolvedToday || 2;
  const dailyPct = dailyTarget > 0 ? Math.min(100, Math.round((dailySolved / dailyTarget) * 100)) : 100;

  return (
    <div className="devtrack-coding-overview-section">
      {/* 4 Primary Metric Cards */}
      <div className="coding-overview-cards-grid">
        {/* Total Solved */}
        <div className="coding-metric-card highlight-card">
          <div className="metric-card-top">
            <div className="metric-icon-box coffee-accent">
              <Code2 size={22} />
            </div>
            <span className="metric-badge-tag">Aggregated</span>
          </div>
          <div className="metric-card-content">
            <span className="metric-large-number">{total}</span>
            <span className="metric-label">Total Problems Solved</span>
            <span className="metric-subtext">Across all connected coding profiles</span>
          </div>
        </div>

        {/* Current & Longest Streak */}
        <div className="coding-metric-card streak-card">
          <div className="metric-card-top">
            <div className="metric-icon-box flame-accent">
              <Flame size={22} className="text-orange-flame" />
            </div>
            <span className="metric-badge-tag gold">Active</span>
          </div>
          <div className="metric-card-content">
            <div className="streak-dual-row">
              <div>
                <span className="metric-large-number">{currentStreak}</span>
                <span className="metric-label">Current Streak</span>
              </div>
              <div className="streak-divider-v" />
              <div>
                <span className="metric-sub-number">{longestStreak} Days</span>
                <span className="metric-sub-label">Best Streak</span>
              </div>
            </div>
            <span className="metric-subtext">Daily algorithmic problem consistency</span>
          </div>
        </div>

        {/* Daily Target Progress */}
        <div className="coding-metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box target-accent">
              <Target size={22} />
            </div>
            <span className="metric-badge-tag green">Today</span>
          </div>
          <div className="metric-card-content">
            <div className="daily-target-row">
              <span className="metric-large-number">{dailySolved} / {dailyTarget}</span>
              <span className="target-pct-badge">{dailyPct}% Met</span>
            </div>
            <span className="metric-label">Daily Target Progress</span>
            <div className="target-bar-bg">
              <div className="target-bar-fill" style={{ width: `${dailyPct}%` }} />
            </div>
          </div>
        </div>

        {/* Active Platforms & Goals */}
        <div className="coding-metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box layers-accent">
              <Layers size={22} />
            </div>
            <span className="metric-badge-tag">Portfolio</span>
          </div>
          <div className="metric-card-content">
            <span className="metric-large-number">{overview?.connectedPlatformsCount || 4}</span>
            <span className="metric-label">Connected Platforms</span>
            <span className="metric-subtext">
              {overview?.completedGoals || 1} of {overview?.totalGoals || 4} Coding Goals Met
            </span>
          </div>
        </div>
      </div>

      {/* Difficulty Distribution Breakdown Box */}
      <div className="coding-distribution-card">
        <div className="distribution-header">
          <div>
            <h3 className="distribution-title">Problem Difficulty Breakdown</h3>
            <p className="distribution-subtitle">
              Cumulative distribution of Easy, Medium, and Hard challenges solved.
            </p>
          </div>
          <div className="distribution-legend">
            <span className="legend-item easy">
              <span className="legend-dot easy" /> Easy ({easy})
            </span>
            <span className="legend-item medium">
              <span className="legend-dot medium" /> Medium ({medium})
            </span>
            <span className="legend-item hard">
              <span className="legend-dot hard" /> Hard ({hard})
            </span>
          </div>
        </div>

        {/* Multi-segment Segmented Bar */}
        <div className="distribution-segmented-bar">
          <div
            className="segment easy"
            style={{ width: `${easyPct}%` }}
            title={`Easy: ${easy} (${easyPct}%)`}
          />
          <div
            className="segment medium"
            style={{ width: `${medPct}%` }}
            title={`Medium: ${medium} (${medPct}%)`}
          />
          <div
            className="segment hard"
            style={{ width: `${hardPct}%` }}
            title={`Hard: ${hard} (${hardPct}%)`}
          />
        </div>

        {/* Breakdown Metric Tiles */}
        <div className="distribution-tiles-grid">
          <div className="diff-tile easy">
            <span className="diff-tile-label">Easy</span>
            <div className="diff-tile-val-row">
              <strong className="diff-tile-count">{easy}</strong>
              <span className="diff-tile-pct">{easyPct}%</span>
            </div>
            <span className="diff-tile-desc">Core fundamentals & syntax</span>
          </div>

          <div className="diff-tile medium">
            <span className="diff-tile-label">Medium</span>
            <div className="diff-tile-val-row">
              <strong className="diff-tile-count">{medium}</strong>
              <span className="diff-tile-pct">{medPct}%</span>
            </div>
            <span className="diff-tile-desc">Standard interview patterns & DSA</span>
          </div>

          <div className="diff-tile hard">
            <span className="diff-tile-label">Hard</span>
            <div className="diff-tile-val-row">
              <strong className="diff-tile-count">{hard}</strong>
              <span className="diff-tile-pct">{hardPct}%</span>
            </div>
            <span className="diff-tile-desc">Complex optimization & dynamic programming</span>
          </div>
        </div>
      </div>
    </div>
  );
};
