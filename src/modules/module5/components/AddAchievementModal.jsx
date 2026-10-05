import React, { useState, useEffect } from 'react';
import { X, Trophy, Layers, Upload, AlertCircle, Plus } from 'lucide-react';
import { module5Service } from '../module5Service';

export const AddAchievementModal = ({
  isOpen,
  onClose,
  achievementToEdit,
  availableCategories,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    achievementCategory: 'Hackathon Achievement',
    customCategory: '',
    organization: '',
    platform: 'Devfolio',
    hackathonUrl: '',
    startDate: '',
    endDate: '',
    achievementDate: '',
    participationStatus: 'Winner',
    positionAward: '',
    teamName: '',
    teamMembers: '',
    role: '',
    description: '',
    proofUrl: '',
    relatedSkills: 'Python, PyTorch'
  });
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const platforms = ['Devfolio', 'Unstop', 'MLH', 'College Event', 'Other'];
  const statuses = ['Winner', 'Runner-up', 'Top 10', 'Finalist', 'Special Mention', 'Participated', 'Other'];

  useEffect(() => {
    if (achievementToEdit) {
      setFormData({
        ...achievementToEdit,
        customCategory: '',
        platform: achievementToEdit.platform || 'Devfolio',
        hackathonUrl: achievementToEdit.hackathonUrl || '',
        startDate: achievementToEdit.startDate || '',
        endDate: achievementToEdit.endDate || '',
        achievementDate: achievementToEdit.achievementDate || '',
        participationStatus: achievementToEdit.participationStatus || 'Winner',
        positionAward: achievementToEdit.positionAward || '',
        teamName: achievementToEdit.teamName || '',
        teamMembers: achievementToEdit.teamMembers || '',
        role: achievementToEdit.role || '',
        description: achievementToEdit.description || '',
        proofUrl: achievementToEdit.proofUrl || '',
        relatedSkills: Array.isArray(achievementToEdit.relatedSkills)
          ? achievementToEdit.relatedSkills.join(', ')
          : (achievementToEdit.relatedSkills || '')
      });
    } else {
      setFormData({
        title: '',
        achievementCategory: 'Hackathon Achievement',
        customCategory: '',
        organization: 'Devfolio / National Level',
        platform: 'Devfolio',
        hackathonUrl: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        achievementDate: new Date().toISOString().split('T')[0],
        participationStatus: 'Winner',
        positionAward: '1st Place Winner',
        teamName: '',
        teamMembers: '',
        role: 'Team Lead',
        description: '',
        proofUrl: '',
        relatedSkills: 'Python, Machine Learning'
      });
    }
    setError('');
  }, [achievementToEdit, isOpen]);

  if (!isOpen) return null;

  const isHackathon = formData.achievementCategory === 'Hackathon Achievement';

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = module5Service.validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError('');
    setIsUploading(true);
    try {
      const dataUrl = await module5Service.readFileAsDataURL(file);
      setFormData(prev => ({ ...prev, proofUrl: dataUrl }));
    } catch (err) {
      setError('Failed to upload proof document: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }

    const finalCategory =
      formData.achievementCategory === 'Custom'
        ? formData.customCategory.trim()
        : formData.achievementCategory;

    if (!finalCategory) {
      setError('Please specify an achievement category.');
      return;
    }

    const skillsArray = typeof formData.relatedSkills === 'string'
      ? formData.relatedSkills.split(',').map(s => s.trim()).filter(Boolean)
      : formData.relatedSkills;

    const payload = {
      ...formData,
      achievementCategory: finalCategory,
      relatedSkills: skillsArray
    };

    onSave(payload);
  };

  return (
    <div className="devtrack-modal-backdrop" onClick={onClose}>
      <div className="devtrack-modal-card large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <Trophy size={22} className="modal-title-icon" />
            <div>
              <h3>{achievementToEdit ? 'Edit Achievement' : '+ Add Achievement'}</h3>
              <p className="modal-subtitle">Record competitive awards, hackathons, and milestones</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          {error && (
            <div className="form-error-banner">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-grid-2">
            <div className="form-group">
              <label>Achievement Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Winner - Hack Celestial 3.0"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Achievement Category *</label>
              <select
                value={formData.achievementCategory}
                onChange={e => setFormData({ ...formData, achievementCategory: e.target.value })}
              >
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="Custom">+ Add Custom Category</option>
              </select>
            </div>
          </div>

          {formData.achievementCategory === 'Custom' && (
            <div className="form-group">
              <label>New Custom Category Name *</label>
              <input
                type="text"
                placeholder="Enter custom category (e.g. Research Fellowship)"
                value={formData.customCategory}
                onChange={e => setFormData({ ...formData, customCategory: e.target.value })}
              />
            </div>
          )}

          <div className="form-grid-3">
            <div className="form-group">
              <label>Organization / Host *</label>
              <input
                type="text"
                required
                placeholder="e.g. Devfolio, PICT, Ministry of Edu"
                value={formData.organization}
                onChange={e => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Platform</label>
              <select
                value={formData.platform}
                onChange={e => setFormData({ ...formData, platform: e.target.value })}
              >
                {platforms.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status / Outcome</label>
              <select
                value={formData.participationStatus}
                onChange={e => setFormData({ ...formData, participationStatus: e.target.value })}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Achievement / Event Date</label>
              <input
                type="date"
                value={formData.achievementDate}
                onChange={e => setFormData({ ...formData, achievementDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Position / Award Name</label>
              <input
                type="text"
                placeholder="e.g. 1st Place, Best IoT Project"
                value={formData.positionAward}
                onChange={e => setFormData({ ...formData, positionAward: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Your Role</label>
              <input
                type="text"
                placeholder="e.g. Team Lead & ML Developer"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Team Name (if applicable)</label>
              <input
                type="text"
                placeholder="e.g. Byte Busters"
                value={formData.teamName}
                onChange={e => setFormData({ ...formData, teamName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Team Members</label>
              <input
                type="text"
                placeholder="e.g. Rahul, Amit, Sneha"
                value={formData.teamMembers}
                onChange={e => setFormData({ ...formData, teamMembers: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Hackathon / Event URL (Optional)</label>
              <input
                type="url"
                placeholder="https://hackcelestial.devfolio.co"
                value={formData.hackathonUrl}
                onChange={e => setFormData({ ...formData, hackathonUrl: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Related Skills (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Python, PyTorch, C++, IoT"
                value={formData.relatedSkills}
                onChange={e => setFormData({ ...formData, relatedSkills: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Certificate / Proof Document (PDF, Image &lt; 5MB)</label>
            <div className="file-upload-zone">
              <input
                type="file"
                id="ach-proof-input"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={handleFileUpload}
                className="file-hidden-input"
              />
              <label htmlFor="ach-proof-input" className="file-upload-label">
                <Upload size={20} />
                <span>
                  {isUploading
                    ? 'Attaching proof...'
                    : formData.proofUrl
                    ? 'Proof Document Attached - Click to replace'
                    : 'Upload Certificate, Scorecard, or Acceptance Letter'}
                </span>
                <span className="file-hint">PDF, PNG, JPG (Max 5MB)</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Description & Contribution</label>
            <textarea
              rows={3}
              placeholder="Describe your project, key problems solved, and final result..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="modal-actions-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {achievementToEdit ? 'Save Changes' : '+ Add Achievement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
