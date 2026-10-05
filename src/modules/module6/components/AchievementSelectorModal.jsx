import React, { useState } from 'react';
import { X, Trophy, Check } from 'lucide-react';
import { module5Service } from '../../module5/module5Service';

export const AchievementSelectorModal = ({
  isOpen,
  onClose,
  currentResumeAchievements,
  onSaveAchievements
}) => {
  const [allAchievements] = useState(() => {
    return module5Service.getAchievements('ALL', '');
  });

  const [selectedIds, setSelectedIds] = useState(() => {
    return new Set((currentResumeAchievements || []).map(a => a.id.replace('ra_', '')));
  });

  if (!isOpen) return null;

  const toggleSelect = (ach) => {
    const next = new Set(selectedIds);
    if (next.has(ach.id)) {
      next.delete(ach.id);
    } else {
      next.add(ach.id);
    }
    setSelectedIds(next);
  };

  const handleApply = () => {
    const selectedList = allAchievements
      .filter(a => selectedIds.has(a.id))
      .map(a => ({
        id: `ra_${a.id}`,
        title: a.title,
        organization: a.organization,
        date: a.achievementDate || '',
        description: a.description
      }));
    onSaveAchievements(selectedList);
    onClose();
  };

  return (
    <div className="devtrack-modal-backdrop" onClick={onClose}>
      <div className="devtrack-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <Trophy size={20} className="modal-title-icon" />
            <div>
              <h3>Select Achievements from Module 5</h3>
              <p className="modal-subtitle">Pick hackathons and awards to feature on your resume</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-form-body">
          <div className="selector-items-list">
            {allAchievements.map(ach => {
              const isChecked = selectedIds.has(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`selector-item-card ${isChecked ? 'selected' : ''}`}
                  onClick={() => toggleSelect(ach)}
                >
                  <div className="selector-checkbox">
                    {isChecked && <Check size={14} />}
                  </div>
                  <div className="selector-item-info">
                    <span className="selector-item-title">{ach.title}</span>
                    <span className="selector-item-meta">{ach.organization} • {ach.achievementCategory}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-actions-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-primary" onClick={handleApply}>
            Save Selected ({selectedIds.size})
          </button>
        </div>
      </div>
    </div>
  );
};
