import React from 'react';
import {
  Target,
  Plus,
  CheckCircle2,
  Calendar,
  Edit2,
  Trash2,
  Flame,
  Award
} from 'lucide-react';

export const CodingGoalsSection = ({
  goals = [],
  onAddGoal,
  onEditGoal,
  onDeleteGoal
}) => {
  return (
    <div className="devtrack-coding-goals-section">
      <div className="section-toolbar">
        <div>
          <h3 className="section-title">Coding Goals & Milestones</h3>
          <p className="section-subtitle">
            Set and measure targets for problem counts, contest rankings, and practice consistency.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={onAddGoal}>
          <Plus size={16} />
          <span>+ Create Goal</span>
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="goals-empty-state">
          <Target size={40} className="empty-icon" />
          <h4 className="empty-title">No coding goals yet</h4>
          <p className="empty-desc">
            Define realistic targets such as "Solve 100 problems this month" or "Maintain 2 problems/day".
          </p>
          <button type="button" className="btn-primary" onClick={onAddGoal}>
            <Plus size={15} />
            <span>+ Create Goal</span>
          </button>
        </div>
      ) : (
        <div className="goals-cards-grid">
          {goals.map((g) => {
            const pct = g.targetValue > 0
              ? Math.min(100, Math.round(((g.currentValue || 0) / g.targetValue) * 100))
              : 0;
            const isCompleted = g.status === 'COMPLETED' || pct >= 100;

            return (
              <div
                key={g.id}
                className={`devtrack-goal-card ${isCompleted ? 'goal-completed' : ''}`}
              >
                <div className="goal-card-top">
                  <div className="goal-tags-row">
                    <span className="goal-platform-tag">{g.platform || 'All'}</span>
                    <span className="goal-timeframe-tag">{g.timeframe || 'Monthly'}</span>
                    {isCompleted && (
                      <span className="goal-achieved-badge">
                        <CheckCircle2 size={12} />
                        <span>Achieved</span>
                      </span>
                    )}
                  </div>
                  <div className="goal-actions-row">
                    <button
                      type="button"
                      className="btn-icon-subtle"
                      onClick={() => onEditGoal(g)}
                      title="Edit Goal"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon-danger"
                      onClick={() => onDeleteGoal(g)}
                      title="Delete Goal"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <h4 className="goal-title">{g.title}</h4>

                {/* Progress values & bar */}
                <div className="goal-progress-container">
                  <div className="goal-progress-header">
                    <span className="goal-current-val">
                      <strong>{g.currentValue}</strong> / {g.targetValue}
                    </span>
                    <span className="goal-pct">{pct}%</span>
                  </div>
                  <div className="goal-progress-bar-bg">
                    <div
                      className={`goal-progress-bar-fill ${isCompleted ? 'fill-completed' : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Deadline Footer */}
                {g.deadline && (
                  <div className="goal-footer">
                    <Calendar size={12} className="deadline-icon" />
                    <span>Target Date: {g.deadline}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
