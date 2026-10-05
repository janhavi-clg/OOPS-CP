import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Code2,
  GitCommit,
  Award,
  ExternalLink,
  Filter,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

export const CodingJourneyTimeline = ({ activities = [] }) => {
  const [platformFilter, setPlatformFilter] = useState('ALL');

  const filtered = activities.filter((act) => {
    if (platformFilter !== 'ALL' && act.platform.toLowerCase() !== platformFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const getPlatformClass = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'leetcode': return 'tag-leetcode';
      case 'github': return 'tag-github';
      case 'codechef': return 'tag-codechef';
      case 'codeforces': return 'tag-codeforces';
      default: return 'tag-default';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'CONTEST_PARTICIPATION': return <Award size={15} />;
      case 'REPO_CREATED':
      case 'COMMIT_PUSHED': return <GitCommit size={15} />;
      case 'SYNC': return <CheckCircle2 size={15} />;
      default: return <Code2 size={15} />;
    }
  };

  return (
    <div className="devtrack-coding-journey-timeline">
      {/* Header and Filter */}
      <div className="journey-header-bar">
        <div>
          <h3 className="section-title">Coding Journey Timeline</h3>
          <p className="section-subtitle">
            Chronological log of verified contest participations, solved questions, and repository activity.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="journey-filter-group">
          {['ALL', 'LeetCode', 'GitHub', 'CodeChef', 'Codeforces'].map((p) => (
            <button
              key={p}
              type="button"
              className={`journey-filter-btn ${platformFilter === p ? 'active' : ''}`}
              onClick={() => setPlatformFilter(p)}
            >
              {p === 'ALL' ? 'All Platforms' : p}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="journey-empty-state">
          <Clock size={40} className="empty-icon" />
          <h4 className="empty-title">No journey events recorded</h4>
          <p className="empty-desc">
            Connect your platforms or solve problems to see your chronological activity here.
          </p>
        </div>
      ) : (
        <div className="timeline-container">
          <div className="timeline-spine-line" />
          {filtered.map((act) => (
            <div key={act.id} className="timeline-item-row">
              {/* Date Column */}
              <div className="timeline-date-col">
                <span className="timeline-date-badge">{act.date}</span>
              </div>

              {/* Node Icon */}
              <div className="timeline-node-circle">
                {getActivityIcon(act.activityType)}
              </div>

              {/* Event Card */}
              <div className="timeline-content-card">
                <div className="event-card-top">
                  <div className="event-meta-left">
                    <span className={`event-platform-tag ${getPlatformClass(act.platform)}`}>
                      {act.platform}
                    </span>
                    {act.sourceType && (
                      <span className={`source-tag-tiny ${act.sourceType.toLowerCase()}`}>
                        {act.sourceType}
                      </span>
                    )}
                  </div>

                  {act.linkUrl && (
                    <a
                      href={act.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-ext-link"
                      title="Open verification link"
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <h4 className="event-title">{act.title}</h4>
                <p className="event-result">{act.result}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
