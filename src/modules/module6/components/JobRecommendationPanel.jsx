import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  XCircle,
  Plus,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { STANDARD_JOB_ROLES } from '../module6Data';

export const JobRecommendationPanel = ({
  targetRole,
  onTargetRoleChange,
  jobDescription,
  onJobDescriptionChange,
  matchData,
  onAcceptSkill,
  onIgnoreSkill,
  onAddProjectRecommendation,
  onAddAchievementRecommendation
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [ignoredSkills, setIgnoredSkills] = useState(new Set());

  const handleIgnore = (skill) => {
    setIgnoredSkills(prev => new Set([...prev, skill]));
    if (onIgnoreSkill) onIgnoreSkill(skill);
  };

  const visibleMissingSkills = (matchData?.missingSkills || []).filter(s => !ignoredSkills.has(s));

  return (
    <div className="devtrack-recommendation-panel">
      <div className="rec-panel-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="rec-title-group">
          <Sparkles size={18} className="rec-sparkle-icon" />
          <div>
            <h4>Job-Specific Profile Match</h4>
            <p className="rec-header-sub">Role alignment benchmarks and gap analysis</p>
          </div>
        </div>

        <div className="rec-header-right">
          {matchData && (
            <div className="match-score-badge" title="Weighted Match: 50% Skills, 30% Projects, 20% Achievements">
              <span className="score-num">{matchData.overallScore}%</span>
              <span className="score-label">Profile Match</span>
            </div>
          )}
          <button type="button" className="rec-toggle-btn">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="rec-panel-body">
          {/* Target Role & Description Inputs */}
          <div className="rec-input-group">
            <div className="form-group">
              <label>Target Employment Role</label>
              <select
                value={targetRole}
                onChange={e => onTargetRoleChange(e.target.value)}
                className="role-select"
              >
                {STANDARD_JOB_ROLES.map(role => (
                  <option key={role.roleKey} value={role.title}>{role.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Paste Job Description (Optional)</label>
              <textarea
                rows={2}
                placeholder="Paste key responsibilities or qualifications to match extra keywords..."
                value={jobDescription}
                onChange={e => onJobDescriptionChange(e.target.value)}
              />
            </div>
          </div>

          {/* Transparent Score Breakdown */}
          {matchData && (
            <div className="score-breakdown-card">
              <div className="breakdown-title-row">
                <span>Transparent Scoring Formula:</span>
                <span className="formula-hint">50% Skills • 30% Projects • 20% Achievements</span>
              </div>
              <div className="breakdown-meters-row">
                <div className="meter-item">
                  <span className="meter-name">Skills Match (50%)</span>
                  <div className="meter-bar-track">
                    <div className="meter-fill" style={{ width: `${matchData.skillScore || 0}%` }}></div>
                  </div>
                  <span className="meter-pct">{matchData.skillScore || 0}%</span>
                </div>
                <div className="meter-item">
                  <span className="meter-name">Projects Match (30%)</span>
                  <div className="meter-bar-track">
                    <div className="meter-fill" style={{ width: `${matchData.projectScore || 0}%` }}></div>
                  </div>
                  <span className="meter-pct">{matchData.projectScore || 0}%</span>
                </div>
                <div className="meter-item">
                  <span className="meter-name">Achievements Match (20%)</span>
                  <div className="meter-bar-track">
                    <div className="meter-fill" style={{ width: `${matchData.achScore || 0}%` }}></div>
                  </div>
                  <span className="meter-pct">{matchData.achScore || 0}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Matched Skills */}
          {matchData?.matchedSkills?.length > 0 && (
            <div className="rec-sub-block">
              <div className="sub-block-title">
                <CheckCircle size={14} className="icon-success" />
                <span>Verified Matching Skills ({matchData.matchedSkills.length})</span>
              </div>
              <div className="matched-chips-flow">
                {matchData.matchedSkills.map(sk => (
                  <span key={sk} className="matched-chip">✓ {sk}</span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills (Potential Gaps) */}
          {visibleMissingSkills.length > 0 && (
            <div className="rec-sub-block">
              <div className="sub-block-title">
                <AlertTriangle size={14} className="icon-warning" />
                <span>Potential Skill Gaps for this Role ({visibleMissingSkills.length})</span>
              </div>
              <p className="gap-explanation">
                Add to your resume if you have foundational exposure, or ignore:
              </p>
              <div className="missing-skills-list">
                {visibleMissingSkills.map(sk => (
                  <div key={sk} className="missing-skill-row">
                    <span className="gap-skill-name">{sk}</span>
                    <div className="gap-skill-actions">
                      <button
                        type="button"
                        className="gap-action-btn accept"
                        onClick={() => onAcceptSkill(sk)}
                        title="Accept and add this skill to resume"
                      >
                        <Plus size={12} />
                        <span>Accept & Add</span>
                      </button>
                      <button
                        type="button"
                        className="gap-action-btn ignore"
                        onClick={() => handleIgnore(sk)}
                        title="Ignore recommendation"
                      >
                        <XCircle size={12} />
                        <span>Ignore</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Relevant Projects from M4 */}
          <div className="rec-sub-block">
            <div className="sub-block-title">
              <Briefcase size={14} className="icon-accent" />
              <span>Recommended Projects for {targetRole}</span>
            </div>
            <p className="gap-explanation">
              Keywords: {(matchData?.recommendedProjectKeywords || ['DevTrack', 'AI', 'IoT']).join(', ')}
            </p>
            <button
              type="button"
              className="btn-secondary btn-small"
              onClick={onAddProjectRecommendation}
            >
              <span>Review & Select Projects from Module 4</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
