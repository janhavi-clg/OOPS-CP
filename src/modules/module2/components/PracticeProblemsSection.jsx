import React, { useState } from 'react';
import {
  Code2,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Edit2,
  Eye,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const PracticeProblemsSection = ({
  problems = [],
  skills = [],
  selectedSkillId = null,
  onAddProblem,
  onEditProblem,
  onDeleteProblem,
  onViewProblem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL'); // 'ALL' | 'Easy' | 'Medium' | 'Hard'
  const [skillFilter, setSkillFilter] = useState(selectedSkillId || 'ALL');

  const filtered = problems.filter((prob) => {
    // Difficulty filter
    if (difficultyFilter !== 'ALL' && prob.difficulty !== difficultyFilter) return false;

    // Skill filter
    if (skillFilter !== 'ALL' && prob.skillId !== skillFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prob.title?.toLowerCase().includes(q);
      const matchPlatform = prob.platform?.toLowerCase().includes(q);
      const matchSkill = prob.skillName?.toLowerCase().includes(q);
      if (!matchTitle && !matchPlatform && !matchSkill) return false;
    }

    return true;
  });

  const getDifficultyBadgeClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'badge-difficulty easy';
      case 'medium': return 'badge-difficulty medium';
      case 'hard': return 'badge-difficulty hard';
      default: return 'badge-difficulty';
    }
  };

  return (
    <div className="devtrack-practice-section">
      {/* Controls & Filter Bar */}
      <div className="practice-controls-bar">
        <div className="controls-left">
          {/* Difficulty Filter Pills */}
          <div className="filter-pill-group">
            <button
              type="button"
              className={`filter-pill ${difficultyFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('ALL')}
            >
              All ({problems.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${difficultyFilter === 'Easy' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('Easy')}
            >
              Easy ({problems.filter((p) => p.difficulty === 'Easy').length})
            </button>
            <button
              type="button"
              className={`filter-pill ${difficultyFilter === 'Medium' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('Medium')}
            >
              Medium ({problems.filter((p) => p.difficulty === 'Medium').length})
            </button>
            <button
              type="button"
              className={`filter-pill ${difficultyFilter === 'Hard' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('Hard')}
            >
              Hard ({problems.filter((p) => p.difficulty === 'Hard').length})
            </button>
          </div>

          {/* Skill Dropdown Filter */}
          <div className="skill-filter-select-wrapper">
            <select
              className="resource-filter-select"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              <option value="ALL">All Skills</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="controls-right">
          {/* Search Box */}
          <div className="resource-search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search problems, platforms, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="resource-search-input"
            />
          </div>

          {/* Add Problem Button */}
          <button type="button" className="btn-primary" onClick={onAddProblem}>
            <Plus size={16} />
            <span>+ Add Problem</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="practice-empty-state">
          <Code2 size={40} className="empty-icon" />
          <h4 className="empty-title">No solved problems found</h4>
          <p className="empty-desc">
            {problems.length === 0
              ? 'Record solved programming problems, paste your solution code, and build your technical repertoire.'
              : 'No solved problems match your active filter criteria.'}
          </p>
          <button type="button" className="btn-primary" onClick={onAddProblem}>
            <Plus size={15} />
            <span>+ Add Problem</span>
          </button>
        </div>
      ) : (
        /* Problem List Table / Cards */
        <div className="problems-table-wrapper">
          <table className="devtrack-problems-table">
            <thead>
              <tr>
                <th className="th-prob-title">Problem Name</th>
                <th className="th-prob-skill">Skill</th>
                <th className="th-prob-platform">Platform</th>
                <th className="th-prob-difficulty">Difficulty</th>
                <th className="th-prob-date">Date Solved</th>
                <th className="th-prob-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((prob) => (
                <tr key={prob.id} className="problem-table-row">
                  <td className="td-prob-title">
                    <div className="problem-title-cell">
                      <span
                        className="problem-name-clickable"
                        onClick={() => onViewProblem(prob)}
                        title="Click to view full solution code"
                      >
                        {prob.title}
                      </span>
                      {prob.problemUrl && (
                        <a
                          href={prob.problemUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="problem-ext-link-icon"
                          title="Open problem on official site"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="td-prob-skill">
                    <span className="skill-name-tag">{prob.skillName || 'Skill'}</span>
                  </td>
                  <td className="td-prob-platform">
                    <span className="platform-tag">{prob.platform || 'Custom'}</span>
                  </td>
                  <td className="td-prob-difficulty">
                    <span className={getDifficultyBadgeClass(prob.difficulty)}>
                      {prob.difficulty || 'Medium'}
                    </span>
                  </td>
                  <td className="td-prob-date">
                    <div className="date-cell">
                      <Calendar size={12} className="date-icon" />
                      <span>{prob.dateSolved || 'Recently'}</span>
                    </div>
                  </td>
                  <td className="td-prob-actions">
                    <div className="actions-cell">
                      <button
                        type="button"
                        className="btn-view-solution"
                        onClick={() => onViewProblem(prob)}
                        title="View solution code"
                      >
                        <Eye size={14} />
                        <span>Solution</span>
                      </button>
                      <button
                        type="button"
                        className="btn-icon-subtle"
                        title="Edit problem"
                        onClick={() => onEditProblem(prob)}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon-danger"
                        title="Delete problem"
                        onClick={() => onDeleteProblem(prob)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
