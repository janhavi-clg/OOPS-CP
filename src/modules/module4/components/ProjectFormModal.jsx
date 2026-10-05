import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Link as LinkIcon,
  GitBranch,
  Award
} from 'lucide-react';
import { module4Service } from '../module4Service';

export const ProjectFormModal = ({
  isOpen,
  onClose,
  onSave,
  projectToEdit
}) => {
  const isEditing = Boolean(projectToEdit);

  // Form State
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [solutionOverview, setSolutionOverview] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [customCategory, setCustomCategory] = useState('');
  const [status, setStatus] = useState('IN_PROGRESS');
  const [progressPercentage, setProgressPercentage] = useState(50);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [featured, setFeatured] = useState(false);

  // Contribution
  const [role, setRole] = useState('Full Stack Developer');
  const [customRole, setCustomRole] = useState('');
  const [contributionDetails, setContributionDetails] = useState('');
  const [teamSize, setTeamSize] = useState(1);

  // Dynamic Lists
  const [technologies, setTechnologies] = useState([]);
  const [customTechInput, setCustomTechInput] = useState('');
  const [keyFeatures, setKeyFeatures] = useState(['']);
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [docsUrl, setDocsUrl] = useState('');

  // Achievements
  const [achievements, setAchievements] = useState([]);
  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchAward, setNewAchAward] = useState('Hackathon Finalist');
  const [newAchOrg, setNewAchOrg] = useState('');
  const [newAchDate, setNewAchDate] = useState('');

  // Validation
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categories = module4Service.getCategories();
  const popularTechs = module4Service.getPopularTechnologies();
  const standardRoles = module4Service.getStandardRoles();
  const achievementTypes = module4Service.getAchievementTypes();

  useEffect(() => {
    if (projectToEdit) {
      setName(projectToEdit.name || '');
      setShortDescription(projectToEdit.shortDescription || '');
      setDetailedDescription(projectToEdit.detailedDescription || '');
      setProblemStatement(projectToEdit.problemStatement || '');
      setSolutionOverview(projectToEdit.solutionOverview || '');

      if (categories.includes(projectToEdit.category)) {
        setCategory(projectToEdit.category);
        setCustomCategory('');
      } else {
        setCategory('Other');
        setCustomCategory(projectToEdit.category || '');
      }

      setStatus(projectToEdit.status || 'IN_PROGRESS');
      setProgressPercentage(projectToEdit.progressPercentage || 0);
      setStartDate(projectToEdit.startDate || '');
      setEndDate(projectToEdit.endDate || '');
      setImageUrl(projectToEdit.imageUrl || '');
      setImagePreview(projectToEdit.imageUrl || '');
      setFeatured(Boolean(projectToEdit.featured));

      // Contribution
      if (standardRoles.includes(projectToEdit.contribution?.role)) {
        setRole(projectToEdit.contribution?.role);
        setCustomRole('');
      } else {
        setRole('Custom');
        setCustomRole(projectToEdit.contribution?.role || '');
      }
      setContributionDetails(projectToEdit.contribution?.contributionDetails || '');
      setTeamSize(projectToEdit.contribution?.teamSize || 1);

      // Techs
      setTechnologies(
        (projectToEdit.technologies || []).map((t) => (typeof t === 'string' ? t : t.name))
      );

      // Links
      const gh = projectToEdit.links?.find((l) => l.type === 'GITHUB');
      const dm = projectToEdit.links?.find((l) => l.type === 'LIVE_DEMO');
      const dc = projectToEdit.links?.find((l) => l.type === 'DOCUMENTATION');
      setGithubUrl(gh ? gh.url : '');
      setDemoUrl(dm ? dm.url : '');
      setDocsUrl(dc ? dc.url : '');

      // Key Features
      setKeyFeatures(
        projectToEdit.keyFeatures && projectToEdit.keyFeatures.length > 0
          ? projectToEdit.keyFeatures
          : ['']
      );

      // Achievements
      setAchievements(projectToEdit.achievements || []);
    } else {
      // Reset form
      setName('');
      setShortDescription('');
      setDetailedDescription('');
      setProblemStatement('');
      setSolutionOverview('');
      setCategory('Web Development');
      setCustomCategory('');
      setStatus('IN_PROGRESS');
      setProgressPercentage(50);
      setStartDate('');
      setEndDate('');
      setImageUrl('');
      setImagePreview('');
      setFeatured(false);
      setRole('Full Stack Developer');
      setCustomRole('');
      setContributionDetails('');
      setTeamSize(1);
      setTechnologies(['Java', 'React']);
      setCustomTechInput('');
      setKeyFeatures(['']);
      setGithubUrl('');
      setDemoUrl('');
      setDocsUrl('');
      setAchievements([]);
    }
    setErrors({});
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  // Image Upload handler
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await module4Service.processImageUpload(file);
      setImageUrl(dataUrl);
      setImagePreview(dataUrl);
      setErrors((prev) => ({ ...prev, image: null }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, image: err.message }));
    }
  };

  // Tech toggles
  const handleToggleTech = (techName) => {
    if (technologies.includes(techName)) {
      setTechnologies(technologies.filter((t) => t !== techName));
    } else {
      setTechnologies([...technologies, techName]);
    }
  };

  const handleAddCustomTech = (e) => {
    e.preventDefault();
    if (!customTechInput.trim()) return;
    const clean = customTechInput.trim();
    if (!technologies.includes(clean)) {
      setTechnologies([...technologies, clean]);
    }
    setCustomTechInput('');
  };

  // Features list
  const handleFeatureChange = (index, value) => {
    const updated = [...keyFeatures];
    updated[index] = value;
    setKeyFeatures(updated);
  };

  const handleAddFeatureField = () => {
    setKeyFeatures([...keyFeatures, '']);
  };

  const handleRemoveFeatureField = (index) => {
    const updated = keyFeatures.filter((_, i) => i !== index);
    setKeyFeatures(updated.length > 0 ? updated : ['']);
  };

  // Achievement add
  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!newAchTitle.trim()) return;

    const newAch = {
      id: 'ach_' + Math.random().toString(36).substring(2, 8),
      title: newAchTitle.trim(),
      awardType: newAchAward,
      organization: newAchOrg.trim(),
      date: newAchDate
    };
    setAchievements([...achievements, newAch]);
    setNewAchTitle('');
    setNewAchOrg('');
    setNewAchDate('');
  };

  const handleRemoveAchievement = (achId) => {
    setAchievements(achievements.filter((a) => a.id !== achId));
  };

  // Submission validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Project name is required.';
    }
    if (!shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required for cards.';
    }
    if (category === 'Other' && !customCategory.trim()) {
      newErrors.category = 'Please enter a custom category.';
    }
    if (role === 'Custom' && !customRole.trim()) {
      newErrors.role = 'Please specify your role.';
    }
    if (teamSize < 1) {
      newErrors.teamSize = 'Team size must be at least 1.';
    }

    // URL validation
    const validateUrl = (url, fieldName) => {
      if (url && url.trim()) {
        const str = url.trim();
        if (!str.startsWith('http://') && !str.startsWith('https://')) {
          newErrors[fieldName] = 'URL must start with http:// or https://';
        }
      }
    };
    validateUrl(githubUrl, 'githubUrl');
    validateUrl(demoUrl, 'demoUrl');
    validateUrl(docsUrl, 'docsUrl');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    const effectiveCategory = category === 'Other' ? customCategory.trim() : category;
    const effectiveRole = role === 'Custom' ? customRole.trim() : role;

    const links = [];
    if (githubUrl.trim()) {
      links.push({ type: 'GITHUB', url: githubUrl.trim(), label: 'Repository' });
    }
    if (demoUrl.trim()) {
      links.push({ type: 'LIVE_DEMO', url: demoUrl.trim(), label: 'Live Demo' });
    }
    if (docsUrl.trim()) {
      links.push({ type: 'DOCUMENTATION', url: docsUrl.trim(), label: 'Documentation' });
    }

    const payload = {
      name: name.trim(),
      shortDescription: shortDescription.trim(),
      detailedDescription: detailedDescription.trim(),
      problemStatement: problemStatement.trim(),
      solutionOverview: solutionOverview.trim(),
      category: effectiveCategory,
      status,
      progressPercentage: status === 'COMPLETED' ? 100 : Number(progressPercentage),
      startDate: startDate.trim(),
      endDate: status === 'COMPLETED' ? (endDate.trim() || 'Completed') : (endDate.trim() || 'Present'),
      imageUrl: imageUrl.trim(),
      featured,
      contribution: {
        role: effectiveRole,
        contributionDetails: contributionDetails.trim(),
        teamSize: Number(teamSize)
      },
      technologies: technologies.map((t) => ({ name: t, category: 'General', primary: false })),
      links,
      keyFeatures: keyFeatures.filter((f) => f && f.trim()),
      achievements
    };

    try {
      await onSave(payload, projectToEdit?.id);
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Failed to save project.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container project-form-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-text">
            <h3 className="modal-title">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
            <span className="modal-subtitle">
              Maintain an interview-ready case study for your technical portfolio
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {errors.form && (
          <div className="form-error-banner">
            <AlertCircle size={16} />
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="project-modal-form">
          <div className="modal-scroll-body">
            {/* Section 1: Basic Info */}
            <div className="form-section-title">1. Project Overview</div>

            <div className="form-row two-cols">
              <div className="form-field">
                <label className="form-label required">Project Name</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. DevTrack or Smart Fitness"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="field-error-text">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label className="form-label required">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {category === 'Other' && (
                  <input
                    type="text"
                    className="form-input mt-2"
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                  />
                )}
                {errors.category && <span className="field-error-text">{errors.category}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label required">Short Description (for cards)</label>
              <textarea
                className={`form-textarea short-desc ${errors.shortDescription ? 'input-error' : ''}`}
                rows={2}
                placeholder="Concise 1-2 sentence overview of your project..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
              {errors.shortDescription && (
                <span className="field-error-text">{errors.shortDescription}</span>
              )}
            </div>

            {/* Section 2: Status, Timeline, Progress */}
            <div className="form-section-title">2. Status & Timeline</div>

            <div className="form-row three-cols">
              <div className="form-field">
                <label className="form-label">Project Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => {
                    const next = e.target.value;
                    setStatus(next);
                    if (next === 'COMPLETED') setProgressPercentage(100);
                  }}
                >
                  <option value="PLANNING">Planning</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="PAUSED">Paused</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Oct 2025 or 2025-10"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">End Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={status === 'COMPLETED' ? 'e.g. Jan 2026' : 'Present'}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {status !== 'COMPLETED' && (
              <div className="form-field">
                <div className="slider-label-row">
                  <label className="form-label">Current Progress ({progressPercentage}%)</label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  className="form-slider"
                  value={progressPercentage}
                  onChange={(e) => setProgressPercentage(Number(e.target.value))}
                />
              </div>
            )}

            {/* Section 3: Tech Stack */}
            <div className="form-section-title">3. Technologies Used</div>

            <div className="tech-selection-box">
              <div className="popular-tech-chips">
                {popularTechs.map((pt) => {
                  const selected = technologies.includes(pt.name);
                  return (
                    <button
                      key={pt.name}
                      type="button"
                      className={`tech-toggle-chip ${selected ? 'selected' : ''}`}
                      onClick={() => handleToggleTech(pt.name)}
                    >
                      {selected && <Check size={12} className="mr-1" />}
                      {pt.name}
                    </button>
                  );
                })}
              </div>

              <div className="custom-tech-input-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add custom technology / library..."
                  value={customTechInput}
                  onChange={(e) => setCustomTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomTech(e);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleAddCustomTech}
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              {technologies.length > 0 && (
                <div className="selected-tech-summary">
                  <span className="selected-caption">Selected ({technologies.length}):</span>
                  {technologies.map((t) => (
                    <span key={t} className="active-tech-pill">
                      {t}
                      <button
                        type="button"
                        onClick={() => handleToggleTech(t)}
                        className="remove-tech-cross"
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Section 4: Role, Contribution & Team */}
            <div className="form-section-title">4. Team & Contribution</div>

            <div className="form-row two-cols">
              <div className="form-field">
                <label className="form-label">Your Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {standardRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                  <option value="Custom">Custom Role...</option>
                </select>
                {role === 'Custom' && (
                  <input
                    type="text"
                    className="form-input mt-2"
                    placeholder="Enter custom role"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                )}
                {errors.role && <span className="field-error-text">{errors.role}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Team Size</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  className="form-input"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value, 10) || 1))}
                />
                <span className="field-hint">1 = Solo project</span>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Specific Contribution Details</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="What did you personally build, architect, or solve in this project? (Crucial for resumes & interviews)"
                value={contributionDetails}
                onChange={(e) => setContributionDetails(e.target.value)}
              />
            </div>

            {/* Section 5: Problem & Solution (Case Study) */}
            <div className="form-section-title">5. Case Study Narrative</div>

            <div className="form-row two-cols">
              <div className="form-field">
                <label className="form-label">The Problem Statement</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="What user pain point, technical bottleneck, or domain challenge did this address?"
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">The Solution Overview</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="How does your architecture or software solve that problem effectively?"
                  value={solutionOverview}
                  onChange={(e) => setSolutionOverview(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Detailed Description / Architecture</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Deep dive into system components, algorithms, database schema, or APIs..."
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
              />
            </div>

            {/* Section 6: Key Features Checklist */}
            <div className="form-section-title">6. Key Features</div>

            <div className="features-builder">
              {keyFeatures.map((feat, idx) => (
                <div key={idx} className="feature-input-row">
                  <input
                    type="text"
                    className="form-input"
                    placeholder={`Feature #${idx + 1} (e.g. Real-time WebGL rendering)`}
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    className="icon-action-btn danger"
                    onClick={() => handleRemoveFeatureField(idx)}
                    title="Remove Feature"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={handleAddFeatureField}
              >
                <Plus size={14} /> Add Feature
              </button>
            </div>

            {/* Section 7: External Links */}
            <div className="form-section-title">7. Project Links</div>

            <div className="form-row three-cols">
              <div className="form-field">
                <label className="form-label">GitHub Repository</label>
                <input
                  type="url"
                  className={`form-input ${errors.githubUrl ? 'input-error' : ''}`}
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
                {errors.githubUrl && (
                  <span className="field-error-text">{errors.githubUrl}</span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label">Live Demo URL</label>
                <input
                  type="url"
                  className={`form-input ${errors.demoUrl ? 'input-error' : ''}`}
                  placeholder="https://..."
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                />
                {errors.demoUrl && <span className="field-error-text">{errors.demoUrl}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Documentation URL</label>
                <input
                  type="url"
                  className={`form-input ${errors.docsUrl ? 'input-error' : ''}`}
                  placeholder="https://..."
                  value={docsUrl}
                  onChange={(e) => setDocsUrl(e.target.value)}
                />
                {errors.docsUrl && <span className="field-error-text">{errors.docsUrl}</span>}
              </div>
            </div>

            {/* Section 8: Image / Thumbnail */}
            <div className="form-section-title">8. Project Image / Thumbnail</div>

            <div className="image-upload-wrapper">
              <div className="image-preview-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="preview-img" />
                ) : (
                  <div className="preview-empty">
                    <ImageIcon size={32} />
                    <span>No image uploaded</span>
                  </div>
                )}
              </div>

              <div className="image-controls">
                <label className="file-upload-btn">
                  <Upload size={15} /> Upload Image (JPG, PNG, WEBP)
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileChange}
                    className="hidden-file-input"
                  />
                </label>
                <span className="field-hint">Or provide direct image URL:</span>
                <input
                  type="url"
                  className="form-input mt-1"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                />
                {imagePreview && (
                  <button
                    type="button"
                    className="link-button text-danger mt-1"
                    onClick={() => {
                      setImageUrl('');
                      setImagePreview('');
                    }}
                  >
                    Clear Image
                  </button>
                )}
                {errors.image && <span className="field-error-text">{errors.image}</span>}
              </div>
            </div>

            {/* Section 9: Achievements */}
            <div className="form-section-title">9. Project Achievements (Optional)</div>

            <div className="achievements-builder">
              {achievements.length > 0 && (
                <div className="existing-ach-list">
                  {achievements.map((ach) => (
                    <div key={ach.id} className="ach-chip-row">
                      <Award size={14} className="ach-icon" />
                      <span className="ach-name">{ach.title}</span>
                      <span className="ach-tag">{ach.awardType}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(ach.id)}
                        className="remove-ach-btn"
                        title="Delete Achievement"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="add-ach-form-row">
                <input
                  type="text"
                  className="form-input flex-2"
                  placeholder="Achievement title (e.g. 1st Place or Top 5 Finalist)"
                  value={newAchTitle}
                  onChange={(e) => setNewAchTitle(e.target.value)}
                />
                <select
                  className="form-select flex-1"
                  value={newAchAward}
                  onChange={(e) => setNewAchAward(e.target.value)}
                >
                  {achievementTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Organizer (e.g. Devfolio)"
                  value={newAchOrg}
                  onChange={(e) => setNewAchOrg(e.target.value)}
                />
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleAddAchievement}
                  disabled={!newAchTitle.trim()}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            {/* Section 10: Featured Toggle */}
            <div className="featured-toggle-box">
              <label className="checkbox-custom-label">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span className="checkbox-custom-mark" />
                <div className="checkbox-text">
                  <span className="checkbox-title">Mark as Featured Project</span>
                  <span className="checkbox-desc">
                    Featured projects are displayed prominently in your Portfolio Preview and will be
                    prioritized for the Resume Builder (Module 6).
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
