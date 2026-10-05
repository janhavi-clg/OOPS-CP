import React from 'react';
import {
  Trophy,
  ExternalLink,
  Eye,
  Edit3,
  Trash2,
  Users,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';

export const AchievementCard = ({
  achievement,
  onView,
  onEdit,
  onDelete
}) => {
  const isHackathon = achievement.achievementCategory === 'Hackathon Achievement' || Boolean(achievement.hackathonUrl);
  const hasProof = Boolean(achievement.proofUrl || achievement.hackathonUrl);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'winner':
        return 'badge-winner';
      case 'runner-up':
      case 'top 10':
      case 'finalist':
        return 'badge-finalist';
      case 'special mention':
        return 'badge-mention';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="devtrack-achievement-card">
      <div className="ach-card-top">
        <div className="ach-badge-group">
          <span className="ach-cat-badge">
            <Layers size={12} />
            <span>{achievement.achievementCategory || 'Achievement'}</span>
          </span>

          {achievement.participationStatus && (
            <span className={`status-badge ${getStatusBadgeClass(achievement.participationStatus)}`}>
              {achievement.participationStatus}
            </span>
          )}
        </div>

        {hasProof ? (
          <span className="proof-badge verified" title="Proof attached">
            <ShieldCheck size={12} />
            <span>Verified / Proof Added</span>
          </span>
        ) : (
          <span className="proof-badge unverified">
            <span>No Proof Added</span>
          </span>
        )}
      </div>

      <div className="ach-card-body">
        <h4 className="ach-title">{achievement.title}</h4>

        <div className="ach-org-row">
          <span className="ach-org">{achievement.organization}</span>
          {achievement.platform && (
            <span className="ach-platform-chip">{achievement.platform}</span>
          )}
          {achievement.achievementDate && (
            <span className="ach-date">
              <Calendar size={12} />
              <span>{achievement.achievementDate}</span>
            </span>
          )}
        </div>

        {achievement.description && (
          <p className="ach-desc">{achievement.description}</p>
        )}

        {(achievement.role || achievement.teamName) && (
          <div className="ach-team-row">
            {achievement.role && (
              <span className="ach-role-tag">
                <strong>Role:</strong> {achievement.role}
              </span>
            )}
            {achievement.teamName && (
              <span className="ach-team-tag">
                <Users size={12} />
                <span>{achievement.teamName}</span>
              </span>
            )}
          </div>
        )}

        {achievement.relatedSkills && achievement.relatedSkills.length > 0 && (
          <div className="ach-skills-list">
            {achievement.relatedSkills.map((sk) => (
              <span key={sk} className="ach-skill-tag">{sk}</span>
            ))}
          </div>
        )}
      </div>

      <div className="ach-card-footer">
        <div className="ach-left-links">
          {achievement.hackathonUrl && (
            <a
              href={achievement.hackathonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ach-btn open-hackathon"
              title="Open Hackathon in new tab"
            >
              <ExternalLink size={14} />
              <span>Open Hackathon</span>
            </a>
          )}

          {achievement.proofUrl && (
            <button
              type="button"
              className="ach-btn view-proof"
              onClick={() => onView(achievement)}
              title="View Proof File / Image"
            >
              <Eye size={14} />
              <span>View Proof</span>
            </button>
          )}
        </div>

        <div className="ach-right-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => onEdit(achievement)}
            title="Edit Achievement"
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="action-icon-btn danger"
            onClick={() => onDelete(achievement.id)}
            title="Delete Achievement"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
