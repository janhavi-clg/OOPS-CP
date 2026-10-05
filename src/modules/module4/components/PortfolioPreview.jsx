import React, { useState } from 'react';
import {
  GitBranch,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  Layers,
  Star,
  Users,
  Eye,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

export const PortfolioPreview = ({
  portfolioData,
  onViewProject
}) => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  if (!portfolioData) {
    return <div className="loading-spinner-box">Loading Portfolio Preview...</div>;
  }

  const {
    studentName = 'Rahul',
    headline = 'Second Year CSE (AI/ML) Developer & Full Stack Builder',
    college = 'Apex Institute of Technology',
    featuredProjects = [],
    techStack = [],
    achievements = []
  } = portfolioData;

  // Filter projects by category
  const filteredProjects =
    activeCategory === 'ALL'
      ? featuredProjects
      : featuredProjects.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  // Unique categories for pills
  const categories = ['ALL', ...new Set(featuredProjects.map((p) => p.category))];

  return (
    <div className="portfolio-preview-wrapper">
      {/* 1. Portfolio Hero Section */}
      <div className="portfolio-hero-banner">
        <div className="portfolio-hero-content">
          <div className="portfolio-status-pill">
            <span className="live-pulse-dot" />
            <span>Developer Portfolio Showcase</span>
          </div>

          <h2 className="portfolio-student-name">{studentName}</h2>
          <p className="portfolio-student-headline">{headline}</p>
          <span className="portfolio-student-college">{college} • Department of Computer Science</span>

          <div className="portfolio-hero-stats">
            <div className="portfolio-stat-item">
              <span className="p-stat-number">{featuredProjects.length}</span>
              <span className="p-stat-text">Featured Projects</span>
            </div>
            <div className="portfolio-stat-divider" />
            <div className="portfolio-stat-item">
              <span className="p-stat-number">{techStack.length}</span>
              <span className="p-stat-text">Technologies</span>
            </div>
            <div className="portfolio-stat-divider" />
            <div className="portfolio-stat-item">
              <span className="p-stat-number">{achievements.length}</span>
              <span className="p-stat-text">Awards & Honors</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Pills */}
      <div className="portfolio-filter-row">
        <span className="portfolio-filter-label">Filter Showcase:</span>
        <div className="portfolio-pills-list">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`portfolio-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'ALL' ? 'All Featured' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Large Featured Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="empty-state-box">
          <Star size={40} className="empty-state-icon" />
          <h4 className="empty-state-title">No Featured Projects in this category</h4>
          <p className="empty-state-desc">
            Mark your top projects as "Featured" in My Projects to showcase them here.
          </p>
        </div>
      ) : (
        <div className="portfolio-showcase-grid">
          {filteredProjects.map((project) => {
            const githubLink = project.links?.find((l) => l.type === 'GITHUB');
            const demoLink = project.links?.find((l) => l.type === 'LIVE_DEMO');
            const docsLink = project.links?.find((l) => l.type === 'DOCUMENTATION');

            return (
              <div key={project.id} className="portfolio-card">
                {/* Media */}
                <div className="portfolio-card-media" onClick={() => onViewProject(project)}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="portfolio-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="portfolio-card-placeholder">
                      <Layers size={40} />
                      <span>{project.category}</span>
                    </div>
                  )}

                  <div className="portfolio-media-overlay">
                    <span className="preview-category-tag">{project.category}</span>
                    <button
                      type="button"
                      className="overlay-case-study-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewProject(project);
                      }}
                    >
                      <Eye size={16} /> Read Case Study
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="portfolio-card-body">
                  <div className="portfolio-title-row">
                    <h3
                      className="portfolio-project-title"
                      onClick={() => onViewProject(project)}
                    >
                      {project.name}
                    </h3>
                    <span className="portfolio-status-chip">
                      {project.status === 'COMPLETED' ? 'Completed' : 'In Active Dev'}
                    </span>
                  </div>

                  <p className="portfolio-project-desc">{project.shortDescription}</p>

                  {/* Highlights/Features */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <ul className="portfolio-feature-bullets">
                      {project.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx}>
                          <CheckCircle2 size={13} className="bullet-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <div className="portfolio-tech-list">
                    {(project.technologies || []).map((t, idx) => (
                      <span key={idx} className="portfolio-tech-pill">
                        {typeof t === 'string' ? t : t.name}
                      </span>
                    ))}
                  </div>

                  {/* Role & Contribution quote */}
                  {project.contribution?.role && (
                    <div className="portfolio-role-strip">
                      <Users size={13} />
                      <span>
                        Role: <strong>{project.contribution.role}</strong>
                        {project.contribution.teamSize > 1 ? ` • ${project.contribution.teamSize}-person team` : ' • Solo project'}
                      </span>
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="portfolio-card-footer">
                    <div className="portfolio-links">
                      {githubLink && (
                        <a
                          href={githubLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-icon-link"
                          title="View Repository"
                        >
                          <GitBranch size={17} /> <span>Code</span>
                        </a>
                      )}
                      {demoLink && (
                        <a
                          href={demoLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-icon-link live"
                          title="Open Live Preview"
                        >
                          <ExternalLink size={17} /> <span>Demo</span>
                        </a>
                      )}
                      {docsLink && (
                        <a
                          href={docsLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-icon-link docs"
                          title="Architecture Documentation"
                        >
                          <BookOpen size={17} /> <span>Docs</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      className="btn-case-study"
                      onClick={() => onViewProject(project)}
                    >
                      Case Study →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Complete Technology Stack Section */}
      {techStack && techStack.length > 0 && (
        <div className="portfolio-tech-summary-box">
          <h3 className="section-title">Verified Core Competencies</h3>
          <p className="section-subtitle">
            Technologies consistently deployed across featured full-stack and machine learning projects
          </p>
          <div className="portfolio-all-tech-chips">
            {techStack.map((tech, idx) => (
              <span key={idx} className="portfolio-mastered-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 5. Accolades & Hackathon Achievements Section */}
      {achievements && achievements.length > 0 && (
        <div className="portfolio-achievements-box">
          <h3 className="section-title">Project Awards & Accolades</h3>
          <div className="portfolio-awards-grid">
            {achievements.map((ach, idx) => (
              <div key={idx} className="portfolio-award-card">
                <div className="award-icon-box">
                  <Award size={20} />
                </div>
                <div className="award-info">
                  <h4 className="award-title">{ach.title}</h4>
                  <span className="award-meta">
                    {ach.awardType} • {ach.organization} • Project: <strong>{ach.projectName}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPreview;
