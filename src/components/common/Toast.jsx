import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

/**
 * Elegant inline toast notification adhering to the Coffee Brown & Cream palette.
 */
export const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!duration || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  const icons = {
    error: <AlertCircle size={18} className="toast-icon error" />,
    success: <CheckCircle2 size={18} className="toast-icon success" />,
    info: <Info size={18} className="toast-icon info" />
  };

  return (
    <div className={`devtrack-toast toast-${type}`} role="alert">
      <div className="toast-content">
        {icons[type] || icons.info}
        <span className="toast-message">{message}</span>
      </div>
      {onClose && (
        <button
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};
