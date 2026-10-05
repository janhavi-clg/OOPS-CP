package com.devtrack.module8_analytics;

/**
 * DevelopmentActivity represents a chronological event across all engineering modules:
 * Module 2 (Skills & Resources), Module 3 (Coding), Module 4 (Projects), Module 5 (Achievements/Certificates).
 * Demonstrates OOP Encapsulation.
 */
public class DevelopmentActivity {
    private String id;
    private String date; // "YYYY-MM-DD" or formatted
    private String activityTitle;
    private String moduleSource; // "Module 2 (Skills)", "Module 3 (Coding)", "Module 4 (Projects)", "Module 5 (Achievements)"
    private String category; // "SKILL", "RESOURCE", "CODING", "PROJECT", "CERTIFICATE", "HACKATHON"
    private String description;

    public DevelopmentActivity() {
    }

    public DevelopmentActivity(String id, String date, String activityTitle, String moduleSource, String category, String description) {
        this.id = id;
        this.date = date;
        this.activityTitle = activityTitle;
        this.moduleSource = moduleSource;
        this.category = category;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getActivityTitle() {
        return activityTitle;
    }

    public void setActivityTitle(String activityTitle) {
        this.activityTitle = activityTitle;
    }

    public String getModuleSource() {
        return moduleSource;
    }

    public void setModuleSource(String moduleSource) {
        this.moduleSource = moduleSource;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
