import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const SkillAnalyticsCard = ({ skillsData }) => {
  const [showAll, setShowAll] = useState(false);

  if (!skillsData || !skillsData.list) return null;

  const displayList = showAll ? skillsData.list : skillsData.list.slice(0, 4);

  return (
    <div className="devtrack-analytics-card">
      <div className="card-top-header">
        <div className="card-title-group">
          <BookOpen size={18} className="card-icon" />
          <div>
            <h4>Skill Mastery & Progress</h4>
            <p className="card-subtitle">Module 2 tracked proficiencies and resources</p>
          </div>
        </div>

        <button
          type="button"
          className="toggle-all-btn"
          onClick={() => setShowAll(!showAll)}
        >
          <span>{showAll ? 'Show Top 4' : `View All (${skillsData.list.length})`}</span>
          {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <div className="skills-progress-list">
        {displayList.map(skill => (
          <div key={skill.name} className="skill-meter-row">
            <div className="meter-label-row">
              <span className="skill-title">{skill.name}</span>
              <div className="skill-tags">
                <span className="skill-level-chip">{skill.level}</span>
                <span className="skill-pct-text">{skill.proficiency}%</span>
              </div>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{ width: `${skill.proficiency}%` }}
              ></div>
            </div>
            <div className="meter-sub-info">
              <span>{skill.resourcesCount} completed exercises / resources</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
