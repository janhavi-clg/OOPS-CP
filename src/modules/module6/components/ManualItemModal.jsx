import React, { useState } from 'react';
import { X, Plus, BookOpen, Briefcase, FileText } from 'lucide-react';

export const ManualItemModal = ({
  isOpen,
  onClose,
  modalType, // 'EDUCATION', 'EXPERIENCE', 'CUSTOM'
  onSave
}) => {
  const [eduData, setEduData] = useState({
    institution: '',
    degree: '',
    startYear: '2023',
    endYear: '2027',
    score: '',
    location: 'Pune, India'
  });

  const [expData, setExpData] = useState({
    company: '',
    role: '',
    location: 'Pune, India',
    startDate: 'Jan 2024',
    endDate: 'Present',
    current: true,
    highlightsText: ''
  });

  const [customData, setCustomData] = useState({
    title: '',
    content: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'EDUCATION') {
      onSave({
        ...eduData,
        id: `edu_${Date.now()}`
      });
    } else if (modalType === 'EXPERIENCE') {
      const bullets = expData.highlightsText
        .split('\n')
        .map(b => b.trim())
        .filter(Boolean);
      onSave({
        ...expData,
        id: `exp_${Date.now()}`,
        highlights: bullets.length > 0 ? bullets : ['Led technical implementation and delivered milestones on time.']
      });
    } else if (modalType === 'CUSTOM') {
      onSave({
        id: `sec_custom_${Date.now()}`,
        sectionKey: 'custom',
        title: customData.title || 'Additional Information',
        visible: true,
        customContent: customData.content
      });
    }
    onClose();
  };

  return (
    <div className="devtrack-modal-backdrop" onClick={onClose}>
      <div className="devtrack-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            {modalType === 'EDUCATION' && <BookOpen size={20} className="modal-title-icon" />}
            {modalType === 'EXPERIENCE' && <Briefcase size={20} className="modal-title-icon" />}
            {modalType === 'CUSTOM' && <FileText size={20} className="modal-title-icon" />}
            <div>
              <h3>
                {modalType === 'EDUCATION' && 'Add Education Entry'}
                {modalType === 'EXPERIENCE' && 'Add Work / Leadership Experience'}
                {modalType === 'CUSTOM' && 'Add Custom Section'}
              </h3>
              <p className="modal-subtitle">Add custom background directly to your resume</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          {modalType === 'EDUCATION' && (
            <>
              <div className="form-group">
                <label>College / University *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune Institute of Computer Technology"
                  value={eduData.institution}
                  onChange={e => setEduData({ ...eduData, institution: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Degree & Major *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech in Computer Science (AI/ML)"
                  value={eduData.degree}
                  onChange={e => setEduData({ ...eduData, degree: e.target.value })}
                />
              </div>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Start Year</label>
                  <input
                    type="text"
                    value={eduData.startYear}
                    onChange={e => setEduData({ ...eduData, startYear: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>End Year</label>
                  <input
                    type="text"
                    value={eduData.endYear}
                    onChange={e => setEduData({ ...eduData, endYear: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>CGPA / Percentage</label>
                  <input
                    type="text"
                    placeholder="e.g. CGPA: 8.92"
                    value={eduData.score}
                    onChange={e => setEduData({ ...eduData, score: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          {modalType === 'EXPERIENCE' && (
            <>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Open Source Foundation"
                    value={expData.company}
                    onChange={e => setExpData({ ...expData, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Role / Position *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineering Intern"
                    value={expData.role}
                    onChange={e => setExpData({ ...expData, role: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    value={expData.startDate}
                    onChange={e => setExpData({ ...expData, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    value={expData.endDate}
                    onChange={e => setExpData({ ...expData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Key Responsibilities & Impact (1 bullet per line)</label>
                <textarea
                  rows={3}
                  placeholder="Engineered microservices using Spring Boot...&#10;Reduced query response times by 35% with PostgreSQL indexing..."
                  value={expData.highlightsText}
                  onChange={e => setExpData({ ...expData, highlightsText: e.target.value })}
                />
              </div>
            </>
          )}

          {modalType === 'CUSTOM' && (
            <>
              <div className="form-group">
                <label>Section Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Research Publications, Open Source Contributions"
                  value={customData.title}
                  onChange={e => setCustomData({ ...customData, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Content Text *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter details or bullet points..."
                  value={customData.content}
                  onChange={e => setCustomData({ ...customData, content: e.target.value })}
                />
              </div>
            </>
          )}

          <div className="modal-actions-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add to Resume</button>
          </div>
        </form>
      </div>
    </div>
  );
};
