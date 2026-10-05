import React, { useState } from 'react';
import { X, FolderGit2, Plus, Check } from 'lucide-react';

export const ProjectSelectorModal = ({
  isOpen,
  onClose,
  currentResumeProjects,
  onSaveProjects
}) => {
  // Read all projects from Module 4
  const [allProjects, setAllProjects] = useState(() => {
    try {
      const stored = localStorage.getItem('devtrack_module4_projects_v1');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
      { id: 'proj_devtrack_01', title: 'DevTrack – Developer Portfolio & Progress System', technologies: [{ name: 'React' }, { name: 'Java Spring Boot' }] },
      { id: 'proj_aeromatrix_01', title: 'AeroMatrix – AI Flight Trajectory Optimizer', technologies: [{ name: 'Python' }, { name: 'PyTorch' }] },
      { id: 'proj_polyhouse_01', title: 'Smart Polyhouse Precision Agriculture IoT', technologies: [{ name: 'ESP32' }, { name: 'MQTT' }] },
      { id: 'proj_fitness_01', title: 'AI Fitness Pose Corrector', technologies: [{ name: 'Python' }, { name: 'OpenCV' }] }
    ];
  });

  const [selectedIds, setSelectedIds] = useState(() => {
    const existingIds = new Set((currentResumeProjects || []).map(p => p.sourceProjectId || p.id));
    return existingIds;
  });

  if (!isOpen) return null;

  const toggleSelect = (proj) => {
    const next = new Set(selectedIds);
    if (next.has(proj.id)) {
      next.delete(proj.id);
    } else {
      next.add(proj.id);
    }
    setSelectedIds(next);
  };

  const handleApply = () => {
    const selectedList = allProjects
      .filter(p => selectedIds.has(p.id))
      .map(p => ({
        id: `rp_${p.id}`,
        sourceProjectId: p.id,
        title: p.title,
        role: p.contribution?.role || 'Developer',
        technologies: (p.technologies || []).map(t => typeof t === 'string' ? t : t.name),
        liveUrl: p.links?.find(l => l.type === 'LIVE' || l.type === 'DEMO')?.url || '',
        githubUrl: p.links?.find(l => l.type === 'GITHUB')?.url || '',
        highlights: p.keyFeatures || [p.shortDescription || 'Engineered core features and deployment pipelines.']
      }));
    onSaveProjects(selectedList);
    onClose();
  };

  return (
    <div className="devtrack-modal-backdrop" onClick={onClose}>
      <div className="devtrack-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <FolderGit2 size={20} className="modal-title-icon" />
            <div>
              <h3>Select Projects from Module 4</h3>
              <p className="modal-subtitle">Choose portfolio projects to feature on your resume</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-form-body">
          <div className="selector-items-list">
            {allProjects.map(proj => {
              const isChecked = selectedIds.has(proj.id);
              const techs = (proj.technologies || []).map(t => typeof t === 'string' ? t : t.name).join(', ');
              return (
                <div
                  key={proj.id}
                  className={`selector-item-card ${isChecked ? 'selected' : ''}`}
                  onClick={() => toggleSelect(proj)}
                >
                  <div className="selector-checkbox">
                    {isChecked && <Check size={14} />}
                  </div>
                  <div className="selector-item-info">
                    <span className="selector-item-title">{proj.title}</span>
                    {techs && <span className="selector-item-meta">{techs}</span>}
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
