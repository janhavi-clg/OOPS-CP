import React from 'react';
import { Code2, Flame, Award, CheckCircle } from 'lucide-react';

export const CodingAnalyticsCard = ({ codingData }) => {
  if (!codingData) return null;

  const total = codingData.problemsSolved || 137;
  const easy = codingData.easySolved || 68;
  const medium = codingData.mediumSolved || 54;
  const hard = codingData.hardSolved || 15;

  const easyPct = Math.round((easy / total) * 100);
  const medPct = Math.round((medium / total) * 100);
  const hardPct = Math.round((hard / total) * 100);

  return (
    <div className="devtrack-analytics-card">
      <div className="card-top-header">
        <div className="card-title-group">
          <Code2 size={18} className="card-icon" />
          <div>
            <h4>Coding Performance</h4>
            <p className="card-subtitle">Module 3 synced problem solving metrics</p>
          </div>
        </div>

        <div className="streak-indicator-pill">
          <Flame size={14} className="flame-icon" />
          <span>{codingData.codingStreakDays || 14}d Streak</span>
        </div>
      </div>

      <div className="coding-hero-stat">
        <div className="coding-big-number">{total}</div>
        <div className="coding-big-label">Problems Solved Across Connected Platforms</div>
      </div>

      {/* Difficulty Breakdown Bars */}
      <div className="difficulty-segmented-bar">
        <div className="segment easy" style={{ width: `${easyPct}%` }} title={`Easy: ${easy}`}></div>
        <div className="segment medium" style={{ width: `${medPct}%` }} title={`Medium: ${medium}`}></div>
        <div className="segment hard" style={{ width: `${hardPct}%` }} title={`Hard: ${hard}`}></div>
      </div>

      <div className="difficulty-legend-grid">
        <div className="diff-item">
          <span className="diff-dot easy"></span>
          <span className="diff-name">Easy:</span>
          <span className="diff-count">{easy}</span>
          <span className="diff-pct">({easyPct}%)</span>
        </div>
        <div className="diff-item">
          <span className="diff-dot medium"></span>
          <span className="diff-name">Medium:</span>
          <span className="diff-count">{medium}</span>
          <span className="diff-pct">({medPct}%)</span>
        </div>
        <div className="diff-item">
          <span className="diff-dot hard"></span>
          <span className="diff-name">Hard:</span>
          <span className="diff-count">{hard}</span>
          <span className="diff-pct">({hardPct}%)</span>
        </div>
      </div>

      <div className="connected-platforms-row">
        <span className="conn-label">Connected Platforms:</span>
        {(codingData.platformNames || ['LeetCode', 'GitHub']).map(p => (
          <span key={p} className="platform-tag">
            <CheckCircle size={11} /> {p}
          </span>
        ))}
      </div>
    </div>
  );
};
