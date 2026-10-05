import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const DisconnectConfirmModal = ({ isOpen, platformName, username, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="devtrack-modal-overlay" onClick={onCancel}>
      <div className="devtrack-modal-card modal-delete-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="warning-icon-box">
              <AlertTriangle size={20} className="warning-icon" />
            </div>
            <h3 className="modal-title">Disconnect {platformName}?</h3>
          </div>
          <button className="modal-close-btn" onClick={onCancel} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-message">
            Disconnecting <strong>{platformName}</strong> ({username}) will stop tracking live metrics for this profile.
            Your solved problem records and history in DevTrack will not be deleted.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-delete-confirm" onClick={onConfirm}>
            Disconnect Platform
          </button>
        </div>
      </div>
    </div>
  );
};
