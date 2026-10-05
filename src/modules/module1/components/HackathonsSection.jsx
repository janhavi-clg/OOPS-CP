import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  Users,
  Award,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { HackathonModal } from './HackathonModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

const FILTER_TABS = [
  'All',
  'Upcoming',
  'Ongoing',
  'Completed',
  'Won',
  'Finalist',
  'Participated'
];

/**
 * Calculates a dynamic countdown string from reference dates.
 */
function getCountdownBadge(hackathon) {
  const { status, startDate, endDate, submissionDeadline } = hackathon;

  if (['Won', 'Completed', 'Participated', 'Runner-up', 'Finalist'].includes(status)) {
    return { text: 'Concluded', tone: 'neutral' };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (startDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      return {
        text: diffDays === 1 ? 'Starts tomorrow' : `Starts in ${diffDays} days`,
        tone: 'upcoming'
      };
    }
  }

  if (submissionDeadline) {
    const sub = new Date(submissionDeadline);
    sub.setHours(0, 0, 0, 0);
    const diffSub = Math.ceil((sub - now) / (1000 * 60 * 60 * 24));
    if (diffSub >= 0) {
      return {
        text: diffSub === 0 ? 'Submission due today' : `Submission in ${diffSub} days`,
        tone: 'deadline'
      };
    }
  }

  if (endDate) {
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    if (now <= end) {
      return { text: 'Ongoing Now', tone: 'active' };
    }
  }

  return { text: 'Concluded', tone: 'neutral' };
}

