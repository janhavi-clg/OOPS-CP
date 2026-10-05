package com.devtrack.module4_projects;

import java.util.UUID;

/**
 * ProjectAchievement represents recognition or accolades won through a project.
 * Demonstrates OOP Encapsulation.
 */
public class ProjectAchievement {
    private String id;
    private String projectId;
    private String title;
    private String awardType; // "Hackathon Finalist", "Winner", "College Showcase", "Published", "Deployed", "Open Source"
    private String organization;
    private String date;

    public ProjectAchievement() {
        this.id = "ach_" + UUID.randomUUID().toString().substring(0, 8);
    }

    public ProjectAchievement(String id, String projectId, String title, String awardType, String organization, String date) {
        this.id = id != null && !id.trim().isEmpty() ? id : "ach_" + UUID.randomUUID().toString().substring(0, 8);
        this.projectId = projectId;
        this.title = title != null ? title.trim() : "";
        this.awardType = awardType != null ? awardType.trim() : "Recognition";
        this.organization = organization != null ? organization.trim() : "";
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAwardType() {
        return awardType;
    }

    public void setAwardType(String awardType) {
        this.awardType = awardType;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
