import React, { useState, useEffect } from 'react';
import { X, Target, Plus, Check } from 'lucide-react';

const GOAL_TYPES = [
  { id: 'PROBLEMS_SOLVED', label: 'Problems Solved' },
  { id: 'DAILY_TARGET', label: 'Daily Practice Target' },
  { id: 'STREAK_DAYS', label: 'Consecutive Streak Days' },
  { id: 'CONTEST_RATING', label: 'Contest Rating Target' }
];

const TIMEFRAMES = ['Daily', 'Weekly', 'Monthly', 'Semester'];

export const CodingGoalModal = ({
  isOpen,
  onClose,
  initialData = null,
  platforms = [],
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [goalType, setGoalType] = useState('PROBLEMS_SOLVED');
  const [platform, setPlatform] = useState('All Platforms');
  const [targetValue, setTargetValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [timeframe, setTimeframe] = useState('Monthly');
  const [deadline, setDeadline] = useState('2026-10-31');
  const [status, setStatus] = useState('ACTIVE');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setGoalType(initialData.goalType || 'PROBLEMS_SOLVED');
      setPlatform(initialData.platform || 'All Platforms');
      setTargetValue(String(initialData.targetValue || ''));
      setCurrentValue(String(initialData.currentValue || 0));
      setTimeframe(initialData.timeframe || 'Monthly');
      setDeadline(initialData.deadline || '2026-10-31');
      setStatus(initialData.status || 'ACTIVE');
    } else {
      setTitle('');
      setGoalType('PROBLEMS_SOLVED');
      setPlatform('All Platforms');
      setTargetValue('50');
      setCurrentValue('0');
      setTimeframe('Monthly');
      setDeadline('2026-10-31');
      setStatus('ACTIVE');
    }
    setErrorMsg('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Goal title is required.');
      return;
    }
    const tVal = parseInt(targetValue, 10);
    if (!tVal || tVal <= 0) {
      setErrorMsg('Target value must be greater than zero.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');

      await onSave({
        id: initialData?.id,
        title: title.trim(),
        goalType,
        platform,
        targetValue: tVal,
        currentValue: parseInt(currentValue, 10) || 0,
        timeframe,
        deadline,
        status
      });

      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save coding goal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onClose}>
      <div className="devtrack-modal-card modal-goal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-box">
              <Target size={20} className="modal-icon" />
            </div>
            <div>
              <h3 className="modal-title">
                {initialData ? 'Edit Coding Goal' : 'Create Coding Goal'}
              </h3>
              <p className="modal-subtitle">
                Set quantitative targets to maintain algorithmic momentum.
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

        <form onSubmit={handleSubmit} className="goal-form">
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="g-title">
                Goal Title <span className="req">*</span>
              </label>
              <input
                id="g-title"
                type="text"
                className="form-input"
                placeholder="e.g., Solve 100 Medium LeetCode Questions"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="g-type">
                  Goal Metric Type
                </label>
                <select
                  id="g-type"
                  className="form-select"
                  value={goalType}
                  onChange={(e) => setGoalType(e.target.value)}
                >
                  {GOAL_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="g-platform">
                  Target Platform
                </label>
                <select
                  id="g-platform"
                  className="form-select"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="All Platforms">All Platforms</option>
                  {platforms.map((p) => (
                    <option key={p.id} value={p.platform}>
                      {p.platform}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label" htmlFor="g-target">
                  Target Value <span className="req">*</span>
                </label>
                <input
                  id="g-target"
                  type="number"
                  min="1"
                  className="form-input"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="g-current">
                  Current Value
                </label>
                <input
                  id="g-current"
                  type="number"
                  min="0"
                  className="form-input"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="g-timeframe">
                  Timeframe
                </label>
                <select
                  id="g-timeframe"
                  className="form-select"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  {TIMEFRAMES.map((tf) => (
                    <option key={tf} value={tf}>
                      {tf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="g-deadline">
                Target Deadline
              </label>
              <input
                id="g-deadline"
                type="text"
                className="form-input"
                placeholder="e.g., 2026-10-31 or End of Semester"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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
              disabled={isSubmitting || !title.trim()}
            >
              {initialData ? (
                <>
                  <Check size={16} />
                  <span>{isSubmitting ? 'Saving...' : 'Update Goal'}</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>{isSubmitting ? 'Creating...' : 'Create Goal'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
