package com.devtrack.module3_coding;

import com.devtrack.core.oop.TrackableEntity;

/**
 * CodingActivity entity representing an event in the student's chronological "Coding Journey".
 * Demonstrates OOP Inheritance and Encapsulation.
 */
public class CodingActivity extends TrackableEntity {
    private String studentId;
    private String platform; // LeetCode, CodeChef, GitHub, Codeforces, etc.
    private String activityType; // "SOLVED_PROBLEM", "CONTEST_PARTICIPATION", "REPO_CREATED", "COMMIT_PUSHED", "SYNC"
    private String date; // YYYY-MM-DD
    private String result; // e.g., "Solved 5 problems", "Ranked 420 in Biweekly Contest", "Pushed 3 commits"
    private String sourceType; // "LIVE", "MANUAL", "DEMO"
    private String linkUrl;

    public CodingActivity() {
        super();
        this.activityType = "SOLVED_PROBLEM";
        this.sourceType = "DEMO";
    }

    public CodingActivity(String id, String studentId, String title, String platform,
                          String activityType, String date, String result,
                          String sourceType, String linkUrl) {
        super(id, title);
        this.studentId = studentId;
        this.platform = platform;
        this.activityType = activityType;
        this.date = date;
        this.result = result;
        this.sourceType = sourceType != null ? sourceType : "DEMO";
        this.linkUrl = linkUrl;
    }

    @Override
    public String getCategory() {
        return "Coding Activity: " + platform;
    }

    // Encapsulation Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
        touch();
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
        touch();
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
        touch();
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
        touch();
    }

    public String getSourceType() {
        return sourceType;
    }

    public void setSourceType(String sourceType) {
        this.sourceType = sourceType;
        touch();
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
        touch();
    }
}
