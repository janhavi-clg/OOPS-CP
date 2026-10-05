import React, { useState, useEffect } from 'react';
import { X, Globe, Link2, User, AlertCircle } from 'lucide-react';

const COMMON_PLATFORMS = [
  'GitHub',
  'LinkedIn',
  'LeetCode',
  'CodeChef',
  'HackerRank',
  'GeeksforGeeks',
  'Kaggle',
  'Codeforces',
  'Portfolio Website',
  'Devpost',
  'Other Custom Platform'
];

export const DeveloperLinkModal = ({ isOpen, linkToEdit, onSave, onCancel }) => {
  const [platform, setPlatform] = useState('');
  const [customPlatform, setCustomPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (linkToEdit) {
      if (COMMON_PLATFORMS.includes(linkToEdit.platform)) {
        setPlatform(linkToEdit.platform);
        setCustomPlatform('');
      } else {
        setPlatform('Other Custom Platform');
        setCustomPlatform(linkToEdit.platform || '');
      }
      setUrl(linkToEdit.url || '');
      setUsername(linkToEdit.username || '');
    } else {
      setPlatform('GitHub');
      setCustomPlatform('');
      setUrl('');
      setUsername('');
    }
    setError('');
  }, [linkToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const finalPlatform = platform === 'Other Custom Platform' ? customPlatform.trim() : platform;
    if (!finalPlatform) {
      setError('Please provide a platform name.');
      return;
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please provide the profile or repository URL.');
      return;
    }

    if (!trimmedUrl.match(/^https?:\/\//i)) {
      setError('URL must start with http:// or https://');
      return;
    }

    onSave({
      platform: finalPlatform,
      url: trimmedUrl,
      username: username.trim(),
      isCustom: platform === 'Other Custom Platform' || !COMMON_PLATFORMS.includes(finalPlatform)
    });
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onCancel}>
      <div className="devtrack-modal-card modal-dev-link" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Link2 size={18} />
            </div>
            <h3 className="modal-title">
              {linkToEdit ? 'Edit Developer Link' : 'Add Developer Link'}
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

            <div className="form-group">
              <label htmlFor="link-platform" className="form-label">
                Platform <span className="req">*</span>
              </label>
              <select
                id="link-platform"
                className="form-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                {COMMON_PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {platform === 'Other Custom Platform' && (
              <div className="form-group">
                <label htmlFor="custom-platform" className="form-label">
                  Custom Platform Name <span className="req">*</span>
                </label>
                <input
                  id="custom-platform"
                  type="text"
                  required
                  placeholder="e.g. Behance, Dribbble, Substack"
                  className="form-input"
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="link-url" className="form-label">
                Profile / Website URL <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <Globe size={16} className="field-icon" />
                <input
                  id="link-url"
                  type="url"
                  required
                  placeholder="https://github.com/your-username"
                  className="form-input has-icon"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="link-username" className="form-label">
                Username (Optional)
              </label>
              <div className="input-with-icon">
                <User size={16} className="field-icon" />
                <input
                  id="link-username"
                  type="text"
                  placeholder="e.g. rahul_codes"
                  className="form-input has-icon"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-action">
              {linkToEdit ? 'Save Changes' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
