import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag } from 'lucide-react';

export const MilestoneModal = ({
  isOpen,
  onClose,
  onSave,
  projects,
  selectedProjectId,
  milestoneToEdit
}) => {
  const isEditing = Boolean(milestoneToEdit);

  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [completed, setCompleted] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (milestoneToEdit) {
      setProjectId(milestoneToEdit.projectId || selectedProjectId || (projects[0]?.id || ''));
      setTitle(milestoneToEdit.title || '');
      setDescription(milestoneToEdit.description || '');
      setDate(milestoneToEdit.date || '');
      setCompleted(milestoneToEdit.completed !== false);
    } else {
      setProjectId(selectedProjectId || (projects[0]?.id || ''));
      setTitle('');
      setDescription('');
      setDate('');
      setCompleted(true);
    }
    setError('');
  }, [milestoneToEdit, selectedProjectId, projects, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Milestone title is required.');
      return;
    }
    if (!projectId) {
      setError('Please select a project for this milestone.');
      return;
    }

    onSave(
      {
        projectId,
        title: title.trim(),
        description: description.trim(),
        date: date.trim(),
        completed
      },
      milestoneToEdit?.id
    );
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-text">
            <h3 className="modal-title">{isEditing ? 'Edit Milestone' : 'Add Milestone'}</h3>
            <span className="modal-subtitle">Log a developmental breakthrough or project release</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && <div className="form-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="project-modal-form">
          <div className="modal-scroll-body">
            <div className="form-field">
              <label className="form-label required">Associated Project</label>
              <select
                className="form-select"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                disabled={isEditing}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label className="form-label required">Milestone Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Architecture Complete or Beta Launch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Date / Month</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Oct 2026 or 2026-10-15"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Description / Achievements</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="What was completed in this milestone?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="checkbox-custom-label mt-2">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <span className="checkbox-custom-mark" />
              <span className="checkbox-title">Mark milestone as achieved</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Save Changes' : 'Add Milestone'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MilestoneModal;
