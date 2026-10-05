import React, { useState } from 'react';
import {
  X,
  Search,
  Plus,
  Check,
  Sparkles,
  BookOpen,
  Layers,
  Wrench
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Programming',
  'Web Development',
  'Mobile Development',
  'Core CS',
  'AI / ML',
  'Database',
  'Cloud & DevOps',
  'Tools & Other'
];

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const SkillModal = ({
  isOpen,
  onClose,
  availableSkills = [],
  trackedSkills = [],
  onAddExisting,
  onAddCustom
}) => {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'custom'
  const [searchQuery, setSearchQuery] = useState('');

  // Custom skill form state
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('Programming');
  const [customCurrentLevel, setCustomCurrentLevel] = useState('Beginner');
  const [customTargetLevel, setCustomTargetLevel] = useState('Advanced');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const trackedNamesLower = new Set(
    trackedSkills.map((s) => s.name.toLowerCase())
  );

  const filteredCatalog = availableSkills.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCatalogSkill = async (skillName) => {
    try {
      setErrorMsg('');
      await onAddExisting({
        name: skillName,
        category: getCategoryForSkill(skillName),
        currentLevel: 'Beginner',
        targetLevel: 'Advanced',
        isCustom: false
      });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to add skill.');
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customName.trim()) {
      setErrorMsg('Skill name is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await onAddCustom({
        name: customName.trim(),
        category: customCategory,
        currentLevel: customCurrentLevel,
        targetLevel: customTargetLevel
      });
      // Reset form
      setCustomName('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to add custom skill.');
    } finally {
      setIsSubmitting(false);
    }
  };

  function getCategoryForSkill(name) {
    const n = name.toLowerCase();
    if (['python', 'java', 'c', 'c++', 'typescript'].includes(n)) return 'Programming';
    if (['html & css', 'javascript', 'react', 'node.js', 'express.js'].includes(n)) return 'Web Development';
    if (['dsa', 'java oop', 'computer networks', 'operating systems'].includes(n)) return 'Core CS';
    if (['machine learning', 'data science', 'deep learning', 'tensorflow', 'pytorch'].includes(n)) return 'AI / ML';
    if (['sql', 'postgresql', 'mongodb'].includes(n)) return 'Database';
    if (['git & github', 'docker', 'kubernetes', 'aws', 'linux'].includes(n)) return 'Cloud & DevOps';
    return 'Programming';
  }

  return (
    <div className="devtrack-modal-overlay" onClick={onClose}>
      <div className="devtrack-modal-card modal-skill" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-box">
              <Plus size={20} className="modal-icon" />
            </div>
            <div>
              <h3 className="modal-title">Add Skill to Tracker</h3>
              <p className="modal-subtitle">Choose what you actually want to learn and track.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="modal-tabs-header">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('catalog');
              setErrorMsg('');
            }}
          >
            <BookOpen size={15} />
            <span>Searchable Catalog</span>
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('custom');
              setErrorMsg('');
            }}
          >
            <Wrench size={15} />
            <span>Add Custom Skill</span>
          </button>
        </div>

        {errorMsg && (
          <div className="form-error-banner">
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="modal-body">
          {activeTab === 'catalog' ? (
            <div className="catalog-tab-content">
              {/* Search Bar */}
              <div className="catalog-search-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search skills (e.g., Python, React, DSA, SQL)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="catalog-search-input"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="catalog-search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Skill Badges Grid */}
              <div className="catalog-grid">
                {filteredCatalog.length === 0 ? (
                  <div className="catalog-empty-search">
                    <p>No matching skills found in catalog.</p>
                    <button
                      type="button"
                      className="btn-create-custom-inline"
                      onClick={() => {
                        setCustomName(searchQuery);
                        setActiveTab('custom');
                      }}
                    >
                      <Plus size={14} />
                      <span>Add "{searchQuery}" as Custom Skill</span>
                    </button>
                  </div>
                ) : (
                  filteredCatalog.map((skillName) => {
                    const isAlreadyTracked = trackedNamesLower.has(skillName.toLowerCase());
                    return (
                      <div
                        key={skillName}
                        className={`catalog-item-chip ${isAlreadyTracked ? 'already-tracked' : ''}`}
                      >
                        <span className="chip-name">{skillName}</span>
                        {isAlreadyTracked ? (
                          <span className="chip-badge-added">
                            <Check size={12} />
                            <span>Added</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="chip-btn-add"
                            onClick={() => handleSelectCatalogSkill(skillName)}
                          >
                            <Plus size={13} />
                            <span>Track</span>
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="custom-skill-form">
              <div className="form-group">
                <label className="form-label" htmlFor="custom-skill-name">
                  Skill Name <span className="req">*</span>
                </label>
                <input
                  id="custom-skill-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Rust, GraphQL, Kubernetes, Java OOP..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="custom-category">
                  Category
                </label>
                <select
                  id="custom-category"
                  className="form-select"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="custom-current-level">
                    Current Level
                  </label>
                  <select
                    id="custom-current-level"
                    className="form-select"
                    value={customCurrentLevel}
                    onChange={(e) => setCustomCurrentLevel(e.target.value)}
                  >
                    {LEVEL_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="custom-target-level">
                    Target Level
                  </label>
                  <select
                    id="custom-target-level"
                    className="form-select"
                    value={customTargetLevel}
                    onChange={(e) => setCustomTargetLevel(e.target.value)}
                  >
                    {LEVEL_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting || !customName.trim()}
                >
                  <Plus size={16} />
                  <span>{isSubmitting ? 'Adding...' : 'Add to My Skills'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
