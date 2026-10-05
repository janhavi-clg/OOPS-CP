import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InsightsPanel = ({ insights, recommendations }) => {
  const navigate = useNavigate();

  return (
    <div className="insights-recommendations-wrapper">
      {/* DevTrack Insights Block (Rule-based per 8.10) */}
      <div className="devtrack-analytics-card insights-card">
        <div className="card-top-header">
          <div className="card-title-group">
            <Lightbulb size={18} className="card-icon gold" />
            <div>
              <h4>DevTrack Insights</h4>
              <p className="card-subtitle">Transparent observations derived from your actual activity</p>
            </div>
          </div>
        </div>

        <div className="insights-list">
          {(insights || []).map(ins => (
            <div key={ins.id} className="insight-item-box">
              <div className="insight-badge-category">{ins.category}</div>
              <h5 className="insight-headline">{ins.title}</h5>
              <p className="insight-body">{ins.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Recommendations Block (Rule-based per 8.11) */}
      <div className="devtrack-analytics-card recommendations-card">
        <div className="card-top-header">
          <div className="card-title-group">
            <Compass size={18} className="card-icon warm" />
            <div>
              <h4>Actionable Recommendations</h4>
              <p className="card-subtitle">Next high-impact steps to accelerate your developer progress</p>
            </div>
          </div>
        </div>

        <div className="recommendations-list">
          {(recommendations || []).map(rec => (
            <div key={rec.id} className="recommendation-item-box">
              <div className="rec-info-side">
                <span className={`rec-priority-chip ${rec.priority?.toLowerCase()}`}>
                  {rec.priority} PRIORITY
                </span>
                <h5 className="rec-headline">{rec.title}</h5>
                <p className="rec-prompt">{rec.actionPrompt}</p>
              </div>

              {rec.targetUrl && (
                <button
                  type="button"
                  className="rec-action-btn"
                  onClick={() => navigate(rec.targetUrl)}
                  title={`Navigate to ${rec.targetModule}`}
                >
                  <span>Go to Module</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
