import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  const templateClass = `template-${resume.template || 'modern'}`;

  // Filter visible sections sorted by orderIndex
  const visibleSections = (resume.sections || [])
    .filter(s => s.visible)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  return (
    <div className={`resume-preview-sheet ${templateClass}`} id="printable-resume">
      {/* Resume Header */}
      <header className="sheet-header">
        <h1 className="sheet-name">{resume.fullName || 'Rahul Sharma'}</h1>
        {resume.targetRole && (
          <div className="sheet-target-title">{resume.targetRole}</div>
        )}
        <div className="sheet-contact-line">
          {resume.email && (
            <span className="contact-item">
              <Mail size={12} />
              <span>{resume.email}</span>
            </span>
          )}
          {resume.phone && (
            <span className="contact-item">
              <Phone size={12} />
              <span>{resume.phone}</span>
            </span>
          )}
          {resume.location && (
            <span className="contact-item">
              <MapPin size={12} />
              <span>{resume.location}</span>
            </span>
          )}
          {resume.githubUrl && (
            <span className="contact-item">
              <Globe size={12} />
              <a href={resume.githubUrl} target="_blank" rel="noreferrer">
                {resume.githubUrl.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {resume.linkedinUrl && (
            <span className="contact-item">
              <Globe size={12} />
              <a href={resume.linkedinUrl} target="_blank" rel="noreferrer">
                {resume.linkedinUrl.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {resume.portfolioUrl && (
            <span className="contact-item">
              <Globe size={12} />
              <a href={resume.portfolioUrl} target="_blank" rel="noreferrer">
                {resume.portfolioUrl.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Dynamic Render of Visible Sections */}
      <div className="sheet-body">
        {visibleSections.map(sec => {
          switch (sec.sectionKey) {
            case 'summary':
              return resume.summary ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <p className="summary-paragraph">{resume.summary}</p>
                </section>
              ) : null;

            case 'education':
              return resume.education && resume.education.length > 0 ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <div className="education-items-list">
                    {resume.education.map(edu => (
                      <div key={edu.id} className="sheet-item-row">
                        <div className="item-row-top">
                          <span className="item-main-title">{edu.institution}</span>
                          <span className="item-date-score">
                            {edu.startYear} – {edu.endYear} {edu.score ? `| ${edu.score}` : ''}
                          </span>
                        </div>
                        <div className="item-sub-title">{edu.degree}</div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'skills':
              return resume.skills && resume.skills.length > 0 ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <div className="skills-category-list">
                    {resume.skills.map(skGroup => (
                      <div key={skGroup.id} className="skill-group-line">
                        <strong className="skill-cat-name">{skGroup.category}: </strong>
                        <span className="skill-items-text">
                          {(skGroup.skills || []).join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'projects':
              return resume.projects && resume.projects.length > 0 ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <div className="projects-items-list">
                    {resume.projects.map(proj => (
                      <div key={proj.id} className="sheet-project-item">
                        <div className="project-title-row">
                          <div className="proj-title-left">
                            <span className="proj-name">{proj.title}</span>
                            {proj.role && <span className="proj-role">({proj.role})</span>}
                          </div>
                          <div className="proj-links">
                            {proj.liveUrl && (
                              <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="sheet-link">
                                [Live Demo]
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="sheet-link">
                                [Code]
                              </a>
                            )}
                          </div>
                        </div>

                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="proj-tech-line">
                            <strong>Tech Stack:</strong> {proj.technologies.join(', ')}
                          </div>
                        )}

                        {proj.highlights && proj.highlights.length > 0 && (
                          <ul className="proj-bullets">
                            {proj.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'experience':
              return resume.experience && resume.experience.length > 0 ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <div className="experience-items-list">
                    {resume.experience.map(exp => (
                      <div key={exp.id} className="sheet-item-row">
                        <div className="item-row-top">
                          <span className="item-main-title">{exp.role} – {exp.company}</span>
                          <span className="item-date-score">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="exp-bullets">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'achievements':
              return resume.achievements && resume.achievements.length > 0 ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <ul className="achievements-bullets">
                    {resume.achievements.map(ach => (
                      <li key={ach.id}>
                        <strong>{ach.title}</strong>
                        {ach.organization && ` – ${ach.organization}`}
                        {ach.date && ` (${ach.date})`}: {ach.description}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null;

            case 'certificates':
              return resume.certificates && resume.certificates.length > 0 ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <ul className="certs-bullets">
                    {resume.certificates.map(cert => (
                      <li key={cert.id}>
                        <strong>{cert.certificateName}</strong>
                        {cert.issuingOrganization && ` | ${cert.issuingOrganization}`}
                        {cert.issueDate && ` (${cert.issueDate})`}
                        {cert.credentialId && ` [ID: ${cert.credentialId}]`}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null;

            default:
              return sec.customContent ? (
                <section key={sec.id} className="sheet-section">
                  <h3 className="section-title">{sec.title}</h3>
                  <p>{sec.customContent}</p>
                </section>
              ) : null;
          }
        })}
      </div>
    </div>
  );
};
