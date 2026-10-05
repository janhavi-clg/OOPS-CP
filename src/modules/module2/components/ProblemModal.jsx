import React, { useState, useEffect } from 'react';
import { X, Code2, Plus, Check } from 'lucide-react';

const PLATFORM_OPTIONS = [
  'LeetCode',
  'GeeksforGeeks',
  'HackerRank',
  'CodeChef',
  'Codeforces',
  'Custom'
];

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

const LANGUAGE_OPTIONS = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'TypeScript',
  'C',
  'SQL',
  'Other'
];

export const ProblemModal = ({
  isOpen,
  onClose,
  initialData = null,
  skills = [],
  defaultSkillId = null,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [skillId, setSkillId] = useState('');
  const [platform, setPlatform] = useState('LeetCode');
  const [problemUrl, setProblemUrl] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [dateSolved, setDateSolved] = useState(new Date().toISOString().split('T')[0]);
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSkillId(initialData.skillId || (skills[0]?.id || ''));
      setPlatform(initialData.platform || 'LeetCode');
      setProblemUrl(initialData.problemUrl || '');
      setDifficulty(initialData.difficulty || 'Medium');
      setDateSolved(initialData.dateSolved || new Date().toISOString().split('T')[0]);
      setLanguage(initialData.solution?.language || 'Python');
      setCode(initialData.solution?.code || '');
      setNotes(initialData.notes || initialData.solution?.notes || '');
    } else {
      setTitle('');
      setSkillId(defaultSkillId || (skills[0]?.id || ''));
      setPlatform('LeetCode');
      setProblemUrl('');
      setDifficulty('Medium');
      setDateSolved(new Date().toISOString().split('T')[0]);
      setLanguage('Python');
      setCode('');
      setNotes('');
    }
    setErrorMsg('');
  }, [initialData, defaultSkillId, skills, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Problem title is required.');
      return;
    }
    if (!skillId) {
      setErrorMsg('Please select a skill for this practice problem.');
      return;
    }

    if (problemUrl.trim()) {
      const lower = problemUrl.trim().toLowerCase();
      if (!lower.startsWith('http://') && !lower.startsWith('https://')) {
        setErrorMsg('Problem URL must start with http:// or https://');
        return;
      }
    }

    const selectedSkill = skills.find((s) => s.id === skillId);

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await onSave({
        id: initialData?.id,
        title: title.trim(),
        skillId,
        skillName: selectedSkill ? selectedSkill.name : 'Skill',
        platform,
        problemUrl: problemUrl.trim(),
        difficulty,
        dateSolved,
        notes: notes.trim(),
        solution: {
          language,
          code: code.trim(),
          notes: notes.trim()
        }
      });
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save practice problem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onClose}>
      <div className="devtrack-modal-card modal-problem" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-box">
              <Code2 size={20} className="modal-icon" />
            </div>
            <div>
              <h3 className="modal-title">
                {initialData ? 'Edit Solved Problem' : 'Record Solved Problem'}
              </h3>
              <p className="modal-subtitle">
                Store your solution code and algorithm notes safely for future reference.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="form-error-banner">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="problem-form">
          <div className="modal-body modal-scrollable-body">
            <div className="form-group">
              <label className="form-label" htmlFor="prob-title">
                Problem Title <span className="req">*</span>
              </label>
              <input
                id="prob-title"
                type="text"
                className="form-input"
                placeholder="e.g., Two Sum, Valid Parentheses, Longest Substring..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="prob-skill">
                  Associated Skill <span className="req">*</span>
                </label>
                <select
                  id="prob-skill"
                  className="form-select"
                  value={skillId}
                  onChange={(e) => setSkillId(e.target.value)}
                  required
                >
                  {skills.length === 0 ? (
                    <option value="">No skills available (Add a skill first)</option>
                  ) : (
                    skills.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prob-platform">
                  Platform
                </label>
                <select
                  id="prob-platform"
                  className="form-select"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  {PLATFORM_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label" htmlFor="prob-diff">
                  Difficulty
                </label>
                <select
                  id="prob-diff"
                  className="form-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  {DIFFICULTY_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prob-lang">
                  Solution Language
                </label>
                <select
                  id="prob-lang"
                  className="form-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {LANGUAGE_OPTIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prob-date">
                  Date Solved
                </label>
                <input
                  id="prob-date"
                  type="date"
                  className="form-input"
                  value={dateSolved}
                  onChange={(e) => setDateSolved(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prob-url">
                Problem URL (Optional)
              </label>
              <input
                id="prob-url"
                type="url"
                className="form-input"
                placeholder="https://leetcode.com/problems/..."
                value={problemUrl}
                onChange={(e) => setProblemUrl(e.target.value)}
              />
            </div>

            {/* Solution Code Area */}
            <div className="form-group">
              <div className="code-header-row">
                <label className="form-label" htmlFor="prob-code">
                  Solution Code ({language})
                </label>
                <span className="code-security-notice">
                  Stored securely • Never executed
                </span>
              </div>
              <textarea
                id="prob-code"
                className="form-textarea code-editor-area"
                rows={9}
                placeholder={`Paste your ${language} solution here...`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />
            </div>

            {/* Algorithm Notes */}
            <div className="form-group">
              <label className="form-label" htmlFor="prob-notes">
                Algorithm Notes & Complexity (Optional)
              </label>
              <textarea
                id="prob-notes"
                className="form-textarea"
                rows={2}
                placeholder="e.g., Time Complexity O(n), Space O(1). Used two-pointer sliding window..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !title.trim() || !skillId}
            >
              {initialData ? (
                <>
                  <Check size={16} />
                  <span>{isSubmitting ? 'Saving...' : 'Update Problem'}</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>{isSubmitting ? 'Saving...' : 'Save Solved Problem'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
