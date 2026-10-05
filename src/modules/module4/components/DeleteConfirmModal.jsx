import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  projectName
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container modal-sm confirm-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-box">
          <AlertTriangle size={28} />
        </div>

        <div className="confirm-body">
          <h3 className="confirm-title">Delete Project?</h3>
          <p className="confirm-message">
            Are you sure you want to delete <strong>"{projectName}"</strong>?
          </p>
          <p className="confirm-warning">
            This will permanently remove this project, its case study narrative, technical highlights,
            and associated development milestones. This action cannot be undone.
          </p>
        </div>

        <div className="confirm-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            <Trash2 size={15} /> Yes, Delete Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
