import React, { useState, useEffect } from 'react';
import { X, Upload, Award, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { module5Service } from '../module5Service';

export const CertificateModal = ({
  isOpen,
  onClose,
  certificateToEdit,
  onSave
}) => {
  const [formData, setFormData] = useState({
    certificateName: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    fileDataOrUrl: '',
    fileType: 'PDF',
    relatedSkill: '',
    description: ''
  });
  const [fileError, setFileError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (certificateToEdit) {
      setFormData({
        ...certificateToEdit,
        expiryDate: certificateToEdit.expiryDate || '',
        credentialId: certificateToEdit.credentialId || '',
        credentialUrl: certificateToEdit.credentialUrl || '',
        fileDataOrUrl: certificateToEdit.fileDataOrUrl || '',
        fileType: certificateToEdit.fileType || 'PDF',
        relatedSkill: certificateToEdit.relatedSkill || '',
        description: certificateToEdit.description || ''
      });
    } else {
      setFormData({
        certificateName: '',
        issuingOrganization: '',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        fileDataOrUrl: '',
        fileType: 'PDF',
        relatedSkill: 'Python',
        description: ''
      });
    }
    setFileError('');
  }, [certificateToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = module5Service.validateFile(file);
    if (!validation.valid) {
      setFileError(validation.error);
      return;
    }

    setFileError('');
    setIsUploading(true);
    try {
      const dataUrl = await module5Service.readFileAsDataURL(file);
      const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
      setFormData(prev => ({
        ...prev,
        fileDataOrUrl: dataUrl,
        fileType: ext
      }));
    } catch (err) {
      setFileError('Failed to read file: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.certificateName.trim()) {
      setFileError('Certificate name is required.');
      return;
    }
    if (!formData.issuingOrganization.trim()) {
      setFileError('Issuing organization is required.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="devtrack-modal-backdrop" onClick={onClose}>
      <div className="devtrack-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <Award size={22} className="modal-title-icon" />
            <div>
              <h3>{certificateToEdit ? 'Edit Certificate' : 'Add New Certificate'}</h3>
              <p className="modal-subtitle">Store credentials and official verification records</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          {fileError && (
            <div className="form-error-banner">
              <AlertCircle size={16} />
              <span>{fileError}</span>
            </div>
          )}

          <div className="form-grid-2">
            <div className="form-group">
              <label>Certificate Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Python for Data Science & AI"
                value={formData.certificateName}
                onChange={e => setFormData({ ...formData, certificateName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Issuing Organization *</label>
              <input
                type="text"
                required
                placeholder="e.g. Coursera (IBM), Oracle, HackerRank"
                value={formData.issuingOrganization}
                onChange={e => setFormData({ ...formData, issuingOrganization: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Issue Date *</label>
              <input
                type="date"
                required
                value={formData.issueDate}
                onChange={e => setFormData({ ...formData, issueDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Expiry Date (Optional)</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Related Skill *</label>
              <input
                type="text"
                placeholder="e.g. Python, Java, SQL"
                value={formData.relatedSkill}
                onChange={e => setFormData({ ...formData, relatedSkill: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Credential ID</label>
              <input
                type="text"
                placeholder="e.g. IBM-PY-884920"
                value={formData.credentialId}
                onChange={e => setFormData({ ...formData, credentialId: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Credential Verification URL</label>
              <input
                type="url"
                placeholder="https://coursera.org/verify/..."
                value={formData.credentialUrl}
                onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Certificate File / Image (PDF, JPG, PNG, WEBP &lt; 5MB)</label>
            <div className="file-upload-zone">
              <input
                type="file"
                id="cert-file-input"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
                className="file-hidden-input"
              />
              <label htmlFor="cert-file-input" className="file-upload-label">
                <Upload size={20} />
                <span>
                  {isUploading
                    ? 'Processing file...'
                    : formData.fileDataOrUrl
                    ? `File Attached (${formData.fileType}) - Click to change`
                    : 'Choose File or Drag & Drop here'}
                </span>
                <span className="file-hint">PDF, PNG, JPG, WEBP (Max 5MB)</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Description & Learning Highlights</label>
            <textarea
              rows={3}
              placeholder="What core topics or skills did this certification validate?"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="modal-actions-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {certificateToEdit ? 'Save Changes' : 'Add Certificate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
