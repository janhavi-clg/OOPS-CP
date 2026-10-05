package com.devtrack.module6_resume;

/**
 * ResumeAchievement represents an accolade, competition, or hackathon achievement
 * displayed in the student's resume.
 */
public class ResumeAchievement {
    private String id;
    private String title;
    private String organization;
    private String date;
    private String description;

    public ResumeAchievement() {
    }

    public ResumeAchievement(String id, String title, String organization, String date, String description) {
        this.id = id;
        this.title = title;
        this.organization = organization;
        this.date = date;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