export const HackathonsSection = ({
  hackathons = [],
  onAddHackathon,
  onEditHackathon,
  onDeleteHackathon
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState(null);
  const [deletingHackathon, setDeletingHackathon] = useState(null);

  // Filter & Search
  const filteredHackathons = useMemo(() => {
    return hackathons.filter((h) => {
      // 1. Filter by Status
      if (activeFilter !== 'All') {
        if (activeFilter === 'Completed') {
          if (!['Completed', 'Won', 'Participated', 'Runner-up', 'Finalist'].includes(h.status)) {
            return false;
          }
        } else if (h.status.toLowerCase() !== activeFilter.toLowerCase()) {
          return false;
        }
      }

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = h.name && h.name.toLowerCase().includes(q);
        const platformMatch = h.platform && h.platform.toLowerCase().includes(q);
        const teamMatch = h.teamName && h.teamName.toLowerCase().includes(q);
        const achMatch = (h.achievement || h.result) && (h.achievement || h.result).toLowerCase().includes(q);
        const descMatch = h.description && h.description.toLowerCase().includes(q);
        return nameMatch || platformMatch || teamMatch || achMatch || descMatch;
      }

      return true;
    });
  }, [hackathons, activeFilter, searchQuery]);

  const handleOpenAdd = () => {
    setEditingHackathon(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (h) => {
    setEditingHackathon(h);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    if (editingHackathon) {
      await onEditHackathon(editingHackathon.id, formData);
    } else {
      await onAddHackathon(formData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deletingHackathon) {
      await onDeleteHackathon(deletingHackathon.id);
      setDeletingHackathon(null);
    }
  };

  return (
    <div className="section-card hackathons-section">
      {/* Section Header */}
      <div className="section-card-header flex-header">
        <div className="title-with-count">
          <div>
            <div className="title-row-with-badge">
              <h2 className="section-title">My Hackathons</h2>
              <span className="count-badge">{hackathons.length} Tracked</span>
            </div>
            <p className="section-sub">
              Participations, team submissions, important milestones & competitive achievements
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="btn-primary-action btn-sm"
          id="btn-add-hackathon"
        >
          <Plus size={15} />
          <span>Add Hackathon</span>
        </button>
      </div>

      {/* Unstop Integration Banner */}
      <div className="unstop-integration-banner">
        <div className="unstop-banner-left">
          <div className="unstop-brand-mark">
            <span>U</span>
          </div>
          <div className="unstop-meta">
            <h4 className="unstop-title">My Hackathons on Unstop</h4>
            <p className="unstop-desc">
              Directly access national engineering challenges, university competitions, and student hackathons on the official Unstop platform.
            </p>
          </div>
        </div>

        <a
          href="https://unstop.com/hackathons"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-unstop-open"
          title="Open Unstop in a new tab"
        >
          <span>Open Unstop</span>
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Controls: Search Bar & Status Filter Pills */}
      <div className="hackathon-controls-bar">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search hackathons by name, platform, team, or result..."
            className="search-input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          )}
        </div>

        <div className="filter-pills-row" role="tablist">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab}
              className={`filter-pill-btn ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Hackathons Cards Grid */}
      {filteredHackathons.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-wrap">
            <Trophy size={24} />
          </div>
          <h3 className="empty-title">No Hackathons Found</h3>
          <p className="empty-sub">
            {searchQuery || activeFilter !== 'All'
              ? 'No hackathons match your active search and filter criteria.'
              : 'Add your first hackathon or competitive ideathon to start tracking your results.'}
          </p>
          <button type="button" onClick={handleOpenAdd} className="btn-primary-action btn-sm">
            <Plus size={14} /> Add Hackathon
          </button>
        </div>
      ) : (
        <div className="hackathons-grid">
          {filteredHackathons.map((h) => {
            const countdown = getCountdownBadge(h);
            const statusClass = (h.status || 'upcoming').toLowerCase().replace(' ', '-');

            return (
              <div key={h.id} className="hackathon-card">
                {/* Card Top: Platform + Status + Countdown */}
                <div className="hackathon-card-header">
                  <div className="platform-tag-wrap">
                    <span className="platform-tag">{h.platform}</span>
                    <span className={`status-pill ${statusClass}`}>{h.status}</span>
                  </div>

                  <span className={`countdown-badge tone-${countdown.tone}`}>
                    <Clock size={12} />
                    <span>{countdown.text}</span>
                  </span>
                </div>

                {/* Name */}
                <h3 className="hackathon-card-title">{h.name}</h3>

                {/* Dates Row */}
                <div className="hackathon-dates-block">
                  <div className="date-item">
                    <Calendar size={14} className="date-icon" />
                    <span>
                      {h.startDate} {h.endDate ? `– ${h.endDate}` : ''}
                    </span>
                  </div>

                  {h.submissionDeadline && (
                    <div className="date-item sub-deadline">
                      <Clock size={14} className="date-icon" />
                      <span>Submission: {h.submissionDeadline}</span>
                    </div>
                  )}
                </div>

                {/* Team & Achievement */}
                <div className="hackathon-team-row">
                  {h.teamName && (
                    <div className="team-badge">
                      <Users size={13} />
                      <span>{h.teamName} ({h.teamSize || 1})</span>
                    </div>
                  )}

                  {(h.achievement || h.result) && (
                    <div className="achievement-badge">
                      <Award size={13} />
                      <span>{h.achievement || h.result}</span>
                    </div>
                  )}
                </div>

                {/* Description & Notes */}
                {h.description && (
                  <p className="hackathon-card-desc">{h.description}</p>
                )}

                {h.notes && (
                  <div className="hackathon-notes-box">
                    <span className="notes-label">Notes:</span>
                    <span className="notes-text">{h.notes}</span>
                  </div>
                )}

                {/* Card Bottom Actions */}
                <div className="hackathon-card-actions">
                  {(h.eventUrl || h.url) ? (
                    <a
                      href={h.eventUrl || h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-open-hackathon"
                      title="Open hackathon portal in a new tab"
                    >
                      <span>Open Hackathon</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <div />
                  )}

                  <div className="card-right-btn-group">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(h)}
                      className="action-icon-btn"
                      title="Edit hackathon"
                      aria-label={`Edit ${h.name}`}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingHackathon(h)}
                      className="action-icon-btn delete-btn"
                      title="Delete hackathon"
                      aria-label={`Delete ${h.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      <HackathonModal
        isOpen={modalOpen}
        hackathonToEdit={editingHackathon}
        onSave={handleSave}
        onCancel={() => setModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingHackathon}
        title="Delete Hackathon"
        message={`Are you sure you want to delete "${deletingHackathon?.name}"? All associated dates and achievement records will be removed.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingHackathon(null)}
      />
    </div>
  );
};
