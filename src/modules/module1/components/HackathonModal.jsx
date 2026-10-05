import React, { useState, useEffect } from 'react';
import { X, Trophy, Globe, Calendar, Users, FileText, AlertCircle } from 'lucide-react';

const PLATFORM_OPTIONS = [
  'Unstop',
  'Devfolio',
  'SIH Portal',
  'Hack2Skill',
  'Major League Hacking (MLH)',
  'Kaggle Competitions',
  'College Innovation Cell',
  'Other Platform'
];

const STATUS_OPTIONS = [
  'Upcoming',
  'Registered',
  'Ongoing',
  'Completed',
  'Participated',
  'Won',
  'Runner-up',
  'Finalist'
];

export const HackathonModal = ({ isOpen, hackathonToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Unstop',
    customPlatform: '',
    eventUrl: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    submissionDeadline: '',
    resultDate: '',
    status: 'Upcoming',
    teamName: '',
    teamSize: 1,
    achievement: '',
    description: '',
    notes: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (hackathonToEdit) {
      const isKnown = PLATFORM_OPTIONS.includes(hackathonToEdit.platform);
      setFormData({
        name: hackathonToEdit.name || '',
        platform: isKnown ? hackathonToEdit.platform : 'Other Platform',
        customPlatform: isKnown ? '' : (hackathonToEdit.platform || ''),
        eventUrl: hackathonToEdit.eventUrl || hackathonToEdit.url || '',
        startDate: hackathonToEdit.startDate || '',
        endDate: hackathonToEdit.endDate || '',
        registrationDeadline: hackathonToEdit.registrationDeadline || '',
        submissionDeadline: hackathonToEdit.submissionDeadline || '',
        resultDate: hackathonToEdit.resultDate || '',
        status: hackathonToEdit.status || 'Upcoming',
        teamName: hackathonToEdit.teamName || '',
        teamSize: hackathonToEdit.teamSize || 1,
        achievement: hackathonToEdit.achievement || hackathonToEdit.result || '',
        description: hackathonToEdit.description || '',
        notes: hackathonToEdit.notes || ''
      });
    } else {
      // Default dates
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() + 2);

      setFormData({
        name: '',
        platform: 'Unstop',
        customPlatform: '',
        eventUrl: '',
        startDate: nextMonth.toISOString().split('T')[0],
        endDate: nextMonthEnd.toISOString().split('T')[0],
        registrationDeadline: '',
        submissionDeadline: '',
        resultDate: '',
        status: 'Upcoming',
        teamName: '',
        teamSize: 1,
        achievement: '',
        description: '',
        notes: ''
      });
    }
    setError('');
  }, [hackathonToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Hackathon Name is required.');
      return;
    }

    const finalPlatform = formData.platform === 'Other Platform' ? formData.customPlatform.trim() : formData.platform;
    if (!finalPlatform) {
      setError('Please specify a platform.');
      return;
    }

    if (formData.eventUrl && !formData.eventUrl.match(/^https?:\/\//i)) {
      setError('Hackathon URL must begin with http:// or https://');
      return;
    }

    onSave({
      ...formData,
      platform: finalPlatform,
      name: formData.name.trim(),
      eventUrl: formData.eventUrl.trim(),
      teamName: formData.teamName.trim(),
      achievement: formData.achievement.trim(),
      result: formData.achievement.trim(),
      description: formData.description.trim(),
      notes: formData.notes.trim()
    });
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onCancel}>
      <div className="devtrack-modal-card modal-hackathon" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Trophy size={18} />
            </div>
            <h3 className="modal-title">
              {hackathonToEdit ? 'Edit Hackathon Participation' : 'Add New Hackathon'}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onCancel} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body form-grid">
            {error && (
              <div className="form-inline-error">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            {/* Name and Platform */}
            <div className="form-two-col">
              <div className="form-group">
                <label htmlFor="hack-name" className="form-label">
                  Hackathon Name <span className="req">*</span>
                </label>
                <input
                  id="hack-name"
                  type="text"
                  required
                  placeholder="e.g. Hack Celestial 3.0"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hack-platform" className="form-label">
                  Hosting Platform <span className="req">*</span>
                </label>
                <select
                  id="hack-platform"
                  className="form-select"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                >
                  {PLATFORM_OPTIONS.map((plat) => (
                    <option key={plat} value={plat}>{plat}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.platform === 'Other Platform' && (
              <div className="form-group">
                <label htmlFor="hack-custom-platform" className="form-label">
                  Custom Platform Name <span className="req">*</span>
                </label>
                <input
                  id="hack-custom-platform"
                  type="text"
                  required
                  placeholder="e.g. Hack2Skill, Major League Hacking"
                  className="form-input"
                  value={formData.customPlatform}
                  onChange={(e) => setFormData({ ...formData, customPlatform: e.target.value })}
                />
              </div>
            )}

            {/* URL and Status */}
            <div className="form-two-col">
              <div className="form-group">
                <label htmlFor="hack-url" className="form-label">
                  Hackathon Link (URL)
                </label>
                <div className="input-with-icon">
                  <Globe size={16} className="field-icon" />
                  <input
                    id="hack-url"
                    type="url"
                    placeholder="https://unstop.com/hackathons/..."
                    className="form-input has-icon"
                    value={formData.eventUrl}
                    onChange={(e) => setFormData({ ...formData, eventUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hack-status" className="form-label">
                  Participation Status <span className="req">*</span>
                </label>
                <select
                  id="hack-status"
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates Row: Start Date & End Date */}
            <div className="form-two-col">
              <div className="form-group">
                <label htmlFor="hack-start" className="form-label">
                  Start Date
                </label>
                <div className="input-with-icon">
                  <Calendar size={16} className="field-icon" />
                  <input
                    id="hack-start"
                    type="date"
                    className="form-input has-icon"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hack-end" className="form-label">
                  End Date
                </label>
                <div className="input-with-icon">
                  <Calendar size={16} className="field-icon" />
                  <input
                    id="hack-end"
                    type="date"
                    className="form-input has-icon"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Additional Important Dates */}
            <div className="form-three-col">
              <div className="form-group">
                <label htmlFor="hack-reg-deadline" className="form-label">
                  Registration Deadline
                </label>
                <input
                  id="hack-reg-deadline"
                  type="date"
                  className="form-input"
                  value={formData.registrationDeadline}
                  onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hack-sub-deadline" className="form-label">
                  Submission Deadline
                </label>
                <input
                  id="hack-sub-deadline"
                  type="date"
                  className="form-input"
                  value={formData.submissionDeadline}
                  onChange={(e) => setFormData({ ...formData, submissionDeadline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hack-result-date" className="form-label">
                  Result Announcement
                </label>
                <input
                  id="hack-result-date"
                  type="date"
                  className="form-input"
                  value={formData.resultDate}
                  onChange={(e) => setFormData({ ...formData, resultDate: e.target.value })}
                />
              </div>
            </div>

            {/* Team Details & Result */}
            <div className="form-three-col">
              <div className="form-group">
                <label htmlFor="hack-team-name" className="form-label">
                  Team Name
                </label>
                <div className="input-with-icon">
                  <Users size={16} className="field-icon" />
                  <input
                    id="hack-team-name"
                    type="text"
                    placeholder="e.g. Byte Busters"
                    className="form-input has-icon"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hack-team-size" className="form-label">
                  Team Size
                </label>
                <input
                  id="hack-team-size"
                  type="number"
                  min="1"
                  max="20"
                  className="form-input"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hack-achievement" className="form-label">
                  Achievement / Outcome
                </label>
                <input
                  id="hack-achievement"
                  type="text"
                  placeholder="e.g. Top 5 Finalist, Winner, Participant"
                  className="form-input"
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                />
              </div>
            </div>

            {/* Description & Notes */}
            <div className="form-group">
              <label htmlFor="hack-desc" className="form-label">
                Project / Solution Description
              </label>
              <textarea
                id="hack-desc"
                rows={2}
                placeholder="Brief summary of what you built or plan to develop during this hackathon..."
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hack-notes" className="form-label">
                Jury Notes / Experience / Key Takeaways
              </label>
              <input
                id="hack-notes"
                type="text"
                placeholder="e.g. Received praise for clean architecture; won ₹25,000 track award"
                className="form-input"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-action">
              {hackathonToEdit ? 'Save Changes' : 'Add Hackathon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
