import React from 'react';
import { BarChart3, PieChart } from 'lucide-react';

export const WeeklyActivityChart = ({ weeklyActivity, activityDistribution }) => {
  if (!weeklyActivity) return null;

  const maxCount = Math.max(...weeklyActivity.map(d => d.count), 25);

  return (
    <div className="devtrack-analytics-card">
      <div className="card-top-header">
        <div className="card-title-group">
          <BarChart3 size={18} className="card-icon" />
          <div>
            <h4>Weekly Development Rhythm</h4>
            <p className="card-subtitle">Activity count distributed across past 7 days</p>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="weekly-bars-container">
        {weeklyActivity.map(item => {
          const heightPct = Math.round((item.count / maxCount) * 100);
          return (
            <div key={item.day} className="day-bar-column">
              <div className="day-count-tooltip">{item.count}</div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ height: `${heightPct}%` }}
                ></div>
              </div>
              <span className="day-label">{item.day}</span>
            </div>
          );
        })}
      </div>

      {/* Activity Breakdown Distribution */}
      {activityDistribution && (
        <div className="distribution-block">
          <div className="distribution-title">
            <PieChart size={14} />
            <span>Effort Distribution Across Modules</span>
          </div>

          <div className="distribution-stacked-bar">
            {activityDistribution.map(item => (
              <div
                key={item.category}
                className="stacked-segment"
                style={{ width: `${item.percentage}%`, background: item.color }}
                title={`${item.category}: ${item.percentage}%`}
              ></div>
            ))}
          </div>

          <div className="distribution-legend">
            {activityDistribution.map(item => (
              <div key={item.category} className="legend-item">
                <span className="legend-swatch" style={{ background: item.color }}></span>
                <span className="legend-text">{item.category}</span>
                <span className="legend-pct">({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
