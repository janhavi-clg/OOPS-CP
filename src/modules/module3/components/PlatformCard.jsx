import React from 'react';
import {
  ExternalLink,
  RefreshCw,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Award,
  Code2,
  GitBranch,
  Star,
  Users,
  Flame,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const PlatformCard = ({
  profile,
  onSync,
  onManualVerify,
  onDisconnect,
  isSyncing = false
}) => {
  const { platform, username, profileUrl, sourceType, lastSyncedAt, proofUrl, statistics } = profile;

  const isGitHub = platform.toLowerCase() === 'github';
  const probStats = statistics?.problemStats;
  const contestStats = statistics?.contestStats;
  const streakStats = statistics?.streakStats;
  const ghStats = statistics?.githubStats;

  // Source Type Badge
  const renderSourceBadge = () => {
    switch (sourceType) {
      case 'LIVE':
        return (
          <span className="source-badge live" title="Directly synchronized from public API">
            <span className="pulse-dot live" />
            <span>LIVE SYNCED</span>
          </span>
        );
      case 'MANUAL':
        return (
          <span className="source-badge manual" title="Manually verified with proof">
            <FileCheck size={11} />
            <span>MANUAL DATA</span>
          </span>
        );
      case 'DEMO':
      default:
        return (
          <span className="source-badge demo" title="Fictional demo data for prototype demonstration">
            <ShieldCheck size={11} />
            <span>DEMO DATA</span>
          </span>
        );
    }
  };

  return (
    <div className="devtrack-platform-card">
      {/* Top Header */}
      <div className="platform-card-header">
        <div className="header-meta-left">
          <div className="platform-title-row">
            <h3 className="platform-name">{platform}</h3>
            {renderSourceBadge()}
          </div>
          <span className="platform-username">@{username}</span>
        </div>

        <div className="header-actions-right">
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-open-profile-icon"
              title={`Open ${platform} profile in new tab`}
            >
              <ExternalLink size={15} />
            </a>
          )}
          <button
            type="button"
            className="btn-icon-danger"
            title={`Disconnect ${platform}`}
            onClick={() => onDisconnect(profile)}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Main Stats Body */}
      <div className="platform-card-body">
        {isGitHub && ghStats ? (
          /* GitHub Specific Metrics */
          <div className="github-stats-grid">
            <div className="stat-box">
              <span className="stat-box-label">Repositories</span>
              <strong className="stat-box-value">{ghStats.publicRepos}</strong>
            </div>
            <div className="stat-box">
              <span className="stat-box-label">Contributions</span>
              <strong className="stat-box-value">{ghStats.contributionsThisYear}</strong>
            </div>
            <div className="stat-box">
              <span className="stat-box-label">Followers</span>
              <strong className="stat-box-value">{ghStats.followers}</strong>
            </div>
            <div className="stat-box">
              <span className="stat-box-label">Top Language</span>
              <strong className="stat-box-value language-tag">
                {ghStats.topLanguages && ghStats.topLanguages[0] ? ghStats.topLanguages[0] : 'Java'}
              </strong>
            </div>
          </div>
        ) : (
          /* Competitive Programming Metrics */
          <div className="coding-stats-summary-rows">
            {/* Problems Solved Row */}
            <div className="stats-row-metric">
              <div className="metric-left">
                <Code2 size={16} className="metric-icon" />
                <span className="metric-name">Problems Solved</span>
              </div>
              <div className="metric-right">
                <strong className="metric-primary-val">
                  {probStats?.totalSolved || 0}
                </strong>
                {probStats && (
                  <span className="metric-sub-detail">
                    ({probStats.easySolved}E • {probStats.mediumSolved}M • {probStats.hardSolved}H)
                  </span>
                )}
              </div>
            </div>

            {/* Contest Rating Row */}
            {contestStats && contestStats.rating > 0 && (
              <div className="stats-row-metric">
                <div className="metric-left">
                  <Award size={16} className="metric-icon" />
                  <span className="metric-name">Contest Rating</span>
                </div>
                <div className="metric-right">
                  <strong className="metric-primary-val">{contestStats.rating}</strong>
                  {contestStats.badgeTitle && (
                    <span className="badge-contest-rank">{contestStats.badgeTitle}</span>
                  )}
                </div>
              </div>
            )}

            {/* Active Streak Row */}
            {streakStats && streakStats.currentStreakDays > 0 && (
              <div className="stats-row-metric">
                <div className="metric-left">
                  <Flame size={16} className="metric-icon text-orange-flame" />
                  <span className="metric-name">Active Streak</span>
                </div>
                <div className="metric-right">
                  <strong className="metric-primary-val">{streakStats.currentStreakDays} Days</strong>
                  <span className="metric-sub-detail">Best: {streakStats.longestStreakDays}d</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Verification Proof Indicator */}
      {proofUrl && (
        <div className="platform-proof-indicator">
          <FileCheck size={13} className="text-coffee" />
          <a
            href={proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proof-link"
          >
            View Verification Proof ↗
          </a>
        </div>
      )}

      {/* Card Footer & Action Buttons */}
      <div className="platform-card-footer">
        <div className="sync-time-wrapper">
          <Clock size={12} className="time-icon" />
          <span className="sync-time-text">Synced: {lastSyncedAt || 'Recently'}</span>
        </div>

        <div className="card-footer-buttons">
          <button
            type="button"
            className="btn-card-subtle"
            onClick={() => onManualVerify(profile)}
            title="Update or verify statistics manually"
          >
            <Edit2 size={13} />
            <span>Verify</span>
          </button>

          <button
            type="button"
            className={`btn-sync-action ${isSyncing ? 'syncing' : ''}`}
            onClick={() => onSync(profile)}
            disabled={isSyncing}
            title={
              ['LeetCode', 'GitHub', 'Codeforces'].includes(platform)
                ? 'Sync live statistics from platform'
                : 'Refresh data'
            }
          >
            <RefreshCw size={13} className={isSyncing ? 'spinning' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
