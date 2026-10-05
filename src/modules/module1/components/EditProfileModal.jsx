import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2, User, Building2, BookOpen, Mail, Phone, FileText, AlertCircle, Camera } from 'lucide-react';

export const EditProfileModal = ({ isOpen, profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    year: 'Second Year',
    branch: 'CSE (AI/ML)',
    email: '',
    phone: '',
    bio: '',
    developerStatus: '',
    avatarUrl: null
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        college: profile.college || '',
        year: profile.year || 'Second Year',
        branch: profile.branch || 'CSE (AI/ML)',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        developerStatus: profile.developerStatus || 'Second-Year AI/ML Undergrad',
        avatarUrl: profile.avatarUrl || null
      });
      setAvatarPreview(profile.avatarUrl || null);
    }
    setError('');
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size exceeds 2MB limit. Please choose a smaller image.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setAvatarPreview(dataUrl);
      setFormData((prev) => ({ ...prev, avatarUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    setFormData((prev) => ({ ...prev, avatarUrl: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Student Name is required.');
      return;
    }
    if (!formData.college.trim()) {
      setError('College Name is required.');
      return;
    }
    if (formData.email && !formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onCancel}>
      <div className="devtrack-modal-card modal-profile-edit" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <User size={18} />
            </div>
            <h3 className="modal-title">Edit Student Profile</h3>
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

            {/* Profile Avatar Editor */}
            <div className="avatar-edit-box">
              <div className="avatar-preview-wrapper">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="avatar-image-preview" />
                ) : (
                  <div className="avatar-monogram-placeholder">
                    <span>{(formData.name || 'R').charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="avatar-change-overlay"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload or change profile photo"
                >
                  <Camera size={18} />
                </button>
              </div>

              <div className="avatar-actions-meta">
                <span className="avatar-meta-title">Profile Photo</span>
                <span className="avatar-meta-sub">Supports PNG, JPG, or SVG under 2MB</span>
                <div className="avatar-btn-row">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-upload-avatar"
                  >
                    <Upload size={13} />
                    <span>Upload Image</span>
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="btn-remove-avatar"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="form-two-col">
              <div className="form-group">
                <label htmlFor="prof-name" className="form-label">
                  Student Name <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="field-icon" />
                  <input
                    id="prof-name"
                    type="text"
                    required
                    className="form-input has-icon"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="prof-college" className="form-label">
                  College / Institute <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <Building2 size={16} className="field-icon" />
                  <input
                    id="prof-college"
                    type="text"
                    required
                    className="form-input has-icon"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-two-col">
              <div className="form-group">
                <label htmlFor="prof-year" className="form-label">
                  Academic Year <span className="req">*</span>
                </label>
                <select
                  id="prof-year"
                  className="form-select"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prof-branch" className="form-label">
                  Branch / Specialization <span className="req">*</span>
                </label>
                <input
                  id="prof-branch"
                  type="text"
                  required
                  placeholder="e.g. CSE (AI/ML)"
                  className="form-input"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                />
              </div>
            </div>

            <div className="form-two-col">
              <div className="form-group">
                <label htmlFor="prof-email" className="form-label">
                  Email Address
                </label>
                <div className="input-with-icon">
                  <Mail size={16} className="field-icon" />
                  <input
                    id="prof-email"
                    type="email"
                    className="form-input has-icon"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="prof-phone" className="form-label">
                  Contact Phone
                </label>
                <div className="input-with-icon">
                  <Phone size={16} className="field-icon" />
                  <input
                    id="prof-phone"
                    type="text"
                    className="form-input has-icon"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="prof-status" className="form-label">
                Developer Headline / Status
              </label>
              <input
                id="prof-status"
                type="text"
                placeholder="e.g. Full-Stack Undergrad | Competitive Coder"
                className="form-input"
                value={formData.developerStatus}
                onChange={(e) => setFormData({ ...formData, developerStatus: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="prof-bio" className="form-label">
                Bio / Technical Statement
              </label>
              <textarea
                id="prof-bio"
                rows={3}
                placeholder="Write a concise overview of your technical interests and engineering goals..."
                className="form-textarea"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-action">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
