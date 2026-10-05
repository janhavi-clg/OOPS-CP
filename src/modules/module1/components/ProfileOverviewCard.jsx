import React from 'react';
import {
  Edit3,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

export const ProfileOverviewCard = ({ profile, onEditClick }) => {
  if (!profile) return null;

  return (
    <div className="section-card profile-overview-card">
      <div className="profile-card-layout">
        {/* Left: Avatar Column */}
        <div className="profile-avatar-column">
          <div className="profile-large-avatar">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="profile-img-element"
              />
            ) : (
              <div className="profile-monogram-circle">
                <span>{(profile.name || 'R').charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div className="verified-badge-dot" title="Student Verified" />
          </div>

          <div className="profile-semester-chip">
            <span>{profile.semester || 'Semester 4'}</span>
          </div>
        </div>

        {/* Center / Right: Details */}
        <div className="profile-details-column">
          <div className="profile-name-header">
            <div className="name-and-status">
              <h1 className="profile-display-name">{profile.name}</h1>
              <div className="developer-status-pill">
                <Sparkles size={13} className="sparkle-icon" />
                <span>{profile.developerStatus || 'Second-Year AI/ML Undergrad'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onEditClick}
              className="btn-edit-profile"
              id="btn-edit-profile-trigger"
            >
              <Edit3 size={15} />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Academic Meta Tags */}
          <div className="profile-meta-grid">
            <div className="meta-tag-item">
              <GraduationCap size={16} className="meta-icon" />
              <span>{profile.year} • {profile.branch}</span>
            </div>

            <div className="meta-tag-item">
              <Building2 size={16} className="meta-icon" />
              <span>{profile.college}</span>
            </div>

            {profile.email && (
              <div className="meta-tag-item">
                <Mail size={16} className="meta-icon" />
                <span>{profile.email}</span>
              </div>
            )}

            {profile.phone && (
              <div className="meta-tag-item">
                <Phone size={16} className="meta-icon" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>

          {/* Bio statement */}
          {profile.bio && (
            <p className="profile-bio-text">
              {profile.bio}
            </p>
          )}

          {/* Quick Stats Highlights */}
          <div className="profile-quick-stats">
            <div className="quick-stat-chip">
              <span className="stat-label">CGPA</span>
              <span className="stat-val">{profile.cgpa || '8.72'}</span>
            </div>
            <div className="quick-stat-chip">
              <span className="stat-label">Roll No</span>
              <span className="stat-val">{profile.rollNumber || '24CSAML042'}</span>
            </div>
            <div className="quick-stat-chip">
              <span className="stat-label">Account Mode</span>
              <span className="stat-val demo-highlight">Faculty Demo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
