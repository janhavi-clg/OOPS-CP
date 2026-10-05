import React, { useState } from 'react';
import {
  X,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Edit2,
  Trash2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProblemViewModal = ({
  isOpen,
  onClose,
  problem = null,
  onEdit,
  onDelete
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !problem) return null;

  const handleCopyCode = () => {
    if (problem.solution?.code) {
      navigator.clipboard.writeText(problem.solution.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDifficultyBadgeClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'badge-difficulty easy';
      case 'medium': return 'badge-difficulty medium';
      case 'hard': return 'badge-difficulty hard';
      default: return 'badge-difficulty';
    }
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onClose}>
      <div className="devtrack-modal-card modal-problem-view" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-box">
              <Code2 size={20} className="modal-icon" />
            </div>
            <div>
              <div className="view-modal-tags-row">
                <span className="skill-name-tag">{problem.skillName}</span>
                <span className="platform-tag">{problem.platform}</span>
                <span className={getDifficultyBadgeClass(problem.difficulty)}>
                  {problem.difficulty}
                </span>
              </div>
              <h3 className="modal-title view-title">{problem.title}</h3>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body modal-scrollable-body">
          {/* Metadata bar */}
          <div className="view-meta-bar">
            <div className="view-meta-item">
              <Calendar size={14} className="meta-icon" />
              <span>Solved: <strong>{problem.dateSolved || 'Recorded'}</strong></span>
            </div>
            {problem.problemUrl && (
              <div className="view-meta-item">
                <a
                  href={problem.problemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-external-link"
                >
                  <span>Open on {problem.platform}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>

          {/* Solution Code Display */}
          <div className="view-solution-container">
            <div className="code-view-header">
              <span className="code-lang-tag">
                {problem.solution?.language || 'Code'}
              </span>
              <button
                type="button"
                className="btn-copy-code"
                onClick={handleCopyCode}
                title="Copy solution code"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-success" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-display-block">
              <code>{problem.solution?.code || '// No solution code recorded.'}</code>
            </pre>
          </div>

          {/* Notes & Explanation */}
          {(problem.notes || problem.solution?.notes) && (
            <div className="view-notes-box">
              <h4 className="notes-heading">Algorithm Notes & Insights</h4>
              <p className="notes-content">
                {problem.notes || problem.solution?.notes}
              </p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="footer-left-actions">
            <button
              type="button"
              className="btn-danger-outline"
              onClick={() => {
                onClose();
                onDelete(problem);
              }}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
          <div className="footer-right-actions">
            <button
              type="button"
              className="btn-secondary-outline"
              onClick={() => {
                onClose();
                onEdit(problem);
              }}
            >
              <Edit2 size={14} />
              <span>Edit Problem</span>
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
