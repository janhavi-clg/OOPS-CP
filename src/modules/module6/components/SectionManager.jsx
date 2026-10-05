import React, { useState } from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Plus, Trash2, Layers } from 'lucide-react';

export const SectionManager = ({
  sections,
  onReorderSection,
  onToggleSectionVisibility,
  onAddCustomSection,
  onDeleteSection
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      onAddCustomSection(newSectionTitle.trim());
      setNewSectionTitle('');
      setIsAdding(false);
    }
  };

  const sortedSections = [...(sections || [])].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  return (
    <div className="section-manager-card">
      <div className="sec-manager-header">
        <div className="sec-title-group">
          <Layers size={16} />
          <h5>Resume Section Layout</h5>
        </div>
        <button
          type="button"
          className="btn-link-action"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus size={13} />
          <span>Add Section</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="add-sec-form">
          <input
            type="text"
            placeholder="Custom Section Title (e.g. Publications, Volunteer Work)..."
            value={newSectionTitle}
            onChange={e => setNewSectionTitle(e.target.value)}
            autoFocus
          />
          <div className="add-sec-btns">
            <button type="submit" className="btn-primary btn-small">Add</button>
            <button type="button" className="btn-secondary btn-small" onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="sections-list">
        {sortedSections.map((sec, idx) => (
          <div key={sec.id} className={`section-item-row ${!sec.visible ? 'hidden-sec' : ''}`}>
            <div className="sec-info">
              <span className="sec-drag-handle">☰</span>
              <span className="sec-title-text">{sec.title}</span>
            </div>

            <div className="sec-controls">
              <button
                type="button"
                className="sec-ctrl-btn"
                disabled={idx === 0}
                onClick={() => onReorderSection(sec.id, -1)}
                title="Move Up"
              >
                <ArrowUp size={13} />
              </button>
              <button
                type="button"
                className="sec-ctrl-btn"
                disabled={idx === sortedSections.length - 1}
                onClick={() => onReorderSection(sec.id, 1)}
                title="Move Down"
              >
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                className={`sec-ctrl-btn ${sec.visible ? 'active-eye' : ''}`}
                onClick={() => onToggleSectionVisibility(sec.id)}
                title={sec.visible ? 'Hide from Resume' : 'Show on Resume'}
              >
                {sec.visible ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              {sec.sectionKey === 'custom' && (
                <button
                  type="button"
                  className="sec-ctrl-btn danger"
                  onClick={() => onDeleteSection(sec.id)}
                  title="Remove Section"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
