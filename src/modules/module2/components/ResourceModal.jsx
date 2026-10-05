import React, { useState } from 'react';
import { X, Plus, BookOpen, ExternalLink } from 'lucide-react';

const PLATFORM_OPTIONS = [
  'YouTube',
  'Coursera',
  'Udemy',
  'Official Docs',
  'LeetCode',
  'GeeksforGeeks',
  'FreeCodeCamp',
  'Medium',
  'edX',
  'Other'
];

const TYPE_OPTIONS = [
  'Video',
  'Playlist',
  'Course',
  'Documentation',
  'Article',
  'Tutorial',
  'Other'
];

export const ResourceModal = ({
  isOpen,
  onClose,
  skills = [],
  defaultSkillId = null,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [skillId, setSkillId] = useState(defaultSkillId || (skills[0]?.id || ''));
  const [platform, setPlatform] = useState('YouTube');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('Video');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Resource title is required.');
      return;
    }
    if (!skillId) {
      setErrorMsg('Please select a skill for this resource.');
      return;
    }

    if (url.trim()) {
      const lower = url.trim().toLowerCase();
      if (!lower.startsWith('http://') && !lower.startsWith('https://')) {
        setErrorMsg('URL must start with http:// or https://');
        return;
      }
    }

    const selectedSkill = skills.find((s) => s.id === skillId);

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await onSave({
        title: title.trim(),
        skillId,
        skillName: selectedSkill ? selectedSkill.name : 'Skill',
        platform,
        url: url.trim(),
        type,
        description: description.trim(),
        completed
      });
      // Reset form
      setTitle('');
      setUrl('');
      setDescription('');
      setCompleted(false);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save learning resource.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onClose}>
      <div className="devtrack-modal-card modal-resource" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-box">
              <BookOpen size={20} className="modal-icon" />
            </div>
            <div>
              <h3 className="modal-title">Add Learning Resource</h3>
              <p className="modal-subtitle">Save courses, videos, and documentation for your skills.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="form-error-banner">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="resource-form">
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="res-title">
                Resource Title <span className="req">*</span>
              </label>
              <input
                id="res-title"
                type="text"
                className="form-input"
                placeholder="e.g., Python OOP Tutorial or CS50 Lecture 3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="res-skill">
                  Associated Skill <span className="req">*</span>
                </label>
                <select
                  id="res-skill"
                  className="form-select"
                  value={skillId}
                  onChange={(e) => setSkillId(e.target.value)}
                  required
                >
                  {skills.length === 0 ? (
                    <option value="">No skills available (Add a skill first)</option>
                  ) : (
                    skills.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="res-platform">
                  Platform
                </label>
                <select
                  id="res-platform"
                  className="form-select"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  {PLATFORM_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="res-type">
                  Resource Type
                </label>
                <select
                  id="res-type"
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="res-url">
                  Resource URL
                </label>
                <input
                  id="res-url"
                  type="url"
                  className="form-input"
                  placeholder="https://youtube.com/watch?v=... or documentation URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="res-desc">
                Short Description / Key Topics
              </label>
              <textarea
                id="res-desc"
                className="form-textarea"
                rows={2}
                placeholder="Key takeaways, chapters covered, or notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-checkbox-row">
              <label className="checkbox-label" htmlFor="res-completed">
                <input
                  id="res-completed"
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                <span>Mark as already completed</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !title.trim() || !skillId}
            >
              <Plus size={16} />
              <span>{isSubmitting ? 'Saving...' : 'Add Learning Resource'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
