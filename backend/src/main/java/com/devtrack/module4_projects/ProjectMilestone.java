package com.devtrack.module4_projects;

import com.devtrack.core.oop.TrackableEntity;

import java.util.UUID;

/**
 * ProjectMilestone represents a chronological milestone in a project's development.
 * Demonstrates OOP Inheritance (extends TrackableEntity) and Encapsulation.
 */
public class ProjectMilestone extends TrackableEntity {
    private String projectId;
    private String description;
    private String date; // "YYYY-MM-DD" or "Month YYYY"
    private boolean completed;
    private int orderIndex;

    public ProjectMilestone() {
        super();
        this.completed = true;
    }

    public ProjectMilestone(String id, String projectId, String title, String description, String date, boolean completed, int orderIndex) {
        super(id != null && !id.trim().isEmpty() ? id : "ms_" + UUID.randomUUID().toString().substring(0, 8), title);
        this.projectId = projectId;
        this.description = description != null ? description.trim() : "";
        this.date = date != null ? date.trim() : "";
        this.completed = completed;
        this.orderIndex = orderIndex;
    }

    @Override
    public String getCategory() {
        return "Project Milestone: " + getTitle();
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        touch();
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
        touch();
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
        touch();
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }
}
