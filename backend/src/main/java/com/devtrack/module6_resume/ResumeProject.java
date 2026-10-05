package com.devtrack.module6_resume;

import java.util.ArrayList;
import java.util.List;

/**
 * ResumeProject represents a project selected or customized for the resume.
 * Can be populated automatically from Module 4 projects or created manually.
 * Demonstrates OOP Encapsulation and Defensive Copying.
 */
public class ResumeProject {
    private String id;
    private String sourceProjectId; // If imported from Module 4
    private String title;
    private String role;
    private List<String> technologies = new ArrayList<>();
    private String liveUrl;
    private String githubUrl;
    private List<String> highlights = new ArrayList<>();

    public ResumeProject() {
    }

    public ResumeProject(String id, String sourceProjectId, String title, String role,
                         List<String> technologies, String liveUrl, String githubUrl, List<String> highlights) {
        this.id = id;
        this.sourceProjectId = sourceProjectId;
        this.title = title;
        this.role = role;
        if (technologies != null) {
            this.technologies = new ArrayList<>(technologies);
        }
        this.liveUrl = liveUrl;
        this.githubUrl = githubUrl;
        if (highlights != null) {
            this.highlights = new ArrayList<>(highlights);
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSourceProjectId() {
        return sourceProjectId;
    }

    public void setSourceProjectId(String sourceProjectId) {
        this.sourceProjectId = sourceProjectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<String> getTechnologies() {
        return new ArrayList<>(technologies);
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies != null ? new ArrayList<>(technologies) : new ArrayList<>();
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public void setLiveUrl(String liveUrl) {
        this.liveUrl = liveUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public List<String> getHighlights() {
        return new ArrayList<>(highlights);
    }

    public void setHighlights(List<String> highlights) {
        this.highlights = highlights != null ? new ArrayList<>(highlights) : new ArrayList<>();
    }
}
